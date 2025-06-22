import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from '../../../../shared/components/list/list.component';
import { UnitService } from '../../../../shared/services/unit/unit.service';
import { Unit } from '../../../../shared/models/unit.model';

@Component({
  selector: 'app-unit-list',
  imports: [CommonModule, ListComponent],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.scss',
})
export class UnitListComponent {
  private readonly _unitService = inject(UnitService);
  units: Unit[] = [];

  constructor() {
    this._unitService.getAllUnits().subscribe((units) => (this.units = units));
  }
}
