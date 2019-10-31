import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BuysellFormComponent } from './components/buysell/buysell-form/buysell-form.component';
import { BuysellSelectComponent } from './components/buysell/buysell-select/buysell-select.component';
import { BuysellComponent } from './components/buysell/buysell.component';
import { LivestocksComponent } from './components/livestocks/livestocks.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component'; // Angular CLI environment
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
import { UserwalletComponent } from './components/userwallet/userwallet.component';
import { AuthService } from './services/auth.service';
import { MainInterceptor } from './services/interceptor.service';
import { TokenInterceptor } from './services/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { LivestockComponent } from './components/livestocks/livestock/livestock.component';



@NgModule({
  declarations: [
    AppComponent,
    UserhistoryComponent,
    UserwalletComponent,
    BuysellComponent,
    LivestocksComponent,
    BuysellFormComponent,
    BuysellSelectComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    LivestockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],

  providers: [
    AuthService,
    // {
    //   useClass: MainInterceptor,
    //   multi: true,
    //   provide: HTTP_INTERCEPTORS,
    // },
    {
      useClass: TokenInterceptor,
      multi: true,
      provide: HTTP_INTERCEPTORS,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
