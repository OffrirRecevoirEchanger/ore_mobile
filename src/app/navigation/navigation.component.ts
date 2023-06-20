import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
	user: any;

	constructor(private accountService: AccountService) {
		this.accountService.user$.subscribe((value) => {
			this.user = value;
		});
	}
}
