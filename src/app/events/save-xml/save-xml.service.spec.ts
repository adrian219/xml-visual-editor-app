import { TestBed } from '@angular/core/testing';

import { SaveXmlService } from './save-xml.service';

describe('SaveXmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveXmlService = TestBed.get(SaveXmlService);
    expect(service).toBeTruthy();
  });
});
