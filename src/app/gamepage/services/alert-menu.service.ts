import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertMenuService {
  constructor() {}

  alertMenu = new Subject<boolean>();
}
