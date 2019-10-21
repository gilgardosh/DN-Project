import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IForm } from './buysell-form/buysell-form.component';
import { StocksListService } from 'src/app/services/stockslist.service';

@Component({
  selector: 'pm-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css']
})
export class BuysellComponent implements OnInit, OnDestroy {
  public pageTitle = 'Buy and Sell Stocks';
  private subscription = new Subscription();
  public stockList: string[];
  public stockName: string;
  errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stocksListService: StocksListService
    ) {}

  ngOnInit() {
    this.initStocksList$();
    this.initParam$();
  }

  onValueChanged(values: IForm) {
    console.log('value is here: ', values);
  }

  initStocksList$() {
    const param2$ = this.stocksListService.getStocksList().subscribe(list => {
      this.stockList = list.map(a => a['stock_symbol']);
    });
    this.subscription.add(param2$);
  }

  initParam$() {
    const param$ = this.route.paramMap.subscribe(param => {
      this.stockName = param.get('stockName');
      const isIncluded = !!this.stockList.find(
        stock => stock === this.stockName
      );

      if (this.stockName && !isIncluded) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
    this.subscription.add(param$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
