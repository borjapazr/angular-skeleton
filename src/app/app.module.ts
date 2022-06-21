import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { CoreModule } from '@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // SSR - Angular Universal
    BrowserModule.withServerTransition({ appId: 'angular-skeleton' }),
    TransferHttpCacheModule,

    // Application modules
    CoreModule.forRoot(),
    SharedModule.forRoot(),

    // Application routing
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
