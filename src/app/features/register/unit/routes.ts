import { Routes } from '@angular/router';

import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitFormComponent } from './unit-form/unit-form.component';

export const UNIT_ROUTES: Routes = [
  { path: '', component: UnitListComponent },
  { path: 'create', component: UnitFormComponent },
  { path: 'edit/:id', component: UnitFormComponent },
];
