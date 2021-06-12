import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-media-nav',
  templateUrl: './social-media-nav.component.html',
  styleUrls: ['./social-media-nav.component.css'],
})
export class SocialMediaNavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  shareSocialNetwork() {
    /*  console.log('navigate');
    this.router.navigate(['https://www.instagram.com/luisangel.sevilla.3/']); */
  }
}
