import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  imports: [CommonModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss',
})
export class FormGroupComponent {
  @Input() label?: string;
  @Input({ alias: 'htmlId', required: true }) id?: string;
  @Input({ required: true }) focused: boolean = false;
  @Input({ required: true }) disabled: boolean = false;
  @Input({ required: true }) error: string | null = null;

  @ContentChild(NgControl, { read: ElementRef })
  controlEl!: ElementRef;

  ngAfterContentInit(): void {
    if (this.id && this.controlEl) {
      this.controlEl.nativeElement.id = this.id;
    }
  }
}
