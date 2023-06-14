import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { LocalStorageWebService } from './services/local-storage/local-storage-web.service';
import { LocalStorageNativeService } from './services/local-storage/local-storage-native.service';

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
		this.authenticationService.authenticate().subscribe({
			next: (access_token) => {
				console.log('access_token');
				console.log(access_token);
				console.log(
					this.localStorageService instanceof LocalStorageWebService
				);
				console.log(
					this.localStorageService instanceof
						LocalStorageNativeService
				);
				console.log(this.localStorageService.get('access_token'));
			},
			error: (error) => {
				console.error(error);
			},
		});
	}
}
