import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'feature-layout',
  imports: [RouterOutlet, AppHeaderComponent, ButtonModule, RouterLink],
  template: `
  <app-header></app-header>

  <div class="navigation d-flex flex-row justify-content-center m-3">

    <p-button label="Ana Sayfa" variant="text" severity="warn" [raised]="true" [routerLink]="'homepage'">
    </p-button>

    <p-button label="Fikstur" variant="text" severity="warn" [raised]="true" [routerLink]="'fixture'">
    </p-button>

  </div>

  <div class="container-fluid">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: `
    .navigation {
      gap: 1rem;
    }
  `
})
export class FeatureLayoutComponent {
}
