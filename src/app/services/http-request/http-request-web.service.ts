import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class HttpRequestWebService extends HttpRequestService {
	constructor(private http: HttpClient) {
		super();
	}

	get(url: string, params: any, headers: any): Observable<any> {
		const subject = new Subject<any>();

		this.http
			.get(url, {
				params,
				headers,
			})
			.subscribe((getResponse) => {
				subject.next(getResponse);
				subject.complete();
			});

		return subject.asObservable();
	}

	post(url: string, data: any, headers: any): Observable<any> {
		const subject = new Subject<any>();

		this.http
			.post(url, data, {
				headers,
			})
			.subscribe((postResponse) => {
				subject.next(postResponse);
				subject.complete();
			});

		return subject.asObservable();
	}

	put(url: string, data: any, headers: any): Observable<any> {
		const subject = new Subject<any>();

		this.http.put(url, data, { headers }).subscribe((putResponse) => {
			subject.next(putResponse);
			subject.complete();
		});

		return subject.asObservable();
	}

	delete(url: string, headers: any): Observable<any> {
		const subject = new Subject<any>();

		this.http
			.delete(url, {
				headers,
			})
			.subscribe((deleteResponse) => {
				subject.next(deleteResponse);
				subject.complete();
			});

		return subject.asObservable();
	}
}
