import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'firstname': new FormControl(null, [Validators.required]),
        'lastname': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@iubh-fernstudium.de$")]),
        'password': new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    //this.signupForm.reset();

    this.authService.register(this.signupForm['firstname'], this.signupForm['lastname'], this.signupForm['email'], this.signupForm['password']).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log(this.errorMessage);
      }
    );
  }

}
