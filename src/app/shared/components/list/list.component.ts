import { Component, Input, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent<T extends Record<string, any>> {
  @Input() title: string = 'Title';
  @Input() btnNewLabel: string = 'Novo';
  @Input() btnNewUrl: string = '';
  @Input() listArray: T[] = [];
  @Input() labelKey: keyof T = 'name' as keyof T;
  @Input() labelId: keyof T = 'id' as keyof T;
  @Input() btnEditUrl: string = '';
  @Input() actionHeaderTemplate?: TemplateRef<any>;
  @Input() actionListTemplate?: TemplateRef<any>;
}
