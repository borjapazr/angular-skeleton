import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import isEmpty from 'just-is-empty';

import { Header } from '@core/enums';
import { PlatformService } from '@core/services/platform.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly isServerAndResponseIsNotEmpty = () => this.platformService.isServer && !isEmpty(this.response);

  private readonly isServerAndRequestIsNotEmpty = () => this.platformService.isServer && !isEmpty(this.request);

  constructor(
    private readonly platformService: PlatformService,
    @Optional() @Inject(REQUEST) private readonly request: Request,
    @Optional() @Inject(RESPONSE) private readonly response: Response
  ) {}

  public setResponseStatus(code: StatusCodes, message?: string, headers?: { [header: string]: string | number }) {
    if (this.isServerAndResponseIsNotEmpty()) {
      this.response.status(code);

      if (!isEmpty(message)) {
        (this.response.statusMessage as any) = message;
      }

      if (!isEmpty(headers)) {
        for (const header in headers) {
          this.response.setHeader(header, headers[header]);
        }
      }
    }
  }

  public setRedirectResponse(url: string, permanently: boolean = true) {
    const redirectStatusCode = permanently ? StatusCodes.MOVED_PERMANENTLY : StatusCodes.MOVED_TEMPORARILY;
    this.setResponseStatus(redirectStatusCode, getReasonPhrase(redirectStatusCode));
    this.setHeader('Location', url);
  }

  public setNotFoundResponse(message = getReasonPhrase(StatusCodes.NOT_FOUND)) {
    this.setResponseStatus(StatusCodes.NOT_FOUND, message);
  }

  public setInternalServerErrorResponse(message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)) {
    this.setResponseStatus(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }

  public getLanguageHeader(): string | undefined {
    return this.getHeader(Header.ACCEPT_LANGUAGE)?.substring(0, 2);
  }

  public getHeader(header: string): string | undefined {
    if (this.isServerAndRequestIsNotEmpty()) {
      return (this.request.headers as any)[header];
    }
    return undefined;
  }

  public setHeader(header: string, value: string | number) {
    if (this.isServerAndResponseIsNotEmpty()) {
      this.response.setHeader(header, value);
    }
  }
}
