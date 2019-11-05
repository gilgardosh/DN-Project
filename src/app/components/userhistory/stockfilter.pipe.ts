import { Pipe, PipeTransform } from '@angular/core';
import { IUserTradeData } from 'src/app/models/usertrade.interface';

@Pipe({
  name: 'stockfilter'
})
export class StockfilterPipe implements PipeTransform {
  transform(value: IUserTradeData[], stockfilter: string): any {
    if (value.length === 0 || stockfilter === '') {
      return value;
    }
    const filteredTrades = [];
    for (const item of value) {
      if (item.stock_symbol === stockfilter) {
        filteredTrades.push(item);
      }
    }
    return filteredTrades;
  }
}
