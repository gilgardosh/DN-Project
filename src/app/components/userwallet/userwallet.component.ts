import { Component, OnInit } from '@angular/core';
import { IUserStocks } from 'src/app/models/userstocks.interface';
import { UserStocksService } from 'src/app/services/user-stocks.service';

@Component({
  selector: 'pm-userwallet',
  templateUrl: './userwallet.component.html',
  styleUrls: ['./userwallet.component.css']
})
export class UserwalletComponent implements OnInit {
  public pageTitle = 'Personal E-Wallet';
  errorMessage = '';

  userStocks: IUserStocks[] = [];

  constructor(private userStocksService: UserStocksService) { }

  ngOnInit(): void {
    this.initStocks();
  }

  initStocks() {
    this.userStocksService.getStocks().subscribe({
      next: userStocks => {
        this.userStocks = userStocks;
        console.log('User Stocks: ' + JSON.stringify(this.userStocks));
      },
      error: err => this.errorMessage = err
    });
  }
}
