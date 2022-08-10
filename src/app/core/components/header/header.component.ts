import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { Cookie } from '@app/core/enums';
import { StorageService } from '@app/shared/services';
import { environment } from '@env/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly logo = '/assets/images/logo.svg';

  public readonly lightAvatar =
    'https://ui-avatars.com/api/?background=222&color=f5f5f4&size=88&name=Borja+Paz&rounded=false&background=404040';

  public readonly darkAvatar =
    'https://ui-avatars.com/api/?background=222&color=404040&size=88&name=Borja+Paz&rounded=false&background=f5f5f4';

  public readonly title = environment.appName;

  public readonly version = environment.appVersion;

  public isDarkMode = this.getIsDarkMode();

  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly storageService: StorageService) {
    this.setIsDarkMode(this.isDarkMode);
  }

  public toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.setIsDarkMode(this.isDarkMode);
  }

  private getIsDarkMode(): boolean {
    return this.storageService.getCookie(Cookie.DARK_MODE)
      ? this.storageService.getCookie(Cookie.DARK_MODE) === '1'
      : environment.darkModeAsDefault;
  }

  private setIsDarkMode(enabled: boolean): void {
    this.storageService.saveCookie(Cookie.DARK_MODE, this.isDarkMode ? '1' : '0', 90);
    this.document.documentElement.className = enabled ? 'dark' : '';
  }
}
