import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';


//outsourcen
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  form: FormGroup;

  currentUser: User = null;
  userSub: Subscription = null;

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.currentUser = user;
    });

    this.form = new FormGroup({
      'userData': new FormGroup({
        'firstname': new FormControl(this.currentUser.firstName),
        'lastname': new FormControl(this.currentUser.lastName),
        'email': new FormControl(this.currentUser.email, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@iubh-fernstudium.de$")]),
        'accountlevel': new FormControl(this.currentUser.accountLevel)
      })
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log("submit");
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
