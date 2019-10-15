import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { IUserData } from '../models/userdata.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userdataUrl = 'api/users/users.json';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<IUserData[]> {
    return this.http.get<IUserData[]>(this.userdataUrl)
      .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      map(res => {
        return res.map(userData => Object.values(userData)[0])[0];
      }),
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
