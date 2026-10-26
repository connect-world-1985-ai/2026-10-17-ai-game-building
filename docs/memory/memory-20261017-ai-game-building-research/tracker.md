# Tracker: AI Game Building Research Site

Status legend: [ ] todo · [~] in progress · [x] done · [!] blocked
Update after every finished item. A resuming agent continues at the first non-[x] item.

## Phase 1 — Research (fact sheets in research-notes/)

| # | Item | Owner | Status | Output |
|---|---|---|---|---|
| R1 | AI 2D image generation for game assets; what LLMs output alone | subagent (Sonnet) | [x] | research-notes/r1-ai-images.md |
| R2 | AI 3D generation, rigging, audio (procedural/AI/free) | subagent (Sonnet) | [x] | research-notes/r2-ai-3d-audio.md |
| R3 | Engines, libraries, physics, editors, free asset libraries (explorer data) | subagent (Sonnet) | [x] | research-notes/r3-engines-libraries.md |
| R4 | Documented agent-built games, builder platforms, world models, agent testing | subagent (Sonnet) | [x] | research-notes/r4-examples-platforms-testing.md |
| R5 | Publishing, licences, AI copyright, store policy, clone risk | subagent (Sonnet) | [x] | research-notes/r5-publishing-legal.md |
| R6 | Main-agent verification of key claims (GitHub API, licence pages, Steam policy, pricing) | main | [x] | see log 2026-10-17 R6 |

## Phase 2 — Shell + demos

| # | Item | Status |
|---|---|---|
| S1 | Adapt site.css (add demo/canvas styles) | [x] |
| S2 | Adapt site.js PAGES list + footer | [x] (copy-button JS added: initCopy) |
| S3 | demos.js: art-toggle platformer (code shapes vs sprites) | [x] |
| S4 | demos.js: game-loop / delta-time toy | [x] |
| S5 | demos.js: collision toy (AABB/circle, tunneling) | [x] |
| S6 | demos.js: game-feel toggles (accel, coyote, buffer, shake) | [x] |
| S7 | demos.js: procedural SFX toy (WebAudio) | [x] |
| S8 | Racing 3D mini-demo (pinned CDN Three.js r149 + SRI, offline fallback) | [x] |
| S9 | data-explorer.js + explorer page | [x] (76 entries) |
| S10 | Bundle CC0 sprites (Kenney Pixel Platformer) | [x] (credited on sources.html) |

## Phase 3 — Pages (main agent writes all)

| # | Page | Brief § | Status |
|---|---|---|---|
| P0 | index.html | overview | [x] |
| P1 | 01-assets.html | §1 taxonomy + access | [x] |
| P2 | 02-ai-images.html | §1 AI images | [x] |
| P3 | 03-ai-3d.html | §1 AI 3D | [x] |
| P4 | 04-audio.html | §1 audio | [x] |
| P5 | 05-engines.html | §2 (needs heading "Tile and level editors") | [x] |
| P6 | 06-ai-platforms.html | §2 platforms + world models | [x] |
| P7 | explorer.html | §2 explorer | [x] |
| P8 | 07-fundamentals.html | §3 | [x] |
| P9 | 08-platformer.html | §4a | [x] |
| P10 | 09-racing.html | §4b (needs heading "Play the mini racer") | [x] |
| P11 | 10-testing.html | §5 | [x] |
| P12 | 11-one-prompt-truth.html | §6 | [x] |
| P13 | 12-publishing-legal.html | §7 | [x] |
| P14 | 13-decision.html | §8 | [x] |
| P15 | 14-hands-on.html | §9 | [x] |
| P16 | 15-next.html | next directions | [x] |
| P17 | glossary.html | — | [x] |
| P18 | sources.html | sources + method + Kenney credit | [x] |

## Phase 4 — QA + report

| # | Item | Status |
|---|---|---|
| Q0 | Delete site/_test.html | [x] |
| Q1 | All pages load, 0 JS errors | [x] |
| Q2 | Internal link check 0 broken | [x] |
| Q3 | Demos playable (scripted input check) | [x] |
| Q4 | Mobile 375px no horizontal scroll | [x] |
| Q5 | file:// safety scan (no fetch/XHR/modules of local files) | [x] |
| Q6 | Code review of site JS | [x] skipped by user decision 2026-10-17 |
| Q7 | Update memory + report known gaps | [x] |

## Log
- 2026-10-17 22:30 — Folder + tracker + memory created; shell copied from AI-video site; R1–R5 dispatched (Sonnet, background).
- 2026-10-17 — S1–S8, S10 built and browser-tested via local http.server :8766 + `window.__demoState` hooks. P8 written.
- 2026-10-17 — R1–R5 fact sheets read in full.
- 2026-10-17 R6 — Main-agent verification: gh api for 16 repos (three.js 116,536; godot 118,548; phaser 40,495; pixijs 48,407; mcp-for-blender 31,344; unity-mcp 15,046; godot-mcp 6,130; Matrix-Game 2,545; ZzFX 803; playwright-mcp 38,276; openai/skills 28,119; bevy 49,086; Babylon 26,175; sprite-gen 2,860; kaplay 1,814; raccoon-heist 17) — all match fact sheets ±5. Fetched and confirmed: Willison Raccoon Heist post (prompt, Playwright, verdict quotes); Steam content survey AI section (pre-/live-generated); Gemini pricing (nano-banana-2.1 $0.0336/0.0504/0.113; Nano Banana Pro $0.134/0.24; Nano Banana 2 = $0.067 1K); OpenAI image docs (gpt-image-2.5-sunburst/flare, background transparent, consistency limitation); Meshy free = CC BY 4.0 (help page 2026-08-27); itch.io HTML5 limits + donations-only. FINDING: openai/skills `skills/.curated/develop-web-game` returns 404 on main → describe as "published at a pinned commit; not on main as of 2026-10-17". YouTube IDs on P8 confirmed via oEmbed; camera-talk title corrected.
- 2026-10-17 — P0–P7, P9–P18 written (all pages). Extra facts verified for P10: Kenney Car Kit 45 assets CC0, Racing Kit 110 CC0; Godot VehicleBody3D doc, cannon-es RaycastVehicle.ts, rapier.js ray_cast_vehicle_controller.ts exist; learning URLs (Godot first 2D/3D game, GPP, Red Blob, Three.js manual, Fix Your Timestep, LDtk, Tiled, ldjam, GMTK) return 200. GitHub API rate-limited in this pass → used R3 star counts. Added tools/build_sources.py (regenerates the per-page source list in sources.html; rerun after editing pages). site.js: initCopy() for .prompt-box. Fixed tabs markup on 12-publishing-legal.html, kicker group names on pages 10–12, platformer line-count claim (~370 lines, not 1,000).
- 2026-10-17 QA — via http://localhost:8766 + iframe harness: 19 pages, 0 JS errors, 0 broken internal links/anchors; explorer search/chips/agent filter/sort OK; chooser, copy buttons (5), tabs, sources filter OK; platformer (ran, jumped, 2 coins) and racer (speed 0→35, idx 3→34) driven via __demoState on real pages (demos pause when off-screen, so iframe tests show no movement). 375 px: no horizontal overflow on any page. file://: headless Edge --dump-dom on all 19 pages, 0 CONSOLE lines (probe confirmed logging works); TOC/explorer rows/copy buttons/canvases rendered. Browser tool refuses file:// URLs. _test.html deleted.
- 2026-10-17 23:22 — User asked to update memory, commit and push. Committed AI-game-building/ as [NO-TASK] docs: add AI game building field guide site; pushed to origin/master.
