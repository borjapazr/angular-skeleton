import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ErrorEvent } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class AppBusService {
  private errorSource = new Subject<ErrorEvent | null>();

  private error$ = this.errorSource.asObservable();

  constructor() {}

  public handleHttpErrors(): Observable<ErrorEvent | null> {
    return this.error$;
  }

  public clearHttpErrorsBus() {
    this.errorSource.next(null);
  }

  public emitHttpError(error: HttpErrorResponse) {
    this.errorSource.next(new ErrorEvent(error.status, error.statusText, error.error, error.url, new Date()));
  }
}
