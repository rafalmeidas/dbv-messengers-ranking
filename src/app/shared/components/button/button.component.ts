import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonIcon, ButtonVariant } from './types';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled = false;
  @Input() icon?: ButtonIcon;
  @Input() label?: string;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  isOnlyIcon: boolean = false;
  showLabel: boolean = false;
  showIcon: boolean = false;
  iconStyle: Record<string, string> = {};

  ngOnInit(): void {
    this.isOnlyIcon = this.variant === 'icon';
    this.showLabel = !this.isOnlyIcon && !!this.label;
    this.showIcon = !!this.icon || !this.isOnlyIcon;

    this.iconStyle = {
      mask: `var(--icon-${this.icon}-24dp)`,
      '-webkit-mask': `var(--icon-${this.icon}-24dp)`,
      'mask-size': 'contain',
      '-webkit-mask-size': 'contain',
      'mask-position': 'center',
      '-webkit-mask-position': 'center',
    };
  }
}
