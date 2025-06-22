import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TemplateRef,
  Component,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';

import { AssignRankingToUnitService } from '../../../../shared/services/assign-ranking-to-unit/assign-ranking-to-unit.service';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { RankingLaunchService } from '../../../../shared/services/ranking-launch/ranking-launch.service';
import { TrailblazerService } from '../../../../shared/services/trailblazer/trailblazer.service';
import { TextAreaComponent } from '../../../../shared/components/text-area/text-area.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { QuestionService } from '../../../../shared/services/question/question.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Trailblazer } from '../../../../shared/models/trailblazer.model';
import { TableColunm } from '../../../../shared/components/table/types';
import { handleRouter } from '../routes';
import {
  QuestionAnswer,
  RankingLaunch,
} from '../../../../shared/models/ranking-launch';

@Component({
  selector: 'app-ranking-form',
  imports: [
    ToggleSwitchComponent,
    TextAreaComponent,
    ButtonComponent,
    TableComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './ranking-form.component.html',
  styleUrl: './ranking-form.component.scss',
})
export class RankingFormComponent implements OnInit {
  private readonly _assignRankingToUnitService = inject(
    AssignRankingToUnitService
  );

  private readonly _trailblazerService = inject(TrailblazerService);
  private rankingLaunchService = inject(RankingLaunchService);
  private readonly _questionService = inject(QuestionService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;

  rankingUid: string | null = null;
  unitUid: string | null = null;
  trailblazerUid: string | null = null;

  columns: TableColunm<QuestionAnswer>[] = [];
  questions: QuestionAnswer[] = [];
  trailblazer!: Trailblazer;

  today: string = new Date().toISOString();
  observations: string = '';
  loading: boolean = false;

  get title(): string {
    return this.trailblazer?.name ? `${this.trailblazer.name}:` : '';
  }

  ngOnInit(): void {
    this.columns = [
      { label: 'Pergunta', key: 'text', align: 'start' },
      { label: 'Pontos', key: 'points', align: 'center' },
      {
        label: 'Ações',
        key: 'active',
        align: 'end',
        template: this.actionTemplate,
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
                tap(
                  (q) =>
                    (this.questions =
                      q.questions.map((question) => ({
                        ...question,
                        active: false,
                      })) || [])
                )
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
        }),
        take(1)
      )
      .subscribe();
  }

  save(): void {
    this.loading = true;

    const launch: RankingLaunch = {
      rankingId: this.rankingUid!,
      unitUid: this.unitUid!,
      trailblazerUid: this.trailblazerUid!,
      date: this.today,
      observations: this.observations,
      answers: this.questions,
    };

    this.rankingLaunchService
      .createLaunch(launch)
      .pipe(
        take(1),
        switchMap(() =>
          this._trailblazerService.updateTrailblazer(this.trailblazerUid!, {
            lastUpdateRanking: this.today,
          })
        ),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: () => {
          handleRouter('create', this._router, {
            rankingId: this.rankingUid!,
            unitUid: this.unitUid!,
          });
        },
        error: (err) => {
          console.error('Erro ao criar ranking ou atualizar desbravador', err);
        },
      });
  }
}
