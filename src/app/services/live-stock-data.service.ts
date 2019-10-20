import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILiveStocks } from '../models/livestocks.interface';
import { HttpService } from './http.service';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { Update } from '../store/actions/stocks.actions';

@Injectable({
  providedIn: 'root'
})
export class LiveStocksService extends Socket {


  constructor(
    private http: HttpService,
    private store: Store<AppState>
  ) {
    super({
      url: environment.SERVER,
      options: {
        origin: '*',
        transport : ['websocket']
      }
    });
    this.subscribeToMessage('stocksupdate').subscribe(stocks => {
      this.store.dispatch(new Update(stocks));
    });

   }

  public subscribeToMessage(messageType: string): Observable<ILiveStocks[]> {
    return this.fromEvent(messageType);
  }

  getLiveStocks(): Observable<ILiveStocks[]> {
    return this.http.onGetLiveStocks();
  }

  getSpecLiveStock(): Observable<ILiveStocks[]> {
    return this.http.onGetLiveStocks();
  }
}

















// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ILiveStocks } from '../models/livestocks.interface';
// import { HttpService } from './http.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class LiveStocksService {


//   constructor(private http: HttpService,
//     ) { }

//   getLiveStocks(): Observable<ILiveStocks[]> {
//     return this.http.onGetLiveStocks();
//   }

//   getSpecLiveStock(): Observable<ILiveStocks[]> {
//     return this.http.onGetLiveStocks();
//   }
// }
