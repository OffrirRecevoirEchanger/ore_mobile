import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { RefletSectionService } from './services/reflet-section.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ChatService } from '../services/chat.service';

@Component({
	selector: 'app-reflet',
	templateUrl: './reflet.component.html',
	styleUrls: ['./reflet.component.scss'],
})
export class RefletComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild(NavigationComponent)
	navigation!: NavigationComponent;
	@ViewChild('main') mainElement!: ElementRef<any>;
	@ViewChild('refletTop') refletTop!: ElementRef<any>;
	@ViewChild('refletOptions') refletOptions!: ElementRef<any>;
	@ViewChild('refletContent') refletContent!: ElementRef<any>;

	private _userSubscription!: Subscription;

	private set refletContentHeight(newHeight: number) {
		this.refletSectionService.refletContentHeight = newHeight;
	}

	private set mainMaxHeight(newHeight: number) {
		this.refletSectionService.mainMaxHeight = newHeight;
	}

	constructor(
		private accountService: AccountService,
		private chatService: ChatService,
		private refletSectionService: RefletSectionService
	) {}

	ngOnInit() {
		this._userSubscription = this.accountService.user$.subscribe((user) => {
			if (user) {
				this.chatService.fetchPersonalChatInformation();
			}
		});
	}

	ngAfterViewInit() {
		this.refletSectionService.refletContentHeight$.subscribe(
			(newHeight) => {
				const refletContentElement: HTMLElement =
					this.refletContent?.nativeElement;
				if (!refletContentElement) {
					return;
				}
				refletContentElement.style.maxHeight = `${newHeight}px`;
			}
		);
		this.refletSectionService.mainMaxHeight$.subscribe((newHeight) => {
			const mainElement: HTMLElement = this.mainElement?.nativeElement;
			if (!mainElement) {
				return;
			}
			mainElement.style.maxHeight = `${newHeight}px`;
		});
		this.calculateMainMaxHeight();
		this.calculateRefletContentHeight();
	}

	@HostListener('window:resize', ['$event'])
	onResize(_event: any) {
		this.calculateMainMaxHeight();
		this.calculateRefletContentHeight();
	}

	calculateMainMaxHeight(): void {
		const navigationElement: Element =
			this.navigation?.navbar?.nativeElement;
		const mainElement: Element = this.mainElement?.nativeElement;

		if (!navigationElement || !mainElement) {
			return;
		}

		this.mainMaxHeight =
			window.innerHeight -
			navigationElement.getBoundingClientRect().height;
	}

	calculateRefletContentHeight(): void {
		const mainElement: Element = this.mainElement?.nativeElement;
		const refletTop: Element = this.refletTop?.nativeElement;
		const refletOptions: Element = this.refletOptions?.nativeElement;

		if (!mainElement || !refletTop || !refletOptions) {
			return;
		}

		this.refletContentHeight =
			mainElement.getBoundingClientRect().height -
			(refletTop.getBoundingClientRect().height +
				refletOptions.getBoundingClientRect().height);
	}

	ngOnDestroy() {
		this._userSubscription?.unsubscribe();
	}
}
