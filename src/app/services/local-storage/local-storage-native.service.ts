import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageNativeService extends LocalStorageService {
	get(key: string): Observable<any> {
		const subject = new Subject<any>();

		from(SecureStoragePlugin.get({ key })).subscribe({
			next: (storageResponse) => {
				subject.next(storageResponse);
				subject.complete();
			},
			error: (error) => {
				console.error(error);
			},
		});

		return subject.asObservable();
	}
	set(key: string, value: any): void {
		SecureStoragePlugin.set({ key, value });
	}
	remove(key: string): void {
		SecureStoragePlugin.remove({ key });
	}
	clear(): void {
		SecureStoragePlugin.clear();
	}
}
