import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-group',
  imports: [CommonModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss',
})
export class FormGroupComponent {
  @Input() label?: string;
  @Input({ required: true }) focused: boolean = false;
  @Input({ required: true }) disabled: boolean = false;
  @Input({ required: true }) error: string | null = null;
}
