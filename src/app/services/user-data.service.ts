import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUserData } from '../models/userdata.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userId: string;
  user: any;

  setUserId(val: string) {
    this.userId = val;
  }

  constructor(private http: HttpService) {
    this.userId = 'user0001';
   }

  getUserData(): Observable<IUserData[]> {
    return this.http.onGetUserData(this.userId);
  }

}
