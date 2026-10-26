# R3 — Engines, libraries, editors, free asset libraries

Snapshot date: **2026-10-17** (all GitHub stars / push dates / npm downloads were pulled on this date; "last push" = `pushed_at` from the GitHub API, which includes any branch, not just releases).

## How to read this file

- **Verified** = read from a primary source (GitHub API, npm registry/API, vendor docs or licence page) on 2026-10-17.
- **Practice** = widely known or reported by secondary sources, consistent with what was seen, but not re-checked against a primary page today.
- **Unverified** = could not be confirmed; treat as a lead.
- Stars come from `gh api repos/OWNER/REPO` (2026-10-17). npm weekly = `api.npmjs.org/downloads/point/last-week/PKG`, window **2026-10-06 → 2026-10-12**.
- Licence = SPDX id returned by the GitHub API. `NOASSERTION` or empty means GitHub could not classify the licence file; the real licence was read from the licence file or vendor page and is stated in the note.
- "LLM knowledge" is a judgement (age, amount of public code and docs, presence of `llms.txt`). It is **Practice**, not measured. The `llms.txt` probes are **Verified** (HTTP status checked 2026-10-17).

---

## 1. Web 2D

| Name | 2D/3D | Language | Licence | Cost | GitHub repo (stars, last push, 2026-10-17) | Latest version (date) | npm weekly (2026-10-06→12) | Windows | Agent-friendliness | Best for | Official URL |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Phaser** | 2D | JS/TS | MIT (V) | Free | `phaserjs/phaser` — **40,495**, 2026-08-21 | **v4.2.1** (2026-07-09, per phaser.io download page; npm 4.2.1). v4.0.0 "Caladan" = 2026-04-10; v4.1.0 2026-04-30; v4.2.0 2026-06-19 | `phaser` **579,660** | Any (Node + browser) | Text-only project (JS/TS + assets). CLI: `npm`/Vite build. `phaser.io/llms.txt` = 402 KB examples index, `llms-full.txt` = 706 KB (V). **v4 repo ships 28 "AI agent skill" files + a v3→v4 migration skill** (v4.0.0 release notes, V). Official MCP: none for the engine. `phaserjs/editor-mcp-server` — 36 stars, 2025-09-19, targets the Phaser Editor app (V, stale). LLM knowledge: very high for v3, **v4 is only 6 months old → models still emit v3 APIs** (Practice) | Full-featured browser 2D games; most examples/tutorials | https://phaser.io |
| **PixiJS** | 2D (renderer, not a full engine) | TS | MIT (V) | Free | `pixijs/pixijs` — **48,407**, 2026-10-17 | **8.22.0** (npm modified 2026-10-10) | `pixi.js` **1,452,916** | Any | `pixijs.com/llms.txt` 9.9 KB + `llms-full.txt` 605 KB (V). No official MCP found. Needs you to supply game loop, physics, input, audio (Practice) | UI-heavy / custom 2D rendering; foundation for many games | https://pixijs.com |
| **KAPLAY** (successor of Kaboom.js) | 2D | JS/TS | MIT (V) | Free | `kaplayjs/kaplay` — **1,814**, 2026-10-16 | npm `latest` = **3001.0.19** (changelog dates it 2025-06-15; npm `modified` 2026-05-12); npm `next` and GitHub latest release = **4000.0.0-alpha.27.1** (2026-05-12) | `kaplay` **12,966** (`kaboom` legacy: 1,367) | Any | Single-file friendly, tiny API. `kaplayjs.com/llms.txt` = 404 (V). No MCP (V: none found). A hackathon team reported AI "kept making syntax errors" with KAPLAY and needed a RAG over the docs (Devpost, Practice) | Game jams, beginners, quick prototypes | https://kaplayjs.com |
| **Excalibur.js** | 2D | TS | BSD-2-Clause (V) | Free | `excaliburjs/Excalibur` — **2,353**, 2026-10-17 | **0.32.0** (GitHub release 2025-12-23; npm `modified` 2026-09-21 — see conflicts) | `excalibur` **12,871** | Any | TypeScript-first = good type feedback for agents. `excaliburjs.com/llms.txt` = 404 (V). No MCP found | TS projects wanting types, ECS-ish structure | https://excaliburjs.com |
| **LittleJS** | 2D | JS | MIT (V) | Free | `KilledByAPixel/LittleJS` — **4,294**, 2026-10-15 | GitHub **v1.27.1** (2026-10-14); npm `littlejsengine` **1.27.2** (2026-10-15) | `littlejsengine` **1,912** | Any | Tiny, single-file engine (js13k-style); easy for an agent to hold in context (Practice). No `llms.txt` probed | Tiny games, size-limited jams | https://github.com/KilledByAPixel/LittleJS |
| **melonJS** | 2D | JS/TS | MIT (V) | Free | `melonjs/melonJS` — **6,413**, 2026-10-17 | **20.8.0** (2026-10-06) | `melonjs` **2,664** | Any | Works with Tiled maps natively (Practice). No MCP found | Tiled-based platformers/RPGs | https://melonjs.org |
| **Kontra** | 2D | JS | MIT (V) | Free | `straker/kontra` — **1,073**, 2026-01-30 | **10.0.2** (npm 2024-08-25) | `kontra` **831** | Any | Micro-library for js13k; low maintenance cadence | js13k / size-limited | https://straker.github.io/kontra |

**Notes (Web 2D)**
- Phaser v4 status — **Verified**: v4.0.0 stable 2026-04-10, "biggest release in Phaser's history", new render-node WebGL renderer, unified Filters, Canvas renderer deprecated; Mesh and Plane game objects removed. Sources: https://github.com/phaserjs/phaser/releases/tag/v4.0.0, https://phaser.io/download/phaser4, https://phaser.io/news/2026/05/phaser-3-vs-phaser-4.
- Phaser's own repo says "point your AI coding agent at the `skills/` folder" — this is the strongest first-party "AI-ready" signal among the web 2D engines (Verified, v4.0.0 release body).
- Sources for npm versions: `npm view <pkg> version time.modified` run 2026-10-17.

---

## 2. Web 3D

