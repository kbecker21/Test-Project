import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = "https://slack.com/api/auth.test";


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization': 'Bearer xoxe.xoxp-1-Mi0yLTI3NjYyNzIzNjkxNjktMjc1NTkwMzcyMjEwMC0yNzUzNjQ5NjM1MDI2LTI3NzczNjMxMDkyMTYtNDYxZmEwM2ViMDUyNTM4MGIwOTc5YWJhNGM2NTc1NTFmY2Q5NTYxMGZhZTVjNDAxYjQ5M2JkMmZjMTJhOTAyZg',
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

  register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, {
      firstname,
      lastname,
      email,
      password
    }, httpOptions);
  }
}
