import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { IUserData } from '../models/userdata.interface';
import { throwError } from 'rxjs';
import { IUserTradeData } from '../models/usertrade.interface';
import { ILiveStocks } from '../models/livestocks.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  onGetUser(userId: string) {
    return this.http.get(`/users/${userId}`);
  }

  onGetUserData(userId: string) {
    return this.http.get<IUserData[]>(`/users/${userId}`)
    .pipe(
      tap(data => console.log('UsersDataLog: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  onGetTrades(userId: string) {
    return this.http.get<IUserTradeData[]>(`/tradeHistory/${userId}`)
    .pipe(
      tap(data => console.log('TradeHistoryLog: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

onGetLiveStocks() {
  return this.http.get<ILiveStocks[]>(`/liveStocks/`)
  .pipe(
  tap(data => console.log('LiveStocksLog: ' + JSON.stringify(data))),
  catchError(this.handleError)
  );
}

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
