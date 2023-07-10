import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage/local-storage.service';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
	providedIn: 'root',
})
export class AdminToolService {
	constructor(
		private localStorageService: LocalStorageService,
		private accountService: AccountService,
		private router: Router
	) {}

	clearLocalStorage(): void {
		this.localStorageService.clear().subscribe((response) => {
			if (!response) {
				return;
			}
			this.accountService.user = null;
			this.router.navigate(['/web/login']);
		});
	}
}
