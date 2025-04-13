import { NgModule } from '@angular/core';
import { StandingsComponent } from './standings/standings.component';
import { TableModule } from 'primeng/table';
import { LeagueSheetService } from './league-sheet.service';
import { LeagueSheetMockService } from './league-sheet.mock.service';
import { WeeklyMatchResultsComponent } from './weekly-match-results/weekly-match-results.component';
import { LeagueSheetComponent } from './league-sheet.component';
import { PiTableOptionsDirective } from '../../utils/primeng/pi-table-options.directive';
import { ButtonModule } from 'primeng/button';
import { LeagueWinningChancesComponent } from './league-winning-chances/league-winning-chances.component';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
    declarations: [
        StandingsComponent,
        WeeklyMatchResultsComponent,
        LeagueWinningChancesComponent,
        LeagueSheetComponent,
    ],
    imports: [
        TableModule,
        PiTableOptionsDirective,
        ButtonModule,
        SkeletonModule,
    ],
    providers: [
        { provide: LeagueSheetService, useClass: LeagueSheetMockService }
    ],
    exports: [
        LeagueSheetComponent
    ],
})
export class LeagueSheetModule {

}
