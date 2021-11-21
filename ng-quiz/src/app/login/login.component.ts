import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'userData': new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@iubh-fernstudium.de$")]),
        'password': new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit() {
    console.log(this.signinForm);
    //this.signinForm.reset();
  }



}
