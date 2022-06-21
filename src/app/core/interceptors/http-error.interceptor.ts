import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';

import { AppBusService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly appBusService: AppBusService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError(error => this.handlerError(error))
    );
  }

  private handlerError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    this.appBusService.emitHttpError(error);
    throw error;
  }
}
