import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.user = user;
    })
  }

}
