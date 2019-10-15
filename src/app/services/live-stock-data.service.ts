import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { ILiveStocks } from '../models/livestocks.interface';

@Injectable({
  providedIn: 'root'
})
export class LiveStocksService {

  private liveStocksUrl = 'api/livestocks/livestocks.json';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<ILiveStocks[]> {
    return this.http.get<ILiveStocks[]>(this.liveStocksUrl)
      .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
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
