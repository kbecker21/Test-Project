import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  users = {};

  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http.get<any>('https://gorest.co.in/public/v1/posts');
  }

}
