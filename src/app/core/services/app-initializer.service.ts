import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

import { Logger } from './logger.service';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializer {
  constructor(private readonly platformService: PlatformService) {}

  initialize(): Promise<any> {
    return new Promise(resolve => {
      if (environment.production) {
        Logger.enableProductionMode();
      }
      this.showSelfXssWarningInBrowserConsole();
      resolve('App initialized');
    });
  }

  private showSelfXssWarningInBrowserConsole() {
    if (this.platformService.isBrowser) {
      console.log('%c🚨 Stop!', 'font-weight:bold; font-size: 4em; color: red; ');
      console.log(
        `%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.`,
        'font-weight:bold; font-size: 1.5em;'
      );
    }
  }
}
