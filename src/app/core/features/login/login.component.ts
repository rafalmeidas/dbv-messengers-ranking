import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = 'rafalmeidas@gmail.com';
  password = '123456';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.auth
      .login(this.email, this.password)
      .then(() => this.router.navigateByUrl('/home'))
      .catch((err) => alert('Erro: ' + err.message));
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
