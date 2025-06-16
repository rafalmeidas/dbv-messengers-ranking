import { Routes } from '@angular/router';

import { AssignRankingToUnitListComponent } from './assign-ranking-to-unit-list/assign-ranking-to-unit-list.component';
import { AssignRankingToUnitFormComponent } from './assign-ranking-to-unit-form/assign-ranking-to-unit-form.component';

export const ROUTES: Routes = [
  { path: '', component: AssignRankingToUnitListComponent },
  { path: 'create', component: AssignRankingToUnitFormComponent },
  { path: 'edit/:id', component: AssignRankingToUnitFormComponent },
];
