import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JokeService } from '../../services/joke.service';
import { Joke } from '../../models/joke';

const jokesSuggestCount = 5;

@Component({
  selector: 'app-jokedialog',
  templateUrl: './jokedialog.component.html',
  styleUrls: ['./jokedialog.component.css'],
})
export class JokedialogComponent implements OnInit {
  suggestedJokes: any;
  currentJoke: Joke;

  constructor(
    public dialogRef: MatDialogRef<JokedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public joke: Joke,
    jokeService: JokeService
  ) {
    this.currentJoke = joke;
    this.suggestedJokes = jokeService.getSuggestedJoke(
      joke.type,
      jokesSuggestCount
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  onSelectionChange(joke: Joke) {
    console.log('🐞 ~ JokedialogComponent ~ onSelectionChange ~ joke', joke);
    this.currentJoke = joke;
  }
}
