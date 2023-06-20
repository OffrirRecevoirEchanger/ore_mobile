import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { ApiAuthenticationService } from '../api-authentication.service';
import { Observable, Subject, mergeMap } from 'rxjs';
import { AccountService } from '../account.service';

@Injectable({
	providedIn: 'root',
})
export class OreMembreService {
	private modelName = 'ore.membre';
	private resPartnerModelName = 'res.partner';

	constructor(
		private httpRequestService: HttpRequestService,
		private apiAuthenticationService: ApiAuthenticationService,
		private accountService: AccountService
	) {}

	get(): Observable<any> {
		const subject = new Subject<any>();

		this.apiAuthenticationService
			.getAuthenticationToken()
			.pipe(
				mergeMap((accessToken) => {
					return this.httpRequestService.get(
						`/api/${this.modelName}`,
						{},
						{
							access_token: accessToken,
							'Content-Type': 'application/jsonp',
						}
					);
				})
			)
			.subscribe((value) => {
				console.log(value);
				this.accountService.user = value.data[1];
			});

		return subject.asObservable();
	}
}
