import { Routes } from '@angular/router';
import * as _ from 'lodash';

import { coreRoutes } from './core/features/core.routes';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = _.concat(coreRoutes, [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard],
  },
]);
