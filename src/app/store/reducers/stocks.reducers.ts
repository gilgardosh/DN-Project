import { User } from '../../models/user';
import { StocksActionTypes, All } from '../actions/stocks.actions';
import { State } from '@ngrx/store';
import { ILiveStocks } from 'src/app/models/livestocks.interface';


export type IState = ILiveStocks[];

export const initialState: IState = [];

export function reducer(state = initialState, action: All): IState {
  switch (action.type) {
    case StocksActionTypes.NEW_STOCKS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
