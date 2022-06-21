import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { ErrorComponent } from './components';
import { IconsModule } from './modules/icons/icons.module';
import { LocalizeRoutePipe } from './pipes';

const SHARED_ITEMS: Type<any>[] = [LocalizeRoutePipe, ErrorComponent];

@NgModule({
  declarations: [...SHARED_ITEMS],
  imports: [CommonModule],
  exports: [TranslocoModule, IconsModule, LazyLoadImageModule, ...SHARED_ITEMS]
})
export class SharedModule {
  constructor() {}

  static forRoot(): ModuleWithProviders<SharedModule> {
    return { ngModule: SharedModule, providers: [] };
  }
}
