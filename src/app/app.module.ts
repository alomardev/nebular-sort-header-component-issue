import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbThemeModule, NbTreeGridModule } from '@nebular/theme';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { useHash: true }),
    NbThemeModule.forRoot(),
    NbLayoutModule,

    NbTreeGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
