import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

import { Language, LANGUAGES } from '@core/constants';
import { Cookie } from '@core/enums';
import { SeoService, StorageService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly availableLanguages = LANGUAGES;

  constructor(
    private readonly translocoService: TranslocoService,
    private readonly router: Router,
    private readonly location: Location,
    private readonly storageService: StorageService,
    private readonly seoService: SeoService
  ) {}

  public getAvailableLanguages(): Language[] {
    return this.availableLanguages;
  }

  public getDefaultLanguage(): string {
    return this.translocoService.getDefaultLang();
  }

  public getActiveLanguage(): string {
    return this.translocoService.getActiveLang();
  }

  public getActiveLanguage$(): Observable<string> {
    return this.translocoService.langChanges$;
  }

  public initializeLanguage(language: string): void {
    this.translocoService.setDefaultLang(language);
    this.translocoService.setActiveLang(language);
    this.seoService.setLanguage(language);
    this.saveCookieLanguage(language);
  }

  public setActiveLanguage(language: string): void {
    this.translocoService.setActiveLang(language);
    this.seoService.setLanguage(language);
    this.saveCookieLanguage(language);
    this.router.navigate([language, ...this.router.url.split('/').slice(2)]);
  }

  public translate(key: string): Observable<any> {
    return this.translocoService.selectTranslate(key);
  }

  public getUrlLanguage(url?: string): string | null {
    const pathSlices = (url || this.location.path() || '').split('#')[0].split('?')[0].split('/');
    if (pathSlices.length > 1 && this.availableLanguages.some(language => language.id === pathSlices[1])) {
      return pathSlices[1];
    }
    if (pathSlices.length && this.availableLanguages.some(language => language.id === pathSlices[0])) {
      return pathSlices[0];
    }
    return null;
  }

  public getCookieLanguage(): string | undefined {
    return this.storageService.getCookie(Cookie.LANGUAGE);
  }

  public saveCookieLanguage(language: string): void {
    this.storageService.saveCookie(Cookie.LANGUAGE, language, 7);
  }
}
