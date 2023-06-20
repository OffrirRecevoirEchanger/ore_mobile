import { Component } from '@angular/core';
import { ApiAuthenticationService } from './services/api-authentication.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { OreMembreService } from './services/model/ore-membre.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'ore_mobile';

	constructor(
		private apiAuthenticationService: ApiAuthenticationService,
		private localStorageService: LocalStorageService,
		private oreMembreService: OreMembreService
	) {
		this.apiAuthenticationService
			.authenticate()
			.subscribe((access_token) => {
				console.log(access_token);
				this.oreMembreService.get().subscribe((response) => {
					console.log(response);
				});
			});
	}
}
