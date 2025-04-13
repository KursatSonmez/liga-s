import { Injectable } from '@angular/core';
import { FixtureModel } from '../league-sheet/helpers/models/fixture';
import { TeamModel } from '../league-sheet/helpers/models/team';
import { MatchModel, MatchResultModel } from '../league-sheet/helpers/models/match';
import { generateScore } from '../league-sheet/helpers/common';

@Injectable()
export class FixtureService {
  private readonly _fixture: FixtureModel[] = [];
  totalMatches = 0;
  totalWeeks = 0;
  matchesPerWeek = 0;

  getWeekNumbers(): number[] {
    return this._fixture.map(x => x.week);
  }

  getFixture() {
    return this._fixture;
  }

  getWeekMatches(week: number): MatchModel[] {
    return this._fixture.filter(x => x.week == week)[0].fixture;
  }

  createFixture(teams: TeamModel[]) {
    this.generateFixture(teams);
  }

  play(match: MatchModel): void {
    const homePower = match.homeTeam.power, awayPower = match.awayTeam.power;
    const [homeScore, awayScore] = generateScore(homePower, awayPower);

    match.result = new MatchResultModel(homeScore, awayScore);
  }

  private generateFixture(teams: TeamModel[]): void {

    const matches: MatchModel[] = [];

    // takımlar eşleştirilir
    for (let i = 0; i < teams.length; i++) {
      const home = teams[i];

      for (let j = i + 1; j < teams.length; j++) {
        const away = teams[j];

        matches.push(new MatchModel(home, away));
        matches.push(new MatchModel(away, home));
      }
    }

    // eşleştirilen takım sıralamaları karıştırılır
    this.shuffle(matches);

    this.totalMatches = matches.length;

    // haftalık maçlar ayarlanır
    const matchesPerWeek = Math.floor(teams.length / 2);
    let week = 1;
    while (matches.length > 0) {
      const weeklyMatches: MatchModel[] = [];
      const list = new Set<string>();

      for (let i = 0; i < matches.length && weeklyMatches.length < matchesPerWeek; i++) {
        const item = matches[i];

        if (!list.has(item.homeTeamName) && !list.has(item.awayTeamName)) {
          weeklyMatches.push(item);
          list.add(item.homeTeamName);
          list.add(item.awayTeamName);
          matches.splice(i, 1);
          i--;
        }
      }
      weeklyMatches.forEach(x => this._fixture.push(new FixtureModel(week, weeklyMatches)));
      week++;
    }

    this.totalWeeks = week - 1;
    this.matchesPerWeek = matchesPerWeek;
  }

  private shuffle(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const a = Math.floor(Math.random() * (i + 1));

      [array[i], array[a]] = [array[a], array[i]];

    }
  }

}
