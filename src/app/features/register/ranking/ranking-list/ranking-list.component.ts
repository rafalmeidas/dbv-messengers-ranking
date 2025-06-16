import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AssignRankingToUnitService } from '../../../../shared/services/assign-ranking-to-unit/assign-ranking-to-unit.service';
import { AssignRankingToUnit } from '../../../../shared/models/assign-ranking-to-unit.model';
import { ListComponent } from '../../../../shared/components/list/list.component';

@Component({
  selector: 'app-ranking-list',
  imports: [CommonModule, ListComponent],
  templateUrl: './ranking-list.component.html',
  styleUrl: './ranking-list.component.scss',
})
export class RankingListComponent {
  private readonly _assignRankingService = inject(AssignRankingToUnitService);
  private readonly _router = inject(Router);
  private readonly _auth = inject(Auth);

  rankings: AssignRankingToUnit[] = [];

  ngOnInit() {
    this._assignRankingService.getAllAssignRankingToUnit().subscribe((data) => {
      this.rankings = data
        .filter((r) => r.uid === this._auth.currentUser?.uid)
        .filter((r) => r.active);
    });
  }

  openRanking(ranking: AssignRankingToUnit) {
    this._router.navigate([`/ranking/${ranking.id}/units`]);
  }
}
