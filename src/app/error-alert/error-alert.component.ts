import { Component, NgZone, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
	selector: 'app-error-alert',
	templateUrl: './error-alert.component.html',
	styleUrls: ['./error-alert.component.scss'],
})
export class ErrorAlertComponent implements OnInit {
	errorMessage: string = 'Error message';
	showErrorMessage: boolean = false;

	constructor(
		private errorHandlerService: ErrorHandlerService,
		private zone: NgZone
	) {}

	ngOnInit() {
		this.errorHandlerService.error$.subscribe((errorMessage) => {
			this.zone.run(() => {
				this.errorMessage = errorMessage;
				this.showErrorMessage = true;
				setTimeout(() => {
					this.showErrorMessage = false;
				}, 5000);
			});
		});
	}
}
