import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IForm } from './buysell-form/buysell-form.component';

@Component({
  selector: 'pm-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css']
})
export class BuysellComponent implements OnInit, OnDestroy {
  public pageTitle = 'Buy and Sell Stocks';
  private subscription = new Subscription();
  public stockList = [];
  public stockName: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initParam$();
  }

  onValueChanged(values: IForm) {
    console.log('value is here: ', values);
  }

  initParam$() {
    const param$ = this.route.paramMap.subscribe(param => {
      this.stockName = param.get('stockName');
      this.stockList = this.getStocksList();
      const isIncluded = !!this.stockList.find(
        stock => stock === this.stockName
      );

      if (this.stockName && !isIncluded) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
    this.subscription.add(param$);
  }

  getStocksList() {
    return ['AAPL', 'GOOGL', 'TEMP'];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
