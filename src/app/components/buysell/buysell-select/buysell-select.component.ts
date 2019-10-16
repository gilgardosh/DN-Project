import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'pm-buysell-select',
  templateUrl: './buysell-select.component.html',
  styleUrls: ['./buysell-select.component.css']
})
export class BuysellSelectComponent implements OnInit {
  stockNameEnter = new FormControl();
  options: string[] = ['APPL', 'GOOGL', 'TEMP'];
  filteredOptions: Observable<string[]>;

  @Input() stockName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
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

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
