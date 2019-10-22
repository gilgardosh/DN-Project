import { Component, OnInit } from '@angular/core';
import { UserTradesService } from '../../services/user-trades.service';
import { IUserTradeData } from '../../models/usertrade.interface';

@Component({
  selector: 'pm-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.css']
})
export class UserhistoryComponent implements OnInit {
  public pageTitle = 'User Trade History';
  errorMessage = '';

  userTrades: IUserTradeData[] = [];

  constructor(private userTradesService: UserTradesService) {}

  ngOnInit(): void {
    this.initTrades();
  }

  initTrades() {
    this.userTradesService.getTrades().subscribe({
      next: userTrades => {
        this.userTrades = userTrades;
        console.log('User Trades: ' + JSON.stringify(this.userTrades));
      },
      error: err => (this.errorMessage = err)
    });
  }
}