| Name | 2D/3D | Language | Licence | Cost | GitHub repo (stars, last push) | Latest version (date) | npm weekly | Windows | Agent-friendliness | Best for | URL |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **three.js** | 3D | JS | MIT | Free | `mrdoob/three.js` — **116,535**, 2026-10-17 | **r186** (GitHub release 2026-09-24; npm 0.186.1) | `three` **21,426,650** | Any | `threejs.org/llms.txt` + `threejs.org/docs/llms.txt` (5.4 KB) + `docs/llms-full.txt` (363 KB) (V). Community MCP: `DmitriyGolub/threejs-devtools-mcp` — 121 stars, 2026-10-14; `mintdotgg/mint-threejs-skills` — 114 stars (skills) (V, via search; unvetted). Very high LLM knowledge (≥10 years of code) but APIs change monthly (r-numbers) | Any 3D on web; default choice for agents | https://threejs.org |
| **React Three Fiber** (R3F) | 3D | TS/JSX | MIT | Free | `pmndrs/react-three-fiber` — **33,031**, 2026-10-17 | **9.8.2** (2026-10-17) | `@react-three/fiber` **6,241,878** | Any | Declarative JSX scene graph = good diffs for agents; needs React knowledge | React apps with 3D | https://r3f.docs.pmnd.rs |
| **drei** (R3F helpers) | 3D | JS | MIT | Free | `pmndrs/drei` — **9,971**, 2026-10-16 | **10.7.9** (2026-09-25) | `@react-three/drei` **4,415,079** | Any | Large helper library; reduces boilerplate | Cameras/controls/loaders for R3F | https://github.com/pmndrs/drei |
| **Babylon.js** | 3D | TS | Apache-2.0 | Free | `BabylonJS/Babylon.js` — **26,175**, 2026-10-16 | GitHub release **9.30.0** (2026-10-08); npm `@babylonjs/core` **9.31.0** (2026-10-15) | `@babylonjs/core` **403,145**; legacy `babylonjs` 26,656 | Any | `doc.babylonjs.com/llms.txt` (4.3 KB) + `babylonjs.com/llms.txt` (V); `llms-full.txt` = 404 (V). **Official MCP**: `@babylonjs/mcp-servers` 9.29.0 (Apache-2.0) — but it targets the *authoring editors* (Node Material, Geometry, Render Graph, Particle, GUI, Flow Graph, Smart Filters), **not** running-scene control (V: doc.babylonjs.com/toolsAndResources/mcpServers/). Full engine (physics, GUI, audio) in one package | Full 3D engine on web, WebGPU, XR | https://www.babylonjs.com |
| **PlayCanvas** (engine) | 3D | JS/TS | MIT | Free engine; editor is a cloud service (pricing **not researched → Unverified**) | `playcanvas/engine` — **17,076**, 2026-10-17 | **v2.23.3** (2026-10-15) | `playcanvas` **133,434**; `@playcanvas/react` 12,239 | Any | `developer.playcanvas.com/llms.txt` (9.5 KB) + `llms-full.txt` (295 KB) (V). **MCP: `playcanvas/editor-mcp-server`** — 144 stars, MIT, 2026-10-16; npm `@playcanvas/editor-mcp-server` 255/week (V) | Lightweight web 3D, mobile web, ads/playables | https://playcanvas.com |
| **PlayCanvas Editor** | 3D | TS | MIT (V) | Cloud-hosted web editor (account needed) | `playcanvas/editor` — **1,345**, 2026-10-16 | rolling | n/a | Browser | Scene/asset data live in cloud project; automation goes through the Editor MCP above | Browser-based visual 3D editing | https://playcanvas.com/editor |
| **A-Frame** | 3D/VR | JS (HTML-based entities) | MIT | Free | `aframevr/aframe` — **17,665**, 2026-07-13 | **1.8.0** (2026-06-24) | `aframe` **32,580** | Any | Declarative HTML scenes (readable text); built on three.js | WebXR/VR prototypes | https://aframe.io |

**Notes (Web 3D)**
- Popularity gap (Verified numbers, interpretation = Practice): `three` pulls 21.4M/week vs `@babylonjs/core` 0.40M and `playcanvas` 0.13M; three.js is ~50× Babylon on npm. npm weekly counts include CI and transitive installs, so the ratio overstates *human* usage.
- Conflict: Babylon GitHub latest release is 9.30.0 (2026-10-08) but npm already has 9.31.0 (2026-10-15). Likely npm publishes first/GitHub release notes lag; not resolved.

---

## 3. Physics libraries

| Name | 2D/3D | Language | Licence | Cost | GitHub repo (stars, last push) | Latest version (date) | npm weekly | Windows | Agent-friendliness / notes | Best for | URL |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Rapier** (Rust core + JS/WASM bindings) | 2D+3D | Rust → WASM/TS | Apache-2.0 | Free | `dimforge/rapier` — **5,878**, 2026-10-10. **`dimforge/rapier.js` is archived** (698 stars, last push 2026-07-12): "MERGED into dimforge/rapier (`typescript` dir)" | npm `@dimforge/rapier3d-compat` / `rapier2d-compat` **0.21.0** (2026-09-25) | `rapier3d-compat` **11,608,191**; `rapier2d-compat` **56,024**; non-compat `rapier3d` 28,795, `rapier2d` 34,647 | Any | Archived-repo move is a trap for agents that cite old repo URLs. `react-three-rapier` (pmndrs, 1,457 stars, MIT, 2026-10-12) = R3F wrapper | Deterministic modern 3D physics on web; Bevy ecosystem (Rust) | https://rapier.rs |
| **cannon-es** | 3D | TS | MIT | Free | `pmndrs/cannon-es` — **2,065**, 2024-01-06 | 0.20.0 (npm 2022-08-12) | `cannon-es` **134,156** | Any | Stable but effectively unmaintained (no push since 2024-01) | Simple 3D physics demos | https://github.com/pmndrs/cannon-es |
| **Matter.js** | 2D | JS | MIT | Free | `liabru/matter-js` — **18,478**, 2026-09-30 | 0.20.0 (npm 2024-06-23) | `matter-js` **357,681** | Any | Heavily represented in LLM training data; used by Phaser (Matter plugin) | 2D rigid bodies, toys | https://brm.io/matter-js |
| **Planck.js** | 2D | TS | MIT | Free | `piqnt/planck.js` — **5,296**, 2026-10-15 | npm `planck` **1.5.1** (2026-10-12) | `planck` **209,219** (legacy `planck-js` 1,898) | Any | Box2D (v2.x semantics) port in JS | Box2D-accurate 2D in JS | https://piqnt.com/planck.js |
| **Box2D** (C, v3) | 2D | C (WASM via `box2d3-wasm`) | MIT | Free | `erincatto/box2d` — **10,420**, 2026-10-17; `Birch-san/box2d3-wasm` — **66**, 2026-02-16 (GitHub API: no licence detected; npm says MIT) | `erincatto/box2d` **v3.1.1** (2025-06-04); `box2d3-wasm` npm **5.2.0** (2026-02-16); GitHub tag **v3.7.0** 2025-01-09 (mismatch, see conflicts) | `box2d3-wasm` **535** | Any (WASM) | Box2D v3 WASM binding is a tiny community project — risky dependency | Gold-standard 2D physics | https://box2d.org |
| **Ammo.js** | 3D | C++ → WASM (Bullet) | GitHub: NOASSERTION; licence file is Bullet's **zlib** (Practice) | Free | `kripken/ammo.js` — **4,580**, 2026-09-22 | npm `ammo.js` (version not captured) | `ammo.js` **4,165** | Any | Huge but API is auto-generated and awkward; low weekly downloads | Legacy three.js physics | https://github.com/kripken/ammo.js |
| **Jolt** (JoltPhysics.js) | 3D | C++ → WASM | MIT | Free | `jrouwe/JoltPhysics` — **11,751**, 2026-10-16; `jrouwe/JoltPhysics.js` — **580**, 2026-08-23 | JoltPhysics.js **1.1.0** (2026-07-11); npm `jolt-physics` **1.1.0** | `jolt-physics` **7,304** | Any | Used in Godot (Jolt module) and Horizon Forbidden West (Practice) | High-performance 3D, ragdolls | https://github.com/jrouwe/JoltPhysics |

