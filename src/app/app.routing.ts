import { RouterModule, Routes } from '@angular/router';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
import { BuysellComponent } from './components/buysell/buysell.component';
import { UserwalletComponent } from './components/userwallet/userwallet.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'tradehistory', component: UserhistoryComponent },
  { path: 'userwallet', component: UserwalletComponent },
  {
    path: 'buysell',
    component: BuysellComponent,
    children: []
  },
  {
    path: 'buysell/:stockName',
    component: BuysellComponent
  },
  { path: '', redirectTo: 'userwallet', pathMatch: 'full' }
  // { path: '**', redirectTo: 'userwallet', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
