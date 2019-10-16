import { Component, OnInit } from '@angular/core';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'pm-root',
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand">{{ pageTitle }}</a>
      <ul class="nav nav-pills">
        <li>
          <a
            class="nav-link"
            routerLinkActive="active"
            [routerLink]="['/userwallet']"
            >My Invetments</a
          >
        </li>
        <li>
          <a
            class="nav-link"
            routerLinkActive="active"
            [routerLink]="['/tradehistory']"
            >Trade History</a
          >
        </li>
        <li>
          <a
            class="nav-link"
            routerLinkActive="active"
            [routerLink]="['/buysell']"
            >Buy/Sell</a
          >
        </li>
      </ul>
    </nav>
    <div class="container">
      <div class="column left">
        <router-outlet></router-outlet>
      </div>
      <div class="column right">
        <pm-livestocks></pm-livestocks>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Stocks Trade';

  constructor(
    private userDataService: UserDataService
  ) {

  }

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    this.userDataService.getUserData()
    .subscribe(
      // res => {
      //   console.log('userloggedin: '+res.firstName+' '+res.lastName);
      // }
    );
  }
}
