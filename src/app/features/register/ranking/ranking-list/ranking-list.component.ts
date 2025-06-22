import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AssignRankingToUnitService } from '../../../../shared/services/assign-ranking-to-unit/assign-ranking-to-unit.service';
import { AssignRankingToUnit } from '../../../../shared/models/assign-ranking-to-unit.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ListComponent } from '../../../../shared/components/list/list.component';

@Component({
  selector: 'app-ranking-list',
  imports: [CommonModule, ListComponent, ButtonComponent],
  templateUrl: './ranking-list.component.html',
  styleUrl: './ranking-list.component.scss',
})
export class RankingListComponent {
  private readonly _assignRankingService = inject(AssignRankingToUnitService);
  private readonly _router = inject(Router);

  rankings: AssignRankingToUnit[] = [];

  ngOnInit() {
    this._assignRankingService
      .getAssignRankingToUnitByCurrentUserAndActive()
      .subscribe((rankings) => {
        this.rankings = rankings;
      });
  }

  onAction(ranking: AssignRankingToUnit) {
    this._router.navigate([
      `/ranking/${ranking.id}/unit/${ranking.unitUid}/create`,
    ]);
  }
}
