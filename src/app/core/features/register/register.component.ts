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
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  get name(): string {
    return this.formGroup.get('name')?.value;
  }

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
    this.saveCredentials(credentials, this.name);
  }

  async registerWithGoogle(): Promise<void> {
    const credentials = await this.authService.loginWithGoogle();
    this.saveCredentials(credentials, credentials?.user.displayName ?? '');
  }

  private async saveCredentials(
    credentials: UserCredential | null,
    name: string
  ): Promise<void> {
    if (credentials) {
      await this.userService.setUserRole('user', credentials.user.uid, name);
      this.router.navigateByUrl('/home');
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
