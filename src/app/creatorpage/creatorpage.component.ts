import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { NgForm } from '@angular/forms';
import { start } from 'repl';
import { Subscription } from 'rxjs';
import { CardsModel } from '../gamepage/models/cardsmodel.model';
import { SocialnetMessages } from '../gamepage/models/socialnetMessages.model';
import { CreatorcardService } from '../shared/creatorcard.service';
import { SweetAlertService } from '../shared/sweet-alert.service';

@Component({
  selector: 'app-creatorpage',
  templateUrl: './creatorpage.component.html',
  styleUrls: ['./creatorpage.component.css'],
})
export class CreatorpageComponent implements OnInit, OnDestroy {
  packageCards: CardsModel[] = [];
  card: CardsModel = new CardsModel(
    '#08b6ce',
    'title here',
    5,
    [15, 25, 85, 150, 250],
    50,
    50,
    1,
    1,
    0,
    0
  );
  owner = 'creator'; //
  i = 0;
  color;
  colour;
  ispickingColour = false;
  startNumber = 0;
  idInput = 0;
  copyCard: CardsModel;
  isEditingCard = false;
  currenCardIndex = 0;
  insidecardsjson = '';
  creatorSub: Subscription;
  jsonTxt = `{
    "cards" : [
      ${this.insidecardsjson}
    ],
    "mailcards" : {
      //delete this text an paste here the mail cards
    }
  }`;

  constructor(
    private sweetAlertSer: SweetAlertService,
    private creatorCardSer: CreatorcardService
  ) {}
  ngOnDestroy(): void {
    if (this.creatorSub) {
      this.creatorSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.creatorSub = this.creatorCardSer.infoCard.subscribe(
      (data: { card: CardsModel; index: number }) => {
        this.isEditingCard = true;
        this.card = data.card;
        this.currenCardIndex = data.index;
      }
    );
  }

  changeComplete(event) {
    this.colour = event.color.hex;
    this.card.color = this.colour;
  }

  pickColour() {
    this.ispickingColour = true;
  }
  closeColourPicker() {
    this.ispickingColour = false;
  }

  addCardToArray(f: NgForm) {
    this.copyCard = { ...this.card };
    this.resetJson();

    if (!this.isEditingCard) {
      this.packageCards.push(this.copyCard);
      this.idInput++;
      this.sweetAlertSer.alertSucces2('Card Created');
    } else {
      //updating card
      this.packageCards[this.currenCardIndex] = this.copyCard;
      this.isEditingCard = false;
      this.sweetAlertSer.alertSucces2('Card updated');
    }
    this.card.title = 'tittle here';
    this.generateJson();
  }

  resetJson() {
    this.insidecardsjson = '';
    this.jsonTxt = `{
      "cards" : [
        ${this.insidecardsjson}
      ],
      "mailcards" : {
        //delete this text an paste here the mail cards
      }
    }`;
  }

  /* editCard(index) {
    this.isEditingCard = true;
    this.card = { ...this.packageCards[index] };
    this.currenCardIndex = index;
  }

  showElemntsList(startNum) {
    this.startNumber += startNum;
    if (this.startNumber <= 0) {
      this.startNumber = 0;
    } else {
      if (!this.packageCards[this.startNumber]) {
        this.startNumber -= 5;
      }
    }
  } */

  eliminateCard() {
    this.resetJson();

    this.isEditingCard = false;
    this.packageCards.splice(this.currenCardIndex, 1);
    this.sweetAlertSer.alertInfo2('this card was removed');
    this.generateJson();
  }

  generateJson() {
    for (let index = 0; index < this.packageCards.length; index++) {
      const element = this.packageCards[index];
      this.insidecardsjson += `
      {
        "available" : 1,
        "buildPrices" : ${element.buildPrices},
        "cardNumber" : ${index + 1},
        "color" : "${element.color}",
        "homes" : [ ${element.homes[0]}, ${element.homes[1]}, ${
        element.homes[2]
      },${element.homes[3]}, ${element.homes[4]}],
        "ismortagge" : 0,
        "rent" : ${element.rent},
        "title" : "${element.title}",
        "valuePro" : ${element.valuePro}
      }
      `;
      if (this.packageCards[index + 1]) {
        this.insidecardsjson += `,`;
      }
    }

    this.jsonTxt = `{
      "cards" : [
        ${this.insidecardsjson}
      ],
      "mailcards" : {
        //delete this text and paste here the mail cards
      }
    }`;
  }
}
