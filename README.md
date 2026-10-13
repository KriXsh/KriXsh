<!-- krish.service — a profile README written as a system spec.
     Midnight & Brass: ink #070A11 · navy #13264A · sapphire #2A4F8F · steel #4A74C4
     ice #8FB3E8 · champagne #E4CFA8 · ivory #E8EBF0 -->

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:070A11,45:13264A,100:2A4F8F&height=140&section=header&text=Krishnendu%20Ghosal&fontSize=38&fontColor=E4CFA8&fontAlignY=38&desc=krish.service%20%C2%B7%20Full-Stack%20%C2%B7%20AI%2FML%20%C2%B7%20Cloud&descAlignY=62&descSize=13&descColor=8FB3E8&animation=fadeIn" width="100%" alt="Krishnendu Ghosal" />

<p align="center">
  <a href="https://krish-portfolio-six.vercel.app">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=15&duration=2600&pause=700&color=E4CFA8&center=true&vCenter=true&width=720&lines=%24+systemctl+start+krish.service;%5B+OK+%5D+Mounted+full-stack+%C2%B7+Next.js+%C2%B7+Node.js+%C2%B7+Python;%5B+OK+%5D+Started+ai-runtime+%C2%B7+SageMaker+%C2%B7+Bedrock;%5B+OK+%5D+Reached+event-bus+%C2%B7+Kafka+%C2%B7+Kubernetes;I+engineer+systems+that+think%2C+scale+%26+connect." alt="krish.service boot sequence" />
  </a>
</p>

<p align="center">
  <a href="https://krish-portfolio-six.vercel.app"><img src="https://img.shields.io/badge/Portfolio-070A11?style=for-the-badge&logo=vercel&logoColor=E4CFA8" height="22" alt="Portfolio"/></a>
  <a href="https://www.linkedin.com/in/krish-me/"><img src="https://img.shields.io/badge/LinkedIn-13264A?style=for-the-badge&logo=linkedin&logoColor=E4CFA8" height="22" alt="LinkedIn"/></a>
  <a href="mailto:krishnendughosal999@gmail.com"><img src="https://img.shields.io/badge/Gmail-2A4F8F?style=for-the-badge&logo=gmail&logoColor=E4CFA8" height="22" alt="Gmail"/></a>
  <a href="https://drive.google.com/file/d/17IshLoqvq43ccBGErfJb_26s0oQ0feUK/view?usp=sharing"><img src="https://img.shields.io/badge/Resume-E4CFA8?style=for-the-badge&logo=googledrive&logoColor=070A11" height="22" alt="Resume"/></a>
</p>
<p align="center">
  <a href="https://github.com/KriXsh?tab=followers"><img src="https://img.shields.io/github/followers/KriXsh?label=Followers&style=flat-square&logo=github&color=13264A&labelColor=070A11" height="18" alt="Followers"/></a>
  <a href="https://github.com/KriXsh"><img src="https://img.shields.io/github/stars/KriXsh?affiliations=OWNER&label=Stars&style=flat-square&logo=github&color=2A4F8F&labelColor=070A11" height="18" alt="Stars"/></a>
  <a href="https://twitter.com/krishxxoo"><img src="https://img.shields.io/badge/Follow-@krishxxoo-4A74C4?style=flat-square&logo=x&logoColor=E8EBF0&labelColor=070A11" height="18" alt="Follow on X"/></a>
  <a href="https://github.com/sponsors/KriXsh"><img src="https://img.shields.io/badge/Sponsor-E4CFA8?style=flat-square&logo=githubsponsors&logoColor=070A11&labelColor=070A11" height="18" alt="Sponsor"/></a>
</p>

<p align="center"><sub><code>RFC-KRISH-001</code> &nbsp;·&nbsp; Status: <b>Production</b> &nbsp;·&nbsp; Region: India → worldwide &nbsp;·&nbsp; Open to: new projects &amp; remote roles</sub></p>

<p align="center"><sub>
<a href="#-01--whoami">01 whoami</a> ·
<a href="#-02--architecture">02 architecture</a> ·
<a href="#-03--changelog">03 changelog</a> ·
<a href="#-04--deployments">04 deployments</a> ·
<a href="#-05--dependencies">05 dependencies</a> ·
<a href="#-06--telemetry">06 telemetry</a> ·
<a href="#-07--signed-artifacts">07 signed artifacts</a> ·
<a href="#-08--open-ports">08 open ports</a>
</sub></p>

---

## ✦ 01 · whoami

<table>
<tr>
<td width="28%" align="center" valign="top">
  <img src="https://github.com/KriXsh.png?size=240" width="100" alt="Krish" /><br/>
  <sub><code>GET /api/v1/krish</code><br/><b>200 OK</b></sub>
</td>
<td width="72%" valign="top">

