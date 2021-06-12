import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { AlertMenuService } from '../../services/alert-menu.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-changing-money',
  templateUrl: './changing-money.component.html',
  styleUrls: ['./changing-money.component.css'],
  animations: [
    trigger('moveArrow', [
      transition('*<=>*', [
        style({
          transform: 'translateX(-2rem)',
        }),
        animate(
          800,
          keyframes([
            style({
              transform: 'translateX(-1rem)',
            }),
            style({
              transform: 'translateX(0rem)',
            }),
            style({
              transform: 'translateX(1rem)',
            }),
            style({
              transform: 'translateX(2rem)',
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ChangingMoneyComponent implements OnInit {
  constructor(
    private playerService: PlayerService,
    private alertMenuService: AlertMenuService
  ) {}
  @Input() CashOrMoney: number;
  @ViewChild('f') formulario: NgForm;
  txtChange: string;
  stateTomove = true;
  ngOnInit(): void {
    this.CashOrMoney === 3
      ? (this.txtChange = 'Cash to Electronic card')
      : (this.txtChange = 'Electronnic card to Cash');
  }
  updateMoneyUser() {
    /***update money of user*/
    let money = this.formulario.controls.moneyChange.value;

    if (this.CashOrMoney == 4) {
      money = -money;
    }
    if (this.playerService.UpdateMoney(money) >= 0) {
      this.sweetAlert('success', 'changes have been done');
    } else {
      this.sweetAlert('error', `you don't have enough money to change`);
    }
  }

  sweetAlert(icon: SweetAlertIcon, title: string) {
    Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.alertMenuService.alertMenu.next(false);
    });
  }
}
