import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  public readonly isBrowser = isPlatformBrowser(this.platformId);

  public readonly isServer = isPlatformServer(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
}
