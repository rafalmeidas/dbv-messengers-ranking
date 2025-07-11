import { Routes } from '@angular/router';
import * as _ from 'lodash';

import { coreRoutes } from './core/features/core.routes';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = _.concat(coreRoutes, [
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./core/features/unauthorized/unauthorized.component').then(
        (c) => c.UnauthorizedComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'unit',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./features/register/unit/routes').then((m) => m.ROUTES),
  },
  {
    path: 'trailblazer',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./features/register/trailblazer/routes').then((m) => m.ROUTES),
  },
  {
    path: 'question',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./features/register/question/routes').then((m) => m.ROUTES),
  },
  {
    path: 'assign-ranking-to-unit',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./features/register/assign-ranking-to-unit/routes').then(
        (m) => m.ROUTES
      ),
  },
  {
    path: 'ranking',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/register/ranking/routes').then((m) => m.ROUTES),
  },
]);
