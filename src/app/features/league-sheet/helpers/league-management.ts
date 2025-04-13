import { Subject } from 'rxjs';
import { TeamModel } from './models/team';
import { TeamScoreModel } from './models/team-score';
import { MatchModel } from './models/match';
import { FixtureService } from '../../shared/fixture.service';

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
    _observer: new Subject<void>(),
    next: () => {
      this.weekPlaying = true;
      this.onWeekPlaying._observer.next();
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

  getTeamScores() {
    return this._teamScores;
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

    this.onWeekPlaying.next();

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

    home.average += match.result.homeScore - match.result.awayScore;
    away.average += match.result.awayScore - match.result.homeScore;

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
      home.draws += 1;
      home.point += 1;

      away.draws += 1;
      away.point += 1;
    }

    if (winner && loser) {
      winner.wins += 1;
      winner.point += 3;

      loser.loses += 1;
    }
  }

  private increaseToNextWeek() {
    return ++this.currentWeek;
  }
}
