// Self-hosted GitHub stats cards for the profile README.
// Runs in GitHub Actions (see .github/workflows/stats.yml), writes SVGs to assets/stats/.
// No third-party services: data comes straight from the GitHub GraphQL API.
//   GITHUB_TOKEN  – token for the API (Actions' built-in token works; a PAT adds private contributions)
//   GH_LOGIN      – username (default KriXsh)
//   MOCK=1        – render with fake data (for local previews)
const fs = require('fs');
const path = require('path');

const LOGIN = process.env.GH_LOGIN || 'KriXsh';
const OUT = path.join(__dirname, '..', 'assets', 'stats');
const C = { ink: '#070A11', surface: '#0B1019', tile: '#0F1522', border: '#1E2A40', navy: '#13264A',
  sapphire: '#2A4F8F', steel: '#4A74C4', ice: '#8FB3E8', brass: '#E4CFA8', ivory: '#E8EBF0', muted: '#9EA8B8', dim: '#6B7689' };
const FONT = `'Segoe UI',Ubuntu,'Helvetica Neue',sans-serif`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = n => n >= 10000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : n.toLocaleString('en-US');

async function gql(query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'profile-stats' },
    body: JSON.stringify({ query, variables }),
  });
  const j = await res.json();
  if (!res.ok || j.errors) throw new Error(JSON.stringify(j.errors || j));
  return j.data;
}

async function fetchData() {
  const base = await gql(`query($login:String!){ user(login:$login){
    followers{totalCount}
    pullRequests{totalCount}
    issues{totalCount}
    repositories(ownerAffiliations:OWNER,isFork:false,first:100,orderBy:{field:STARGAZERS,direction:DESC}){
      totalCount
      nodes{ stargazerCount languages(first:10,orderBy:{field:SIZE,direction:DESC}){ edges{ size node{ name color } } } }
    }
    contributionsCollection{ contributionYears totalCommitContributions restrictedContributionsCount }
  }}`, { login: LOGIN });
  const u = base.user;
  // every year's calendar, for all-time totals and streaks across year boundaries
  const days = [];
  let allTime = 0;
  for (const y of u.contributionsCollection.contributionYears) {
    const d = await gql(`query($login:String!,$from:DateTime!,$to:DateTime!){ user(login:$login){
      contributionsCollection(from:$from,to:$to){ contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount } } } } } }`,
      { login: LOGIN, from: `${y}-01-01T00:00:00Z`, to: `${y}-12-31T23:59:59Z` });
    const cal = d.user.contributionsCollection.contributionCalendar;
    allTime += cal.totalContributions;
    cal.weeks.forEach(w => w.contributionDays.forEach(x => days.push({ date: x.date, count: x.contributionCount })));
  }
  const langs = {};
  for (const r of u.repositories.nodes) for (const e of r.languages.edges) {
    langs[e.node.name] ??= { size: 0, color: e.node.color || C.steel };
    langs[e.node.name].size += e.size;
  }
  // de-duplicate dates across year queries and drop future days
  const today = new Date().toISOString().slice(0, 10);
  const byDate = new Map();
  for (const x of days) if (x.date <= today) byDate.set(x.date, Math.max(x.count, byDate.get(x.date) || 0));
  const clean = [...byDate].map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date));
  return {
    followers: u.followers.totalCount, prs: u.pullRequests.totalCount, issues: u.issues.totalCount,
    repos: u.repositories.totalCount, stars: u.repositories.nodes.reduce((a, r) => a + r.stargazerCount, 0),
    commitsYear: u.contributionsCollection.totalCommitContributions + u.contributionsCollection.restrictedContributionsCount,
    allTime, days: clean, langs,
  };
}

function mockData() {
  const days = []; const now = new Date();
  for (let i = 730; i >= 0; i--) {
    const d = new Date(now - i * 864e5);
    days.push({ date: d.toISOString().slice(0, 10), count: Math.random() < .25 ? 0 : Math.floor(Math.random() ** 2 * 18) });
  }
  return { followers: 128, prs: 214, issues: 37, repos: 46, stars: 312, commitsYear: 1480,
    allTime: days.reduce((a, d) => a + d.count, 0), days,
    langs: { TypeScript: { size: 9e5, color: '#3178c6' }, JavaScript: { size: 6e5, color: '#f1e05a' }, Python: { size: 4e5, color: '#3572A5' },
      CSS: { size: 2e5, color: '#563d7c' }, HTML: { size: 1.2e5, color: '#e34c26' }, Java: { size: 8e4, color: '#b07219' }, Shell: { size: 3e4, color: '#89e051' }, Dockerfile: { size: 1e4, color: '#384d54' } } };
}

