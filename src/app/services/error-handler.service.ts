import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
	private _error = new Subject<any>();
	private _longPollingError = new Subject<any>();

	get error$(): Observable<any> {
		return this._error.asObservable();
	}

	get longPollingError$(): Observable<any> {
		return this._longPollingError.asObservable();
	}

	handleError(error: any): void {
		let response = '';

		if (error.code === 'IOException' || error.code === 'ConnectException') {
			response = error.message;
		} else if (error.status === 500) {
			response = error.message || error.statusText;
		} else if (
			error.status === 504 &&
			error.url.includes('/longpolling/poll')
		) {
			response = error.message || error.error;
			this._longPollingError.next(response);
		} else if (error.error === true && error.data?.message) {
			response = error.data.message;
		} else if (error.error?.message) {
			response = error.error.message;
		} else if (error.message) {
			response = error.message;
		}

		if (!response) {
			response = "Erreur dans l'application.";
		}

		this._error.next(response);
	}
}
