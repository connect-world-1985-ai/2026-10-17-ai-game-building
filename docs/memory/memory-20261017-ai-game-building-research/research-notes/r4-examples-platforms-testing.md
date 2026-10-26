# R4 — Documented agent-built games, AI game-builder platforms, world models, agent game-testing

Research date / access date for every URL below: **2026-10-17** (unless a row says otherwise).
Tooling: `WebSearch` / `WebFetch` (cursor namespace) + `gh api` for GitHub numbers.
Author: research subagent R4. Scope: facts only; no tutorial prose.

## 0. Method, labels, caveats

### Evidence labels (used on every claim)

| Label | Meaning |
|---|---|
| **Verified** | Primary source I actually retrieved (repo, official post/docs, paper, original tweet text via archive) AND the claim is stated there. For "built-by-agent" examples: public code and/or exact prompt exist. |
| **Practice** | Credible but not independently reproduced by me: vendor demo with public prompt/skill, secondary reporting of a primary source, widely used engineering practice documented in official docs. |
| **Unverified** | Single secondary/third-party source, aggregator, community post, influencer tweet, or search-engine summary that I could not trace to a primary source. |
| **Promotional** | Vendor/influencer marketing claim (launch demo, revenue brag, roadmap promise). May still be partly true — see notes. |

### Caveats

- Model names in this report (e.g. "Claude Fable 5", "GPT-5.6 Sol", "Gemini 3.1 Pro") are quoted from 2026 sources as retrieved; I did not independently confirm model lineups.
- X/Twitter posts are not fetchable; where a tweet is cited I used an archive/mirror and say so.
- The search tool returns an LLM "synthesis" plus snippets. I only keep numbers that appear in a retrieved snippet/page or a `gh api` call, and I corrected one synthesis error (TITAN numbers, §4.5).
- GitHub numbers: `gh api repos/OWNER/REPO` run 2026-10-17 (see §6).
- Not retrieved (see §9): Replit/Bolt/Lovable pricing, Roblox Assistant pricing, Oasis 1 details, Vibe Jam 2026 official entry count (vibejam.com returned HTTP 403 to WebFetch).

---

## 1. Documented agent-built games

### 1.1 Master table (classification)

| # | Example | Date | Claim | Evidence found | Classification |
|---|---|---|---|---|---|
| 1 | Karpathy "vibe coding" tweet | 2025-02-02 | Coins term; "forget the code exists", Accept All, "throwaway weekend projects" | Original tweet text via archive.is + Thread Reader + MIT Tech Review quote | **Verified** (as origin/definition; it is not a game) |
| 2 | fly.pieter.com (Pieter Levels) | 2025-02-22 → | Multiplayer 3D flight sim built in ~3 h with Cursor; $1M ARR in 17 days | Live site; Levels' own build log (tweets, not retrievable); no public repo (vanilla HTML/JS served to browser) | Build: **Practice**; revenue: **Promotional** (self-reported run-rate) |
| 3 | Vibe Jam 2025 | 2025-03 → 2025-04-23 | ≥80% AI code; 1,170 entries | Official rules page, Indie Hackers, levels.io winners page | Rules/results **Verified**; "80% enforced" **Unverified** (no audit method found) |
| 4 | Vibe Jam 2026 (Cursor Vibe Jam) | 2026-04-01 → 2026-05-01 | ≥90% AI code; $40k cash; "close to production quality" | vibejam.com snippet, press page, levels.io winners post | Rules/winners **Verified**; quality claim **Promotional** (host + sponsor judges); entry count (945) **Unverified** |
| 5 | Simon Willison — Raccoon Heist (Claude Fable 5, Claude Code web) | 2026-08-05 | One prompt → 3D browser game | Verbatim prompt, repo `simonw/raccoon-heist`, shared session + transcript, his own verdict "not a good game" | **Verified** |
| 6 | Simon Willison — Moonlight & Mayhem (Codex + GPT-5.6 Sol Ultra) | 2026-08-07 | Same prompt, better game | Blog post + repo + full transcript; **needed 2 follow-up prompts** to fix giant-eyeball bug | **Verified** (one-shot + 2 fixes) |
| 7 | OpenAI Codex-app launch racing game | 2026-02-02 | Three.js voxel kart racer, 8 maps, items; 7M+ tokens; one initial prompt | OpenAI post (prompt, skills, game, earlier iterations published) | **Practice** (vendor-run, public artifacts; "one prompt" qualified by auto follow-ups, see §1.4) |
| 8 | OpenAI GPT-5.3-Codex: racing v2 + diving game | 2026 (post date not in snippet) | Autonomous iteration "over millions of tokens" using generic follow-ups | OpenAI post; playable links | **Practice** |
| 9 | GPT-5.6 Sol live build "RF-Zero" (Ray Fernando) | 2026-07-10 | One goal prompt → multiplayer F-Zero clone playable in ~30 min | Third-party livestream summary (moderncreator.app) | **Unverified** |
| 10 | Anthropic Claude Fable 5 launch demos (Snake, Strata, Duino, isochronic map) | 2026-06-09 | Playable games from single prompts in Claude Code | TechCrunch hands-on; Ethan Mollick created them; prompts not retrieved | **Promotional** (vendor launch) with partial independent hands-on |
| 11 | "Titanic game in two prompts" (@MisbahSy) | 2026-06-11 | Fable 5 → Three.js game on Netlify | Single tweet mirror | **Unverified** |
| 12 | Gemini 3 "retro 3D spaceship game with a single prompt" | Gemini 3 launch (date not in retrieved snippet) | Single-file Three.js synthwave shooter | Full prompt in YouTube description; bundled AI Studio app link | **Practice** (vendor demo, reproducible prompt) |
| 13 | xAI "great AI-generated game before end of next year" | 2025-02-18 / 2025-10-06 | xAI game studio will ship an AI game by end-2026 | Musk tweet (via VGC/Kotaku); no playable game; goalpost shifted to 2027 | **Promotional** (unfulfilled as of 2026-10-17) |
| 14 | Roblox: 44% of top-1,000 creators use Assistant/MCP | 2026-04 | Agentic Studio | Roblox newsroom; footnote defines window | **Promotional** (self-reported stat; footnoted methodology) |

### 1.2 Detailed evidence per example

#### Karpathy "vibe coding" (origin)
- Tweet 2025-02-02 23:17 (archive.is snapshot 2025-02-03): "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists… I 'Accept All' always, I don't read the diffs anymore… It's not too bad for throwaway weekend projects, but still quite amusing." — https://archive.is/yNSTA ; mirror https://postcutoff.com/p/x-karpathy-1886192184808149383/ (shows 7,362,208 views at fetch). **Verified**
- Context for the tutorial: the originator explicitly scoped it to *throwaway weekend projects* using Cursor Composer + Sonnet. MIT Technology Review 2025-04-16: "not all AI-assisted coding is vibe coding" — https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/ **Verified**

#### fly.pieter.com
- Levels' page: started 2025-02-22, "mostly live on X", "$1M ARR in just 17 days", "over 100M views on X" (counted by "someone" — second-hand). https://levels.io/fly-pieter-com-vibecoded-flight-simulator — **Verified** that he claims this; the numbers themselves **Promotional/Unverified**.
- First prompt (as quoted by a third-party article quoting the tweet): "make a 3d flying game in browser with skyscrapers"; then "many questions and comments" → "official Flight Simulator in vanilla HTML and JS". https://promptway.com/blog/pieter-levels-flight-sim-to-zero — **Unverified** (secondary quote of a tweet I could not fetch).
- Stack: Cursor + Three.js; multiplayer server = Python websockets "receives and broadcasts all player positions every 100ms", written by **Grok 3** per Levels. https://zadely.com/games/flight-simulator/ (last checked 2026-10-15), https://ofershap.github.io/posts/how-fly-pieter-com-reached-30000-a-month-with-ai/ — **Practice**.
- Live splash text: "by @levelsio + Cursor + ThreeJS… 100% made with AI"; Cessna free, Cyberpink free, **F-16 $29.99**. https://fly.pieter.com/ — **Verified** (live as of 2026-10-15 per Zadely).
- Monetization: first adds shooting + multiplayer same day; next day Stripe Buy Button; F-16s then blimps/billboard ad slots. https://linton.ai/the-vibe-coded-game-that-went-from-0-to-1m-arr-in-17-days-and-the-people-who-are-livid-about-it-f8adb49c4b21 — **Practice**.
- Revenue facts (conflicting, see §8): tweet quoted by Promptway "$87,000 MRR (which is $1M ARR)" at day 17; Vibe Hackers "peaked over $100K/month"; OfErshap "$30,000 a month". ARR here is a **run-rate extrapolation of one-off ad/skin purchases**, not recognized revenue.
- Aftermath: Levels' own project list classifies it as "Okay: Took off, made money but not sustainable" (his taxonomy). https://levels.io/projects ; analysis https://stealwhatworks.com/blogs/news/pieter-levels-still-making-money — **Practice**. Promptway headline "Then It Went to Zero" is **Unverified** (no figures shown).
- Important disclosures for "one prompt" myth: Levels is a 10+-year production dev (Nomad List, Remote OK) — "never made a game" ≠ "never coded"; first playable took ~3 h but shooting/multiplayer/server/monetization were many follow-up iterations over days; ~100M X views = distribution, not engineering. (Linton article: "proven, production-level developer".) **Practice**.

