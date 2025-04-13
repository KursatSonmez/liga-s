
/**En küçük skor en başta olacak şekilde 2 adet skor üretir. */
export function generateRandomScore() {
  const a = Math.floor(Math.random() * 5); // 0-4 arası yol sayısı
  const b = Math.floor(Math.random() * 5);

  return [a, b].sort(); // en küçük skor en başta
}

/**home ve away için rastgele skor sonucunu döner. */
export function generateScore(homePower: number, awayPower: number): number[] {

  // eğer iki güç birbirine eşit ise rastgele belirlenmeli
  // TODO: Takımlara güç atanmalı
  const hasPower = homePower !== awayPower;

  const totalPower = homePower + awayPower;

  const rnd = Math.random() * totalPower;

  const [l, w] = generateRandomScore();
  let homeScore: number, awayScore: number;

  if ((hasPower && rnd < homePower) || Math.random() < 0.5) { // eğer home kazandıysa
    homeScore = w; // kazanan skor
    awayScore = l; // kaybeden skor
  }
  else { // eğer away kazandıysa veya berabere ise
    homeScore = l;
    awayScore = w;
  }
  return [homeScore, awayScore];
}
