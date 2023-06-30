import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { ApiAuthenticationService } from '../api-authentication.service';
import { Observable, ReplaySubject, concatMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OreMembreService {
	private modelName = 'ore.membre';

	constructor(
		private httpRequestService: HttpRequestService,
		private apiAuthenticationService: ApiAuthenticationService
	) {}

	get(): Observable<any> {
		const subject = new ReplaySubject<any>();

		this.apiAuthenticationService
			.getAuthData()
			.pipe(
				concatMap((authData) => {
					if (!authData) {
						const noAuthDataSubject = new ReplaySubject<any>();
						noAuthDataSubject.next(null);
						noAuthDataSubject.complete();
						return noAuthDataSubject.asObservable();
					} else {
						const domain = `partner_id.id:=:${authData.partnerId}`;
						return this.httpRequestService.get(
							`/api/${this.modelName}`,
							{
								domain,
								fields: 'image,name,partner_id',
							},
							{
								access_token: authData.accessToken,
								'Content-Type': 'application/jsonp',
							}
						);
					}
				})
			)
			.subscribe((value) => {
				subject.next(value ? value?.data[0] : null);
				subject.complete();
			});

		return subject.asObservable();
	}
}
