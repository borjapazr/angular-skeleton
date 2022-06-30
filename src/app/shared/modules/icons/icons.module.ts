import { NgModule, Type } from '@angular/core';

import { GithubIconComponent } from './github-icon/github-icon.component';
import { HappyIconComponent } from './happy-icon/happy-icon.component';
import { HeartIconComponent } from './heart-icon/heart-icon.component';

const ICONS: Type<any>[] = [HappyIconComponent, HeartIconComponent, GithubIconComponent];

@NgModule({
  declarations: [...ICONS],
  imports: [],
  exports: [...ICONS]
})
export class IconsModule {}
