import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILiveStocks } from '../models/livestocks.interface';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class LiveStocksService {


  constructor(private http: HttpService,
    ) { }

  getLiveStocks(): Observable<ILiveStocks[]> {
    return this.http.onGetLiveStocks();
  }
}
