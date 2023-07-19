import { Injectable, NgZone } from '@angular/core';
import { HttpRequestService } from './http-request/http-request.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

	get isLongPollingConnected$(): Observable<boolean> {
		return this._isLongPollingConnected.asObservable();
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
					}
					setTimeout(() => this.poll(), env.longPollingDelay);
				});
		});
	}

	fetchPersonalChatInformation(): Observable<OreChatGroup[]> {
		const subject = new Subject<OreChatGroup[]>();

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
					subject.next(messageGroups);
					subject.complete();
				}
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
}
