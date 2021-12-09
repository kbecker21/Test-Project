import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  onGetUsers() {
    this.userService.getUsers().subscribe(response => {
      console.log(response);
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

}
