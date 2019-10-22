import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  errorMessage: string | null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.authService.signUp(payload.email, payload.password).subscribe(
      user => {
        this.router.navigate(['/']);
        this.errorMessage = null;
      },
      (e: HttpErrorResponse) => {
        this.errorMessage = e.message;
      }
    );
  }
}
