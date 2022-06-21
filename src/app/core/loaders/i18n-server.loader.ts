import { Injectable } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { readFileSync } from 'fs';
import { Observable, Observer } from 'rxjs';

import { TransferStateKey } from '@core/enums';

@Injectable({
  providedIn: 'root'
})
export class I18nServerLoader implements TranslocoLoader {
  private readonly translationsFolder = 'dist/browser/assets/i18n';

  private readonly translationFileExtension = '.json';

  constructor(private transferState: TransferState) {}

  public getTranslation(language: string): Observable<Translation> {
    return new Observable((observer: Observer<Translation>) => {
      const translationsData: any = JSON.parse(
        readFileSync(`${this.translationsFolder}/${language}${this.translationFileExtension}`, 'utf8')
      );
      const translationsKey: StateKey<number> = makeStateKey<number>(`${TransferStateKey.TRANSLATIONS}-${language}`);
      this.transferState.set(translationsKey, translationsData);
      observer.next(translationsData);
      observer.complete();
    });
  }
}
