import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ControlValueAccessorAbstractComponent } from '../abstracts/control-value-accessor.abstract.component';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'app-text-area',
  imports: [CommonModule, FormsModule, FormGroupComponent],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
})
export class TextAreaComponent extends ControlValueAccessorAbstractComponent<string> {
  @Input() rows: number = 4;
  @Input() cols?: number;
}
