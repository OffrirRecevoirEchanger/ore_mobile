import { TestBed } from '@angular/core/testing';

import { HttpRequestWebService } from './http-request-web.service';

describe('HttpRequestWebService', () => {
  let service: HttpRequestWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
