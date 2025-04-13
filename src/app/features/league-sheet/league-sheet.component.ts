import { Component, inject, OnInit, signal } from '@angular/core';
import { LeagueService } from '../shared/league.service';
import { getTakeUntilDestroyed } from '../../utils/destroy';

@Component({
  selector: 'league-sheet',
  templateUrl: './league-sheet.component.html',
  styleUrls: ['./league-sheet.component.scss'],
  standalone: false,
})
export class LeagueSheetComponent implements OnInit {
  week = signal(0);

  private readonly leagueService = inject(LeagueService);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();

  ngOnInit(): void {
    this.leagueService.onWeekPlayed()
      .pipe(this.takeUntilDestroyed())
      .subscribe((val) => {
        this.week.set(val.week);
      });
  }
}
