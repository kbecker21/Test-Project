import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
export class UserEditComponent implements OnInit {
  form: FormGroup;

  Accountlevels: any = ['Student', 'Tutor', 'Admin'];


  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    this.form = new FormGroup({
      'userData': new FormGroup({
        'firstname': new FormControl(null),
        'lastname': new FormControl(null),
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@iubh-fernstudium.de$")])
      })
    });
  }

  ngOnInit(): void {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log("submit");
  }

}
