import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageNativeService extends LocalStorageService {
	get(key: string) {
		return SecureStoragePlugin.get({ key });
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
