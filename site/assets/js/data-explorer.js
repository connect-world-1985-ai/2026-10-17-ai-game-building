/* Explorer data: engines, libraries, tools and asset sources.
   Snapshot 2026-10-17. Stars from the GitHub API that day (null = closed source or not applicable).
   agent: 0-3 rating of how well a coding agent can work with it (author's judgment, see explorer page).
   ev: evidence label for the factual columns (v Verified, p Practice, u Unverified). */
window.EXPLORER_DATA = [
  // ---- Web 2D
  { n: "Phaser", cat: "Web 2D", lic: "MIT", cost: "Free", stars: 40495, win: "Browser / Node", agent: 3, best: "Full-featured browser 2D games; v4 ships 28 agent skill files", url: "https://phaser.io", ev: "v" },
  { n: "PixiJS", cat: "Web 2D", lic: "MIT", cost: "Free", stars: 48407, win: "Browser / Node", agent: 3, best: "Fast 2D renderer; bring your own loop, physics, audio", url: "https://pixijs.com", ev: "v" },
  { n: "KAPLAY", cat: "Web 2D", lic: "MIT", cost: "Free", stars: 1814, win: "Browser / Node", agent: 2, best: "Jams and beginners; tiny API (Kaboom successor)", url: "https://kaplayjs.com", ev: "v" },
  { n: "Excalibur.js", cat: "Web 2D", lic: "BSD-2-Clause", cost: "Free", stars: 2353, win: "Browser / Node", agent: 2, best: "TypeScript-first 2D", url: "https://excaliburjs.com", ev: "v" },
  { n: "LittleJS", cat: "Web 2D", lic: "MIT", cost: "Free", stars: 4294, win: "Browser / Node", agent: 2, best: "Tiny engine for size-limited jams", url: "https://github.com/KilledByAPixel/LittleJS", ev: "v" },
  { n: "melonJS", cat: "Web 2D", lic: "MIT", cost: "Free", stars: 6413, win: "Browser / Node", agent: 2, best: "Tiled-based platformers and RPGs", url: "https://melonjs.org", ev: "v" },
  { n: "Kontra", cat: "Web 2D", lic: "MIT", cost: "Free", stars: 1073, win: "Browser / Node", agent: 2, best: "js13k micro-library", url: "https://straker.github.io/kontra", ev: "v" },
  // ---- Web 3D
  { n: "three.js", cat: "Web 3D", lic: "MIT", cost: "Free", stars: 116536, win: "Browser / Node", agent: 3, best: "Default web 3D for agents; has llms.txt", url: "https://threejs.org", ev: "v" },
  { n: "React Three Fiber", cat: "Web 3D", lic: "MIT", cost: "Free", stars: 33031, win: "Browser / Node", agent: 3, best: "three.js as React components", url: "https://r3f.docs.pmnd.rs", ev: "v" },
  { n: "Babylon.js", cat: "Web 3D", lic: "Apache-2.0", cost: "Free", stars: 26175, win: "Browser / Node", agent: 3, best: "Full web 3D engine, WebGPU, XR", url: "https://www.babylonjs.com", ev: "v" },
  { n: "PlayCanvas", cat: "Web 3D", lic: "MIT (engine)", cost: "Free engine; cloud editor plans", stars: 17076, win: "Browser", agent: 2, best: "Light web 3D; editor MCP server", url: "https://playcanvas.com", ev: "v" },
  { n: "A-Frame", cat: "Web 3D", lic: "MIT", cost: "Free", stars: 17665, win: "Browser", agent: 2, best: "Declarative WebXR prototypes", url: "https://aframe.io", ev: "v" },
  // ---- Physics
  { n: "Rapier", cat: "Physics", lic: "Apache-2.0", cost: "Free", stars: 5878, win: "WASM", agent: 2, best: "Modern 2D/3D physics; old rapier.js repo archived", url: "https://rapier.rs", ev: "v" },
  { n: "Matter.js", cat: "Physics", lic: "MIT", cost: "Free", stars: 18478, win: "Browser", agent: 3, best: "2D rigid bodies; well known to models", url: "https://brm.io/matter-js", ev: "v" },
  { n: "Planck.js", cat: "Physics", lic: "MIT", cost: "Free", stars: 5296, win: "Browser", agent: 2, best: "Box2D semantics in JS", url: "https://piqnt.com/planck.js", ev: "v" },
  { n: "cannon-es", cat: "Physics", lic: "MIT", cost: "Free", stars: 2065, win: "Browser", agent: 2, best: "Simple 3D physics; unmaintained since 2024-01", url: "https://github.com/pmndrs/cannon-es", ev: "v" },
  { n: "Jolt Physics", cat: "Physics", lic: "MIT", cost: "Free", stars: 11751, win: "Native / WASM", agent: 1, best: "High-performance 3D, ragdolls", url: "https://github.com/jrouwe/JoltPhysics", ev: "v" },
  { n: "Box2D v3", cat: "Physics", lic: "MIT", cost: "Free", stars: 10420, win: "Native (C)", agent: 1, best: "Gold-standard 2D physics", url: "https://box2d.org", ev: "v" },
  // ---- Native engines
  { n: "Godot", cat: "Native engine", lic: "MIT", cost: "Free, no royalties", stars: 118548, win: "Single 86 MB exe", agent: 3, best: "Free all-round 2D + light 3D; text scenes; headless export", url: "https://godotengine.org", ev: "v" },
  { n: "Unity", cat: "Native engine", lic: "Proprietary", cost: "Free < $200K; Pro $2,310/yr", stars: null, win: "Unity Hub", agent: 2, best: "Mobile and commercial; official MCP via Unity CLI", url: "https://unity.com", ev: "v" },
  { n: "Unreal Engine 5.8", cat: "Native engine", lic: "Proprietary EULA", cost: "5% royalty above $1M", stars: null, win: "Tens of GB", agent: 1, best: "High-end 3D; experimental MCP", url: "https://www.unrealengine.com", ev: "v" },
  { n: "Bevy", cat: "Native engine", lic: "MIT / Apache-2.0", cost: "Free", stars: 49086, win: "Rust + MSVC", agent: 2, best: "Rust ECS, code-only; frequent breaking changes", url: "https://bevy.org", ev: "v" },
  { n: "LÖVE", cat: "Native engine", lic: "zlib", cost: "Free", stars: 8832, win: "Zip, love.exe", agent: 2, best: "Small 2D games in Lua", url: "https://love2d.org", ev: "v" },
  { n: "pygame-ce", cat: "Native engine", lic: "LGPL-2.1+", cost: "Free", stars: 1694, win: "pip", agent: 3, best: "Python learners and prototypes", url: "https://pyga.me", ev: "v" },
  { n: "MonoGame", cat: "Native engine", lic: "MS-PL", cost: "Free", stars: 14539, win: "dotnet", agent: 2, best: "Code-first C# (XNA style)", url: "https://monogame.net", ev: "v" },
  { n: "raylib", cat: "Native engine", lic: "zlib", cost: "Free", stars: 35259, win: "Prebuilt zips", agent: 2, best: "Small C API, many language bindings", url: "https://www.raylib.com", ev: "v" },
  { n: "Defold", cat: "Native engine", lic: "Defold License (source-available)", cost: "Free", stars: 6394, win: "Native app", agent: 2, best: "Mobile/web 2D, small builds; llms.txt", url: "https://defold.com", ev: "v" },
  { n: "GameMaker", cat: "Native engine", lic: "Proprietary", cost: "Free non-commercial; $99.99 commercial", stars: null, win: "Windows IDE", agent: 1, best: "Commercial indie 2D", url: "https://gamemaker.io", ev: "v" },
  // ---- No-code and AI builders
  { n: "GDevelop", cat: "No-code / AI builder", lic: "MIT", cost: "Free; AI credits by plan", stars: 27644, win: "Desktop + web", agent: 1, best: "No-code with built-in AI agent; real HTML5 export", url: "https://gdevelop.io", ev: "v" },
  { n: "Construct 3", cat: "No-code / AI builder", lic: "Proprietary", cost: "Free edition; subscription", stars: null, win: "Browser / PWA", agent: 0, best: "Visual event sheets", url: "https://www.construct.net", ev: "v" },
  { n: "Roblox Studio", cat: "No-code / AI builder", lic: "Proprietary", cost: "Free to create; revenue share", stars: null, win: "Windows / macOS", agent: 2, best: "Roblox experiences; built-in Studio MCP", url: "https://create.roblox.com", ev: "v" },
  { n: "Rosebud AI", cat: "No-code / AI builder", lic: "Proprietary (ToS ownership conflict)", cost: "Free credits; paid tiers", stars: null, win: "Browser", agent: 0, best: "Prompt-to-browser-game; export on Pro only", url: "https://rosebud.ai", ev: "v" },
  { n: "Astrocade", cat: "No-code / AI builder", lic: "Proprietary", cost: "Conflicting (free vs $9.99+)", stars: null, win: "Browser", agent: 0, best: "Prompt-to-game with social remix", url: "https://www.astrocade.com", ev: "u" },
  // ---- Editors
  { n: "Tiled", cat: "Level editor", lic: "GPL editor / BSD libs", cost: "Free", stars: 12967, win: "MSI installer", agent: 3, best: "TMX/JSON tile maps; Phaser loader", url: "https://www.mapeditor.org", ev: "v" },
  { n: "LDtk", cat: "Level editor", lic: "MIT", cost: "Free", stars: 4328, win: "Electron installer", agent: 3, best: "JSON levels with schema; Unity/Godot importers", url: "https://ldtk.io", ev: "v" },
  { n: "Blender", cat: "Level editor", lic: "GPL", cost: "Free", stars: null, win: "Installer / zip", agent: 2, best: "3D modelling and cleanup; scriptable with Python", url: "https://www.blender.org", ev: "p" },
  // ---- Agent bridges
  { n: "MCP for Blender", cat: "Agent bridge (MCP)", lic: "MIT", cost: "Free", stars: 31344, win: "uvx / PowerShell installer", agent: 3, best: "Drive Blender; generate via Tripo/Hunyuan/Rodin; import Poly Haven", url: "https://github.com/ahujasid/mcp-for-blender", ev: "v" },
  { n: "MCP for Unity (Coplay)", cat: "Agent bridge (MCP)", lic: "MIT", cost: "Free", stars: 15046, win: "Unity package", agent: 3, best: "Unity editor control + 3D generation tool", url: "https://github.com/CoplayDev/unity-mcp", ev: "v" },
  { n: "Godot MCP (Coding-Solo)", cat: "Agent bridge (MCP)", lic: "MIT", cost: "Free", stars: 6130, win: "npx", agent: 3, best: "Run project, read debug output, edit scenes", url: "https://github.com/Coding-Solo/godot-mcp", ev: "v" },
  { n: "Playwright MCP", cat: "Agent bridge (MCP)", lic: "Apache-2.0", cost: "Free", stars: 38276, win: "npx", agent: 3, best: "Browser control for testing web games (vision mode for canvas)", url: "https://github.com/microsoft/playwright-mcp", ev: "v" },
  { n: "OpenAI skills (develop-web-game)", cat: "Agent bridge (MCP)", lic: "None detected", cost: "Free", stars: 28119, win: "—", agent: 3, best: "Web game skill with render_game_to_text + advanceTime; not on main branch as of 2026-10-17", url: "https://github.com/openai/skills", ev: "v" },
  { n: "awesome-gamedev-agent-skills", cat: "Agent bridge (MCP)", lic: "Apache-2.0", cost: "Free", stars: 1572, win: "—", agent: 3, best: "74 portable SKILL.md files for many engines", url: "https://github.com/gamedev-skills/awesome-gamedev-agent-skills", ev: "v" },
  // ---- AI images
  { n: "OpenAI GPT Image 2.5", cat: "AI images", lic: "You own output (as law permits)", cost: "$30 / 1M image tokens", stars: null, win: "API", agent: 3, best: "General images; native transparency", url: "https://developers.openai.com/api/docs/guides/image-generation", ev: "v" },
  { n: "Google Nano Banana 2.1", cat: "AI images", lic: "Google claims no ownership", cost: "$0.0336 per 1K image", stars: null, win: "API", agent: 3, best: "Cheap images, multi-turn editing; no alpha", url: "https://ai.google.dev/gemini-api/docs/pricing", ev: "v" },
  { n: "FLUX 3 Image", cat: "AI images", lic: "API: commercial; Klein weights revenue-gated", cost: "~$0.048", stars: null, win: "API", agent: 2, best: "Up to 10 reference images", url: "https://docs.bfl.ml/release-notes", ev: "v" },
  { n: "Recraft V4.1", cat: "AI images", lic: "API: you own; no AI training", cost: "$0.035 raster / $0.08 SVG", stars: null, win: "API", agent: 3, best: "Native SVG icons and UI", url: "https://www.recraft.ai/docs/api-reference/pricing", ev: "v" },
  { n: "Ideogram 4.5", cat: "AI images", lic: "Commercial OK", cost: "$0.03–0.10", stars: null, win: "API", agent: 3, best: "Text in images; transparent mode; dry-run pricing", url: "https://ideogram.ai/api-pricing", ev: "v" },
  { n: "PixelLab", cat: "AI images", lic: "User owns (per directory)", cost: "~$0.007–0.06 per call", stars: null, win: "API / MCP", agent: 3, best: "Pixel art: 8-direction characters, skeleton animation, tilesets", url: "https://www.pixellab.ai/pixellab-api", ev: "v" },
  { n: "Retro Diffusion", cat: "AI images", lic: "Not extracted", cost: "$0.03 / $0.06 / $0.18", stars: null, win: "API / MCP", agent: 3, best: "Pixel-art models, animations, tilesets", url: "https://retrodiffusion.ai", ev: "v" },
  { n: "Scenario", cat: "AI images", lic: "Paid plans: commercial", cost: "$15–75 / month", stars: null, win: "API / MCP", agent: 3, best: "Train your own style; 97-tool MCP", url: "https://www.scenario.com/pricing", ev: "v" },
  { n: "Ludo.ai", cat: "AI images", lic: "Commercial on every plan", cost: "Pro $50 / month for API", stars: null, win: "API / MCP / CLI", agent: 3, best: "Game-asset suite with sprite animation", url: "https://ludo.ai/developers", ev: "v" },
  { n: "rembg", cat: "AI images", lic: "MIT", cost: "Free", stars: 25103, win: "pip", agent: 3, best: "Local background removal", url: "https://github.com/danielgatis/rembg", ev: "v" },
  { n: "spritefusion-pixel-snapper", cat: "AI images", lic: "MIT", cost: "Free", stars: 3286, win: "CLI / WASM", agent: 3, best: "Fix fake pixel art: grid snap + palette", url: "https://github.com/Hugo-Dz/spritefusion-pixel-snapper", ev: "v" },
  // ---- AI 3D
  { n: "Meshy", cat: "AI 3D", lic: "Free: CC BY 4.0; paid: you own", cost: "Free 100 cr; Pro $20", stars: null, win: "API / MCP", agent: 2, best: "Text/image to 3D, humanoid auto-rig", url: "https://www.meshy.ai/pricing", ev: "v" },
  { n: "Tripo", cat: "AI 3D", lic: "Free: non-commercial; paid: commercial", cost: "API $0.01 / credit", stars: null, win: "API", agent: 2, best: "Low-poly P1 model for game assets", url: "https://docs.tripo3d.ai/get-started/pricing.html", ev: "v" },
  { n: "TRELLIS.2", cat: "AI 3D", lic: "MIT", cost: "Free (24 GB GPU)", stars: 12076, win: "Linux only (tested)", agent: 1, best: "Open image-to-3D with PBR", url: "https://github.com/microsoft/TRELLIS.2", ev: "v" },
  { n: "Hunyuan3D 2.1 (open weights)", cat: "AI 3D", lic: "Excludes EU, UK, South Korea", cost: "Free", stars: 4210, win: "~29 GB VRAM", agent: 1, best: "Shape + PBR texture; not usable in the EU", url: "https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1", ev: "v" },
  { n: "Mixamo", cat: "AI 3D", lic: "Adobe terms; royalty-free in games", cost: "Free", stars: null, win: "Browser", agent: 1, best: "Humanoid auto-rig + animation library", url: "https://www.mixamo.com", ev: "v" },
  // ---- Audio
  { n: "ZzFX", cat: "Audio", lic: "MIT", cost: "Free", stars: 803, win: "Browser", agent: 3, best: "Tiny code-defined sound effects", url: "https://github.com/KilledByAPixel/ZzFX", ev: "v" },
  { n: "jsfxr", cat: "Audio", lic: "Unlicense", cost: "Free", stars: 283, win: "Browser", agent: 3, best: "sfxr in the browser", url: "https://jsfxr.me", ev: "v" },
  { n: "ChipTone", cat: "Audio", lic: "Outputs CC0", cost: "Free", stars: null, win: "Browser / desktop", agent: 1, best: "Retro SFX with more control", url: "https://sfbgames.itch.io/chiptone", ev: "v" },
  { n: "Tone.js", cat: "Audio", lic: "MIT", cost: "Free", stars: 14778, win: "Browser", agent: 3, best: "Code-written music and synths", url: "https://tonejs.github.io", ev: "v" },
  { n: "Howler.js", cat: "Audio", lic: "MIT", cost: "Free", stars: 25393, win: "Browser", agent: 3, best: "Audio file playback", url: "https://howlerjs.com", ev: "v" },
  { n: "ElevenLabs SFX / Music", cat: "Audio", lic: "Paid: commercial; free: non-commercial", cost: "SFX ~$0.12/min; music $0.15/min", stars: null, win: "API", agent: 2, best: "Realistic AI sound effects; local MCP archived", url: "https://elevenlabs.io/pricing/api", ev: "v" },
  { n: "Stable Audio 3", cat: "Audio", lic: "Community licence (< $1M)", cost: "API $0.08; open small models", stars: 805, win: "API / local", agent: 2, best: "AI SFX and music with open weights", url: "https://github.com/Stability-AI/stable-audio-3", ev: "v" },
  { n: "Google Lyria 3", cat: "Audio", lic: "Ownership terms not read", cost: "$0.04 clip / $0.08 song", stars: null, win: "API", agent: 2, best: "AI music via Gemini API", url: "https://ai.google.dev/gemini-api/docs/music-generation", ev: "v" },
  // ---- Asset libraries
  { n: "Kenney", cat: "Asset library", lic: "CC0", cost: "Free", stars: null, win: "Download", agent: 3, best: "2D, UI, 3D kits, audio in one consistent style", url: "https://kenney.nl", ev: "v" },
  { n: "Poly Haven", cat: "Asset library", lic: "CC0", cost: "Free", stars: null, win: "Download", agent: 3, best: "HDRIs, PBR textures, models", url: "https://polyhaven.com", ev: "v" },
  { n: "ambientCG", cat: "Asset library", lic: "CC0", cost: "Free", stars: null, win: "Download", agent: 3, best: "PBR materials", url: "https://ambientcg.com", ev: "v" },
  { n: "Quaternius", cat: "Asset library", lic: "CC0 (packs checked)", cost: "Free", stars: null, win: "Download", agent: 3, best: "Low-poly 3D and animated characters", url: "https://quaternius.com", ev: "v" },
  { n: "OpenGameArt", cat: "Asset library", lic: "Per item (CC0 / BY / SA / GPL)", cost: "Free", stars: null, win: "Download", agent: 2, best: "Large community library; check each licence", url: "https://opengameart.org", ev: "v" },
  { n: "itch.io assets", cat: "Asset library", lic: "Per pack", cost: "Free and paid", stars: null, win: "Download", agent: 2, best: "Huge marketplace; filter by CC0", url: "https://itch.io/game-assets", ev: "v" },
  { n: "Poly Pizza", cat: "Asset library", lic: "Per model (CC0 / CC-BY)", cost: "Free", stars: null, win: "Download", agent: 2, best: "Low-poly models", url: "https://poly.pizza", ev: "v" },
  { n: "Freesound", cat: "Asset library", lic: "Per sound (CC0 / BY / BY-NC)", cost: "Free", stars: null, win: "Download", agent: 2, best: "Sound effects; avoid BY-NC in paid games", url: "https://freesound.org", ev: "v" },
  { n: "Sonniss GDC bundles", cat: "Asset library", lic: "Royalty-free; no AI training", cost: "Free", stars: null, win: "Download (large)", agent: 1, best: "Professional sound effect libraries", url: "https://sonniss.com/gameaudiogdc/", ev: "v" },
  { n: "incompetech", cat: "Asset library", lic: "CC BY 4.0", cost: "Free with credit", stars: null, win: "Download", agent: 2, best: "Music by Kevin MacLeod", url: "https://incompetech.com", ev: "v" }
];

