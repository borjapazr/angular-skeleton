import { Component } from '@angular/core';

import { I18nService } from '@app/core/services';
import { LANGUAGES } from '@core/constants';
import { environment } from '@env/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly author = environment.author;

  readonly year = new Date().getFullYear();

  readonly website = environment.authorWebsite;

  readonly languages = LANGUAGES;

  readonly activeLanguage$ = this.i18nService.getActiveLanguage$();

  constructor(private readonly i18nService: I18nService) {}

  public setActiveLanguage(language: string): void {
    this.i18nService.setActiveLanguage(language);
  }
}
