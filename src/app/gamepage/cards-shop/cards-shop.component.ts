import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardsService } from '../Cards.service';
import { Router } from '@angular/router';
import { CardsModel } from '../models/cardsmodel.model';
import { PlayerModel } from '../models/player.model';
import { PlayerService } from '../services/player.service';
import { Subscription } from 'rxjs';
import { MonopolyMqttService } from '../../shared/monopoly-mqtt.service';
import { IMqttMessage } from 'ngx-mqtt';
import { MonopolyhttpService } from '../services/monopolyhttp.service';

@Component({
  selector: 'app-cards-shop',
  templateUrl: './cards-shop.component.html',
  styleUrls: ['./cards-shop.component.css'],
})
export class CardsShopComponent implements OnInit, OnDestroy {
  constructor(
    public cardsService: CardsService,
    private router: Router,
    private playerService: PlayerService,
    private readonly mqttService: MonopolyMqttService,
    private monohttpService: MonopolyhttpService
  ) {}
  ngOnDestroy(): void {
    this.cardsSub.unsubscribe();
    if (this.mqttSubcription) {
      this.mqttSubcription.unsubscribe();
    }
  }

  cardsSub: Subscription;
  cards: CardsModel[];
  owner = 'noone';
  player: PlayerModel;
  mqttSubcription: Subscription;

  h2title: string = 'Error';
  ngOnInit(): void {
    this.cardsSub = this.cardsService.cardsChanged.subscribe(
      (cardss: CardsModel[]) => {
        if (this.owner === 'shop') {
          this.cards = cardss;
        }
      }
    );

    this.subscribeToTopic();

    this.player = this.playerService.getPlayerInfo();
    switch (this.router.url) {
      case '/game/Mycards':
        this.h2title = 'My cards';
        // this.cards = this.player.cards;
        /*sorted array */
        this.cards = this.playerService.getPlayerCards();

        this.owner = 'user';
        break;

      case '/game/shop':
        this.h2title = 'Remaining Cards';
        if (localStorage.getItem('gameStatus')) {
          //this.monohttpService.fetchCards();
        }
        this.monohttpService.fetchCards();
        this.cards = this.cardsService.getCards();
        this.owner = 'shop';
    }
  }

  private subscribeToTopic() {
    this.mqttSubcription = this.mqttService
      .topic('cards')
      .subscribe((msg: IMqttMessage) => {
        const jsonMsg = JSON.parse(msg.payload.toString());

        switch (jsonMsg.action) {
          case 'update':
            //this.cardsService.cardsChanged.next(this.cardsService.getCards());
            this.monohttpService.fetchCards();
        }
      });
  }
}
