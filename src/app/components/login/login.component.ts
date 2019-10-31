import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

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
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.authService.logIn(payload.email, payload.password).subscribe(
      user => {
        this.errorMessage = null;
        const msg = 'Wellcome, '+user.first_name+' '+user.last_name+'!';
        this.openSnackBar(msg, null);
        this.router.navigate(['']);
      },
      (e: HttpErrorResponse) => {
        const msg = 'Invalid mail or password'
        this.openSnackBar(msg, null);
        this.errorMessage = e.message;
      }
    );
  }

  openSnackBar(msg: string, empty: string) {
    this._snackBar.open(msg, empty, {
      duration: 2000
    });
  }
}
