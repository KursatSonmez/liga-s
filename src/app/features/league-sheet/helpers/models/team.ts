import { Team } from '../../../../models/abstract';

export class TeamModel implements Team {
  constructor(
    public name: string,
    public power: number,
  ) { }

  static Teams = [
    new TeamModel('Galatasaray', 90),
    new TeamModel('Fenerbahçe', 75),
    new TeamModel('Beşiktaş', 70),
    new TeamModel('Sivasspor', 55),
  ];
}