**Notes (Physics)**
- Rapier JS npm packages are the only physics item downloaded at scale (11.6M/week for `rapier3d-compat`) — higher than `matter-js` (358K) and `cannon-es` (134K) combined by >20×. I did not investigate why (transitive via R3F ecosystem is my inference — **Unverified**).
- Box2D "v3" JS situation: `box2d3-wasm` npm version number (5.2.0) does not track Box2D core's v3.1.1; do not infer API parity.

---

## 4. Native / desktop engines and no-code tools

| Name | 2D/3D | Language | Licence | Cost | GitHub (stars, last push) | Latest version (date) | Windows | Agent-friendliness (text files, CLI, MCP, LLM knowledge) | Best for | URL |
|---|---|---|---|---|---|---|---|---|---|---|
| **Godot** | 2D+3D | GDScript, C# (.NET build), C++ | MIT (V) | Free, no royalties | `godotengine/godot` — **118,548**, 2026-10-16 | **4.7.2-stable** (2026-08-18); 4.7 = 2026-06-18; **4.8-beta1** 2026-10-15 | **Single exe in a zip**: `Godot_v4.7.2-stable_win64.exe.zip` = **86.0 MB**; .NET zip = **116.6 MB**; export templates `.tpz` = **1.28 GB** (V, GitHub release assets). Windows x86_64, x86_32, arm64 builds | `.tscn`/`.tres`/`project.godot`/`export_presets.cfg` are **plain text** (Practice, strong). Headless: `godot --headless --export-release "Web" build/index.html` (needs export preset + templates). Many MCP servers (below). Docs repo `godotengine/godot-docs` 5,825 stars; `docs.godotengine.org/llms.txt` = 404 (V). LLM knowledge: good for GDScript but **Godot 3 vs 4 API mix-ups are common** (Practice) | Best all-round free engine for agent-driven 2D and light 3D | https://godotengine.org |
| **Unity** | 2D+3D | C# | Proprietary (`UnityCsReference` repo = reference-source only; API: NOASSERTION; 13,029 stars) | Personal: free if revenue+funding ≤ **$200K**; Pro **from $2,310/yr/seat ($210/mo)**; Enterprise ≥ **$25M**; Industry for non-games > $1M. **Runtime Fee cancelled 2024-09-12**, not applicable to Unity 6 or earlier (V). Unity Pro/Enterprise **+5% from 2026-01-12**; Havok no longer included in 6.0 LTS plans (V) | `Unity-Technologies/UnityCsReference` (13,029; 2026-10-15) | **6000.6.6f1** (2026-10-15). 6.5 is EOL. **6.3 LTS supported to Dec 2027**; 6.0 LTS support ends Oct 2026 (V) | Installed via Unity Hub (`Unity Hub.exe --headless install --version …` CLI exists, V); Windows + Windows ARM64 editors | Scenes/prefabs are YAML (Practice) but binary assets + `.meta` GUIDs make agent edits fragile. **Official MCP via Unity CLI** (`unity pipeline install`, `unity mcp configure claude|cursor|vscode|windsurf`); in-editor AI Assistant MCP is **deprecated**; MCP is free, AI Assistant needs credits; official plugin with skills for Claude Code/Codex/Grok (V, unity.com/features/ai, docs.unity.com). Community: `CoplayDev/unity-mcp` **15,046** (MIT, 2026-10-08); `IvanMurzak/Unity-MCP` **4,486** (Apache-2.0, 2026-10-17); `CoderGamester/mcp-unity` **1,935** (MIT, 2026-10-11) | Mobile, 2D/3D commercial, huge asset store | https://unity.com |
| **Unreal Engine 5** | 3D (2D weak) | C++, Blueprints | Proprietary EULA; source on GitHub for Epic-account holders (`EpicGames/UnrealEngine` returns 404 publicly) | Free; **5% royalty on lifetime gross revenue above first $1M per product**; **3.5%** if "Launch Everywhere with Epic"; Epic Games Store revenue is royalty-free; **$1,850/seat/yr** for commercial non-game use with >$1M revenue (V, unrealengine.com/en-US/license and /release) | n/a (private) | **UE 5.8** (2026-06-23) — "last planned major UE5 release"; UE6 early access targeted end-2027 (V) | Win10 22H2 64-bit minimum; 8 GB RAM min, **32 GB recommended**; no fixed installer size — third-party estimate ~30–40 GB minimal, 100+ GB fuller (Unverified for exact size) | Mostly binary `.uasset` — poor for text diffs. **UE 5.8 ships an experimental built-in "Unreal MCP"** plugin: `http://127.0.0.1:8000/mcp`, `ModelContextProtocol.GenerateClientConfig ClaudeCode|Cursor|VSCode|Gemini|Codex|All`, **no authentication by default** (V, Epic docs + forum). Community: `ChiR24/Unreal_mcp` 957 (MIT, 2026-10-17); `chongdashu/unreal-mcp` 2,097 (last push **2025-04-22**, stale); `flopperam/unreal-engine-mcp` 1,101 (README says now owned by commercial "Aura") | AAA-quality 3D | https://www.unrealengine.com |
| **Bevy** | 2D+3D | Rust (ECS) | GitHub API: Apache-2.0 (project is dual MIT/Apache-2.0 — Practice) | Free | `bevyengine/bevy` — **49,086**, 2026-10-16 | **0.20.0** (2026-10-08); 0.19 = 2026-06-19; 0.18 = 2026-01-13 | Needs **Rust + MSVC toolchain** (Visual Studio Build Tools) (Practice) | **Code-first** (no editor yet; BSN scene system arrived in 0.19, asset loader not yet) → agents work well; **breaking changes every ~3–4 months** hurt LLM accuracy (Practice). MCP: `bevy_brp_mcp` **0.23.0** for Bevy 0.20 (repo `natepiano/bevy_brp`, 77 stars, 2026-10-13) uses the Bevy Remote Protocol (V, docs.rs) | Rust devs, data-oriented games | https://bevy.org |
| **LÖVE** | 2D | Lua | zlib (V, `license.txt`) | Free | `love2d/love` — **8,832**, 2026-09-20 | **11.5** (2023-12-03) is the newest release; **12.0 "Bestest Friend" unreleased** (milestone 92%, 74/80 issues) (V) | Zip/exe, no install; Windows 7 SP1+ for 12.0 | Pure Lua text; run with `love .`. Mature, small API; no MCP found | Small 2D games, learning | https://love2d.org |
| **pygame-ce** | 2D | Python | LGPL-2.1-or-later (V, README) | Free | `pygame-community/pygame-ce` — **1,694**, 2026-10-17 | **2.5.8** (2026-08-09) | `pip install pygame-ce` | Everything is Python text; very high LLM knowledge; PyPI weekly (pypistats, 2026-10-17): `pygame-ce` **187,137**, `pygame` **675,227** | Python learners, quick prototypes |https://pyga.me |
| **pygame** (original) | 2D | Python | LGPL (API returned none; Practice) | Free | `pygame/pygame` — **8,980**, 2025-11-01 | **2.6.1** (2024-09-29) | `pip install pygame` | Slower cadence than `pygame-ce`; PyPI weekly 675,227 | Legacy tutorials | https://www.pygame.org |
| **MonoGame** | 2D+3D | C# | **MS-PL** (V, LICENSE.txt; GitHub: NOASSERTION) | Free | `MonoGame/MonoGame` — **14,539**, 2026-10-11 | **3.8.6** (2026-10-07) | Windows: DesktopGL or WindowsDX NuGet; `dotnet new` templates. NuGet DesktopGL total 1.9M (V) | Code-first C#; Content Pipeline (MGCB) uses text `.mgcb` | XNA-style C# games | https://monogame.net |
| **raylib** | 2D+3D | C (bindings for ~70 languages) | **Zlib** | Free | `raysan5/raylib` — **35,259**, 2026-10-17 | **6.2** (2026-10-15) | Prebuilt Windows zips; `raylib.com/llms.txt` = 404 (V) | Small, single-header-style API → easy for agents; no editor | Learning, C/C++/Rust/Python bindings | https://www.raylib.com |
| **Defold** | 2D (+3D) | Lua | **Defold License 1.0** (Apache-2.0-derived; **source-available, not OSI**; you can sell games but not the engine) (V) | Free forever (Foundation-backed) | `defold/defold` — **6,394**, 2026-10-17 | **1.14.0** stable (2026-10-12); 1.14.1-alpha 2026-10-15 | Editor is a Windows download | `defold.com/llms.txt` = 200 (1.1 KB) (V). Text-based project files (Practice) | Mobile/web 2D, small builds | https://defold.com |
| **GameMaker** | 2D | GML | Proprietary | Free non-commercial; **Professional $99.99 one-time** (commercial desktop/web/mobile); **Enterprise $79.99/mo or $799.99/yr** (console) (V) | n/a | **2026.0.0** (IDE 16 / Runtime 23; update 1 = 2026-05-27); new GMRT runtime in beta (0.22.0) (V) | Windows IDE | Mostly binary-ish project (`.yyp`/`.yy` JSON is text, Practice); GML is niche for LLMs; no MCP found | 2D commercial indie | https://gamemaker.io |
| **Construct 3** | 2D (+3D objects) | Event sheets + JS | Proprietary | Free edition (25 events guest → 40 registered → 50 email-verified); Personal sub (Capterra lists $4.99/mo or $41.99/yr — secondary source); Startup if <$50K revenue, <$100K assets, ≤3 employees; Business plan (V for tiers; prices Practice) | n/a | **r506** stable (2026-10-14); **r495.3 LTS** (2026-10-13, support to end-2027) (V) | Browser/PWA, runs in Chrome/Edge | Project is JSON-ish inside a browser editor; **not agent-friendly**; no MCP found | No-code / visual 2D | https://www.construct.net |
| **GDevelop** | 2D (+3D) | Events (no-code), JS | **MIT** for core, GDJS, IDE and extensions; name & logo reserved (V, `LICENSE.md`; GitHub: NOASSERTION) | Free (40 AI credits/mo, nag screen on debugger); Silver/Gold/Pro **$7.99 / $13.99 / $39.99 per month** per PriceTrack (changed 2026-09-09; secondary source, Practice) | `4ian/GDevelop` — **27,644**, 2026-10-17 | **v5.6.284** (2026-10-14) | Desktop app + web app | **Has a built-in AI agent** that creates scenes/objects/behaviors/events in the open project; weekly AI credits per plan (V, wiki.gdevelop.io/gdevelop5/interface/ai/). No MCP found. Project JSON is text but event sheets are verbose | Non-coders wanting AI inside the editor | https://gdevelop.io |
| **Roblox Studio** | 3D platform | Luau | Proprietary | Free to create; platform revenue share applies (**not researched → Unverified**) | `Roblox/studio-rust-mcp-server` — **495**, MIT, **archived**, 2026-04-03 | rolling | Windows/macOS | **Built-in Studio MCP server** (Assistant ⟩ Manage MCP Servers ⟩ "Enable Studio as MCP server"); Quick Connect for Antigravity, Codex CLI, Claude Code, Claude Desktop, Cursor, Gemini CLI, VS Code; tools: data-model inspection, scripts, run Luau, start/stop playtest with simulated input. OSS server remains for customisation (V, create.roblox.com/docs/studio/mcp, DevForum) | Roblox experiences | https://create.roblox.com |

