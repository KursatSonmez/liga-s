import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { getTakeUntilDestroyed } from '../../utils/destroy';
import { LeagueService } from '../shared/league.service';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, CardModule, ToastModule],
  template: `
  <p-card class="text-center" [style]="{ 'background': 'var(--p-amber-500)' }">
  <ng-template #title>
    <div class="app-title-template">
      <span>Liga S | Futbol Lig Simülasyonuna Hoşgeldiniz!</span>
      <p-button [label]="label" variant="outlined" severity="secondary" [raised]="true" [style]="{ 'float': 'right' }" [disabled]="disabled" (onClick)="nextWeek()">
        <ng-template #icon>
          <span class="material-symbols-outlined">
            {{ myicon }}
          </span>
        </ng-template>
      </p-button>
    </div>
  </ng-template>
</p-card>
<p-toast position="center" />
  `,
  styleUrl: './app-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class AppHeaderComponent implements OnInit {

  private readonly leagueService = inject(LeagueService);
  private readonly piMessageService = inject(MessageService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();

  myicon: 'sports_soccer' | 'done_all' = 'sports_soccer';
  label = 'Sonraki Hafta';
  disabled = false;

  nextWeek() {
    if (this.leagueService.weekPlaying) {
      this.piMessageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Lütfen bekleyiniz, maçlar devam ediyor...' });
      return;
    }

    this.disabled = true;

    this.leagueService.playNextWeek();
  }

  ngOnInit(): void {
    this.leagueService.onWeekPlayed()
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.disabled = this.leagueService.checkIsLastWeek();

        if (this.disabled) {
          this.myicon = 'done_all';
        }
        else {
          this.myicon = 'sports_soccer';
        }
        this.label = `Sonraki Hafta (${this.leagueService.getCurrentWeekNumber()}/${this.leagueService.getTotalWeekNumber()})`;
        this.cd.markForCheck();
      });
  }

}
