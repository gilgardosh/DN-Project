import { Component, OnInit, OnDestroy } from '@angular/core';
import { LiveStocksService } from '../../services/live-stock-data.service';
import { Subscription, Observable } from 'rxjs';
import { IAPIStocks } from 'src/app/models/apistocks.interface';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'pm-livestocks',
  templateUrl: './livestocks.component.html',
  styleUrls: ['./livestocks.component.css']
})
export class LivestocksComponent implements OnInit, OnDestroy {
  public pageTitle = 'Live Stocks Update';
  private subscription = new Subscription();
  errorMessage = '';
  liveStocks$: Observable<IAPIStocks[]>;

  constructor(public liveStocksService: LiveStocksService) {}

  ngOnInit() {
    this.initStocksLive();
  }

  initStocksLive() {
    this.liveStocks$ = this.liveStocksService.stocks$.pipe(
      tap(stocks => {
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
