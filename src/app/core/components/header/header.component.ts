import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private auth = inject(Auth);
  private authService = inject(AuthService);

  user: User | null = null;

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
