import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/userwallet']">My Invetments</a></li>
          <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/tradehistory']">Trade History</a></li>
          <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/buysell']">Buy/Sell</a></li>
        </ul>
    </nav>
    <div class='container'>
        <div class="column left">
          <pm-livestocks></pm-livestocks>
        </div>
        <div class="column right">
          <router-outlet></router-outlet>
        </div>

    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Stocks Trade';
}
