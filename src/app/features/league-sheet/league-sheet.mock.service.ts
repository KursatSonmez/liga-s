import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeagueWinningChange, MatchResult, Season, TeamScore } from '../../models/abstract';
import { LeagueWinningChanges, MatchResults, Seasons, TeamScores } from './fakedata';

@Injectable()
export class LeagueSheetMockService {

    getSeasons(): Observable<Season[]> {
        return of(Seasons);
    }

    getStandings(): Observable<TeamScore[]> {
        return of(TeamScores);
    }

    getWeekResults(week: number | null): Observable<MatchResult[]> {
        if (week == null) { // eğer hafta bilgisi yoksa son hafta'nın sonuçları alınır
            week = MatchResults.map(x => x.week).reverseBy()[0];
        }
        return of(MatchResults.filter(x => x.week == week));
    }

    getLeagueWinningChanges(): Observable<LeagueWinningChange[]> {
        return of(LeagueWinningChanges);
    }

}
