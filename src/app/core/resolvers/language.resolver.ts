import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { I18nService } from '@core/services/i18n.service';

const languageResolver = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  i18nService: I18nService = inject(I18nService)
): string | Observable<string> | Promise<string> => {
  const urlLanguage = i18nService.getUrlLanguage(state.url) as string;
  const currentLanguage = i18nService.getActiveLanguage();

  if (currentLanguage !== urlLanguage) {
    i18nService.initializeLanguage(urlLanguage);
  }

  return urlLanguage;
};

export { languageResolver };
