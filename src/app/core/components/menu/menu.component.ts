import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  links: { label: string; icon?: string; path: string }[] = [
    { label: 'Home', path: '/home', icon: 'home' },
    { label: 'Units', path: '/unit', icon: 'diversity-3' },
  ];
}
