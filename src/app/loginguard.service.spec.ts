import { TestBed } from '@angular/core/testing';

import { LoginguardService } from './loginguard.service';

describe('LoginguardService', () => {
  let service: LoginguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
