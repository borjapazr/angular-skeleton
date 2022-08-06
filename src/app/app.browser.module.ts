import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TRANSLOCO_LOADER } from '@ngneat/transloco';
import { TranslocoPreloadLangsModule } from '@ngneat/transloco-preload-langs';
import { StateTransferInitializerModule } from '@nguniversal/common';

import { LANGUAGES } from '@core/constants';
import { I18nBrowserLoader } from '@core/loaders/i18n-browser.loader';
import { environment } from '@env/environment';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    // Application NgModule
    AppModule,

    // SSR - Angular Universal
    StateTransferInitializerModule,

    // i18n
    TranslocoPreloadLangsModule.forRoot(LANGUAGES.map(language => language.id)),

    // PWA - Service Worker
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{ provide: TRANSLOCO_LOADER, useClass: I18nBrowserLoader }],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
