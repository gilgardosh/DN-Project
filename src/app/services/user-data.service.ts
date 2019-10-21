import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from '../models/userdata.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user: IUserData;
  user$ = new BehaviorSubject<IUserData>(this.user);

  constructor() {}

  public cleanUserData() {
    this.user = null;
    this.userHasChanged();
  }

  userHasChanged() {
    this.user$.next(this.user);
  }

  public setUser(user: IUserData) {
    this.user = user;
    this.userHasChanged();
  }

  public getUserId() {
    if (this.user) {
      return this.user.user_id;
    }
    return null;
  }
}
