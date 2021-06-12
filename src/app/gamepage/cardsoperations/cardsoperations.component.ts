import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MonopolyMqttService } from 'src/app/shared/monopoly-mqtt.service';
import { PlayerMsgChanCar } from 'src/app/shared/player-msg-chan-car';
import { PlayershttpService } from 'src/app/shared/playershttp.service';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';

import { CardsService } from '../Cards.service';
import { CardsModel } from '../models/cardsmodel.model';
import { PlayerModel } from '../models/player.model';
import { PlayerService } from '../services/player.service';
export interface PlayerData {
  name: string;
  admin: number;
}
@Component({
  selector: 'app-cardsoperations',
  templateUrl: './cardsoperations.component.html',
  styleUrls: ['./cardsoperations.component.css'],
})
export class CardsoperationsComponent implements OnInit, OnDestroy {
  constructor(
    private cardsService: CardsService,
    private playerHttpService: PlayershttpService,
    private mqttService: MonopolyMqttService,
    private cardService: CardsService,
    private playerService: PlayerService,
    private sweetAlertSer: SweetAlertService,
    private renderer: Renderer2
  ) {}
  ngOnDestroy(): void {}
  public miplayer: PlayerModel = JSON.parse(localStorage.getItem('playerData'));
  listPlayers: PlayerData[] = [];

  @Output() shrinkCard = new EventEmitter<boolean>();
  @Input() actualCard: CardsModel;
  @Input() indexCard: number;
  @Input() issendingMoney: false;
  @ViewChild('f') miform: NgForm;
  money: number;
  ngOnInit(): void {
    this.playerHttpService.getAllPlayers().subscribe((res) => {
      //this.listPlayers = res;

      for (var i in res) this.listPlayers.push(res[i]);
    });
    this.renderer.addClass(document.body, 'block-scroll-menu');
  }

  closeOperationMenu() {
    this.cardsService.operacionCards.next({ act: false, card: null });
    this.shrinkCard.emit(false);
    this.renderer.removeClass(document.body, 'block-scroll-menu');
  }

  sendMsg(topic) {
    if (this.issendingMoney) {
      if (this.miform.valid) {
        let premsg1: PlayerMsgChanCar = {
          action: 'pay',
          player: this.miplayer.userName.toString().toUpperCase(),
          data: this.money,
        };
        let msg1 = JSON.stringify(premsg1);

        if (this.playerService.UpdateMoney(-this.money) >= 0) {
          this.mqttService.unsafePublish(topic, msg1);
          this.cardService.operacionCards.next({ act: false, card: null });
          this.sweetAlertSer.alertSucces2('Operation succeded');
          this.renderer.removeClass(document.body, 'block-scroll-menu');
        } else {
          this.sweetAlertSer.alertError(
            'you Do not have enough money to do this'
          );
        }
      } else {
        this.sweetAlertSer.alertError('Error please insert a valid  number');
      }
    } else {
      let premsg: PlayerMsgChanCar = {
        action: 'change',
        player: this.miplayer.userName.toString().toUpperCase(),
        data: this.actualCard,
      };
      let msg = JSON.stringify(premsg);
      this.mqttService.unsafePublish(topic, msg);
      this.cardService.operacionCards.next({ act: false, card: null });
      this.playerService.removePlayerCard(this.indexCard);
      this.sweetAlertSer.alertSucces2('Operation succeded');
      this.renderer.removeClass(document.body, 'block-scroll-menu');
    }
  }
}
