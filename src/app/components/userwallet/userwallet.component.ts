import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserStocks } from 'src/app/models/userstocks.interface';
import { UserStocksService } from 'src/app/services/user-stocks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-userwallet',
  templateUrl: './userwallet.component.html',
  styleUrls: ['./userwallet.component.css']
})
export class UserwalletComponent implements OnInit, OnDestroy {
  public pageTitle = 'Personal E-Wallet';
  errorMessage = '';
  subscription = new Subscription();
  userStocks: IUserStocks[] = [];

  constructor(private userStocksService: UserStocksService) {}

  ngOnInit(): void {
    this.initStocks();
  }

  initStocks() {
    const stock$ = this.userStocksService.getStocks().subscribe({
      next: userStocks => {
        this.userStocks = userStocks;
        console.log('User Stocks: ' + JSON.stringify(this.userStocks));
      },
      error: err => (this.errorMessage = err)
    });
    this.subscription.add(stock$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
