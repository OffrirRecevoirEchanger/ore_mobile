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

		from(SecureStoragePlugin.get({ key })).subscribe((storageResponse) => {
			subject.next(storageResponse.value);
			subject.complete();
		});

		return subject.asObservable();
	}

	set(key: string, value: any): void {
		SecureStoragePlugin.set({ key, value });
	}

	remove(key: string): Observable<boolean> {
		const subject = new Subject<boolean>();

		from(SecureStoragePlugin.remove({ key })).subscribe(
			(storageResponse) => {
				subject.next(storageResponse.value);
				subject.complete();
			}
		);

		return subject.asObservable();
	}

	clear(): Observable<boolean> {
		const subject = new Subject<boolean>();

		from(SecureStoragePlugin.clear()).subscribe((storageResponse) => {
			subject.next(storageResponse.value);
			subject.complete();
		});

		return subject.asObservable();
	}
}
