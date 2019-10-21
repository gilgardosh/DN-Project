import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StocksListService {
  stockList: string[] = [];

  constructor(private http: HttpService) {
    // this.initStocksList();
  }

  // initStocksList() {
  //   this.stockList = this.http
  //     .onGetStockslist()
  //     .pipe(map(list => list.map(a => a['stock_symbol'])));
  // }

  getStocksList(): Observable<string[]> {
    return this.http.onGetStockslist().pipe(
      map(res => res.body),
      tap(list => {
        this.stockList = list.map(a => a['stock_symbol']);
      })
    );
  }
}
