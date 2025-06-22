import { TemplateRef } from '@angular/core';

export interface TableColunm<T> {
  label: string;
  key: keyof T;
  align?: 'center' | 'start' | 'end';
  template?: TemplateRef<any>;
}
