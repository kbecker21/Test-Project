import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;
  isAdmin = true;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.user = user;
    },
      errorMessage => {
        console.log(errorMessage);
      })
  }

  onUpdateAccount() {
    this.userService.updateUser(this.user).subscribe(response => {
      console.log(response);
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  onDeleteAccount() {
    let userId = 1;

    this.userService.deleteAccount(userId).subscribe(response => {
      console.log(response);
      this.router.navigate(['/home']);
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

}
