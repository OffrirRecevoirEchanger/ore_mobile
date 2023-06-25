import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpRequestService } from './http-request/http-request.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { ApiAuthenticationData } from '../models/api-authentication-data';

@Injectable({
	providedIn: 'root',
})
export class ApiAuthenticationService {
	constructor(
		private httpRequestService: HttpRequestService,
		private localStorageService: LocalStorageService
	) {}

	authenticate(
		login: string,
		password: string
	): Observable<ApiAuthenticationData> {
		const subject = new Subject<any>();

		const url = '/api/auth/token';
		const params = {
			login,
			password,
		};
		const headers = {};

		this.httpRequestService.get(url, params, headers).subscribe({
			next: (authResponse) => {
				const apiAuthData = new ApiAuthenticationData(
					authResponse.uid,
					authResponse.partner_id,
					authResponse.access_token
				);
				this.localStorageService.set(
					'api_authentication_data',
					JSON.stringify(apiAuthData)
				);
				subject.next(apiAuthData);
				subject.complete();
			},
			error: (error) => {
				console.error(error);
			},
		});

		return subject.asObservable();
	}

	getAuthData(): Observable<ApiAuthenticationData> {
		const subject = new ReplaySubject<ApiAuthenticationData>();

		this.localStorageService
			.get('api_authentication_data')
			.subscribe((value) => {
				if (!value) {
					subject.next(value);
					subject.complete();
				} else {
					const valueObject = JSON.parse(value);
					const apiAuthData = new ApiAuthenticationData(
						valueObject.uid,
						valueObject.partnerId,
						valueObject.accessToken
					);
					subject.next(apiAuthData);
					subject.complete();
				}
			});

		return subject.asObservable();
	}
}
