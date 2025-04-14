import { Subject } from 'rxjs';
import { TeamModel } from './models/team';
import { TeamScoreModel } from './models/team-score';
import { MatchModel } from './models/match';
import { FixtureService } from '../../shared/fixture.service';
import { LeagueWinningChange, Match, TeamScore } from '../../../models/abstract';

export type NextWeekStartingType = 'playNextWeek';

export class LeagueManagement {
  private readonly _teamScores: TeamScoreModel[] = [];

  currentWeek = 0;

  constructor(
    public teams: TeamModel[],
    private fixtureService: FixtureService
  ) {
    teams.forEach(x => {
      this._teamScores.push(new TeamScoreModel(x.name));
    });
  }

  weekPlaying = false;

  onWeekPlaying = {
    _observer: new Subject<number>(),
    next: (week: number) => {
      this.weekPlaying = true;
      this.onWeekPlaying._observer.next(week);
    }
  };

  onWeekPlayed = {
    _observer: new Subject<{ week: number, matches: MatchModel[] }>(),
    next: (val: { week: number, matches: MatchModel[] }) => {
      this.weekPlaying = false;
      this.onWeekPlayed._observer.next(val);
    }
  };

  nextWeek = {
    _observer: new Subject<NextWeekStartingType>(),
    observer$: () => this.nextWeek._observer.asObservable(),
    next: (val: NextWeekStartingType) => this.nextWeek._observer.next(val),
  };

  onWinningChances = {
    _observer: new Subject<LeagueWinningChange[]>(),
    observer$: () => this.onWinningChances._observer.asObservable(),
    next: (val: LeagueWinningChange[]) => this.onWinningChances._observer.next(val),
  };

  getTeamScores() {
    return this._teamScores;
  }

  getWinningChances(): LeagueWinningChange[] {
    let list: LeagueWinningChange[] = this.simulateChampionProbabilities(this.getTeamScores(), this.currentWeek, this.fixtureService.totalWeeks);

    list = list.reverseBy('chance');

    this.applyChances(list);

    this.onWinningChances.next(list);
    return list;
  }

  updateScore(week: number, homeTeamName: string, awayTeamName: string, newHomeScore: number, newAwayScore: number): void {

    const weekMatches = this.fixtureService.getWeekMatches(week);
    const match = weekMatches.find(x => x.homeTeamName === homeTeamName && x.awayTeamName === awayTeamName);

    if (match == null)
      throw new Error('match is empty!');

    const board = this.getTeamScores();
    const home = board.find(x => x.teamName === homeTeamName);
    const away = board.find(x => x.teamName === awayTeamName);

    if (home == null || away == null)
      throw new Error('team not found!');

    this.revokeScore(match, home, away);

    match.result!.updateScore(newHomeScore, newAwayScore);

    this.applyScore(match, home, away);

    setTimeout(() => {
      this.onWeekPlayed.next({
        week, matches: weekMatches
      });
    }, 1000);
  }

  playNextWeek(): void {
    if (this.weekPlaying) {
      console.error('The matches continue...');
      return;
    }

    if (this.currentWeek + 1 > this.fixtureService.totalWeeks) {
      console.error(this.currentWeek, this.fixtureService.totalWeeks);
      return;
    }

    this.onWeekPlaying.next(this.currentWeek + 1);

    const week = this.increaseToNextWeek();
    const matches = this.fixtureService.getWeekMatches(week);
    matches.forEach(x => {
      this.fixtureService.play(x);
      this.updateBoard(x);
    });

    setTimeout(() => {
      this.onWeekPlayed.next({
        week, matches
      });
    }, 1000);
  }

  private updateBoard(match: MatchModel) {
    const board = this.getTeamScores();
    const home = board.find(x => x.teamName === match.homeTeamName);
    const away = board.find(x => x.teamName === match.awayTeamName);

    if (home == null || away == null)
      throw new Error('team not found!');

    if (match.result == null)
      throw new Error('match result is empty!');

    home.matchCount += 1;
    away.matchCount += 1;

    this.applyScore(match, home, away);
  }

  private increaseToNextWeek() {
    return ++this.currentWeek;
  }

  private applyChances(chances: LeagueWinningChange[]) {
    const scores = this.getTeamScores();

    for (const item of scores) {
      const chance = chances.find(x => x.teamName === item.teamName);
      item.chance = chance?.chance;
    }
  }

