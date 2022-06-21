import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { Logger } from '@core/services';
import { environment } from '@env/environment';

const LOGGER = new Logger('GlobalErrorHandler');

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      this.handleServerError(error);
    } else {
      this.handleClientError(error);
    }
  }

  private handleServerError(error: HttpErrorResponse) {
    if (!navigator.onLine) {
      LOGGER.error('No Internet Connection');
    }

    if (!environment.production) {
      LOGGER.error('Http Error', error);
    }
  }

  private handleClientError(error: Error) {
    LOGGER.error(error);
  }
}
