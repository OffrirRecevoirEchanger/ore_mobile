import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AccountService } from '../services/account.service';
import { OreChatGroup } from '../models/ore-chat-group';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-chat-menu',
	templateUrl: './chat-menu.component.html',
	styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenuComponent implements OnInit, OnDestroy {
	private _userSubscription!: Subscription;
	private _personalChatInformation: OreChatGroup[] = [];

	get personalChatInformation(): OreChatGroup[] {
		return this._personalChatInformation;
	}

	set personalChatInformation(personalChatInformation: OreChatGroup[]) {
		console.log(personalChatInformation);
		this._personalChatInformation = personalChatInformation;
	}

	constructor(
		private accountService: AccountService,
		private chatService: ChatService
	) {}

	ngOnInit() {
		this._userSubscription = this.accountService.user$.subscribe((user) => {
			if (!user) {
				this.personalChatInformation = [];
				return;
			}
			this.chatService
				.fetchPersonalChatInformation()
				.subscribe((personalChatInformation) => {
					this.personalChatInformation = personalChatInformation;
				});
		});
	}

	ngOnDestroy() {
		this._userSubscription.unsubscribe();
	}
}
