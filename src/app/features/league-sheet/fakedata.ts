import { LeagueWinningChange, Match, Season, TeamScore } from '../../models/abstract';

export const Seasons: Season[] = [
  {
    id: 1,
    startDate: new Date(2024, 8, 9),
    endDate: new Date(2025, 6, 1),
    name: 'Süper Lig',
  },
];

export const TeamScores: TeamScore[] = [
  {
    teamName: 'Fenerbahçe',
    point: 10,
    matchCount: 4,
    wins: 3,
    draws: 1,
    loses: 0,
    average: 11,
  },
  {
    teamName: 'Galatasaray',
    point: 8,
    matchCount: 4,
    wins: 2,
    draws: 2,
    loses: 0,
    average: 6,
  },
  {
    teamName: 'Beşiktaş',
    point: 8,
    matchCount: 4,
    wins: 2,
    draws: 2,
    loses: 0,
    average: 4,
  },
  {
    teamName: 'Sivasspor',
    point: 4,
    matchCount: 4,
    wins: 1,
    draws: 1,
    loses: 2,
    average: 0,
  },
];

export const MatchResults: Match[] = [
  {
    homeTeamName: 'Fenerbahçe',
    awayTeamName: 'Sivasspor',
    result: {
      homeScore: 3,
      awayScore: 2,
    },
  },
  {
    homeTeamName: 'Galatasaray',
    awayTeamName: 'Beşiktaş',
    result: {
      homeScore: 3,
      awayScore: 3,
    },
  },
  {
    homeTeamName: 'Beşiktaş',
    awayTeamName: 'Fenerbahçe',
    result: {
      homeScore: 2,
      awayScore: 3,
    },
  },
  {
    homeTeamName: 'Galatasaray',
    awayTeamName: 'Sivasspor',
    result: {
      homeScore: 2,
      awayScore: 2,
    },
  },
];


export const LeagueWinningChanges: LeagueWinningChange[] = [
  {
    teamName: 'Fenerbahçe',
    chance: 45,
  },
  {
    teamName: 'Galatasaray',
    chance: 25
  },
  {
    teamName: 'Beşiktaş',
    chance: 25
  },
  {
    teamName: 'Sivasspor',
    chance: 5,
  },
];
