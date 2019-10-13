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
      <div class="row">
        <div class="column">
          <pm-livestocks></pm-livestocks>
        </div>
        <div class="column">
          <router-outlet></router-outlet>
        </div>
      </div>  
    
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Stocks Trade';
}