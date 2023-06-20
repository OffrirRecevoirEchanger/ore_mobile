import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
	user: any;

	constructor(private loginService: LoginService) {
		this.loginService.user$.subscribe((value) => {
			this.user = value;
		});
	}
}
