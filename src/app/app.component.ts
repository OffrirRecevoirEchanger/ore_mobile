import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'ore_mobile';

	constructor(private authenticationService: AuthenticationService) {
		this.authenticationService.authenticate();
	}
}