// ---------- helpers ----------
const frame = (w, h, title, body, extraStyle = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<style>
text{font-family:${FONT}}
.h{font-size:13px;font-weight:600;letter-spacing:3px;fill:${C.brass}}
.k{font-size:12.5px;fill:${C.muted}}
.v{font-size:15px;font-weight:700;fill:${C.ivory}}
.f{opacity:0;animation:in .7s ease-out forwards}
@keyframes in{to{opacity:1}}
@media (prefers-reduced-motion:reduce){.f{animation:none;opacity:1}}
${extraStyle}
</style>
<rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="16" fill="${C.surface}" stroke="${C.border}"/>
<text x="26" y="36" class="h">${esc(title.toUpperCase())}</text>
${body}
</svg>`;

// tiny 24x24 line icons (drawn here, no icon service)
const ICON = {
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  commit: 'M12 8a4 4 0 100 8 4 4 0 000-8zM2 12h6M16 12h6',
  pr: 'M6 3v12M6 15a3 3 0 100 6 3 3 0 000-6zM6 3a3 3 0 100 0M18 21V9a3 3 0 00-3-3h-4m0 0l3-3m-3 3l3 3',
  issue: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 8v5M12 16v.5',
  repo: 'M5 4a2 2 0 012-2h12v16H7a2 2 0 00-2 2zM5 20a2 2 0 002 2h12v-4',
  people: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M16 3.5a4 4 0 010 7M22 21v-1a6 6 0 00-4-5.6',
  flame: 'M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-1 2-2 4-2 7 0 5 3 8 7 8z',
};
const icon = (k, x, y, col = C.ice, fill = 'none') => `<svg x="${x}" y="${y}" width="18" height="18" viewBox="0 0 24 24" fill="${fill}" stroke="${col}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${ICON[k]}"/></svg>`;

// ---------- cards ----------
function overview(d) {
  const year = new Date().getUTCFullYear();
  const rows = [['star', 'Total stars earned', d.stars], ['commit', `Commits (${year})`, d.commitsYear], ['pr', 'Pull requests', d.prs],
    ['issue', 'Issues', d.issues], ['repo', 'Public repositories', d.repos], ['people', 'Followers', d.followers]];
  const body = rows.map(([ic, k, v], i) => { const y = 62 + i * 27;
    return `<g class="f" style="animation-delay:${i * .08}s">${icon(ic, 26, y - 13)}<text x="54" y="${y + 1}" class="k">${esc(k)}</text><text x="414" y="${y + 1}" class="v" text-anchor="end">${fmt(v)}</text></g>`; }).join('\n');
  return frame(440, 236, 'GitHub stats', body);
}

function languages(d) {
  const list = Object.entries(d.langs).sort((a, b) => b[1].size - a[1].size).slice(0, 8);
  const total = list.reduce((a, [, v]) => a + v.size, 0) || 1;
  let x = 26; const W = 388;
  const bar = list.map(([, v], i) => { const w = Math.max(2, (v.size / total) * W); const r = `<rect x="${x}" y="54" width="${w}" height="10" fill="${v.color}"/>`; x += w; return r; }).join('');
  const items = list.map(([n, v], i) => { const col = i % 2, row = Math.floor(i / 2); const X = 26 + col * 200, Y = 96 + row * 32;
    return `<g class="f" style="animation-delay:${i * .06}s"><circle cx="${X + 6}" cy="${Y - 4}" r="5" fill="${v.color}"/><text x="${X + 18}" y="${Y}" class="k" style="fill:${C.ivory}">${esc(n)}</text><text x="${X + 184}" y="${Y}" class="k" text-anchor="end">${(v.size / total * 100).toFixed(1)}%</text></g>`; }).join('\n');
  return frame(440, 236, 'Top languages', `<clipPath id="bc"><rect x="26" y="54" width="${W}" height="10" rx="5"/></clipPath><g clip-path="url(#bc)">${bar}</g>\n${items}`);
}

function streaks(days) {
  const today = new Date().toISOString().slice(0, 10);
  const past = days.filter(x => x.date <= today).sort((a, b) => a.date.localeCompare(b.date));
  let longest = 0, run = 0, runStart = null, longS = null, longE = null;
  for (const x of past) {
    if (x.count > 0) { if (!run) runStart = x.date; run++; if (run > longest) { longest = run; longS = runStart; longE = x.date; } } else run = 0;
  }
  // current streak: today may still be 0 without breaking it
  let i = past.length - 1; if (i >= 0 && past[i].count === 0) i--;
  let cur = 0, curS = null, curE = i >= 0 ? past[i].date : null;
  while (i >= 0 && past[i].count > 0) { cur++; curS = past[i].date; i--; }
  return { cur, curS, curE: cur ? curE : null, longest, longS, longE, first: past[0]?.date };
}
const nice = s => s ? new Date(s + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '';

function streakCard(d) {
  const s = streaks(d.days);
  const col = (cx, big, label, sub, delay, ring) => `<g class="f" style="animation-delay:${delay}s">
${ring ? `<circle cx="${cx}" cy="104" r="40" fill="none" stroke="${C.sapphire}" stroke-width="5"/><circle cx="${cx}" cy="64" r="13" fill="${C.surface}"/>${icon('flame', cx - 9, 55, C.ice, C.surface)}` : ''}
<text x="${cx}" y="${ring ? 113 : 108}" text-anchor="middle" style="font-size:28px;font-weight:700;fill:${C.ivory}">${fmt(big)}</text>
<text x="${cx}" y="172" text-anchor="middle" style="font-size:14px;font-weight:600;fill:${C.brass}">${esc(label)}</text>
<text x="${cx}" y="194" text-anchor="middle" style="font-size:12px;fill:${C.dim}">${esc(sub)}</text></g>`;
  const body = [
    col(147, d.allTime, 'Total contributions', `${nice(s.first)} – Present`, 0, false),
    `<line x1="293" y1="60" x2="293" y2="196" stroke="${C.border}"/><line x1="587" y1="60" x2="587" y2="196" stroke="${C.border}"/>`,
    col(440, s.cur, 'Current streak', s.cur ? `${nice(s.curS)} – ${nice(s.curE)}` : 'Start one today', .1, true),
    col(733, s.longest, 'Longest streak', s.longest ? `${nice(s.longS)} – ${nice(s.longE)}` : '—', .2, false),
  ].join('\n');
  return frame(880, 220, 'Streak', body);
}

function activity(d) {
  const W = 880, H = 300, L = 56, R = 28, T = 64, B = 52;
  const today = new Date().toISOString().slice(0, 10);
  const last = d.days.filter(x => x.date <= today).sort((a, b) => a.date.localeCompare(b.date)).slice(-31);
  const max = Math.max(4, ...last.map(x => x.count));
  const step = Math.ceil(max / 4); const top = step * 4;
  const X = i => L + i * ((W - L - R) / (last.length - 1)), Y = v => T + (H - T - B) * (1 - v / top);
  const pts = last.map((x, i) => [X(i), Y(x.count)]);
  // smooth line (Catmull-Rom → Bezier)
  let line = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    line += ` C${p1[0] + (p2[0] - p0[0]) / 6},${Math.min(Y(0), p1[1] + (p2[1] - p0[1]) / 6)} ${p2[0] - (p3[0] - p1[0]) / 6},${Math.min(Y(0), p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]},${p2[1]}`;
  }
  const area = `${line} L${X(last.length - 1)},${Y(0)} L${X(0)},${Y(0)}Z`;
  const grid = [0, 1, 2, 3, 4].map(k => `<line x1="${L}" x2="${W - R}" y1="${Y(k * step)}" y2="${Y(k * step)}" stroke="${C.border}" ${k ? 'stroke-dasharray="3 5"' : ''}/><text x="${L - 12}" y="${Y(k * step) + 4}" text-anchor="end" class="k" style="font-size:11px">${k * step}</text>`).join('');
  const xl = last.map((x, i) => i % 5 === 0 || i === last.length - 1 ? `<text x="${X(i)}" y="${H - 24}" text-anchor="middle" class="k" style="font-size:11px">${nice(x.date).replace(/, \d{4}$/, '')}</text>` : '').join('');
  const dots = pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="3.2" fill="${C.surface}" stroke="${C.ice}" stroke-width="1.8"/>`).join('');
  const sum = last.reduce((a, x) => a + x.count, 0);
  const body = `<defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.steel}" stop-opacity=".45"/><stop offset="1" stop-color="${C.navy}" stop-opacity="0"/></linearGradient></defs>
<text x="${W - 26}" y="36" text-anchor="end" class="k">${fmt(sum)} contributions · last 31 days</text>
${grid}${xl}
<path d="${area}" fill="url(#ag)" class="f"/>
<path d="${line}" fill="none" stroke="${C.brass}" stroke-width="2.4" stroke-linejoin="round" class="draw"/>
<g class="f" style="animation-delay:.6s">${dots}</g>`;
  return frame(W, H, 'Contribution activity', body,
    `.draw{stroke-dasharray:3000;stroke-dashoffset:3000;animation:dr 1.6s ease-out forwards}@keyframes dr{to{stroke-dashoffset:0}}@media (prefers-reduced-motion:reduce){.draw{animation:none;stroke-dashoffset:0}}`);
}

