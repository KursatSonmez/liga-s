import { booleanAttribute, Component, effect, inject, Input, input, numberAttribute, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { LeagueService } from '../../shared/league.service';
import { Match } from '../../../models/abstract';
import { getTakeUntilDestroyed } from '../../../utils/destroy';

@Component({
  selector: 'weekly-match-results',
  template: `
  <p-table piTableOptions dataKey="homeTeamName" [value]="weekResultsArr()">
  <ng-template pTemplate="colgroup" let-columns>
      <colgroup>
          <col style="width: 40%;">
          <col style="width: 20%;">
          <col style="width: 40%;">
      </colgroup>
  </ng-template>
    <ng-template #header>
        <tr>
            <th colspan="3" class="text-center">STS {{ week }}. Hafta Maç Sonuçları</th>
        </tr>
    </ng-template>
    <ng-template #body let-item>
        <tr>
          @if(loading()) {
            <td><p-skeleton></p-skeleton></td>
            <td><p-skeleton></p-skeleton></td>
            <td><p-skeleton></p-skeleton></td>
          }
          @else {
            <td>{{ item.homeTeamName }}</td>
            <td class="text-center">{{ item.result?.homeScore }} - {{ item.result?.awayScore }}</td>
            <td>{{ item.awayTeamName }}</td>
          }
        </tr>
    </ng-template>
</p-table>

  `,
  standalone: false,
})
export class WeeklyMatchResultsComponent implements OnInit, OnChanges {

  @Input({ transform: numberAttribute })
  week: number | null = null;

  @Input({ transform: booleanAttribute })
  forceLoading?: boolean;

  private readonly leagueService = inject(LeagueService);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();

  weekResultsArr: WritableSignal<Match[]> = signal([]);
  loading = signal(true);

  ngOnInit(): void {

    this.leagueService
      .onWeekPlaying()
      .pipe(this.takeUntilDestroyed())
      .subscribe(val => {
        if (val === this.week || (this.forceLoading))
          this.loading.set(true);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['week']) {
      this.refresh();
    }
  }

  refresh() {
    if (!this.week)
      return;

    const matches = this.leagueService.getWeekMatches(this.week);

    this.weekResultsArr.set(matches);

    if (this.loading())
      this.loading.set(false);
  }
}
