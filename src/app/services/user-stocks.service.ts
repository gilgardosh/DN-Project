import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserStocks } from '../models/userstocks.interface';
import { HttpService } from './http.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserStocksService {
  constructor(
    private http: HttpService,
    private userDataService: UserDataService
  ) {}

  getStocks(): Observable<IUserStocks[]> {
    const userId = this.userDataService.getUserId();
    return this.http.onGetUserStocks(userId);
  }
}
