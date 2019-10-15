import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { IUserData } from 'src/app/models/userdata.interface';
import { IUserStocks } from 'src/app/models/userstocks.interface';

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
        console.log(JSON.stringify(this.userData));
        this.userStocks = (this.userData[0]).activeStocks;
        console.log(this.userStocks);
      },
      error: err => this.errorMessage = err
    });
  }

}
