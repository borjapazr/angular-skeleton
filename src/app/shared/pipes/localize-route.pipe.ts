import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import * as equal from 'fast-deep-equal';
import { Subscription } from 'rxjs';

import { I18nService } from '@core/services';

@Pipe({
  name: 'localizeRoute',
  // Required to update the value when the promise is resolved
  pure: false
})
export class LocalizeRoutePipe implements PipeTransform, OnDestroy {
  private value: string | any[] = '';

  private lastRoute: string | any[] = '';

  private lastLanguage: string = this.i18nService.getActiveLanguage();

  private languageChanges: Subscription = this.i18nService.getActiveLanguage$().subscribe(() => {
    this.transform(this.lastRoute);
  });

  constructor(private readonly i18nService: I18nService) {}

  ngOnDestroy() {
    if (this.languageChanges) {
      this.languageChanges.unsubscribe();
    }
  }

  transform(route: string | any[]): string | any[] {
    if (!route || route.length === 0 || !this.i18nService.getActiveLanguage()) {
      return route;
    }

    if (equal(route, this.lastRoute) && equal(this.lastLanguage, this.i18nService.getActiveLanguage())) {
      return this.value;
    }

    const activeLanguage = this.i18nService.getActiveLanguage();
    this.lastLanguage = this.i18nService.getActiveLanguage();
    this.lastRoute = route;

    this.value = this.getLocalizedRoute(route, activeLanguage);

    return this.value;
  }

  private getLocalizedRoute(path: string | any[], language: string): string | any[] {
    if (typeof path === 'string') {
      return path.indexOf('/') == 0 ? `/${language}${path}` : path;
    }

    let result: any[] = [];
    path.forEach((segment: any, index: number) => {
      if (typeof segment === 'string') {
        const isRootRoute = index == 0 && segment.indexOf('/') == 0;
        result.push(isRootRoute ? `/${language}${segment}` : segment);
      }
    });

    return result;
  }
}
