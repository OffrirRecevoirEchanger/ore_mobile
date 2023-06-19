import { Injectable } from '@angular/core';
import { OreMembre } from 'src/app/models/ore-membre';
import { HttpRequestService } from '../http-request/http-request.service';
import { AuthenticationService } from '../authentication.service';
import { Observable, Subject, mergeMap, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OreMembreService {
	private modelName = 'ore.membre';
	private resPartnerModelName = 'res.partner';

	constructor(
		private httpRequestService: HttpRequestService,
		private authenticationService: AuthenticationService
	) {}

	get(): Observable<any> {
		const subject = new Subject<any>();

		this.authenticationService
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
				this.authenticationService.user = value.data[1];
			});

		return subject.asObservable();
	}
}
