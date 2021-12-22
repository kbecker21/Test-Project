import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { Users } from '../shared/model/users.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})

/**
 * Diese Komponente implementiert die Rangliste.
 */
export class RankingComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'points'];

  loggedInUser: User = null;
  userSub: Subscription = null;

  allSearchUsers: Subscription = null;
  dataSource: Users[] = [];

  constructor(private auth: AuthService, private userService: UserService) { }


  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();
  }

  initTable() {
    // TODO: API anpassen
    this.allSearchUsers = this.userService.getUsers(this.loggedInUser).subscribe(response => {
      this.dataSource = response;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


}
