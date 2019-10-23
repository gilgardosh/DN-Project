import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserStocks } from 'src/app/models/userstocks.interface';
import { UserStocksService } from 'src/app/services/user-stocks.service';
import { Subscription, Observable } from 'rxjs';
import { IAPIStocks } from 'src/app/models/apistocks.interface';
import { LiveStocksService } from 'src/app/services/live-stock-data.service';
import { tap } from 'rxjs/operators';

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
  liveStocks$: Observable<IAPIStocks[]>;

  constructor(
    private userStocksService: UserStocksService,
    public liveStocksService: LiveStocksService
  ) {}

  ngOnInit(): void {
    this.initStocks();
  }

  initStocks() {
    const stock$ = this.userStocksService.getStocks().subscribe({
      next: userStocks => {
        this.userStocks = userStocks;
      },
      error: err => (this.errorMessage = err)
    });
    this.subscription.add(stock$);
  }

  initStocksLive() {
    this.liveStocks$ = this.liveStocksService.stocks$.pipe(tap(stocks => {}));
  }

  stockValue(stockSymbol) {
    let TEMP;
    this.liveStocks$.pipe(
      tap(
        stocks =>
          (TEMP = stocks.filter(stock => {
            return stock.symbol === stockSymbol;
          }))
      )
    );
    return TEMP[0].latestPrice;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
