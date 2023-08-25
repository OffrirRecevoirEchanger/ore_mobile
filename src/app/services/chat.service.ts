import { Injectable, NgZone } from '@angular/core';
import { HttpRequestService } from './http-request/http-request.service';
import {
	BehaviorSubject,
	Observable,
	ReplaySubject,
	Subject,
	first,
} from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { env } from 'src/environment/environment';
import { OreChatMessage } from '../models/ore-chat-message';
import { OreChatGroup } from '../models/ore-chat-group';
import { AccountService } from './account.service';
import { OreMembre } from '../models/ore-membre';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	private last = 0;
	private _isLongPollingConnected = new BehaviorSubject<boolean>(false);
	private _activeChatGroupIdSubject = new ReplaySubject<number>();
	private _personalChatInformation: OreChatGroup[] = [];
	private _personalChatInformationSubject = new ReplaySubject<
		OreChatGroup[]
	>();
	private _newMessagesFromLongPollingSubject = new Subject<
		OreChatMessage[]
	>();
	private _user!: OreMembre | null;

	get isLongPollingConnected$(): Observable<boolean> {
		return this._isLongPollingConnected.asObservable();
	}

	get activeChatGroupId$(): Observable<number> {
		return this._activeChatGroupIdSubject.asObservable();
	}

	set activeChatGroupId(activeChatGroupId: number) {
		this._activeChatGroupIdSubject.next(activeChatGroupId);
	}

	get personalChatInformation$(): Observable<OreChatGroup[]> {
		return this._personalChatInformationSubject.asObservable();
	}

	set personalChatInformation(personalChatInformation: OreChatGroup[]) {
		this._personalChatInformation = personalChatInformation;
		this._personalChatInformationSubject.next(
			this._personalChatInformation
		);
	}

	get newMessagesFromLongPolling$(): Observable<OreChatMessage[]> {
		return this._newMessagesFromLongPollingSubject.asObservable();
	}

	constructor(
		private httpRequestService: HttpRequestService,
		private errorHandlerService: ErrorHandlerService,
		private accountService: AccountService,
		private zone: NgZone
	) {
		this.accountService.user$.subscribe((user) => {
			if (!user) {
				this.personalChatInformation = [];
			}
			this._user = user;
		});
		this.errorHandlerService.longPollingError$.subscribe(
			(_errorMessage) => {
				this._isLongPollingConnected.next(false);
				setTimeout(() => this.poll(), env.longPollingDelayError);
			}
		);
		this.poll();
	}

	poll(): void {
		const data = {
			jsonrpc: '2.0',
			method: 'call',
			params: {
				channels: [
					'ore.notification.message',
					'ore.notification.message.read',
				],
				last: this.last,
			},
		};
		const headers = {
			'Content-Type': 'application/json',
		};
		this._isLongPollingConnected.next(true);
		this.zone.run(() => {
			this.httpRequestService
				.post('/longpolling/poll', data, headers)
				.subscribe((response) => {
					this.processLongPollingResponse(response);
				});
		});
	}

	fetchPersonalChatInformation(): void {
		const data = {
			jsonrpc: '2.0',
			method: 'call',
			params: {},
		};
		const headers = {
			'Content-Type': 'application/json',
		};

		this.httpRequestService
			.post('/ore/get_personal_chat_information', data, headers)
			.subscribe((result) => {
				if (result.error?.message) {
					throw new Error(result.error.message);
				} else {
					const messageGroupsRaw = result?.result?.lst_membre_message;
					const messageGroups =
						this.parseMessageGroups(messageGroupsRaw);
					this.personalChatInformation = messageGroups;
				}
			});
	}

	sendMessage(params: any): Observable<any> {
		const subject = new Subject<any>();

		const data = {
			jsonrpc: '2.0',
			method: 'call',
			params,
		};
		const headers = {
			'Content-Type': 'application/json',
		};

		this.httpRequestService
			.post('/ore/submit/chat_msg', data, headers)
			.subscribe((postResponse) => {
				if (postResponse.error) {
					throw postResponse.error;
				}
				subject.next(postResponse);
				subject.complete();
			});

		return subject.asObservable();
	}

	parseMessageGroups(messageGroupsRaw: any): OreChatGroup[] {
		const groups: OreChatGroup[] = [];

		for (const group of messageGroupsRaw) {
			const messages: OreChatMessage[] = [];
			for (const message of group.lst_msg) {
				messages.push(
					new OreChatMessage(
						message.id,
						message.is_read,
						message.m_id,
						message.name
					)
				);
			}
			groups.push(
				new OreChatGroup(
					group.id,
					group.id_group,
					messages,
					group.ma_photo,
					group.name,
					group.resume_msg
				)
			);
		}

		return groups;
	}

	private processLongPollingResponse(response: any) {
		const result = response.result;
		if (result.length > 0) {
			const channel = result[0]?.channel;
			switch (channel) {
				case 'ore.notification.message':
					this.addNewMessages(result);
					break;
				case 'ore.notification.message.read':
					this.updateIsRead(result);
					break;
			}
		}
		setTimeout(() => this.poll(), env.longPollingDelay);
	}

	private addNewMessages(result: any) {
		this.last = result[result.length - 1].id;
		const newMessagesToSend: any[] = [];
		for (const message of result) {
			if (message?.message.data.membre_id === this._user?.id) {
				const data = message.message.data;
				newMessagesToSend.push(data);
			}
		}
		this.addMessagesToPersonalChatInformation(newMessagesToSend);
	}

	addMessagesToPersonalChatInformation(
		messages: any[]
	): Observable<OreChatMessage> {
		const subject = new ReplaySubject<OreChatMessage>();

		const personalChatInformation = this._personalChatInformation;

		for (const message of messages) {
			for (const oreChatGroup of personalChatInformation) {
				if (oreChatGroup.groupId !== message.group_id) {
					continue;
				}

				const newMessage = new OreChatMessage(
					message.id,
					message.is_read,
					message.m_id,
					message.name
				);
				oreChatGroup.messages.push(newMessage);
				subject.next(newMessage);
				subject.complete();
			}
		}

		this._newMessagesFromLongPollingSubject.next(messages);

		return subject.asObservable();
	}

	getMessage(
		id: number | undefined,
		activeChatGroupId: number
	): OreChatMessage | undefined {
		if (!id) {
			return;
		}

		const activeChatGroup = this._personalChatInformation.filter(
			(group) => group.groupId === activeChatGroupId
		)[0];

		if (!activeChatGroup?.messages) {
			return;
		}

		const matchingMessages = activeChatGroup.messages.filter(
			(message) => message.id === id
		);

		if (!matchingMessages) {
			return;
		}

		return matchingMessages[0];
	}

	setMessageIsRead(id: number): void {
		const data = {
			jsonrpc: '2.0',
			method: 'call',
			params: {
				msg_id: id,
			},
		};
		const headers = {
			'Content-Type': 'application/json',
		};
		this.httpRequestService
			.post('/ore/read/chat_msg', data, headers)
			.pipe(first())
			.subscribe((response) => {
				if (response.error) {
					throw response;
				}
			});
	}

	private updateIsRead(result: any): void {
		if (result?.length < 1) {
			return;
		}

		this.last = result[result.length - 1].id;
		const id = result[0]?.message?.field_id;
		const groupId = result[0]?.message?.group_id;

		if (!id || !groupId) {
			return;
		}

		const matchingGroups = this._personalChatInformation.filter(
			(group) => group.groupId === groupId
		);

		if (matchingGroups.length < 1) {
			return;
		}

		const matchingMessages = matchingGroups[0].messages.filter(
			(message) => message.id === id
		);

		if (matchingMessages.length < 1) {
			return;
		}

		matchingMessages[0].isRead = true;
	}
}
