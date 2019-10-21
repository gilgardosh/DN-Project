import { RouterModule, Routes } from '@angular/router';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
import { BuysellComponent } from './components/buysell/buysell.component';
import { UserwalletComponent } from './components/userwallet/userwallet.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tradehistory', component: UserhistoryComponent },
  { path: 'userwallet', component: UserwalletComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'buysell',
    component: BuysellComponent,
    children: []
  },
  {
    path: 'buysell/:stockName',
    component: BuysellComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
