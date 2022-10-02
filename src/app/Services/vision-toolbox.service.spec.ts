import { TestBed } from '@angular/core/testing';

import { VisionToolboxService } from './vision-toolbox.service';

describe('VisionToolboxService', () => {
  let service: VisionToolboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisionToolboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
