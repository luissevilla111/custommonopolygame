import { TestBed } from '@angular/core/testing';

import { ShopcardsService } from './shopcards.service';

describe('ShopcardsService', () => {
  let service: ShopcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopcardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
