import { TestBed } from '@angular/core/testing';

import { OwnXmlsService } from './own-xmls.service';

describe('OwnXmlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwnXmlsService = TestBed.get(OwnXmlsService);
    expect(service).toBeTruthy();
  });
});
