import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
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
    return this.http.get<any>('/api/user/' + userId).pipe(
      catchError(this.handleError)
    );
  }


  getUsers(token: String) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>('http://localhost:8000/user', { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User) {
    let userId = 1;
    return this.http.put<any>(
      '/api/user/' + userId,
      {
        email: user.email,
        firstname: "foo2",
        lastname: "boo2"
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  deleteAccount(userId: number) {
    return this.http.delete<any>('/api/user/' + userId).pipe(
      catchError(this.handleError)
    );
  }
}
