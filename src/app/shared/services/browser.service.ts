import { Injectable } from '@angular/core';

import { PlatformService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  constructor(private readonly platformService: PlatformService) {}

  public getBrowserLanguage(): string | undefined {
    return this.platformService.isBrowser ? navigator.language.substring(0, 2) : undefined;
  }
}
