import { TestBed } from '@angular/core/testing';

import { AlertMenuService } from './alert-menu.service';

describe('AlertMenuService', () => {
  let service: AlertMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
