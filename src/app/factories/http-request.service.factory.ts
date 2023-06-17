import { HttpClient } from '@angular/common/http';
import { HttpRequestWebService } from '../services/http-request/http-request-web.service';
import { HttpRequestService } from '../services/http-request/http-request.service';
import { Capacitor } from '@capacitor/core';
import { HttpRequestNativeService } from '../services/http-request/http-request-native.service';

export function httpRequestServiceFactory(
	http: HttpClient
): HttpRequestService {
	if (Capacitor.isNativePlatform()) {
		return new HttpRequestNativeService();
	} else {
		return new HttpRequestWebService(http);
	}
}
