import { TestBed } from '@angular/core/testing';

import { CreatorcardService } from './creatorcard.service';

describe('CreatorcardService', () => {
  let service: CreatorcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatorcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
