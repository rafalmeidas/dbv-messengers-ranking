import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrailblazerService } from '../../../../shared/services/trailblazer/trailblazer.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { UnitService } from '../../../../shared/services/unit/unit.service';
import { Unit } from '../../../../shared/models/unit.model';

@Component({
  selector: 'app-trailblazer-form',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    SelectComponent,
    InputComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './trailblazer-form.component.html',
  styleUrl: './trailblazer-form.component.scss',
})
export class TrailblazerFormComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _trailblazerService = inject(TrailblazerService);
  private readonly _unitService = inject(UnitService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  form = this._fb.group({
    name: ['', Validators.required],
    unitUid: ['', Validators.required],
  });

  isEditMode = false;
  trailblazerUid: string | null = null;
  units: Unit[] = [];

  constructor() {
    this._unitService.getAllUnits().subscribe((units) => (this.units = units));

    this._route.paramMap.subscribe((params) => {
      this.trailblazerUid = params.get('id');
      this.isEditMode = !!this.trailblazerUid;

      if (this.trailblazerUid) {
        this._trailblazerService
          .getTrailblazerById(this.trailblazerUid)
          .subscribe((unit) => {
            if (unit) this.form.patchValue(unit);
          });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    if (this.isEditMode && this.trailblazerUid) {
      this._trailblazerService
        .updateTrailblazer(this.trailblazerUid, this.form.value as any)
        .subscribe();
    } else {
      this._trailblazerService
        .createTrailblazer(this.form.value as any)
        .subscribe();
    }

    this._router.navigate(['/trailblazer']);
  }
}
