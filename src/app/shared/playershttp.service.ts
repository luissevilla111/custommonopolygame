import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerModel } from '../gamepage/models/player.model';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class PlayershttpService {
  constructor(
    private http: HttpClient,
    private constanService: ConstantsService
  ) {}

  //endpoint = `https://monopolygame-b9c5d-default-rtdb.firebaseio.com`;family
  endpoint: string;
  getAllPlayers() {
    this.endpoint = this.constanService.getEndpoint(); //can be remove in family version
    return this.http.get<[]>(`${this.endpoint}/players.json`);
  }

  setPlayers(players: { name: string; admin: number; info: PlayerModel }[]) {
    this.endpoint = this.constanService.getEndpoint();

    this.http
      .put(`${this.endpoint}players.json`, players)
      .subscribe((response) => {
        //console.log(response);
      });
  }

  getPlayerAdmin() {
    this.endpoint = this.constanService.getEndpoint();
    return this.http.get<any>(
      `${this.endpoint}players.json?orderBy="admin"&equalTo=1`
    );
  }

  getPlayer(name) {
    this.endpoint = this.constanService.getEndpoint();
    return this.http.get<any>(
      `${this.endpoint}players.json?orderBy=\"name\"&equalTo=\"${name}\"`
    );
  }

  addNewPlayer(player) {
    this.constanService.getEndpoint();
    return this.http.post(`${this.endpoint}players.json`, player);
  }

  updatePlayer(id, data) {
    this.constanService.getEndpoint();
    return this.http.patch(`${this.endpoint}players/${id}.json`, data);
  }
}
