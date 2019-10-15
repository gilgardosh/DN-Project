import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IUserTradeData } from '../models/usertrade.interface';

@Injectable({
  providedIn: 'root'
})
export class UserTradesService {

  private tradesUrl = 'api/tradehistory/tradehistory.json';

  constructor(private http: HttpClient) { }

  getTrades(): Observable<IUserTradeData[]> {
    return this.http.get<IUserTradeData[]>(this.tradesUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        map(res => {
          return res.map(userData => Object.values(userData)[0])[0];
        }),
        catchError(this.handleError)
      );
  }

  // getProduct(id: number): Observable<UserTrade | undefined> {
  //   return this.getTrades()
  //     .pipe(
  //       map((trades: UserTrade[]) => trades.find(p => p.productId === id))
  //     );
  // }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
