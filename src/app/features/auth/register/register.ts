import { AfterViewInit, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  rePassword: string = '';

  usernameError: boolean = false;
  emailError: boolean = false;
  phoneError: boolean = false;
  passwordError: boolean = false;
  rePasswordError: boolean = false;

  usernameErrorMessage: string = '';
  emailErrorMessage: string = '';
  phoneErrorMessage: string = '';
  passwordErrorMessage: string = '';
  rePasswordErrorMessage: string = '';

  validateUsername(): void {

    if (!this.email) {
      this.usernameError = true;
      this.usernameErrorMessage = 'Username is required!';
    } else {
      this.usernameError = false;
      this.usernameErrorMessage = '';
    }
  }

  validateEmail(): void {
    if (!this.email) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is required!';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is not valid!';

    } else {
      this.emailError = false;
      this.emailErrorMessage = '';
    }
  }

  validatePhone(): void {
    if (!this.email) {
      this.phoneError = true;
      this.phoneErrorMessage = 'Phone is required!';
    } else {
      this.phoneError = false;
      this.phoneErrorMessage = '';
    }
  }
  validatePassword(): void {
    if (!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password is required!';
    }
    else if (this.password.length < 4) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 4 characters!';
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }

    if (this.rePassword) {
      this.validateRePassword();
    }

  }
  validateRePassword(): void {
    if (!this.rePassword) {
      this.rePasswordError = true;
      this.rePasswordErrorMessage = 'Repeaset Password is required!';
    }
    else if (this.password !== this.rePassword) {
      this.rePasswordError = true;
      this.rePasswordErrorMessage = 'Repeat password does not match password!';
    } else {
      this.rePasswordError = false;
      this.rePasswordErrorMessage = '';
    }


  }

  isFormValid(): boolean {

    // return  Boolean(this.username) &&
    //   Boolean(this.email) &&
    //   Boolean(this.phone) &&
    //   Boolean(this.password) &&
    //   Boolean(this.rePassword) &&
    //   !this.usernameError &&
    //   !this.emailError &&
    //   !this.phoneError &&
    //   !this.passwordError &&
    //   !this.rePasswordError;

    return true;
  }

  onSubmit(): void {
    // this.validateUsername();
    // this.validateEmail();
    // this.validatePhone();
    // this.validatePassword();
    // this.validateRePassword;

    if(this.isFormValid()) {
      const response = this.authService.register(
        this.username,
        this.email,
        this.phone,
        this.password,
        this.rePassword);

        if(response === true){
        this.router.navigate(['/home']);
        }
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // const emailRegex = /^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/;
    return emailRegex.test(email);
  }
}
