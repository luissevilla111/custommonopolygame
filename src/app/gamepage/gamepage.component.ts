import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PlayerService } from './services/player.service';
import { PlayerModel } from './models/player.model';
import { Subscription } from 'rxjs';
import { AlertMenuService } from './services/alert-menu.service';
import { CardsService } from './Cards.service';
import { MonopolyMqttService } from '../shared/monopoly-mqtt.service';
import { PlayerMsgChanCar } from '../shared/player-msg-chan-car';
import { SweetAlertService } from '../shared/sweet-alert.service';
import { CardsModel } from './models/cardsmodel.model';
import { PlayershttpService } from '../shared/playershttp.service';
import { info } from 'console';
import { ConstantsService } from '../shared/constants.service';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css'],
  animations: [
    trigger('ic-what', [
      transition('void => *', [
        style({
          transform: 'translateX(+10rem)',
        }),
        animate(300),
      ]),

      transition('* => void', [
        animate(700),
        style({
          transform: 'translateX(+10rem)',
        }),
      ]),
    ]),

    trigger('ic-msg', [
      transition('void => *', [
        style({
          transform: 'translateX(+10rem)',
        }),
        animate(400),
      ]),
      transition('* => void', [
        animate(600),
        style({
          transform: 'translateX(+10rem)',
        }),
      ]),
    ]),

    trigger('ic-cash', [
      transition('void => *', [
        style({
          transform: 'translateX(+10rem)',
        }),
        animate(500),
      ]),
      transition('* => void', [
        animate(500),
        style({
          transform: 'translateX(+10rem)',
        }),
      ]),
    ]),

    trigger('ic-credit', [
      transition('void=> *', [
        style({
          transform: 'translateX(+10rem)',
        }),
        animate(600),
      ]),
      transition('* => void', [
        animate(400),
        style({
          transform: 'translateX(+10rem)',
        }),
      ]),
    ]),

    trigger('ic-pay', [
      transition('void=> *', [
        style({
          transform: 'translateX(+10rem)',
        }),
        animate(700),
      ]),
      transition('* => void', [
        animate(300),
        style({
          transform: 'translateX(+10rem)',
        }),
      ]),
    ]),
    trigger('ic-cashier', [
      transition('void=> *', [
        style({
          transform: 'translateX(+10rem)',
        }),
        animate(800),
      ]),
      transition('* => void', [
        animate(200),
        style({
          transform: 'translateX(+10rem)',
        }),
      ]),
    ]),
  ],
})
export class GamepageComponent implements OnInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    private playerService: PlayerService,
    private alertMenuService: AlertMenuService,
    private cardService: CardsService,
    private mqttService: MonopolyMqttService,
    private sweetAlert: SweetAlertService,
    private playerHttpSer: PlayershttpService,
    private constanService: ConstantsService
  ) {}

  iconsWhats;
  isGameMenu = false;
  timerMenu;
  isAlertaMenu = false;
  iconSelected = 0;
  player: PlayerModel;
  alertMenu: Subscription;
  cardsOperationSub: Subscription;
  isoperationCard = false;
  playerListenertMqtt: Subscription;
  addNewCardSub: Subscription;
  selectedCard: CardsModel;
  selectedCardIndex: number;
  isSemdingMoney = false;
  checker200Sub: Subscription;
  listenerNewPlayers: Subscription;
  playerRecoverInfo: Subscription;
  buildMode = false;
  infoTobuildMode: { index: number; actualHome: number };

  ngOnInit(): void {
    let myplayer1: PlayerModel = JSON.parse(localStorage.getItem('playerData'));
    if (myplayer1) {
      /** the player has entered a room */

      this.playerService.setNewPlayer(myplayer1);
    }
    this.constanService.setIdM(localStorage.getItem('roomId').toString());
    this.constanService.setEndpoint(localStorage.getItem('endpoint'));

    this.playerService.buildMode.subscribe((data) => {
      this.infoTobuildMode = data;

      if (data) {
        this.buildMode = true;
      } else {
        this.buildMode = false;
      }
    });

    this.RecoveryInfo(myplayer1.userName.toUpperCase());

    /**to update the UI is neccessary to subscribe to changes */
    this.playerRecoverInfo = this.playerService.playerChanges.subscribe(
      (player: PlayerModel) => {
        this.player = this.playerService.getPlayerInfo();
      }
    );

    this.player = this.playerService.getPlayerInfo();
    this.alertMenu = this.alertMenuService.alertMenu.subscribe((value) => {
      this.isAlertaMenu = value;
      this.isGameMenu = false;
      this.renderer.removeClass(document.body, 'block-scroll-menu');
    });

    this.cardsOperationSub = this.cardService.operacionCards.subscribe(
      (isvisble) => {
        this.isoperationCard = isvisble.act;
        this.selectedCard = isvisble.card;
        this.selectedCardIndex = isvisble.index;
        this.isGameMenu = false;
        this.isSemdingMoney = false;
      }
    );

    this.playerListenertMqtt = this.mqttService
      .topic(this.player.userName.toString().toUpperCase())
      .subscribe((mensaje) => {
        let data: PlayerMsgChanCar = JSON.parse(mensaje.payload.toString());

        switch (data.action) {
          case 'change':
            this.playerService.addNewCard(data.data);
            this.sweetAlert.alertInfo2(
              `you have a new card ${data.data.title}`
            );
            break;

          case 'pay':
            //it is not neccesary to catch the negative one because your recive + money
            this.playerService.UpdateMoney(data.data);
            this.sweetAlert.alertInfo2(
              ` ${data.player} Deposit to you  ${data.data}`
            );
            break;
        }
      });

    this.checker200Sub = this.mqttService
      .topic('checker200')
      .subscribe((playerName) => {
        if (
          playerName.payload.toString() !== this.player.userName.toUpperCase()
        ) {
          this.sweetAlert.alertInfo2(`${playerName.payload} has charged $200`);
          let audio = new Audio('../../assets/audio/cashieraudi.mp3');
          audio.play();
        }
      });

    /**thi is toadd players afetr the room is created and to recover others */
    this.playerHttpSer.getPlayerAdmin().subscribe((res) => {
      if (res[0].name === myplayer1.userName.toUpperCase()) {
        let roomId = localStorage.getItem('roomId');
        /** recover admin info to continue last game**/
        let inforadmin = res[Object.keys(res)[0]];
        const playerData: PlayerModel = inforadmin.info;
        let isrecovermode = localStorage.getItem('recover');

        if (isrecovermode === 'Y') {
          this.playerService.setNewPlayer(playerData);
        }

        this.listenerNewPlayers = this.mqttService
          .topic(roomId)
          .subscribe((newPlayer) => {
            this.sweetAlert
              .alertThreeButtons('question', 'let player Enter ?', 'yes', 'no')
              .then((buttonCliked) => {
                if (buttonCliked.isConfirmed) {
                  //check if the user is new
                  const nameP = JSON.parse(newPlayer.payload.toString());
                  const name2 = nameP.namePlayer;
                  this.mqttService.unsafePublish(
                    'changePage',
                    localStorage.getItem('endpoint')
                  );
                  this.playerHttpSer.getPlayer(name2).subscribe((res) => {
                    if (Object.keys(res).length > 0) {
                      //user exist

                      let infor: PlayerModel = res[Object.keys(res)[0]];

                      setTimeout(() => {
                        this.mqttService.unsafePublish(
                          `${name2}/recovery`,
                          JSON.stringify(infor)
                        );
                      }, 2000);
                    } else {
                      //new user has entered
                      this.playerHttpSer
                        .addNewPlayer({ name: name2, admin: 0 })
                        .subscribe((res) => {});
                    }
                  });
                }
              });
          });
      }
      //}
    });
  }

  ngOnDestroy(): void {
    if (this.alertMenu) {
      this.alertMenu.unsubscribe();
    }
    if (this.cardsOperationSub) {
      this.cardsOperationSub.unsubscribe();
    }

    if (this.addNewCardSub) {
      this.addNewCardSub.unsubscribe();
    }
    if (this.playerListenertMqtt) {
      this.playerListenertMqtt.unsubscribe();
    }

    if (this.listenerNewPlayers) {
      this.listenerNewPlayers.unsubscribe();
    }
  }

  RecoveryInfo(playerName: string) {
    this.mqttService.topic(`${playerName}/recovery`).subscribe((msg) => {
      const infoString = msg.payload.toString();
      const playerJson = JSON.parse(infoString);
      let playerData: PlayerModel = playerJson.info;

      if (playerData.cards) {
      } else {
        playerData.cards = [];
      }

      this.playerService.setNewPlayer(playerData);

      //remplace local Storage
    });
  }

  gameMenuItems() {
    this.isGameMenu = !this.isGameMenu;
    if (this.isGameMenu) {
      this.timerMenu = setTimeout(() => {
        this.isGameMenu = false;
        this.isAlertaMenu = false;
      }, 5000);
    } else {
      clearTimeout(this.timerMenu);
    }
  }

  onActionMenu(icon: number, event?: Event) {
    this.isAlertaMenu = !this.isAlertaMenu;
    if (this.timerMenu) {
      clearTimeout(this.timerMenu);
    }

    if (!this.isAlertaMenu) {
      this.isGameMenu = false;
      this.renderer.removeClass(document.body, 'block-scroll-menu');
    } else {
      this.renderer.addClass(document.body, 'block-scroll-menu');
    }

    if (icon != 0) {
      this.iconSelected = icon;
    }

    //event.stopPropagation();
  }

  onPay() {
    if (this.timerMenu) {
      clearTimeout(this.timerMenu);
    }
    this.isoperationCard = true;
    this.isSemdingMoney = true;
  }

  onCharge200() {
    this.playerService.UpdateMoney(200);
    this.mqttService.unsafePublish(
      'checker200',
      this.player.userName.toUpperCase()
    );
    let audio = new Audio('../../assets/audio/cashieraudi.mp3');
    audio.play();
  }
}
