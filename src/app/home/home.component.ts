import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	ViewChild,
} from '@angular/core';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
	private _userSubscription!: Subscription;
	@ViewChild('profilePicture') profilePicture!: ElementRef;

	constructor(private accountService: AccountService) {}

	ngAfterViewInit() {
		this._userSubscription = this.accountService.user$.subscribe((user) => {
			if (user && user.image) {
				const cleanByteArray = user.image.slice(2, -3);
				const dataUrl = `data:image/png;base64,${cleanByteArray}`;
				this.profilePicture.nativeElement.src = dataUrl;
			}
		});
	}

	ngOnDestroy() {
		this._userSubscription?.unsubscribe();
	}
}
