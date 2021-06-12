import { TestBed } from '@angular/core/testing';

import { GameGuardService } from './game-guard.service';

describe('GameGuardService', () => {
  let service: GameGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
