import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../model/user.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(firstname: string, lastname: string, email: string, password: string) {
    return this.http
      .post<any>(
        'http://localhost:8000/register',
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(
        'http://localhost:8000/login',
        {
          email: email,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);
          this.handleAuthentication(
            resData.token,
            +resData.Userdata.idUser,
            resData.Userdata.FirstName,
            resData.Userdata.LastName,
            resData.Userdata.Email,
            +resData.Userdata.AccountLevel_idAccountLevel
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      idUser: number,
      firstName: string,
      lastName: string,
      email: string,
      accountLevel: number,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.idUser,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.accountLevel,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    token: string,
    idUser: number,
    firstName: string,
    lastName: string,
    email: string,
    accountLevel: number
  ) {
    const expiresIn = 3600;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(idUser, firstName, lastName, email, accountLevel, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorMessage);
  }


}
