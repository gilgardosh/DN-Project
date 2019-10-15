import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BuysellComponent } from './components/buysell/buysell.component';
import { LivestocksComponent } from './components/livestocks/livestocks.component';
import { SharedModule } from './shared/shared.module';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
import { UserwalletComponent } from './components/userwallet/userwallet.component';
import { BuysellFormComponent } from './components/buysell/buysell-form/buysell-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuysellSelectComponent } from './components/buysell/buysell-select/buysell-select.component';


@NgModule({
  declarations: [
    AppComponent,
    UserhistoryComponent,
    UserwalletComponent,
    BuysellComponent,
    LivestocksComponent,
    BuysellFormComponent,
    BuysellSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
