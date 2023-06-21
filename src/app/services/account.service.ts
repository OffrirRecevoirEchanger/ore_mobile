import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

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

	constructor() {}
}
