import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return from(authService.currentUser).pipe(
    map((user) => {
      if (user) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};
