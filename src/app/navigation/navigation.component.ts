import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { AdminToolService } from '../services/admin-tool.service';
import { env } from 'src/environment/environment';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
	private _userSubscription!: Subscription;
	user: any;

	get isProduction(): boolean {
		return env.production;
	}

	constructor(
		private accountService: AccountService,
		private router: Router,
		private adminToolService: AdminToolService
	) {}

	ngOnInit() {
		this._userSubscription = this.accountService.user$.subscribe(
			(value) => {
				this.user = value;
			}
		);
	}

	ngOnDestroy() {
		this._userSubscription.unsubscribe();
	}

	logout(): void {
		this.accountService.logout();
		this.router.navigate(['/web/login']);
	}

	clearLocalStorage(): void {
		this.adminToolService.clearLocalStorage();
	}
}
