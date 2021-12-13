import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  currentUser: User = null;
  userSub: Subscription = null;

  constructor(private auth: AuthService, private userService: UserService) { }


  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.currentUser = user;
    });
  }

  onGetUsers() {
    this.userService.getUsers(this.currentUser).subscribe(response => {
      console.log(response);
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }



}
