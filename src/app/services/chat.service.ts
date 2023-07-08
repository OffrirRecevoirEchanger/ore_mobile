import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request/http-request.service';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	private last = 0;

	constructor(private httpRequestService: HttpRequestService) {
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
		this.httpRequestService
			.post('/longpolling/poll', data, headers)
			.subscribe((response) => {
				const result = response.result;
				if (result.length > 0) {
					this.last = result[result.length - 1].id;
				}
				console.log(response);
				setTimeout(() => this.poll(), 1000);
			});
	}
}
