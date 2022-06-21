import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private readonly detachedRouteHandles = new WeakMap<Route, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.shouldBeReused(route);
  }

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    handle
      ? this.detachedRouteHandles.set(route.routeConfig!, handle)
      : this.detachedRouteHandles.delete(route.routeConfig!);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.shouldBeReused(route) ? this.detachedRouteHandles.has(route.routeConfig!) : false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.shouldBeReused(route) ? this.detachedRouteHandles.get(route.routeConfig!)! : null;
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === current.routeConfig || this.shouldBeReused(future);
  }

  private shouldBeReused(route: ActivatedRouteSnapshot): boolean {
    return !!route.data['shouldReuse'];
  }
}
