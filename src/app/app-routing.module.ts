import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { CardsShopComponent } from './gamepage/cards-shop/cards-shop.component';
import { GamepageComponent } from './gamepage/gamepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuMonGameComponent } from './gamepage/menu-mon-game/menu-mon-game.component';
import { GameGuardService } from './game-guard.service';
import { LoginguardService } from './loginguard.service';
import { CreatorpageComponent } from './creatorpage/creatorpage.component';
import { MailcardsgeneratorComponent } from './creatorpage/mailcardsgenerator/mailcardsgenerator.component';
import { InstructionsComponent } from './instructions/instructions.component';
const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'index', component: MainPageComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginguardService],
  },
  {
    path: 'game',
    component: GamepageComponent,
    canActivate: [GameGuardService],
    children: [
      {
        path: '',
        component: MenuMonGameComponent,
      },
      { path: 'Mycards', component: CardsShopComponent },
      { path: 'shop', component: CardsShopComponent },
    ],
  },
  {
    path: 'create',
    component: CreatorpageComponent,
    canActivate: [LoginguardService],
  },
  { path: 'mailcardsgenerator', component: MailcardsgeneratorComponent },
  { path: 'instructions', component: InstructionsComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    //  RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
