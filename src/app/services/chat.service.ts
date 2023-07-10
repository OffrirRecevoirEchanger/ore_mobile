import { Injectable, NgZone } from '@angular/core';
import { HttpRequestService } from './http-request/http-request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	private last = 0;
	private _isLongPollingConnected = new BehaviorSubject<boolean>(false);

	get isLongPollingConnected$(): Observable<boolean> {
		return this._isLongPollingConnected.asObservable();
	}

	constructor(
		private httpRequestService: HttpRequestService,
		private errorHandlerService: ErrorHandlerService,
		private zone: NgZone
	) {
		this.errorHandlerService.longPollingError$.subscribe(
			(_errorMessage) => {
				this._isLongPollingConnected.next(false);
				setTimeout(() => this.poll(), 5150);
			}
		);
		this.poll();
	}

	poll() {
		const data = {
			jsonrpc: '2.0',
			method: 'call',
			params: {
				channels: ['ore.notification.message'],
				last: this.last,
			},
		};
		const headers = {
			'Content-Type': 'application/json',
		};
		this._isLongPollingConnected.next(true);
		this.zone.run(() => {
			this.httpRequestService
				.post('/longpolling/poll', data, headers)
				.subscribe((response) => {
					const result = response.result;
					if (result.length > 0) {
						this.last = result[result.length - 1].id;
					}
					setTimeout(() => this.poll(), 1000);
				});
		});
	}
}
