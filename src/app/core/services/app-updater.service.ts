/* eslint-disable import/no-deprecated */
import { ApplicationRef, Injectable, Optional } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import {
  SwUpdate,
  VersionDetectedEvent,
  VersionEvent,
  VersionInstallationFailedEvent,
  VersionReadyEvent
} from '@angular/service-worker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, filter, first, interval, map, mergeMap, switchMap, zip } from 'rxjs';

import { SeoService } from '@app/shared/services';
import { environment } from '@env/environment';

import { I18nService } from './i18n.service';
import { Logger } from './logger.service';
import { PlatformService } from './platform.service';

const LOGGER = new Logger('AppUpdater');

@Injectable({
  providedIn: 'root'
})
@UntilDestroy()
export class AppUpdater {
  private readonly isBrowserAndServiceWorkerIsEnabled = () =>
    this.platformService.isBrowser && this.swUpdate?.isEnabled;

  constructor(
    private platformService: PlatformService,
    private applicationRef: ApplicationRef,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly i18nService: I18nService,
    private readonly seoService: SeoService,
    @Optional() private readonly swUpdate: SwUpdate
  ) {
    if (this.isBrowserAndServiceWorkerIsEnabled()) {
      const appIsStable$ = this.applicationRef.isStable.pipe(first(isStable => isStable === true));
      const checkInterval$ = interval(environment.checkForUpdatesInterval * 1000);
      const checkIntervalOnceAppIsStable$ = concat(appIsStable$, checkInterval$);
      checkIntervalOnceAppIsStable$.pipe(untilDestroyed(this)).subscribe(() => this.swUpdate.checkForUpdate());
    }
  }

  public handleAppUpdates(): void {
    this.handleNewVersionAndUpdateApp();
    this.handleRouterChangesAndUpdateMeta();
  }

  public handleNewVersionAndUpdateApp(): void {
    const eventHandler: Record<string, (event: VersionEvent | any) => void> = {
      VERSION_DETECTED: (event: VersionDetectedEvent) => {
        LOGGER.debug(`Downloading new app version: ${event.version.hash}`);
      },
      VERSION_READY: (event: VersionReadyEvent) => {
        LOGGER.debug(`Current app version: ${event.currentVersion.hash}`);
        LOGGER.debug(`New app version ready for use: ${event.latestVersion.hash}`);
        this.swUpdate.activateUpdate().then(() => document.location.reload());
      },
      VERSION_INSTALLATION_FAILED: (event: VersionInstallationFailedEvent) => {
        LOGGER.debug(`Failed to install app version '${event.version.hash}': ${event.error}`);
      },
      DEFAULT: (event: VersionEvent) => {
        LOGGER.debug(`Unknown event with type '${event.type}' handled`);
      }
    };

    if (this.isBrowserAndServiceWorkerIsEnabled()) {
      this.swUpdate.versionUpdates.pipe(untilDestroyed(this)).subscribe((event: VersionEvent) => {
        (eventHandler[event.type] || eventHandler['DEFAULT'])(event);
      });
    }
  }

  public handleRouterChangesAndUpdateMeta(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route: ActivatedRoute) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        mergeMap((route: ActivatedRoute) => route.data),
        switchMap((data: Data) => {
          const { titleKey, descriptionKey } = data[`meta`] || {};
          const title$ = titleKey
            ? this.i18nService.translate(titleKey)
            : this.i18nService.translate('routes.default.title');
          const description$ = descriptionKey
            ? this.i18nService.translate(descriptionKey)
            : this.i18nService.translate('routes.default.description');
          return zip(title$, description$);
        }),
        untilDestroyed(this)
      )
      .subscribe(([title, description]): void => {
        this.seoService.setTitle(`${environment.appName} - ${title}`);
        this.seoService.setDescription(description);
      });
  }
}
