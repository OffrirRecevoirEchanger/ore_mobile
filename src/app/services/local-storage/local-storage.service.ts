import { Directive, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
@Directive()
export abstract class LocalStorageService {
	abstract get(key: string): Observable<any>;
	abstract set(key: string, value: any): void;
	abstract remove(key: string): Observable<any>;
	abstract clear(): void;
}
