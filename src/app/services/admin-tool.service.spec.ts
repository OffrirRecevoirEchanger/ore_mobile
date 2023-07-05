import { TestBed } from '@angular/core/testing';

import { AdminToolService } from './admin-tool.service';

describe('AdminToolService', () => {
  let service: AdminToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
