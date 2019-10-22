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
import { tap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IAPIStocks } from 'src/app/models/apistocks.interface';

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
  stockData: IStockTradeData = {
    stock_symbol: 'AAA',
    stock_name: 'BBB',
    current_price: 1,
    change: 2,
    change_percent: 3,
    quantity_owned: 4,
    pastInvest: 5
  };

  @Output() valueChanged = new EventEmitter<IForm>();

  constructor(
    private buysellComponent: BuysellComponent,
    public liveStocksService: LiveStocksService,
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getStockSymbol();
    this.initStockTradeData();
    this.initForm();
  }

  getStockSymbol() {
    const param$ = this.route.paramMap.subscribe(param => {
      this.stockSymbol = param.get('stockSymbol');
      console.log('stock: ' + this.stockSymbol);
    });
    this.subscription.add(param$);
  }

  initStockTradeData() {
    // let index: IAPIStocks[];
    const param2$ = this.liveStocksService.stocks$.pipe(
      tap(stocks => {
        console.log('!!!');
        // index = stocks.filter(item => {
        //   return (item.symbol === this.stockSymbol);
        // });
        // console.log("!!!!:" + index[0]);
      })
    );
    // this.subscription.add(param2$);
  }

  // initStockLive() {
  //   const param$ = this.buysellComponent.stockTradeData$.pipe(tap(data => {
  //     console.log("!!!");
  //     if (!!data) {
  //       this.stockData$.stock_symbol = data[0].symbol;
  //       this.stockData$.stock_name = data[0].companyName;
  //       this.stockData$.current_price = data[0].latestPrice;
  //       this.stockData$.change = data[0].change;
  //       this.stockData$.change_percent = data[0].changePercent;
  //     }
  //   }
  //   ));
  //   console.log(this.index[0]);
  // }

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
  }

  get isFormValid() {
    return this.form.valid;
  }

  onSubmit() {
    this.form.value.quantity = Number(this.form.value.quantity);
    this.form.value.formTotalPrice =
      this.form.value.formTotalPrice * this.form.value.quantity;
    this.form.value.formStockSymbol = this.stockSymbol;
    console.log(this.form.value);
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