```jsonc
{
  "name": "Krishnendu Ghosal",
  "role": ["Full-Stack Developer", "AI/ML Engineer", "Cloud & DevOps"],
  "current": {
    "org": "Ironbook AI",
    "shipping": ["speech-to-text & voice services", "customer data platforms",
                 "Kafka-driven pipelines on Kubernetes"]
  },
  "experience": { "years": "3+", "companies": 5,
                  "domains": ["Gov-Tech", "Fintech", "B2B Enterprise", "B2C Digital"] },
  "learning":  ["LLM agents", "RAG", "MLOps", "large-scale system design"],
  "ask_me_about": ["Next.js", "Node.js", "Python", "Kafka", "Kubernetes",
                   "SageMaker", "Bedrock", "Redis", "MongoDB", "Elasticsearch"]
}
```

</td>
</tr>
</table>

> **Design principle.** Code is poetry, systems are symphonies, and great software is the intersection of engineering excellence and user delight.

---

## ✦ 02 · architecture

How a problem moves through me, drawn the way I'd draw any other system.

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'background':'#070A11','primaryColor':'#13264A','primaryTextColor':'#E8EBF0',
  'primaryBorderColor':'#4A74C4','lineColor':'#8FB3E8','secondaryColor':'#0B1019',
  'tertiaryColor':'#0B1019','clusterBkg':'#0B1019','clusterBorder':'#2A4F8F',
  'fontFamily':'Inter, ui-sans-serif, system-ui'}}}%%
flowchart LR
  P([Problem]):::in --> M{{Measure first}}
  M --> D[Design<br/>RBAC from the first schema]
  D --> B[Build<br/>Next.js · Node · Python]
  B --> E[[Event bus<br/>Kafka · Argo]]
  E --> AI[AI layer<br/>SageMaker · Bedrock · STT/TTS]
  E --> DB[(Mongo · Redis<br/>Postgres · Elastic)]
  AI --> S[Ship<br/>Docker · K8s · CI/CD]
  DB --> S
  S --> U([Real users]):::out
  U -. feedback .-> M
  classDef in  fill:#2A4F8F,stroke:#E4CFA8,color:#E4CFA8;
  classDef out fill:#E4CFA8,stroke:#E4CFA8,color:#070A11;
```

| <sub>SLO</sub> | <sub>Principle</sub> | <sub>Reference</sub> |
|:-:|:--|:--|
| <sub>`p0`</sub> | <sub>**Production over demos**: AI that ships and holds up under real users</sub> | <sub>[Case study: Voice AI, speech in, speech out](https://krish-portfolio-six.vercel.app/case-studies/ironbook-voice-ai)</sub> |
| <sub>`p1`</sub> | <sub>**Measure, then optimise**: numbers before opinions</sub> | <sub>[Case study: a secure, fast API platform for fintech](https://krish-portfolio-six.vercel.app/case-studies/invincible-ocean-api-platform)</sub> |
| <sub>`p2`</sub> | <sub>**Security is architecture**: access control from the first schema</sub> | <sub>[Blog: RBAC done right](https://krish-portfolio-six.vercel.app/blog/rbac-done-right)</sub> |
| <sub>`p3`</sub> | <sub>**Automate the path to prod**: releases should be boring</sub> | <sub>[Blog: Zero-downtime deploys](https://krish-portfolio-six.vercel.app/blog/zero-downtime-deploys)</sub> |

---

## ✦ 03 · changelog

```diff
$ git log --oneline --graph career

