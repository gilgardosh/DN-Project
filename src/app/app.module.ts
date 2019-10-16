import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BuysellFormComponent } from './components/buysell/buysell-form/buysell-form.component';
import { BuysellSelectComponent } from './components/buysell/buysell-select/buysell-select.component';
import { BuysellComponent } from './components/buysell/buysell.component';
import { LivestocksComponent } from './components/livestocks/livestocks.component';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
import { UserwalletComponent } from './components/userwallet/userwallet.component';
import { MainInterceptor } from './services/interceptor.service';
import { SharedModule } from './shared/shared.module';


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
  providers: [
    {
      useClass: MainInterceptor,
      multi: true,
      provide: HTTP_INTERCEPTORS,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
