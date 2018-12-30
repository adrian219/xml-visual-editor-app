import { TestBed } from '@angular/core/testing';

import { CheckTakenService } from './check-taken.service';

describe('CheckTakenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckTakenService = TestBed.get(CheckTakenService);
    expect(service).toBeTruthy();
  });
});
