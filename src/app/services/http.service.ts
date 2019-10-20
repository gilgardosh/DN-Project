import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ILiveStocks } from '../models/livestocks.interface';
import { IUserData } from '../models/userdata.interface';
import { IUserStocks } from '../models/userstocks.interface';
import { IUserTradeData } from '../models/usertrade.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  onGetUserData(email: string, password: string) {
    const body = {
      email,
      password
    };

    return this.http
      .post<IUserData>(`/users`, body)
      .pipe(catchError(this.handleError));
  }

  onGetUserStocks(userId: number, stock_symbol: string) {
    const body = {
      userId,
      stock_symbol
    };

    return this.http
      .post<IUserStocks[]>(`/userStocks`, body)
      .pipe(catchError(this.handleError));
  }

  onGetTrades(userId: number) {
    const body = {
      userId
    };

    return this.http
      .post<IUserTradeData[]>(`/tradeHistory`, body)
      .pipe(catchError(this.handleError));
  }

  onGetLiveStocks() {
    return this.http.get<ILiveStocks[]>(`/liveStocks`).pipe(
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
