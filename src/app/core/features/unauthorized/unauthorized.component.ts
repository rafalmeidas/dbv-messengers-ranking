import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
