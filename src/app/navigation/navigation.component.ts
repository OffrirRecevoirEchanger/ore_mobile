import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { AdminToolService } from '../services/admin-tool.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	user: any;

	constructor(
		private accountService: AccountService,
		private router: Router,
		private adminToolService: AdminToolService
	) {}

	ngOnInit() {
		this.accountService.user$.subscribe((value) => {
			this.user = value;
		});
	}

	logout() {
		this.accountService.logout();
		this.router.navigate(['/web/login']);
	}

	clearLocalStorage() {
		this.adminToolService.clearLocalStorage();
	}
}
