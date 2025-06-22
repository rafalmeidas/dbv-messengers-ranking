import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

import { AssignRankingToUnitService } from '../../../../shared/services/assign-ranking-to-unit/assign-ranking-to-unit.service';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { TrailblazerService } from '../../../../shared/services/trailblazer/trailblazer.service';
import { QuestionService } from '../../../../shared/services/question/question.service';
import { Trailblazer } from '../../../../shared/models/trailblazer.model';
import {
  Questionnaire,
  Question,
} from '../../../../shared/models/question.model';

@Component({
  selector: 'app-ranking-form',
  imports: [CommonModule, ToggleSwitchComponent],
  templateUrl: './ranking-form.component.html',
  styleUrl: './ranking-form.component.scss',
})
export class RankingFormComponent {
  private readonly _assignRankingToUnitService = inject(
    AssignRankingToUnitService
  );

  private readonly _trailblazerService = inject(TrailblazerService);
  private readonly _questionService = inject(QuestionService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  questionnaire!: Questionnaire;
  trailblazer!: Trailblazer;

  rankingUid: string | null = null;
  unitUid: string | null = null;
  trailblazerUid: string | null = null;

  get title(): string {
    return `${this.trailblazer?.name ?? ''}`;
  }

  get questions(): Question[] {
    return this.questionnaire?.questions ?? [];
  }

  constructor() {
    this._route.paramMap.subscribe((params) => {
      this.rankingUid = params.get('id');
      this.unitUid = params.get('unitUid');
      this.trailblazerUid = params.get('trailblazerUid');

      if (this.rankingUid) {
        this._assignRankingToUnitService
          .getAssignRankingToUnitById(this.rankingUid)
          .pipe(
            switchMap(({ questionnaireId }) =>
              this._questionService.getQuestionnaireById(questionnaireId)
            )
          )
          .subscribe((questionnaire) => {
            this.questionnaire = questionnaire;
          });
      }

      if (this.trailblazerUid) {
        this._trailblazerService
          .getTrailblazerById(this.trailblazerUid)
          .subscribe((trailblazer) => {
            this.trailblazer = trailblazer;
          });
      }
    });
  }
}
