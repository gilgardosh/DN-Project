import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUserData } from '../models/userdata.interface';
import { IUserStocks } from '../models/userstocks.interface';
import { IUserTradeData } from '../models/usertrade.interface';

export interface IHttpRequestHelper<T> {
  isValid: boolean;
  body: T;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  onLogin(body) {
    const url = `/login`;
    return this.http
      .post<IHttpRequestHelper<IUserData>>(url, body)
      .pipe(catchError(this.handleError));
  }

  onSignUp(body) {
    const url = `/signup`;
    console.log('signup: '+ JSON.stringify(body));
    return this.http.put<IHttpRequestHelper<any>>(url, body);
  }

  onGetUserStocks(userId: number) {
    const body = {
      userId
    };
    return this.http
      .post<IUserStocks[]>(`/userStocks`, body)
      .pipe(catchError(this.handleError));
  }

  onMakeTransaction1(
    stockSymbol: string,
    buyOrSell: string,
    quantity: number,
    totalPrice: number,
    userId: number
  ) {
    const body = {
      stockSymbol,
      buyOrSell,
      quantity,
      totalPrice,
      userId
    };
    return this.http
      .put<any>(`/transaction1`, body)
      .pipe(catchError(this.handleError));
  }

  onMakeTransaction2(
    stockSymbol: string,
    buyOrSell: string,
    quantity: number,
    totalPrice: number,
    userId: number
  ) {
    const body = {
      stockSymbol,
      buyOrSell,
      quantity,
      totalPrice,
      userId
    };
    return this.http
      .put<any>(`/transaction2`, body)
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


  onGetStockslist() {
    return this.http.get<IHttpRequestHelper<string[]>>(`/stocksList`).pipe(
      tap(data => {}),
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
