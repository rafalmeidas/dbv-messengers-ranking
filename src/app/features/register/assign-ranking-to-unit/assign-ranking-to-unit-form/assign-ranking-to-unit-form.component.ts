import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { AssignRankingToUnitService } from '../../../../shared/services/assign-ranking-to-unit/assign-ranking-to-unit.service';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { QuestionService } from '../../../../shared/services/question/question.service';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { UnitService } from '../../../../shared/services/unit/unit.service';
import { Questionnaire } from '../../../../shared/models/question.model';
import { Unit } from '../../../../shared/models/unit.model';

@Component({
  selector: 'app-assign-ranking-to-unit-form',
  imports: [
    ToggleSwitchComponent,
    ReactiveFormsModule,
    ButtonComponent,
    SelectComponent,
    InputComponent,
  ],
  templateUrl: './assign-ranking-to-unit-form.component.html',
  styleUrl: './assign-ranking-to-unit-form.component.scss',
})
export class AssignRankingToUnitFormComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _unitService = inject(UnitService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _auth = inject(Auth);
  private readonly _assignRankingToUnitService = inject(
    AssignRankingToUnitService
  );
  private readonly _questionService = inject(QuestionService);

  form = this._fb.group({
    name: ['', Validators.required],
    unitUid: ['', Validators.required],
    questionnaireId: ['', Validators.required],
    year: [new Date().getFullYear(), Validators.required],
    active: [false],
  });

  isEditMode = false;
  assignRankingTounitUid: string | null = null;
  units: Unit[] = [];
  questionnaires: Questionnaire[] = [];
  years: { name: number; value: number }[] = [];

  constructor() {
    this._generateYears();
    if (this.years.length === 1) {
    }

    this._unitService.getAllUnits().subscribe((units) => (this.units = units));
    this._questionService
      .getAllQuestionnaires()
      .subscribe((questionnaires) => (this.questionnaires = questionnaires));

    this._route.paramMap.subscribe((params) => {
      this.assignRankingTounitUid = params.get('id');
      this.isEditMode = !!this.assignRankingTounitUid;

      if (this.assignRankingTounitUid) {
        this._assignRankingToUnitService
          .getAssignRankingToUnitById(this.assignRankingTounitUid)
          .subscribe((assignRankingToUnit) => {
            if (assignRankingToUnit) this.form.patchValue(assignRankingToUnit);
          });
      }
    });
  }

  async submit() {
    if (this.form.invalid) return;

    if (this.isEditMode && this.assignRankingTounitUid) {
      await this._assignRankingToUnitService.updateAssignRankingToUnit(
        this.assignRankingTounitUid,
        this.form.value as any
      );
    } else {
      await this._assignRankingToUnitService.createAssignRankingToUnit({
        ...(this.form.value as any),
        uid: this._auth.currentUser?.uid,
      });
    }

    this._router.navigate(['/assign-ranking-to-unit']);
  }

  private _generateYears(): void {
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 2;

    this.years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
      const year = startYear + i;
      return { name: year, value: year };
    });
  }
}
