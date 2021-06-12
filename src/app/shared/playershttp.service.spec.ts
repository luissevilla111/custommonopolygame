import { TestBed } from '@angular/core/testing';

import { PlayershttpService } from './playershttp.service';

describe('PlayershttpService', () => {
  let service: PlayershttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayershttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
