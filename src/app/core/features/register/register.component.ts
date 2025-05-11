import { Component, inject } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  get email(): string {
    return this.formGroup.get('email')?.value;
  }

  get password(): string {
    return this.formGroup.get('password')?.value;
  }

  async register(): Promise<void> {
    const credentials = await this.authService.register(
      this.email,
      this.password
    );
    this.saveCredentials(credentials);
  }

  async registerWithGoogle(): Promise<void> {
    const credentials = await this.authService.loginWithGoogle();
    this.saveCredentials(credentials);
  }

  private async saveCredentials(
    credentials: UserCredential | null
  ): Promise<void> {
    if (credentials) {
      await this.userService.setUserRole('user', credentials.user.uid);
      this.router.navigateByUrl('/home');
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
