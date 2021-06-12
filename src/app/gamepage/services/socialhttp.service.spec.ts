import { TestBed } from '@angular/core/testing';

import { SocialhttpService } from './socialhttp.service';

describe('SocialhttpService', () => {
  let service: SocialhttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialhttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
