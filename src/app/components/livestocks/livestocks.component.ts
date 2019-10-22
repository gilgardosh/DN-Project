import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAPIStocks } from 'src/app/models/apistocks.interface';
import { LiveStocksService } from '../../services/live-stock-data.service';
import { AuthService } from 'src/app/services/auth.service';

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
  index: IAPIStocks[];

  constructor(
    public liveStocksService: LiveStocksService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.initStocksLive();
  }

  initStocksLive() {
    this.liveStocks$ = this.liveStocksService.stocks$.pipe(tap(stocks => {}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
