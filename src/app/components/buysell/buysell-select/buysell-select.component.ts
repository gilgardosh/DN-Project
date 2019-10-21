import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { StocksListService } from 'src/app/services/stockslist.service';

@Component({
  selector: 'pm-buysell-select',
  templateUrl: './buysell-select.component.html',
  styleUrls: ['./buysell-select.component.css']
})
export class BuysellSelectComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  stockNameEnter = new FormControl();
  filteredOptions: Observable<string[]>;
  stockList: string[];
  errorMessage = '';

  @Input() stockName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stocksListService: StocksListService,
  ) {}

  ngOnInit() {
    this.initStocksList$();
    this.getStocksList();
    this.initForm();
  }

  initStocksList$() {
    const param$ = this.stocksListService.getStocksList().subscribe(list => {
      this.stockList = list.map(a => a['stock_symbol']);
    });
    this.subscription.add(param$);
  }

  getStocksList() {
    this.stocksListService.getStocksList().subscribe({
      next: list => {
        this.stockList = list.map(a => a['stock_symbol']);
        console.log(this.stockList);
      },
      error: err => this.errorMessage = err
    });
  }

  initForm() {
    this.filteredOptions = this.stockNameEnter.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.router.navigate([event.option.value], {
      relativeTo: this.route
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stockList.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
