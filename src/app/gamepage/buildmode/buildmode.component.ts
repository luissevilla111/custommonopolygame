import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-buildmode',
  templateUrl: './buildmode.component.html',
  styleUrls: ['./buildmode.component.css'],
})
export class BuildmodeComponent implements OnInit {
  homes: number;
  totalHomes: number[];
  @Input() info: { index: number; actualHome: number };
  constructor(
    private playerService: PlayerService,
    private sweetAlSer: SweetAlertService,
    private renderer: Renderer2
  ) {
    //  this.playerService.getPlayerInfo().cards[0].buildNum;
  }

  ngOnInit(): void {
    this.totalHomes = Array(this.info.actualHome).fill(0); // [0,0.....,0]
    this.renderer.addClass(document.body, 'block-scroll-menu');
  }
  addHome() {
    if (this.totalHomes.length < 5) {
      this.totalHomes.push(0);
    }
  }

  removeHome() {
    this.totalHomes.pop();
  }

  build() {
    const buildAns = this.playerService.buildHouse(
      this.info.index,
      this.totalHomes.length
    );
    if (buildAns < 0) {
      this.sweetAlSer.alertError2('You do not have enough money');
    } else {
      this.sweetAlSer.alertSucces2('you have build');
      this.renderer.addClass(document.body, 'block-scroll-menu');
    }
    this.closeCom();
  }

  closeCom() {
    this.renderer.removeClass(document.body, 'block-scroll-menu');
    this.playerService.buildMode.next();
  }
}
