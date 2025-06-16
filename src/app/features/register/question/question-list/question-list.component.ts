import { Component, inject } from '@angular/core';

import { QuestionService } from '../../../../shared/services/question/question.service';
import { ListComponent } from '../../../../shared/components/list/list.component';
import { Questionnaire } from '../../../../shared/models/question.model';

@Component({
  selector: 'app-question-list',
  imports: [ListComponent],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent {
  private readonly _questionService = inject(QuestionService);

  questionnaires: Questionnaire[] = [];

  constructor() {
    this._questionService
      .getAllQuestionnaires()
      .subscribe((questionnaires) => (this.questionnaires = questionnaires));
  }
}
