import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { QuestionService } from '../../../../shared/services/question/question.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColunm } from '../../../../shared/components/table/types';
import { Question } from '../../../../shared/models/question.model';

@Component({
  selector: 'app-question-form',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    TableComponent,
    CommonModule,
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
})
export class QuestionFormComponent implements AfterViewInit {
  private readonly _questionService = inject(QuestionService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);

  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

  columns: TableColunm<Question>[] = [];
  form = this._fb.group({
    name: ['', Validators.required],
  });

  newQuestionControl = new FormControl('', Validators.required);
  newPointsControl = new FormControl(100, [
    Validators.required,
    Validators.min(0),
  ]);
  isEditMode = false;
  questionnaireId: string | null = null;
  questions: Question[] = [];

  constructor() {
    this._route.paramMap.subscribe((params) => {
      this.questionnaireId = params.get('id');
      this.isEditMode = !!this.questionnaireId;

      if (this.questionnaireId) {
        this._questionService
          .getQuestionnaireById(this.questionnaireId)
          .subscribe((questionnaire) => {
            if (questionnaire) {
              this.form.get('name')?.patchValue(questionnaire.name);
              this.questions = questionnaire.questions;
            }
          });
      }
    });
  }

  ngAfterViewInit(): void {
    this.columns = [
      { label: 'Pergunta', key: 'text', align: 'start' },
      { label: 'Pontos', key: 'points' },
      {
        label: 'Ações',
        key: 'points',
        template: this.actionsTemplate,
        align: 'end',
      },
    ];
  }

  addQuestion(): void {
    if (this.newQuestionControl.valid && this.newPointsControl.valid) {
      const newQuestion: Question = {
        text: this.newQuestionControl.value ?? '',
        points: this.newPointsControl.value ?? 0,
      };
      this.questions.push(newQuestion);
      this.newQuestionControl.reset();
      this.newPointsControl.setValue(100);
    }
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = {
      name: this.form.value.name ?? '',
      questions: this.questions,
    };

    if (this.isEditMode && this.questionnaireId) {
      this._questionService.updateQuestionnaire(this.questionnaireId, data);
    } else {
      this._questionService.createQuestionnaire(data);
    }

    this._router.navigate(['/question']);
  }
}
