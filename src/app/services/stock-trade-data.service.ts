import { Injectable, OnDestroy } from '@angular/core';
import { ILiveStocks } from '../models/livestocks.interface';
import { IStockTradeData } from '../models/stocktradedata.interface';
import { IUserStocks } from '../models/userstocks.interface';
import { LiveStocksService } from './live-stock-data.service';
import { UserStocksService } from './user-stocks.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IAPIStocks } from '../models/apistocks.interface';
import { tap, map } from 'rxjs/operators';

// this.appService.getUserId

@Injectable({
  providedIn: 'root'
})
export class StockTradeDataService implements OnDestroy {
  subscription = new Subscription();
  isLiveStock: Observable<boolean>;
  isPersonalStock: Observable<boolean>;
  personalStockData$ = new BehaviorSubject<any>(null)
  // stockTradeData: IStockTradeData = {
  //   stock_symbol: 'AAA',
  //   stock_name: 'BBB',
  //   current_price: 1,
  //   change: 2,
  //   change_percent: 3,
  //   quantity_owned: 4,
  //   pastInvest: 5
  // };
  // errorMessage = '';
  // stockSymbol: string;
  // private subscription = new Subscription();

  constructor(
    // private liveStocksService: LiveStocksService,
    private userStocksService: UserStocksService,
    // private route: ActivatedRoute
  ) {
    this.initIsReady();
    this.initpersonalStock();

  }

  initIsReady() {
    // this.isLiveStock = this.liveStockData$.pipe(
    //   map(data => !!data/*  && !!this.token*/)
    // );

    this.isPersonalStock = this.personalStockData$.pipe(
      map(data => !!data /*  && !!this.token*/)
    );
  }

  initpersonalStock() {
    const param$ = this.userStocksService.getStocks().subscribe({
      next: userStocks => {
        this.personalStockData$.next(userStocks);
        console.log('TESTTEST' + JSON.stringify(this.personalStockData$));
      },
      error: err => (this.errorMessage = err)
    });
    this.subscription.add(param$);
  }
  // getStockTradeData(): Observable<any> {
  //   this.getStockSymbol();
  //   console.log("123456: "+this.stockSymbol)
  //   return this.liveStocksService.stocks$.pipe(
  //     tap(stocks => {
  //       console.log("123456: "+stocks);

  //       // if (!!stocks && !!stockSymbol) {
  //       //   index = stocks.filter(item => {
  //       //     return (item.symbol === stockSymbol);
  //       //   });
  //       //   console.log(index[0]);
  //       // }
  //     })
  //   );
  // }

  // getStockSymbol() {
  //   const param$ = this.route.paramMap.subscribe(param => {
  //     this.stockSymbol = param.get('stockSymbol');
  //     console.log('stock: ' + this.stockSymbol);
  //   });
  //   this.subscription.add(param$);
  // }

  // public stockLiveData(stockSymbol) {
  //   // let index: IAPIStocks[];
  //   const AAAA$ = this.liveStocksService.stocks$.pipe(
  //     tap(stocks => {
  //       console.log(stocks);
  //       // if (!!stocks && !!stockSymbol) {
  //       //   index = stocks.filter(item => {
  //       //     return (item.symbol === stockSymbol);
  //       //   });
  //       //   console.log(index[0]);
  //       // }
  //     })
  //   );
  //   // console.log(index[0]);
  //   // return (index[0]);
  // }


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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
