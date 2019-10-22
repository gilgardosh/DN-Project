import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Stocks Trade';
  errorMessage = null;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {}

  logOut(): void {
    this.authService.logOut();
  }
}
