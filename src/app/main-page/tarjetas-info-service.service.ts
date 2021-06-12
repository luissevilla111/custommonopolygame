import { Injectable } from '@angular/core';
import { TarjetasInfo } from './tarjetasmodelinfo';

@Injectable({
  providedIn: 'root',
})
export class TarjetasInfoServiceService {
  constructor() {}

  private tarjInfo: TarjetasInfo[] = [
    new TarjetasInfo(
      'create.jpg',
      'create',
      'You can make your custom cards, be creative and create awesome cards (Follow the instrunctions) ',
      '/create'
    ),
    new TarjetasInfo(
      'playdice.jpg',
      'login',
      'Have fun with family and friends with the monopoly of your dreams',
      '/login'
    ),
    new TarjetasInfo(
      'help.jpg',
      'Help',
      'We are inserested in your opinion so we can improve this app',
      'somelink'
    ),
  ];

  getTarjetas() {
    return this.tarjInfo.slice();
  }
}
