import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CardsService } from '../Cards.service';
import { CardsModel } from '../models/cardsmodel.model';
import Swal from 'sweetalert2';
import {
  transition,
  style,
  trigger,
  keyframes,
  state,
  animate,
} from '@angular/animations';
import { PlayerService } from '../services/player.service';
import { SweetAlertService } from '../../shared/sweet-alert.service';
import { Subscription } from 'rxjs';
import { MonopolyMqttService } from 'src/app/shared/monopoly-mqtt.service';

@Component({
  selector: 'app-gcards',
  templateUrl: './gcards.component.html',
  styleUrls: ['./gcards.component.css'],
  animations: [
    trigger('part2CardsTrigger', [
      transition('void => *', [
        style({
          opacity: 1,
          transform: 'translateY(-100%)',
        }),
        animate(
          500,
          keyframes([
            style({
              opacity: 1,
              transform: 'translateY(-80%)',
            }),
            style({
              opacity: 1,
              transform: 'translateY(-50%)',
            }),
            style({
              opacity: 1,
              transform: 'translateY(-20%)',
            }),
            style({
              opacity: 1,
              transform: 'translateY(0%)',
            }),
          ])
        ),
      ]),
      transition('* => void', [
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        }),
        animate(
          500,
          keyframes([
            style({
              opacity: 1,
              transform: 'translateY(-20%)',
            }),
            style({
              opacity: 1,
              transform: 'translateY(-50%)',
            }),
            style({
              opacity: 1,
              transform: 'translateY(-80%)',
            }),
            style({
              opacity: 1,
              transform: 'translateY(-100%)',
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class GcardsComponent implements OnInit, OnDestroy {
  constructor(
    public playerService: PlayerService,
    private sweetAleService: SweetAlertService,
    private cardShopService: CardsService
  ) {}
  ngOnDestroy(): void {
    if (this.toShrinkCardSub) {
      this.toShrinkCardSub.unsubscribe();
    }
  }
  @Input() card: CardsModel;
  @Input() owner; //to know if the card is on the store o the player have it
  @Input() indexCard: number;
  showRestCard = false; /**false */
  timerRestOfCard;
  ismortgage = false;
  toShrinkCardSub: Subscription;
  numHouses: number = 0;

  ngOnInit(): void {
    this.toShrinkCardSub = this.cardShopService.operacionCards.subscribe(
      (isvisible) => {
        if (!isvisible.act) {
          this.showRestCard = false;
        }
      }
    );
  }

  optCard(selectedCard: CardsModel) {
    let title: string = selectedCard.title;
    title = title.toUpperCase();
    if (this.owner === 'shop') {
      Swal.fire({
        title: `Do you want to buy ${title}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `YES`,
        denyButtonText: `NO`,
      }).then((result) => {
        // Read more about isConfirmed, isDenied below

        if (result.isConfirmed) {
          if (
            this.playerService.buyPropertie(selectedCard, this.indexCard) ===
            'bought'
          ) {
            this.successAlert();
          } else {
            this.errorAlert();
          }
        } else if (result.isDenied) {
          //Swal.fire('You cancel the deal', '', 'info');
        }
      });
    }
  }

  successAlert() {
    Swal.fire({
      title: 'success',
      icon: 'success',
      timer: 3000,
    });
  }
  errorAlert() {
    //Swal.fire('Error you do not have enough money!', '', 'error');
    Swal.fire({
      title: 'Error',
      text: 'Error you do not have enough money!',
      icon: 'error',
      timer: 3000,
    });
  }

  onCardTitlteClicked() {
    if (this.owner === 'user') {
      if (!this.showRestCard) {
        this.showRestCard = true;
        this.timerRestOfCard = setTimeout(() => {
          this.showRestCard = false;
        }, 5000);
      } else {
        clearTimeout(this.timerRestOfCard);
        this.showRestCard = false;
      }
    }
  }

  hipotecar(valuePro: number) {
    this.stopCardshrinking();
    if (this.card.ismortagge === 0) {
      this.sweetAleService
        .alertThreeButtons(
          'question',
          'Do you really wanna mortgage',
          'Yes',
          'No'
        )
        .then((result) => {
          if (result.isConfirmed) {
            this.playerService.UpdateMoney(valuePro / 2);
            //this.ismortgage = true;
            this.card.ismortagge = 1;
            this.playerService.mortaggePlayerCard(this.indexCard, 1);
          } else if (result.isDenied) {
          }
          this.showRestCard = false;
        });
    } else {
      this.sweetAleService
        .alertThreeButtons('question', 'Do you want to Unmortgage', 'Yes', 'No')
        .then((result) => {
          if (result.isConfirmed) {
            this.playerService.UpdateMoney(-valuePro);

            //this.ismortgage = false;
            this.playerService.mortaggePlayerCard(this.indexCard, 0);
            this.card.ismortagge = 0;
          }
          this.showRestCard = false;
        });
    }
  }

  returnPro(card: CardsModel) {
    if (card.ismortagge === 0) {
      this.sweetAleService
        .alertThreeButtons(
          'question',
          'Do you really want to return the card ?',
          'Yes',
          'No'
        )
        .then((result) => {
          if (result.isConfirmed) {
            this.playerService.UpdateMoney(card.valuePro);
            this.cardShopService.addCardShop(card);
            this.playerService.removePlayerCard(this.indexCard);
          }
          this.showRestCard = false;
        });
      this.stopCardshrinking();
    }
  }

  changeProperty() {
    if (this.card.ismortagge === 0) {
      this.stopCardshrinking();
      this.cardShopService.operacionCards.next({
        act: true,
        card: this.card,
        index: this.indexCard,
      });
      //this.playerService.removePlayerCard(this.indexCard);
    }
  }

  stopCardshrinking() {
    clearTimeout(this.timerRestOfCard);
  }

  build() {
    this.playerService.buildMode.next({
      index: this.indexCard,
      actualHome: this.card.buildNum,
    });
    /* this.sweetAleService
      .alertThreeButtons('question', 'What you Want to do', 'Build', 'Destroy')
      .then((answer) => {
        if (answer.isConfirmed) {
          this.numHouses++;
          this.playerService.buildHouse(this.indexCard);
        }
      }); */
  }
}
