import { CardsModel } from '../gamepage/models/cardsmodel.model';
import { PlayerModel } from '../gamepage/models/player.model';

export interface PlayerMsgChanCar {
  action: string;
  player: string;
  data: any /**can be a card or money */;
}
