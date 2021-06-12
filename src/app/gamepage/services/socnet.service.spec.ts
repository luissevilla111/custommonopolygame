import { TestBed } from '@angular/core/testing';

import { SocnetService } from './socnet.service';

describe('SocnetService', () => {
  let service: SocnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
