import { Capacitor } from '@capacitor/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { LocalStorageNativeService } from '../services/local-storage/local-storage-native.service';
import { LocalStorageWebService } from '../services/local-storage/local-storage-web.service';

export function localStorageServiceFactory(): LocalStorageService {
	if (Capacitor.isNativePlatform()) {
		return new LocalStorageNativeService();
	} else {
		return new LocalStorageWebService();
	}
}
