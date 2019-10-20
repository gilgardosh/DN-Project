import { Action } from '@ngrx/store';


export enum StocksActionTypes {
  NEW_STOCKS = '[Stocks] Update'
}

export class Update implements Action {
  readonly type = StocksActionTypes.NEW_STOCKS;
  constructor(public payload: any) {}
}


export type All =
  | Update;
