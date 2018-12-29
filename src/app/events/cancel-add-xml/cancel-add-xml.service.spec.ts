import { TestBed } from '@angular/core/testing';

import { CancelAddXmlService } from './cancel-add-xml.service';

describe('CancelAddXmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancelAddXmlService = TestBed.get(CancelAddXmlService);
    expect(service).toBeTruthy();
  });
});
