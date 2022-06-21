import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { PlatformService } from '@core/services';

const SLOW_CONNECTIONS = ['slow-2g', '2g', '3g'];

@Injectable({
  providedIn: 'root'
})
export class NetworkAwareRoutePreloadingStrategy implements PreloadingStrategy {
  private preloadedModules = new Set<Route>();

  constructor(private readonly platformService: PlatformService) {}

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const loadRoute = () => {
      this.preloadedModules.add(route);
      return load();
    };
    return this.shouldPreloadRoute(route) ? loadRoute() : EMPTY;
  }

  private shouldPreloadRoute(route: Route): boolean {
    if (this.platformService.isServer) {
      return false;
    }

    const connection = (navigator as any)?.connection;
    const currentSpeed = connection.effectiveType;

    return !this.preloadedModules.has(route) && !connection.saveData && !SLOW_CONNECTIONS.includes(currentSpeed!);
  }
}