**Godot MCP servers (GitHub API, 2026-10-17)** — all community; I found **no first-party Godot MCP** (Unverified absence).

| Repo | Stars | Licence | Last push | Notes |
|---|---|---|---|---|
| `Coding-Solo/godot-mcp` | **6,130** | MIT | 2026-04-16 | `claude mcp add godot -- npx @coding-solo/godot-mcp`; npm `@coding-solo/godot-mcp` **12,796/week**; tools: launch editor, run project, get debug output, create scene, add node, export mesh library |
| `hi-godot/godot-ai` | **3,032** | MIT | 2026-10-17 | "Production-grade MCP server and AI tools for Godot" |
| `yurineko73/Godot-MCP-Native` | 855 | n/a | 2026-08-03 | |
| `youichi-uda/godot-mcp-pro` | 626 | n/a | 2026-09-24 | name suggests paid tier — Unverified |
| `ee0pdt/Godot-MCP` | 620 | n/a | 2025-03-19 | stale |
| `DaxianLee/godot-mcp` | 549 | n/a | 2026-01-14 | |
| `tugcantopaloglu/godot-mcp` | 490 | MIT | 2026-10-09 | 157 tools, GDScript + C#, "tested with Godot 4.7", has `export_project` (headless) |
| `tomyud1/godot-mcp` | 436 | MIT | 2026-10-17 | |
| `IvanMurzak/Godot-MCP` | 291 | n/a | 2026-10-17 | |
| `koltyakov/godot-mcp` | 1 | MIT | 2026-07-11 | explicit `godot --headless --export-release` wrapper with 10-min timeout |

