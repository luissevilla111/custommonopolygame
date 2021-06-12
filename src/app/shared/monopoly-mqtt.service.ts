import { Injectable } from '@angular/core';

import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class MonopolyMqttService {
  private endpoint: string;
  constructor(
    private _mqttService: MqttService,
    private constanService: ConstantsService
  ) {
    this.endpoint = `monopoly/game/${this.constanService.getIdM()}`;
  }

  topic(topic: string): Observable<IMqttMessage> {
    if (topic) {
      this.endpoint = `monopoly/game/${this.constanService.getIdM()}/${topic}`;
    }
    // console.log(this.endpoint);

    return this._mqttService.observe(this.endpoint);
  }
  public unsafePublish(topic: string, message: any): void {
    //console.log(`monopoly/game/${topic}`);
    this._mqttService.unsafePublish(
      `monopoly/game/${this.constanService.getIdM()}/${topic}`,
      message,
      {
        qos: 1,
        retain: false,
      }
    );
  }
}
