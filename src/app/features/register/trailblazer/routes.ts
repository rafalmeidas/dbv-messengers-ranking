import { Routes } from '@angular/router';

import { TrailblazerListComponent } from './trailblazer-list/trailblazer-list.component';
import { TrailblazerFormComponent } from './trailblazer-form/trailblazer-form.component';

export const ROUTES: Routes = [
  { path: '', component: TrailblazerListComponent },
  { path: 'create', component: TrailblazerFormComponent },
  { path: 'edit/:id', component: TrailblazerFormComponent },
];
