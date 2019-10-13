import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-livestocks',
  templateUrl: './livestocks.component.html',
  styleUrls: ['./livestocks.component.css']
})
export class LivestocksComponent implements OnInit {
  public pageTitle = 'Live Stocks Update';

  constructor() { }

  ngOnInit() {
  }

}
