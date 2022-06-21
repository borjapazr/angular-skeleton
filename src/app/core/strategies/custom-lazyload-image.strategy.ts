import { isPlatformServer } from '@angular/common';
import { IntersectionObserverHooks } from 'ng-lazyload-image';

export class CustomLazyLoadImageStrategy extends IntersectionObserverHooks {
  override isBot() {
    return isPlatformServer(this.platformId);
  }
}
