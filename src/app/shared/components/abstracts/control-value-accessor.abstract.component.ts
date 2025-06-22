import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

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
  template: '',
  imports: [],
})
export abstract class ControlValueAccessorAbstractComponent<T>
  implements ControlValueAccessor
{
  @Input() label?: string;
  @Input() name?: string;
  @Input({ alias: 'htmlId', required: true }) id?: string;
  @Input() placeholder?: string;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessages: Record<ErrorKey, string> = { ...DEFAULT_MESSAGES };

  value!: T;

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

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  formatMessage(template: string, ...values: (string | number)[]): string {
    return template.replace(/{(\d+)}/g, (match, index) =>
      String(values[index] ?? match)
    );
  }

  onChange = (_value: T) => {};

  onTouched = () => {};

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
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
    const value = input.value as unknown as T;
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
