import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewChild } from '@angular/core';
import { LeagueSheetService } from '../league-sheet.service';
import { getTakeUntilDestroyed } from '../../../utils/destroy';
import { toSignal } from '@angular/core/rxjs-interop';
import { Table } from 'primeng/table';
import { delay, tap } from 'rxjs';
import { TeamScore } from '../../../models/abstract';


@Component({
  selector: 'standings',
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingsComponent {

  @ViewChild(Table)
  table!: Table;

  scoresArr = computed(() => this.scores() ?? []);
  loading = signal(true);

  private readonly leagueSheetService = inject(LeagueSheetService);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();

  private readonly scores = toSignal(
    this.leagueSheetService.getStandings()
      .pipe(
        delay(5000),
        tap({
          subscribe: () => this.loading.set(true),
          finalize: () => this.loading.set(false),
        }),
        this.takeUntilDestroyed()
      )
    , { initialValue: Array.from({ length: 5 }).map(x => ({} as TeamScore)) });
}
