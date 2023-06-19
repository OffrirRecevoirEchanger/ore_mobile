import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpRequestService } from './http-request/http-request.service';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private _loggedIn = false;
	private _user = new Subject<any>();

	get loggedIn(): boolean {
		return this._loggedIn;
	}

	get user$(): Observable<any> {
		return this._user.asObservable();
	}

	set user(user: any) {
		this._user.next(user);
	}

	constructor(
		private httpRequestService: HttpRequestService,
		private localStorageService: LocalStorageService
	) {}

	authenticate(): Observable<any> {
		const subject = new Subject<any>();

		const url = '/api/auth/token';
		const params = {
			login: 'admin',
			password: 'admin',
		};
		const headers = {};

		this.httpRequestService.get(url, params, headers).subscribe({
			next: (authResponse) => {
				this.localStorageService.set(
					'access_token',
					authResponse.access_token
				);
				subject.next(authResponse.access_token);
				subject.complete();
			},
			error: (error) => {
				console.error(error);
			},
		});

		return subject.asObservable();
	}

	getAuthenticationToken(): Observable<any> {
		const subject = new BehaviorSubject<any>(null);

		this.localStorageService.get('access_token').subscribe((value) => {
			subject.next(value);
		});

		return subject.asObservable();
	}
}
