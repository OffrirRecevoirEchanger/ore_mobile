import { TestBed } from '@angular/core/testing';

import { HttpRequestNativeService } from './http-request-native.service';

describe('HttpRequestNativeService', () => {
  let service: HttpRequestNativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestNativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