---

## 5. Tile / level editors

| Name | Format(s) | Licence | Cost | GitHub (stars, last push) | Latest version (date) | Windows | Agent notes | Importers | URL |
|---|---|---|---|---|---|---|---|---|---|
| **Tiled** | **TMX/TSX (XML)** + **JSON** export; TMX doc format v1.8 | **Editor + plugins: GPL**; **libtiled, tmxviewer etc.: BSD-2-Clause**; TMX format spec CC BY-SA 3.0 (V, COPYING + doc page). GitHub API: NOASSERTION | Free (donations) | `mapeditor/tiled` — **12,967**, 2026-10-12 | **1.12.2** (2026-05-27); 1.12.0 = 2026-03-12 (V) | MSI installers (Win10+ x86_64; legacy Win7-8 x86) (V) | Text XML/JSON → agent can generate/validate maps directly; JSON 1.12 adds blend mode, capsule objects, typed list properties (V) | Native loader in Phaser (Practice), melonJS (Practice); Godot importers: **Unverified** | https://www.mapeditor.org |
| **LDtk** | JSON (`.ldtk`, optional per-level `.ldtkl`) | **MIT** | Free | `deepnight/ldtk` — **4,328**, 2026-10-15 | **1.5.3** (GitHub release 2024-01-15); JSON schema 1.5.3 (V) | Electron app for Windows | Official JSON schema + QuickType-generated importers; "Separate level files" option; can export to Tiled TMX. Fewer total commits visible in releases since 2024-01 although repo pushes continue | Official/community importers for Unity and Godot, Haxe API (Heaps, HaxeFlixel); **no Phaser importer listed** (V from docs; absence is an inference) | https://ldtk.io |
| **Ogmo Editor 3 CE** | JSON | MIT | Free | `Ogmo-Editor-3/OgmoEditor3-CE` — **591**, **2024-06-19** (low activity) | not captured (Unverified) | Windows build | Less used; prefer Tiled or LDtk | n/a | https://ogmo-editor-3.github.io |

---

## 6. Free asset libraries (licences verified from the primary page where fetched)

| Library | What it offers | Licence(s) | Attribution | Verified? | URL |
|---|---|---|---|---|---|
| **Kenney** | 2D sprites, UI, audio, 3D kits | **CC0 (public domain)** — "all game assets on the asset pages are public domain licensed (CC0). You're free to use them, even in commercial projects" | Not required; credit "Kenney" optional; **do not use the Kenney logo** | **Verified** (kenney.nl/support, 2026-10-17) | https://kenney.nl |
| **OpenGameArt** | Mixed community art/audio | **Per asset**: CC0, CC-BY 3.0/4.0, CC-BY-SA 3.0/4.0, OGA-BY 3.0/4.0, GPL 2.0/3.0 (and others) | Required for everything except CC0; suggested format `"[asset name]" by [author] licensed [license(s)]: [url]`. CC-BY/CC-BY-SA forbid DRM; CC-BY-SA needs derivative works under same licence | **Verified** (opengameart.org/content/faq) | https://opengameart.org |
| **itch.io asset packs** | Huge marketplace; free and paid | **Per pack** — each page has an "Asset license" field (e.g. CC0 v1.0, CC-BY 4.0, or custom). Examples seen: Ninja Adventure (CC0), SeaHook (CC-BY 4.0), Quaternius packs (CC0) | Per licence; some packs add AI disclosure field ("AI Assisted", "No generative AI was used") | **Verified** (sample pages). Filtering by licence works (e.g. `itch.io/game-assets/assets-cc0`) | https://itch.io/game-assets |
| **Quaternius** | Low-poly 3D models/characters/animation (FBX, glTF, OBJ, .blend) | **CC0** on pack pages checked (Universal Base Characters, Sci-Fi Essentials Kit, Ultimate RPG Pack, Ultimate Platformer Pack on itch). A search synthesis also said "newer assets may use a Quaternius Asset License that prohibits redistributing the assets" — **no primary page found for this, Unverified; check each pack** | None for CC0 | **Verified** for named packs; "all packs" = **Practice** | https://quaternius.com |
| **Poly Pizza** | 10k+ low-poly models (GLB/FBX), many mirrored from Quaternius/Kenney | **Per model: CC0 or CC-BY 3.0/4.0**. No site-wide licence page (`/license`, `/about`, `/faq` return 404 per a third-party catalogue dated 2026-10-04; I got 404 for `/about` today). Same creator can have different licences (a Quaternius "Animated Base Character" is CC-BY 3.0 there while his own site says CC0) | CC-BY: credit creator + title + source + licence; CC0: none | Verified by ToS (`poly.pizza/docs/tos`: "adhere to the Creative Commons licence that applies at the time of download"); per-model detail = Practice | https://poly.pizza |
| **Poly Haven** | HDRIs, PBR textures, 3D models | **All CC0** — "You can use our assets for any purpose, including commercial work"; website ToS forbid scraping; public API has separate API terms | Not required (appreciated) | **Verified** (polyhaven.com/license) | https://polyhaven.com |
| **ambientCG** | PBR materials/textures/HDRI/models | **CC0 1.0** for downloadable files and preview renders | Not required; suggested line: "Created using <asset name> from ambientCG.com, licensed under the Creative Commons CC0 1.0 Universal License." | **Verified** (docs.ambientcg.com/license) | https://ambientcg.com |
| **Mixamo** (Adobe) | Auto-rigger + humanoid characters + animations | **Adobe terms (not open licence)**: free with Adobe ID; royalty-free use in personal/commercial/non-profit projects incl. video games, **even animations on your own models**; **cannot redistribute or sell the raw character/animation files** (incl. packs for asset stores or free distribution) and **cannot use content to train machine-learning models** (Adobe community FAQ). Not available for Enterprise/Federated IDs or users with a China country code (Adobe help page). Bipedal humanoids only | Not required | **Verified** (helpx.adobe.com/creative-cloud/faq/mixamo-faq.html; community FAQ is Adobe-staffed but still a forum post → ML-training clause = Practice) | https://www.mixamo.com |
| **Freesound** | Sound effects/samples | **Per sound**: CC0, CC-BY (4.0), CC-BY-NC (4.0), plus legacy Sampling+ (retired by Creative Commons). **NC sounds cannot be used in games you earn money from** | Required for CC-BY and CC-BY-NC; freesound suggests `"sound" by user (url) licensed under CCBY 4.0` | **Verified** (freesound.org/help/faq) | https://freesound.org |

