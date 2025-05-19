import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { IUser, UserService } from '../../services/user/user.service';

interface UserHeader extends IUser {
  photoURL?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private auth = inject(Auth);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  user: UserHeader | null = null;

  constructor() {
    this.userService.getLoggedUserData().subscribe((res) => {
      this.user = {
        ...res,
        photoURL: this.auth.currentUser?.photoURL ?? undefined,
      };
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
