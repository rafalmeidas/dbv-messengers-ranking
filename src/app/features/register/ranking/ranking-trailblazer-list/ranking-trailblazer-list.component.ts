import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  TemplateRef,
  ViewChild,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { TrailblazerService } from '../../../../shared/services/trailblazer/trailblazer.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Trailblazer } from '../../../../shared/models/trailblazer.model';
import { TableColunm } from '../../../../shared/components/table/types';
import { handleRouter } from '../routes';

@Component({
  selector: 'app-ranking-trailblazer-list',
  imports: [CommonModule, ButtonComponent, TableComponent],
  templateUrl: './ranking-trailblazer-list.component.html',
  styleUrl: './ranking-trailblazer-list.component.scss',
})
export class RankingTrailblazerListComponent implements OnInit {
  private readonly _trailblazerService = inject(TrailblazerService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('attTemplate', { static: true })
  attTemplate!: TemplateRef<any>;

  trailblazers: Trailblazer[] = [];
  rankingUid: string | null = null;
  unitUid: string | null = null;

  columns: TableColunm<Trailblazer>[] = [];

  ngOnInit(): void {
    this.columns = [
      { label: 'Desbavador', key: 'name', align: 'start' },
      {
        label: 'Últ. atualização',
        key: 'lastUpdateRanking',
        align: 'center',
        template: this.attTemplate,
      },
      {
        label: 'Ações',
        key: 'name',
        align: 'end',
        template: this.actionTemplate,
      },
    ];

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
    handleRouter('assignTrailblazer', this._router, {
      rankingId: this.rankingUid,
      unitUid: this.unitUid,
      trailblazerId: trailblazer.id,
    });
  }
}
