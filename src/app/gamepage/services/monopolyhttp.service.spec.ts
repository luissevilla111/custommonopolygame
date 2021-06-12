import { TestBed } from '@angular/core/testing';

import { MonopolyhttpService } from './monopolyhttp.service';

describe('MonopolyhttpService', () => {
  let service: MonopolyhttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonopolyhttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
