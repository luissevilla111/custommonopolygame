import { destroyPlatform, Injectable, OnInit } from '@angular/core';
import { CardsService } from '../Cards.service';
import { CardsModel } from '../models/cardsmodel.model';
import { PlayerModel } from '../models/player.model';
import { MonopolyMqttService } from '../../shared/monopoly-mqtt.service';
import { MonopolyhttpService } from './monopolyhttp.service';
import { Subject } from 'rxjs';
import { PlayershttpService } from 'src/app/shared/playershttp.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    /**only executes once  in services*/
    private cardService: CardsService,
    private monohttpService: MonopolyhttpService,
    private playerHtppSer: PlayershttpService
  ) {}

  /* private players: PlayerModel[] = [
    new PlayerModel('luis111', 'img', 1500, 0, []),
  ];
  new CardsModel(
          '#ff3399',
          'Inglaterra',
          10,
          [75, 125, 400, 620, 725],
          200,
          100,
          15
        ),

  */
  private player: PlayerModel;
  public playerChanges = new Subject<PlayerModel>();

  public gameStatus = 'new';
  public buildMode = new Subject<{ index: number; actualHome: number }>();

  getIsNewGame() {
    return this.gameStatus;
  }

  buyPropertie(card: CardsModel, index: number) {
    const price = card.valuePro;

    if (this.player.money >= price) {
      this.UpdateMoney(-price);
      this.player.cards.push(card);
      this.player.TotProper++;
      this.cardService.removeCardShop(index);
      this.saveToLocalStorage();
      return 'bought';
    } else {
      return `You don't have enough money`;
    }
  }
  addNewCard(card: CardsModel) {
    this.player.cards.push(card);
    this.player.TotProper++;
    this.saveToLocalStorage();
    this.playerChanges.next(this.player);
  }

  getPlayerInfo() {
    //console.log('player');
    return this.player;
  }
  setNewPlayer(player: PlayerModel) {
    this.player = player;

    localStorage.setItem('playerData', JSON.stringify(this.player));

    this.playerChanges.next(this.player);
  }
  getPlayerCards() {
    return this.player.cards.sort((a, b) =>
      a.cardNumber > b.cardNumber ? 1 : b.cardNumber > a.cardNumber ? -1 : 0
    );
  }

  removePlayerCard(index: number) {
    this.player.cards[index].available = 1;
    this.player.cards.splice(index, 1);
    this.player.TotProper -= 1;
    this.saveToLocalStorage();
  }

  mortaggePlayerCard(index: number, mort: number) {
    this.player.cards[index].ismortagge = mort;
    this.saveToLocalStorage();
  }

  buildHouse(index: number, homes: number) {
    const oldNumHomes = this.player.cards[index].buildNum;
    const cost = this.player.cards[index].buildPrices;
    if (oldNumHomes < homes) {
      //player build
      const howManyBuild = homes - oldNumHomes;

      const gasto = howManyBuild * cost;
      if (this.UpdateMoney(-gasto) >= 0) {
        //se ha construido
      } else {
        //no alcanzo el dinero return -1
        return -1;
      }
    } else {
      const destroyed = oldNumHomes - homes;
      const moneyReturned = destroyed * (cost / 2);
      this.UpdateMoney(moneyReturned);
    }
    this.player.cards[index].buildNum = homes;
    this.saveToLocalStorage();
    return homes;
  }
  UpdateMoney(money: number) {
    const auxMoney = this.player.money + money;
    if (auxMoney >= 0) {
      this.player.money = auxMoney;
      this.saveToLocalStorage();

      return this.player.money;
    }
    return -1;
  }

  saveToLocalStorage() {
    localStorage.setItem('playerData', JSON.stringify(this.player));
    //save in database
    this.saveToDataBase(this.player);
  }

  saveToDataBase(player: PlayerModel) {
    this.playerHtppSer
      .getPlayer(this.player.userName.toUpperCase())
      .subscribe((res) => {
        const idd = Object.keys(res)[0];

        this.playerHtppSer
          .updatePlayer(idd, { info: player })
          .subscribe((resp) => {
            // console.log(resp);
          });
      });
  }
}
