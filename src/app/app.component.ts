import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { AccountService } from './services/account.service';
import { OreChatGroup } from './models/ore-chat-group';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'ore_mobile';

	constructor(
		private chatService: ChatService,
		private accountService: AccountService
	) {}

	ngOnInit() {
		this.accountService.user$.subscribe((user) => {
			if (!user) {
				return;
			}
			this.chatService
				.getPersonalChatInformation()
				.subscribe((personalChatInformation: OreChatGroup[]) => {
					console.log(personalChatInformation);
				});
		});
	}
}
