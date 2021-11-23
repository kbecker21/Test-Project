import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = "https://gorest.co.in/public/v1/users";


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization': 'Bearer <<Token>>',
      'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  // register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', {
  //     firstname,
  //     lastname,
  //     email,
  //     password
  //   }, httpOptions);
  // }

  /*Test Restschnittstelle gorest.co.in*/
  register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, {
      "name": "Test",
      "gender": "male",
      "email": "kevin@test.de",
      "status": "active"
    }, httpOptions);
  }
}
