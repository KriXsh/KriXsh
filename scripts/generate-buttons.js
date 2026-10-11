const s=require('simple-icons');const fs=require('fs');
const g=k=>s['si'+k[0].toUpperCase()+k.slice(1)];
const B=[ // file, label, icon, iconColor, style
['portfolio','Portfolio','vercel','E8EBF0','blue'],['linkedin','LinkedIn','linkedin','0A66C2','dark'],
['gmail','Gmail','gmail','EA4335','blue'],['resume','Resume','googledrive','E4CFA8','dark'],
['x','X','x','E8EBF0','blue'],['instagram','Instagram','instagram','E4405F','dark'],
['leetcode','LeetCode','leetcode','FFA116','blue'],['hackerrank','HackerRank','hackerrank','00EA64','dark'],
['codechef','CodeChef','codechef','C9A27E','blue'],['github','GitHub','github','E8EBF0','dark'],
['follow-x','Follow on X','x','E8EBF0','blue'],['sponsor','Sponsor','githubsponsors','EA4AAA','dark'],
['all-projects','View all projects  →',null,null,'blue'],['anthropic','Anthropic','claude','D97757','blue'],
];
const esc=t=>t.replace(/&/g,'&amp;');
fs.mkdirSync('out/assets/buttons',{recursive:true});
for(const [f,label,ic,col,st] of B){
  const tw=label.length*8.4, iconW=ic?26:0, W=Math.round(28+iconW+tw), H=40;
  const bg=st==='blue'?'url(#g)':'#0B1019', stroke=st==='blue'?'#4A74C4':'#2A3A58';
  const icon=ic?`<svg x="16" y="11" width="18" height="18" viewBox="0 0 24 24"><path fill="#${col}" d="${g(ic).path}"/></svg>`:'';
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#13264A"/><stop offset="1" stop-color="#2A4F8F"/></linearGradient></defs>
<rect x=".5" y=".5" width="${W-1}" height="${H-1}" rx="10" fill="${bg}" stroke="${stroke}"/>
${icon}<text x="${16+iconW}" y="25" font-family="'Segoe UI',Ubuntu,'Helvetica Neue',sans-serif" font-size="13" font-weight="600" letter-spacing=".6" fill="${st==='blue'?'#E8EBF0':'#E4CFA8'}">${esc(label)}</text></svg>`;
  fs.writeFileSync(`out/assets/buttons/${f}.svg`,svg);
}
