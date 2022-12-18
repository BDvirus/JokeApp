import { NotificationService } from './../../services/notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

//import { ToastrService } from 'ngx-toastr';
import {
  Credentials,
  JWTTokenResponse,
  LoginService,
} from '../../services/login.service';
import { catchError, EMPTY, of, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  invalidLogin?: boolean;
  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifier: NotificationService,
    private loginService: LoginService
  ) {
    this.login = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  submit() {
    this.dologin(this.login.value);
  }

  public dologin = (credentials: Credentials) => {
    this.loginService
      .login(credentials)
      .pipe(
        take(1),
        catchError((error) => {
          this.invalidLogin = true;
          this.notifier.showError(error);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        const token = (<JWTTokenResponse>response)?.token;
        if (token) {
          localStorage.setItem('jwt', token);
          this.notifier.showSuccess('Logged In successfully');
          this.router.navigate(['/jokes']);
        }
      });
  };
}
