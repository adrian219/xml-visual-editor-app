import { TestBed } from '@angular/core/testing';

import { ChangeXmlNodesService } from './change-xml-nodes.service';

describe('ChangeXmlNodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeXmlNodesService = TestBed.get(ChangeXmlNodesService);
    expect(service).toBeTruthy();
  });
});
