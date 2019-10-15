import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, pipe } from 'rxjs';
import { IForm } from './buysell-form/buysell-form.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'pm-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css']
})
export class BuysellComponent implements OnInit, OnDestroy {
  public pageTitle = 'Buy and Sell Stocks';
  private subscription = new Subscription();
  public stockName: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initParam$();
  }

  onValueChanged(values: IForm) {
    console.log('value is here: ', values);
  }

  initParam$() {


    const param$ = this.route.paramMap
    .subscribe(param => {
      this.stockName = param.get('stockName');
      console.log(this.stockName);
    });
    this.subscription.add(param$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
