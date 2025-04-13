export function generateRandomScore(power: number, chance: number): number {
  const max = 6;

  let score = Math.floor((Math.random() * (max + 1)) * (power / 100));

  score = Math.floor(score * chance);

  return score;
}

/**home ve away için rastgele skor sonucunu döner. */
export function generateScore(homePower: number, awayPower: number): number[] {

  // eğer iki güç birbirine eşit ise rastgele belirlenmeli

  const totalPower = homePower + awayPower;

  const homeChance = homePower / totalPower;

  let homeScore: number, awayScore: number;

  homeScore = generateRandomScore(homePower, homeChance);
  awayScore = generateRandomScore(awayPower, 1 - homeChance);

  homeScore = Math.max(homeScore, 0);
  awayScore = Math.max(awayScore, 0);

  return [homeScore, awayScore];
}
