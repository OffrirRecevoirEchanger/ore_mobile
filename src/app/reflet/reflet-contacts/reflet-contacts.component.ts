import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OreChatGroup } from 'src/app/models/ore-chat-group';
import { ChatService } from 'src/app/services/chat.service';

@Component({
	selector: 'app-reflet-contacts',
	templateUrl: './reflet-contacts.component.html',
	styleUrls: ['./reflet-contacts.component.scss'],
})
export class RefletContactsComponent implements OnInit, OnDestroy {
	personalChatInformation: OreChatGroup[] = [];
	private _activeChatGroupId!: number;

	private _pciSubscription!: Subscription;

	constructor(private chatService: ChatService) {}

	ngOnInit() {
		this._pciSubscription =
			this.chatService.personalChatInformation$.subscribe(
				(personalChatInformation: OreChatGroup[]) => {
					this.personalChatInformation = personalChatInformation;
				}
			);
	}

	isActiveChatGroup(chatGroupId: number): boolean {
		return chatGroupId == this._activeChatGroupId;
	}

	ngOnDestroy() {
		this._pciSubscription?.unsubscribe();
	}
}
