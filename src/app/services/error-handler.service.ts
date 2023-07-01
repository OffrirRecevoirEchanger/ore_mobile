import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
	handleError(error: any): void {
		console.log('ERROR HAS OCCURED (log from ErrorHandlerService)');
		console.log(error);
		throw new Error('Method not implemented.');
	}
}
