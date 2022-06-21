import { HttpStatusCode } from '@angular/common/http';

export class ErrorEvent {
  public statusCode: HttpStatusCode;

  public statusText: string;

  public message: string;

  public url?: string | null;

  public timestamp?: Date | null;

  constructor(
    statusCode: HttpStatusCode,
    statusText: string,
    message: string,
    url?: string | null,
    timestamp?: Date | null
  ) {
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.message = message;
    this.url = url;
    this.timestamp = timestamp;
  }
}
