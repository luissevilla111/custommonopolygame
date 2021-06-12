import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from 'src/app/shared/constants.service';

@Injectable({
  providedIn: 'root',
})
export class SocialhttpService {
  constructor(
    private constantService: ConstantsService,
    private http: HttpClient
  ) {}

  /* endpoint;
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

  resetAllMailCards(table: string, cont: number) {
    this.endpoint = this.constantService.getEndpoint();
    for (let index = 0; index < cont; index++) {
      this.http.patch(
        `${this.endpoint}mailcards/${table}.json`,
        `${index}/read:1`
      );
    }
  } */

  /* https://monopolygame-b9c5d-default-rtdb.firebaseio.com/mailcards/messenger.json?orderBy="read"&equalTo=0 */
}
