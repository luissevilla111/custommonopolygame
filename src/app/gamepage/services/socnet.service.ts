import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from 'src/app/shared/constants.service';
import { SocialnetMessages } from '../models/socialnetMessages.model';
import { SocialhttpService } from './socialhttp.service';

@Injectable({
  providedIn: 'root',
})
export class SocnetService {
  /*  private allMessagesFacebook: SocialnetMessages[] = [
    new SocialnetMessages('Revise su Whats app'),
    new SocialnetMessages('Pase a kiss it better'),
    new SocialnetMessages('1'),
    new SocialnetMessages('2'),
    new SocialnetMessages('3'),
  ]; */

  maxnumMesFace = 4;
  maxnumMesWhat = 4;
  /* private allMessagesWhats: SocialnetMessages[] = [
    new SocialnetMessages(
      'Pase a la sigueinte propiedad construido y como gratis'
    ),
    new SocialnetMessages('Impustos por propiedad restaurante: 20 Hotel:50'),
    new SocialnetMessages('54'),
    new SocialnetMessages('55'),
    new SocialnetMessages('56'),
  ]; */
  constructor(
    private http: HttpClient,
    private socialHttpService: SocialhttpService,
    private constantService: ConstantsService
  ) {}

  /* getFacebookMsg() {
    const n = this.generateRandomNumber(this.maxnumMesFace);
    const mimsg = this.allMessagesFacebook.slice(n, n + 1);
    this.allMessagesFacebook.splice(n, 1);
    this.maxnumMesFace--;

    this.socialHttpService.getMessengerAvailableCards().subscribe((res) => {
      const a = res[Object.keys(res)[0]]; //returns 'someVal'
      console.log(a);
      return a;
    });

    return null;
  }

  getWhatsMsg() {
    const n = this.generateRandomNumber(this.maxnumMesWhat);
    const mimsg = this.allMessagesWhats.slice(n, n + 1);
    this.allMessagesWhats.splice(n, 1);
    this.maxnumMesWhat--;
    return mimsg;
  }

  generateRandomNumber(max: number) {
    return Math.floor(Math.random() * (max + 1));
  } */

  endpoint;
  getAllMessagesMessengerNumber() {
    this.endpoint = this.constantService.getEndpoint();
    return this.http.get(`${this.endpoint}mailcards/messenger.json`);
  }

  getAllMessagesWhatsNumber() {
    this.endpoint = this.constantService.getEndpoint();
    return this.http.get(`${this.endpoint}mailcards/whats.json`);
  }
  getMessengerAvailableCards() {
    this.endpoint = this.constantService.getEndpoint();
    return this.http.get(
      `${this.endpoint}mailcards/messenger.json?orderBy="read"&equalTo=0`
    );
  }

  getWhatsAvailableCards() {
    this.endpoint = this.constantService.getEndpoint();
    return this.http.get(
      `${this.endpoint}mailcards/whats.json?orderBy="read"&equalTo=0`
    );
  }

  updateMessengerCard(index, data) {
    this.endpoint = this.constantService.getEndpoint();
    return this.http.patch(
      `${this.endpoint}mailcards/messenger/${index}.json`,
      data
    );
  }

  updateWhatsCards(index, data) {
    this.endpoint = this.constantService.getEndpoint();
    return this.http.patch(
      `${this.endpoint}mailcards/whats/${index}.json`,
      data
    );
  }
  resetAllMailCards(table: string, cont: number) {
    this.endpoint = this.constantService.getEndpoint();
    for (let index = 0; index < cont; index++) {
      this.http.patch(
        `${this.endpoint}mailcards/${table}.json`,
        `${index}/read:1`
      );
    }
  }

  resetAllMsgerCard() {
    this.getAllMessagesMessengerNumber().subscribe((res) => {
      let totalMails = Object.keys(res).length;

      //console.log(res);
      for (let index = 0; index < totalMails; index++) {
        let keyObj = Object.keys(res)[index];
        res[Object.keys(res)[index]].read = 0;
        this.updateMessengerCard(
          keyObj,
          res[Object.keys(res)[index]]
        ).subscribe((result) => {
          //this.proccessMessages(result, type);
        });
      }
    });
  }

  resetAllWhCards() {
    this.getAllMessagesWhatsNumber().subscribe((res) => {
      let totalMails = Object.keys(res).length;

      //console.log(res);
      for (let index = 0; index < totalMails; index++) {
        let keyObj = Object.keys(res)[index];
        res[Object.keys(res)[index]].read = 0;
        this.updateWhatsCards(keyObj, res[Object.keys(res)[index]]).subscribe(
          (result) => {
            //this.proccessMessages(result, type);
          }
        );
      }
    });
  }
}
