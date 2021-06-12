import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  height100  = new Subject<boolean>();

  public setMaxHeight(is100h:boolean){
    this.height100.next(is100h);
  }
}
