import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable, Subject, from } from 'rxjs';
import { CapacitorHttp } from '@capacitor/core';
import { env } from 'src/environment/environment';

@Injectable({
	providedIn: 'root',
})
export class HttpRequestNativeService extends HttpRequestService {
	constructor() {
		super();
	}

	get(url: string, params: any, headers: any): Observable<any> {
		const subject = new Subject<any>();

		from(
			CapacitorHttp.get({
				url: env.apiUrl + url,
				params,
				headers,
			})
		).subscribe({
			next: (getResponse) => {
				subject.next(getResponse.data);
				subject.complete();
			},
			error: (error) => {
				console.error(error);
			},
		});

		return subject.asObservable();
	}

	post(url: string, data: any, headers: any): Observable<any> {
		const subject = new Subject<any>();

		from(
			CapacitorHttp.post({
				url: env.apiUrl + url,
				data,
				headers,
			})
		).subscribe({
			next: (postResponse) => {
				subject.next(postResponse.data);
				subject.complete();
			},
			error: (error) => {
				console.error(error);
			},
		});

		return subject.asObservable();
	}

	put(url: string, data: any, headers: any): Observable<any> {
		const subject = new Subject<any>();

		from(
			CapacitorHttp.put({
				url: env.apiUrl + url,
				data,
				headers,
			})
		).subscribe({
			next: (putResponse) => {
				subject.next(putResponse.data);
				subject.complete();
			},
			error: (error) => {
				console.error(error);
			},
		});

		return subject.asObservable();
	}

	delete(url: string, headers: any): Observable<any> {
		const subject = new Subject<any>();

		from(
			CapacitorHttp.delete({
				url: env.apiUrl + url,
				headers,
			})
		).subscribe({
			next: (deleteResponse) => {
				subject.next(deleteResponse.data);
				subject.complete();
			},
			error: (error) => {
				console.error(error);
			},
		});

		return subject.asObservable();
	}
}
