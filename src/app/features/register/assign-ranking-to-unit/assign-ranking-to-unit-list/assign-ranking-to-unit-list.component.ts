import { Component, inject } from '@angular/core';

import { AssignRankingToUnitService } from '../../../../shared/services/assign-ranking-to-unit/assign-ranking-to-unit.service';
import { AssignRankingToUnit } from '../../../../shared/models/assign-ranking-to-unit.model';
import { ListComponent } from '../../../../shared/components/list/list.component';

@Component({
  selector: 'app-assign-ranking-to-unit-list',
  imports: [ListComponent],
  templateUrl: './assign-ranking-to-unit-list.component.html',
  styleUrl: './assign-ranking-to-unit-list.component.scss',
})
export class AssignRankingToUnitListComponent {
  private readonly _assignRankingToUnitService = inject(
    AssignRankingToUnitService
  );

  assignRankingToUnit: AssignRankingToUnit[] = [];

  constructor() {
    this._assignRankingToUnitService
      .getAllAssignRankingToUnit()
      .subscribe(
        (assignRankingToUnit) =>
          (this.assignRankingToUnit = assignRankingToUnit)
      );
  }
}
