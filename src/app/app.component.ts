import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LiveStocksService } from './services/live-stock-data.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Stocks Trade';
  // getState: Observable<any>;
  // isAuthenticated: false;
  // user = null;
  errorMessage = null;

  constructor(
    private liveStocksService: LiveStocksService,
    // private store: Store<AppState>,
    public authService: AuthService
  ) {}

  ngOnInit() { 
  }


  logOut(): void {
    this.authService.logOut();
  }
}
