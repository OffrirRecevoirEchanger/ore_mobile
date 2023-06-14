import { Directive, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
@Directive()
export abstract class LocalStorageService {
	abstract get(key: string): any;
	abstract set(key: string, value: any): void;
	abstract remove(key: string): void;
	abstract clear(): void;
}
