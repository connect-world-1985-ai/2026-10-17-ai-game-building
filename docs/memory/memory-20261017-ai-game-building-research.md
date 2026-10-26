# Memory: AI Game Building Research Site

**Generated**: 2026-10-17 22:35
**Last updated**: 2026-10-17 23:22
**Project**: D:\git\scratches\2026.10\AI-game-building
**Focus**: Research how AI coding agents build 2D/3D games (esp. where art/audio comes from) and teach it via a local static tutorial site.

---

## Goal & Scope (required)

Raymond (experienced software engineer, Windows 11, uses Claude Code / Codex / Cursor, never made a game) wants independent, evidence-based, vendor-neutral research with fresh web sources on how agents build 2D and 3D games. Core confusion: where sprites, textures, 3D models, sounds, and music come from (code-drawn vs free packs vs AI image/3D APIs vs procedural audio). Also engines/libraries, game fundamentals, two worked examples (Mario-like platformer, 3D car racer), agent testing, truth behind "one short prompt" games, publishing/legal, decision framework + learning path, 3–5 hands-on starter projects with ready prompts.

Deliverable: multi-page static site in `AI-game-building/site/` that opens from file:// (classic scripts only, no ES-module imports of local files, no fetch/XHR of local files, data in JS globals). Shared CSS/JS, sidebar, per-page TOC, prev/next, light/dark, mobile. Inline SVG diagrams. Playable embedded demos (art-toggle platformer, game-loop/delta-time toy, collision toy, game-feel toggles). Sortable/filterable explorer of engines/libraries/asset sources. Required pages: glossary, sources-and-method, final "3–5 directions for our next discussion".

Evidence: primary sources, GitHub API stars/licences, every number dated, conflicts stated, visible labels Verified / Practice / Inference / Unverified / Experimental.

---

## Key Decisions (required)

1. **Reuse the AI-video site shell** (`site.css`, `site.js` copied from `../AI-video-generation-techniques/site/assets/`) and adapt to this topic. User approved 2026-10-17.
2. **Handwritten multi-page HTML**; rejected JS-rendered-from-data pages (fragile) and static generators (build step forbidden).
3. **Demos self-contained Canvas 2D**; the racing page may use a pinned-CDN Three.js demo with graceful offline fallback (or stay a diagram if too risky).
4. **Sprite side of art toggle**: bundle a few Kenney CC0 tiles with credit if downloadable reliably; otherwise hand-made pixel-art sprites as JS data (labelled as such).
5. **Subagents**: Claude Sonnet (normal speed) gather sourced fact sheets into `research-notes/`; main agent verifies key claims, makes all judgments, writes every page.
6. **Execute directly, tracker is the plan** (no writing-plans doc). User approved.

---

## Confirmed Assumptions (required)

- Research date baseline 2026-10-17; prices/stars must carry date and source; never invent numbers.
- Windows 11 is the user's environment.
- No long install guides; short snippets OK. No copying Nintendo characters/levels.
- No git commits unless the user asks (commit format `[TASK-ID] type: description`; previous related work used `[NO-TASK]`).

---

## Key Discoveries (required)

- An LLM alone outputs code/text only; it can "draw" via Canvas/SVG/procedural meshes/WebAudio. Raster images, image-to-3D, music, voice need external tools via REST script, CLI, MCP or skills.
- Best-documented one-prompt game: Willison's Raccoon Heist (7-line prompt, Claude Fable 5, Playwright on 3 viewports, 7 commits) — author: "not a good game". Codex racer (2026-02-02) = 1 human prompt + 2 skills + scripted generic follow-ups + 7M+ tokens.
- OpenAI `develop-web-game` skill exists only at pinned commit 82d2c5b4; 404 on `main` (2026-10-17).
- Benchmarks: GameDevBench best 53.8% (visual feedback GPT-5.4 41.1→52.0); GBQA best 48.39% of bugs; WorldBench code-only judge credited 4/5 deleted features.
- Agent-friendly stacks: Canvas / Phaser 4 (ships 28 agent skill files; models emit v3), Three.js (116,535★), Godot 4 (118,548★, text scenes, community MCPs; Coding-Solo 6,130★). Unity/Unreal/Roblox have official MCP routes.
- Legal: USCO Part 2 (prompts alone ≠ authorship); Steam pre- vs live-generated AI disclosure (public since Jan 2026); itch.io AI field mandatory for asset packs only; EU AI Act Art 50 from 2026-08-02; SmartScreen: EV no longer bypasses, Azure Artifact Signing individuals US/CA only.
- Conflicts kept visible: Steam 21 vs 30 days; Vibe Jam 2026 prize/entries; Meshy/Tripo free-plan wording. Full list on `site/sources.html#known-gaps-and-conflicts`.

---

## Current State (required)

- **Working**: all 19 pages + explorer (76 entries) + demos written; QA passed (0 JS errors, 0 broken links/anchors, demos driven via `__demoState`, 375 px no overflow, file:// verified with headless Edge). `_test.html` deleted.
- **Pending**: nothing; code review skipped by user decision (2026-10-17).
- **Blocked**: none. Committed and pushed on user request 2026-10-17 23:20 (only the `AI-game-building/` folder; other untracked folders in the repo left alone).
- **Tooling note**: `tools/build_sources.py` regenerates the source list in `sources.html`; rerun after editing page links. Local server `python -m http.server 8766` in `site/` used for QA.

Live checklist: `./memory-20261017-ai-game-building-research/tracker.md`

---

## Next Steps (required)

1. [x] Q6 code review — skipped by user.
2. [x] Final report delivered; user asked to commit and push (2026-10-17 23:20): committed `AI-game-building/` only as `[NO-TASK] docs: add AI game building field guide site` and pushed to origin/master.
3. [ ] Next session: pick one of the five directions on `site/15-next.html`, or revise pages after user feedback.

---

## Notes for Next Session

- A resuming agent reads this file, then `tracker.md`, then research notes, then continues the first unchecked tracker item.
- Nav order is the PAGES array in `site/assets/js/site.js`.
- The in-app browser pane can't load relative CSS from file:// — QA via a local static server (python -m http.server) plus a static scan for fetch/import/module usage.

---

## References (required)

- `site/` — deliverable website (open `site/index.html`)
- `./memory-20261017-ai-game-building-research/tracker.md` — tracker / plan
- `./memory-20261017-ai-game-building-research/research-notes/` — sourced fact sheets r1–r5
- `../AI-video-generation-techniques/` — sibling project whose site shell was reused

---

**Confirmed at**: 2026-10-17 22:30
