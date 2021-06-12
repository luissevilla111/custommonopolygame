import { TestBed } from '@angular/core/testing';

import { MonopolyMqttService } from '../../shared/monopoly-mqtt.service';

describe('MonopolyMqttService', () => {
  let service: MonopolyMqttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonopolyMqttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
