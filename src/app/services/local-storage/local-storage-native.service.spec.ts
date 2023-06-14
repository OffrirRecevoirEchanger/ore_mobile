import { TestBed } from '@angular/core/testing';

import { LocalStorageNativeService } from './local-storage/local-storage-native.service';

describe('LocalStorageNativeService', () => {
	let service: LocalStorageNativeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LocalStorageNativeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
