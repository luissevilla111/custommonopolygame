import { TestBed } from '@angular/core/testing';

import { ResizewindowService } from './resizewindow.service';

describe('ResizewindowService', () => {
  let service: ResizewindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizewindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
