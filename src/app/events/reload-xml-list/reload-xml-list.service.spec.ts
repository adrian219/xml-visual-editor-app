import { TestBed } from '@angular/core/testing';

import { ReloadXmlListService } from './reload-xml-list.service';

describe('ReloadXmlListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReloadXmlListService = TestBed.get(ReloadXmlListService);
    expect(service).toBeTruthy();
  });
});
