import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IStockTradeData } from 'src/app/models/stocktradedata.interface';
import { StockTradeDataService } from 'src/app/services/stock-trade-data.service';

export interface IForm {
  quantity: number;
  buysellselector: string;
}

@Component({
  selector: 'pm-buysell-form',
  templateUrl: './buysell-form.component.html',
  styleUrls: ['./buysell-form.component.css']
})
export class BuysellFormComponent implements OnInit {
  form: FormGroup;
  stockTradeData: IStockTradeData;
  errorMessage = '';


  @Output() valueChanged = new EventEmitter<IForm>();

  constructor(private stockTradeDataService: StockTradeDataService) {}

  ngOnInit() {
    this.initForm();
    this.initStockTrade('GOOGL');           // change to selectable stock symbol
  }

  initStockTrade (stock_symbol: string) {
    // this.stockTradeDataService.getStockTradeData(stock_symbol)
    // .subscribe({
    //   next: data => {
    //     this.stockTradeData = data;
    //     console.log('Data for buy/sell stock: ' + JSON.stringify(this.stockTradeData));
    //   },
    //   error: err => this.errorMessage = err
    // });
    const tempStock = {
      stock_symbol: "GOOGL",
      stock_name: 'Alphabet, Inc',
      current_price: 356,
      open_price: 26345,
      quantity_owned: 34,
      pastInvest: 200,
    };
    this.stockTradeData = tempStock;
  }

  initForm() {
    this.form = new FormGroup({
      buysellselector: new FormControl('buy',[
        Validators.required
      ]),
      quantity: new FormControl('0', [
        Validators.required,
        Validators.minLength(1),
        Validators.min(1),
      ])
    }, { validators: this.quantityOKvalidator });
  }

  quantityOKvalidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const quantity = control.get('quantity');
    const buysellselector = control.get('buysellselector');
    const regex = /^[0-9]+$/;
    const value = quantity.value.trim()
    return (value.match(regex))   // is quantity number validation
          && quantity
          && buysellselector
          && ((buysellselector.value === 'sell')
                && (quantity.value > this.stockTradeData.quantity_owned)
                ? false : true) // sell quantity validation
          ? null : {Error};
  }

  get isFormValid() {
    return this.form.valid;
  }

  onSubmit() {
    console.log(this.form.value);
    this.valueChanged.emit(this.form.value);
  }
}