#### Vibe Jam 2025 (Bolt Vibe Coding Game Jam)
- Rules: ≥80% of code/assets AI-written; instantly playable on web, no login/signup/loading screens; free-to-play on own (sub)domain; any engine, Three.js recommended; add participant snippet in submit form. https://vibejam.com/2025/ , https://vibej.am/2025/ — **Verified**.
- Teams 1–4 members; sponsors Bolt.new, CodeRabbit, Lambda; 1,170 submissions; winners: 1) The Great Taxi Assignment (Tomas Bencko, $10,000), 2) Vibeware (Matt Gordon, $5,000), 3) Vector Tango (Scobel, $2,500). https://www.indiehackers.com/post/tech/pieter-levels-just-announced-the-winners-of-the-2025-vibe-code-game-jam-Uz0wHG4pI3KBOiFhP5YR (dated 2025-04-23) — **Verified**.
- Judges: @karpathy, @timsoret, @mrdoob, @s13k_, Levels. https://levels.io/winners-of-the-2025-vibe-code-game-jam — **Verified**. Levels' remark: "vast majority of people participating never made a game before" and "Vibe coding still has its limitations".
- Date conflict: indielessons says winners announced 2025-03-26; Indie Hackers/levels.io project list say 2025-04-23 (§8).
- Prize pool 2025: $17,500 (vibejam.com/2026/press). **Verified**.

#### Vibe Jam 2026 (Cursor Vibe Jam)
- 2026-04-01 → deadline 2026-05-01 13:37 UTC; **≥90%** AI code; new games only (started on/after 2026-04-01); one entry per person; web, free, no login; "no loading screens and heavy downloads"; multiplayer preferred. https://vibejam.com/ , https://vibejam.com/2026/press — **Verified**.
- Prizes: press page "$40,000 cash — $25k/$10k/$5k"; site header says "$50,000+ total" incl. 12 special prizes (conflict, §8).
- Winners (levels.io post): 1) A Game About Capybaras Delivering Food (@leocooout, $25,000); 2) Fanto's Mega-Mart (@e_c_t_o, $10,000); 3) WenWare (@underpaid_mom, $5,000; also "Bolt most played"). Judges: Levels, s13k_, Nicola Manzini, OverJumpRally, Eric Zakariasson (Cursor), Tim Soret. https://levels.io/vibe-jam-2026-winners-quality — **Verified**.
- Quality claim: Tim Soret: "next year (or maybe 6 months at the given rate), it will match many game devs. Not the top 20%, but a 3rd year student yes!" — host-published quote → **Promotional/Practice**.
- Third-party stats "945 games, 242,000+ players, ~12M X views": https://www.summerengine.com/blog/cursor-vibe-jam-2026-guide — **Unverified** (vendor blog of a Godot-AI tool; also lists wrong Gold = $20,000 on a sibling page, §8).
- Levels' own entry (outside competition): DroneSim.com — "FPV drone war simulator MMO vibe coded by me" (levels.io/projects, 2026-04). **Practice**.
- Enforcement: the 90% rule is a rule, not an audit; no verification procedure found. **Unverified**.

#### Simon Willison — Raccoon Heist (best-documented public example)
- Post: https://simonwillison.net/2026/Aug/5/raccoon-heist/ ; repo https://github.com/simonw/raccoon-heist (17 stars, no license detected, last push 2026-08-05); playable https://simonw.github.io/raccoon-heist/ ; shared Claude Code session + exported transcript linked from README.
- Setup: Claude Fable 5 in **Claude Code for web**, repo served by GitHub Pages so he could preview; entire project on phone; two reference images from a 2022 DALL-E tweet.
- **Verbatim prompt (7 lines)**: "Build this 3D game, for the browser. / This repo is configured to serve static files so make sure there is an index.html that loads everything else. / Make sure it is mobile-friendly… / You have an OpenAI API key… use gpt-image-2 for textures… / Work independently - do not ask me to make any further design decisions… / Commit and push as often as possible… start with an index.html that presents a title screen… / Append to a notes.md file…"
- What the agent did (from his transcript review): vendored Three.js, wrote `gen_textures.py`, generated 7 textures + title art with `gpt-image-2`, **smoke-tested in pre-installed Chromium with Playwright** (desktop + portrait-phone + landscape-phone), found real bugs (canvas 2× on phones; win-screen CSS swallowing taps), 7 commits, procedural WebAudio audio, localStorage best run.
- Hidden template? None disclosed; he made "no technology choices"; model picked Three.js.
- His verdict (primary): "an impressive starting point, but it's not a good game… boring… very easy to beat… There are no team mechanics at all"; "I've vibe coded up quite a few games now. They've all been deeply disappointing from a gameplay perspective — it turns out designing games that are fun remains a uniquely human trait."
- Update 2026-08-07: same prompt to Codex Desktop + GPT-5.6 Sol Ultra ("aggressive use of sub-agents") → "Moonlight & Mayhem", "a much better game" — but it shipped with a giant-sphere eyeball bug fixed via **two follow-up prompts** ("Why do the raccoons have huge black spheres on them?" / "Fix it"). https://simonwillison.net/2026/Aug/7/moonlight-mayhem/ — **Verified**.
- Classification: **Verified** (code + prompt + transcript reproducible; tool + date are public; outputs are non-deterministic so a re-run will differ).
- Related practice he documents: single-file "HTML tools" pattern, "no React", copy transcripts into a Gist — https://simonwillison.net/2025/Dec/10/html-tools/ (150+ LLM-written tools). **Verified**.

#### OpenAI Codex-app launch racing game
- https://openai.com/index/introducing-the-codex-app/ (2026-02-02): "racing game… different racers, eight maps, and items players could use with the space bar. Using an image generation skill (GPT Image) and a web game development skill, Codex built the game by working independently using more than 7 million tokens with just one initial user prompt. It took on the roles of designer, game developer, and QA tester… We've included the game, as well as the prompt and skills used… You can also try out earlier iterations." — **Verified** that OpenAI says this; reproducibility **Practice** (verbatim prompt not retrievable in my fetch; links stripped).
- Nuance (secondary): "repeatedly re-prompted from a random list of ten generic prompts such as finding what's missing, adding features, testing and fixing bugs" — https://agentusecases.ai/use-case/build-a-racing-game-from-a-single-prompt ; the follow-on OpenAI post says GPT-5.3-Codex iterated "using the develop web game skill and preselected, generic follow-up prompts like 'fix the bug' or 'improve the game'… over millions of tokens" — https://openai.com/index/introducing-gpt-5-3-codex/ . So: **one *human-written* prompt + scripted generic re-prompts + 7M tokens**, not one model call.
- The "web game development skill" is public: `develop-web-game` in `openai/skills` (28,118 stars): requires a single canvas, `window.render_game_to_text` (concise game-state JSON) and `window.advanceTime(ms)` (deterministic frame stepping), runs a bundled Playwright client with virtual-time stepping, screenshots, console error buffer. https://github.com/openai/skills/blob/82d2c5b4/skills/.curated/develop-web-game/SKILL.md ; https://www.skills.sh/openai/skills/develop-web-game ("First Seen Feb 1, 2026") — **Verified**. (My `gh` tree grep for "game" returned nothing on current `main`; the skill is only visible via the pinned commit/mirrors — check before telling readers to `npx skills add`.)
- "The source gives no quality assessment" (agentusecases). Hands-on quality judgement for this specific game: not found. **Open question.**

#### GPT-5.6 Sol live build (RF-Zero)
- https://moderncreator.app/2026-07-10-ray-fernando-live-build-with-gpt-5-6-sol : Codex "goal mode", single goal prompt, sub-agents for SpacetimeDB backend + Three.js + browser testing, playable & deployed to Vercel in ~30 min; "crashes and low FPS surface"; viewers' feedback queued back; backend rewritten TS→Rust on request. Third-party transcript summary → **Unverified**; note it involved a **backend framework (SpacetimeDB) chosen in the prompt** (a template-like constraint) and many live feedback rounds.

#### Anthropic Fable 5 launch demos
- 2026-06-09 launch; TechCrunch: Mollick generated games "via one initial prompt in Claude Code": Snake, Strata (underground lantern-lighting; "graphics look like a degraded Myst — they aren't great"), Duino (Rilke-inspired; "not much to the gameplay other than walking around"). https://techcrunch.com/2026/06/09/anthropics-fable-5-can-make-weirdly-fun-video-games-with-the-click-of-a-button/ — independent hands-on, **Practice**.
- Same launch: Fable 5 playing Pokémon FireRed by vision, Slay the Spire "third floor more often" — https://www.gameshub.com/news/news/claude-fable-5-beats-pokemon-firered-2880647/ . That is **agents *playing* games** (benchmark-style), not *building* them; keep separate in the tutorial.
- Prompts for the four demos: not retrieved. **Promotional** until prompts/repos are found.

