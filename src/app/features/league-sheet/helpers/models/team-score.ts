import { TeamScore } from '../../../../models/abstract';


export class TeamScoreModel implements TeamScore {
  constructor(
    public teamName: string
  ) { }

  point: number = 0;
  matchCount: number = 0;
  wins: number = 0;
  draws: number = 0;
  loses: number = 0;
  average: number = 0;
  chance?: number;
}
