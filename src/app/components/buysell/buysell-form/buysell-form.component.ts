import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { LiveStocksService } from 'src/app/services/live-stock-data.service';
import { BuysellComponent } from '../buysell.component';
import { IStockTradeData } from 'src/app/models/stocktradedata.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IAPIStocks } from 'src/app/models/apistocks.interface';
import { IUserStocks } from 'src/app/models/userstocks.interface';
import { UserStocksService } from 'src/app/services/user-stocks.service';

export interface IForm {
  quantity: number;
  buysellselector: string;
  formStockSymbol: string;
  formTotalPrice: number;
}

@Component({
  selector: 'pm-buysell-form',
  templateUrl: './buysell-form.component.html',
  styleUrls: ['./buysell-form.component.css']
})
export class BuysellFormComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  form: FormGroup;
  stockSymbol: string;
  userStocks: IUserStocks[] = [];
  liveStocks: IAPIStocks[] = [];
  errorMessage = '';
  stockData: IStockTradeData = {
    stock_symbol: '',
    stock_name: '',
    current_price: null,
    change: null,
    change_percent: null,
    quantity_owned: 0,
    pastInvest: null
  };

  @Output() valueChanged = new EventEmitter<IForm>();

  constructor(
    private liveStocksService: LiveStocksService,
    private userStocksService: UserStocksService,
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getStockData();
    this.initForm();
  }

  getStockData() {
    const param$ = this.route.paramMap.subscribe(param => {
      this.stockSymbol = param.get('stockSymbol');
      this.stockReset();
      this.initUserOwned(this.stockSymbol);
      this.testfunc(this.stockSymbol);
    });
    this.subscription.add(param$);
  }

  stockReset() {
    this.stockData = {
      stock_symbol: '',
      stock_name: '',
      current_price: null,
      change: null,
      change_percent: null,
      quantity_owned: 0,
      pastInvest: null
    };
  }

  initUserOwned(stockSymbol) {
    const param2$ = this.userStocksService.getStocks().subscribe({
      next: userStocks => {
        this.userStocks = userStocks.filter(stock => {
          return stock.stock_symbol === stockSymbol;
        });
        if (this.userStocks.length === 1) {
          this.stockData.quantity_owned = this.userStocks[0].quantity_owned;
          this.stockData.pastInvest = this.userStocks[0].investment;
        }
      },
      error: err => (this.errorMessage = err)
    });
    this.subscription.add(param2$);
  }

  testfunc(stockSymbol) {
    const param3$ = this.liveStocksService.stocks$.subscribe({
      next: stocks => {
        this.liveStocks = stocks.filter(stock => {
          return stock.symbol === stockSymbol;
        });
        if (this.liveStocks.length === 1) {
          this.stockData.stock_name = this.liveStocks[0].companyName;
          this.stockData.current_price = this.liveStocks[0].latestPrice;
          this.stockData.change = this.liveStocks[0].change;
          this.stockData.change_percent = this.liveStocks[0].changePercent;
        }
      }
    });
  }

  // from now on - Form stuff

  initForm() {
    this.form = new FormGroup(
      {
        buysellselector: new FormControl('buy', [Validators.required]),
        quantity: new FormControl('0', [
          Validators.required,
          Validators.minLength(1),
          Validators.min(1)
        ]),
        formStockSymbol: new FormControl(this.stockSymbol),
        formTotalPrice: new FormControl(this.stockData.current_price)
      },
      { validators: this.quantityOKvalidator }
    );
  }

  quantityOKvalidator: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    const quantity = control.get('quantity');
    const buysellselector = control.get('buysellselector');
    const regex = /^[0-9]+$/;
    const value = quantity.value.trim();
    return value.match(regex) && // is quantity a number validation
      quantity &&
      buysellselector &&
      (buysellselector.value === 'sell' &&
      quantity.value > this.stockData.quantity_owned
        ? false
        : true) // sell quantity validation
      ? null
      : { Error };
  };

  get isFormValid() {
    return this.form.valid;
  }

  onSubmit() {
    this.form.value.quantity = Number(this.form.value.quantity);
    this.form.value.formTotalPrice =
      this.form.value.formTotalPrice * this.form.value.quantity;
    this.form.value.formStockSymbol = this.stockSymbol;
    console.log('transaction form value: ' + this.form.value);
    this.transactionService.makeTransaction(
      this.form.value.formStockSymbol,
      this.form.value.buysellselector,
      this.form.value.quantity,
      this.form.value.formTotalPrice
    );
    // this.valueChanged.emit(this.form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
