import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarMainComponent } from './navbar-main/navbar-main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollDirective } from './navbar-main/scroll.directive';
import { SocialMediaNavComponent } from './shared/social-media-nav/social-media-nav.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { WindowResizeDirective } from './shared/window-resize.directive';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsShopComponent } from './gamepage/cards-shop/cards-shop.component';
import { GamepageComponent } from './gamepage/gamepage.component';
import { GcardsComponent } from './gamepage/gcards/gcards.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuMonGameComponent } from './gamepage/menu-mon-game/menu-mon-game.component';
import { AlertaMenuOpcUserComponent } from './gamepage/alerta-menu-opc-user/alerta-menu-opc-user.component';
import { MsgandwhatComponent } from './gamepage/alerta-menu-opc-user/msgandwhat/msgandwhat.component';
import { ChangingMoneyComponent } from './gamepage/alerta-menu-opc-user/changing-money/changing-money.component';
import { GreaterThZeroDirective } from './shared/greater-th-zero.directive';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { IMqttMessage, MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { CardsoperationsComponent } from './gamepage/cardsoperations/cardsoperations.component';
import { BuildmodeComponent } from './gamepage/buildmode/buildmode.component';
import { CreatorpageComponent } from './creatorpage/creatorpage.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { MailcardsgeneratorComponent } from './creatorpage/mailcardsgenerator/mailcardsgenerator.component';
import { PaginadorofcardsComponent } from './creatorpage/paginadorofcards/paginadorofcards.component';
import { InstructionsComponent } from './instructions/instructions.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.emqx.io',
  port: 8084,
  path: '/mqtt',
  protocol: 'wss',
};
/* hostname: 'broker.hivemq.com',
  port: 8000,
  path: '/mqtt',
  protocol: 'wss', */
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarMainComponent,
    ScrollDirective,
    SocialMediaNavComponent,
    SiteFooterComponent,
    WindowResizeDirective,
    LoginComponent,
    CardsShopComponent,
    GamepageComponent,
    GcardsComponent,
    NotFoundComponent,
    MenuMonGameComponent,
    AlertaMenuOpcUserComponent,
    MsgandwhatComponent,
    ChangingMoneyComponent,
    GreaterThZeroDirective,
    CardsoperationsComponent,
    BuildmodeComponent,
    CreatorpageComponent,
    MailcardsgeneratorComponent,
    PaginadorofcardsComponent,
    InstructionsComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    HttpClientModule,
    ColorSketchModule,

    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
