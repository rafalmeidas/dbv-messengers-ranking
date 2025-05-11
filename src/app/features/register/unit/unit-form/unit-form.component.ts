import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitService } from '../../../../shared/services/unit/unit.service';
import { UserService } from '../../../../core/services/user/user.service';
@Component({
  selector: 'app-unit-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.scss',
})
export class UnitFormComponent {
  private fb = inject(FormBuilder);
  private unitService = inject(UnitService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    counselors: [[]],
  });

  isEditMode = false;
  unitId: string | null = null;
  counselors: any[] = [];

  constructor() {
    this.userService.getAllUsers().subscribe((users) => {
      this.counselors = users;
    });

    this.route.paramMap.subscribe((params) => {
      this.unitId = params.get('id');
      this.isEditMode = !!this.unitId;

      if (this.unitId) {
        this.unitService.getUnitById(this.unitId).subscribe((unit) => {
          if (unit) this.form.patchValue(unit);
        });
      }
    });
  }

  async submit() {
    if (this.form.invalid) return;

    if (this.isEditMode && this.unitId) {
      await this.unitService.updateUnit(this.unitId, this.form.value as any);
    } else {
      await this.unitService.createUnit(this.form.value as any);
    }

    this.router.navigate(['/unit']);
  }
}
