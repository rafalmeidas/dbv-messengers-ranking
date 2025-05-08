import { Component, inject } from '@angular/core';

import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from './../../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
