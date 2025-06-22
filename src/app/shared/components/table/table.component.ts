import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColunm } from './types';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T = any> {
  @Input() data: T[] = [];
  @Input() columns: TableColunm<T>[] = [];
}
