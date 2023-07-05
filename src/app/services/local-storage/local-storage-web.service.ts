import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageWebService extends LocalStorageService {
	get(key: string): Observable<any> {
		return of(localStorage.getItem(key));
	}

	set(key: string, value: any): void {
		localStorage.setItem(key, value);
	}

	remove(key: string): Observable<boolean> {
		localStorage.removeItem(key);
		return of(true);
	}

	clear(): Observable<boolean> {
		localStorage.clear();
		return of(true);
	}
}
