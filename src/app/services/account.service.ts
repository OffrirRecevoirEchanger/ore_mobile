import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiAuthenticationService } from './api-authentication.service';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private _user = new ReplaySubject<any>();

	get user$(): Observable<any> {
		return this._user.asObservable();
	}

	set user(user: any) {
		this._user.next(user);
	}

	constructor(private apiAuthenticationService: ApiAuthenticationService) {}

	login(username: string, password: string) {
		this.apiAuthenticationService.authenticate(username, password);
	}
}