* (HEAD -> ironbook-ai) feat(ai): manage agent lifecycles on AWS SageMaker & Bedrock
*   feat(voice): ship speech-to-text and voice features end to end
*   feat(pipeline): event-driven async systems on Kafka
*   feat(migration): large-scale data migrations with Argo Workflows on Kubernetes
|
* feat(gov-tech): media monitoring for 60 Government of India ministries
*   + crawlers across 200+ newspapers, YouTube and X
*   + STT / TTS APIs and prompt-engineered AI layer
|
* feat(security): RBAC with JWT and AWS IAM across frontend, backend, infra
|
* perf(api): architect 350+ APIs
+   MongoDB response time  -40%
+   downtime               -40%
+   server performance     +25%
|
* ci(devops): Docker · Kubernetes · Jenkins / GitLab CI
+   deployment time        -40%
+   delivery speed      +40–50%
|
* init: B.Tech CSE, Lovely Professional University (2019 – 2023)
```

---

## ✦ 04 · deployments

| <sub>Service</sub> | <sub>What it does</sub> | <sub>Stack</sub> | <sub>Status</sub> |
|:--|:--|:--|:-:|
| <sub>[**StockX AI Portal**](https://stock-x-ai.vercel.app)</sub> | <sub>Live pricing, AI market recaps and sentiment-tagged news</sub> | <sub>Next.js · AI recaps · live market data</sub> | <sub>🟢 live</sub> |
| <sub>[**LMS Portal**](https://lms-ed-teach-eight.vercel.app)</sub> | <sub>Production-level EdTech platform for courses and learners</sub> | <sub>Next.js 15 · TypeScript · MongoDB</sub> | <sub>🟢 live</sub> |
| <sub>[**Pathfinding Visualizer**](https://pathfinding-visualizer-theta-puce.vercel.app/)</sub> | <sub>Dijkstra, A\*, BFS and DFS on a live, editable grid</sub> | <sub>Next.js · TypeScript · Framer Motion</sub> | <sub>🟢 live</sub> |
| <sub>[**SortFusion**](https://sort-fusion-ui.vercel.app)</sub> | <sub>Every compare and swap of eight sorting algorithms, visualized</sub> | <sub>Next.js · TypeScript · Framer Motion</sub> | <sub>🟢 live</sub> |

<p align="center"><a href="https://krish-portfolio-six.vercel.app/projects"><img src="https://img.shields.io/badge/View_all_projects-→-E4CFA8?style=for-the-badge&labelColor=13264A" height="22" alt="View all projects"/></a></p>

---

## ✦ 05 · dependencies

<details open>
<summary><code>package.lock</code> &nbsp;—&nbsp; resolved tree</summary>
<br/>

**`web`**
<p align="left"><img src="https://skillicons.dev/icons?i=nextjs,react,redux,ts,js,nodejs,express,graphql,tailwind,bootstrap,html,css&theme=dark&perline=12" height="28" alt="Next.js, React, Redux, TypeScript, JavaScript, Node.js, Express, GraphQL, Tailwind, Bootstrap, HTML5, CSS3" /></p>

**`ai / ml`**
<p align="left">
  <img src="https://skillicons.dev/icons?i=pytorch,tensorflow,aws&theme=dark" height="28" alt="PyTorch, TensorFlow, AWS" />
  <br/>
  <img src="https://img.shields.io/badge/Hugging_Face-13264A?style=flat-square&logo=huggingface&logoColor=FFD21E" height="18" alt="Hugging Face"/>
  <img src="https://img.shields.io/badge/LangChain-13264A?style=flat-square&logo=langchain&logoColor=E8EBF0" height="18" alt="LangChain"/>
  <img src="https://img.shields.io/badge/Claude-13264A?style=flat-square&logo=anthropic&logoColor=E4CFA8" height="18" alt="Claude"/>
  <img src="https://img.shields.io/badge/SageMaker-13264A?style=flat-square" height="18" alt="AWS SageMaker"/>
  <img src="https://img.shields.io/badge/Bedrock-13264A?style=flat-square" height="18" alt="AWS Bedrock"/>
</p>

**`cloud / devops`**
<p align="left"><img src="https://skillicons.dev/icons?i=aws,azure,kubernetes,docker,kafka,jenkins,githubactions,gitlab,nginx,linux,bash&theme=dark&perline=11" height="28" alt="AWS, Azure, Kubernetes, Docker, Kafka, Jenkins, GitHub Actions, GitLab, Nginx, Linux, Bash" /></p>

**`data`**
<p align="left"><img src="https://skillicons.dev/icons?i=mongodb,redis,postgres,mysql,elasticsearch&theme=dark" height="28" alt="MongoDB, Redis, PostgreSQL, MySQL, Elasticsearch" /></p>

**`languages / tools`**
<p align="left"><img src="https://skillicons.dev/icons?i=python,java,git,postman,selenium&theme=dark" height="28" alt="Python, Java, Git, Postman, Selenium" /></p>

</details>

---

## ✦ 06 · telemetry

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=KriXsh&show_icons=true&hide_border=true&card_width=450&bg_color=070A11&title_color=E4CFA8&text_color=E8EBF0&icon_color=8FB3E8&ring_color=4A74C4" height="100" alt="GitHub stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=KriXsh&layout=compact&langs_count=8&hide_border=true&card_width=450&bg_color=070A11&title_color=E4CFA8&text_color=E8EBF0" height="100" alt="Top languages" />
  <img src="https://streak-stats.demolab.com?user=KriXsh&hide_border=true&card_width=450&card_height=195&background=070A11&ring=4A74C4&fire=E4CFA8&currStreakLabel=E4CFA8&sideLabels=8FB3E8&currStreakNum=E8EBF0&sideNums=E8EBF0&dates=4A74C4&stroke=13264A" height="100" alt="Total contributions, current streak and longest streak" />
</p>

---

## ✦ 07 · signed artifacts

<table align="center">
<tr>
<td align="center" width="50%">
  <img src="https://img.shields.io/badge/Anthropic-070A11?style=for-the-badge&logo=anthropic&logoColor=E4CFA8" height="22" alt="Anthropic"/><br/><br/>
  <a href="https://drive.google.com/file/d/1Dqg8pcfCLSiwoBrOsk82gu8Op_jLdvJS/view"><b>Claude Certified Developer – Foundations</b></a><br/>
  <sub><code>sig: verified · Credly</code></sub>
</td>
<td align="center" width="50%">
  <img src="https://img.shields.io/badge/Anthropic-070A11?style=for-the-badge&logo=anthropic&logoColor=E4CFA8" height="22" alt="Anthropic"/><br/><br/>
  <a href="https://www.credly.com/badges/cd067e9d-a3b6-4224-a063-086cdfdcc67b/public_url"><b>Claude Certified Associate – Foundations</b></a><br/>
  <sub><code>sig: verified · Credly</code></sub>
</td>
</tr>
</table>

<details>
<summary><b>More artifacts</b> &nbsp;<sub>(8)</sub></summary>
<br/>

| | <sub>Certification</sub> | <sub>Issuer</sub> |
|:-:|:--|:--|
| <sub>🥇</sub> | <sub>Jumpstart – Publicis Sapient Competitive Coding Event</sub> | <sub>Publicis Sapient</sub> |
| <sub>🌐</sub> | <sub>ACE Multicloud Network Associate</sub> | <sub>Aviatrix</sub> |
| <sub>☕</sub> | <sub>[Java Foundations Certification](https://www.hackerrank.com/certificates/a9ef7324ba06)</sub> | <sub>HackerRank</sub> |
| <sub>⚛️</sub> | <sub>React Redux Training</sub> | <sub>Cipher Schools</sub> |
| <sub>🤖</sub> | <sub>Artificial Intelligence Fundamentals</sub> | <sub>Invincible Ocean</sub> |
| <sub>🛡️</sub> | <sub>Website Hacking / Penetration Testing</sub> | <sub>Udemy</sub> |
| <sub>💻</sub> | <sub>Web Development Bootcamp</sub> | <sub>Udemy</sub> |
| <sub>🐍</sub> | <sub>Object-Oriented Programming Using Python</sub> | <sub>E-Box</sub> |

</details>

---

## ✦ 08 · open ports

```console
$ netstat -krish --listening
PORT    SERVICE        STATUS
443     portfolio      LISTEN   → krish-portfolio-six.vercel.app
587     email          LISTEN   → krishnendughosal999@gmail.com
8080    linkedin       LISTEN   → in/krish-me
9000    collaboration  LISTEN   → new projects · remote roles
```

<p align="center">
  <a href="https://krish-portfolio-six.vercel.app"><img src="https://img.shields.io/badge/Portfolio-070A11?style=for-the-badge&logo=vercel&logoColor=E4CFA8" height="22" alt="Portfolio"/></a>
  <a href="https://www.linkedin.com/in/krish-me/"><img src="https://img.shields.io/badge/LinkedIn-13264A?style=for-the-badge&logo=linkedin&logoColor=E4CFA8" height="22" alt="LinkedIn"/></a>
  <a href="https://twitter.com/krishxxoo"><img src="https://img.shields.io/badge/X-13264A?style=for-the-badge&logo=x&logoColor=E4CFA8" height="22" alt="X"/></a>
  <a href="https://instagram.com/krishxxoo"><img src="https://img.shields.io/badge/Instagram-13264A?style=for-the-badge&logo=instagram&logoColor=E4CFA8" height="22" alt="Instagram"/></a>
  <a href="https://leetcode.com/u/KriXsh999/"><img src="https://img.shields.io/badge/LeetCode-2A4F8F?style=for-the-badge&logo=leetcode&logoColor=E4CFA8" height="22" alt="LeetCode"/></a>
  <a href="https://www.hackerrank.com/profile/krishnendughosa1"><img src="https://img.shields.io/badge/HackerRank-2A4F8F?style=for-the-badge&logo=hackerrank&logoColor=E4CFA8" height="22" alt="HackerRank"/></a>
  <a href="https://www.codechef.com/users/krishnendu_99"><img src="https://img.shields.io/badge/CodeChef-2A4F8F?style=for-the-badge&logo=codechef&logoColor=E4CFA8" height="22" alt="CodeChef"/></a>
  <a href="mailto:krishnendughosal999@gmail.com"><img src="https://img.shields.io/badge/Gmail-E4CFA8?style=for-the-badge&logo=gmail&logoColor=070A11" height="22" alt="Gmail"/></a>
</p>

<p align="center"><sub><code>$ systemctl status krish.service</code> &nbsp;→&nbsp; <b>● active (running)</b> &nbsp;·&nbsp; thanks for visiting ✦</sub></p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2A4F8F,55:13264A,100:070A11&height=70&section=footer" width="100%" alt="" />
