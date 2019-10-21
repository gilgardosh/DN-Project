import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  Update, StocksActionTypes
} from '../actions/stocks.actions';

@Injectable()
export class StocksEffects {
  constructor(
    private actions: Actions,
  ) {}


  @Effect()
  Update: Observable<any> = this.actions.pipe(
    ofType(StocksActionTypes.NEW_STOCKS),
    map((action: Update) => action.payload),
  );
}
