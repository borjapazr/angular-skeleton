import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { I18nService } from '@core/services/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageResolver implements Resolve<string> {
  constructor(private readonly i18nService: I18nService) {}

  resolve(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | Observable<string> | Promise<string> {
    const urlLanguage = this.i18nService.getUrlLanguage(state.url) as string;
    const currentLanguage = this.i18nService.getActiveLanguage();

    if (currentLanguage !== urlLanguage) {
      this.i18nService.initializeLanguage(urlLanguage);
    }

    return urlLanguage;
  }
}
