import { TestBed } from '@angular/core/testing';

import { LocalStorageWebService } from './local-storage-web.service';

describe('LocalStorageWebService', () => {
  let service: LocalStorageWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
