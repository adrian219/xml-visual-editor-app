import { TestBed } from '@angular/core/testing';

import { ChangeXmlStringService } from './change-xml-string.service';

describe('ChangeXmlStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeXmlStringService = TestBed.get(ChangeXmlStringService);
    expect(service).toBeTruthy();
  });
});
