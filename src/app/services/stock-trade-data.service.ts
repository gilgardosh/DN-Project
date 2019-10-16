import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LiveStocksService } from './live-stock-data.service';
import { UserDataService } from './user-data.service';
import { IStockTradeData } from '../models/stocktradedata.interface';

this.appService.getUserId
@Injectable({
  providedIn: 'root'
})
export class StockTradeService {


  constructor(private liveStocksService: LiveStocksService,
              private userDataService: UserDataService
    ) { }

  getStockTradeService(): Observable<IStockTradeData[]> {

  }
}
