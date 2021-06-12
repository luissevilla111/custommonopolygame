import { TestBed } from '@angular/core/testing';

import { ThirdofkindService } from './thirdofkind.service';

describe('ThirdofkindService', () => {
  let service: ThirdofkindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdofkindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
