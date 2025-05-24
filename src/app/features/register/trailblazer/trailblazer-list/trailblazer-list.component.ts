import { Component, inject } from '@angular/core';

import { TrailblazerService } from '../../../../shared/services/trailblazer/trailblazer.service';
import { ListComponent } from '../../../../shared/components/list/list.component';
import { Trailblazer } from '../../../../shared/models/trailblazer';

@Component({
  selector: 'app-trailblazer-list',
  imports: [ListComponent],
  templateUrl: './trailblazer-list.component.html',
  styleUrl: './trailblazer-list.component.scss',
})
export class TrailblazerListComponent {
  private readonly _trailblazerService = inject(TrailblazerService);

  trailblazers: Trailblazer[] = [];

  constructor() {
    this._trailblazerService
      .getAllTrailblazers()
      .subscribe((trailblazers) => (this.trailblazers = trailblazers));
  }
}
