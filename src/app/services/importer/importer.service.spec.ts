import { TestBed } from '@angular/core/testing';

import { ImporterService } from './importer.service';

describe('ImporterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImporterService = TestBed.get(ImporterService);
    expect(service).toBeTruthy();
  });
});
