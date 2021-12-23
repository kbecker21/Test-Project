import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { Users } from '../shared/model/users.model';
import { AuthService } from '../shared/services/auth.service';
import { LobbyService } from '../shared/services/lobby.service';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];

  loggedInUser: User = null;
  userSub: Subscription = null;

  allSearchUsers: Subscription = null;
  dataSource: Users[] = [];

  constructor(private auth: AuthService, private userService: UserService, private lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();
  }

  initTable() {
    this.allSearchUsers = this.userService.getUsers(this.loggedInUser).subscribe(response => {
      this.dataSource = response;
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  onJoinGame(element: User): void {
    // TODO: API anpassen für lobbyService.joinGame
    console.log(element);
  }

  onCreateGame() {

  }



}
