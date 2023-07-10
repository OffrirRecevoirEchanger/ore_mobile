import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
	selector: 'app-connection-indicator',
	templateUrl: './connection-indicator.component.html',
	styleUrls: ['./connection-indicator.component.scss'],
})
export class ConnectionIndicatorComponent implements OnInit {
	connected = false;

	constructor(private chatService: ChatService) {}

	ngOnInit() {
		this.chatService.isLongPollingConnected$.subscribe(
			(response: boolean) => {
				this.connected = response;
			}
		);
	}
}
