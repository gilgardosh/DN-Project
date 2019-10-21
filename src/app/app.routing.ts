import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuysellComponent } from './components/buysell/buysell.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
import { UserwalletComponent } from './components/userwallet/userwallet.component';
import { AuthGuard } from './services/guards/auth.guard';
import { UnauthGuard } from './services/guards/un-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'userwallet', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
  {
    path: 'tradehistory',
    component: UserhistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userwallet',
    component: UserwalletComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'buysell',
    component: BuysellComponent,
    children: [],
    canActivate: [AuthGuard]
  },
  {
    path: 'buysell/:stockSymbol',
    component: BuysellComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
