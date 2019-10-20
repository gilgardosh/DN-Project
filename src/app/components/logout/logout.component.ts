import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Router } from '@angular/router';
import { LogOut } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'pm-logout',
  template: '',
  styles: ['']
})

export class LogoutComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.logOut();
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }
}
