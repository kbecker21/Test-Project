import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../shared/services/statistic.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  users = {};

  constructor(private statistic: StatisticService) { }

  ngOnInit(): void {
    this.statistic.getUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });;


  }

}
