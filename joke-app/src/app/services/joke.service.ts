import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as jokesData from '../data/jokes-json.json';
import { Joke, JokeType } from '../models/joke';

const pickRandom = (arr: Joke[], type: JokeType, count: number) => {
  let _arr = [...arr];
  _arr = _arr.filter((j) => j.type == type);
  return [...Array(count)].map(
    () => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]
  );
};

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  jokes: Joke[] = [];
  constructor(private http: HttpClient) {
    this.jokes = (jokesData as any).default;
  }

  getJokes(): Observable<Joke[]> {
    return of(this.jokes);
  }

  getSuggestedJoke(type: JokeType, count: number) {
    return pickRandom(this.jokes, type, count);
  }
}
