import { TestBed } from '@angular/core/testing';

import { AbstractService } from './abstract.service';

describe('AbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractService = TestBed.get(AbstractService);
    expect(service).toBeTruthy();
  });
});
