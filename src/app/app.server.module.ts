import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { TRANSLOCO_LOADER } from '@ngneat/transloco';
import { NgxIsrModule } from 'ngx-isr';

import { I18nServerLoader } from '@core/loaders/i18n-server.loader';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    // Application NgModule
    AppModule,

    // SSR - Angular Universal
    ServerModule,
    NgxIsrModule.forRoot()
  ],
  providers: [{ provide: TRANSLOCO_LOADER, useClass: I18nServerLoader }],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
