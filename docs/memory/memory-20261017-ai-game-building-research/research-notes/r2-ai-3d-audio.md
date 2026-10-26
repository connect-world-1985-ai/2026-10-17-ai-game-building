# R2 — AI 3D generation + game audio (fact sheet)

- Research date / access date for every claim below: **2026-10-17** unless a different date is shown.
- Audience: experienced software engineer (Windows 11; Claude Code / Codex / Cursor), first game.
- Method: WebSearch + WebFetch for vendor pages/docs/licence files; GitHub REST API (`gh api`) for stars/licence/last-push.
- Claim tags:
  - **[V]** = Verified — I read the primary source (vendor page, doc, licence file, repo API) in this session.
  - **[P]** = Practice — secondary/third-party source, community answer, or vendor marketing; plausible but not primary.
  - **[U]** = Unverified — could not confirm; reason given.
- Star counts are GitHub API values on 2026-10-17 (they move daily). "pushed" = last push date.
- Money: USD. Credits shown as the vendor shows them. Derived numbers (e.g. "$0.30 per model") are marked *derived*.
- Where a price page was a JS/garbled render I cross-checked with the vendor's help centre/docs and say so.

---

## 0. TL;DR for the tutorial author

1. 3D generators produce **blockout-to-prop quality**, not engine-ready meshes. Budget for decimate/retopo, re-UV, bake, LOD. [P, strong consensus; one study measured it — §A4]
2. The hosted market consolidated: **Luma Genie is shut down (2026-01-01)** and **CSM Cube shut down (2026-01-05)**. Meshy, Tripo, Rodin, Hunyuan (Tencent HY 3D Global), Sloyd, Spline, Kaedim and Autodesk Wonder 3D remain. §A1
3. **Free tiers differ legally**: Meshy Free = CC BY 4.0 (commercial OK with credit); Tripo Free = public models, non-commercial. §A1
4. **Tencent Hunyuan3D open weights are not usable in the EU, UK or South Korea** — and the licence also says you may not use the *Output* outside the Territory. §A1.3
5. **Blender MCP was renamed** (`ahujasid/blender-mcp` → `ahujasid/mcp-for-blender`), 31k stars, can drive Tripo / Hunyuan3D / Rodin generation. §A3
6. **ElevenLabs' local MCP server is archived (2026-08)**; the hosted MCP only manages *agents*, not SFX/music generation → for SFX use REST API. §B2
7. **Suno has no public API; Udio has downloads disabled.** Neither is a build-pipeline option today. §B2
8. For **free/safe game audio**: ZzFX/jsfxr/ChipTone (procedural, MIT/CC0 outputs), Kenney (CC0), Sonniss GDC bundles (royalty-free, no AI training), Freesound (check per-sound licence; CC-BY-NC is a trap). §B1, §B3
9. Pure-AI output has weak copyright protection in the US (Copyright Office Part 2, 2025-01-29): prompts alone ≠ authorship. §B4
10. Procedural code (three.js primitives, CSG, SDF shaders) is the **zero-asset, zero-licence-risk** path and is what agents do best. §A5

---

# PART A — 3D

## A1. Text/image-to-3D services (Oct 2026)

### A1.1 Summary table — hosted services

| Name | What | Price (dated 2026-10-17) | Formats out | PBR / topology / rig | Licence of outputs | API / MCP | Source | Tag |
|---|---|---|---|---|---|---|---|---|
| **Meshy** (latest model `meshy-7.1`; `meshy-6`, `meshy-6-lite`, `meshy-t2`, `meshy-t2.5` also listed) | Text/Image/Multi-image→3D, retexture, remesh, auto-rig, animation, Text-to-Motion | Free $0 (100 credits/mo). Pro $20/mo (1,000 cr). Premium $40/mo (3,000 cr). Ultra $100/mo (8,000 cr). Studio team $70/seat/mo (5,500 pooled cr). Enterprise custom. | FBX, OBJ, USDZ, GLB, STL, BLEND (web); API GLB/FBX etc. | PBR textures 2K/4K/8K; remesh 5 cr; UV unwrap 5 cr; "Smart Topology" (`meshy-t2`/`t2.5` 5 cr mesh-only); humanoid-only rigging | Free: **CC BY 4.0** (commercial with attribution). Paid: you own outputs | REST API (paid plan only); official local MCP server; Blender/Unity/Godot/Unreal/Maya bridges | https://www.meshy.ai/pricing ; https://help.meshy.ai/en/articles/12062933-which-meshy-plan-is-right-for-you-free-vs-pro-vs-premium-vs-ultra ; https://docs.meshy.ai/en/api/pricing | V (pricing/licence), see conflicts |
| **Tripo (Tripo3D / VAST)** — models H3.1 (`v3.1-20260211`), P1 (`P1-20260311`), H3.0, H2 | Text/Image/Multiview→3D, retopo, segmentation, auto-rig, retarget | Studio: Free $0 (200 cr/mo ≈13 models). Pro $20/mo billed annually ($240/yr; 3,000 cr ≈200 models). Max $90/mo billed annually ($1,080/yr; 25,000 cr). Team listed from $55/seat/mo billed annually (ambiguous, see conflicts). **API: 1 credit = $0.01.** | GLB/FBX/OBJ/USDZ etc. (conversion task 5 cr) | PBR; H3.1 up to 2M faces; **P1: face limit 50–20,000, "refined geometry at low face counts, built for game assets"**; `quad=true` (+5 cr, default face_limit 10,000, recommended ≤150,000); `smart_low_poly` (+10 cr); auto-rig 25 cr | Free: public models, **non-commercial**. Pro and up: private, commercial | REST API; official MCP (alpha, Blender-addon based); Blender/Unity/Unreal/Godot/Maya/ZBrush DCC bridge | https://www.tripo3d.ai/pricing ; https://docs.tripo3d.ai/get-started/pricing.html ; https://developers.tripo3d.ai/en/models/p1 ; https://developers.tripo3d.ai/en/models/v3-1 | V |
| **Rodin / Hyper3D (Deemos)** — Gen-2, Gen-2.5 | Image/Text→3D (1–5 images), smart low-poly, HD textures, quads | Free; Creator $24/mo billed yearly ($288/yr); Business $120/mo monthly or $96/mo yearly ($1,152/yr). API access **only Business+** (120/240 RPM). API: Gen-2 base = **0.5 credits**/generation; Gen-2.5 +0.5 (Extreme-High tier) and +2.0 (extreme-high texture). Credit price: **conflict $1 vs $1.50** (below) | GLB/FBX/OBJ/USDZ/STL (vendor table; not individually re-read) | Pack textures 2K→4K "HighPack"; High-Poly Quads on Business; baked normals from high-poly | Paid plans: commercial licence. Free tier: **unclear** (no official page states it) | REST API v2 (`api.hyper3d.com/api/v2/rodin`); reachable from Blender MCP | https://hyper3d.ai/pricing ; https://docs.hyper3d.ai/en/api-specification/rodin-gen2 ; https://docs.hyper3d.ai/en/api-specification/rodin-gen2-5 | V (API pricing/plans), P (free-tier licence via https://assetforgeindex.com/tools/rodin-hyper3d) |
| **Tencent HY 3D Global** (Hunyuan3D 3.0 / 3.1 hosted) | Text/Image/Sketch/Multi-view→3D; Part generation; Smart Topology; UV unfold; Auto Rigging; format convert | Pay-as-you-go **$0.02/credit** (postpaid). Prepaid packs 1,000 cr $15 … 100,000 cr $1,350 ($0.015–0.0135/cr). Normal 25 cr (=$0.50 *derived*); Geometry 15; Sketch 25; LowPoly 30; Express 15; +10 each for PBR / multi-view / custom face count | glTF/OBJ/FBX etc. (via Convert API) | PBR optional (+10 cr); LowPoly mode; Smart Topology | Hosted API terms (not read). Open-weight licence territory limits **do not** apply to hosted 3.x per a third-party reading | Tencent Cloud international API; also Blender MCP "Official API mode" | https://www.tencentcloud.com/document/product/1281/74121 ; https://staticintl.cloudcachetci.com/doc/pdf/product/pdf/1281_74120_en.pdf | V (credit table), P/U (output licence) |
| **Sloyd** | Parametric + AI text/image→3D, rig/animate | Guest free (1 daily gen, personal-use licence, GLB/OBJ). Plus $15/mo ($12.50/mo yearly; 50 cr). Pro $41.67/mo billed yearly ($500; 350 cr). API: separate prepaid credits | GLB, OBJ, FBX (FAQ) | "Ultra" 500K tris costs 5 cr; AI rigging/animation unlimited on paid; split-to-parts 20 cr | Plus/Pro: commercial use. **Reselling/marketplace redistribution: Pro only.** AI training with models: not allowed (Pro: contact) | API (separate); Unity/Unreal/Blender plugins | https://www.sloyd.ai/pricing | V |
| **Spline AI** | In-editor AI 3D gen (Hunyuan3D, Hunyuan 3.1 Pro, Trellis 2, Meshy as selectable backends) | Hobby $15/mo ($12 yearly, 2,000 AI cr). Pro $30 ($25, 3,000). Max $70 ($60, 10,000). AI 3D gen is paid-only | GLB (download); scene export GLTF/GLB (colour+texture needs Pro/Max), USDZ/STL on Pro/Max | Textured GLB with PBR maps | Not read (workspace terms) | "Spline MCP" listed on site; agent in editor | https://spline.design/pricing ; https://spline.design/ai-generate ; https://docs.spline.design/generate/ai-3d-generation | V (pricing), U (licence) |
| **Autodesk Wonder 3D** (Flow Studio) — launched 2026-03-04 | Text/Image→3D characters & props; remesh; texture; also offers Trellis 2.0 | Free $0 (300 cr/mo); Lite $10 mo / $7 annual; Standard $45 / $30; Pro $95 / $64; each Wonder 3D generation **20 credits** | USD, STL, OBJ (Wonder 3D); Maya/Blender scene exports | Editable; "Remesh" workflow | Not read | UI; no MCP found | https://blogs.autodesk.com/media-and-entertainment/2026/03/04/introducing-wonder-3d-text-and-image-to-3d-in-flow-studio/ ; https://blogs.autodesk.com/media-and-entertainment/2026/09/28/autodesk-flow-studio-pricing-and-subscription-guide/ | V (price/credits), U (licence) |
| **Kaedim** | AI + in-house artists ("80% starting point"), game-ready pipeline (retopo, UV, textures, rig) | Trial $50/7 days (5 cr; auto-renews to Indie; "normally $100"); **Indie $400/mo (20 cr)**; **Pro $1,200/mo (60 cr)**; Enterprise/API custom | OBJ, FBX, GLB, GLTF, USD, MTL | "Quads, separate sub-meshes, watertight"; prototype ≤300K polys; hard-surface best; humans/animals/trees out of scope for *prototype* tier | Vendor: "full ownership and commercial rights"; not used for training | Enterprise API only | https://kaedim3d.com/ ; https://docs.kaedim3d.com/welcome/faq ; plan prices via https://aiproviderindex.com/platform/kaedim (updated 2026-10-14) and https://www.anygen.io/showcase/kaedim/index.html (2026-09-06) | V (docs), P (plan prices via aggregators) |
| **Luma Genie** | Text→3D | **Discontinued — sunset 2026-01-01** (existing assets exportable) | — | — | — | — | https://apps.apple.com/us/app/luma-3d-capture/id1615849914 (App Store notes "officially Sunset Genie since January 1, 2026") | V (App Store text via search result) |
| **CSM (Common Sense Machines) Cube** | Image/text/sketch→3D | **Shut down 2026-01-05** (all data deleted). Former plans $20 / $60 / $499 / $2,000. | — | — | Former free tier: CC BY 4.0 | — | https://www.reddit.com/r/TopologyAI/comments/1pxo2n5/csm_cube_is_shutting_down_on_january_5th_2026/ (quotes the shutdown notice); https://2dto3d.app/compare/csm-ai-vs-2dto3d (csm.ai domains unreachable as of 2026-08-20, *their* check) | P (second-hand) — acquisition by Alphabet/Google DeepMind (Jan 2026) is **U**: only two secondary sources |

