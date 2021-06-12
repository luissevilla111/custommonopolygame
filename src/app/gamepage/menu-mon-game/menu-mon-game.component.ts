import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';

@Component({
  selector: 'app-menu-mon-game',
  templateUrl: './menu-mon-game.component.html',
  styleUrls: ['./menu-mon-game.component.css'],
})
export class MenuMonGameComponent implements OnInit {
  constructor(private sweetAleSer: SweetAlertService, private router: Router) {}

  ngOnInit(): void {}

  onGetOut() {
    this.sweetAleSer
      .alertThreeButtons('warning', 'Do you wanna go out?', 'YES', 'NO')
      .then((res) => {
        if (res.isConfirmed) {
          localStorage.clear();
          this.router.navigate(['login']);
        }
      });
  }
}
