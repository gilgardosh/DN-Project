import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    private http: HttpService,
    private userDataService: UserDataService
  ) {}

  makeTransaction(
    stockSymbol: string,
    buyOrSell: string,
    quantity: number,
    totalPrice: number
  ) {
    const userId = this.userDataService.getUserId();
    return this.http.onMakeTransaction(
      stockSymbol,
      buyOrSell,
      quantity,
      totalPrice,
      userId
    );
  }
}
