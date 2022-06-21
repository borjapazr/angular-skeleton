import { Injectable } from '@angular/core';

import { CookieService } from '@app/core/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private readonly cookieService: CookieService) {}

  public saveCookie(key: string, value: string, validityTimeInDays: number): void {
    const expirestAt = new Date();
    expirestAt.setDate(expirestAt.getDate() + validityTimeInDays);
    this.cookieService.set(key, value, { expires: expirestAt, path: '/' });
  }

  public getCookie(key: string): string | undefined {
    return this.cookieService.get(key);
  }

  public removeCookie(key: string): void {
    this.cookieService.delete(key);
  }
}