#### Gemini 3 single-prompt spaceship game
- Prompt is public in the video description (Three.js, single `index.html`, synthwave, desktop + mobile joystick, particle explosions; "Do not output any other text other than the html response"). https://www.youtube.com/watch?v=qOL49DYWr7s ; bundled app https://aistudio.google.com/apps/bundled/synthwave_space ; Gemini 3 post (claims "WebDev Arena 1487 Elo", "zero-shot generation") https://blog.google/products-and-platforms/products/gemini/gemini-3/ — **Practice**; the prompt is ~500+ words of design spec → it is a *spec*, not "a short prompt".
- Third-party how-to pages (pandaitech) show shorter prompts but one targets "Gemini 1.5 Pro" and admits "graphics might be slightly cutoff… on the first try" — **Unverified**, low quality.

#### xAI game studio
- 2025-02-18 (Grok 3 stream): "We're launching an AI gaming studio at xAI" — Grok 3 demoed a Tetris-like game in Python. https://www.tomshardware.com/tech-industry/artificial-intelligence/musk-announces-grok-3-powered-xai-gaming-studio-to-develop-ai-games-with-photo-realistic-graphics
- 2025-10-06 tweet: "The xAI game studio will release a great AI-generated game before the end of next year." https://www.videogameschronicle.com/news/elon-musk-says-his-xai-company-will-release-a-great-ai-generated-game-by-the-end-of-2026/ ; Kotaku reaction https://kotaku.com/baldurs-gate-3-larian-studios-elon-musk-ai-xai-douse-2000632638
- Status 2026-10-17: nothing playable at promised scope; Musk later said "real-time, high-quality shows and video games at scale… in 2027"; shipped feature = "Build Mode" (simple games/apps from chat) per https://gamevibe.io/elon-musk-promised-an-ai-made-game-by-the-end-of-2026-the-games-industry-isnt-buying-it/ (secondary). **Promotional**; Build Mode details **Unverified**.

### 1.3 Benchmarks and papers on LLM game generation / play

