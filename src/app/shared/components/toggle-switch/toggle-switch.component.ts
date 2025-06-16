import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ControlValueAccessorAbstractComponent } from '../abstracts/control-value-accessor.abstract.component';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'app-toggle-switch',
  imports: [FormsModule, FormGroupComponent],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
})
export class ToggleSwitchComponent extends ControlValueAccessorAbstractComponent<boolean> {
  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle(event: Event): void {
    this.value = (event.target as HTMLInputElement).checked;
    this.onChange(this.value);
    this.onTouched();

    this.checkedChange.emit(this.value);
  }
}