window.renderExplorer = function (opts) {
  var data = window.EXPLORER_DATA;
  var tbody = document.getElementById(opts.tbody);
  var search = document.getElementById(opts.search);
  var chipsBox = document.getElementById(opts.chips);
  var countEl = document.getElementById(opts.count);
  var minAgent = document.getElementById(opts.agent);
  var active = "All";
  var LABEL = { v: "Verified", p: "Practice", u: "Unverified" };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function dots(n) { var s = ""; for (var i = 0; i < 3; i++) s += i < n ? "●" : '<span class="off">●</span>'; return '<span class="dots" title="' + n + ' of 3">' + s + "</span>"; }

  tbody.innerHTML = data.map(function (d, i) {
    return '<tr data-i="' + i + '">' +
      '<td><a href="' + esc(d.url) + '">' + esc(d.n) + "</a></td>" +
      "<td>" + esc(d.cat) + "</td>" +
      "<td>" + esc(d.lic) + "</td>" +
      "<td>" + esc(d.cost) + "</td>" +
      '<td class="n" data-v="' + (d.stars == null ? -1 : d.stars) + '">' + (d.stars == null ? "—" : d.stars.toLocaleString("en-US")) + "</td>" +
      '<td data-v="' + d.agent + '">' + dots(d.agent) + "</td>" +
      "<td>" + esc(d.win) + "</td>" +
      "<td>" + esc(d.best) + "</td>" +
      '<td><span class="ev ' + d.ev + '">' + LABEL[d.ev] + "</span></td>" +
      "</tr>";
  }).join("");

  var cats = ["All"];
  data.forEach(function (d) { if (cats.indexOf(d.cat) < 0) cats.push(d.cat); });
  chipsBox.innerHTML = cats.map(function (c) {
    return '<button type="button" class="chip" aria-pressed="' + (c === active) + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
  }).join("");

  function apply() {
    var q = search.value.toLowerCase().trim();
    var min = parseInt(minAgent.value, 10) || 0;
    var shown = 0;
    Array.prototype.forEach.call(tbody.rows, function (r) {
      var d = data[+r.getAttribute("data-i")];
      var hay = (d.n + " " + d.cat + " " + d.lic + " " + d.cost + " " + d.best + " " + d.win).toLowerCase();
      var ok = (active === "All" || d.cat === active) && (!q || hay.indexOf(q) >= 0) && d.agent >= min;
      r.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    countEl.textContent = shown + " of " + data.length + " shown";
  }

  chipsBox.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-cat]");
    if (!b) return;
    active = b.getAttribute("data-cat");
    Array.prototype.forEach.call(chipsBox.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    apply();
  });
  search.addEventListener("input", apply);
  minAgent.addEventListener("change", apply);
  apply();
};
