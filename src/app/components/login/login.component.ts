import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { LogIn } from '../../store/actions/auth.actions';
import { AppState, selectAuthState } from '../../store/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string | null;
  user = {
    email: '',
    password: ''
  };
  constructor(
    // private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
    // this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    // this.getState.subscribe((state) => {
    //   this.errorMessage = state.errorMessage;
    // });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    // this.store.dispatch(new LogIn(payload));
    this.authService.logIn(payload.email, payload.password).subscribe(
      user => {
        this.errorMessage = null;
        this.router.navigate(['/']);
      },
      (e: HttpErrorResponse) => {
        this.errorMessage = e.message;
      }
    );
  }
}

// constructor(private fb: FormBuilder) {}

// onSubmit() void {
//     const payload = {
//       email: this.user.email,
//       password: this.user.password
//     };
//     this.store.dispatch(new LogIn(payload));
//   }
// }
