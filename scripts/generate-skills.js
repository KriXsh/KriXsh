const s=require('simple-icons');const fs=require('fs');
const get=k=>{const o=s['si'+k[0].toUpperCase()+k.slice(1)];return {path:o.path,hex:o.hex}};
// Azure isn't in simple-icons (trademark removal) – simple custom glyph
const azure={hex:'0078D4',path:'M9.6 2.4 3 19.5h4.6L13.4 2.4zM14.4 6.6l-3.1 8.6 5.3 4.4H6.9L5.5 21.6H21z'};
const I=(label,key,hex)=>{const ic=key==='azure'?azure:get(key);return {label,path:ic.path,hex:hex||ic.hex}};
const groups={
 web:['Web',[I('Next.js','nextdotjs'),I('React','react'),I('Redux','redux'),I('TypeScript','typescript'),I('JavaScript','javascript'),I('Node.js','nodedotjs'),I('Express','express'),I('GraphQL','graphql'),I('Tailwind','tailwindcss'),I('Bootstrap','bootstrap'),I('HTML5','html5'),I('CSS3','css3')]],
 ai:['AI & ML',[I('PyTorch','pytorch'),I('TensorFlow','tensorflow'),I('Hugging Face','huggingface'),I('LangChain','langchain','8FD3C1'),I('Claude','claude'),I('SageMaker','amazonwebservices','01A88D'),I('Bedrock','amazonwebservices','8C6BF0')]],
 cloud:['Cloud & DevOps',[I('AWS','amazonwebservices','FF9900'),I('Azure','azure'),I('Kubernetes','kubernetes'),I('Docker','docker'),I('Kafka','apachekafka'),I('Jenkins','jenkins'),I('Actions','githubactions'),I('GitLab','gitlab'),I('Nginx','nginx'),I('Linux','linux'),I('Bash','gnubash')]],
 data:['Databases',[I('MongoDB','mongodb'),I('Redis','redis'),I('PostgreSQL','postgresql'),I('MySQL','mysql'),I('Elasticsearch','elasticsearch')]],
 lang:['Languages & Tools',[I('Python','python'),I('Java','openjdk','F89820'),I('Git','git'),I('Postman','postman'),I('Selenium','selenium')]],
};
const lum=h=>{const c=[0,2,4].map(i=>parseInt(h.substr(i,2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const esc=t=>t.replace(/&/g,'&amp;');
const W=880,TW=128,TH=112,GAP=12,COLS=6,PAD=28,HEAD=54;
for(const [id,[title,items]] of Object.entries(groups)){
  const rows=Math.ceil(items.length/COLS),H=HEAD+rows*TH+(rows-1)*GAP+PAD;
  let tiles='';const titleW=title.length*12.5;
  items.forEach((it,i)=>{
    const r=Math.floor(i/COLS),inRow=Math.min(COLS,items.length-r*COLS);
    const rowW=inRow*TW+(inRow-1)*GAP,x0=(W-rowW)/2;
    const x=x0+(i%COLS)*(TW+GAP),y=HEAD+r*(TH+GAP);
    const col=lum(it.hex)<0.06?'E8EBF0':it.hex;
    tiles+=`<g class="t" style="animation-delay:${(i*0.06).toFixed(2)}s" transform="translate(${x} ${y})">
<rect width="${TW}" height="${TH}" rx="16" fill="#0F1522" stroke="#1E2A40"/>
<rect x="34" y="0" width="${TW-68}" height="2" rx="1" fill="#${col}" opacity=".85"/>
<circle cx="${TW/2}" cy="44" r="26" fill="#${col}" opacity=".10"/>
<svg x="${TW/2-18}" y="26" width="36" height="36" viewBox="0 0 24 24"><path fill="#${col}" d="${it.path}"/></svg>
<text x="${TW/2}" y="94" text-anchor="middle" class="l">${esc(it.label)}</text></g>\n`;
  });
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}: ${items.map(i=>esc(i.label)).join(', ')}">
<style>
.h{font:600 13px 'Segoe UI',Ubuntu,'Helvetica Neue',sans-serif;letter-spacing:4px;fill:#E4CFA8}
.l{font:500 13px 'Segoe UI',Ubuntu,'Helvetica Neue',sans-serif;fill:#C9D1DD}
.t{opacity:0;animation:up .6s ease-out forwards}
@keyframes up{to{opacity:1}}
@media (prefers-reduced-motion:reduce){.t{animation:none;opacity:1}}
</style>
<rect x=".5" y=".5" width="${W-1}" height="${H-1}" rx="20" fill="#070A11" stroke="#1E2A40"/>
<text x="${W/2}" y="34" text-anchor="middle" class="h">${esc(title.toUpperCase())}</text>
<path d="M${W/2-titleW/2-22} 25l4 4-4 4-4-4zM${W/2+titleW/2+22} 25l4 4-4 4-4-4z" fill="#8FB3E8"/>
${tiles}</svg>`;
  fs.mkdirSync('out/assets/skills',{recursive:true});
  fs.writeFileSync(`out/assets/skills/${id}.svg`,svg);
}
