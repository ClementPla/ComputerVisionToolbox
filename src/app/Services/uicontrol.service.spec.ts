import { TestBed } from '@angular/core/testing';

import { UIControlService } from './uicontrol.service';

describe('UIControlService', () => {
  let service: UIControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
