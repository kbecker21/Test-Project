import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  form: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  error: string = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(
      (data: Data) => {
        this.isLoginMode = data['isLoginMode'];
      }
    );

    this.form = new FormGroup({
      'userData': new FormGroup({
        'firstname': new FormControl(null),
        'lastname': new FormControl(null),
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@iubh-fernstudium.de$")]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.userData.email;
    const password = this.form.value.userData.password;
    const firstname = this.form.value.userData.firstname;
    const lastname = this.form.value.userData.lastname;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password, firstname, lastname);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);

        if (this.isLoginMode) {
          this.router.navigate(['/account']);
        } else {
          this.router.navigate(['/login', { data: { isLoginMode: true } }]);
        }

      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    this.form.reset();

  }
}
