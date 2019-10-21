import { Component, OnInit } from '@angular/core';
import { IUserStocks } from 'src/app/models/userstocks.interface';
import { UserStocksService } from 'src/app/services/user-stocks.service';
import { reducers } from 'src/app/store/app.states';
import { LogInSuccess } from 'src/app/store/actions/auth.actions';

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
    console.log('reduce: '+LogInSuccess)
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
