import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  OnDestroy,
} from '@angular/core';

import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { reduce } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  PatternValidator,
  Validators,
} from '@angular/forms';
import { SweetAlertService } from '../shared/sweet-alert.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MonopolyhttpService } from '../gamepage/services/monopolyhttp.service';
import { MonopolyMqttService } from '../shared/monopoly-mqtt.service';
import { Subscription } from 'rxjs';
import { PlayerService } from '../gamepage/services/player.service';
import { PlayerModel } from '../gamepage/models/player.model';
import { PlayershttpService } from '../shared/playershttp.service';
import { CardsModel } from '../gamepage/models/cardsmodel.model';
import { ConstantsService } from '../shared/constants.service';
import { SocnetService } from '../gamepage/services/socnet.service';

export interface PlayerInfoMqtt {
  namePlayer: string;
  command: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('changeText', [
      state(
        'signup',
        style({
          transform: 'translateX(0rem)',
          opacity: 1,
        })
      ),
      transition('login<=> signup', [
        animate(
          '0.5s',
          keyframes([
            style({
              transform: 'translateX(0rem)',
              offset: 0,
              opacity: 1,
            }),
            style({
              transform: 'translateX(-50rem)',
              offset: 0.4,
              opacity: 0,
            }),
            style({
              transform: 'translateX(+50rem)',
              offset: 0.6,
              opacity: 0,
            }),
            style({
              transform: 'translateX(0rem)',
              offset: 1,
              opacity: 1,
            }),
          ])
        ),
      ]),
    ]),
    trigger('imgChange', [
      state(
        'signup',
        style({
          opacity: 1,
          backgroundImage: `url("../../assets/images/monopolysignup.jpg")`,
        })
      ),
      state(
        'login',
        style({
          opacity: 1,
          backgroundImage: `url("../../assets/images/monomoneyback.jpg")`,
        })
      ),
      transition('login=>signup', [
        animate(
          '0.5s',
          keyframes([
            style({
              opacity: 0.5,
            }),
            style({
              opacity: 0,
            }),

            style({
              opacity: 0.2,
              backgroundImage: 'url("../../assets/images/monopolysignup.jpg")',
            }),
            style({
              opacity: 0.5,
              backgroundImage: 'url("../../assets/images/monopolysignup.jpg")',
            }),
            style({
              opacity: 0.8,
              backgroundImage: 'url("../../assets/images/monopolysignup.jpg")',
            }),
          ])
        ),
      ]),
      transition('signup=>login', [
        animate(
          '0.5s',
          keyframes([
            style({
              opacity: 0.5,
            }),
            style({
              opacity: 0,
            }),

            style({
              opacity: 0.2,
              backgroundImage: 'url("../../assets/images/monomoneyback.jpg")',
            }),
            style({
              opacity: 0.5,
              backgroundImage: 'url("../../assets/images/monomoneyback.jpg")',
            }),
            style({
              opacity: 0.8,
              backgroundImage: 'url("../../assets/images/monomoneyback.jpg")',
            }),
          ])
        ),
      ]),
    ]),
    trigger('changeTxt', [
      transition('login<=>signup', [
        animate(
          '0.5s',
          keyframes([
            style({
              opacity: 0.5,
            }),
            style({
              opacity: 0,
            }),
            style({
              opacity: 0.1,
            }),
            style({
              opacity: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private elementRef: ElementRef,
    private sweetAlerSer: SweetAlertService,
    private render: Renderer2,
    private mqttService: MonopolyMqttService,
    private router: Router,
    private playerService: PlayerService,
    private playerHtppService: PlayershttpService,
    private httpCards: MonopolyhttpService,
    private constanService: ConstantsService,
    private socnetService: SocnetService
  ) {}
  ngOnDestroy(): void {
    if (this.mqttSub) {
      this.mqttSub.unsubscribe();
    }
    if (this.changePageMqttSub) {
      this.changePageMqttSub.unsubscribe();
    }
  }

  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;
  type = 'login';
  texto = 'Join';
  imgChange = 'login';
  index = 1;
  changeTxt = 'login';
  formLogin: FormGroup;
  emailValitorRegExp = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  roomId = 0;
  // playerList: string[] = [];
  playerList: { name: string; admin: number; info: PlayerModel }[] = [];
  iswaitingPla = false;
  iswaitingPlaClient = false;
  mqttSub: Subscription;
  changePageMqttSub: Subscription;
  nickName: string;
  endpoint: string;

  ngOnInit(): void {
    this.playerService.setNewPlayer(null);
    localStorage.clear();
    this.formLogin = new FormGroup({
      userEmail: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(5),
        Validators.maxLength(7),
        // Validators.pattern(this.emailValitorRegExp),
      ]),
      userPwd: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),

      endpointDB: new FormControl(''),
    });
  }

  StartSubacriptionToChangePage() {
    this.changePageMqttSub = this.mqttService
      .topic('changePage')
      .subscribe((data) => {
        const endpo = data.payload.toString();
        localStorage.setItem('endpoint', endpo);
        this.constanService.setEndpoint(endpo);
        this.render.removeClass(document.body, 'block-scroll-menu');
        let newPlayer = new PlayerModel(this.nickName, 'img', 1500, 0, []);
        localStorage.setItem('playerData', JSON.stringify(newPlayer));
        this.playerService.setNewPlayer(newPlayer);

        this.router.navigate(['/game']);
      });
  }

  textoInfo: [string[], string[]] = [
    ['Someone else has created the room', 'Join Game'],
    ['Do you want to create a game ?', 'Create room'],
  ];

  h4txt = 'Welcome back are you ready to win Again?';

  changeMod() {
    if (this.mqttSub) {
      this.mqttSub.unsubscribe();
    }
    this.type === 'signup'
      ? ((this.type = 'login'), (this.index = 1))
      : ((this.type = 'signup'), (this.index = 0));
    this.imgChange = this.type;
    this.changeTxt = this.type;
    setTimeout(() => {
      // this.texto = this.type;
      this.type === 'signup'
        ? ((this.h4txt = 'Hi Friend, Register and start playing'),
          (this.texto = 'Start game'))
        : ((this.h4txt = 'Welcome back are you ready to win Again?'),
          (this.texto = 'join'));
    }, 200);

    this.formLogin.reset();
    this.formLogin
      .get('endpointDB')
      .setValue('https://choosename-6621e-default-rtdb.firebaseio.com/');
  }

  onSubmit() {
    this.roomId = this.formLogin.get('userEmail').value;
    this.nickName = this.formLogin.get('userPwd').value;
    this.nickName = this.nickName.toUpperCase();
    this.render.addClass(document.body, 'block-scroll-menu');
    this.constanService.setIdM(this.roomId.toString());
    localStorage.setItem('roomId', this.roomId.toString());
    this.endpoint = this.formLogin.get('endpointDB').value;
    this.constanService.setEndpoint(this.endpoint);

    //console.log(endpoint);
    if (this.type === 'signup') {
      //create new room
      this.playerList.push({
        name: this.nickName.toUpperCase(),
        admin: 1,
        info: new PlayerModel(this.nickName, 'img', 1500, 0),
      });
      this.iswaitingPla = true;
      this.StartSubacriptionToChangePage();
      this.mqttSub = this.mqttService
        .topic(this.roomId.toString())
        .subscribe((data) => {
          const playerDa: PlayerInfoMqtt = JSON.parse(data.payload.toString());

          switch (playerDa.command) {
            case 'join':
              this.playerList.push({
                name: playerDa.namePlayer.toUpperCase(),
                admin: 0,
                info: new PlayerModel(
                  playerDa.namePlayer.toUpperCase(),
                  'img',
                  1500,
                  0
                ),
              });
              break;
            case 'delete':
              const ind = this.playerList.indexOf({
                name: playerDa.namePlayer.toUpperCase(),
                admin: 0,
                info: new PlayerModel(
                  playerDa.namePlayer.toUpperCase(),
                  'img',
                  1500,
                  0
                ),
              });

              if (ind > 0) {
                this.playerList.splice(ind, 1);
              }

              break;
          }
        });
    } else {
      this.iswaitingPlaClient = true;

      let playerIn: PlayerInfoMqtt = {
        namePlayer: this.nickName.toUpperCase(),
        command: 'join',
      };

      this.mqttService.unsafePublish(
        this.roomId.toString(),
        JSON.stringify(playerIn)
      );

      this.StartSubacriptionToChangePage();
    }
  }

  StartNewGame(isnew: boolean) {
    //click start game

    localStorage.setItem('recover', 'Y');
    if (isnew) {
      localStorage.setItem('recover', 'N');
      this.playerHtppService.setPlayers(this.playerList);
      this.httpCards.ResetCards();
      this.socnetService.resetAllMsgerCard();
      this.socnetService.resetAllWhCards();
    }

    this.render.removeClass(document.body, 'block-scroll-menu');
    // localStorage.setItem('roomId', this.roomId.toString());
    this.mqttService.unsafePublish('changePage', this.endpoint);
  }
  onCancelRoom() {
    this.render.removeClass(document.body, 'block-scroll-menu');
    this.playerList = [];
    this.iswaitingPla = false;
    this.mqttSub.unsubscribe();
  }

  onCancelEnterRoom() {
    this.iswaitingPlaClient = false;
    let playerIn: PlayerInfoMqtt = {
      namePlayer: this.nickName.toUpperCase(),
      command: 'delete',
    };
    this.mqttService.unsafePublish(
      this.roomId.toString(),
      JSON.stringify(playerIn)
    );
    this.render.removeClass(document.body, 'block-scroll-menu');

    this.changePageMqttSub.unsubscribe();
  }

  removePlayerFromList(index: number) {
    if (index > 0) {
      this.playerList.splice(index, 1);
    }
  }
}
