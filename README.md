# leaderboards
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RustyWager - Code Leaderboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://lucide.dev/lucide.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">

  <!-- Header -->
  <header class="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-amber-500 text-slate-950 p-2 rounded-lg font-black text-xl">RW</div>
        <div>
          <h1 class="text-xl font-bold tracking-wide">RustyWager Leaderboard</h1>
          <p class="text-xs text-slate-400">Track top wagers by affiliate / creator code</p>
        </div>
      </div>
      <a href="https://rustywager.com" target="_blank" rel="noopener noreferrer" 
         class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg transition-all text-sm">
        Visit RustyWager.com &rarr;
      </a>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 py-8 space-y-10">

    <!-- Top 3 Podium Section -->
    <section>
      <h2 class="text-lg font-semibold text-slate-400 mb-6 text-center">Top Performing Codes</h2>
      <div id="podium" class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <!-- JS injects top 3 here -->
      </div>
    </section>

    <!-- Controls (Search & Filters) -->
    <section class="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full md:w-80">
        <input type="text" id="searchInput" placeholder="Search code or creator..." 
               class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 pl-10 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition">
        <svg class="w-4 h-4 text-slate-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto">
        <span class="text-xs text-slate-400 uppercase tracking-wider">Timeframe:</span>
        <button class="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-md text-xs">All Time</button>
        <button class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs transition">Monthly</button>
        <button class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs transition">Weekly</button>
      </div>
    </section>

    <!-- Full Leaderboard Table -->
    <section class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
              <th class="p-4 w-16 text-center">Rank</th>
              <th class="p-4">Affiliate Code</th>
              <th class="p-4">Creator / Owner</th>
              <th class="p-4 text-right">Active Users</th>
              <th class="p-4 text-right">Total Wagered</th>
            </tr>
          </thead>
          <tbody id="leaderboardBody" class="divide-y divide-slate-800/50 text-sm">
            <!-- JS injects rows here -->
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <script>
    // Sample Data - replace with real API call or backend fetch
    const leaderboardData = [
      { rank: 1, code: "RUSTKING", creator: "RustKing_TV", users: 1420, wagered: 248500.50 },
      { rank: 2, code: "GAMBLE", creator: "GambleGod", users: 980, wagered: 184200.00 },
      { rank: 3, code: "SKINS", creator: "SkinMaster", users: 810, wagered: 142100.75 },
      { rank: 4, code: "LUCKY7", creator: "Lucky7_Rust", users: 650, wagered: 98400.00 },
      { rank: 5, code: "WAGER100", creator: "ProWagerer", users: 510, wagered: 76300.20 },
      { rank: 6, code: "CLANRUST", creator: "RustClanOffical", users: 430, wagered: 62100.00 },
      { rank: 7, code: "BONUS", creator: "BonusHunter", users: 390, wagered: 54000.00 },
      { rank: 8, code: "VIPCODE", creator: "VIP_Gamer", users: 280, wagered: 41200.50 }
    ];

    function formatUSD(val) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    }

    function renderPodium(data) {
      const podiumEl = document.getElementById('podium');
      const top3 = [data[1], data[0], data[2]]; // Order: 2nd, 1st, 3rd place visually

      podiumEl.innerHTML = top3.map((item, index) => {
        if (!item) return '';
        const isFirst = item.rank === 1;
        const color = isFirst ? 'amber-500' : item.rank === 2 ? 'slate-300' : 'amber-700';
        const height = isFirst ? 'h-52' : 'h-44';

        return `
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center flex flex-col justify-between ${height} relative shadow-lg ${isFirst ? 'ring-2 ring-amber-500/50' : ''}">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-${color} text-slate-950 font-black flex items-center justify-center text-sm shadow">
              ${item.rank}
            </div>
            <div class="mt-2">
              <span class="bg-amber-500/10 text-amber-400 font-mono text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                ${item.code}
              </span>
              <p class="text-sm text-slate-400 mt-1">${item.creator}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase tracking-wider">Total Wagered</p>
              <p class="text-xl font-extrabold text-slate-100">${formatUSD(item.wagered)}</p>
            </div>
          </div>
        `;
      }).join('');
    }

    function renderTable(data) {
      const tbody = document.getElementById('leaderboardBody');
      tbody.innerHTML = data.map(item => `
        <tr class="hover:bg-slate-800/30 transition">
          <td class="p-4 text-center font-extrabold text-slate-400">#${item.rank}</td>
          <td class="p-4 font-mono font-bold text-amber-400">${item.code}</td>
          <td class="p-4 text-slate-200 font-medium">${item.creator}</td>
          <td class="p-4 text-right text-slate-400 font-mono">${item.users.toLocaleString()}</td>
          <td class="p-4 text-right font-extrabold text-slate-100 font-mono">${formatUSD(item.wagered)}</td>
        </tr>
      `).join('');
    }

    // Filter Logic
    document.getElementById('searchInput').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = leaderboardData.filter(d => 
        d.code.toLowerCase().includes(q) || d.creator.toLowerCase().includes(q)
      );
      renderTable(filtered);
    });

    // Initial render
    renderPodium(leaderboardData);
    renderTable(leaderboardData);
  </script>
</body>
</html>