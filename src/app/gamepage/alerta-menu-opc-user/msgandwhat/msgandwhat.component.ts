import { Component, Input, OnInit } from '@angular/core';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';
import { SocialnetMessages } from '../../models/socialnetMessages.model';
import { PlayerService } from '../../services/player.service';
import { SocnetService } from '../../services/socnet.service';
export interface MailCard {
  action: string;
  cant: number;
  read: number;
  text: string;
}
@Component({
  selector: 'app-msgandwhat',
  templateUrl: './msgandwhat.component.html',
  styleUrls: ['./msgandwhat.component.css'],
})
export class MsgandwhatComponent implements OnInit {
  @Input() backColor: number;
  msgarray: SocialnetMessages[];
  message;

  constructor(
    private socialmsgService: SocnetService,
    private playerService: PlayerService,
    private sweetService: SweetAlertService
  ) {}

  ngOnInit(): void {
    switch (this.backColor) {
      case 1:
        // this.getCardsAvailable();
        this.showWhatsCard();
        break;

      case 2:
        //console.log('pedro');
        this.showMessengerCard();

        break;
    }
  }

  showMessengerCard() {
    this.socialmsgService.getMessengerAvailableCards().subscribe((res) => {
      this.proccessMessages(res, 'm');
    });
  }

  showWhatsCard() {
    this.socialmsgService.getWhatsAvailableCards().subscribe((res) => {
      this.proccessMessages(res, 'w');
    });
  }

  proccessMessages(res, type) {
    let totalMails = Object.keys(res).length;
    console.log(res);
    console.log(totalMails);

    if (totalMails > 0) {
      const ind = Math.floor(Math.random() * totalMails);
      let mailObj: MailCard = res[Object.keys(res)[ind]]; //returns 'someVal'
      const indxObject = Object.keys(res)[ind];

      this.message = mailObj.text;
      mailObj.read = 1;
      if (type === 'm') {
        this.socialmsgService
          .updateMessengerCard(indxObject, mailObj)
          .subscribe((patchRes) => {
            //console.log(patchRes);
          });
      } else {
        if (type === 'w') {
          this.socialmsgService
            .updateWhatsCards(indxObject, mailObj)
            .subscribe(() => {});
        }
      }

      if (this.playerService.UpdateMoney(mailObj.cant) < 0) {
        //alert
        this.sweetService.alertError2('you do not have enough money');
      } else {
        //this.socialmsgService.
      }
    } else {
      this.shuffleCards(type);
    }
  }

  shuffleCards(type) {
    if (type === 'm') {
      this.socialmsgService.getAllMessagesMessengerNumber().subscribe((res) => {
        let totalMails = Object.keys(res).length;

        //console.log(res);
        for (let index = 0; index < totalMails; index++) {
          let keyObj = Object.keys(res)[index];
          res[Object.keys(res)[index]].read = 0;
          this.socialmsgService
            .updateMessengerCard(keyObj, res[Object.keys(res)[index]])
            .subscribe((result) => {
              //this.proccessMessages(result, type);
            });
        }

        this.showMessengerCard();
      });
    } else {
      if (type === 'w') {
        this.socialmsgService.getAllMessagesWhatsNumber().subscribe((res) => {
          let totalMails = Object.keys(res).length;

          //console.log(res);
          for (let index = 0; index < totalMails; index++) {
            let keyObj = Object.keys(res)[index];
            res[Object.keys(res)[index]].read = 0;
            this.socialmsgService
              .updateWhatsCards(keyObj, res[Object.keys(res)[index]])
              .subscribe((result) => {
                //this.proccessMessages(result, type);
              });
          }

          this.showWhatsCard();
        });
      }
    }
  }
}
