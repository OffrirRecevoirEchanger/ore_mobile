import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
	@ViewChild('profilePicture') profilePicture!: ElementRef;

	constructor(private accountService: AccountService) {}

	ngAfterViewInit() {
		this.accountService.user$.subscribe((user) => {
			if (user && user.image) {
				const cleanByteArray = user.image.slice(2, -3);
				const dataUrl = `data:image/png;base64,${cleanByteArray}`;
				this.profilePicture.nativeElement.src = dataUrl;
			}
		});
	}
}
