import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get email(): string {
    return this.formGroup.get('email')?.value;
  }

  get password(): string {
    return this.formGroup.get('password')?.value;
  }

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.handlePromise(this.authService.login(this.email, this.password));
  }

  loginWithGoogle(): void {
    this.handlePromise(this.authService.loginWithGoogle());
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  private handlePromise(promise: Promise<any>) {
    promise
      .then(() => this.router.navigateByUrl('/home'))
      .catch((err) => alert('Erro: ' + err.message));
  }
}
