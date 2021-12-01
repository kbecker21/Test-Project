import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const API_KEY = 'AIzaSyAg09-AteulBxan5VoQrAzcAimd8IkvwCs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string, firstname: string, lastname: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
        {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          returnSecureToken: true
        }
      ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
        {
          email: email,
          password: password
        }
      ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      firstname: string;
      lastname: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.firstname,
      userData.lastname
    );

    console.log(loadedUser);

    if (loadedUser.token) {

      console.log("foo");

      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      //this.autoLogout(expirationDuration);
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
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    firstname?: string,
    lastname?: string
  ) {

    console.log("expiresIn: " + expiresIn);
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    console.log(expirationDate);

    const user = new User(email, userId, token, expirationDate, firstname, lastname);
    this.user.next(user);
    //this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email or password is not correct.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This email or password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}