### A1.2 Open-weight models

| Name | What | Licence (code / weights) | Stars / last push (2026-10-17) | Hardware / platform notes | Source | Tag |
|---|---|---|---|---|---|---|
| **Microsoft TRELLIS** (v1) | Image→3D (structured latents) | MIT | 13,982 / 2026-06-26 | Linux-centric | https://github.com/microsoft/TRELLIS | V (API) |
| **Microsoft TRELLIS.2** (4B, paper arXiv 2512.14692, repo created 2025-11-26) | Image→3D with full PBR (base colour, roughness, metallic, opacity), arbitrary topology (O-Voxel) | README: "model and code released under MIT" (nvdiffrast / nvdiffrec dependencies have own licences) | 12,076 / 2026-07-10 | **NVIDIA GPU ≥24 GB; "tested only on Linux"**; ~3 s / 17 s / 60 s at 512³ / 1024³ / 1536³ on H100 | https://github.com/microsoft/TRELLIS.2 | V (README); HF weights licence text itself not read → U |
| **Tencent Hunyuan3D-2 / 2.1 / Omni / Part** | Shape + PBR texture (2.1 has PBR + training code) | Custom "Tencent Hunyuan 3D Community License" — see A1.3 (GitHub API: NOASSERTION) | 2: 15,142 (pushed 2025-10-28); 2.1: 4,210 (2025-10-17); Omni: 643; Part: 548 | 2.1: 10 GB VRAM shape, 21 GB texture, 29 GB total; README says supports macOS, Windows, Linux | https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1 | V |
| **Hunyuan3D 2.5 / 3.0 / 3.1** | Newer shape models | **No open weights** (hosted only; 3.0 Sept 2025, 3.1 Jan 2026 per secondary source) | — | — | https://triposr.org/blog/hunyuan3d-versions (competitor-run blog) | P |
| **Stability TripoSR** / VAST **TripoSR** | Single-image→mesh (fast, textured vertex colours) | MIT | VAST-AI-Research/TripoSR 7,097 / 2026-06-04 | Light | https://github.com/VAST-AI-Research/TripoSR | V (API) |
| **TripoSG** (VAST) | Image→shape | MIT | 1,839 / 2025-04-18 (stale) | — | https://github.com/VAST-AI-Research/TripoSG | V (API) |
| **Stable Fast 3D (SF3D)** | Single-image→textured mesh with UVs, <1 s class | **Stability AI Community Licence**: free <US$1M annual revenue, must *register* for commercial use, "Powered by Stability AI" attribution, cannot use outputs to train a foundation model; >US$1M → Enterprise licence | 1,878 / 2025-01-22 (stale) | HF weights gated | https://github.com/Stability-AI/stable-fast-3d (LICENSE.md) | V |
| **SPAR3D** (Stable Point-Aware 3D) | Point-cloud-conditioned, editable | Same Community Licence; HF gated | 1,083 / 2025-05-05 | README: Windows "experimental" | https://github.com/Stability-AI/stable-point-aware-3d | V |
| Stability **3D API** | Hosted SF3D / SPAR3D | **SF3D 10 credits, SPAR3D 4 credits; 1 credit = $0.01** (=$0.10 / $0.04 *derived*) | — | — | https://platform.stability.ai/pricing | V |
| **InstantMesh** (TencentARC) | Image→mesh via multi-view diffusion + LRM | Apache-2.0 (code); depends on Zero123++ weights (separate licence not re-read) | 4,573 / 2025-01-03 (stale) | — | https://github.com/TencentARC/InstantMesh | V (API); dependency licence U |
| **MIDI-3D** (VAST) | Multi-instance scene→3D | Apache-2.0 | 953 / 2025-06-12 | — | https://github.com/VAST-AI-Research/MIDI-3D | V (API) |
| **UniRig** (VAST) | Auto-rigging model | MIT (repo) | 1,842 / 2026-06-04 | — | https://github.com/VAST-AI-Research/UniRig | V (API); weights/dataset terms U |

### A1.3 Hunyuan3D licence — territory restriction (read the actual licence text)

