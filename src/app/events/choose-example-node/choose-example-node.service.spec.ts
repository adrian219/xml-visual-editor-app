import { TestBed } from '@angular/core/testing';

import { ChooseExampleNodeService } from './choose-example-node.service';

describe('ChooseExampleNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChooseExampleNodeService = TestBed.get(ChooseExampleNodeService);
    expect(service).toBeTruthy();
  });
});
