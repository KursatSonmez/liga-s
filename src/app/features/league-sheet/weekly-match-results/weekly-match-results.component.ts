import { booleanAttribute, ChangeDetectorRef, Component, effect, inject, Input, input, numberAttribute, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { LeagueService } from '../../shared/league.service';
import { Match } from '../../../models/abstract';
import { getTakeUntilDestroyed } from '../../../utils/destroy';

@Component({
  selector: 'weekly-match-results',
  templateUrl: './weekly-match-results.component.html',
  standalone: false,
})
export class WeeklyMatchResultsComponent implements OnInit, OnChanges {

  @Input({ transform: numberAttribute })
  week: number | null = null;

  @Input({ transform: booleanAttribute })
  forceLoading?: boolean;

  @Input({ transform: booleanAttribute })
  editable?: boolean;

  private readonly leagueService = inject(LeagueService);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();
  private readonly cd = inject(ChangeDetectorRef);

  weekResultsArr: WritableSignal<Match[]> = signal([]);
  loading = signal(true);

  dialogVisible = false;
  updatingMatch?: Match;
  newHomeScore: number = 0;
  newAwayScore: number = 0;
  canEdit = false;
  disableBtn = false;

  ngOnInit(): void {
    this.leagueService
      .onWeekPlaying()
      .pipe(this.takeUntilDestroyed())
      .subscribe(val => {
        if (val === this.week || (this.forceLoading))
          this.loading.set(true);
      });

    this.leagueService.onWeekPlayed()
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        if (this.dialogVisible) {
          this.dialogVisible = false;
          this.disableBtn = false;
          this.refresh();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['week']) {
      this.refresh();
    }
  }

  updateScore(): void {
    if (!this.updatingMatch || !this.week)
      return;

    const match: Match = this.updatingMatch;

    this.loading.set(true);
    this.disableBtn = true;

    this.leagueService.updateScore(this.week, match.homeTeamName, match.awayTeamName, this.newHomeScore, this.newAwayScore);
  }

  openDialog(item: Match) {
    if (!this.editable || !item.result)
      return;

    this.updatingMatch = item;
    this.newHomeScore = item.result!.homeScore
    this.newAwayScore = item.result!.awayScore;
    this.dialogVisible = true;
  }

  dialogHide() {
    // ignore
  }

  refresh() {
    if (!this.week)
      return;

    const matches = this.leagueService.getWeekMatches(this.week);

    this.weekResultsArr.set(matches);

    if (this.editable && matches.every(x => x.result != null))
      this.canEdit = true;
    else
      this.canEdit = false;

    if (this.loading())
      this.loading.set(false);

    this.cd.markForCheck();
  }
}
