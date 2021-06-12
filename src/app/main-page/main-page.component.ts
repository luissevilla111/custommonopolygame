import { Component, OnInit, OnDestroy } from '@angular/core';
import {TarjetasInfoServiceService} from './tarjetas-info-service.service'
import { TarjetasInfo } from './tarjetasmodelinfo';
import { NavbarService } from '../navbar-main/navbar.service';
import { Subscription } from 'rxjs';
import * as jQuery from 'jquery';
declare var $:any;





@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit,OnDestroy {
    tarjetasInfo:TarjetasInfo[]
    ishidden = false;
    hidemainSub:Subscription;


  constructor(

    public tarInfoService:TarjetasInfoServiceService,
    public navbarService:NavbarService


    ) {
    this.tarjetasInfo = tarInfoService.getTarjetas();//to repeat the "tarjetas"
    this.hidemainSub = this.navbarService.height100.subscribe(
      (data) =>{
        this.ishidden = data
      }
    )

   }
  ngOnDestroy(): void {
   this.hidemainSub.unsubscribe()
  }

   getImgSrc(tarjeta:TarjetasInfo){
     return `../../assets/images/${tarjeta.img}`
   }



  ngOnInit(): void {

    $('.parallax-window').parallax({imageSrc: '../../assets/images/parallaxsocialne.jpg'});
    jQuery(window).trigger('resize').trigger('scroll');

  }

}
