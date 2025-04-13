import { ChangeDetectionStrategy, Component, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { LeagueSheetService } from '../league-sheet.service';
import { getTakeUntilDestroyed } from '../../../utils/destroy';
import { LeagueWinningChange } from '../../../models/abstract';

@Component({
  selector: 'league-winning-changes',
  template: `
  <p-table piTableOptions dataKey="teamName" [value]="changes()">
    <ng-template #header>
        <tr>
            <th colspan="2" class="text-center">{{ week() }}. Hafta Şampiyonluk Tahminleri</th>
        </tr>
    </ng-template>
    <ng-template #body let-item>
        <tr>
            <td>{{ item.teamName }}</td>
            <td>%{{ item.chance }}</td>
        </tr>
    </ng-template>
</p-table>

  `,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueWinningChangesComponent {

  week = input(null, { transform: numberAttribute });

  private readonly leagueSheetService = inject(LeagueSheetService);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();

  changes = signal([] as LeagueWinningChange[]);

  constructor() {
    effect(() => {
      const week = this.week();

      this.leagueSheetService.getLeagueWinningChanges()
        .pipe(this.takeUntilDestroyed())
        .subscribe(this.changes.set);
    });
  }
}