function heatmap(d) {
  const today = new Date().toISOString().slice(0, 10);
  const days = d.days.filter(x => x.date <= today).sort((a, b) => a.date.localeCompare(b.date)).slice(-371);
  // align so columns are weeks starting Sunday
  const firstDow = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
  const cells = [], S = 12, G = 3, L = 50, T = 70;
  const nz = days.map(x => x.count).filter(Boolean).sort((a, b) => a - b);
  const q = p => nz.length ? nz[Math.floor(p * (nz.length - 1))] : 1;
  const th = [q(.25), q(.5), q(.75)];
  const shade = c => !c ? C.tile : c <= th[0] ? '#1B3462' : c <= th[1] ? C.sapphire : c <= th[2] ? C.steel : C.brass;
  let months = '', lastM = -1;
  days.forEach((x, i) => {
    const idx = i + firstDow, col = Math.floor(idx / 7), row = idx % 7;
    const cx = L + col * (S + G), cy = T + row * (S + G);
    cells.push(`<rect x="${cx}" y="${cy}" width="${S}" height="${S}" rx="3" fill="${shade(x.count)}"><title>${x.count} on ${x.date}</title></rect>`);
    const m = new Date(x.date + 'T00:00:00Z').getUTCMonth();
    if (row === 0 && m !== lastM) { if (col < 52) months += `<text x="${cx}" y="${T - 10}" class="k" style="font-size:11px">${new Date(x.date + 'T00:00:00Z').toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })}</text>`; lastM = m; }
  });
  const dl = ['Mon', 'Wed', 'Fri'].map((n, i) => `<text x="${L - 10}" y="${T + (1 + i * 2) * (S + G) + 10}" text-anchor="end" class="k" style="font-size:11px">${n}</text>`).join('');
  const legend = [C.tile, '#1B3462', C.sapphire, C.steel, C.brass].map((c, i) => `<rect x="${740 + i * 17}" y="196" width="${S}" height="${S}" rx="3" fill="${c}"/>`).join('');
  const total = days.reduce((a, x) => a + x.count, 0);
  return frame(880, 230, 'Last 12 months', `<text x="854" y="36" text-anchor="end" class="k">${fmt(total)} contributions</text>
${months}${dl}<g class="f">${cells.join('')}</g>
<text x="732" y="207" text-anchor="end" class="k" style="font-size:11px">Less</text>${legend}<text x="828" y="207" class="k" style="font-size:11px">More</text>`);
}

