import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IAPIStocks } from '../models/apistocks.interface';
import { ITemp } from '../models/temp.interface';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class LiveStocksService extends Socket {
  stocks$ = new BehaviorSubject<IAPIStocks>(null);

  constructor( ) {
    super({
      url: environment.SERVER,
      options: {
        origin: '*',
        transport : ['websocket']
      }
    });
    this.subscribeToMessage('stocksupdate')
    .subscribe(value  => {
      this.stocks$.next(value);
      console.log(this.stocks$);
    });
   }

  public subscribeToMessage(messageType: string): Observable<any> {
    return this.fromEvent(messageType);
  }
}
