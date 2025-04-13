import { Injectable } from '@angular/core';
import { LeagueManagement } from '../league-sheet/helpers/league-management';
import { TeamModel } from '../league-sheet/helpers/models/team';
import { Observable, of, tap } from 'rxjs';
import { LeagueWinningChange, TeamScore } from '../../models/abstract';
import { FixtureService } from './fixture.service';
import { MatchModel } from '../league-sheet/helpers/models/match';

@Injectable()
export class LeagueService {
  private readonly _league;

  constructor(
    private fixtureService: FixtureService
  ) {
    fixtureService.createFixture(TeamModel.Teams);

    this._league = new LeagueManagement(TeamModel.Teams, fixtureService);
  }

  get weekPlaying(): boolean {
    return this._league.weekPlaying;
  }

  onWeekPlaying() {
    return this._league.onWeekPlaying._observer.asObservable();
  }

  onWeekPlayed() {
    return this._league.onWeekPlayed._observer.asObservable();
  }

  onWinningChances() {
    return this._league.onWinningChances.observer$();
  }

  getStandings(): Observable<TeamScore[]> {
    return of(this._league.getTeamScores());
  }

  checkIsLastWeek(): boolean {
    return this._league.currentWeek >= this.fixtureService.totalWeeks;
  }

  getCurrentWeekNumber() {
    return this._league.currentWeek;
  }

  getTotalWeekNumber() {
    return this.fixtureService.totalWeeks;
  }

  getWeekMatches(week: number): MatchModel[] {
    return this.fixtureService.getWeekMatches(week);
  }

  getWinningChances(): Observable<LeagueWinningChange[]> {
    return of(this._league.getWinningChances());
  }

  playNextWeek(): void {
    this._league.playNextWeek();
  }

}
