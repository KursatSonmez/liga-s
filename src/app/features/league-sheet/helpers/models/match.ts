import { Match, MatchResult } from '../../../../models/abstract';
import { TeamModel } from './team';

export class MatchModel implements Match {

  constructor(
    public homeTeam: TeamModel,
    public awayTeam: TeamModel,
  ) {
    this.homeTeamName = homeTeam.name;
    this.awayTeamName = awayTeam.name;
  }

  private _result?: MatchResultModel;
  get result(): MatchResultModel | undefined {
    return this._result;
  }
  set result(val: MatchResultModel) {
    this._result = val;
  }

  homeTeamName: string;
  awayTeamName: string;
}

export class MatchResultModel implements MatchResult {
  constructor(
    public homeScore: number,
    public awayScore: number,
  ) { }

  get isDraw(): boolean {
    return this.homeScore === this.awayScore;
  }

  updateScore(homeScore: number, awayScore: number) {
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }
}
