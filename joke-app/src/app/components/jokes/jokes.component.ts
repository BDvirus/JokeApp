import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { JokedialogComponent } from '../jokedialog/jokedialog.component';
import { Joke } from '../../models/joke';
import { JokeService } from '../../services/joke.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
})
export class JokesComponent implements OnInit {
  jokes$: Observable<Joke[]>;

  constructor(
    private router: Router,
    private jokeService: JokeService,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {
    this.jokes$ = jokeService.getJokes();
  }

  doJoke(joke: Joke) {
    const dialogRef = this.dialog.open(JokedialogComponent, {
      data: joke,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
  }

  public logOut = () => {
    this.loginService.logout();
    this.router.navigate(['/']);
  };
}
