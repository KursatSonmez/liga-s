
// TODO: Veriler sezonlara henüz bağlanmadı
export interface Season {

  id: number;

  /**Sezon Başlangıç Tarihi */
  startDate: Date | string | undefined;

  /**Sezon Bitiş Tarihi */
  endDate: Date | string | undefined;

  /**Sezon Adı */
  name: string;
}

export interface TeamScore {
  /**Takım Adı */
  teamName: string;

  /**Puan */
  point: number;

  /**Oynanan Maç Sayısı */
  matchCount: number;

  /**Galibiyet Sayısı */
  wins: number;

  /**Beraberlik Sayısı */
  draws: number;

  /**Mağlubiyet Sayısı */
  loses: number;

  /**Averaj */
  average: number;
}

export interface LeagueWinningChange {
  teamName: string;

  /**Şampiyon olma olasılığı */
  chance: number;
}

export interface Match {
  homeTeamName: string;

  awayTeamName: string;

  result: MatchResult | undefined;
}

export interface MatchResult {
  homeScore: number;

  awayScore: number;
}

export interface Fixture {
  week: number;
  fixture: Match[];
}

export interface Team {
  name: string;
  /** 100 üzerinden güç değeri */
  power: number;
}
