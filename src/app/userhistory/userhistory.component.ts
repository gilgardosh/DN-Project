import { Component, OnInit } from '@angular/core';

import { UserTrade } from './usertrade';
import { UserTradesService } from './userTrades.service';

@Component({
  selector: 'pm-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.css']
})
export class UserhistoryComponent implements OnInit {
  pageTitle = 'User History';
  errorMessage = '';

  userTrades: UserTrade[] = [];

  constructor(private userTradesService: UserTradesService) {

  }

  ngOnInit(): void {
    this.userTradesService.getTrades().subscribe({
      next: userTrades => {
        this.userTrades = userTrades;
      },
      error: err => this.errorMessage = err
    });
  }
}
