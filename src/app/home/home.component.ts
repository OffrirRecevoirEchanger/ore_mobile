import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ApiAuthenticationService } from '../services/api-authentication.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
	@ViewChild('profilePicture') profilePicture!: ElementRef;

	ngAfterViewInit() {
		this.profilePicture.nativeElement;
	}

	constructor(private apiAuthenticationService: ApiAuthenticationService) {
		this.apiAuthenticationService.user$.subscribe((user) => {
			console.log(user.name);
			const cleanByteArray = user.logo.slice(2, -3);
			const dataUrl = `data:image/png;base64,${cleanByteArray}`;
			this.profilePicture.nativeElement.src = dataUrl;
		});
	}
}