**Agent tip (Practice):** have the agent write an `ASSETS.md` listing each asset, source URL, licence and author while downloading; for Poly Pizza, itch.io, OpenGameArt and Freesound the licence differs per item.

---

## 7. Popularity triangulation beyond GitHub

### 7.1 Engine usage

| Source | Metric | Value | Date | Status |
|---|---|---|---|---|
| **GMTK Game Jam 2026** (organiser Bluesky post `3mrmx5mi3mk24`; Game World Observer 2026-07-29) | Self-reported engine, share of submissions | **Godot 47%, Unity 34%, GameMaker 5%, Unreal 3%, Other 11%**. Godot ≈ 4.9K games, Unity ≈ 3.6K, GameMaker 498, Unreal 319. First year Godot led after nine years of Unity leading. ~72 non-responders; ~100 disqualified games excluded | July 2026 | **Verified** (primary Bluesky text via search snippet + press) |
| GMTK 2025 (organiser Bluesky post `3lvkrymak5s26`; itch.io jam page) | Same | **Unity 41%, Godot 39%, Other/No engine 11%, GameMaker 5%, Unreal 4%**; 9,724 games in survey; itch.io page: 9,515 entries, 9,378 rated | Aug 2025 | **Verified** |
| GMTK history of Godot share (Game World Observer) | Godot share | 2022 16%, 2023 19%, 2024 37%, 2025 39%, 2026 47% | | Verified (press); one other source gives 13% for 2021 |
| **GameDiscoverCo** (33,000+ Steam apps scanned, SteamDB tech rules) | Share of released Steam games, 2025 | **Unity 49.4%, Unreal ≈20%, Godot 7.1%** (0.9% in 2020), "no obvious engine" 13% | 2025 data | **Verified** via newsletter text (secondary, but primary analyst) |
| GameDiscoverCo, games >$500K lifetime Steam gross | | **Unity 53.7%, Unreal 22.5%, Godot 4.1%** | | Verified (same source) |
| SteamDB-derived engine counts (Fronkon Games post, 2026-08-10) | Steam games per engine | Unity **65,490** (+159 that week), Unreal and Godot lower | 2026-08-10 | Practice (aggregator post; snippet truncated) |
| **GDC State of the Industry 2026** (via Yomimono and GameDiscoverCo) | Primary engine of surveyed devs | Unreal **42%**, Unity **30%**, Godot **5%**; survey skews to larger studios | 2026 | Practice (secondary relay) |
| **Sensor Tower VGI "Big Game Engine Report 2025"** | Steam releases 2024 | >50% of 2024 releases are Unity but only 26% of units; Godot + GameMaker + RPG Maker etc. "just over 10% of games, ~2% of units" | 2025 | Practice (PDF snippet) |
| **SteamDB Godot tech page** | https://steamdb.info/tech/Engine/Godot/ | **Fetchable but truncated** ("Too many products… results have been limited"), no total count visible | 2026-10-17 | Unverified (count not obtainable via fetch) |
| **itch.io "made with" pages** | https://itch.io/games/made-with-godot | **Fetchable, but page shows only a game list, no total count** | 2026-10-17 | **Unverified** (no count). itch.io asset pages do expose "Made with" and "Asset license" fields |

Interpretation (Practice): jam share (Godot first) and Steam share (Unity first, Unreal first by revenue/units) measure different populations — hobbyists vs shipped commercial games. Godot's jump between 2023 and 2024 coincides with Unity's Sept 2023 Runtime Fee announcement (cancelled 2024-09-12); that causal story is repeated by community commentary but is **not proven**.

### 7.2 npm weekly downloads (2026-10-06 → 2026-10-12, API)

| Package | Weekly | Package | Weekly |
|---|---|---|---|
| `three` | **21,426,650** | `matter-js` | 357,681 |
| `@dimforge/rapier3d-compat` | **11,608,191** | `planck` | 209,219 |
| `@react-three/fiber` | **6,241,878** | `cannon-es` | 134,156 |
| `@react-three/drei` | **4,415,079** | `playcanvas` | 133,434 |
| `pixi.js` | **1,452,916** | `@dimforge/rapier2d-compat` | 56,024 |
| `phaser` | **579,660** | `aframe` | 32,580 |
| `@babylonjs/core` | 403,145 | `babylonjs` (legacy umbrella) | 26,656 |
| `kaplay` | 12,966 | `excalibur` | 12,871 |
| `@playcanvas/react` | 12,239 | `jolt-physics` | 7,304 |
| `melonjs` | 2,664 | `littlejsengine` | 1,912 |
| `ammo.js` | 4,165 | `kontra` | 831 |
| `kaboom` (legacy) | 1,367 | `box2d3-wasm` | 535 |
| `@dimforge/rapier3d` | 28,795 | `@dimforge/rapier2d` | 34,647 |
| `@coding-solo/godot-mcp` | 12,796 | `@playcanvas/editor-mcp-server` | 255 |
| `godot-mcp` | 177 | | |

Caveat (Verified fact, Practice interpretation): npm downloads include CI runs, mirrors and transitive dependencies. Use as an order-of-magnitude indicator only. Python: `pygame` 675,227/wk vs `pygame-ce` 187,137/wk (pypistats, 2026-10-17).

### 7.3 GitHub stars at a glance (2026-10-17)

three.js 116.5K · Godot 118.5K · Bevy 49.1K · PixiJS 48.4K · Phaser 40.5K · raylib 35.3K · R3F 33.0K · GDevelop 27.6K · Babylon.js 26.2K · Matter.js 18.5K · A-Frame 17.7K · PlayCanvas 17.1K · Unity-MCP (CoplayDev) 15.0K · MonoGame 14.5K · Tiled 13.0K · UnityCsReference 13.0K · Jolt 11.8K · Box2D 10.4K · drei 10.0K · LÖVE 8.8K · pygame 9.0K · Defold 6.4K · melonJS 6.4K · Coding-Solo/godot-mcp 6.1K.

---

## 8. Windows 11 specifics

