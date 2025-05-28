import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { QuestionService } from '../../../../shared/services/question/question.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { Question } from '../../../../shared/models/question.model';

@Component({
  selector: 'app-question-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, ButtonComponent],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
})
export class QuestionFormComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _questionService = inject(QuestionService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  form = this._fb.group({
    name: ['', Validators.required],
  });

  newQuestionControl = new FormControl('', Validators.required);
  newPointsControl = new FormControl(0, [
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

  addQuestion(): void {
    if (this.newQuestionControl.valid && this.newPointsControl.valid) {
      const newQuestion: Question = {
        text: this.newQuestionControl.value ?? '',
        points: this.newPointsControl.value ?? 0,
      };
      this.questions.push(newQuestion);
      this.newQuestionControl.reset();
      this.newPointsControl.setValue(0);
    }
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const data = {
        name: this.form.value.name ?? '',
        questions: this.questions,
      };
      this._questionService.createQuestionnaire(data).then(() => {
        this.form.reset();
        this.questions = [];
      });
    }
  }
}
