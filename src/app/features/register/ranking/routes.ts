import { Routes } from '@angular/router';

import { RankingTrailblazerListComponent } from './ranking-trailblazer-list/ranking-trailblazer-list.component';
import { RankingListComponent } from './ranking-list/ranking-list.component';
import { RankingFormComponent } from './ranking-form/ranking-form.component';

export const ROUTES: Routes = [
  { path: '', component: RankingListComponent },
  {
    path: ':id/unit/:unitUid/create',
    component: RankingTrailblazerListComponent,
  },
  {
    path: ':id/unit/:unitUid/create/trailblazer/:trailblazerUid',
    component: RankingFormComponent,
  },
];
