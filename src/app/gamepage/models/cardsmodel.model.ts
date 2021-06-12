export class CardsModel {
  constructor(
    public color: string,
    public title: string,
    public rent: number,
    public homes: number[],
    public valuePro: number,
    public buildPrices: number,
    public cardNumber: number,
    public available = 1,
    public ismortagge: number = 0,
    public buildNum: number = 0
  ) {}
}
