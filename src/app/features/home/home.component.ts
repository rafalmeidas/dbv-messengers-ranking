import { Component, inject } from '@angular/core';

import { AuthService } from './../../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
