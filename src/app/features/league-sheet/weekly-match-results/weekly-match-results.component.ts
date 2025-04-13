import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { LeagueSheetService } from '../league-sheet.service';
import { getTakeUntilDestroyed } from '../../../utils/destroy';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'weekly-match-results',
  template: `
  <p-table piTableOptions dataKey="homeTeamName" [value]="weekResultsArr()">
    <ng-template #header>
        <tr>
            <th colspan="3" class="text-center">STS {{ week() }}. Hafta Maç Sonuçları</th>
        </tr>
    </ng-template>
    <ng-template #body let-item>
        <tr>
            <td>{{ item.homeTeamName }}</td>
            <td>{{ item.homeScore }} - {{ item.awayScore }}</td>
            <td>{{ item.awayTeamName }}</td>
        </tr>
    </ng-template>
</p-table>

  `,
  standalone: false,
})
export class WeeklyMatchResultsComponent {

  week = input(null, { transform: numberAttribute });

  private readonly leagueSheetService = inject(LeagueSheetService);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();

  private readonly weekResults = toSignal(this.leagueSheetService.getWeekResults(this.week()).pipe(this.takeUntilDestroyed()));

  weekResultsArr = computed(() => this.weekResults() ?? []);
}
