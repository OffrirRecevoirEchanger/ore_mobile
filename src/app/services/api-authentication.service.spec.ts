import { TestBed } from '@angular/core/testing';

import { ApiAuthenticationService } from './api-authentication.service';

describe('AuthenticationService', () => {
	let service: ApiAuthenticationService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ApiAuthenticationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
