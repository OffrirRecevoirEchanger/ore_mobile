import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageWebService extends LocalStorageService {
	get(key: string): any {
		return localStorage.getItem(key);
	}
	set(key: string, value: any): void {
		localStorage.setItem(key, value);
	}
	remove(key: string): void {
		localStorage.removeItem(key);
	}
	clear(): void {
		localStorage.clear();
	}
}
