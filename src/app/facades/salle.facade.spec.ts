import { TestBed } from '@angular/core/testing';

import { SalleService } from './salle.facade';

describe('SalleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalleService = TestBed.get(SalleService);
    expect(service).toBeTruthy();
  });
});
