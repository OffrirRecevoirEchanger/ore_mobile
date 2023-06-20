import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	private _user = new Subject<any>();

	get user$(): Observable<any> {
		return this._user.asObservable();
	}

	set user(user: any) {
		this._user.next(user);
	}

	constructor() {}
}
