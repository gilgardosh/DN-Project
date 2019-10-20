import * as auth from './reducers/auth.reducers';
import * as stocks from './reducers/stocks.reducers';
import { createFeatureSelector } from '@ngrx/store';


export interface AppState {
  authState: auth.IState;
  stocksState: stocks.IState;
}

export const reducers = {
  auth: auth.reducer,
  stocks: stocks.reducer
}

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectStocksState = createFeatureSelector<AppState>('stocks');

