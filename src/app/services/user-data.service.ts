import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserData } from '../models/userdata.interface';
import { HttpService } from './http.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userId: number;
  user: any;

  setUserId(val: number) {
    this.userId = val;
  }

  constructor(private http: HttpService) { }

  getUserData(): Observable<IUserData> {
    return this.http.onGetUserData('mail@mail.com', '1234').pipe(
      tap(data => {
        this.user = Promise.resolve(data)
        console.log('UsersDataLog: ' + JSON.stringify(this.user));
        this.userId = data.user_id;
        console.log('userID: ' + this.userId);

      })
    );
  }

  getUserId() {
    return 1;  // need to improove so will load from getUSerData
  }

}
