import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardsService } from '../Cards.service';
import { CardsModel } from '../models/cardsmodel.model';
import { MonopolyMqttService } from '../../shared/monopoly-mqtt.service';
import { ConstantsService } from 'src/app/shared/constants.service';

@Injectable({
  providedIn: 'root',
})
export class MonopolyhttpService {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private mqttService: MonopolyMqttService,
    private constanService: ConstantsService
  ) {
    //endpoint
  }
  endpoint: string;
  //endpoint = 'https://monopolygame-b9c5d-default-rtdb.firebaseio.com/'; family endpoint

  //endpoint = 'https://monopolygame-b9c5d-default-rtdb.firebaseio.com/';
  UpdateCards() {
    this.endpoint = this.constanService.getEndpoint();
    const cards = this.injector.get(CardsService).getCards();
    //console.log(cards);
    this.http.put(`${this.endpoint}cards.json`, cards).subscribe((response) => {
      this.mqttService.unsafePublish(
        'cards',
        `{
          "action":"update",
          "payload":1
          }`
      );
    });
  }

  fetchCards() {
    this.endpoint = this.constanService.getEndpoint();
    this.http
      .get(`${this.endpoint}cards.json?orderBy=\"available\"&equalTo=1`)
      .subscribe((res) => {
        var cards: CardsModel[] = [];
        for (var i in res) cards.push(res[i]);
        const cardsser = this.injector.get(CardsService).setCards(cards);
      });
  }

  UpdateCard(index: number, card: CardsModel) {
    this.endpoint = this.constanService.getEndpoint();

    this.http
      .put(`${this.endpoint}cards/${index}.json`, card)
      .subscribe((response) => {
        this.mqttService.unsafePublish(
          'cards',
          `{
            "action":"update",
            "payload":1
            }`
        );
      });
  }

  ResetCards() {
    this.endpoint = this.constanService.getEndpoint();

    this.http.get(`${this.endpoint}cards.json`).subscribe((cards) => {
      const totalCards = Object.keys(cards).length;
      for (let i = 0; i < totalCards; i++) {
        let ava = {};
        this.http
          .patch(
            `${this.endpoint}cards.json`,
            `{"${i}/available":1,"${i}/buildNum":0}`
          )
          .subscribe((res) => {});
      }
    });
  }
}
