import { Router, Routes } from '@angular/router';

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
type RouteAction = 'list' | 'create' | 'assignTrailblazer';

interface HandleRouterParams {
  rankingId?: string | null;
  unitUid?: string | null;
  trailblazerId?: string;
}

export function handleRouter(
  action: RouteAction,
  router: Router,
  { rankingId, unitUid, trailblazerId }: HandleRouterParams
) {
  switch (action) {
    case 'list':
      return router.navigate(['/ranking']);

    case 'create':
      return router.navigate([
        '/ranking',
        rankingId,
        'unit',
        unitUid,
        'create',
      ]);

    case 'assignTrailblazer':
      if (!trailblazerId) {
        throw new Error(
          `'trailblazerId' é obrigatório para a ação '${action}'`
        );
      }
      return router.navigate([
        '/ranking',
        rankingId,
        'unit',
        unitUid,
        'create',
        'trailblazer',
        trailblazerId,
      ]);

    default:
      throw new Error(`Ação desconhecida: ${action}`);
  }
}
