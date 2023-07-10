import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { ApiAuthenticationService } from '../api-authentication.service';
import { Observable, ReplaySubject, concatMap } from 'rxjs';
import { OreMembre } from 'src/app/models/ore-membre';

@Injectable({
	providedIn: 'root',
})
export class OreMembreService {
	private modelName = 'ore.membre';

	constructor(
		private httpRequestService: HttpRequestService,
		private apiAuthenticationService: ApiAuthenticationService
	) {}

	get(): Observable<OreMembre | null> {
		const subject = new ReplaySubject<OreMembre | null>();

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
								fields: 'partner_id,name,image',
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
				if (value && value?.data[0]) {
					const data = value.data[0];
					const oreMembre = new OreMembre(
						data.id,
						data.partner_id,
						data.name,
						data.image
					);
					subject.next(oreMembre);
				}
				subject.next(null);
				subject.complete();
			});

		return subject.asObservable();
	}
}