| Engine/tool | Windows 11 note | Status |
|---|---|---|
| Godot | Download zip, run the single `.exe` (no installer). 86.0 MB standard, 116.6 MB .NET zip. Export templates 1.28 GB (`.tpz`, installed via Editor → Manage Export Templates). Headless CLI: `Godot_v4.7.2-stable_win64.exe --headless …`; C# build needs .NET SDK | Verified sizes; install steps Practice |
| Unity | Unity Hub (`C:\Program Files\Unity Hub\Unity Hub.exe`); headless CLI `"Unity Hub.exe" -- --headless install --version <v>` on Windows (Verified, docs.unity.com). Editor builds for Windows and **Windows ARM64**; IL2CPP needs Visual Studio C++ workload (Practice) | Hub CLI Verified |
| Unreal | Epic Games Launcher; Win10 22H2 minimum, Windows 11 recommended; 8 GB min / 32 GB recommended RAM; disk size not published (≈30–40 GB minimal is a third-party estimate); source build ≥100 GB and Visual Studio required | Specs Verified; size Unverified |
| Bevy | Install Rust via rustup with the **MSVC** toolchain (VS Build Tools "Desktop development with C++"); first compile is long; use `cargo run` + `features = ["dynamic_linking"]` for faster iteration (Practice) | Practice |
| LÖVE | Zip with `love.exe`; `love .` runs a folder; 12.0 minimum Windows 7 SP1 64-bit (changelog wiki) | Verified for 12.0 minimum |
| pygame / pygame-ce | `pip install pygame-ce` (wheels for Windows). Don't install both in one venv (they share the `pygame` module name) | Practice |
| MonoGame | `dotnet new install MonoGame.Templates.CSharp`; DesktopGL (OpenGL, cross-platform) or WindowsDX (DirectX) packages | Practice (package names Verified on NuGet) |
| raylib | Prebuilt Windows zips or CMake/vcpkg; bindings via pip/npm/cargo | Practice |
| Defold / GameMaker / Construct / GDevelop | Native Windows apps (Construct runs in browser/PWA) | Verified existence |
| Web engines | Node.js 20+ and a bundler (Vite) — `npm create vite@latest`; no platform differences | Practice |
| Tiled | MSI (Win10+ x86_64); LDtk Electron installer | Verified (Tiled assets list) |

---

## 9. Agent-friendliness scorecard (editor-controlled by MCP/CLI)

| Engine | Text-based project? | Headless CLI build/export? | Official MCP? | Community MCP | `llms.txt` |
|---|---|---|---|---|---|
| Godot | Yes (`.tscn`, `.gd`, `project.godot`) | Yes (`--headless --export-release`) | No (not found) | Many (Coding-Solo 6.1K⭐) | No (404) |
| Unity | Partly (YAML scenes, `.meta` GUIDs) | Yes (`-batchmode`, Hub CLI, Unity CLI) | **Yes** (Unity CLI `unity mcp`; in-editor MCP deprecated) | CoplayDev 15.0K⭐ | No (404) |
| Unreal | No (binary `.uasset`) | Yes (UAT/`BuildCookRun`, Practice) | **Yes, experimental in 5.8** | ChiR24 957⭐ | n/a |
| Bevy | Yes (Rust) | Yes (`cargo`) | No | `bevy_brp_mcp` (77⭐ repo) | No (404) |
| Roblox | No (cloud `.rbxl`) | Limited | **Yes, built-in** | OSS server archived (495⭐) | n/a |
| PlayCanvas | Cloud project | Partly | No | `editor-mcp-server` 144⭐ | **Yes** |
| Babylon.js | Yes (code) | `npm` | **Yes (authoring editors only)** | few, <10⭐ | **Yes** |
| three.js | Yes | `npm` | No | threejs-devtools-mcp 121⭐ | **Yes** |
| Phaser | Yes | `npm` | No (editor MCP only) | — | **Yes (examples)** |
| PixiJS | Yes | `npm` | No | — | **Yes** |
| GDevelop | JSON | No | No | — | No |
| Defold | Yes | `bob.jar` (Practice) | No | — | **Yes** |

---

## 10. Top 10 headline facts

