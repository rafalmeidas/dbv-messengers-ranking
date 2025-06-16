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
    { label: 'Unidades', path: '/unit', icon: 'diversity-3' },
    { label: 'Desbravadores', path: '/trailblazer', icon: 'groups-2' },
    { label: 'Peguntas', path: '/question', icon: 'rate-review' },
    {
      label: 'Vincular Ranking',
      path: '/assign-ranking-to-unit',
      icon: 'tenancy',
    },
    {
      label: 'Rankings',
      path: '/ranking',
      icon: 'star',
    },
  ];
}
