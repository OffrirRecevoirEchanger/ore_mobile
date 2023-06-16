import { HttpClient } from '@angular/common/http';
import { HttpRequestWebService } from '../services/http-request/http-request-web.service';
import { HttpRequestService } from '../services/http-request/http-request.service';

export function httpRequestServiceFactory(
	http: HttpClient
): HttpRequestService {
	return new HttpRequestWebService(http);
}
