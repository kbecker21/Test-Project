import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

// TODO: Bei Integration anpassen
const URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})

/**
 * Der Service stellt alle nötigen HTTP-Funktionen zum Abrufen, Bearbeiten und Löschen von Benutzern bereit.
 */
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'Foo':
        errorMessage = 'Foo';
        break;
    }
    return throwError(errorMessage);
  }

  getUser(userId: number) {
    return this.http.get<any>(URL + '/user/' + userId).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Ermittelt aller Nutzer im System.
   * @param token Der Token vom aktuellen Nutzer.
   * @returns alle Nutzer aus dem System
   */
  getUsers(token: String) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>(URL + '/user', { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Aktualisiert einen Benutzer.
   * @param user Der Benutzer der aktualisiert werden soll.
   * @returns xxxxxxxxx
   */
  updateUser(user: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });
    return this.http.put<any>(
      URL + '/user/' + user.idUser,
      {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        accountLevel: user.accountLevel
      }, { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Löscht einen Benutzer.
   * @param user Der Benutzer der gelöscht werden soll.
   * @returns xxxxxxxxx
   */
  deleteUser(user: User) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });
    return this.http.delete<any>(URL + '/user/' + user.idUser, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }
}
