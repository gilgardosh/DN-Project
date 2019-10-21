import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

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
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component'; // Angular CLI environment
import { TokenInterceptor } from './services/token.interceptor';


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
    HomeComponent,
    LogoutComponent,
    SignupComponent
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
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],

  providers: [
    AuthService,
    {
      useClass: MainInterceptor,
      multi: true,
      provide: HTTP_INTERCEPTORS,
    },
    {
      useClass: TokenInterceptor,
      multi: true,
      provide: HTTP_INTERCEPTORS,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
