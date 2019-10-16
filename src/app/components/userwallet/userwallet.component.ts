import { Component, OnInit } from '@angular/core';
import { IUserData } from 'src/app/models/userdata.interface';
import { IUserStocks } from 'src/app/models/userstocks.interface';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'pm-userwallet',
  templateUrl: './userwallet.component.html',
  styleUrls: ['./userwallet.component.css']
})
export class UserwalletComponent implements OnInit {
  public pageTitle = 'Personal E-Wallet';
  errorMessage = '';

  userStocks: IUserStocks[] = [];
  userData: IUserData[] = [];

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.userDataService.getUserData().subscribe({
      next: userData => {
        this.userData = userData;
        console.log('first user values'+JSON.stringify(this.userData));
        this.userStocks = JSON.parse(JSON.stringify(this.userData.activeStocks)),
        console.log(this.userStocks);
      },
      error: err => this.errorMessage = err
    });
  }

}
