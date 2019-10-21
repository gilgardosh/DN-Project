import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserTradeData } from '../models/usertrade.interface';
import { HttpService } from './http.service';
import { UserDataService } from './user-data.service';



@Injectable({
  providedIn: 'root'
})
export class UserTradesService {

  constructor(
    private http: HttpService,
    private userDataService: UserDataService
  ) { }

  getTrades(): Observable<IUserTradeData[]> {
    const userId = this.userDataService.getUserId();
    return this.http.onGetTrades(userId);
  }
}
