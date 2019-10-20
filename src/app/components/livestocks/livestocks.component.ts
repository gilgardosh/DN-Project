import { Component, OnInit } from '@angular/core';

import { ILiveStocks } from '../../models/livestocks.interface';
import { LiveStocksService } from '../../services/live-stock-data.service';

@Component({
  selector: 'pm-livestocks',
  templateUrl: './livestocks.component.html',
  styleUrls: ['./livestocks.component.css']
})
export class LivestocksComponent implements OnInit {
  public pageTitle = 'Live Stocks Update';
  errorMessage = '';

  liveStocks: ILiveStocks[] = [];
  constructor(private liveStocksService: LiveStocksService) { }

  ngOnInit() {
    this.liveStocksService.getLiveStocks().subscribe({
      next: userData => {
        this.liveStocks = userData;
      },

      error: err => this.errorMessage = err
    });
  }
}
