export function computeLeaderboard(wagers) {
  const totals = new Map();

  for (const wager of wagers) {
    const name = wager.playerName?.trim() || 'Unknown';
    const amount = Number(wager.amount) || 0;
    const current = totals.get(name) || 0;
    totals.set(name, current + amount);
  }

  return Array.from(totals.entries())
    .map(([playerName, totalWagered]) => ({
      playerName,
      totalWagered,
      totalBets: wagers.filter((wager) => (wager.playerName || 'Unknown').trim() === playerName).length
    }))
    .sort((a, b) => b.totalWagered - a.totalWagered)
    .slice(0, 10)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
}

export function summarizeWagers(wagers) {
  const totalWagers = wagers.reduce((sum, wager) => sum + (Number(wager.amount) || 0), 0);
  const topPlayer = computeLeaderboard(wagers)[0]?.playerName || 'N/A';

  return {
    totalWagers,
    totalBets: wagers.length,
    topPlayer
  };
}
