export class SocialnetMessages {
  constructor(
    public msg: string,
    public action: string,
    public cant: number,
    public read = 0
  ) {}
}
