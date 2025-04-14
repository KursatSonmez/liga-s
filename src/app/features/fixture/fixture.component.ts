import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LeagueSheetModule } from '../league-sheet/league-sheet.module';
import { LeagueService } from '../shared/league.service';
import { FixtureService } from '../shared/fixture.service';
import { FixtureModel } from '../league-sheet/helpers/models/fixture';
import { getTakeUntilDestroyed } from '../../utils/destroy';
import { WeeklyMatchResultsComponent } from '../league-sheet/weekly-match-results/weekly-match-results.component';

@Component({
  selector: 'fixture',
  imports: [LeagueSheetModule],
  templateUrl: './fixture.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixtureComponent implements OnInit {

  @ViewChildren(WeeklyMatchResultsComponent)
  weeklyMatchResultsComponent!: QueryList<WeeklyMatchResultsComponent>;

  private readonly leagueService = inject(LeagueService);
  private readonly fixtureService = inject(FixtureService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly takeUntilDestroyed = getTakeUntilDestroyed();

  fixture: FixtureModel[] = [];

  ngOnInit(): void {
    this.fixture = this.fixtureService.getFixture();

    this.leagueService.onWeekPlayed()
      .pipe(this.takeUntilDestroyed())
      .subscribe(val => {
        const comp = this.weeklyMatchResultsComponent.find(x => x.week === val.week);
        if (comp)
          comp.refresh();

        this.cd.markForCheck();
      });

  }
}