  private simulateChampionProbabilities(
    teams: TeamScore[],
    currentWeek: number,
    totalWeeks: number,
  ): LeagueWinningChange[] {
    const remainingMatches = totalWeeks - currentWeek;
    // const simulationPerTeam = Math.pow(3, remainingMatches); // 3^n ihtimal

    const teamChampionships: { [teamName: string]: number } = {};
    teams.forEach(team => teamChampionships[team.teamName] = 0);

    // her takımın kalan maçları için skor kombinasyonları oluşturulur
    const allCombosPerTeam = this.generateScoreCombos(remainingMatches);

    // Senaryoları kombinle ve simüle et
    for (const outcomeSet of this.cartesianProduct(...teams.map(() => allCombosPerTeam))) {
      const simulatedTeams = teams.map((team, idx) => {
        const extraPoints = outcomeSet[idx].reduce((acc, res) => acc + res, 0);
        return {
          ...team,
          point: team.point + extraPoints
        };
      });

      const champion = this.calculateChampion(simulatedTeams);
      if (champion) {
        teamChampionships[champion.teamName]++;
      }
    }

    const totalSimulations = Math.pow(3, remainingMatches * teams.length);

    const probabilities: { [teamName: string]: number } = {};

    for (const team of teams) {
      probabilities[team.teamName] = parseFloat(
        ((teamChampionships[team.teamName] / totalSimulations) * 100).toFixed(2)
      );
    }

    return Object.keys(probabilities).map(x => ({
      teamName: x,
      chance: probabilities[x],
    } as LeagueWinningChange));
  }

  private generateScoreCombos(matchCount: number): number[][] {
    if (matchCount === 0) return [[]];
    const results: number[] = [0, 1, 3];
    const combos: number[][] = [];

    const helper = (path: number[]) => {
      if (path.length === matchCount) {
        combos.push([...path]);
        return;
      }
      for (const res of results) {
        path.push(res);
        helper(path);
        path.pop();
      }
    };

    helper([]);
    return combos;
  }

  private cartesianProduct<T>(...arrays: T[][]): T[][] {
    return arrays.reduce((a, b) =>
      a.flatMap(d => b.map(e => [...d, e]))
      , [[]] as T[][]);
  }

  private calculateChampion(teams: TeamScore[]): TeamScore | null {
    if (!teams || teams.length === 0) return null;

    // maks puan
    const maxPoint = Math.max(...teams.map(t => t.point));
    const topPointTeams = teams.filter(t => t.point === maxPoint);

    if (topPointTeams.length === 1) {
      return topPointTeams[0];
    }

    // averaj
    const maxAverage = Math.max(...topPointTeams.map(t => t.average));
    const topAverageTeams = topPointTeams.filter(t => t.average === maxAverage);

    if (topAverageTeams.length === 1) {
      return topAverageTeams[0];
    }

    // alfabetik sıraya göre
    topAverageTeams.sort((a, b) => a.teamName.localeCompare(b.teamName));

    return topAverageTeams[0];
  }


  private revokeScore(match: Match, home: TeamScoreModel, away: TeamScoreModel) {
    this.applyScore(match, home, away, true);
  }

  private applyScore(match: Match, home: TeamScoreModel, away: TeamScoreModel, revoke: boolean = false) {
    if (match.result == null)
      throw new Error('match result is empty!');

    const factor: -1 | 1 = revoke ? -1 : 1;

    home.average += (match.result.homeScore - match.result.awayScore) * factor;
    away.average += (match.result.awayScore - match.result.homeScore) * factor;

    let winner: TeamScoreModel | undefined, loser: TeamScoreModel | undefined;

    if (match.result!.homeScore > match.result!.awayScore) {
      winner = home;
      loser = away;
    }
    else if (match.result.homeScore < match.result.awayScore) { // deplasman takımı kazandıysa
      winner = away;
      loser = home;
    }
    else { // beraberlik
      home.draws += 1 * factor;
      home.point += 1 * factor;

      away.draws += 1 * factor;
      away.point += 1 * factor;
    }

    if (winner && loser) {
      winner.wins += 1 * factor;
      winner.point += 3 * factor;

      loser.loses += 1 * factor;
    }
  }
}
