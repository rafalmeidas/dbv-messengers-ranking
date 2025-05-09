import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorAbstractComponent } from '../abstracts/control-value-accessor.abstract.component';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent extends ControlValueAccessorAbstractComponent {
  @Input() type: 'text' | 'password' | 'email' = 'text';
}
