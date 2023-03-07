import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import isEmpty from 'just-is-empty';
import { Observable } from 'rxjs';

import { PlatformService } from '@core/services';
import { I18nService } from '@core/services/i18n.service';
import { BrowserService, ServerService } from '@shared/services';

const localizeRoute = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  router: Router = inject(Router),
  i18nService: I18nService = inject(I18nService),
  platformService: PlatformService = inject(PlatformService),
  browserService: BrowserService = inject(BrowserService),
  serverService: ServerService = inject(ServerService)
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const urlLanguage = i18nService.getUrlLanguage(state.url);

  if (isEmpty(urlLanguage)) {
    const availableLanguages = i18nService.getAvailableLanguages();
    const cookieLanguage = i18nService.getCookieLanguage();
    const browserLanguage = browserService.getBrowserLanguage() ?? serverService.getLanguageHeader();

    const targetLanguage = [cookieLanguage, browserLanguage, i18nService.getDefaultLanguage()].find(language =>
      availableLanguages.some(availableLanguage => availableLanguage.id === language)
    );

    if (platformService.isBrowser) {
      /**
       * It is implemented in this way until this issue is resolved.
       * https://github.com/angular/angular/issues/27148
       */
      router.navigateByUrl(`${targetLanguage}${state.url}`, { replaceUrl: true });
      return false;
    }
    serverService.setRedirectResponse(`/${targetLanguage}${state.url}`, false);
  }

  return true;
};

export { localizeRoute };
