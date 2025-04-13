import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeagueWinningChange, MatchResult, Season, TeamScore } from '../../models/abstract';

@Injectable()
export class LeagueSheetService {

    getSeasons(): Observable<Season[]> {
        return of([]);
    }

    getStandings(): Observable<TeamScore[]> {
        return of([]);
    }

    getWeekResults(week: number | null): Observable<MatchResult[]> {
        return of([]);
    }

    getLeagueWinningChanges(): Observable<LeagueWinningChange[]> {
        return of([]);
    }

}
