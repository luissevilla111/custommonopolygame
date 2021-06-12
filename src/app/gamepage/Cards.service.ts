import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { CardsModel } from './models/cardsmodel.model';
import { MonopolyMqttService } from '../shared/monopoly-mqtt.service';
import { MonopolyhttpService } from './services/monopolyhttp.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  public cardsChanged = new Subject<CardsModel[]>();
  /* private allCards: CardsModel[] = [
    new CardsModel('#f57242', 'mexico', 5, [15, 25, 100, 150, 250], 50, 50, 1),
    new CardsModel('#f57242', 'canada', 5, [15, 25, 100, 150, 250], 60, 50, 2),
    new CardsModel('#f57242', 'eua', 10, [25, 85, 150, 300, 460], 70, 50, 3),

    new CardsModel('#4287f5', 'chile', 10, [25, 100, 150, 250, 350], 80, 50, 4),
    new CardsModel('#4287f5', 'peru', 15, [25, 100, 150, 250, 350], 50, 50, 5),
    new CardsModel(
      '#4287f5',
      'costa rica',
      20,
      [25, 100, 150, 300, 500],
      100,
      50,
      6
    ),
  ]; */

  private allCards: CardsModel[] = [];
  public operacionCards = new Subject<
    | { act: boolean; card: null; index?: number }
    | { act: boolean; card: CardsModel; index?: number }
    /* | { act: boolean; card: any; index?: number } //here the card is the money to pay */
  >();

  constructor(
    private mqttService: MonopolyMqttService,
    private injector: Injector //private monoHttpService: MonopolyhttpService
  ) {
    //console.log(JSON.stringify(this.allCards));
  }

  public setCards(cards: CardsModel[]) {
    this.allCards = cards;
    this.cardsChanged.next(this.getCards());
  }
  public getCards() {
    if (this.allCards != null) {
      return this.allCards
        .sort((a, b) =>
          a.cardNumber > b.cardNumber ? 1 : b.cardNumber > a.cardNumber ? -1 : 0
        )
        .slice();
    }

    return (this.allCards = []);
  }

  public removeCardShop(index: number) {
    //this method do not eliminate the card from the database,but change its status
    //this.allCards.splice(index, 1);
    //console.log(this.allCards);
    this.allCards[index].available = 0; //it has to be 0
    const monoSer = this.injector.get(MonopolyhttpService);
    monoSer.UpdateCard(
      this.allCards[index].cardNumber - 1,
      this.allCards[index]
    );

    this.cardsChanged.next(this.getCards());
  }

  public addCardShop(card: CardsModel) {
    card.available = 1;
    this.allCards.push(card);
    const monoSer = this.injector.get(MonopolyhttpService);
    /*****here need to be solve */
    monoSer.UpdateCard(card.cardNumber - 1, card);
    this.cardsChanged.next(this.getCards());
  }
}
