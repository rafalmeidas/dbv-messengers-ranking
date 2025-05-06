import { CanActivateFn, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { inject } from '@angular/core';
import { from, of } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  return from(authService.currentUser).pipe(
    switchMap((user) => {
      if (!user) {
        router.navigate(['/login']);
        return of(false);
      }
      return userService.getUserRole$();
    }),
    map((role) => {
      if (role === 'admin') return true;
      router.navigate(['/unauthorized']);
      return false;
    })
  );
};
