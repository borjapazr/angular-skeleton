/* eslint-disable import/no-deprecated */
import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { I18nService } from '@core/services';
import { ServerService } from '@shared/services';

const ALLOWED_ERROR_CODES = [HttpStatusCode.NotFound, HttpStatusCode.GatewayTimeout];
const DEFAULT_ERROR_CODE = HttpStatusCode.NotFound;

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() public errorCode = DEFAULT_ERROR_CODE;

  public readonly errorData$: Observable<{ code: number; title: string; description: string }>;

  constructor(private readonly i18nService: I18nService, private readonly serverService: ServerService) {
    const isValidErrorCode = ALLOWED_ERROR_CODES.includes(this.errorCode);
    const titleKey = isValidErrorCode ? `errors.${this.errorCode}.title` : 'errors.unknown.title';
    const descriptionKey = isValidErrorCode ? `errors.${this.errorCode}.description` : 'errors.unknown.description';
    this.errorData$ = combineLatest([
      this.i18nService.translate(titleKey),
      this.i18nService.translate(descriptionKey)
    ]).pipe(map(([title, description]) => ({ code: this.errorCode, title, description })));
  }

  ngOnInit(): void {
    const errorHandler: Record<number, () => void> = {
      [HttpStatusCode.NotFound]: () => this.serverService.setNotFoundResponse(),
      0: () => this.serverService.setInternalServerErrorResponse()
    };
    (errorHandler[this.errorCode] || errorHandler[0])();
  }
}
