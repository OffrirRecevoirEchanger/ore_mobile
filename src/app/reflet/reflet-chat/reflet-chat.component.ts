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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { OreChatGroup } from 'src/app/models/ore-chat-group';
import { OreChatMessage } from 'src/app/models/ore-chat-message';
import { OreMembre } from 'src/app/models/ore-membre';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { AccountService } from 'src/app/services/account.service';
import { ChatService } from 'src/app/services/chat.service';
import { RefletSectionService } from '../services/reflet-section.service';

@Component({
	selector: 'app-reflet-chat',
	templateUrl: './reflet-chat.component.html',
	styleUrls: ['./reflet-chat.component.scss'],
})
export class RefletChatComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('main') main!: ElementRef;
	@ViewChild('messagesTopBar') messagesTopBar!: ElementRef;
	@ViewChild('textBarWrapper') textBarWrapper!: ElementRef;
	@ViewChild('messageList') messageList!: ElementRef;
	@ViewChildren(NavigationComponent)
	navComponentQueryList!: QueryList<NavigationComponent>;

	private _pciSubscription!: Subscription;
	private _activeChatGroupIdSubscription!: Subscription;
	private _queryParamMapSubscription!: Subscription;
	private _userSubscription!: Subscription;
	private _refletContentHeightSubscription!: Subscription;
	private _newMessagesSubscription!: Subscription;

	private _messagesIntersectionObserver!: IntersectionObserver;

	private _activeChatGroupId!: number;

	user!: OreMembre;
	personalChatInformation: OreChatGroup[] = [];
	messageFormGroup = new FormGroup({
		message: new FormControl('', [Validators.required]),
	});

	get activeChatGroup(): OreChatGroup {
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

	get isChatGroupSelected(): boolean {
		return Boolean(this._activeChatGroupId);
	}

	constructor(
		private accountService: AccountService,
		private chatService: ChatService,
		private route: ActivatedRoute,
		private refletSectionService: RefletSectionService
	) {}

	ngOnInit() {
		this._userSubscription = this.accountService.user$.subscribe((user) => {
			if (!user) {
				this.personalChatInformation = [];
				return;
			}
			this.user = user;
			this.chatService.fetchPersonalChatInformation();
			this.setPciSubscription();
			this.setActiveChatGroupIdSubscription();
		});
	}

	ngAfterViewInit() {
		this.observeMessageListMutations();
		this.setNewMessagesSubscription();
		this.setRefletContentHeightSubscription();
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

	private observeMessageListMutations() {
		if (!this.messageList?.nativeElement) {
			return;
		}
		const observer = new MutationObserver((_mutations) => {
			this.scrollToBottom(this.messageList.nativeElement, 'instant');
			this.readUnreadMessages();
		});
		observer.observe(this.messageList.nativeElement, {
			attributes: false,
			childList: true,
			characterData: false,
		});
	}

	private setPciSubscription() {
		this._pciSubscription =
			this.chatService.personalChatInformation$.subscribe(
				(personalChatInformation: OreChatGroup[]) => {
					this.personalChatInformation = personalChatInformation;
					this.setQueryParamSubscription();
				}
			);
	}

	private setActiveChatGroupIdSubscription() {
		this._activeChatGroupIdSubscription =
			this.chatService.activeChatGroupId$.subscribe(
				(activeChatGroupId) => {
					this._activeChatGroupId = activeChatGroupId;
				}
			);
	}

	private setQueryParamSubscription() {
		this._queryParamMapSubscription = this.route.queryParamMap.subscribe(
			(map) => {
				this._activeChatGroupId = Number(map.get('group'));
			}
		);
	}

	private setNewMessagesSubscription() {
		this._newMessagesSubscription =
			this.chatService.newMessagesFromLongPolling$.subscribe(
				(_newMessages: OreChatMessage[]) => {
					setTimeout(() => {
						if (this.messageList) {
							this.scrollToBottom(this.messageList.nativeElement);
						}
					}, 1000);
				}
			);
	}

	private setRefletContentHeightSubscription() {
		this._refletContentHeightSubscription =
			this.refletSectionService.refletContentHeight$.subscribe(
				(newHeight) => {
					const messageList = this.messageList?.nativeElement;
					const textBarWrapper = this.textBarWrapper?.nativeElement;
					if (messageList && textBarWrapper) {
						const remValueInPixels = 16;
						messageList.style.maxHeight = `${
							newHeight -
							(remValueInPixels * 4 +
								textBarWrapper.getBoundingClientRect().height)
						}px`;
					}
				}
			);
	}

	private readUnreadMessages() {
		if (!this.messageList?.nativeElement) {
			return;
		}

		this._messagesIntersectionObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) {
						continue;
					}

					const target: HTMLElement = entry.target as HTMLElement;
					const id = target.dataset['id'];

					if (!id) {
						continue;
					}

					const message = this.chatService.getMessage(
						parseInt(id),
						this._activeChatGroupId
					);

					if (
						!message ||
						message.isRead ||
						message.memberId === this.user.id
					) {
						continue;
					}

					this.chatService.setMessageIsRead(parseInt(id));
				}
			}
		);

		for (const message of this.messageList.nativeElement.getElementsByTagName(
			'li'
		)) {
			this._messagesIntersectionObserver.observe(message);
		}
	}

	ngOnDestroy() {
		this._pciSubscription?.unsubscribe();
		this._activeChatGroupIdSubscription?.unsubscribe();
		this._queryParamMapSubscription?.unsubscribe();
		this._userSubscription?.unsubscribe();
		this._refletContentHeightSubscription?.unsubscribe();
		this._newMessagesSubscription?.unsubscribe();
	}
}
