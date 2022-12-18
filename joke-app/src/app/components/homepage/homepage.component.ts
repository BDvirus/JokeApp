import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    public loginService: LoginService
  ) {}

  public logOut = () => {
    localStorage.removeItem('jwt');
  };
}
