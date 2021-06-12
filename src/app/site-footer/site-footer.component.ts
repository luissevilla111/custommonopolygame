import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar-main/navbar.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent implements OnInit {

  ishidden = false
  constructor(private navbarService:NavbarService) {
    this.navbarService.height100.subscribe(
      (data) =>{
        this.ishidden = data;
      }
    )
  }

  ngOnInit(): void {
  }

}
