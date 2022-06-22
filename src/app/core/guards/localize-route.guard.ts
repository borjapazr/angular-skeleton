import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import isEmpty from 'just-is-empty';
import { Observable } from 'rxjs';

import { PlatformService } from '@core/services';
import { I18nService } from '@core/services/i18n.service';
import { BrowserService, ServerService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class LocalizeRoute implements CanActivate {
  constructor(
    private readonly i18nService: I18nService,
    private readonly platformService: PlatformService,
    private readonly browserService: BrowserService,
    private readonly serverService: ServerService,
    private readonly router: Router
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const urlLanguage = this.i18nService.getUrlLanguage(state.url);

    if (isEmpty(urlLanguage)) {
      const availableLanguages = this.i18nService.getAvailableLanguages();
      const cookieLanguage = this.i18nService.getCookieLanguage();
      const browserLanguage = this.browserService.getBrowserLanguage() ?? this.serverService.getLanguageHeader();

      const targetLanguage = [cookieLanguage, browserLanguage, this.i18nService.getDefaultLanguage()].find(language =>
        availableLanguages.some(availableLanguage => availableLanguage.id === language)
      );

      if (this.platformService.isBrowser) {
        /**
         * It is implemented in this way until this issue is resolved.
         * https://github.com/angular/angular/issues/27148
         */
        this.router.navigateByUrl(`${targetLanguage}${state.url}`, { replaceUrl: true });
        return false;
      }
      this.serverService.setRedirectResponse(`/${targetLanguage}${state.url}`, false);
    }

    return true;
  }
}
