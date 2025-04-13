import { Team } from '../../../../models/abstract';

export class TeamModel implements Team {
  constructor(
    public name: string
  ) { }

  static Teams = [
    new TeamModel('Galatasaray'),
    new TeamModel('Fenerbahçe'),
    new TeamModel('Beşiktaş'),
    new TeamModel('Sivasspor'),
  ];
}
