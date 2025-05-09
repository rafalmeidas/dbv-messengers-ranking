import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ErrorKey =
  | 'required'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'min'
  | 'max'
  | 'pattern'
  | 'nullValidator'
  | 'validators';

const DEFAULT_MESSAGES: Record<ErrorKey, string> = {
  required: 'Este campo é obrigatório',
  email: 'Email inválido',
  minlength: 'Deve ter no mínimo {0} caracteres',
  maxlength: 'Deve ter no máximo {0} caracteres',
  min: 'O valor mínimo permitido é {0}',
  max: 'O valor máximo permitido é {0}',
  pattern: 'Formato inválido',
  nullValidator: 'Valor inválido',
  validators: 'Valor inválido',
};

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessages: Record<ErrorKey, string> = {
    ...DEFAULT_MESSAGES,
  };

  value: string = '';
  focused: boolean = false;
  touched: boolean = false;

  get error(): string | null {
    const control = this.ngControl?.control;
    if (!control || !control.errors || !control.touched) return null;

    const firstKey = Object.keys(control.errors)[0] as ErrorKey;
    const errorData = control.errors[firstKey];
    const template = this.errorMessages[firstKey] ?? DEFAULT_MESSAGES[firstKey];

    switch (firstKey) {
      case 'minlength':
      case 'maxlength':
        return this.formatMessage(template, errorData.requiredLength);
      case 'min':
      case 'max':
        return this.formatMessage(template, errorData.min ?? errorData.max);
      default:
        return template ?? 'Valor inválido';
    }
  }

  formatMessage(template: string, ...values: (string | number)[]): string {
    return template.replace(/{(\d+)}/g, (match, index) =>
      String(values[index] ?? match)
    );
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (_value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.value = value;
    this.onChange(value);
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    this.onTouched();
    this.touched = true;
  }
}
