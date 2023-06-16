import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export abstract class HttpRequestService {
	abstract get(url: string, params: any, headers: any): Observable<any>;
	abstract post(url: string, data: any, headers: any): Observable<any>;
	abstract put(url: string, data: any, headers: any): Observable<any>;
	abstract delete(url: string, headers: any): Observable<any>;
}
