import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ResizewindowService } from '../shared/resizewindow.service';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as jQuery from 'jquery';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { PlayerService } from '../gamepage/services/player.service';
import { PlayerModel } from '../gamepage/models/player.model';

@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.css'],
})
export class NavbarMainComponent implements OnInit, OnDestroy {
  limiScroll = false;
  isindex = false;
  resizeSub: Subscription;
  routerEvents: Subscription;
  showLinks = false;
  playerExist: Subscription;
  isSomePlayer = false;

  constructor(
    private resWinService: ResizewindowService,
    private navService: NavbarService,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private playerService: PlayerService
  ) {}

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
    this.routerEvents.unsubscribe();
    if (this.playerExist) {
      this.playerExist.unsubscribe();
    }
  }

  ismobile: boolean = false;
  ngOnInit(): void {
    if (window.screen.width <= 768) {
      // 768px portrait
      this.ismobile = true;
    }
    this.resizeSub = this.resWinService.resizeWindow.subscribe((size) => {
      if (size > 768) {
        this.ismobile = false;

        this.showLinks = false;
        this.navService.setMaxHeight(this.showLinks);
      } else {
        this.ismobile = true;
      }

      return true;
    });

    this.routerEvents = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((evt) => {
        if (this.router.url !== '/') {
          this.isindex = false;
        } else {
          this.isindex = true;
        }
        if (!(evt instanceof NavigationEnd)) {
          return;
        } else {
          window.scrollTo(0, 0);
        }

        if (this.router.url !== '/login') {
          this.renderer.addClass(document.body, 'default-background');
          this.renderer.removeClass(document.body, 'login-background');
        } else {
          this.renderer.addClass(document.body, 'login-background');
          this.renderer.removeClass(document.body, 'default-background');
        }
      });

    this.playerExist = this.playerService.playerChanges.subscribe(
      (player: PlayerModel) => {
        this.isSomePlayer = player ? true : false;
      }
    );
  }

  mobileNavLink() {
    this.showLinks = !this.showLinks;
    this.navService.setMaxHeight(this.showLinks);

    if (this.showLinks) {
      this.renderer.addClass(document.body, 'block-scroll-menu');
    } else {
      this.renderer.removeClass(document.body, 'block-scroll-menu');
    }
  }

  navigate(route: string) {
    if (!this.showLinks) {
      this.mobileNavLink();
    }
    this.mobileNavLink();
    this.router.navigate([`/${route}`]);
  }
}
