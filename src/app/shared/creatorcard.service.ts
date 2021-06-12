import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardsModel } from '../gamepage/models/cardsmodel.model';
import { SocialnetMessages } from '../gamepage/models/socialnetMessages.model';

@Injectable({
  providedIn: 'root',
})
export class CreatorcardService {
  constructor() {}

  infoCard = new Subject<
    | { card: CardsModel; index: number }
    | { card: SocialnetMessages; index: number }
  >();
}
