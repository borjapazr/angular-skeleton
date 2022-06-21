import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { Observable, Observer } from 'rxjs';

import { TransferStateKey } from '@core/enums';

@Injectable({
  providedIn: 'root'
})
export class I18nBrowserLoader implements TranslocoLoader {
  constructor(private transferState: TransferState, private http: HttpClient) {}

  public getTranslation(language: string): Observable<Translation> {
    const translationsKey: StateKey<number> = makeStateKey<number>(`${TransferStateKey.TRANSLATIONS}-${language}`);
    const translationsData: any = this.transferState.get(translationsKey, null);

    if (translationsData) {
      return new Observable((observer: Observer<Translation>) => {
        observer.next(translationsData);
        observer.complete();
      });
    }
    return this.http.get<Translation>(`./assets/i18n/${language}.json`);
  }
}
