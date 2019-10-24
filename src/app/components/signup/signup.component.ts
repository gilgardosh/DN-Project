import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

export interface ISignUp {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
@Component({
  selector: 'pm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage: string | null;
  signupFormGroup: FormGroup;
  user: ISignUp = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }

  get isFormValid() {
    return this.signupFormGroup.valid;
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password,
      first_name: this.user.first_name,
      last_name: this.user.last_name
    };
    this.authService
      .signUp(
        payload.email,
        payload.password,
        payload.first_name,
        payload.last_name
      )
      .subscribe(
        user => {
          this.errorMessage = null;

          this.authService.logIn(payload.email, payload.password).subscribe(
            user => {
              this.errorMessage = null;

              this.authService.initUser().subscribe(
                user => {
                  this.errorMessage = null;
                  this.router.navigate(['']);
                },
                (e: HttpErrorResponse) => {
                  this.errorMessage = e.message;
                }
              );

              this.router.navigate(['']);
            },
            (e: HttpErrorResponse) => {
              this.errorMessage = e.message;
            }
          );

          this.router.navigate(['']);
        },
        (e: HttpErrorResponse) => {
          this.errorMessage = e.message;
        }
      );
  }
}
