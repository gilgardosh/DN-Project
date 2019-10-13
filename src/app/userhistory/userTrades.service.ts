import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { UserTrade } from './usertrade';

@Injectable({
  providedIn: 'root'
})
export class UserTradesService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  private tradesUrl = 'api/tradehistory/user0001tradehistory.json';

  constructor(private http: HttpClient) { }

  getTrades(): Observable<UserTrade[]> {
    return this.http.get<UserTrade[]>(this.tradesUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
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
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
