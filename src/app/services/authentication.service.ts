import { Injectable } from '@angular/core';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { Observable, Subject, from } from 'rxjs';
import { env } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private _loggedIn = false;

	get loggedIn() {
		return this._loggedIn;
	}

	constructor(private http: HttpClient) {}

	authenticate(): Observable<any> {
		const subject = new Subject<any>();

		let auth$: Observable<any>;

		if (Capacitor.isNativePlatform()) {
			auth$ = from(
				CapacitorHttp.get({
					url: `${env.apiUrl}/api/auth/token`,
					params: {
						login: 'admin',
						password: 'admin',
					},
				})
			);
		} else {
			auth$ = this.http.get(`/api/auth/token`, {
				params: {
					login: 'admin',
					password: 'admin',
				},
			});
		}

		auth$.subscribe({
			next: (authResponse) => {
				const dataObject = Capacitor.isNativePlatform()
					? authResponse.data
					: authResponse;
				subject.next(dataObject.access_token);
				subject.complete();
			},
			error: (error) => {
				console.error(error);
			},
		});

		return subject.asObservable();
	}
}
