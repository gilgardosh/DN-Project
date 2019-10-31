import { Component, OnInit, Input } from '@angular/core';
import { IAPIStocks } from 'src/app/models/apistocks.interface';

@Component({
  selector: 'pm-livestock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.css']
})
export class LivestockComponent implements OnInit {
  @Input() stock: IAPIStocks;

  constructor() { }

  ngOnInit() {
  }

}
