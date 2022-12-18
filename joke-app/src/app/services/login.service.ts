import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import configurl from '../../assets/config/config.json';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface Credentials {
  username: string;
  password: string;
}

export interface JWTTokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = configurl.apiServer.url + '/api/authentication/login';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  isUserAuthenticated() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  login(cred: Credentials): Observable<any> {
    return this.http.post(this.loginUrl, cred).pipe(
      catchError((error) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(() => new Error(errorMsg));
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401: {
        return `Unauthorized: ${error.message}`;
      }
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
