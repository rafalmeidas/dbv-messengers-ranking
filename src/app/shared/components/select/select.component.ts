import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ControlValueAccessorAbstractComponent } from '../abstracts/control-value-accessor.abstract.component';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'app-select',
  imports: [CommonModule, FormsModule, FormGroupComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent<T> extends ControlValueAccessorAbstractComponent<
  T[keyof T]
> {
  @Input() options: T[] = [];

  @Input({ required: true }) labelKey!: keyof T;
  @Input({ required: true }) valueKey!: keyof T;

  onSelectChange(event: Event) {
    console.log(event);
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value;

    this.value = this.castValue(selectedValue);
    this.onChange(this.value);
    this.onTouched();
  }

  private castValue(val: string): T[keyof T] {
    return val as T[keyof T];
  }
}
