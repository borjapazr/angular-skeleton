import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf, Type } from '@angular/core';
import { RouteReuseStrategy, RouterModule, TitleStrategy } from '@angular/router';
import { TRANSLOCO_CONFIG, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import { LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';

import { LANGUAGES } from '@core/constants/languages';
import { environment } from '@env/environment';
import { SharedModule } from '@shared/shared.module';

import { ContentComponent, FooterComponent, HeaderComponent, NavbarComponent } from './components';
import { EnsureModuleLoadedOnce } from './guards';
import { GlobalErrorHandler } from './handlers';
import { HttpErrorInterceptor } from './interceptors';
import { AppInitializer } from './services';
import { AppUpdater } from './services/app-updater.service';
import { CustomPageTitleStrategy, CustomRouteReuseStrategy } from './strategies';
import { CustomLazyLoadImageStrategy } from './strategies/custom-lazyload-image.strategy';
import { APP_NAME } from './tokens/app-name';

const SHARED_ITEMS: Type<any>[] = [FooterComponent, HeaderComponent, ContentComponent, NavbarComponent];

const initializeApplication = (appInitializer: AppInitializer) => (): Promise<any> => appInitializer.initialize();

const availableLanguages = LANGUAGES.map(language => ({ id: language.id, label: language.name }));
const languagesToLocales = Object.assign({}, ...LANGUAGES.map(language => ({ [language.id]: language.locale })));

@NgModule({
  declarations: [...SHARED_ITEMS],
  imports: [
    // Angular modules
    CommonModule,
    RouterModule,
    HttpClientModule,

    // i18n
    TranslocoMessageFormatModule.forRoot({
      enableCache: true
    }),
    TranslocoLocaleModule.forRoot({
      defaultLocale: languagesToLocales[environment.defaultLanguage],
      langToLocaleMapping: languagesToLocales
    }),
    TranslocoModule,

    // Shared modules
    SharedModule
  ],
  exports: [HttpClientModule, ...SHARED_ITEMS]
})
export class CoreModule extends EnsureModuleLoadedOnce {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private appUpdater: AppUpdater) {
    super(parentModule as NgModule);
    this.appUpdater.handleAppUpdates();
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: APP_NAME,
          useValue: environment.appName
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeApplication,
          deps: [AppInitializer],
          multi: true
        },
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        },
        {
          provide: TRANSLOCO_CONFIG,
          useValue: translocoConfig({
            availableLangs: availableLanguages,
            defaultLang: environment.defaultLanguage || 'en',
            flatten: {
              aot: environment.production
            },
            prodMode: environment.production,
            reRenderOnLangChange: true,
            fallbackLang: environment.defaultLanguage || 'en'
          })
        },
        {
          provide: RouteReuseStrategy,
          useClass: CustomRouteReuseStrategy
        },
        {
          provide: TitleStrategy,
          useClass: CustomPageTitleStrategy
        },
        {
          provide: LAZYLOAD_IMAGE_HOOKS,
          useClass: CustomLazyLoadImageStrategy
        }
      ]
    };
  }
}
