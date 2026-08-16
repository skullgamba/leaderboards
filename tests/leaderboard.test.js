import test from 'node:test';
import assert from 'node:assert/strict';
import { computeLeaderboard, summarizeWagers } from '../leaderboard.js';

test('groups wagers by player and ranks the top 10 by total wagered', () => {
  const wagers = [
    { id: 1, playerName: 'Alex', site: 'BetZone', amount: 250 },
    { id: 2, playerName: 'Sam', site: 'BetZone', amount: 500 },
    { id: 3, playerName: 'Alex', site: 'BetZone', amount: 700 },
    { id: 4, playerName: 'Jamie', site: 'LuckySpin', amount: 120 },
    { id: 5, playerName: 'Sam', site: 'LuckySpin', amount: 300 },
    { id: 6, playerName: 'Morgan', site: 'BetZone', amount: 175 },
    { id: 7, playerName: 'Tori', site: 'LuckySpin', amount: 1000 },
    { id: 8, playerName: 'Jamie', site: 'LuckySpin', amount: 80 }
  ];

  const leaderboard = computeLeaderboard(wagers);

  assert.equal(leaderboard[0].playerName, 'Tori');
  assert.equal(leaderboard[0].totalWagered, 1000);
  assert.equal(leaderboard[1].playerName, 'Alex');
  assert.equal(leaderboard[1].totalWagered, 950);
  assert.equal(leaderboard[2].playerName, 'Sam');
  assert.equal(leaderboard[2].totalWagered, 800);
  assert.equal(leaderboard.length, 5);
});

test('summarizes total wagers and top bettor correctly', () => {
  const wages = [
    { id: 1, playerName: 'Alex', amount: 150 },
    { id: 2, playerName: 'Sam', amount: 300 },
    { id: 3, playerName: 'Alex', amount: 200 },
    { id: 4, playerName: 'Jordan', amount: 50 }
  ];

  const summary = summarizeWagers(wages);

  assert.equal(summary.totalWagers, 700);
  assert.equal(summary.totalBets, 4);
  assert.equal(summary.topPlayer, 'Alex');
});
