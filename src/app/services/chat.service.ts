import { Injectable, NgZone } from '@angular/core';
import { HttpRequestService } from './http-request/http-request.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { env } from 'src/environment/environment';
import { OreChatMessage } from '../models/ore-chat-message';
import { OreChatGroup } from '../models/ore-chat-group';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	private last = 0;
	private _isLongPollingConnected = new BehaviorSubject<boolean>(false);
	private _activeChatGroupId = new ReplaySubject<number>();
	private _personalChatInformation: OreChatGroup[] = [];
	private _personalChatInformationSubject = new ReplaySubject<
		OreChatGroup[]
	>();
	private _newMessagesFromLongPollingSubject = new Subject<any[]>();

	get isLongPollingConnected$(): Observable<boolean> {
		return this._isLongPollingConnected.asObservable();
	}

	get activeChatGroupId$(): Observable<number> {
		return this._activeChatGroupId.asObservable();
	}

	set activeChatGroupId(activeChatGroupId: number) {
		this._activeChatGroupId.next(activeChatGroupId);
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

	get newMessagesFromLongPolling$(): Observable<any[]> {
		return this._newMessagesFromLongPollingSubject.asObservable();
	}

	constructor(
		private httpRequestService: HttpRequestService,
		private errorHandlerService: ErrorHandlerService,
		private zone: NgZone
	) {
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
				channels: ['ore.notification.message'],
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
					const result = response.result;
					if (result.length > 0) {
						this.last = result[result.length - 1].id;
						this._newMessagesFromLongPollingSubject.next(result);
					}
					setTimeout(() => this.poll(), env.longPollingDelay);
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

	addMessageToPersonalChatInformation(
		messageData: any
	): Observable<OreChatMessage> {
		const subject = new ReplaySubject<OreChatMessage>();

		const personalChatInformation = this._personalChatInformation;

		for (const oreChatGroup of personalChatInformation) {
			if (oreChatGroup.groupId === messageData.group_id) {
				const newMessage = new OreChatMessage(
					messageData.id,
					messageData.is_read,
					messageData.membre_id,
					messageData.name
				);
				oreChatGroup.messages.push(newMessage);
				subject.next(newMessage);
				subject.complete();
			}
		}

		return subject.asObservable();
	}
}
