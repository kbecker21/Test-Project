import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

// TODO: Bei Integration anpassen
const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  updateSearchForPlayers() {
    // patch
  }


  getSearchPlayers(loggedInUser: User) {
    // get
  }


}
