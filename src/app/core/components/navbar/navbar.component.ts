import { Component } from '@angular/core';

import { MENU_ENTRIES } from '@core/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  readonly menuEntries = MENU_ENTRIES;

  constructor() {}
}
