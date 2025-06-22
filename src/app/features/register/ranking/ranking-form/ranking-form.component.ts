import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, tap } from 'rxjs';
import {
  TemplateRef,
  Component,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';

import { AssignRankingToUnitService } from '../../../../shared/services/assign-ranking-to-unit/assign-ranking-to-unit.service';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { TrailblazerService } from '../../../../shared/services/trailblazer/trailblazer.service';
import { TextAreaComponent } from '../../../../shared/components/text-area/text-area.component';
import { QuestionService } from '../../../../shared/services/question/question.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Trailblazer } from '../../../../shared/models/trailblazer.model';
import { TableColunm } from '../../../../shared/components/table/types';
import { Question } from '../../../../shared/models/question.model';

@Component({
  selector: 'app-ranking-form',
  imports: [
    CommonModule,
    ToggleSwitchComponent,
    TableComponent,
    TextAreaComponent,
  ],
  templateUrl: './ranking-form.component.html',
  styleUrl: './ranking-form.component.scss',
})
export class RankingFormComponent implements OnInit {
  private readonly _assignRankingToUnitService = inject(
    AssignRankingToUnitService
  );

  private readonly _trailblazerService = inject(TrailblazerService);
  private readonly _questionService = inject(QuestionService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;

  questions: Question[] = [];
  trailblazer!: Trailblazer;

  rankingUid: string | null = null;
  unitUid: string | null = null;
  trailblazerUid: string | null = null;

  columns: TableColunm<Question>[] = [];

  get title(): string {
    return this.trailblazer?.name ? `${this.trailblazer.name}:` : '';
  }
  constructor() {}

  ngOnInit(): void {
    this.columns = [
      { label: 'Pergunta', key: 'text', align: 'start' },
      { label: 'Pontos', key: 'points', align: 'center' },
      {
        label: 'Ações',
        key: 'points',
        align: 'end',
        template: this.actionTemplate,
        style: { display: 'flex', justifyContent: 'flex-end' },
      },
    ];

    this._route.paramMap
      .pipe(
        tap((params) => {
          this.rankingUid = params.get('id');
          this.unitUid = params.get('unitUid');
          this.trailblazerUid = params.get('trailblazerUid');
        }),
        switchMap(() => {
          if (this.rankingUid) {
            return this._assignRankingToUnitService
              .getAssignRankingToUnitById(this.rankingUid)
              .pipe(
                switchMap(({ questionnaireId }) =>
                  this._questionService.getQuestionnaireById(questionnaireId)
                ),
                tap((q) => (this.questions = q.questions || []))
              );
          } else {
            this.questions = [];
            return [];
          }
        }),
        tap(() => {
          if (this.trailblazerUid) {
            this._trailblazerService
              .getTrailblazerById(this.trailblazerUid)
              .subscribe((t) => (this.trailblazer = t));
          }
        })
      )
      .subscribe();
  }
}
