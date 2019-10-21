import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