- First line of the Hunyuan3D 2.1 / Omni / Part licences: "THIS LICENSE AGREEMENT DOES NOT APPLY IN THE EUROPEAN UNION, UNITED KINGDOM AND SOUTH KOREA AND IS EXPRESSLY LIMITED TO THE TERRITORY". "Territory" = worldwide **excluding** EU, UK, South Korea. [V]
  - https://huggingface.co/tencent/Hunyuan3D-2.1/raw/main/LICENSE ; https://github.com/Tencent-Hunyuan/Hunyuan3D-Part/blob/main/LICENSE ; https://huggingface.co/tencent/Hunyuan3D-Omni/blob/main/License.txt
- Clause (c) in the 2.1 text: "You must not use, reproduce, modify, distribute, or display the … Works, **Output or results** … outside the Territory. Any such use outside the Territory is unlicensed." → affects **shipping a game that contains generated meshes into EU/UK/KR**. Legal interpretation = **U** (not legal advice; ask a lawyer). [V text / U effect]
- Governing law: Hong Kong SAR. [V]
- 1M-monthly-active-user cap and "no using outputs to improve other AI models": stated by a third-party summary for 2.x (https://triposr.org/blog/hunyuan3d-versions) → [P]; the 1M MAU clause is verified in the sibling **HY-Motion 1.0** licence text (https://github.com/Tencent-Hunyuan/HY-Motion-1.0/blob/master/License.txt) [V for HY-Motion].
- **Practical implication for the tutorial:** a European reader should not rely on Hunyuan3D open weights; hosted Hunyuan (Tencent HY 3D Global API, Spline's "Hunyuan3D" backend) is a different legal path whose terms were **not read** → [U].

### A1.4 Credit-economics sanity table (derived from the verified credit tables)

| Service | Unit | Approx. cost per *textured* generation | Basis |
|---|---|---|---|
| Meshy Pro ($20 / 1,000 cr) | 30 cr (20 mesh + 10 texture) | ≈ $0.60 *derived* (Pro plan rate $0.02/credit) | docs.meshy.ai/en/api/pricing; plan page |
| Meshy API | 30 cr (2K/4K tex), 35 cr (8K) | cost depends on prepaid credit price (not read) | docs.meshy.ai/en/api/pricing |
| Tripo API H3.1 text→3D + standard texture | 20 cr | $0.20 *derived* ($0.01/cr) | docs.tripo3d.ai/get-started/pricing.html |
| Tripo API P1 image→3D + standard texture | 50 cr | $0.50 *derived* | same |
| Tencent HY 3D Global Normal | 25 cr | $0.50 postpaid *derived* | tencentcloud.com doc 1281/74121 |
| Rodin Gen-2 API | 0.5 cr | $0.50–$0.75 *derived* from conflicting credit price ($1 or $1.50) | docs.hyper3d.ai |
| Stability SF3D API | 10 cr | $0.10 *derived* | platform.stability.ai/pricing |
| Autodesk Wonder 3D | 20 cr from 300/month free | 15 free generations/month *derived* | Autodesk blog |

All tagged V for the credit counts, *derived* for dollars. The point for the tutorial: **per-asset cost is cents-to-tens-of-cents; the real cost is cleanup time (A4).**

---

## A2. Rigging & animation

| Tool | What | Terms / price (2026-10-17) | Limits | Source | Tag |
|---|---|---|---|---|---|
| **Mixamo** (Adobe) | Free web auto-rigger + mocap animation library | **Still available.** Free with an Adobe ID, no CC subscription. Characters *and* animations royalty-free for personal, commercial and non-profit projects **including video games**. Not available for Enterprise/Federated IDs; not available with a China country code | Auto-rigger/animations are **bipedal humanoids only** | https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html ; https://www.mixamo.com/ (live page) | V |
| Mixamo — redistribution nuance | Adobe community answers: fine to bake into a shipped game; not fine to ship/sell raw files extractable as standalone assets or compete with Mixamo; credit not required | | | https://community.adobe.com/questions-696/the-license-to-use-mixamo-589394 ; https://community.adobe.com/questions-696/characters-and-animation-for-commercial-use-589723 | P (community, not the EULA) |
| **Meshy auto-rig + animate** | API: Auto-Rigging 5 cr; Animation 3 cr per action (≤10 per request); Text-to-Motion: `swift` 3 cr / `prime` 10 cr. Web: "unlimited animation, 600+ motions" on Pro | **Humanoid only**; textured GLB only; ≤300,000 faces via `input_task_id` (use Remesh first); face must point +Z; returns rigged FBX/GLB + walk/run clips | https://docs.meshy.ai/en/api/rigging-and-animation ; https://docs.meshy.ai/en/api/pricing | V |
| **Tripo auto-rig** | API: pre-rig check free; Rig 25 cr; Retarget 10 cr per animation | Details of supported skeletons not read | https://docs.tripo3d.ai/get-started/pricing.html | V (prices), U (skeleton coverage) |
| **Tencent HY 3D Global "Auto Rigging"** | Listed as an API product | Credit price not read | https://staticintl.cloudcachetci.com/doc/pdf/product/pdf/1284_75280_en.pdf | P |
| **AccuRIG 2** (Reallusion) | Free desktop auto-rigger; preview/apply 4,500+ ActorCore motions | Reallusion staff on forum (2025-08-27): if **no Reallusion content** is used and the character is 100% yours, AccuRIG may rig it for a commercial game incl. a character generator. Using Reallusion/ActorCore content → separate Content EULA (character-generation/API/stock-library limits) | Free tier: one mesh A/T-pose humanoid; the third-party Asset Forge Index calls the free-tool licence "unverified" because the software EULA wording covers purchased/subscribed software | https://discussions.reallusion.com/t/question-about-accurig-2s-eula/15034 ; https://actorcore.reallusion.com/static-page/auto-rig/pre_page/accurig/accurig.html ; https://assetforgeindex.com/commercial-use/accurig | P (forum staff answer) — **no EULA clause naming AccuRIG found → U for formal grant** |
| **UniRig** | Open-source (MIT) learned auto-rigger | Repo MIT, 1,842 stars, pushed 2026-06-04 | Weights/dataset terms not read | https://github.com/VAST-AI-Research/UniRig | V (repo), U (weights) |
| **Tencent HY-Motion 1.0** | Open **text→3D human motion** (DiT + flow matching; 1.0B and 0.46B Lite) | **Tencent HY-Motion community licence**: same EU/UK/South Korea exclusion, 1M-MAU request-licence rule | VRAM min 26 GB / 24 GB; 2,606 stars; released 2025-12-30; paper arXiv 2512.23464 | https://github.com/Tencent-Hunyuan/HY-Motion-1.0 ; https://arxiv.org/html/2512.23464 | V |
| **MDM** (Motion Diffusion Model) | Research text→motion | MIT code; 4,119 stars; pushed 2025-10-01 | Dataset/body-model (SMPL, HumanML3D) terms often restrictive — **not checked** | https://github.com/GuyTevet/motion-diffusion-model | V (code licence), U (dataset terms) |
| **MotionGPT** | Research text↔motion LLM | MIT; 1,979 stars; pushed 2025-07-01 | Same dataset caveat | https://github.com/OpenMotionLab/MotionGPT | V (code), U (data) |
| **Rokoko Vision** (video→mocap; Vision 3.0) | Free 30 s/month; Basic $10/mo (billed annually; 600 s/mo; BVH export); Plus $20 (3,000 s); Pro $50 (15,000 s); Enterprise from $100; unlimited text-to-motion clips | Free-tier commercial use allowed per aggregator | https://www.rokoko.com/products/vision (prices); https://assetforgeindex.com/compare/rokoko-vs-deepmotion (licence, checked 2026-10-16) | V (prices on vendor page), P (licence) |
| **Move AI — Move One** (iPhone single-camera) | Free: 30 one-time credits (personal/education/research). Starter $18/mo+VAT (60 cr), Standard $48 (180), Plus $225 (240), Advanced $490 (700). 1 credit = 1 s/person (Gen1), 2 for Gen2. Clip cap 60 s | Move Pro no longer self-serve; "Genesis" enterprise replaced it (April 2026 per 80.lv via mimem.ai) | https://docs.move.ai/knowledge/move-one-pricing | V (price page), P (Move Pro/Genesis) |
| **DeepMotion Animate 3D** | Starter $9/mo annual (180 cr), Innovator $17 (480), Professional $39 (1,500), Studio $83 (unlimited); 1 credit = 1 s or one pose; free 25 cr/mo **non-commercial** | Paid = perpetual commercial licence; may ship in games, not as standalone assets | https://assetforgeindex.com/compare/rokoko-vs-deepmotion (checked 2026-10-16) | P (aggregator; vendor page not fetched) |
| **Autodesk Flow Studio** | AI mocap + "AI Rigging (Preview)" in 300-cr free tier | see A1 | https://blogs.autodesk.com/media-and-entertainment/2026/09/28/autodesk-flow-studio-pricing-and-subscription-guide/ | V |

**Takeaway:** the zero-cost, legally clearest humanoid path is *generate or model a character → Mixamo or AccuRIG 2 → Mixamo animation library*. Non-humanoids (animals, creatures, vehicles) have **no good auto-rig path** (Meshy/Mixamo are humanoid-only). [V for Meshy/Mixamo]

---

## A3. Agent access (MCP / skills / plugins)

Stars from GitHub API on 2026-10-17.

| Project | Repo | Stars | Licence | Last push | What it gives an agent | Notes | Tag |
|---|---|---|---|---|---|---|---|
| **MCP for Blender** (formerly Blender MCP) | https://github.com/ahujasid/mcp-for-blender (old name `ahujasid/blender-mcp` still resolves via API) | **31,338** | MIT | 2026-10-06 | Drive Blender via MCP; `generate_3d` one-call generate+import with **Tripo, Hunyuan3D, Hyper3D Rodin**; `search_assets`/`import_asset` for **Poly Haven, Sketchfab, Poly Pizza** | PyPI package renamed `mcp-for-blender`; `uvx blender-mcp` still works; installer sets up Claude Desktop, Claude Code, Codex, Cursor, VS Code, Windsurf, OpenCode, Antigravity; Windows PowerShell one-liner provided; optional paid "premium" generators without own API keys (price not read → U). README disclaimer: third-party, not made by Blender. Rename discussion: github.com/ahujasid/mcp-for-blender/issues/366 | V (README + API) |
| **Meshy MCP server** | https://github.com/meshy-dev/meshy-mcp-server (npm `@meshy-ai/meshy-mcp-server`) | 62 | MIT | 2026-10-14 | Local stdio MCP wrapping the Meshy REST API (generate → poll → download) | Needs Node 18+, a **paid-plan** API key; `npx add-mcp @meshy-ai/meshy-mcp-server --env MESHY_API_KEY=…`; Cursor needs manual toggle; **Windows: wrap with `cmd /c npx`**; no hosted MCP URL. Companion skill pack `meshy-dev/meshy-3d-agent`: 102 stars, MIT, pushed 2026-10-15. Docs: https://docs.meshy.ai/en/api/ai ; https://www.meshy.ai/mcp | V |
| **Tripo MCP** | https://github.com/VAST-AI-Research/tripo-mcp | 215 | MIT | **2025-04-14** (stale) | text→3D into Blender **through the Tripo Blender add-on**; README: "project is in alpha" | Official add-on `VAST-AI-Research/tripo-3d-for-blender`: 70 stars, MIT, pushed 2025-11-06. No official hosted Tripo MCP found (U). For agents, calling the REST API directly is likely simpler | V |
| **MCP for Unity** (Coplay) | https://github.com/CoplayDev/unity-mcp | **15,046** | MIT | 2026-10-08 | Manage assets/scenes/scripts; `generate_model` tool (providers **Tripo, Meshy, fal**; formats glb/fbx/obj/usdz; async job + poll; BYO keys) | Docs: https://coplaydev.github.io/unity-mcp/reference/tools/asset_gen/generate_model | V |
| Unity MCP (alt) | https://github.com/CoderGamester/mcp-unity | 1,935 | MIT | 2026-10-11 | Unity editor control | | V (API) |
| **Godot MCP** (Coding-Solo) | https://github.com/Coding-Solo/godot-mcp | **6,130** | MIT | 2026-04-16 | Launch editor, run projects, capture debug output, scene mgmt | Whether it imports GLB not verified → U | V (API) |
| Godot MCP (hybridindie) | https://github.com/hybridindie/godot-mcp | 38 | MIT | 2026-10-16 | Toolset incl. `godot_asset_import_asset` (`.png/.glb/.wav` imports) and import-status polling | https://hybridindie.github.io/godot-mcp/reference-toolsets.html | V (doc) |
| Godot MCP (sandraschi) | https://github.com/sandraschi/godot-mcp | 6 | MIT | 2026-10-13 | `godot_import_glb`, game-builder pipeline | Tiny project; treat as experimental | V (API) |
| Meshy engine bridges | Meshy plugins for Blender/Unity/Godot/Unreal/Maya/3ds Max/Roblox | — | — | — | One-click "Bridge" from web app (no API key) | https://www.meshy.ai/integrations | V (vendor page) |
| Spline MCP | listed on spline.design | — | — | — | Agent can generate models into a Spline scene | Not read in depth | P |

**Pattern the tutorial can teach:** *API/MCP generate → GLB on disk → Blender (headless or via MCP) cleanup → export GLB → engine import.* GLB/glTF is the interchange format every engine/MCP above handles. [V for the tool surfaces; "GLB is the common denominator" is Practice, supported by Khronos glTF positioning in https://wavect.io/blog/ai-3d-model-generators-game-development-2026/]

---

## A4. Quality reality for real-time games

### A4.1 What the sources say

| Finding | Evidence | Tag |
|---|---|---|
| AI 3D is useful for concepts, grayboxing, static background props; **not reliably one-click production** for deforming characters, exact hard-surface parts or consistent hero libraries | https://wavect.io/blog/ai-3d-model-generators-game-development-2026/ (vendor-neutral blog; includes a "Strong / Good after review" table) | P |
| Expect: dense triangulated meshes, **topology follows appearance not deformation**, fragmented UVs laid out for one bake, **lighting baked into albedo**, inconsistent watertightness (internal faces, floating shells, non-manifold edges) even between runs of the same prompt | https://www.aigamedevs.org/wiki/text-to-3d-pipeline/ ; https://wavect.io/blog/ai-3d-model-generators-game-development-2026/ | P |
| A "production-ready" definition: manifold topology w/ edge loops for deformation & LOD; non-overlapping UVs; **disentangled PBR (albedo free of lighting)**; skeleton + skin weights; post-gen editability; collision/physics metadata. Benchmarks mostly omit topology/UV/rig/engine-import metrics so **overestimate readiness** | https://arxiv.org/html/2604.23629v1 (survey, 2026-04) | V (read) |
| Controlled case study (stylised tavern): **AI-assisted pipeline (Meshy 6 + Hunyuan 3D) 238 min vs human Blender pipeline 716 min** for first pass — but with "technical debt": dense triangulated geometry, fragmented UVs, clipping, **texture integrity lost when decimating**. One scene: human **293,828 triangles for 123 objects** vs Hunyuan scene **32,781,505 triangles for 103 objects (~111.6×)** | https://doi.org/10.55677/ijhrsss/15-2026-vol03i06 (practice-led study; n=1 scene; not peer-review-level generalisable) | V (read abstract/results); generalisation U |
| Pipeline that works: generate → inspect (polycount, watertight, scale) → **retopologize or decimate** → re-UV → **bake high-poly detail (normal/colour) onto low-poly** → rig if animated → import at consistent scale → LOD/collision | https://www.aigamedevs.org/wiki/text-to-3d-pipeline/ | P |
| Blender's own guidance (quoted by wavect): automatic remeshing is "generally not final topology for deforming characters" | https://wavect.io/blog/ai-3d-model-generators-game-development-2026/ (secondary quote of Blender docs; Blender doc itself not fetched) | P |
| Automation exists: **MeshPrep** (StraySpark) — Blender 4.5 LTS → 5.x add-on, GPL-3.0-or-later; 19 pre-checks; QuadriFlow/Voxel+QuadriFlow/Decimate retopo; bakes Base Colour, Normal, AO, Roughness, Metallic; ORM-packing for Unreal/Godot, Metallic-Smoothness for Unity; LOD + export. Recognises Meshy/Tripo/TRELLIS/Hunyuan3D/Polycam output | https://www.strayspark.studio/docs/meshprep (vendor docs; price not read) | V (docs) / not tested |

### A4.2 Polycount knobs vendors actually expose (all [V])

| Vendor | Control | Value |
|---|---|---|
| Tripo H3.x | max faces | 1.5M standard / 2M "detailed" |
| Tripo H3.x | `quad=true` | default `face_limit` 10,000 (recommended ≤150,000), +5 cr |
| Tripo P1 | face limit | **50–20,000**, "~10 s" base mesh |
| Meshy | Remesh API | 5 cr; rigging rejects >300,000 faces |
| Kaedim | prototype assets | ≤300K polys (+5% tolerance); game-ready sculpt step up to 2M |
| Sloyd | "Ultra" | 500K tris (5 cr) |
| Hunyuan (HY 3D Global API) | `FaceCount` param | +10 cr |
| Rodin | Smart Low-Poly (Creator+), High-Poly Quads (Business) | plan-gated |

**For a mobile/web game, a hero prop budget is typically thousands to low tens of thousands of triangles** — vendor "default" high-poly outputs are one to three orders of magnitude over that. (Budget numbers are Practice; no single primary source for "typical budget".) [P]

### A4.3 Recommended reading order for the tutorial's quality section
1. Wavect blog (overview) → 2. AIGAMEDEV pipeline page (steps) → 3. IJHRSSS tavern study (evidence) → 4. arXiv 2604.23629 survey (definitions).

---

## A5. Procedural 3D by code (zero licence risk, agent-friendly)

| Technique | Tool / reference | Stars / licence (2026-10-17) | Why it matters | Tag |
|---|---|---|---|---|
| Primitive-based scenes (boxes, spheres, cylinders, extrusions, lathe, etc.) | **three.js** — https://github.com/mrdoob/three.js ; docs e.g. https://threejs.org/docs/#api/en/geometries/BoxGeometry | 116,536 stars, MIT, pushed 2026-10-17 | LLMs write three.js fluently; no assets needed; browser-playable on Windows | V (API; docs URL 200) |
| Mesh CSG (union/subtract/intersect) in three.js | **three-bvh-csg** — https://github.com/gkjohnson/three-bvh-csg ; accelerator **three-mesh-bvh** https://github.com/gkjohnson/three-mesh-bvh | 951 stars MIT (pushed 2026-09-27); 3,518 stars MIT | Build doors/windows/holes by subtraction | V (API) |
| Robust manifold boolean library | **Manifold** — https://github.com/elalish/manifold | 2,357 stars, Apache-2.0, pushed 2026-10-17 | Guaranteed-manifold booleans (C++/JS/Python) | V (API) |
| Code-defined solid modelling | **OpenSCAD** — https://github.com/openscad/openscad | 10,460 stars; API says NOASSERTION (project is GPL-2.0-family; exact licence text not read) | Text-based CSG an LLM can write; exports STL/3MF | V (stars), U (licence text) |
| Signed distance fields (raymarched in a fragment shader) | Inigo Quilez, SDF primitives & operators: https://iquilezles.org/articles/distfunctions/ ; raymarching: https://iquilezles.org/articles/raymarchingdf/ | (articles; URLs 200) | Whole scenes as ~100 lines of GLSL; no mesh/UV/texture assets | V (pages exist); content not deep-read |
| Mesh from SDF/voxels (marching cubes) | e.g. via three.js examples / custom code | — | Turns SDF terrain/blobs into engine-ready meshes | P (general technique; no source fetched) |
| Blender Python (`bpy`) scripting | Blender MCP (A3) or headless `blender -b -P script.py` | — | Agent writes geometry-nodes/modifiers/bake scripts; the same tool as the cleanup stage | P |

**Tutorial angle:** start with procedural/primitive 3D (agents are strongest here, no assets, no licence), then add AI-generated GLBs for hero props. [P — editorial recommendation]

---

# PART B — AUDIO

## B1. Procedural SFX & audio libraries (code, no AI, no licence worries)

| Name | What | Licence | Stars / last push (2026-10-17) | Links | Tag |
|---|---|---|---|---|---|
| **sfxr** (DrPetter, 2007) | Original retro SFX generator | README: "anything goes", plus a formal **MIT** text | mirror `grimfang4/sfxr`: 313 stars, GitHub licence null, pushed 2022-02-25 (original site not fetched) | https://github.com/grimfang4/sfxr/blob/master/sfxr/README.txt | V (README) |
| **jsfxr** | HTML5 port of sfxr; web UI at jsfxr.me | **Unlicense** | `grumdrig/jsfxr` 283 stars, pushed 2023-05-04 (low activity) | https://github.com/grumdrig/jsfxr ; https://jsfxr.me (HTTP 200) | V (API) |
| **bfxr** (increpare) | sfxr successor | Repo licence null (API) | `increpare/bfxr` 1,025 stars pushed 2025-04-17 | https://github.com/increpare/bfxr | V (API) |
| **bfxr2** | Rewrite | MIT | 330 stars pushed 2026-10-15 | https://github.com/increpare/bfxr2 | V (API) |
| **ChipTone** (SFBGames) | Browser/desktop sfxr-family tool, sampler+sequencer in development | **Sounds you create: CC0** (itch page: "FREE to use for any purpose, commercial or otherwise"). App source licence not published on that page | itch.io page, "In development"; 4.9★ from 1,069 ratings (page figure) | https://sfbgames.itch.io/chiptone | V (itch text via search result), U (app licence) |
| **ZzFX** | Tiny JS SFX synth (<1 KB compressed, 20 parameters, no deps, designed for js13k) | MIT | `KilledByAPixel/ZzFX` **803 stars**, pushed 2026-10-01; sound designer: https://killedbyapixel.github.io/ZzFX/ (200) | https://github.com/KilledByAPixel/ZzFX | V (README via API) |
| **Tone.js** | Web Audio framework for interactive music/synths/sequencing | MIT | `Tonejs/Tone.js` **14,778 stars**, pushed 2026-10-17 | https://github.com/Tonejs/Tone.js ; https://tonejs.github.io (200) | V (API) |
| **Howler.js** | Audio playback library (Web Audio + HTML5 Audio fallback, sprites, spatial) | MIT | `goldfire/howler.js` **25,393 stars**, pushed 2025-11-23 | https://github.com/goldfire/howler.js ; https://howlerjs.com (200) | V (API) |

### Web Audio API basics (MDN; all URLs returned HTTP 200 on 2026-10-17)

| Concept | MDN page |
|---|---|
| Overview of the API / audio graph | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API |
| Oscillators (sine/square/saw/triangle) | https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode |
| Noise via a buffer filled with random samples → `AudioBufferSourceNode` | https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode |
| Gain / volume | https://developer.mozilla.org/en-US/docs/Web/API/GainNode |
| Envelopes (attack/decay via scheduled param ramps) | https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/linearRampToValueAtTime and https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/exponentialRampToValueAtTime |
| Best practices (e.g. autoplay/user-gesture, latency) | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices |
| Games guide | https://developer.mozilla.org/en-US/docs/Games/Techniques/Audio_for_Web_Games |

[V that pages exist; I did not deep-read every page. "Noise = random-filled buffer" and "envelope = gain ramps" are standard practice → P.]

**Tutorial angle:** an agent can write a 30-line WebAudio synth (oscillator + gain envelope + noise buffer) or paste a ZzFX parameter array for jump/coin/hit/explosion SFX with zero files and zero licensing. Output ownership of sfxr/jsfxr/ZzFX-made sounds is not explicitly stated for jsfxr/ZzFX (tool licences cover the code, not "your sounds") → **U**; ChipTone explicitly grants CC0 on outputs.

---

## B2. AI SFX & music services (Oct 2026)

### B2.1 Summary table

| Service | What | Price (dated 2026-10-17) | Output | Licence / ownership | API / MCP | Source | Tag |
|---|---|---|---|---|---|---|---|
| **ElevenLabs Sound Effects** | Text→SFX (0.1–30 s; loopable) | Subscription: **200 credits per generation**; doc: **40 credits/second** when duration set. API: **$0.12/min** (page also says "billed per generation" → ambiguity). Plans: Free $0 (10,000 cr, non-commercial); Starter $6 (30,000 cr); Creator $22 (121,000); Pro $99 (600,000); Scale $299; Business $990; Enterprise custom | MP3; **WAV 48 kHz for non-looping** | Paid account: royalty-free, commercial incl. ads; free users non-commercial only; may not sell/license the tool or use output to build competing products | REST API (Python/JS SDKs). **MCP:** local `elevenlabs/elevenlabs-mcp` is **archived** (see below) | https://elevenlabs.io/pricing ; https://elevenlabs.io/pricing/api ; https://elevenlabs.io/docs/overview/capabilities/sound-effects.mdx ; https://elevenlabs.io/sound-effects | V |
| **ElevenLabs Eleven Music** | Text→full song, stems, editing | **900 credits/min** (subscription); API **$0.15/min**; 5-minute duration limit per track | 44.1 kHz, 128–192 kbps MP3 (44.1 kHz PCM via API on Pro+) | "Trained on licensed stems and music" (vendor claim). Broad commercial use on paid plans (Starter+). **Film, TV and large-studio *game* rights require Enterprise** — exact threshold is in "Eleven Music v1 Terms" (not read → **U**) | REST API | https://elevenlabs.io/eleven-music-api ; https://elevenlabs.io/pricing/api | V (vendor page) |
| **Stable Audio 3.0** (family) | Small-SFX (433M, CPU, ≤120 s), Small-Music (433M, CPU, ≤120 s), Medium (1.4B, CUDA GPU, ≤380 s) are **open-weight**; Large (2.7B) API/enterprise only | API: 3.0 and 2.5 each **8 credits** (1 credit = $0.01 → $0.08 *derived*) per Stability pricing page | Stereo 44.1 kHz | **Stability Community Licence** (free <US$1M revenue, must register, >$1M → Enterprise). "You own your outputs" (to the extent permitted by law). Training data: AudioSparx (licensed) + **Freesound Creative-Commons** subset. Text encoder T5Gemma carries Gemma terms. KB: commercial use permitted for tracks on any plan incl. Free, subject to ToS/AUP | API; fal/Replicate/ComfyUI; code repo MIT | https://platform.stability.ai/pricing ; https://stability.ai/news-updates/meet-stable-audio-3-the-model-family-built-for-artistic-experimentation-with-open-weight-models ; https://github.com/Stability-AI/stable-audio-3 (805 stars, MIT code, created 2026-03-19) ; https://kb.stability.ai/knowledge-base/stable-audio-commerical-and-usage-licensing ; https://stability.ai/explainers/how-stable-audios-training-data-licensing-works | V (pricing page fetched directly; licence text read via search extracts) |
| **Stable Audio Open (Small)** | Earlier open model | Community Licence | | Same community licence; commercial users must register | HF | https://huggingface.co/stabilityai/stable-audio-open-small | V (search extract) |
| **Google Lyria 3 / 3.5** (Gemini API) | Text/image→music | **Lyria 3 Clip (30 s) $0.04; Lyria 3 Pro preview (full song) $0.08**, paid tier only (no free tier). Docs now also list model id `lyria-3.5` — **pricing for 3.5 not on the pricing page I read** | MP3 (3.5 also WAV); 44.1 kHz stereo | All outputs carry **SynthID** watermark. Ownership terms for generated music **not read → U** | Gemini API (Interactions API); AI Studio. **Lyria RealTime** = experimental WebSocket streaming, instrumental only, 48 kHz stereo PCM, price not published | https://ai.google.dev/gemini-api/docs/pricing ; https://ai.google.dev/gemini-api/docs/music-generation ; https://ai.google.dev/gemini-api/docs/realtime-music-generation ; https://blog.google/innovation-and-ai/technology/developers-tools/lyria-3-developers/ | V (pricing/docs), U (ownership) |
| **Suno** | Consumer text→song (v5) | **No official public API** — Chief Product Officer announced (LinkedIn, Wed 2026-07-01) it is "exploring a developer API" with a curated partner group; no timeline. New ToS from 2026-09-03: songs downloaded on **paid** plans can be used commercially; trial downloads are personal-use only; download caps per tier | MP3/WAV via UI | Commercial rights only for songs obtained through a permitted *Download* on a paid tier; no stream-ripping; Suno may append fingerprints/watermarks. WMG partnership (Nov 2025) settled WMG suit; "licensed models in 2026… current models will be deprecated" | **None official** (unofficial wrappers exist — do not build on) | https://www.musicbusinessworldwide.com/suno-explores-developer-api-seeking-apps-that-unlock-experiences-generative-music-makes-possible-for-the-first-time/ ; https://about.suno.com/blog/suno-updates-tos ; https://suno.com/terms/ ; https://www.wmg.com/news/warner-music-group-and-suno-forge-groundbreaking-partnership | V (ToS blog, WMG release), P (API status via MBW) |
| **Udio** | Consumer text→song | **Downloads of audio/video/stems disabled** on all plans since the UMG deal (2025-10-29); Udio help centre (2026-02-17) still says so; secondary review (2026-09-25) says unchanged. Licensed successor reportedly "Starstruck", "walled garden", launch date unconfirmed. Sony litigation reportedly continuing | UI streaming only | Not usable as a game-asset source | None | https://help.udio.com/en/articles/12683565-changes-associated-with-the-universal-music-group-umg-partnership ; https://undetectr.com/blog/udio-review-2026 ; https://www.musicbusinessworldwide.com/udios-licensed-ai-music-app-will-be-called-starstruck-with-four-creation-modes-for-fans-report/ | V (help centre, UMG release), P (rest) |
| **Meta AudioCraft: MusicGen / AudioGen** | Open text→music/SFX | **Code MIT; model weights CC-BY-NC 4.0** (MusicGen model card) → **non-commercial weights** | `facebookresearch/audiocraft` 23,739 stars, MIT, pushed 2026-03-03 | Training on licensed Meta/Shutterstock/Pond5 music (model card) | self-host | https://github.com/facebookresearch/audiocraft/blob/main/model_cards/MUSICGEN_MODEL_CARD.md | V (read via API) |
| **AudioLDM / AudioLDM2** | Research text→audio | **CC BY-NC-SA 4.0** (repo LICENSE) → non-commercial | `haoheliu/AudioLDM2` 2,641 stars, pushed 2024-09-29 (stale) | | self-host | https://github.com/haoheliu/AudioLDM2 | V (LICENSE head read) |

### B2.2 MCP for audio — status

| Item | Status 2026-10-17 | Source | Tag |
|---|---|---|---|
| `elevenlabs/elevenlabs-mcp` (local server, TTS/voice/transcribe/SFX tooling) | **Archived**; README: "deprecated in favor of the ElevenLabs hosted MCP server… no longer actively maintained"; 1,535 stars, MIT, last push 2026-08-20 | https://github.com/elevenlabs/elevenlabs-mcp ; changelog https://elevenlabs.io/docs/changelog/2026/8/22 | V |
| ElevenLabs hosted MCP `https://api.elevenlabs.io/v1/mcp` | OAuth, no API key, works with Claude/Claude Code/Cursor/ChatGPT. **Docs say it "exposes agent management tools"** (voice/chat agents) — **no SFX/music generation tools are documented** | https://elevenlabs.io/docs/eleven-agents/operate/hosted-mcp ; https://elevenlabs.io/mcp | V (docs) — "no SFX tools" is *absence of evidence* from docs read; mark **U** for completeness |
| Suno / Udio MCP | Only unofficial wrappers exist; no official API | see B2.1 | P |
| Stable Audio | No official MCP found; REST API + HF weights | — | U (not searched exhaustively) |
| Lyria | Gemini API (SDK/REST); no official MCP found | — | U |

**Practical agent recipe today:** call ElevenLabs/Stability/Lyria REST APIs from a script the agent writes (key in env var), save WAV/MP3 into `assets/audio/`, record provider + prompt + licence in a `CREDITS.md`/manifest.

---

## B3. Free audio libraries

| Source | Licence mix | Game-use notes | Gotchas | Source | Tag |
|---|---|---|---|---|---|
| **Freesound** (freesound.org) | Uploader chooses **CC0**, **CC-BY** (attribution), **CC-BY-NC** (non-commercial); legacy "Sampling+" still exists on old uploads | CC0: use freely. CC-BY: must credit. **CC-BY-NC: not for a commercial game** | Per-sound licence — an agent must filter/record it. YouTube Content-ID false claims possible on raw sounds. AI-generated uploads are allowed only if tagged GenAI and model named (FAQ). Since **July 2026** uploaders can set Gen-AI training preferences (affects dataset use, not your game use) | https://freesound.org/help/faq/ | V |
| **OpenGameArt (OGA)** audio | Mixed: CC0, CC-BY 3.0/4.0, CC-BY-SA, GPL 2/3, others | "Even commercial projects — adhere to licence terms"; credit format suggested | OGA's own summary says CC-BY content can't be distributed "in a way that includes DRM" (its interpretation) — relevant for stores with DRM → P. SA/GPL = share-alike obligations | https://opengameart.org/content/faq | V (FAQ read) |
| **Kenney** (kenney.nl) incl. audio packs | All game assets **CC0** (public domain); attribution not required | Safe default for prototypes | Don't use Kenney logo | https://kenney.nl/support | V |
| **Sonniss GDC Game Audio Bundles** | Royalty-free, **commercial OK, no attribution, unlimited projects, lifetime**; bundles 2015–2024 (**no 2025 bundle**; 2026 has a separate page not read) | Large (GDC2024 = 9 parts, 23.5 GB) | **Cannot resell/redistribute as SFX** (incl. edited, inside packs); **AI/ML training strictly prohibited**; licensed for media production only | https://sonniss.com/gameaudiogdc/ | V |
| **incompetech** (Kevin MacLeod) | Music under **CC BY 4.0**; credit required in a findable place (games: Credits screen); standard licence available for no-credit uses | Music (not SFX) | Must keep credit text exactly; modified/derivative parts must be identified; MacLeod notes his *recordings* are copyrighted, not public domain | https://incompetech.com/music/royalty-free/faq.html | V |
| **Pixabay** audio | **Pixabay Content Licence**: free, no attribution, may modify | OK for games | Cannot sell/distribute **standalone** (unchanged); no use in trademarks; **only the full licence text is binding** (summary read) | https://pixabay.com/service/license-summary/ | V (summary) |

**Warning list for the tutorial:** (1) CC-BY-NC on Freesound; (2) CC-BY-SA/GPL on OGA; (3) Sonniss bans AI training and resale; (4) incompetech needs visible credit; (5) always keep a per-asset licence manifest.

---

## B4. Copyright / ownership notes for AI music & SFX (not legal advice)

| Topic | Fact | Source | Tag |
|---|---|---|---|
| US copyrightability | U.S. Copyright Office Part 2 (2025-01-29): AI outputs are protectable only where a human determines sufficient expressive elements; **prompts alone are not enough**; human-authored input perceptible in output, or creative selection/arrangement/modification, can be protected; AI-assisted works are not barred | https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf ; https://www.copyright.gov/newsnet/2025/1060.html | V |
| Consequence for devs | Pure text-to-SFX/music assets may carry **weak or no US copyright** — you may be unable to stop others copying them; mixing, editing, arranging them into your own composition strengthens claim. (Other jurisdictions differ; not researched.) | inference from above | P |
| Provider-granted rights ≠ copyright | ToS typically grant *licence/ownership as between you and vendor*: ElevenLabs (paid plans: royalty-free commercial; free = non-commercial), Stability ("you own outputs to the extent permitted by applicable law", Community Licence §IV(c)(iii)), Suno (commercial only for permitted paid downloads), Meshy ("you own… premium plan"; free = CC BY 4.0) | pages cited in B2/A1 | V |
| Upstream training-data risk | Eleven Music and Stable Audio both claim licensed training data (ElevenLabs: licensed stems/labels; Stability: AudioSparx + Freesound CC). Suno/Udio were sued by major labels; UMG–Udio (2025-10-29) and WMG–Suno (Nov 2025) settled; Sony v. Udio reportedly ongoing | https://elevenlabs.io/eleven-music-api ; https://stability.ai/explainers/how-stable-audios-training-data-licensing-works ; https://www.universalmusic.com/universal-music-group-and-udio-announce-udios-first-strategic-agreements-for-new-licensed-ai-music-creation-platform/ ; https://www.wmg.com/news/warner-music-group-and-suno-forge-groundbreaking-partnership | V (vendor/label statements), P (Sony status) |
| Watermarking | Lyria outputs have SynthID; Suno may append fingerprints/watermarks; Udio's walled garden uses inaudible watermarking + fingerprinting (reported) | Google docs; Suno ToS; MBW | V / V / P |
| Territory-limited licences | Tencent Hunyuan3D / HY-Motion: no licence in EU/UK/South Korea (A1.3) | licence texts | V |
| Non-commercial weights | AudioCraft/MusicGen weights CC-BY-NC 4.0; AudioLDM2 CC BY-NC-SA 4.0 | repos | V |

---

# Top 10 headline facts

1. **Meshy Free outputs are CC BY 4.0 (commercial use with attribution); Tripo Free outputs are public and non-commercial.** (Meshy pricing 2026-10-17; Tripo pricing 2026-10-17) — https://www.meshy.ai/pricing ; https://www.tripo3d.ai/pricing [V]
2. **API prices are cents per asset:** Tripo $0.01/credit (H3.1 text→3D with standard texture = 20 cr ≈ $0.20; P1 image→3D textured = 50 cr ≈ $0.50); Meshy Meshy-6/7.1 textured = 30 cr; Tencent HY 3D Global Normal = 25 cr at $0.02/cr. — https://docs.tripo3d.ai/get-started/pricing.html ; https://docs.meshy.ai/en/api/pricing ; https://www.tencentcloud.com/document/product/1281/74121 [V]
3. **Luma Genie sunset 2026-01-01; CSM Cube shut down 2026-01-05.** Don't recommend them. — https://apps.apple.com/us/app/luma-3d-capture/id1615849914 [V] ; https://www.reddit.com/r/TopologyAI/comments/1pxo2n5/csm_cube_is_shutting_down_on_january_5th_2026/ [P]
4. **Hunyuan3D open weights (2.0/2.1/Omni/Part) and HY-Motion are licensed only outside the EU, UK and South Korea, and the 2.1 text forbids using the Output outside that Territory.** — https://huggingface.co/tencent/Hunyuan3D-2.1/raw/main/LICENSE [V]
5. **Blender MCP is now `ahujasid/mcp-for-blender` (31,338 stars, MIT, pushed 2026-10-06) and can call Tripo, Hunyuan3D and Hyper3D Rodin.** Unity MCP (CoplayDev) 15,046 stars with a `generate_model` tool for Tripo/Meshy/fal. — https://github.com/ahujasid/mcp-for-blender ; https://github.com/CoplayDev/unity-mcp [V]
6. **TRELLIS.2 (MIT, 4B params, 12,076 stars) needs an NVIDIA GPU ≥24 GB and is "tested only on Linux"** — a Windows-11 reader should use hosted services/WSL2 or a cloud GPU. — https://github.com/microsoft/TRELLIS.2 [V]
7. **AI meshes are blockouts:** in one controlled study the AI-assisted scene took 238 min vs 716 min by hand but produced ~111.6× the triangles (32.8M vs 0.29M), fragmented UVs and texture loss on decimation; plan retopo/bake/LOD. — https://doi.org/10.55677/ijhrsss/15-2026-vol03i06 [V study / P generalisation]
8. **Mixamo is still free and licensed for commercial games, but humanoid-only; Meshy's rigging API is also humanoid-only (≤300k faces).** — https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html ; https://docs.meshy.ai/en/api/rigging-and-animation [V]
9. **Audio: the ElevenLabs local MCP is archived (2026-08); its hosted MCP manages agents; SFX is $0.12/min or 200 credits/generation; Eleven Music $0.15/min; Stable Audio 3 has open weights (Community Licence, <$1M revenue); Lyria 3 Clip $0.04 / Pro $0.08 per song; Suno has no public API; Udio downloads are disabled.** — sources in B2 [V mostly]
10. **Safe free audio:** ZzFX (803★, MIT), jsfxr (Unlicense), ChipTone (outputs CC0), Kenney (CC0), Sonniss GDC (royalty-free, no AI training, no resale). **Traps:** Freesound CC-BY-NC, MusicGen/AudioLDM weights non-commercial, and US copyright protection for prompt-only AI output is weak (USCO Part 2, 2025-01-29). — §B1/B3/B4 [V]

---

# Open questions / conflicts

## Conflicts between sources (my resolution in brackets)

1. **Meshy Ultra credits:** Meshy help centre says Ultra = $100/mo, **8,000** credits; third-party gamsgo.com says 10,000. [Use help centre (primary); also pricing page garble shows 8,000.]
2. **Meshy credit cost:** docs.meshy.ai webapp page says "Meshy 7 and Meshy 6 each cost 20 credits per generation (25 with Ultra Mode)", API page says mesh-only 20 / textured 30 / 8K 35; Meshy tutorial says full gen = 30. Webapp doc page also says Meshy 7 Text-to-3D "Not supported" while API page lists `meshy-7.1` (latest). [Treat API page as authoritative for API; webapp numbers may lag; docs are mid-transition. Also: API output is always textured — no mesh-only per the tutorial page, contradicting the API table "Mesh only 20". → U which is right.]
3. **Meshy pricing page FAQ is stale:** it mentions "Blender plugin and Unity plugin" only, and plan names Pro/Studio only, whereas help centre has Free/Pro/Premium/Ultra and the integrations page lists Godot/Unreal/etc. [Use help centre + integrations page.]
4. **Hyper3D credit price:** search snippet of hyper3d.ai/pricing says "credits cost $1"; Asset Forge Index says "$1.50 each"; one search synthesis said "$1.50". [Unresolved → per-generation $ for Rodin is **U**; plan prices ($24 Creator / $96–$120 Business) are consistent.]
5. **Rodin free-tier commercial rights:** no official page states it; vendor statements conflict. [Treat as **not commercial-safe** until confirmed.]
6. **Tripo Team plan:** page shows "$110 / $55 per seat/mo billed annually: $1,980/year" — arithmetic is ambiguous (seat count?). [Not used in the table beyond "from $55/seat".] Monthly (non-annual) prices for Pro/Max not shown on the fetched render.
7. **Tencent HY 3D Global free credits:** Tencent techpedia says new users get **1,000 credits for $0**; the Tencent billing PDF lists **200 credits/user** free quota. [Unresolved.]
8. **Tencent HY 3D pricing:** Billing Overview/PDF says Normal = 25 credits at $0.02/credit postpaid; a Tencent Cloud "Korean SMB" techpedia article gives completely different figures (1–2.5 credits per call, $0.006–$0.01/credit). [Use the Billing Overview doc; the SMB article appears unreliable/outdated → **U**.]
9. **ElevenLabs SFX unit:** pricing page lists "$0.12 per minute" yet the same FAQ says SFX is "billed per generation"; doc says 40 credits/second when duration set vs "200 credits per generation". [Treat as: default (auto-duration) = 200 credits/generation; explicit duration = 40 credits/sec; API $0.12/min nominal → U on exact API billing.]
10. **Stable Audio API price:** a search-engine synthesis claimed 20 credits ($0.20) per 2.5 generation; Stability's own pricing page (fetched directly) shows **8 credits** for both 3.0 and 2.5. [Use 8 credits.]
11. **Lyria:** pricing page lists `lyria-3-clip-preview` $0.04 and `lyria-3-pro-preview` $0.08; the music docs page now documents `lyria-3.5` and says "check pricing for Lyria 3.5". [3.5 price **U**.]
12. **Tripo MCP stars:** 214 (a cached page) vs 215 (GitHub API, used here). Trivial.
13. **Coding-Solo/godot-mcp stars:** 6,001 (search cache) vs 6,130 (GitHub API, used here).
14. **Kaedim trial:** FAQ says "no free trial / no discounts", while plans page (via aggregators) lists a $50 7-day trial. [FAQ likely stale; plan prices only second-hand → P.]
15. **CSM acquisition:** Alphabet/Google DeepMind acquisition (Jan 2026) appears in two secondary sources only; shutdown notice itself is quoted from Reddit. [U for acquisition; P for shutdown.]

## Open questions (not resolved)

- Exact legal effect of Hunyuan3D licence clause (c) on a game that ships generated meshes to EU/UK/KR customers; Tencent's hosted-API output terms (HY 3D Global) were **not read**.
- Meshy / Tripo / Rodin / Spline / Autodesk **Terms-of-Service text** for output ownership and training use was taken from pricing/FAQ pages, not the ToS documents themselves (except Meshy FAQ statement).
- Eleven Music v1 Terms "commercial rights table" — what exactly counts as a "large studio game" requiring Enterprise.
- Whether ElevenLabs' hosted MCP will expose SFX/music tools (docs only list agent management).
- Whether TRELLIS.2-4B HF weights have the same MIT licence as the repo (HF page could not be fetched; API returned no JSON from this host).
- Stability SF3D/SPAR3D and Stable Audio 3 weights are **gated on Hugging Face** — registration flow and attribution ("Powered by Stability AI") obligations apply for commercial use; whether this applies to *outputs* is a legal reading (U).
- Mixamo: no sign of recent feature updates; I did not verify last-release date → "still available" is verified only by the live Adobe FAQ + live site.
- DeepMotion pricing/licence from an aggregator (Asset Forge Index, checked 2026-10-16), vendor page not fetched.
- Move AI "Genesis replaced Move Pro (April 2026)" comes from a competitor's blog quoting 80.lv.
- Sonniss GDC 2026 bundle terms (separate page) not read.
- Suno v5 → licensed-model transition: WMG release says "current models will be deprecated when new models launch in 2026"; I found no confirmation that the new models have launched.
- Procedural-3D examples: I confirmed repos/pages exist but did not run code; CSG/SDF "agents do this well" is an editorial judgement (P).

---

## Appendix — how stars/licences were obtained
`gh api repos/OWNER/REPO --jq '{stars:.stargazers_count,license:.license.spdx_id,pushed:.pushed_at,archived:.archived}'` on 2026-10-17 for: ahujasid/blender-mcp (→ mcp-for-blender), CoplayDev/unity-mcp, CoderGamester/mcp-unity, Coding-Solo/godot-mcp, hybridindie/godot-mcp, sandraschi/godot-mcp, meshy-dev/meshy-mcp-server, meshy-dev/meshy-3d-agent, VAST-AI-Research/{tripo-mcp, tripo-3d-for-blender, TripoSR, TripoSG, MIDI-3D, UniRig}, microsoft/{TRELLIS, TRELLIS.2}, Tencent-Hunyuan/{Hunyuan3D-2, Hunyuan3D-2.1, Hunyuan3D-Omni, Hunyuan3D-Part, HY-Motion-1.0}, Stability-AI/{stable-fast-3d, stable-point-aware-3d, stable-audio-tools (3,886★ MIT), stable-audio-3}, TencentARC/InstantMesh, GuyTevet/motion-diffusion-model, OpenMotionLab/MotionGPT, grumdrig/jsfxr, grimfang4/sfxr, increpare/{bfxr, bfxr2}, KilledByAPixel/ZzFX, Tonejs/Tone.js, goldfire/howler.js, elevenlabs/elevenlabs-mcp, facebookresearch/audiocraft, haoheliu/AudioLDM2, mrdoob/three.js, gkjohnson/{three-bvh-csg, three-mesh-bvh}, elalish/manifold, openscad/openscad.
Not found via API (404) and therefore not claimed: `bfxr/bfxr2`, `DrPetter/sfxr`, `chiptone/chiptone`, `meshy-dev/meshy-mcp`.
