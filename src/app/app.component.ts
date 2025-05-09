import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './shared/services/theme/theme.service';
import { Theme } from './shared/services/theme/types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.initTheme();
  }

  onDark(): void {
    this.handleSetTheme(Theme.DARK);
  }

  onLight(): void {
    this.handleSetTheme(Theme.LIGHT);
  }

  private handleSetTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
