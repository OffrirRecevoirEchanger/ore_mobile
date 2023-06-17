import { TestBed } from '@angular/core/testing';

import { OreMembreService } from './ore-membre.service';

describe('OreMembreService', () => {
  let service: OreMembreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OreMembreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
