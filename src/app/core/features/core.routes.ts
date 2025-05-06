import { Routes } from '@angular/router';
import { loginRedirectGuard } from '../guards/login.guard';

export const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
    canActivate: [loginRedirectGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
    canActivate: [loginRedirectGuard],
  },
];
