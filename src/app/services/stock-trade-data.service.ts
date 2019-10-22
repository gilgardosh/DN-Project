import { Injectable } from '@angular/core';
import { ILiveStocks } from '../models/livestocks.interface';
import { IStockTradeData } from '../models/stocktradedata.interface';
import { IUserStocks } from '../models/userstocks.interface';
import { LiveStocksService } from './live-stock-data.service';
import { UserStocksService } from './user-stocks.service';
import { Observable } from 'rxjs';

// this.appService.getUserId

@Injectable({
  providedIn: 'root'
})
export class StockTradeDataService {
  stockTradeData: IStockTradeData;
  userStocks: IUserStocks[] = [];
  liveStocks: ILiveStocks[] = [];
  liveSpecStock: any;
  errorMessage = '';

  constructor(
    private liveStocksService: LiveStocksService,
    private userStocksService: UserStocksService
  ) {}

  // getStockTradeData(stock_symbol: string):
  // Observable<IStockTradeData>
  // {
  //   // this.userStocksService.getSpecStock(stock_symbol).subscribe({
  //   //   next: userStocks => {
  //   //     console.log('stock data: ' + JSON.stringify(userStocks));
  //   //     this.userStocks = userStocks;
  //   //   },
  //   //   error: err => this.errorMessage = err
  //   // });

  //   // this.liveStocksService.getSpecLiveStock().subscribe({
  //   //   next: liveStocks => {
  //   //     this.liveStocks = liveStocks;
  //   //     this.liveSpecStock = liveStocks.find(o => o.stock_symbol === stock_symbol);
  //   //   },
  //   //   error: err => this.errorMessage = err
  //   // });

  // this.stockTradeData = {
  //       stock_symbol: 'GOOGL',
  //       stock_name: 'Alphabet, Inc',
  //       current_price: 356,
  //       open_price: 26345,
  //       quantity_owned: 45,
  //       pastInvest: 2000,
  //     };

  // public stockLiveData(stockSymbol) {
  //   let index: IAPIStocks[];
  //   const AAAA$ = this.stocks$.pipe(
  //     tap(stocks => {
  //       // console.log(stocks);
  //       if (!!stocks && !!stockSymbol) {
  //         index = stocks.filter(item => {
  //           return (item.symbol === stockSymbol);
  //         });
  //         console.log(index[0]);
  //       }
  //     })
  //   );
  //   console.log(index[0]);
  //   return (index[0]);
  // }

  // console.log('stock data: ' + JSON.stringify(this.stockTradeData));
  // return this.stockTradeData;
  // }
}
