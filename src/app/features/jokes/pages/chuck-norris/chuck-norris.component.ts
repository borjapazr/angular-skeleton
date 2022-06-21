import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';

import { IChuckNorrisJoke } from '@features/jokes/models';
import { ChuckNorrisService } from '@features/jokes/services';

@Component({
  selector: 'app-chuck-norris',
  templateUrl: './chuck-norris.component.html',
  styleUrls: ['./chuck-norris.component.scss']
})
@UntilDestroy()
export class ChuckNorrisComponent implements OnInit {
  private _randomJoke = new ReplaySubject<IChuckNorrisJoke>(1);

  public randomJoke$: Observable<IChuckNorrisJoke> = this._randomJoke.asObservable();

  constructor(private chuckNorrisService: ChuckNorrisService) {}

  ngOnInit() {
    this.getRandomJoke();
  }

  public getRandomJoke() {
    this.chuckNorrisService
      .getRandomJoke()
      .pipe(untilDestroyed(this))
      .subscribe(joke => this._randomJoke.next(joke));
  }
}
