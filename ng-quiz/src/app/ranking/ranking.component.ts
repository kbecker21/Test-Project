import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  users = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.onGetUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

  onGetUsers() {
    return this.http
      .get<any>(
        'https://angular-cource-project-default-rtdb.europe-west1.firebasedatabase.app/'
      );
  }



}
