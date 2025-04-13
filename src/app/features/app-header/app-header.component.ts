import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, CardModule],
  template: `
  <p-card class="text-center" [style]="{ 'background': 'var(--p-amber-500)' }">
  <ng-template #title>
    <div class="app-title-template">
      <span>Liga S | Futbol Lig Simülasyonuna Hoşgeldiniz!</span>
      <p-button label="Sonraki Hafta" variant="outlined" severity="secondary" [raised]="true" [style]="{ 'float': 'right' }">
        <ng-template #icon>
          <span class="material-symbols-outlined">
            sports_soccer
          </span>
        </ng-template>
      </p-button>
    </div>
  </ng-template>
</p-card>
  `,
  styleUrl: './app-header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppHeaderComponent {

}
