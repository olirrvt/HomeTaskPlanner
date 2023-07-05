import { TestBed } from '@angular/core/testing';

import { ServResidencialService } from './serv-residencial.service';

describe('ServResidencialService', () => {
  let service: ServResidencialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServResidencialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
