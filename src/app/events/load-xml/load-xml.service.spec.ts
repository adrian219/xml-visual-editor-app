import { TestBed } from '@angular/core/testing';

import { LoadXmlService } from './load-xml.service';

describe('LoadXmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadXmlService = TestBed.get(LoadXmlService);
    expect(service).toBeTruthy();
  });
});
