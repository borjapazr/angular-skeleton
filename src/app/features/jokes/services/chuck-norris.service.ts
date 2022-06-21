import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IChuckNorrisJoke } from '@features/jokes/models';

@Injectable()
export class ChuckNorrisService {
  private readonly randomJokeUrl = 'https://api.chucknorris.io/jokes/random';

  constructor(private http: HttpClient) {}

  public getRandomJoke(): Observable<IChuckNorrisJoke> {
    return this.http.get<IChuckNorrisJoke>(this.randomJokeUrl);
  }
}
