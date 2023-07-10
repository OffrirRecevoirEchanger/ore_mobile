import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, mergeMap } from 'rxjs';
import { ApiAuthenticationService } from './api-authentication.service';
import { OreMembreService } from './model/ore-membre.service';
import { OreMembre } from '../models/ore-membre';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private _user: OreMembre | null = null;
	private _userSubject = new ReplaySubject<OreMembre | null>();
	private _isDoneFetchingLocalUser = new ReplaySubject<boolean>();

	get user$() {
		return this._userSubject.asObservable();
	}

	get isDoneFetchingLocalUser$() {
		return this._isDoneFetchingLocalUser.asObservable();
	}

	set user(user: OreMembre | null) {
		this._user = user;
		this._userSubject.next(user);
	}

	constructor(
		private apiAuthenticationService: ApiAuthenticationService,
		private oreMembreService: OreMembreService
	) {
		this.oreMembreService.get().subscribe((user) => {
			if (user) {
				this.user = user;
			}
			this._isDoneFetchingLocalUser.next(true);
		});
	}

	login(username: string, password: string) {
		const subject = new Subject<OreMembre | null>();
		this.apiAuthenticationService
			.authenticate(username, password)
			.pipe(
				mergeMap((_response) => {
					return this.oreMembreService.get();
				})
			)
			.subscribe((response: OreMembre | null) => {
				subject.next(response);
				subject.complete();
			});
		return subject.asObservable();
	}

	isAuthenticated(): boolean {
		return this._user ? true : false;
	}

	logout() {
		this.apiAuthenticationService.deleteAuthData().subscribe((response) => {
			if (response) {
				this.user = null;
			}
		});
	}
}
