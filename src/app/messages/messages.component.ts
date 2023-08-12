import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { OreChatGroup } from '../models/ore-chat-group';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OreMembre } from '../models/ore-membre';
import { NavigationComponent } from '../navigation/navigation.component';
import { OreChatMessage } from '../models/ore-chat-message';
import { ChatService } from '../services/chat.service';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('main') main!: ElementRef;
	@ViewChild('messagesTopBar') messagesTopBar!: ElementRef;
	@ViewChild('textBarWrapper') textBarWrapper!: ElementRef;
	@ViewChildren('messageList', { read: ElementRef })
	messageList!: QueryList<ElementRef>;
	@ViewChildren(NavigationComponent)
	navComponentQueryList!: QueryList<NavigationComponent>;

	private _pciSubscription!: Subscription;
	private _queryParamMapSubscription!: Subscription;
	private _userSubscription!: Subscription;

	private _activeChatGroupId!: number;

	user!: OreMembre;
	personalChatInformation: OreChatGroup[] = [];
	messageFormGroup = new FormGroup({
		message: new FormControl('', [Validators.required]),
	});

	get isChatGroupSelected(): boolean {
		return Boolean(this._activeChatGroupId);
	}

	get activeChatGroup() {
		return this.personalChatInformation.filter(
			(group) => group.groupId === this._activeChatGroupId
		)[0];
	}

	get profilePicture() {
		const cleanByteArray = this.user.image.slice(2, -3);
		return `data:image/png;base64,${cleanByteArray}`;
	}

	get messageListHeight(): number {
		return (
			window.innerHeight -
			(this.messagesTopBar?.nativeElement.getBoundingClientRect().height +
				(this.navComponentQueryList
					?.toArray()[0]
					.navbar.nativeElement.getBoundingClientRect().height || 0) +
				(this.textBarWrapper?.nativeElement.getBoundingClientRect()
					.height || 0) +
				1.5 * 16) -
			2
		);
	}

	constructor(
		private accountService: AccountService,
		private chatService: ChatService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this._userSubscription = this.accountService.user$.subscribe((user) => {
			if (!user) {
				this.personalChatInformation = [];
				return;
			}
			this.user = user;
			this.chatService.fetchPersonalChatInformation();
			this._pciSubscription =
				this.chatService.personalChatInformation$.subscribe(
					(personalChatInformation: OreChatGroup[]) => {
						this.personalChatInformation = personalChatInformation;
						this._queryParamMapSubscription =
							this.route.queryParamMap.subscribe((map) => {
								this._activeChatGroupId = Number(
									map.get('group')
								);
							});
					}
				);
			this.chatService.activeChatGroupId$.subscribe(
				(activeChatGroupId) => {
					this._activeChatGroupId = activeChatGroupId;
				}
			);
		});
	}

	ngAfterViewInit() {
		this.messageList.changes.subscribe((queryChanges) => {
			const array = queryChanges.toArray();
			if (array.length > 0) {
				queryChanges.toArray()[0].nativeElement.style.maxHeight = `${this.messageListHeight}px`;
				this.scrollToBottom(array[0].nativeElement, 'instant');
			}
			this.messageFormGroup.patchValue({
				message: '',
			});
		});
		this.chatService.newMessagesFromLongPolling$.subscribe(
			(_newMessages: OreChatMessage[]) => {
				setTimeout(() => {
					const messageList = this.messageList.toArray()[0];
					if (messageList) {
						this.scrollToBottom(messageList.nativeElement);
					}
				}, 1000);
			}
		);
	}

	isActiveChatGroup(chatGroupId: number): boolean {
		return chatGroupId == this._activeChatGroupId;
	}

	onMessageSubmit(): void {
		if (this.messageFormGroup.invalid) {
			return;
		}

		const message = this.messageFormGroup.get('message');

		if (!message) {
			return;
		}

		const params = {
			msg: message.value,
			group_id: this.activeChatGroup.groupId,
		};

		this.chatService.sendMessage(params).subscribe((_result) => {
			this.messageFormGroup.patchValue({ message: '' });
		});
	}

	private scrollToBottom(element: Element, behavior: string = 'smooth') {
		element.scrollTo({
			left: 0,
			top: element.scrollHeight,
			behavior: behavior as ScrollBehavior,
		});
	}

	ngOnDestroy() {
		this._pciSubscription?.unsubscribe();
		this._queryParamMapSubscription?.unsubscribe();
		this._userSubscription?.unsubscribe();
	}
}
