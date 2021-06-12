import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocialnetMessages } from 'src/app/gamepage/models/socialnetMessages.model';
import { CreatorcardService } from 'src/app/shared/creatorcard.service';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';

@Component({
  selector: 'app-mailcardsgenerator',
  templateUrl: './mailcardsgenerator.component.html',
  styleUrls: ['./mailcardsgenerator.component.css'],
})
export class MailcardsgeneratorComponent implements OnInit, OnDestroy {
  message = '';
  moneymsg = '0';
  jsonTxt = `"messenger" : [],
  "whats" : []`;
  packageCards: SocialnetMessages[] = [];

  whatsAppCards: SocialnetMessages[] = [];
  messengerCards: SocialnetMessages[] = [];
  radioOption = 'green';
  cbxMsg = 'recieve';
  isEditing = false;
  editSub: Subscription;
  indexCard: number;

  constructor(
    private creatorCardSer: CreatorcardService,
    private sweetAlSer: SweetAlertService
  ) {}
  ngOnDestroy(): void {
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.editSub = this.creatorCardSer.infoCard.subscribe(
      (data: { card: SocialnetMessages; index: number }) => {
        this.isEditing = true;
        this.indexCard = data.index;
        this.message = data.card.msg;
        this.cbxMsg = data.card.action;
        this.moneymsg = data.card.cant.toString();
      }
    );
  }

  newCardEmail() {
    let preMsg: SocialnetMessages = new SocialnetMessages(
      this.message,
      this.cbxMsg,
      +this.moneymsg
    );

    if (this.message !== '') {
      if (this.radioOption === 'green') {
        //whats app message
        const cardWhats = { ...preMsg };
        if (!this.isEditing) {
          this.whatsAppCards.push(cardWhats);
          this.sweetAlSer.alertSucces2('Card added');
        } else {
          this.whatsAppCards[this.indexCard] = cardWhats;
          this.isEditing = false;
          this.sweetAlSer.alertSucces2('Card modified');
        }

        this.packageCards = [...this.whatsAppCards];
      } else {
        if (this.radioOption === 'blue') {
          const cardMesger = { ...preMsg };
          if (!this.isEditing) {
            this.messengerCards.push(cardMesger);
            this.sweetAlSer.alertSucces2('Card added');
          } else {
            this.messengerCards[this.indexCard] = cardMesger;
            this.isEditing = false;
            this.sweetAlSer.alertSucces2('Card modified');
          }

          this.packageCards = [...this.messengerCards];
        }
      }
      this.message = '';
      this.createJson();
    }
  }

  radioChanged(event: any) {
    this.isEditing = false;
    if (event.target.value === 'green') {
      this.packageCards = [...this.whatsAppCards];
    } else {
      this.packageCards = [...this.messengerCards];
    }
  }

  deleteCard() {
    if (this.radioOption === 'green') {
      this.whatsAppCards.splice(this.indexCard, 1);
      this.packageCards = [...this.whatsAppCards];
    } else {
      this.messengerCards.splice(this.indexCard, 1);
      this.packageCards = [...this.messengerCards];
    }
  }
  createJson() {
    let msgerJson = '';
    let whJson = '';

    for (let index = 0; index < this.messengerCards.length; index++) {
      const element = this.messengerCards[index];
      msgerJson += `{
        "action" : "${element.action}",
        "cant" : ${element.action !== 'other' ? element.cant : 0},
        "read" : 0,
        "text" : "${element.msg}"
      }
      `;
      if (this.messengerCards[index + 1]) {
        msgerJson += ',';
      }
    }

    for (let index = 0; index < this.whatsAppCards.length; index++) {
      const element = this.whatsAppCards[index];
      whJson += `{
        "action" : "${element.action}",
        "cant" : ${element.action !== 'other' ? element.cant : 0},
        "read" : 0,
        "text" : "${element.msg}"
      }
      `;
      if (this.whatsAppCards[index + 1]) {
        whJson += ',';
      }
    }

    this.jsonTxt = `"messenger" : [
      ${msgerJson}
    ],
    "whats" : [
      ${whJson}
    ]`;
  }
}
