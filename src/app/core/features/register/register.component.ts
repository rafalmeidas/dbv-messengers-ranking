import { Component, inject } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email = '';
  password = '';

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

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