function pills(d) {
  const items = [['people', 'Followers', d.followers], ['star', 'Stars', d.stars], ['repo', 'Repos', d.repos]];
  let x = 0; const parts = items.map(([ic, k, v]) => { const w = 40 + k.length * 8.2 + 14 + String(fmt(v)).length * 8.6 + 16;
    const g = `<g transform="translate(${x} 0)"><rect x=".5" y=".5" width="${w - 1}" height="35" rx="10" fill="${C.surface}" stroke="${C.border}"/>${icon(ic, 14, 9)}<text x="40" y="23" style="font-size:13px;font-weight:600;fill:${C.brass}">${esc(k)}</text><text x="${w - 14}" y="23" text-anchor="end" style="font-size:13px;font-weight:700;fill:${C.ivory}">${fmt(v)}</text></g>`;
    x += w + 10; return g; });
  const W = Math.round(x - 10);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="36" viewBox="0 0 ${W} 36" role="img" aria-label="${items.map(([, k, v]) => `${k} ${v}`).join(', ')}"><style>text{font-family:${FONT}}</style>${parts.join('')}</svg>`;
}

(async () => {
  const d = process.env.MOCK ? mockData() : await fetchData();
  fs.mkdirSync(OUT, { recursive: true });
  const files = { 'overview.svg': overview(d), 'languages.svg': languages(d), 'streak.svg': streakCard(d),
    'activity.svg': activity(d), 'heatmap.svg': heatmap(d), 'pills.svg': pills(d) };
  for (const [f, s] of Object.entries(files)) fs.writeFileSync(path.join(OUT, f), s);
  console.log('wrote', Object.keys(files).join(', '));
})().catch(e => { console.error(e); process.exit(1); });
