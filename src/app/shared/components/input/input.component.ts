import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ControlValueAccessorAbstractComponent } from '../abstracts/control-value-accessor.abstract.component';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule, FormGroupComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent extends ControlValueAccessorAbstractComponent<string> {
  @Input() type: 'text' | 'password' | 'email' = 'text';
}
