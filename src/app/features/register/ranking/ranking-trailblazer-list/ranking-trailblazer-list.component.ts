import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrailblazerService } from '../../../../shared/services/trailblazer/trailblazer.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ListComponent } from '../../../../shared/components/list/list.component';
import { Trailblazer } from '../../../../shared/models/trailblazer.model';

@Component({
  selector: 'app-ranking-trailblazer-list',
  imports: [CommonModule, ListComponent, ButtonComponent],
  templateUrl: './ranking-trailblazer-list.component.html',
  styleUrl: './ranking-trailblazer-list.component.scss',
})
export class RankingTrailblazerListComponent {
  private readonly _trailblazerService = inject(TrailblazerService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  trailblazers: Trailblazer[] = [];
  rankingUid: string | null = null;
  unitUid: string | null = null;

  constructor() {
    this._route.paramMap.subscribe((params) => {
      this.rankingUid = params.get('id');
      this.unitUid = params.get('unitUid');

      if (this.unitUid) {
        this._trailblazerService
          .getTrailblazersByUnit(this.unitUid)
          .subscribe((trailblazers) => {
            this.trailblazers = trailblazers;
          });
      }
    });
  }

  onAction(trailblazer: Trailblazer) {
    this._router.navigate([
      `/ranking/${this.rankingUid}/unit/${this.unitUid}/create/trailblazer/${trailblazer.id}`,
    ]);
  }
}
