/* eslint-disable import/no-deprecated */
import { ApplicationRef, Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { concat, EMPTY, first, Observable, switchMap, timer, toArray } from 'rxjs';

import { PlatformService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class CustomRoutePreloadingStrategy implements PreloadingStrategy {
  private preloadedModules = new Set<Route>();

  constructor(private readonly platformService: PlatformService, private applicationRef: ApplicationRef) {}

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const loadRoute = (delay: number) => {
      this.preloadedModules.add(route);
      const appIsStable$ = this.applicationRef.isStable.pipe(first(isStable => isStable === true));
      const preloadTimer$ = timer(delay * 1000);
      const preloadRouteOnceAppIsStable$ = concat(appIsStable$, preloadTimer$).pipe(
        toArray(),
        switchMap(() => load())
      );
      return delay > 0 ? preloadRouteOnceAppIsStable$ : load();
    };
    return this.shouldPreloadRoute(route) ? loadRoute(this.getDelay(route)) : EMPTY;
  }

  private shouldPreloadRoute(route: Route): boolean {
    if (this.platformService.isServer) {
      return false;
    }

    return !this.preloadedModules.has(route) && route.data && route.data['preload'];
  }

  private getDelay(route: Route): number {
    return route.data && route.data['delayInSeconds'] ? route.data['delayInSeconds'] : 0;
  }
}
