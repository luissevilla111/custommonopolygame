import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  alertThreeButtons(
    icon: SweetAlertIcon,
    title: string,
    confirmtxt: string,
    denytxt: string
  ) {
    return Swal.fire({
      icon: icon,
      title: title,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `${confirmtxt}`,
      denyButtonText: `${denytxt}`,
    });
  }

  alertWithTimer(timer: number, icon: SweetAlertIcon, title: string) {
    Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: timer,
    });
  }
  alertError(txt: string) {
    Swal.fire('Error', txt, 'error');
  }
  alertSucces(txt: string) {
    Swal.fire('Success', txt, 'success');
  }
  alertInfo(txt: string) {
    Swal.fire('New message', txt, 'info');
  }

  alertError2(txt: string) {
    Swal.fire({
      title: 'Error',
      html: `<h3 class="alertBigTitle">${txt}</h3>`,
      icon: 'error',
      timer: 4000,
    });
  }
  alertSucces2(txt: string) {
    Swal.fire({
      title: 'success',
      html: `<h3 class="alertBigTitle">${txt}</h3>`,
      icon: 'success',
      timer: 4000,
    });
  }
  alertInfo2(txt: string) {
    Swal.fire({
      title: 'message',
      html: `<h3 class="alertBigTitle">${txt}</h3>`,
      icon: 'info',
      timer: 4000,
    });
  }

  alertCreateRoom() {
    return Swal.fire({
      title: 'Waiting for players',
      text: 'share the id to other players',
      html: `<div class="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
             </div>

              <ul class="players-joining">
                <li>mi first player</li>
              <ul>
        `,
      //icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Start Game',
      width: '80%',
    });
  }
}
