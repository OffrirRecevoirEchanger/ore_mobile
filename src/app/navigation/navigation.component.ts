import { Component } from '@angular/core';
import { ApiAuthenticationService } from '../services/api-authentication.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
	get loggedIn() {
		return this.apiAuthenticationService.loggedIn;
	}

	constructor(private apiAuthenticationService: ApiAuthenticationService) {}
}
