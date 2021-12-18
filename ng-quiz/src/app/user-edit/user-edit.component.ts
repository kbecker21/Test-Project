import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';


//outsourcen
export interface DialogData {
  firstName: string;
  lastName: string;
  email: string;
  accountLevel: number;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

/**
 * Diese Komponente implementiert das Benutzer Formular. 
 */
export class UserEditComponent implements OnInit, OnDestroy {
  form: FormGroup;

  userSub: Subscription = null;
  loggedInUser: User;


  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private auth: AuthService, private userService: UserService
  ) { }


  /**
  * Initialisiert den aktuellen Benutzer.
  * Initialisiert das Formular.
  */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });


    this.form = new FormGroup({
      'userData': new FormGroup({
        'firstname': new FormControl(this.data.firstName),
        'lastname': new FormControl(this.data.lastName),
        'email': new FormControl(this.data.email, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@iubh-fernstudium.de$")]),
        'accountlevel': new FormControl(this.data.accountLevel)
      })
    });
  }

  /**
   * Abrechen der Eingabe. Schließt den Dialog.
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Sendet Daten an Service.
   */
  onSubmit(): void {
    console.log("submit");

    // this.userService.updateUser(this.loggedInUser).subscribe(response => {
    //   console.log(response);
    // });
  }

  /**
  * Beendet alle Subscriptions.
  */
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
