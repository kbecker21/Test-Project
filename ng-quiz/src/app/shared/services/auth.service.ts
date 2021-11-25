import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) { }

  signup(email: string, password: string, firstname: string, lastname: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API KEY]',
        {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          returnSecureToken: true
        }
      );
  }

  login(email: string, password: string) {
  }

}
