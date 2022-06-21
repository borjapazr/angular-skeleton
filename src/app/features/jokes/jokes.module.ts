import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { JokesRoutingModule } from './jokes-routing.module';
import { ChuckNorrisComponent } from './pages';
import { ChuckNorrisService } from './services';

@NgModule({
  declarations: [ChuckNorrisComponent],
  imports: [CommonModule, JokesRoutingModule, SharedModule],
  providers: [ChuckNorrisService]
})
export class JokesModule {}
