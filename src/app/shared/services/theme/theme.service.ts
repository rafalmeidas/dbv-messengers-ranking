import { Injectable } from '@angular/core';

import { Theme } from './types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  initTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    this.setTheme(savedTheme || Theme.LIGHT);
  }

  setTheme(theme: Theme) {
    localStorage.setItem('theme', theme);

    const html = document.documentElement;
    html.classList.remove(Theme.LIGHT, Theme.DARK);
    html.classList.add(theme);
  }
}
