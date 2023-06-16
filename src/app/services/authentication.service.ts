import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpRequestService } from './http-request/http-request.service';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private _loggedIn = false;

	get loggedIn() {
		return this._loggedIn;
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
}
