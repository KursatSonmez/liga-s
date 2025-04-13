import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, input, numberAttribute, OnInit, signal } from '@angular/core';
import { getTakeUntilDestroyed } from '../../../utils/destroy';
import { LeagueWinningChange } from '../../../models/abstract';
import { LeagueService } from '../../shared/league.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'league-winning-chances',
  template: `
  <p-table piTableOptions dataKey="teamName" [value]="changes()">
    <ng-template #header>
        <tr>
            <th colspan="2" class="text-center">{{ week() }}. Hafta Şampiyonluk Tahminleri</th>
        </tr>
    </ng-template>
    <ng-template #body let-item>
        <tr>
          @if(loading()){
            <td><p-skeleton></p-skeleton></td>
            <td><p-skeleton></p-skeleton></td>
          }
          @else {
            <td>{{ item.teamName }}</td>
            <td>%{{ item.chance }}</td>
          }
        </tr>
    </ng-template>
</p-table>

  `,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueWinningChancesComponent implements OnInit {

  private readonly leagueService = inject(LeagueService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();

  changes = signal([] as LeagueWinningChange[]);
  loading = signal(false);
  week = signal(0);

  ngOnInit(): void {
    const w = this.leagueService.getCurrentWeekNumber();
    if (w > 0) {
      this.week.set(w);
      this.refresh();
    }

    this.leagueService.onWeekPlaying()
      .pipe(finalize(() => this.cd.markForCheck()), this.takeUntilDestroyed())
      .subscribe(() => this.loading.set(true));

    this.leagueService.onWeekPlayed()
      .pipe(this.takeUntilDestroyed())
      .subscribe(val => {
        this.week.set(val.week);
        this.refresh();
        this.cd.markForCheck();
      });
  }

  private refresh() {
    this.leagueService.getWinningChances()
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.cd.markForCheck();
        }),
        this.takeUntilDestroyed()
      )
      .subscribe(this.changes.set);
  }
}
