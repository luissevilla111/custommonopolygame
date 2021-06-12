import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  idMessagesMQTT: string = '';
  endpoint: string = '';

  setEndpoint(endpoint) {
    this.endpoint = endpoint;
  }

  getEndpoint() {
    return this.endpoint;
  }
  setIdM(id: string) {
    this.idMessagesMQTT = id;
  }

  getIdM() {
    return this.idMessagesMQTT;
  }
}
