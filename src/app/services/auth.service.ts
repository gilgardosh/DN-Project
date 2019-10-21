import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/User';
import { UserDataService } from './user-data.service';
import { IUserData } from '../models/userdata.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  isAuthorized: Observable<boolean>;
  constructor(
    private http: HttpService,
    private userDataService: UserDataService
  ) {
    this.initIsAuthorized();
  }

  initIsAuthorized() {
    this.isAuthorized = this.userDataService.user$.pipe(
      map(user => !!user /*  && !!this.token*/)
    );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<IUserData> {
    return this.http.onLogin({ email, password }).pipe(
      map(res => res.body),
      tap(user => {
        this.userDataService.setUser(user);
      })
    );
  }

  signUp(email: string, password: string): Observable<IUserData> {
    return this.http.onSignUp({ email, password }).pipe(
      map(res => res.body),
      tap(user => {
        this.userDataService.setUser(user);
      })
    );
  }

  logOut() {
    this.userDataService.cleanUserData();
    this.token = '';
  }
}
