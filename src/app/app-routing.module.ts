import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatcher, UrlSegment } from '@angular/router';

import { LANGUAGES } from './core/constants';
import { LocalizeRoute } from './core/guards';
import { LanguageResolver } from './core/resolvers';
import { CustomRoutePreloadingStrategy } from './core/strategies';
import { ErrorComponent } from './shared/components';

const languageMatcher: UrlMatcher = (url: UrlSegment[]) => {
  const isAllowedLanguage =
    Array.isArray(url) && url.length && LANGUAGES.map(language => language.id).includes(url[0].path);
  return isAllowedLanguage ? { consumed: url.slice(0, 1) } : null;
};

/**
 * t(routes.default.title, routes.default.description)
 * t(routes.welcome.title, routes.welcome.description)
 * t(routes.jokes.title, routes.jokes.description)
 */
const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    data: {
      meta: {
        titleKey: 'routes.welcome.title',
        descriptionKey: 'routes.welcome.description'
      }
    }
  },
  {
    path: 'jokes',
    loadChildren: () => import('./features/jokes/jokes.module').then(m => m.JokesModule),
    data: {
      preload: true,
      delayInSeconds: 10,
      meta: {
        titleKey: 'routes.jokes.title',
        descriptionKey: 'routes.jokes.description'
      }
    }
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {
      revalidate: 0
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          matcher: languageMatcher,
          children: routes,
          resolve: [LanguageResolver]
        },
        { path: '', canActivate: [LocalizeRoute], children: routes }
      ],
      {
        initialNavigation: 'enabledBlocking',
        scrollPositionRestoration: 'enabled',
        preloadingStrategy: CustomRoutePreloadingStrategy
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