1. **Godot overtook Unity at GMTK Game Jam 2026: 47% vs 34%**, the first time in 9 years; in 2025 it was Unity 41% / Godot 39%. (Verified, organiser's Bluesky post.) On Steam, though, GameDiscoverCo found Unity 49.4% and Godot 7.1% of 2025 releases.
2. **Latest stable versions (2026-10-17):** Godot 4.7.2 (4.8 beta1 out since 2026-10-15), Unity 6000.6.6f1, Unreal 5.8, Bevy 0.20.0, Phaser 4.2.1, three.js r186, Babylon.js 9.31 (npm), PlayCanvas 2.23.3, MonoGame 3.8.6, Defold 1.14.0, raylib 6.2. LÖVE is still 11.5 (12.0 unreleased).
3. **Phaser 4 is stable since 2026-04-10** and ships 28 AI-agent skill files in its repo; models trained before 2026 will mostly emit Phaser 3 patterns.
4. **Unity's runtime fee is cancelled** (2024-09-12); Personal is free up to $200K revenue/funding; Pro is $2,310/yr/seat after a 5% increase in January 2026. **Unreal keeps 5% over $1M lifetime gross per product** (3.5% with Launch Everywhere). Godot (MIT), Defold, raylib, MonoGame cost nothing and take no royalties.
5. **Three first-party engine MCPs exist:** Unity (Unity CLI, in-editor MCP deprecated), Unreal 5.8 (experimental, unauthenticated local HTTP by default) and Roblox Studio (built-in). Babylon.js has official MCP only for its authoring editors. Godot has none first-party — but 10+ community servers (top: Coding-Solo/godot-mcp 6,130⭐, hi-godot/godot-ai 3,032⭐).
6. **Among the game-engine MCP repos I found, CoplayDev/unity-mcp (15,046⭐, MIT) is the largest**, ahead of every Godot MCP (search was via GitHub repo search plus web search, so smaller or differently named repos may be missed).
7. **three.js dominates web 3D by downloads:** 21.4M npm/week vs Babylon 0.40M and PlayCanvas 0.13M. Phaser has 0.58M; PixiJS 1.45M.
8. **`dimforge/rapier.js` is archived** (moved into `dimforge/rapier/typescript`); npm `@dimforge/rapier3d-compat` 0.21.0 is still published (11.6M/week).
9. **Asset licences:** Kenney, Poly Haven and ambientCG are CC0; Quaternius packs checked are CC0; OpenGameArt, itch.io, Poly Pizza and Freesound are **per item** (CC-BY needs credit; Freesound CC-BY-NC forbids commercial use). Mixamo is free and royalty-free for games but you cannot redistribute raw files.
10. **Godot on Windows is a single ~86 MB exe** (116.6 MB for C#) with plain-text scenes and a documented headless export, making it the easiest native engine for an agent loop to run on Windows 11; Bevy needs the Rust MSVC toolchain; Unreal's footprint is tens of GB.

---

## 11. Open questions / conflicts

1. **Kaplay version:** npm `latest` = 3001.0.19 (changelog date 2025-06-15; npm `time.modified` 2026-05-12), but GitHub's "latest release" and npm `next` = 4000.0.0-alpha.27.1 (2026-05-12). Which line to teach? Recommendation (Practice): 3001 for stability; v4000 still alpha.
2. **Excalibur date mismatch:** GitHub latest release v0.32.0 = 2025-12-23, but npm `time.modified` for 0.32.0 = 2026-09-21 (may be metadata edits, not a new release). Unresolved.
3. **Babylon.js:** GitHub release 9.30.0 (2026-10-08) vs npm 9.31.0 (2026-10-15) — GitHub release lags npm.
4. **`box2d3-wasm` versioning:** npm 5.2.0 (2026-02-16) vs GitHub latest release v3.7.0 (2025-01-09) vs Box2D core v3.1.1 (2025-06-04). Not reconciled.
5. **LDtk release cadence:** GitHub's latest release is 1.5.3 (2024-01-15) while the repo was pushed 2026-10-15; check whether newer builds exist only as pre-releases.
6. **GMTK 2026 totals:** press reports differ — Game World Observer ≈4.9K Godot games (47%); Yomimono says 10,511 tallied games out of 10,777 submissions. I did not find the organiser's raw totals. GMTK 2025 also has two numbers: 9,515 entries (itch.io) vs 9,724 games surveyed (organiser) — different denominators.
7. **Poly Pizza licence page:** none exists (404s); per-model licence only. A third-party catalogue says the ToS does not list which CC licences uploaders may choose, so NC/ND models cannot be excluded — **Unverified**; verify per model.
8. **Quaternius licence:** pack pages checked are CC0, but one search synthesis mentioned a "Quaternius Asset License" for newer assets; no primary source found.
9. **PlayCanvas Editor pricing and Roblox revenue share** were not researched (marked Unverified).
10. **Unity Pro price:** the pricing page shows "from $2,310/yr" and "$210/mo per seat" (prepaid yearly); Unity's own text says 5% increase from 2026-01-12. I did not check Unity Industry/Enterprise prices.
11. **Unreal Windows disk footprint:** no first-party fixed number; 30–40 GB (minimal) and 100+ GB (fuller) come from a third-party download page.
12. **Official Godot MCP:** none found, but I did not read Godot Foundation roadmap statements; absence is an inference.
13. **Itch.io "made with" counts and SteamDB totals** could not be retrieved via fetch (list pages without totals / truncated), so only secondary Steam numbers (GameDiscoverCo, Fronkon Games post) are used.
14. **Rapier npm volume (11.6M/week)** is surprisingly large vs. its GitHub footprint; cause (transitive R3F/three ecosystem installs, CI) not investigated.
15. **Phaser LLM accuracy on v4** and **LLM knowledge ratings** in this file are judgement calls (Practice); no benchmark was run.

---

## 12. Source URLs (primary unless noted)

- GitHub API (`gh api repos/OWNER/REPO`) for every repo listed, 2026-10-17; releases via `gh api repos/OWNER/REPO/releases/latest`.
- npm: https://api.npmjs.org/downloads/point/last-week/PKG ; `npm view PKG version time.modified` ; PyPI stats: https://pypistats.org/api/packages/pygame-ce/recent
- Godot: https://godotengine.org/download/archive/ ; https://godotengine.org/article/maintenance-release-godot-4-7-2/ ; https://github.com/godotengine/godot/releases/tag/4.7.2-stable
- Unity: https://unity.com/products ; https://unity.com/products/pricing-updates ; https://unity.com/legal/editor-terms-of-service/software ; https://unity.com/features/ai ; https://docs.unity.com/en-us/unity-cli/replace-mcp-server-unity-cli ; https://unity.com/releases/editor/archive ; https://docs.unity.com/en-us/hub/use-hub-cli
- Unreal: https://www.unrealengine.com/en-US/license ; https://www.unrealengine.com/release ; https://www.unrealengine.com/news/unreal-engine-5-8-is-now-available ; https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor ; https://dev.epicgames.com/documentation/unreal-engine/hardware-and-software-specifications-for-unreal-engine
- Phaser: https://github.com/phaserjs/phaser/releases/tag/v4.0.0 ; https://phaser.io/download/phaser4 ; https://phaser.io/llms.txt
- Babylon.js: https://doc.babylonjs.com/toolsAndResources/mcpServers/ ; https://www.npmjs.com/package/@babylonjs/mcp-servers ; https://doc.babylonjs.com/llms.txt
- three.js: https://threejs.org/llms.txt ; https://threejs.org/docs/llms-full.txt ; PlayCanvas: https://developer.playcanvas.com/llms.txt ; https://github.com/playcanvas/editor-mcp-server
- Bevy: https://bevy.org/news/bevy-0-20/ ; https://docs.rs/crate/bevy_brp_mcp/latest
- LÖVE: https://love2d.org/wiki/Version_History ; https://github.com/love2d/love/milestones
- Defold: https://www.defold.com/license/ ; https://github.com/defold/defold/releases ; MonoGame: https://github.com/MonoGame/MonoGame/blob/develop/LICENSE.txt
- GameMaker: https://gamemaker.io/en/get ; https://gamemaker.io/en/help/articles/how-to-upgrade-your-gamemaker-licence ; https://releases.gamemaker.io/release-notes/2026/0.html
- Construct: https://www.construct.net/en/make-games/buy-construct ; https://www.construct.net/en/make-games/releases/stable/r506 ; GDevelop: https://wiki.gdevelop.io/gdevelop5/interface/ai/ ; https://gdevelop.io/pricing ; https://pricetrack.dev/products/gdevelop-platform (secondary)
- Roblox: https://create.roblox.com/docs/studio/mcp ; https://devforum.roblox.com/t/assistant-updates-studio-built-in-mcp-server-and-playtest-automation/4474643
- Tiled: https://github.com/bjorn/tiled/blob/master/COPYING ; https://github.com/mapeditor/tiled/releases/tag/v1.12.2 ; https://doc.mapeditor.org/en/stable/reference/tmx-map-format/ ; LDtk: https://ldtk.io/json/ ; https://ldtk.io/docs/game-dev/loading/
- Assets: https://kenney.nl/support ; https://opengameart.org/content/faq ; https://polyhaven.com/license ; https://docs.ambientcg.com/license/ ; https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html ; https://community.adobe.com/questions-696/mixamo-faq-licensing-royalties-ownership-eula-and-tos-589400 ; https://freesound.org/help/faq/ ; https://poly.pizza/docs/tos ; https://quaternius.com/packs/universalbasecharacters.html ; https://quaternius.itch.io/ultimate-platformer-pack
- Popularity: https://bsky.app/profile/gamemakerstoolkit.com/post/3mrmx5mi3mk24 ; https://gameworldobserver.com/2026/07/29/unity-is-no-longer-the-leader-godot-has-become-the-most-popular-engine-at-gmtk-game-jam-2026 ; https://itch.io/jam/gmtk-2025/results ; https://newsletter.gamediscover.co/p/hows-pc-game-engine-usage-changing ; https://app.sensortower.com/vgi/assets/reports/The_Big_Game_Engines_Report_of_2025.pdf ; https://steamdb.info/tech/Engine/Godot/ (truncated)
