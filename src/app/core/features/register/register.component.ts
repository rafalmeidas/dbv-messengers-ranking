import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email = '';
  password = '';

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  async register() {
    const credentials = await this.authService.register(
      this.email,
      this.password
    );
    if (credentials) {
      await this.userService.setUserRole('user', credentials.user.uid);
      this.router.navigateByUrl('/home');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