| Name | What it measures | Key numbers (as stated) | Date / venue | Code | Label |
|---|---|---|---|---|---|
| **GameDevBench** (Chi et al.) | Agents solving 333 Godot 4 tasks from tutorials (multimodal) | Best agent **53.8%** pass@1 (gemini-cli + gemini-3-pro-preview, screenshot+video). GPT-5.4: 41.1% → 52.0% with visual feedback. Claude Code + Sonnet 4.5: 28.8% → 34.8%. Gameplay tasks 51.4% vs 2D-graphics tasks 33.0%. | arXiv 2602.11103 v2 (2026) — https://arxiv.org/html/2602.11103v2 | https://github.com/waynchi/gamedevbench (142★, Apache-2.0) | **Verified** (models are 2026-H1; stale by Oct 2026) |
| **V-GameGym** | Visual game generation for code LLMs | (numbers not retrieved) | Findings of ACL 2026 (cited in GAMEGO) | not checked | **Unverified** (existence via citation) |
| **WebGameBench** | requirement-to-app delivery for browser-native games | not retrieved | arXiv 2605.17637 (cited in GAMEGO) | — | **Unverified** |
| **GameXpert-Bench** | initial gen, bug repair, multi-turn optimisation | not retrieved | arXiv 2608.21833 (listed in aggregator) | — | **Unverified** |
| **GameGo / GameGoBench** | PRD-driven game-dev agents; 124 tasks (47 2D, 22 2.5D, 55 3D); 55,060 synthetic trajectories | "comparable to frontier models"; "code, datasets, models **will be** public" | arXiv 2610.06910, 2026-10-02 — https://arxiv.org/html/2610.06910 | promised | **Verified** (paper) / release **Unverified** |
| **WorldBench** (Krish Bakshi) | Judging LLM-written Three.js voxel worlds | Visual vs code-based judging **disagree on 32%** of required items across 5 frontier models; mutation test: code-only judge gave full credit to **4 of 5** removed features; judge cut credit kept on removed features 5.44 → 3.55 of 7.11 | arXiv 2026-10-07 (via https://gamedev.net/news/6322-worldbench-evaluating-llms-on-threejs-voxel-world-generation/) | released per article | **Practice** (secondary report) |
| **lmgame-Bench** | LLMs *playing* 6 games (Gym API, perception/memory scaffolds), 13 models | RL on one game transfers to others | arXiv 2505.15146 (2025-05), ICLR 2026 | https://github.com/lmgame-org/GamingAgent (992★, MIT) | **Verified** |
| **GameArena** | LLM reasoning through 3 live human games (Akinator, Taboo, Bluffing) | 2,000+ sessions; 100-person user study | ICLR 2025, arXiv 2412.06394 | lmgame-org | **Verified** |
| **GBQA** | LLMs as QA engineers: 30 games, 124 human-verified bugs | Best (Claude-4.6-Opus thinking) finds only **48.39%** | arXiv 2604.02648 (2026-04-03), ICLR 2026 workshop | — | **Verified** |

Takeaway: the benchmark literature (a) is mostly Godot/web, (b) shows agents solve roughly half of realistic tasks, (c) shows visual feedback helps by ~3–11 points absolute in GameDevBench, (d) shows code-reading alone overcredits missing features (WorldBench).

### 1.4 What "one prompt" actually meant in the documented cases

| Case | Human-authored prompts | Hidden/explicit scaffolding | Iterations | Result quality evidence |
|---|---|---|---|---|
| Raccoon Heist (Claude) | 1 (7 lines + 2 images) | Claude Code web, GitHub Pages preview, OpenAI image API key supplied by user, Playwright preinstalled in sandbox | 7 commits, autonomous | Author: "not a good game" |
| Moonlight & Mayhem (Codex) | 1 + 2 fix prompts | Codex Desktop, sub-agents, `gpt-image-2` | autonomous | Author: "much better game" |
| Codex racing game | 1 (long) | `develop-web-game` skill + imagegen skill; scripted generic re-prompts | 7M+ tokens | none independent |
| Gemini 3 spaceship | 1 (long spec) | AI Studio bundled app; Three.js via CDN | 1 shot | vendor claim |
| fly.pieter.com | many (days of tweets) | Cursor, 10-yr dev driving, Grok 3 for server | dozens+ | live, popular, monetized |
| Vibe Jam winners | unknown | rules allow libraries/engines; AI ≥80/90% | unknown | host/judges' scores |

Conclusion (evidence-based): the credible "one prompt" claims are really **one detailed prompt + a harness (skills, Playwright, image API) + many autonomous model iterations + often a small number of human fix prompts**, producing a *playable but shallow* game. None of the retrieved evidence shows a one-prompt game that reviewers consider *fun* or deep.

---

## 2. AI game-builder platforms (state as of 2026-10-17)

### 2.1 Summary table

| Platform | What it is | Pricing (dated) | Export / own your code | Licence / ToS notes | Label |
|---|---|---|---|---|---|
| **Rosebud AI** | Browser AI game maker (JS code + art + audio) | Free: 8,000 credits, weekly refill in eligible regions. Tiers by credits/mo seen: 300,000 (10× Dev, full commercial rights), 1,000,000 (Pro: code download desktop-only + Windows export), 2,000,000 (Scale). Prices not in retrieved snippet. (rosebud.ai/pricing, 2026-10-17) | Code view/edit: Indie Dev+; **code download + Windows export: Pro+** (Rosebud FAQ). Independent test 2026-10-10: free account preview worked, CODE locked, Export disabled. | **ToS: "Rosebud shall own… any data, content, code, artwork… created or generated as a result of any Prompt"**, while pricing page says 10× Dev+ get full commercial rights & no commission. Privacy: anonymised data may be sold/licensed to "frontier" AI labs, **no opt-out**. | **Verified** (own docs) — conflict flagged §8 |
| **Google AI Studio "Build"** | Prompt → full-stack web app (also Android Kotlin) with live preview; code tab; deploy | Pricing not retrieved (AI Studio / Gemini API tiers) | Code visible/editable in Code tab; GitHub/ZIP export not verified in snippet | n/a retrieved | **Verified** (docs) https://ai.google.dev/gemini-api/docs/aistudio-build-mode |
| **Bezi** | AI assistant/agent for **Unity** projects | Trial 100 credits; Pro **$20/mo** 800; Advanced **$60/mo** 2,400; Ultimate **$180/mo** 7,200; Team **$200/mo** 8,000 pooled/3 seats; on-demand $0.05/credit (docs.bezi.com/account/plans, bezi.com/pricing) | Your Unity project stays yours (works inside Unity) — ownership terms not retrieved | not retrieved | **Verified** (pricing) |
| **Ludo.ai** | Game idea + 2D/3D asset/animation/audio generation; API/MCP/CLI + Unity plugin on Pro+ | Trial 30 credits; Indie $20/mo ($15 annual) 250 cr/mo; Pro $50/mo ($35 annual) 1,000 cr/mo; Studio $350/mo (10 seats, 10,000 cr/mo; $300 annual) (ludo.ai/pricing, /developers, /docs/game-asset-generation) | Assets exported as files; API/CLI/MCP only Pro+ | not retrieved | **Verified** |
| **Astrocade** | Prompt→playable web games + social feed/remix + creator payouts | Official blog: "100% free… every tool". Aggregator (aichief, "Updated Jun 3, 2025/2026"?) lists Free / Creator $9.99 / Pro $19.99 incl. "commercial license, API access". **Conflict.** Creator Economy: 100,000 plays in 30 days to qualify; claims $50k+ paid out in one month, up to $2,000/creator/month (self-reported) | Not verified | not retrieved | Pricing: **Unverified/conflict**; payouts: **Promotional** — https://www.astrocade.com/blog/why-should-you-create-games-on-astrocade |
| **Websim** | Prompt-to-web-page social platform | Official 2026-01-12: creator program, video rewards, free daily credits **discontinued**; credits via engagement/tips/purchase/Starter/Pro. A "shutdown" rumour was an April-Fools bit per community posts. https://websim.com/blog/update-on-daily-credits | not retrieved | not retrieved | Credits change **Verified**; shutdown-was-prank **Unverified** (Reddit/Websim user pages) |
| **Replit / Lovable / Bolt** | General AI app builders; not game engines | Not retrieved. Lovable's own comparison (biased): Replit Agent 4 (Mar 2026) best for backend/multi-language; Lovable = React+Supabase; Bolt = fastest browser demo. https://lovable.dev/guides/bolt-vs-replit-vs-lovable | Code in repo / GitHub | not retrieved | **Promotional** comparison. Bolt sponsored both Vibe Jams |
| **Roblox Studio Assistant + Cube** | In-Studio agent (Planning Mode, builds data model/scripts, **playtest subagent**), **built-in MCP server**, Cube 3D/4D generation | Assistant pricing not retrieved. 4D: `GenerateModelAsync` open beta, schemas **Car-5** and **Body-1** only (devforum). | Roblox-hosted platform; third-party agents (Claude, Cursor, Codex) connect via Studio MCP (stdio, tools incl. `subagent` types `explore`/`playtest`, run Luau, test in Play mode) | Roblox ToS not retrieved | Docs **Verified**; 44% stat **Promotional** |
| **Unity AI tools** (successor to **Muse**) | In-editor agentic Assistant (/ask /run /code), Generators, AI Gateway, **MCP server, plugin, CLI free** (Unity 6+) | **Personal: 14-day, 1,000-credit trial then $10/mo for 1,000 credits**; Pro/Enterprise/Industry include access+credits. Open beta (Unity Discussions post, date not in snippet). MCP/CLI/plugin free, no concurrency limits. **Muse deprecated** (first-party models); new tools use 3rd-party models. Brand "Unity AI" being retired → "Unity's AI tools". | Output is normal Unity project/C# | Unity ToS not retrieved | **Verified** https://unity.com/features/ai , https://discussions.unity.com/t/unity-ai-s-open-beta-now-live-for-unity-6/1718560 |
| **GDevelop AI** | Open-source (MIT) no-code engine with AI chat + agent | Free 40 AI credits/mo; Silver 200/wk + 100 mo; Gold 1,000/wk + 300 mo; Pro 3,000/wk + 1,000 mo. AI chat 5 credits/msg; agent 4–20 credits/request; failed requests not charged. https://gdevelop.io/pricing , blog | **Independent test 2026-10-10:** web build = real HTML5 ZIP with 114 files, ran standalone; a second "copy ZIP" had remote resource references and "Made with GDevelop" splash. | Editor+engine MIT | **Verified** (docs); test **Practice** (aigamescope.com, one small game) |
| **Buildbox (Classic / 4)** | No-code game maker; Buildbox 4 adds AI assistant/code edit/asset gen | (aggregator page quoting signup.buildbox.com) Classic Beginner $29.98/mo; Buildbox 4 Beginner $49.98/mo; Classic Pro $399.98/yr; B4 Pro $549.98/yr; Ultimate $1,149.98/yr; B4 exports Android+PC; Classic iOS/Android/PC. Official `buildbox.com/license-options-original` still shows older $15/$35/$99 tiers. **Conflict.** | Export to store builds; source not provided | not retrieved | **Unverified** (aggregator) |
| **Inworld** | Runtime for **AI NPCs** (LLM+STT+TTS+memory graph), Unreal SDK live, Unity early access | Runtime SDK free; pay model usage at provider cost, no markup; TTS-1.5 Mini $5 / Max $10 per 1M chars; plans On-Demand free, Creator $25, Builder $100, Developer $300, Growth $1,500/mo, Enterprise custom (docs.inworld.ai/portal/billing; inworld.ai/pricing) | n/a (runtime service) | not retrieved | **Verified** |
| **Layer.ai** | AI game-art production platform (2D/3D/video/audio, MCP) | Usage-based "Creative Units" (CU): subscriptions from **$10/mo for 300 CU**, +$60 per 1,000 CU; base $0.08/CU, 25% sub discount; one-time 500 CU pack $40; no seat fees; annual only if >$12,000 usage; 10% rollover (layer.ai/pricing, help.layer.ai) | assets exported | not retrieved | **Verified** |

### 2.2 Notes the tutorial should reuse

- **"Own your code" test** (aigamescope, 2026-10-10): generation, source access and a playable build are separate acceptance criteria. https://aigamescope.com/news/export-ai-generated-games/ — **Practice**.
- Engine vendors are converging on **"expose the editor to *your* agent over MCP"** instead of selling a closed assistant: Unity (free MCP/CLI/plugin), Roblox (built-in Studio MCP), Phaser Editor (MCP in-editor), Ludo.ai (API/MCP/CLI), Layer.ai (MCP), plus community MCPs (§5). That matters for an engineer who already has Claude Code/Codex/Cursor.
- Roblox "44% of the top 1,000 creators use Assistant or third-party AI via MCP" — measure: creators who used Assistant/MCP features in Studio between 3/6/2026 and 4/7/2026; top creators ranked by Robux spent in the 28 days to 4/7/2026. https://about.roblox.com/newsroom/2026/04/roblox-studio-going-agentic — **Promotional** (note "used", not "ship with").
- Roblox itself says one-step AI tools "can feel like shooting in the dark and often fail to truly capture a creator's original intent" and therefore added Planning Mode (reviewable plan) — a vendor admission that single-prompt generation is insufficient. **Verified** (same page).

---

## 3. World models that generate playable-looking video

### 3.1 Comparison table

| System | Org | Date / version | What it is | Resolution / FPS | Memory / consistency | Latency / hardware | Access (2026-10-17) | Label |
|---|---|---|---|---|---|---|---|---|
| **GameNGen** | Google (Valevski et al.) | arXiv 2024-08-27; ICLR 2025 | Diffusion model trained on **DOOM** gameplay recorded by an RL agent; predicts next frame from past frames+actions | 20 FPS on a single TPU; PSNR 29.4 (≈ lossy JPEG q20–30) | Conditions on ~3 s of context; rest of state carried by on-screen HUD + learned heuristics | — | Paper only; no playable release | **Verified** https://arxiv.org/abs/2408.14837 |
| **WHAM / Muse** | Microsoft | Nature paper + Muse announced Feb 2025 | World & Human Action Model trained on Bleeding Edge gameplay | 300×180 @10 fps (Ars) | — | — | Research | **Verified** (Ars) https://arstechnica.com/ai/2025/04/john-carmack-defends-ai-amid-backlash-over-microsofts-generative-quake-ii-demo/ |
| **WHAMM** (Copilot Labs Quake II demo) | Microsoft | 2025-04-05/06 | MaskGIT-based real-time WHAM; one Quake II level; trained on ~1 week of curated data (vs 7 years for Muse) | 640×360, 10+ fps | **0.9 s context**: "forgets" objects out of view; enemies fuzzy; health/damage numbers unreliable | "Playing the model as opposed to playing the game" | Copilot Labs browser demo (current availability not re-checked) | **Verified** https://www.microsoft.com/en-us/research/articles/whamm-real-time-world-modelling-of-interactive-environments/ , https://techcrunch.com/2025/04/06/microsoft-releases-ai-generated-quake-ii-demo-but-admits-limitations/ |
| **Genie 3** | Google DeepMind | 2025-08-05 | General text→interactive world, auto-regressive frame generation | 720p, 24 fps | "largely consistent for several minutes"; **visual memory ≈ 1 minute** (a16z interview: "limited to one minute") | Real-time; hardware undisclosed | Was "limited research preview" (small cohort of academics/creators) | **Verified** https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ |
| **Project Genie** (Genie 3 + Nano Banana Pro + Gemini) | Google Labs | 2026-01-29 (US); later global | Consumer prototype: sketch world from text/image/Street View → explore → remix | **60-second** sessions, 720p, 24 fps (Engadget) | known issues: lower stream quality, **control latency**, "streams get darker over time", worlds don't match input image | — | **Google AI Ultra** subscribers, 18+; US first, then "gradually rolling out… globally" (Google Threads post; date not shown; after I/O 2026 per Engadget). Price: **$250/mo** (Engadget Jan 2026) vs **"$200"** (Google Threads post) — conflict | **Verified** https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie/ , https://support.google.com/labs/answer/16875695?hl=en , https://www.engadget.com/ai/googles-project-genie-lets-you-create-your-own-3d-interactive-worlds-183646428.html |
| **"Genie 4"** | — | — | **No official announcement found.** A LinkedIn post titled "Genie 4" actually describes Project Genie. | — | — | — | — | Rumour **Unverified** |
| **Decart Oasis 2.0** (Minecraft mod) | Decart | CurseForge listing 2025-12-03 | **Restyle overlay**: mod captures each rendered frame, streams to Decart's real-time video-to-video model (Mirage LSD / Lucy Restyle), replaces the frame; **game logic & server unchanged**; MC 1.21.8 Fabric | 30 fps WebRTC stream | n/a (game state lives in Minecraft) | cloud inference, per-second billing | Mod on Modrinth/CurseForge; API: `lucy-restyle-2` **$0.01/s**, `lucy-2.5` **$0.02/s** (fast $0.04), `oasis-3-preview` **$0.02/s** ("realtime world model / driving simulator"; enterprise custom) — https://docs.platform.decart.ai/getting-started/pricing | **Verified** (docs); Oasis 1 (2024) not retrieved |
| **Dynamics Lab Mirage / Mirage 2** | Dynamics Lab | Mirage 1 ~mid-2025; Mirage 2 2025-08-21/22 | Browser-streamed "generative game engine": text, keyboard/controller, image upload; demos Urban Chaos (GTA-style), Coastal Drift (Forza-style) | M1: 16 FPS SD | Vendor: M2 "10+ minutes"; independent HN tester: ~3–5 s visual memory, style drifts back to "contrast-boosted video game" within ~10 s | Vendor: 200 ms; **independent: 600–700 ms** control-to-action (RTT ~70 ms) | Online demo with queue ("45 min wait" shown, couple of minutes in practice) | Vendor **Promotional**; HN measurements **Practice** https://dynamicslab.ai/ , https://blog.dynamicslab.ai/ , https://news.ycombinator.com/item?id=44978286 , https://the-decoder.com/mirage-2-allows-users-to-turn-sketches-and-photos-into-interactive-game-worlds/ |
| **Hunyuan-GameCraft** | Tencent Hunyuan | arXiv 2506.17201 (2025-06); repo created 2025-08-13 | Action-controllable game video from image+prompt+keyboard/mouse (unified into camera space); hybrid history conditioning; trained on >1M recordings from 100+ AAA games | — | Hybrid history extension | Distillation 10–20× → "<5 s latency per action" (paper) = **not real-time** | Open code + weights: https://github.com/Tencent-Hunyuan/Hunyuan-GameCraft-1.0 (759★, licence "Other"/NOASSERTION — read before use) | **Verified** |
| **Matrix-Game 2.0** | Skywork AI | 2025-08-12 | 1.8B auto-regressive diffusion, few-step distilled | **25 FPS on one H100**, minute-level videos; ~1,200 h Unreal-Engine/game data; keyboard+mouse frame-level actions | minute-level | — | Open code + weights (MIT repo) | **Verified** https://arxiv.org/html/2508.13009 |
| **Matrix-Game 3.0 / 4.0** | Skywork AI | 3.0: 2026-03-27 (long-horizon memory); **4.0: 2026-10-15** | **4.0 = hybrid**: an *executable game engine* owns gameplay/physics/input; a causal video model **re-renders low-poly RGB frames into detailed visuals** ("engine-grounded neural rendering"). Scenes: Medieval Castle, Ancient Egypt (third-person shooters), City Racing | 480×864 RGB; README news: up to 67 FPS on RTX 5080 / 58 FPS on RTX 5070 Ti "steady state, excluding video I/O" (2026-10-16) | Limitations stated: specialised to supplied low-poly scenes/cameras; drift/geometry errors under unseen geometry, rapid motion, occlusion, long sessions; **neural output does not change collision or gameplay**; model card "does not claim a performance benchmark" | ~44.2 GB payload; each scene ≈10 GB; A100/5090/5080/5070 Ti paths | Open: https://github.com/SkyworkAI/Matrix-Game (2,544★, MIT), weights https://huggingface.co/Skywork/Matrix-Game-4.0 | **Verified** |
| **Odyssey-2 / 2 Pro** | Odyssey | Odyssey-2 Oct 2025; 2 Pro + API later | Real-time interactive video, text actions | 720p, 22 fps | — | — | **API by request**; no public price; "Free tier up to 5 concurrent streams" per docs mention; fees per order/monthly contract; Odyssey-2 Max rolling out to existing users; Odyssey-3 announced (Recaply) | Vendor blog **Promotional**; access terms **Practice** (Rundown "checked 2026-08-29") https://odyssey.systems/the-gpt-2-moment-for-world-models , https://www.therundown.ai/tools/odyssey-2 |
| **World Labs Marble** | World Labs | Marble 1.0/1.1/1.1 Plus | Generates **persistent 3D worlds** (not video) from text/image/pano/video; exports **Gaussian splats (SPZ/PLY)**, collider meshes, pano, HQ textured GLB mesh | n/a | persistent (it is a 3D asset) | — | Free $0: 7,000 credits (4 worlds), **no export**; Standard **$20/mo** 20,000 cr (≤12 worlds): splats/pano/collider export; Pro **$35/mo** 40,000 cr (≤25): **commercial rights + HQ mesh**; Max **$95/mo** 120,000 cr (≤75) (Max price/credits from third-party hokai.io). API: $1.00 = 1,250 credits; world gen 1,500 cr ($1.20); HQ mesh 3,500 cr ($2.80); PLY splat export free via API | **Verified** (docs) https://docs.worldlabs.ai/api/pricing , https://docs.worldlabs.ai/marble/support/account-billing , https://docs.worldlabs.ai/marble/export/gaussian-splat/index |

### 3.2 How world models differ technically from game code (evidence-based)

| Property | Game code (engine + logic) | Neural world model (pixels-in/pixels-out) | Evidence |
|---|---|---|---|
| State | Explicit variables (position, health, RNG seed) in memory; serialisable | **No authoritative state**; "state" = what's visible in a short window of past frames (+actions) | WHAMM: 0.9 s context, forgets objects, "teleport by looking at the sky" (TechCrunch). Genie 3: "visual memory extending as far back as one minute". GameNGen: ~3 s context. |
| Rules | Written, deterministic, unit-testable | Learned correlations; numeric rules unreliable | WHAMM: "damage and health counters can be inaccurate"; Genie 3 text unreadable unless in prompt; people "appear to walk backward" (Ars). |
| Determinism / replay | Fixed timestep + same inputs ⇒ same run | Stochastic sampling; "everything it generates is unique and non-deterministic" (Ars on Genie 3) | https://arstechnica.com/ai/2025/08/deepmind-reveals-genie-3-world-model-that-creates-real-time-interactive-simulations/ |
| Latency | Input → next frame in a few ms | One network forward pass per frame (or chunk); chunked generators add action latency | Mirage 2: measured 600–700 ms vs claimed 200 ms; Hunyuan-GameCraft: <5 s per action; Matrix-Game 4.0 doc: "150 ms setting is not a measured model or network latency". |
| Consistency drift | None (state is exact) | Errors accumulate autoregressively; harder than whole-video generation | DeepMind: "generating an environment auto-regressively is generally a harder technical problem than generating an entire video, since inaccuracies tend to accumulate over time." Project Genie: "streams get darker over time". Matrix-Game 4.0: "long sessions can cause appearance drift". |
| Duration | Unlimited | Minutes: Genie 3 "a few minutes", Project Genie 60 s cap | DeepMind blog; Engadget |
| Output | Source code + assets you own and can version | Video stream (Genie/Mirage/WHAMM); static 3D asset only for Marble | Marble exports splats; others export nothing |
| Compute | Runs on a laptop | Server GPUs (H100/TPU/5090-class) | Matrix-Game 2.0: 25 FPS on single H100; GameNGen: single TPU |
| Appropriate use | Shipping a game | Research, rapid concept visualisation, agent training environments, neural *rendering* layer | DeepMind positions Genie 3 for agent training/education/simulation; Engadget: "Project Genie is not a game generator"; Microsoft: "playing the model as opposed to playing the game" |

**Convergence trend (important for the tutorial):** the newest open release (**Matrix-Game 4.0, 2026-10-15**) keeps **game logic in an executable engine** and uses the model only as a **re-renderer**; Decart Oasis 2.0 is explicitly a **restyle overlay that does not alter game logic**. I.e. the industry's practical path is *engine for rules/state + neural net for appearance*, not "world model replaces game code". **Verified** (both primary).

Ownership/legal: Genie/Mirage/Odyssey outputs are streams; Marble Pro grants "commercial rights to generated worlds"; Hunyuan-GameCraft licence is "Other"; Matrix-Game repo MIT (weights/asset licence terms not checked). **Practice**.

---

## 4. How agents test games

### 4.1 Technique ladder (cheap → expensive)

| Layer | Technique | Evidence / tool | Label |
|---|---|---|---|
| 1 | **Pure logic unit tests** — separate simulation (`step(state, input, dt)`) from rendering; assert on state | Gaffer on Games "Fix Your Timestep" — accumulator loop; "the renderer produces time and the simulation consumes it in discrete dt sized steps" https://gafferongames.com/post/fix_your_timestep/ ; testable fixed-step loop with replays https://arcadeonstudios.co.uk/blog/turn-your-game-loop-into-a-testable-system-fixed-step-determinism | **Practice** (established engineering) |
| 2 | **Deterministic replay** — record initial state/seed + one input frame per fixed tick; replay and assert final state; avoid wall-clock, uncontrolled RNG, nondeterministic iteration | Dickinson "Instant Replay": inputs recorded against update count; "Under no circumstances should a programmer… read the system time directly" https://masters.donntu.ru/2012/fknt/chernyaev/library/article02/article2.htm ; Jakub Tomsu notes: update entities in fixed order, store RNG seed, replays break when gameplay logic changes https://jakubtomsu.github.io/posts/fixed_timestep_without_interpolation/ | **Practice** |
| 3 | **Engine-headless tests in CI** | Godot: `--headless` ("required on platforms that do not have GPU access (such as CI)"), `--quit-after N`, `--write-movie` (forces fixed FPS) https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html ; GUT: `godot -d -s --path "$PWD" addons/gut/gut_cmdln.gd -gdir=res://test -gexit` https://gut.readthedocs.io/en/latest/Command-Line.html ; GdUnit4: `addons/gdUnit4/bin/GdUnitCmdTool.gd -a res://tests` with `runtest.cmd` for Windows and official `gdUnit4-action` https://godot-gdunit-labs.github.io/gdUnit4/latest/advanced_testing/cmd/ ; Unity Test Framework: `Unity.exe -runTests -batchmode -projectPath … -testPlatform PlayMode -testResults results.xml` https://docs.unity.com/en-us/engine/6000.5/manual/scripting/test-framework-introduction/running-tests/run-tests-from-command-line | **Verified** (official docs) |
| 4 | **Browser game harness**: state exposed as JSON + virtual time | OpenAI `develop-web-game` skill: `window.render_game_to_text`, `window.advanceTime(ms)`, Playwright client with screenshots/console buffer (§1.2) | **Verified** |
| 5 | **Screenshot loop with a vision model** | Playwright MCP vision mode (`--caps=vision`: `browser_mouse_click_xy`, `browser_mouse_drag_xy`, `browser_mouse_wheel`…); "Canvas / WebGL apps → vision mode with screenshots"; default accessibility-snapshot mode "more reliable and token-efficient" for normal DOM https://playwright.dev/mcp/vision-mode , https://playwright.dev/mcp/capabilities | **Verified** |
| 6 | **Scripted input playthrough** | Raccoon Heist: Claude drove the page with Playwright `page.evaluate` hooks (`window.__rh.teleport`, state dump) then screenshots https://simonwillison.net/2026/Aug/5/raccoon-heist/ | **Verified** |
| 7 | **Agent playtest subagents** | Roblox Studio MCP `subagent` type `playtest` ("running gameplay scenarios and verifying outcomes"); Assistant "using the player character as an automated QA tester" https://create.roblox.com/docs/en-us/studio/mcp.md , https://about.roblox.com/newsroom/2026/04/roblox-studio-going-agentic | **Verified** (docs) |
| 8 | **Performance profiling** | Chrome DevTools MCP: `performance_start_trace` / `performance_stop_trace` / `performance_analyze_insight` (Core-Web-Vitals oriented; not GPU-frame-time specific) https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/HEAD/docs/tool-reference.md ; stats.js FPS/ms overlay (mrdoob/stats.js 9,151★, last push 2024-10-11) | Tool docs **Verified**; suitability for game frame-time **Practice** |
| 9 | **Visual regression / a11y** | PlayableIntelligence/game-creator `game-qa` skill: Playwright gameplay, visual regression, performance, accessibility (axe-core) https://github.com/PlayableIntelligence/game-creator | **Practice** |

### 4.2 Tool popularity (stars as of 2026-10-17, from `gh api`)

| Tool | Stars | Licence | Last push |
|---|---|---|---|
| microsoft/playwright | 97,912 | Apache-2.0 | 2026-10-17 |
| puppeteer/puppeteer | 95,713 | Apache-2.0 | 2026-10-16 |
| microsoft/playwright-mcp | 38,276 | Apache-2.0 | 2026-10-16 |
| bitwes/Gut (GUT) | 2,760 | SPDX not detected by API (check repo LICENSE) | 2026-08-18 |
| godot-gdunit-labs/gdUnit4 | 1,267 | MIT | 2026-10-17 |
| mrdoob/stats.js | 9,151 | MIT | 2024-10-11 |
| godotengine/godot | 118,548 | MIT | 2026-10-16 |

### 4.3 Playwright MCP specifics relevant to canvas games
- Default tools use **accessibility snapshots** — a `<canvas>` has no DOM nodes, so the snapshot cannot "see" game objects; use screenshots + coordinates (vision caps) or expose state via `window.*` and `browser_evaluate`. **Verified** (Playwright docs).
- `--headless` and `--caps=vision` are orthogonal (maintainer answer in issue #39). A headless browser launched by the server auto-closes after **one hour** idle (`--idle-timeout`; 0 disables) because animating pages burn CPU. https://playwright.dev/docs/getting-started-mcp — **Verified**.
- Headless GPU caveat: OpenAI's skill itself says "If you suspect a headless/WebGL capture issue, rerun the Playwright script in headed mode" (**Verified**). A third-party MCP for a WebGPU engine states headless Chromium returns no WebGPU adapter and must be run headed https://github.com/wfbcargo/wfbcargo_spawn_mcp — **Unverified** generalisation (single project; may differ per GPU/flags).

### 4.4 Known limitations (with evidence)

| Limitation | Evidence | Label |
|---|---|---|
| Canvas/WebGL is opaque to DOM/accessibility tree | Playwright MCP docs table: "Canvas / WebGL apps → Vision mode"; spawn MCP: "accessibility snapshots won't see the world. Screenshots are the ground truth." | **Verified** |
| Code-only or screenshot-only judging misjudges worlds | WorldBench: visual vs code judging disagree on 32% of items; code-only judge credited 4/5 removed features (arXiv 2026-10-07 via gamedev.net) | **Practice** |
| Agents miss most real bugs when exploring | GBQA: best model 48.39% of 124 verified bugs | **Verified** |
| Agents solve ~half of realistic dev tasks; visual feedback helps but doesn't close the gap | GameDevBench best 53.8%; GPT-5.4 41.1→52.0 with image+video | **Verified** |
| Timing: wall-clock/RAF dependent behaviour is flaky under automation | Mitigation is virtual time (`advanceTime`), fixed timestep; Godot `--write-movie` forces fixed FPS | **Verified** (mitigations in official docs/skill) |
| Models can't judge "feel"/fun | Willison: agent-built games were all "deeply disappointing from a gameplay perspective" even though agent-run Playwright tests passed; no benchmark measures fun | **Practice** (inference from a first-hand report, not a controlled study) |
| Self-verification loops can consume huge budgets | Codex racing demo >7M tokens | **Verified** |
| Env mismatch bugs invisible to desktop-only tests | Raccoon Heist: 2× canvas on real phones masked by DPR-1 desktop tests; found only after portrait/landscape-phone viewports | **Verified** |
| Unity PlayMode in CI is heavy | May trigger a player build; needs generous timeouts (unifocl docs); EditMode cannot run `[UnityTest]` multi-frame tests under `-runSynchronously` | **Practice** / **Verified** |

### 4.5 Published agent game-testing papers
- **TITAN** — LLM-driven agent for MMORPG testing: task completion **95%** vs best baseline 82%; bug detection **15 vs 9**; found **4 previously unknown bugs**; deployed in **8** real QA pipelines. arXiv 2509.22170 (2025-09-26) https://arxiv.org/abs/2509.22170 — **Verified**. (The search-engine synthesis mis-stated "82% of seeded bugs"; the paper snippet says 82% is the best baseline's completion rate.)
- **GBQA** — see §1.3; **VideoGlitchBench / GliDe** — 5,238 gameplay videos from 120 games, open-ended glitch detection + temporal grounding (arXiv 2604.07818) https://arxiv.org/html/2604.07818 — **Verified**.
- Commercial/academic context: `lmgame-Bench` finds "brittle vision perception" is a core failure of VLMs playing games (https://arxiv.org/abs/2505.15146) — relevant to vision-based playtesting. **Verified**.

---

## 5. Skills, templates, starter kits that make "one prompt" games feasible

| Item | What | Stars (2026-10-17) | Licence | Last push | Notes | Label |
|---|---|---|---|---|---|---|
| `openai/skills` → `develop-web-game` | Codex/Agent Skill: HTML/JS game loop + Playwright client; `render_game_to_text`, `advanceTime` | 28,118 (whole repo) | not detected | 2026-09-08 | skill visible at pinned commit; install `npx skills add https://github.com/openai/skills --skill develop-web-game` (skills.sh); verify path exists on `main` | **Verified** |
| `gamedev-skills/awesome-gamedev-agent-skills` | 74 portable SKILL.md skills: Godot, Unity, Unreal, Phaser, PixiJS, three.js, Bevy, pygame, LÖVE, Roblox + router; works in Claude Code, Cursor, Codex, Gemini CLI, Copilot, Kiro… | 1,572 | Apache-2.0 | 2026-10-09 | Web-engine versions referenced: Phaser 4.2, PixiJS 8.21, three.js r186 | **Verified** |
| `PlayableIntelligence/game-creator` (formerly/also `OpusGameLabs/game-creator`) | Opinionated Claude plugin / skills: Phaser 3 and Three.js templates (`phaser-2d`, `threejs-3d`), `game-qa` (Playwright), `game-deploy`, audio (Strudel.cc **AGPL-3.0**), Play.fun monetisation | 345 | not detected | 2026-05-25 | stack: Phaser ^3.90, Three ^0.183, Vite ^7.3, Playwright ^1.58; the `OpusGameLabs` URL shows identical stats ⇒ renamed/moved | **Verified** |
| `Yakoub-ai/phaser4-gamedev` | Claude Code plugin: 20 portable skills, 4 agents, 6 commands, 2 hooks (PreToolUse blocks deprecated Phaser-3 APIs) for Phaser 4 (v4.0.0-rc.7) | 29 | not detected | 2026-08-27 | niche, new | **Verified** |
| `Simone-Tarantino/godot-superpowers` | Godot 4.x Claude Code plugin: 33 skills, 15 subagents, hooks (gdformat/gdlint) | 2 | MIT | 2026-05-05 | almost no adoption — treat as example only | **Verified** (existence) |
| Phaser **Editor v5 MCP server** | MCP server bundled in editor (menu AI → MCP Server Configuration) for Claude Desktop/Cursor/VS Code; "still under development… basic scene creation and management"; needs a running Phaser Editor 5 instance | `phaserjs/editor-mcp-server` 36★ (last push 2025-09-19) | not detected | — | https://docs.phaser.io/phaser-editor/ai/mcp-server ; Phaser dev log Q1 2026 says AI integration "still experimental" | **Verified** |
| `phaserjs/editor-starter-template-cursor-javascript` | Official Cursor template: `.cursor/mcp.json` + `.cursor/rules` ("always use the MCP tools first"); recommends Claude Sonnet | 4 | not detected | 2025-07-03 | "experimental" per README | **Verified** |
| `phaserjs/create-game` (`npm create @phaserjs/game@latest`) | Official template CLI: Vite/Rollup/Parcel/Webpack/ESBuild/Bun × Vue/React/Angular/Next/Solid/Svelte/Remix | 73 | not detected | 2026-04-21 | recommends Web Bundler + Vite for beginners | **Verified** |
| `phaserjs/phaser` | Framework | 40,495 | MIT | 2026-08-21 | | **Verified** |
| `mrdoob/three.js` | 3D library (Vibe Jam default recommendation) | 116,535 | MIT | 2026-10-17 | | **Verified** |
| `pmndrs/react-three-fiber` | React renderer for three | 33,031 | MIT | 2026-10-17 | | **Verified** |
| `kaplayjs/kaplay` | 2D game lib | 1,814 | MIT | 2026-10-16 | no AI-specific kit found in this pass | **Verified** |
| `Coding-Solo/godot-mcp` | Godot MCP (editor/project control) | 6,130 | MIT | 2026-04-16 | most-starred Godot MCP seen; not independently evaluated | **Verified** (stats) |
| `CoplayDev/unity-mcp` | Unity Editor ↔ AI via MCP | 15,046 | MIT | 2026-10-08 | competes with Unity's own free MCP server (§2) | **Verified** (stats) |
| Roblox Studio built-in MCP | first-party | — | — | — | https://create.roblox.com/docs/en-us/studio/mcp.md | **Verified** |
| Unity's official plugin / MCP / CLI | first-party, free, Unity 6+ | — | — | — | https://unity.com/features/ai | **Verified** |
| Godot docs | `godotengine/godot-docs` 5,825★ (docs licence NOASSERTION) | | | 2026-10-17 | | **Verified** |

### 5.1 What these kits actually add (for the "one prompt" question)
- They pre-decide the **stack** (Phaser 3/4 or Three.js + Vite + Playwright), the **file structure/architecture** (event-driven scenes, systems), the **verification contract** (`render_game_to_text`, `advanceTime`) and **guard-rails** (hook blocking deprecated APIs). A "one prompt" demo run *with* such a kit is not comparable to a bare prompt; the OpenAI Codex demo explicitly used two skills. **Practice** (inference from the skill/plugin contents above).
- Cursor-specific: Phaser's official Cursor template ships `.cursor/rules` and MCP config; Cursor reads `.agents/skills/` and `.cursor/skills/` for portable SKILL.md files (awesome-gamedev-agent-skills README). **Verified**.
- No official "Phaser AI" product beyond Editor MCP was found; no Kaplay-specific agent kit found.

---

## 6. GitHub numbers table (all via `gh api repos/OWNER/REPO`, 2026-10-17)

| Repo | Stars | Licence (SPDX) | Last push |
|---|---|---|---|
| microsoft/playwright-mcp | 38,276 | Apache-2.0 | 2026-10-16 |
| microsoft/playwright | 97,912 | Apache-2.0 | 2026-10-17 |
| puppeteer/puppeteer | 95,713 | Apache-2.0 | 2026-10-16 |
| bitwes/Gut | 2,760 | none detected | 2026-08-18 |
| godot-gdunit-labs/gdUnit4 | 1,267 | MIT | 2026-10-17 |
| godotengine/godot | 118,548 | MIT | 2026-10-16 |
| phaserjs/phaser | 40,495 | MIT | 2026-08-21 |
| mrdoob/three.js | 116,535 | MIT | 2026-10-17 |
| pmndrs/react-three-fiber | 33,031 | MIT | 2026-10-17 |
| kaplayjs/kaplay | 1,814 | MIT | 2026-10-16 |
| libgdx/libgdx | 25,448 | Apache-2.0 | 2026-10-14 |
| mrdoob/stats.js | 9,151 | MIT | 2024-10-11 |
| Coding-Solo/godot-mcp | 6,130 | MIT | 2026-04-16 |
| CoplayDev/unity-mcp | 15,046 | MIT | 2026-10-08 |
| openai/skills | 28,118 | none detected | 2026-09-08 |
| gamedev-skills/awesome-gamedev-agent-skills | 1,572 | Apache-2.0 | 2026-10-09 |
| PlayableIntelligence/game-creator (= OpusGameLabs/game-creator) | 345 | none detected | 2026-05-25 |
| Yakoub-ai/phaser4-gamedev | 29 | none detected | 2026-08-27 |
| Simone-Tarantino/godot-superpowers | 2 | MIT | 2026-05-05 |
| phaserjs/editor-mcp-server | 36 | none detected | 2025-09-19 |
| phaserjs/create-game | 73 | none detected | 2026-04-21 |
| phaserjs/editor-starter-template-cursor-javascript | 4 | none detected | 2025-07-03 |
| SkyworkAI/Matrix-Game | 2,544 | MIT | 2026-10-16 |
| Tencent-Hunyuan/Hunyuan-GameCraft-1.0 | 759 | NOASSERTION ("Other") | 2025-11-28 |
| waynchi/gamedevbench | 142 | Apache-2.0 | 2026-10-13 |
| lmgame-org/GamingAgent | 992 | MIT | 2025-11-16 |
| simonw/raccoon-heist | 17 | none detected | 2026-08-05 |
| godotengine/godot-docs | 5,825 | NOASSERTION | 2026-10-17 |

`gh api` 404s (so not used): `bitwiseworks/gut`, `gdUnit4/gdUnit4` (moved to `godot-gdunit-labs/gdUnit4`), `microsoft/Quake-II-Muse` (does not exist).

---

## 7. Top 10 headline facts

1. **The best-documented "one-prompt" game is honest about being shallow.** Simon Willison's 7-line prompt to Claude Fable 5 (Claude Code web) produced a playable 3D Three.js game in 7 commits with agent-run Playwright tests — and he rates it "mediocre as a finished game… impressive as a starting point"; "all [vibe-coded games] deeply disappointing from a gameplay perspective." Prompt, repo, transcript are public. https://simonwillison.net/2026/Aug/5/raccoon-heist/ (2026-08-05) — **Verified**
2. **"One prompt" demos usually hide a harness.** OpenAI's Codex racing game used one human prompt **plus two skills (image gen + `develop-web-game`), scripted generic follow-ups, and >7 million tokens**, with the agent playing/QA-ing its own game. https://openai.com/index/introducing-the-codex-app/ (2026-02-02), https://openai.com/index/introducing-gpt-5-3-codex/ — **Practice**
3. **Agent self-testing contract is now standardised**: expose `window.render_game_to_text()` + `window.advanceTime(ms)`, drive with Playwright, inspect screenshots (headed if WebGL capture fails). https://github.com/openai/skills/blob/82d2c5b4/skills/.curated/develop-web-game/SKILL.md — **Verified**
4. **fly.pieter.com is real but the "$1M ARR" is a 17-day run-rate** of ads/F-16 skins ($29.99); author is a 10-year production dev; Levels' own taxonomy files it under "Okay: not sustainable"; the site is still live (2026-10-15). https://levels.io/fly-pieter-com-vibecoded-flight-simulator , https://levels.io/projects — build **Practice**, revenue **Promotional**
5. **Vibe Jam is the only large public sample of AI-built games**: 2025 had 1,170 entries (≥80% AI rule); 2026 required ≥90% AI code, ran 2026-04-01→05-01, $40k cash prizes, winners 1) Capybaras Delivering Food ($25k). Judge Tim Soret: "a 3rd year student yes, not the top 20%". Rule enforcement is not documented. https://vibejam.com/2026/press , https://levels.io/vibe-jam-2026-winners-quality — **Verified** (results) / **Unverified** (enforcement)
6. **Agents still fail ~half of realistic game-dev tasks**: GameDevBench best = 53.8% pass@1 (Godot, 333 tasks; visual feedback lifted GPT-5.4 41.1→52.0); GBQA best model finds 48.39% of 124 verified bugs; WorldBench shows code-only judging gives full credit to 4/5 deleted features. https://arxiv.org/html/2602.11103v2 , https://arxiv.org/abs/2604.02648 — **Verified**
7. **World models are not game engines.** Genie 3 (2025-08-05): 720p/24 fps, consistent for "a few minutes", visual memory ≈1 min. Project Genie (consumer, 2026-01-29): **60-second** sessions, AI Ultra only ($250/mo per Engadget Jan 2026; "$200" per Google's later post). WHAMM Quake II: 0.9 s memory, wrong health numbers. GameNGen: 20 fps on a TPU, ~3 s context. https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ , https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie/ — **Verified**
8. **The newest open world-model release is a hybrid, not a replacement:** Matrix-Game 4.0 (2026-10-15, MIT repo) keeps **gameplay/physics/input in an executable engine** and uses a causal video model only to re-render low-poly frames; "neural output does not change collision or gameplay." Oasis 2.0 is likewise a restyle overlay. https://github.com/SkyworkAI/Matrix-Game , https://huggingface.co/Skywork/Matrix-Game-4.0 — **Verified**
9. **Engine vendors expose editors to *your* agent via MCP**: Unity MCP/CLI/plugin free (Unity 6+; first-party Assistant $10/mo Personal, Muse deprecated), Roblox Studio built-in MCP with a `playtest` subagent, Phaser Editor 5 MCP (experimental), Ludo.ai/Layer.ai MCP. https://unity.com/features/ai , https://create.roblox.com/docs/en-us/studio/mcp.md — **Verified**
10. **Ownership is not uniform across "AI game makers":** Rosebud's ToS says Rosebud owns prompt-generated materials while paid tiers get commercial rights and code download (Pro+); anonymised data can be sold to frontier labs with no opt-out; an independent test found free-tier export disabled; GDevelop (MIT editor/engine) gave a real 114-file HTML5 ZIP. https://rosebud.ai/terms-of-service , https://aigamescope.com/news/export-ai-generated-games/ — **Verified** (ToS) / **Practice** (test)

---

## 8. Open questions / conflicts

### Conflicts between sources
| # | Topic | Source A | Source B | My handling |
|---|---|---|---|---|
| C1 | fly.pieter.com revenue | "$87,000 MRR (= $1M ARR)" (Levels tweet quoted by promptway) | "$30,000 a month" (ofershap); "peaked at over $100K/month" (vibehackers) | Report all, label run-rate/self-reported; peak figure unresolved |
| C2 | Vibe Jam 2025 winners date | indielessons: announced **2025-03-26** | Indie Hackers (**2025-04-23**), levels.io projects list ("23 Apr") | Use 2025-04-23; indielessons likely wrong |
| C3 | Vibe Jam 2026 prizes | vibejam.com/2026/press: **$40,000** (25/10/5k); summerengine jam page: Gold **$20,000** | vibejam.com home: "**$50,000+ total** cash prizes" incl. 12 special prizes | Use $40k for podium; $50k+ incl. specials (unverified breakdown); winner post confirms Gold $25,000 |
| C4 | Vibe Jam 2026 entry count | summerengine: 945 games, 242k players | official figure not retrieved (vibejam.com 403) | Unverified |
| C5 | Project Genie price | Engadget (2026-01-30): "$250 per month AI Ultra" | Google Threads post (global rollout): "$200 subscribers" | Quote both; check Google One page |
| C6 | Genie 4 | LinkedIn "#Genie 4 is absolutely mind-blowing" | Google blog/DeepMind: only Genie 3 + Project Genie | No Genie 4 exists officially |
| C7 | Mirage 2 latency | vendor: 200 ms | HN tester: 600–700 ms control-to-action (RTT 70 ms) | Treat vendor claim as Promotional |
| C8 | Rosebud ownership | ToS: Rosebud owns all content/code generated by prompts | Pricing/marketing: paid plans get full commercial rights, no commission, "100% of profits yours" | Flag; need legal read before telling readers they "own" output |
| C9 | Astrocade pricing | Official blog: all tools free | Aggregator: Free/$9.99/$19.99 | Prefer official; unresolved |
| C10 | Buildbox pricing | signup.buildbox.com (via aggregator): $29.98/$49.98 monthly, $399.98–$1,149.98 annual | buildbox.com legacy page: $15/$35/$99 | Prefer signup page; legacy page stale |
| C11 | Marble PLY export | Docs: export requires paid Standard plan | API pricing: "PLY splat exports are free" (API) | Both true in different surfaces (app vs API) — confirm |
| C12 | Matrix-Game 4.0 speed | README news: up to 67 FPS RTX 5080 "steady state excluding video I/O" | HF model card: "no guaranteed frame rate… does not claim a performance benchmark" | Quote both; do not repeat 67 FPS as end-to-end |
| C13 | GDevelop AI limits | Blog: free 4 AI requests/mo, Silver 4/day | Pricing page: credit-based (free 40 credits/mo; 5 credits per chat msg) | Prefer pricing page; blog outdated |
| C14 | Codex "one prompt" | OpenAI: "just one initial user prompt" | Third-party + GPT-5.3 post: scripted generic follow-up prompts | Describe as 1 human prompt + scripted re-prompts |

### Open questions (not resolved in this pass)
1. Verbatim prompt + repo for the **OpenAI Codex racing game**, and any independent quality review.
2. Prompts/repos for **Anthropic's Fable 5 launch demos** (Snake, Strata, Duino) — Mollick's Substack not fetched.
3. How (if at all) Vibe Jam verifies the **90% AI-code** rule; official 2026 entry/play counts.
4. Is the **Copilot Labs Quake II (WHAMM) demo** still live in Oct 2026? (Not re-checked.)
5. Current **Project Genie** global-rollout date, session limit and price (I/O 2026 date not retrieved); whether Genie output can be exported (no evidence).
6. **Roblox Assistant/Cube pricing and ToS**, Google AI Studio Build pricing/export formats, Replit/Lovable/Bolt game suitability data.
7. Whether `develop-web-game` is still at `skills/.curated/develop-web-game` on `openai/skills` `main` (found via pinned commit and mirrors; my tree grep for "game" on `main` returned nothing).
8. Any **independent measurement** of how often a bare one-line prompt yields a *playable* (not fun) game vs a harness-assisted run — no study found.
9. Weight/asset **licences** for Matrix-Game 4.0 and Hunyuan-GameCraft (repo says MIT / "Other").
10. Oasis (1) technical details (Oct 2024 Minecraft model) — not retrieved; `oasis-3-preview` capability description is one line in the Decart pricing table.

---

## 9. Gaps / not covered (for the integrator)

- No retrieved pricing for: Replit, Lovable, Bolt, Google AI Studio, Roblox Assistant, Cursor/Claude Code/Codex plans (out of R4 scope).
- Kaplay: no AI-specific starter kit found; only stats.
- Three.js "starter kits": covered indirectly (game-creator `threejs-3d` template, gamedev skills router); no standalone official three.js AI template found.
- "Cursor rules for game dev": only Phaser's official `.cursor/rules` template found; no widely-adopted community rule pack verified.
- Claude Code–specific official game-dev plugin from Anthropic: none found; community plugins only (§5).
- I did not run any of the cited games/tools; "Verified" means primary-source retrieved, not re-executed.
