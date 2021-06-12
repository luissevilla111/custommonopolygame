import { CardsModel } from './cardsmodel.model';
export class PlayerModel {
  constructor(
    public userName: string,
    public imgLink: string,
    public money: number,
    public TotProper: number,
    public cards: CardsModel[] = []
  ) {}
}
