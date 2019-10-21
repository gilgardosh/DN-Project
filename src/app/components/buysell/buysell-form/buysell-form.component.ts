import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class BuysellFormComponent implements OnInit {
  form: FormGroup;
  stockSymbol: string;
  stockData: IStockTradeData = {
    stock_symbol: 'AAPL',
    stock_name: 'Apple, Inc.',
    current_price: 240.6,
    change: 4.09,
    change_percent: 0.02,
    quantity_owned: 10,
    pastInvest: 2000
  };

  @Output() valueChanged = new EventEmitter<IForm>();

  constructor(
    private buysellComponent: BuysellComponent,
    public liveStocksService: LiveStocksService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.getStockSymbol();
    console.log(this.stockSymbol);
    this.initForm();
  }

  getStockSymbol() {
    this.stockSymbol = this.buysellComponent.stockSymbol;
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
    console.log(this.form.value);
    const TEMP = this.transactionService.makeTransaction(
      this.form.value.formStockSymbol,
      this.form.value.buysellselector,
      this.form.value.quantity,
      this.form.value.formTotalPrice
    );
    console.log(TEMP)
    this.valueChanged.emit(this.form.value);
  }
}
