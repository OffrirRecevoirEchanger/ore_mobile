import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'ore_mobile';

	constructor(
		private authenticationService: AuthenticationService,
		private localStorageService: LocalStorageService
	) {
		this.authenticationService.authenticate();
	}
}
