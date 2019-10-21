import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pm-logout',
  template: '',
  styles: ['']
})

export class LogoutComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.logOut();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
