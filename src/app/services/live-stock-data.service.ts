import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IAPIStocks } from '../models/apistocks.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiveStocksService extends Socket {
  public stocks$ = new BehaviorSubject<IAPIStocks[]>(null);

  constructor() {
    super({
      url: environment.SERVER,
      options: {
        origin: '*',
        transport: ['websocket']
      }
    });
    this.subscribeToMessage('stocksupdate').subscribe(value => {
      this.stocks$.next(value);
    });
  }

  public subscribeToMessage(messageType: string): Observable<IAPIStocks[]> {
    return this.fromEvent(messageType);
  }
}
