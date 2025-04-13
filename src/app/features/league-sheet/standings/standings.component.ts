import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { getTakeUntilDestroyed } from '../../../utils/destroy';
import { Table } from 'primeng/table';
import { tap } from 'rxjs';
import { TeamScore } from '../../../models/abstract';
import { LeagueService } from '../../shared/league.service';


@Component({
  selector: 'standings',
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingsComponent implements OnInit {

  @ViewChild(Table)
  table!: Table;

  scoresArr: WritableSignal<TeamScore[]> = signal([]);
  loading = signal(true);

  private readonly leagueService = inject(LeagueService);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.getList(true);
    this.leagueService
      .onWeekPlaying()
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.loading.set(true);
      });

    this.leagueService
      .onWeekPlayed()
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.getList(true);
      });
  }

  private getList(useLoading: boolean) {

    this.leagueService.getStandings()
      .pipe(
        tap({
          subscribe: () => useLoading && !this.loading() && this.loading.set(true),
          finalize: () => useLoading && this.loading() && this.loading.set(false),
        }),
        this.takeUntilDestroyed()
      )
      .subscribe(val => {
        this.scoresArr.set(val.orderBy('-point', '-average', 'teamName'));
        this.cd.markForCheck();
      });
  }
}
