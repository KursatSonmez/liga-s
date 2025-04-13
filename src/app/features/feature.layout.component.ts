import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';

@Component({
  selector: 'feature-layout',
  imports: [RouterOutlet, AppHeaderComponent],
  template: `
  <app-header></app-header>

  <div class="container-fluid">
    <router-outlet></router-outlet>
  </div>
  `,
})
export class FeatureLayoutComponent {
}
