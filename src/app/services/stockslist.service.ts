import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map, startWith } from 'rxjs/operators';
import { initialState } from '../store/reducers/stocks.reducers';

@Injectable({
  providedIn: 'root'
})
export class StocksListService {
  // stockList: Observable<string[]>;

  constructor(private http: HttpService) {
    // this.initStocksList();
  }

  // initStocksList() {
  //   this.stockList = this.http
  //     .onGetStockslist()
  //     .pipe(map(list => list.map(a => a['stock_symbol'])));
  // }

  getStocksList(): Observable<string[]> {
    return this.http.onGetStockslist();
  }
}
