import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUserData } from '../models/userdata.interface';
import { HttpService } from './http.service';
import { UserDataService } from './user-data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string;
  isAuthorized: Observable<boolean>;
  isNotAuthorized: Observable<boolean>;

  constructor(
    private http: HttpService,
    private userDataService: UserDataService,
    private router: Router
  ) {
    this.initIsAuthorized();
  }

  get token() {
    return this._token;
  }

  set token(tkn: string) {
    this._token = tkn;
    if (tkn) {
      localStorage.setItem('token', tkn);
    } else {
      localStorage.removeItem('token');
    }
  }

  initIsAuthorized() {
    this.isAuthorized = this.userDataService.user$.pipe(
      map(user => !!user /*  && !!this.token*/)
    );

    this.isNotAuthorized = this.userDataService.user$.pipe(
      map(user => !user /*  && !!this.token*/)
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
    this.router.navigate(['/userwallet']);
  }
}
