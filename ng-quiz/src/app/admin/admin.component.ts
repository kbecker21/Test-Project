import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

export interface Users {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  accountLevel: number
}

const USERS_DATA: Users[] = [
  { id: 1, firstName: 'Kevin', lastName: 'Becker', email: 'kevin.becker@iubh-fernstudium.de', accountLevel: 3 },
  { id: 2, firstName: 'Foo', lastName: 'Boo', email: 'foo.boo@iubh-fernstudium.de', accountLevel: 5 }
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'accountLevel', 'actions'];
  dataSource = USERS_DATA;

  currentUser: User = null;
  userSub: Subscription = null;

  animal: string;
  name: string;

  constructor(private auth: AuthService, private userService: UserService, public dialog: MatDialog) { }


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

  openDialog(): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '350px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }



}
