import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
import { UserwalletComponent } from './userwallet/userwallet.component';
import { BuysellComponent } from './buysell/buysell.component';
import { LivestocksComponent } from './livestocks/livestocks.component';

@NgModule({
  declarations: [
    AppComponent,
    UserhistoryComponent,
    UserwalletComponent,
    BuysellComponent,
    LivestocksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'tradehistory', component: UserhistoryComponent },
      { path: 'userwallet', component: UserwalletComponent },
      { path: 'buysell', component: BuysellComponent },
      { path: '', redirectTo: 'userwallet', pathMatch: 'full' },
      { path: '**', redirectTo: 'userwallet', pathMatch: 'full' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
