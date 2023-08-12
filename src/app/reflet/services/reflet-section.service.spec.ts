import { TestBed } from '@angular/core/testing';

import { RefletSectionService } from './reflet-section.service';

describe('RefletSectionService', () => {
  let service: RefletSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefletSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
