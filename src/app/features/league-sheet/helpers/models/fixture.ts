import { Fixture } from '../../../../models/abstract';
import { MatchModel } from './match';

export class FixtureModel implements Fixture {
  constructor(
    public week: number,
    public fixture: MatchModel[],
  ) { }
}
