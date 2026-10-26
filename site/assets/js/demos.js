/* AI Game Building — playable demos (platformer, game-loop toy, collision toy, sound toy).
   Classic script: no modules, no fetch, no external libraries. Works from file://.
   Usage in a page: <div id="x"></div> + GameDemos.platformer(document.getElementById("x"), {...}).
   window.__demoState[id] exposes state/inputs so automated QA can drive each demo. */
(function () {
  "use strict";
  var GD = window.GameDemos = {};
  var STATE = window.__demoState = window.__demoState || {};
  var uid = 0;

  /* ---------- small DOM helpers ---------- */
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function shell(container, title, w, h) {
    container.classList.add("demo");
    container.innerHTML = "";
    var head = el("div", { "class": "demo-head" });
    var t = el("span", { "class": "title" }); t.textContent = title; head.appendChild(t);
    var stage = el("div", { "class": "demo-stage" });
    var canvas = el("canvas", { tabindex: "0", width: String(w), height: String(h), "aria-label": title + " (click to focus, then use the keyboard)" });
    stage.appendChild(canvas);
    var controls = el("div", { "class": "demo-controls" });
    container.appendChild(head); container.appendChild(stage); container.appendChild(controls);
    return { root: container, head: head, stage: stage, canvas: canvas, controls: controls, ctx: canvas.getContext("2d") };
  }
  function segmented(options, value, onChange) {
    var box = el("div", { "class": "seg", role: "group" });
    options.forEach(function (o) {
      var b = el("button", { type: "button", "data-v": o[0], "aria-pressed": String(o[0] === value) }, o[1]);
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(box.children, function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        onChange(o[0]);
      });
      box.appendChild(b);
    });
    return box;
  }
  function checkbox(label, checked, onChange) {
    var l = el("label"); var i = el("input", { type: "checkbox" }); i.checked = checked;
    i.addEventListener("change", function () { onChange(i.checked); });
    l.appendChild(i); l.appendChild(document.createTextNode(label));
    l.input = i;
    return l;
  }
  function slider(label, min, max, step, value, onInput, fmt) {
    var l = el("label"); l.appendChild(document.createTextNode(label + " "));
    var i = el("input", { type: "range", min: String(min), max: String(max), step: String(step) }); i.value = String(value);
    var out = el("span", { "class": "readout" }); out.textContent = fmt ? fmt(value) : value;
    i.addEventListener("input", function () { var v = parseFloat(i.value); out.textContent = fmt ? fmt(v) : v; onInput(v); });
    l.appendChild(i); l.appendChild(out); l.input = i;
    return l;
  }
  function button(label, onClick) { var b = el("button", { type: "button", "class": "btn" }, label); b.addEventListener("click", onClick); return b; }
  function note(container, html) { var n = el("div", { "class": "demo-note" }, html); container.appendChild(n); return n; }

  /* ---------- loop that only runs while the demo is on screen ---------- */
  function runLoop(target, frame) {
    var visible = true, raf = 0, last = 0;
    function tick(t) {
      raf = 0;
      if (!visible || document.hidden) { last = 0; return; }
      var dt = last ? Math.min((t - last) / 1000, 0.25) : 0;
      last = t;
      frame(dt, t / 1000);
      raf = requestAnimationFrame(tick);
    }
    function start() { if (!raf) raf = requestAnimationFrame(tick); }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) start(); }).observe(target);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });
    start();
  }

  /* ---------- keyboard + touch input bound to one canvas ---------- */
  function bindKeys(canvas, map, keys, onKey) {
    function set(k, down) { if (!!keys[k] === down) return; keys[k] = down; if (onKey) onKey(k, down); }
    canvas.addEventListener("keydown", function (e) { var k = map[e.code]; if (!k) return; e.preventDefault(); set(k, true); });
    canvas.addEventListener("keyup", function (e) { var k = map[e.code]; if (!k) return; e.preventDefault(); set(k, false); });
    canvas.addEventListener("blur", function () { for (var k in keys) set(k, false); });
    canvas.addEventListener("pointerdown", function () { canvas.focus({ preventScroll: true }); });
    return set;
  }
  function touchpad(container, groups, set, canvas) {
    var pad = el("div", { "class": "touchpad" });
    groups.forEach(function (g) {
      var grp = el("div", { "class": "grp" });
      g.forEach(function (b) {
        var btn = el("button", { type: "button", "aria-label": b[2] || b[1] }, b[0]);
        function down(e) { e.preventDefault(); if (canvas) canvas.focus({ preventScroll: true }); set(b[1], true); try { btn.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } }
        function up(e) { e.preventDefault(); set(b[1], false); }
        btn.addEventListener("pointerdown", down);
        btn.addEventListener("pointerup", up);
        btn.addEventListener("pointercancel", up);
        btn.addEventListener("contextmenu", function (e) { e.preventDefault(); });
        grp.appendChild(btn);
      });
      pad.appendChild(grp);
    });
    container.appendChild(pad);
    return pad;
  }
  function canvasPoint(canvas, e) {
    var r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height };
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }
  function arrow(ctx, x1, y1, x2, y2, color) {
    var a = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 9 * Math.cos(a - 0.4), y2 - 9 * Math.sin(a - 0.4));
    ctx.lineTo(x2 - 9 * Math.cos(a + 0.4), y2 - 9 * Math.sin(a + 0.4)); ctx.closePath(); ctx.fill();
  }

  /* =====================================================================
     1. Tiny platformer — art strategies (opts.mode "art") or game feel ("feel")
     ===================================================================== */
  GD.platformer = function (container, opts) {
    opts = opts || {};
    var feelMode = opts.mode === "feel";
    var id = opts.id || ("platformer" + (++uid));
    var W = 480, H = 270, TS = 18, COLS = 74, ROWS = 15, DT = 1 / 120;
    var S = shell(container, opts.title || "Tiny platformer", W, H);
    var canvas = S.canvas, ctx = S.ctx;
    var art = opts.art || "shapes";
    var feel = { accel: true, coyote: true, buffer: true, varjump: true, shake: true };
    var showBoxes = false, focused = false;
    var keys = {};

    var base = opts.base || "assets/img/kenney-pixel-platformer/";
    var tilesImg = new Image(), charsImg = new Image(), loaded = 0, spriteError = false;
    tilesImg.onload = charsImg.onload = function () { loaded++; };
    tilesImg.onerror = charsImg.onerror = function () { spriteError = true; };
    tilesImg.src = base + "tilemap_packed.png";
    charsImg.src = base + "tilemap-characters_packed.png";
    function spritesReady() { return loaded === 2 && !spriteError; }

    var grid, coins, enemies, start, flagCol, bumps, particles, p, cam, stats, shake, msg, won, deadTimer, time, acc;

    function reset() {
      grid = [];
      for (var r = 0; r < ROWS; r++) { var row = []; for (var c = 0; c < COLS; c++) row.push(r >= 12 ? "#" : " "); grid.push(row); }
      function put(r, c, s) { for (var i = 0; i < s.length; i++) grid[r][c + i] = s.charAt(i); }
      [[27, 29], [36, 38], [57, 59]].forEach(function (g) { for (var r = 12; r < ROWS; r++) for (var c = g[0]; c <= g[1]; c++) grid[r][c] = " "; });
      put(11, 2, "P");
      put(11, 8, "###"); put(10, 8, "ooo");
      put(7, 15, "B?B?B"); put(11, 17, "e");
      put(11, 20, "#######"); put(10, 23, "^");
      put(9, 31, "####"); put(8, 31, "oooo");
      put(11, 40, "##########"); put(10, 45, "e");
      put(8, 46, "###"); put(7, 46, "ooo");
      put(11, 52, "e");
      put(11, 62, "######"); put(10, 63, "#####"); put(9, 64, "####"); put(8, 65, "###");
      put(11, 71, "F");
      coins = []; enemies = []; var qcount = 0;
      for (var y = 0; y < ROWS; y++) for (var x = 0; x < COLS; x++) {
        var ch = grid[y][x];
        if (ch === "o") { coins.push({ x: x * TS + TS / 2, y: y * TS + TS / 2, taken: false }); grid[y][x] = " "; }
        else if (ch === "e") { enemies.push({ x: x * TS + 2, y: y * TS + 4, w: 14, h: 14, vx: -35, vy: 0, onGround: false, squash: 0 }); grid[y][x] = " "; }
        else if (ch === "P") { start = { x: x * TS + 3, y: y * TS }; grid[y][x] = " "; }
        else if (ch === "F") { flagCol = x; grid[y][x] = " "; }
        else if (ch === "?") qcount++;
      }
      p = { x: start.x, y: start.y, w: 12, h: 18, vx: 0, vy: 0, onGround: false, face: 1, coyote: 0, buffer: 0, bufferedPress: false };
      cam = { x: 0 }; bumps = []; particles = []; acc = 0;
      stats = { coins: 0, total: coins.length + qcount, deaths: 0 };
      shake = { t: 0, mag: 0 }; msg = { text: "", t: 0 }; won = false; deadTimer = 0; time = 0;
    }

    function solid(tx, ty) {
      if (tx < 0 || tx >= COLS) return true;
      if (ty < 0 || ty >= ROWS) return false;
      var c = grid[ty][tx];
      return c === "#" || c === "B" || c === "?" || c === "U";
    }
    function moveX(e, dx) {
      e.x += dx;
      var top = Math.floor(e.y / TS), bot = Math.floor((e.y + e.h - 0.001) / TS), ty;
      if (dx > 0) { var tx = Math.floor((e.x + e.w - 0.001) / TS); for (ty = top; ty <= bot; ty++) if (solid(tx, ty)) { e.x = tx * TS - e.w; return true; } }
      else if (dx < 0) { var tx2 = Math.floor(e.x / TS); for (ty = top; ty <= bot; ty++) if (solid(tx2, ty)) { e.x = (tx2 + 1) * TS; return true; } }
      return false;
    }
    function moveY(e, dy) {
      e.y += dy;
      var l = Math.floor(e.x / TS), r = Math.floor((e.x + e.w - 0.001) / TS), tx;
      if (dy > 0) {
        var ty = Math.floor((e.y + e.h - 0.001) / TS);
        for (tx = l; tx <= r; tx++) if (solid(tx, ty)) { e.y = ty * TS - e.h; e.vy = 0; e.onGround = true; return "down"; }
      } else if (dy < 0) {
        var ty2 = Math.floor(e.y / TS), hit = false;
        for (tx = l; tx <= r; tx++) if (solid(tx, ty2)) hit = true;
        if (hit) { e.y = (ty2 + 1) * TS; e.vy = 0; return { ty: ty2, l: l, r: r }; }
      }
      return null;
    }
    function overlap(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
    function flash(t) { msg.text = t; msg.t = 1.1; }
    function doShake(mag, t) { if (feel.shake) { shake.mag = mag; shake.t = t; } }
    function pop(x, y, color, n) {
      for (var i = 0; i < (n || 8); i++) particles.push({ x: x, y: y, vx: (Math.random() * 2 - 1) * 90, vy: -60 - Math.random() * 120, t: 0.5, color: color });
    }
    function bump(info) {
      var cx = Math.floor((p.x + p.w / 2) / TS);
      var tx = solid(cx, info.ty) ? cx : (solid(info.l, info.ty) ? info.l : info.r);
      if (info.ty < 0 || info.ty >= ROWS) return;
      var c = grid[info.ty][tx];
      if (c === "?") { grid[info.ty][tx] = "U"; stats.coins++; pop(tx * TS + TS / 2, info.ty * TS - 4, "#ffd54a"); flash("+1 coin from the ? block"); }
      if (c === "?" || c === "B") bumps.push({ tx: tx, ty: info.ty, t: 0.15 });
    }
    function die() {
      if (deadTimer > 0 || won) return;
      deadTimer = 0.7; stats.deaths++; doShake(6, 0.35);
      pop(p.x + p.w / 2, p.y + p.h / 2, "#ff5252", 14);
    }

    function onKey(k, down) {
      if (k === "jump" && down) {
        if (won) { reset(); return; }
        p.bufferedPress = !(p.onGround || p.coyote > 0);
        p.buffer = feel.buffer ? 0.12 : DT * 1.01;
      }
      if (k === "jump" && !down && feel.varjump && p.vy < -120) p.vy *= 0.45;
      if (k === "restart" && down) reset();
    }
    var setKey = bindKeys(canvas, {
      ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right",
      ArrowUp: "jump", KeyW: "jump", Space: "jump", KeyZ: "jump", KeyR: "restart", Enter: "restart"
    }, keys, onKey);
    canvas.addEventListener("focus", function () { focused = true; });
    canvas.addEventListener("blur", function () { focused = false; });

    function stepPlayer(dt) {
      var dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      if (dir) p.face = dir;
      var max = 140;
      if (!feel.accel) p.vx = dir * max;
      else if (dir) {
        var a = p.onGround ? 1100 : 750;
        if (p.vx * dir < 0) a += 1400;               // skid when reversing
        p.vx += dir * a * dt;
        if (p.vx * dir > max) p.vx = dir * max;
      } else {
        var s = p.vx > 0 ? 1 : -1, d = p.onGround ? 1500 : 500;
        p.vx -= s * d * dt; if ((p.vx > 0 ? 1 : -1) !== s) p.vx = 0;
      }
      if (p.onGround) p.coyote = feel.coyote ? 0.1 : 0; else p.coyote -= dt;
      p.buffer -= dt;
      if (p.buffer > 0 && (p.onGround || p.coyote > 0)) {
        var kind = !p.onGround ? "Coyote-time jump: you had already left the ledge" : (p.bufferedPress ? "Buffered jump: pressed before landing" : "");
        p.vy = -500; p.onGround = false; p.coyote = 0; p.buffer = 0;
        if (kind && feelMode) flash(kind);
      }
      p.vy = Math.min(p.vy + 1700 * dt, 600);
      moveX(p, p.vx * dt);
      var wasAir = !p.onGround, fallV = p.vy;
      p.onGround = false;
      var res = moveY(p, p.vy * dt);
      if (res && res !== "down") bump(res);
      if (res === "down" && wasAir && fallV > 430) doShake(2, 0.1);
    }

    function step(dt) {
      if (won) return;
      time += dt;
      if (deadTimer > 0) {
        deadTimer -= dt;
        if (deadTimer <= 0) { p.x = start.x; p.y = start.y; p.vx = p.vy = 0; p.buffer = 0; }
      } else {
        stepPlayer(dt);
        if (p.y > ROWS * TS + 30) die();
        // spikes: only the lower half of a "^" tile hurts
        var l = Math.floor(p.x / TS), r = Math.floor((p.x + p.w - 0.001) / TS), t = Math.floor(p.y / TS), b = Math.floor((p.y + p.h - 0.001) / TS);
        for (var ty = t; ty <= b; ty++) for (var tx = l; tx <= r; tx++) {
          if (ty >= 0 && ty < ROWS && tx >= 0 && tx < COLS && grid[ty][tx] === "^" && overlap(p, { x: tx * TS + 3, y: ty * TS + 9, w: TS - 6, h: 9 })) die();
        }
        coins.forEach(function (c) {
          if (!c.taken && Math.abs(p.x + p.w / 2 - c.x) < 11 && Math.abs(p.y + p.h / 2 - c.y) < 13) { c.taken = true; stats.coins++; pop(c.x, c.y, "#ffd54a", 6); }
        });
        if (p.x + p.w > flagCol * TS + 6) { won = true; flash(""); }
      }
      enemies.forEach(function (e) {
        if (e.squash > 0) { e.squash -= dt; return; }
        e.vy = Math.min(e.vy + 1700 * dt, 600);
        var vx = e.vx;
        if (moveX(e, vx * dt)) e.vx = -vx;
        e.onGround = false; moveY(e, e.vy * dt);
        if (e.onGround) {
          var fx = e.vx < 0 ? e.x - 1 : e.x + e.w + 1;
          if (!solid(Math.floor(fx / TS), Math.floor((e.y + e.h + 1) / TS))) e.vx = -e.vx;
        }
        if (deadTimer <= 0 && overlap(p, e)) {
          if (p.vy > 0 && p.y + p.h - e.y < 9) { e.squash = 0.4; e.dead = true; p.vy = keys.jump ? -470 : -300; doShake(3, 0.15); pop(e.x + 7, e.y + 7, "#b388ff", 8); }
          else die();
        }
      });
      enemies = enemies.filter(function (e) { return !(e.dead && e.squash <= 0) && e.y < ROWS * TS + 60; });
    }

    function update(dt) {
      acc += dt;
      var n = 0;
      while (acc >= DT && n < 30) { step(DT); acc -= DT; n++; }
      if (n >= 30) acc = 0;
      bumps.forEach(function (b) { b.t -= dt; }); bumps = bumps.filter(function (b) { return b.t > 0; });
      particles.forEach(function (q) { q.t -= dt; q.vy += 500 * dt; q.x += q.vx * dt; q.y += q.vy * dt; });
      particles = particles.filter(function (q) { return q.t > 0; });
      if (shake.t > 0) shake.t -= dt;
      if (msg.t > 0) msg.t -= dt;
      var target = p.x + p.w / 2 - W / 2 + p.face * 30;
      cam.x += (target - cam.x) * Math.min(1, dt * 6);
      cam.x = Math.max(0, Math.min(cam.x, COLS * TS - W));
    }

    /* ----- drawing: three art strategies over identical game logic ----- */
    var EMOJI_FONT = "'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif";
    function tileAt(tx, ty) { return (ty >= 0 && ty < ROWS && tx >= 0 && tx < COLS) ? grid[ty][tx] : " "; }
    function bumpOffset(tx, ty) { for (var i = 0; i < bumps.length; i++) if (bumps[i].tx === tx && bumps[i].ty === ty) return -Math.sin(bumps[i].t / 0.15 * Math.PI) * 4; return 0; }
    function spr(i, x, y) { ctx.drawImage(tilesImg, (i % 20) * 18, Math.floor(i / 20) * 18, 18, 18, Math.round(x), Math.round(y), 18, 18); }
    function chr(i, x, y, flip, sy) {
      ctx.save(); ctx.translate(Math.round(x + 12), Math.round(y + 24)); ctx.scale(flip ? -1 : 1, sy || 1);
      ctx.drawImage(charsImg, (i % 9) * 24, Math.floor(i / 9) * 24, 24, 24, -12, -24, 24, 24); ctx.restore();
    }
    function emoji(ch, x, y, size, flip) {
      ctx.save(); ctx.font = size + "px " + EMOJI_FONT; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.translate(x, y); if (flip) ctx.scale(-1, 1); ctx.fillText(ch, 0, 0); ctx.restore();
    }

    function drawTile(mode, c, tx, ty) {
      var x = tx * TS, y = ty * TS + bumpOffset(tx, ty);
      var groundAbove = tileAt(tx, ty - 1) === "#";
      if (mode === "sprites") {
        if (c === "#") {
          if (!groundAbove) spr(tileAt(tx - 1, ty) !== "#" ? 1 : (tileAt(tx + 1, ty) !== "#" ? 3 : 2), x, y);
          else spr(122, x, y);
        } else if (c === "B") spr(26, x, y);
        else if (c === "?") spr(10, x, y);
        else if (c === "U") spr(9, x, y);
        else if (c === "^") spr(68, x, y);
        return;
      }
      if (c === "#") {
        ctx.fillStyle = mode === "emoji" ? "#8d6e63" : "#9c5b2e"; ctx.fillRect(x, y, TS, TS);
        if (!groundAbove) { ctx.fillStyle = mode === "emoji" ? "#66bb6a" : "#5cb85c"; ctx.fillRect(x, y, TS, 5); ctx.fillStyle = "#3d8b3d"; ctx.fillRect(x, y + 5, TS, 1); }
        if ((tx * 7 + ty * 13) % 5 === 0) { ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(x + 5, y + 10, 2, 2); ctx.fillRect(x + 12, y + 14, 2, 2); }
      } else if (c === "B") {
        if (mode === "emoji") { emoji("🧱", x + 9, y + 10, 17); return; }
        ctx.fillStyle = "#c0662b"; ctx.fillRect(x, y, TS, TS); ctx.fillStyle = "#7a3b14";
        ctx.fillRect(x, y + 8, TS, 1.5); ctx.fillRect(x, y + 17, TS, 1); ctx.fillRect(x + 9, y, 1.5, 8); ctx.fillRect(x + 4, y + 9, 1.5, 8); ctx.fillRect(x + 13, y + 9, 1.5, 8);
      } else if (c === "?" || c === "U") {
        ctx.fillStyle = c === "?" ? "#f0a92b" : "#8a6d55"; ctx.fillRect(x, y, TS, TS);
        ctx.strokeStyle = c === "?" ? "#9b5f12" : "#5d4636"; ctx.lineWidth = 1.5; ctx.strokeRect(x + 0.75, y + 0.75, TS - 1.5, TS - 1.5);
        if (c === "?") { if (mode === "emoji") emoji("❓", x + 9, y + 10, 13); else { ctx.fillStyle = "#fff"; ctx.font = "bold 13px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("?", x + 9, y + 10); } }
      } else if (c === "^") {
        if (mode === "emoji") { emoji("🌵", x + 9, y + 11, 15); return; }
        ctx.fillStyle = "#cfd8dc"; ctx.strokeStyle = "#607d8b"; ctx.lineWidth = 1;
        for (var i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x + i * 6, y + TS); ctx.lineTo(x + i * 6 + 3, y + 8); ctx.lineTo(x + i * 6 + 6, y + TS); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      }
    }

    function drawPlayer(mode) {
      if (deadTimer > 0) return;
      var moving = Math.abs(p.vx) > 10;
      if (mode === "sprites") {
        var f = !p.onGround ? 1 : (moving ? Math.floor(time * 8) % 2 : 0);
        chr(f, p.x + p.w / 2 - 12, p.y + p.h - 24, p.face < 0); return;
      }
      if (mode === "emoji") { emoji("🦊", p.x + p.w / 2, p.y + p.h / 2 - 1, 20, p.face > 0); return; }
      var bob = p.onGround && moving ? Math.abs(Math.sin(time * 16)) * 1.5 : 0;
      ctx.fillStyle = "#e53935"; roundRect(ctx, p.x, p.y - bob, p.w, p.h - 3, 3); ctx.fill();
      ctx.fillStyle = "#1e88e5"; ctx.fillRect(p.x, p.y + p.h - 9 - bob, p.w, 6);
      ctx.fillStyle = "#3e2723"; ctx.fillRect(p.x + 1, p.y + p.h - 3, 4, 3); ctx.fillRect(p.x + p.w - 5, p.y + p.h - 3, 4, 3);
      var ex = p.x + p.w / 2 + p.face * 2;
      ctx.fillStyle = "#fff"; ctx.fillRect(ex - 1, p.y + 3 - bob, 4, 4);
      ctx.fillStyle = "#000"; ctx.fillRect(ex + (p.face > 0 ? 1 : 0), p.y + 4 - bob, 2, 2);
    }
    function drawEnemy(mode, e) {
      var sq = e.squash > 0 ? 0.35 : 1;
      if (mode === "sprites") { chr(18 + (Math.floor(time * 5) % 2), e.x + e.w / 2 - 12, e.y + e.h - 24, e.vx > 0, sq); return; }
      if (mode === "emoji") {
        ctx.save(); ctx.translate(e.x + e.w / 2, e.y + e.h); ctx.scale(1, sq); emoji("🐌", 0, -8, 16, e.vx > 0); ctx.restore(); return;
      }
      var h = e.h * sq;
      ctx.fillStyle = "#7e57c2"; roundRect(ctx, e.x, e.y + e.h - h, e.w, h, 5); ctx.fill();
      if (sq === 1) {
        var d = e.vx > 0 ? 2 : -2;
        ctx.fillStyle = "#fff"; ctx.fillRect(e.x + 3 + d, e.y + 3, 3, 4); ctx.fillRect(e.x + 8 + d, e.y + 3, 3, 4);
        ctx.fillStyle = "#000"; ctx.fillRect(e.x + 4 + d, e.y + 5, 2, 2); ctx.fillRect(e.x + 9 + d, e.y + 5, 2, 2);
      }
    }
    function drawCoin(mode, c) {
      if (mode === "sprites") { spr(Math.floor(time * 4) % 2 ? 152 : 151, c.x - 9, c.y - 9); return; }
      if (mode === "emoji") { emoji("⭐", c.x, c.y, 13); return; }
      var w = Math.max(1, Math.abs(Math.cos(time * 4 + c.x)) * 5);
      ctx.fillStyle = "#ffd54a"; ctx.strokeStyle = "#b8860b"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(c.x, c.y, w, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    function drawFlag(mode) {
      var x = flagCol * TS;
      if (mode === "sprites") { spr(Math.floor(time * 3) % 2 ? 112 : 111, x, 7 * TS); for (var ty = 8; ty <= 11; ty++) spr(131, x, ty * TS); return; }
      if (mode === "emoji") { ctx.fillStyle = "#ddd"; ctx.fillRect(x + 8, 7 * TS, 2, 5 * TS); emoji("🚩", x + 14, 7 * TS + 8, 18); return; }
      ctx.fillStyle = "#eceff1"; ctx.fillRect(x + 8, 7 * TS, 2, 5 * TS);
      var wave = Math.sin(time * 5) * 2;
      ctx.fillStyle = "#43a047"; ctx.beginPath(); ctx.moveTo(x + 10, 7 * TS + 1); ctx.lineTo(x + 24, 7 * TS + 6 + wave); ctx.lineTo(x + 10, 7 * TS + 12); ctx.closePath(); ctx.fill();
    }
    function drawClouds(mode) {
      for (var i = 0; i < 9; i++) {
        var cx = i * 170 + 40 + cam.x * 0.5, cy = 26 + (i % 3) * 22;
        if (mode === "sprites") { spr(153, cx, cy); spr(154, cx + 18, cy); spr(155, cx + 36, cy); }
        else if (mode === "emoji") emoji("☁️", cx + 27, cy + 9, 26);
        else { ctx.fillStyle = "rgba(255,255,255,.9)"; ctx.beginPath(); ctx.arc(cx + 14, cy + 12, 9, 0, 7); ctx.arc(cx + 27, cy + 8, 12, 0, 7); ctx.arc(cx + 41, cy + 12, 9, 0, 7); ctx.fill(); ctx.fillRect(cx + 14, cy + 12, 27, 9); }
      }
    }
    function hudText(t, x, y, align, size) {
      ctx.font = "bold " + (size || 10) + "px 'Segoe UI', system-ui, sans-serif"; ctx.textAlign = align || "left"; ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(0,0,0,.55)"; ctx.fillText(t, x + 1, y + 1); ctx.fillStyle = "#fff"; ctx.fillText(t, x, y);
    }

    function render() {
      var mode = art === "sprites" && !spritesReady() ? "shapes" : art;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingEnabled = false;
      if (mode === "shapes") { var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#4f8fe6"); g.addColorStop(1, "#a9d4ff"); ctx.fillStyle = g; }
      else ctx.fillStyle = mode === "sprites" ? "#cbeefc" : "#bfe3ff";
      ctx.fillRect(0, 0, W, H);
      var sx = 0, sy = 0;
      if (shake.t > 0) { sx = (Math.random() * 2 - 1) * shake.mag; sy = (Math.random() * 2 - 1) * shake.mag; }
      ctx.setTransform(1, 0, 0, 1, Math.round(-cam.x + sx), Math.round(sy));
      drawClouds(mode);
      var c0 = Math.max(0, Math.floor(cam.x / TS) - 1), c1 = Math.min(COLS - 1, c0 + Math.ceil(W / TS) + 2);
      for (var ty = 0; ty < ROWS; ty++) for (var tx = c0; tx <= c1; tx++) { var c = grid[ty][tx]; if (c !== " ") drawTile(mode, c, tx, ty); }
      drawFlag(mode);
      coins.forEach(function (cn) { if (!cn.taken) drawCoin(mode, cn); });
      enemies.forEach(function (e) { drawEnemy(mode, e); });
      drawPlayer(mode);
      particles.forEach(function (q) { ctx.globalAlpha = Math.max(0, q.t * 2); ctx.fillStyle = q.color; ctx.fillRect(q.x - 1.5, q.y - 1.5, 3, 3); });
      ctx.globalAlpha = 1;
      if (showBoxes) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#00e676"; ctx.strokeRect(p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1);
        ctx.strokeStyle = "#ff1744"; enemies.forEach(function (e) { ctx.strokeRect(e.x + 0.5, e.y + 0.5, e.w - 1, e.h - 1); });
        ctx.strokeStyle = "#ffea00"; coins.forEach(function (cn) { if (!cn.taken) ctx.strokeRect(cn.x - 11, cn.y - 13, 22, 26); });
        ctx.strokeStyle = "rgba(255,255,255,.25)";
        for (var y2 = 0; y2 < ROWS; y2++) for (var x2 = c0; x2 <= c1; x2++) if (solid(x2, y2)) ctx.strokeRect(x2 * TS + 0.5, y2 * TS + 0.5, TS - 1, TS - 1);
      }
      // HUD
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      hudText("Coins " + stats.coins + "/" + stats.total + "   Falls " + stats.deaths + "   Time " + time.toFixed(1) + "s", 8, 6);
      var label = { shapes: "Art: drawn by code (no files)", emoji: "Art: emoji glyphs (font-dependent)", sprites: "Art: Kenney CC0 sprite sheet" }[mode];
      if (art === "sprites" && !spritesReady()) label = spriteError ? "Sprite files failed to load: showing shapes" : "Loading sprites...";
      hudText(label, W - 8, 6, "right");
      if (msg.t > 0 && msg.text) { ctx.globalAlpha = Math.min(1, msg.t * 2); hudText(msg.text, W / 2, 24, "center", 11); ctx.globalAlpha = 1; }
      if (won) {
        ctx.fillStyle = "rgba(0,0,0,.6)"; ctx.fillRect(0, H / 2 - 34, W, 68);
        hudText("Flag reached!  Coins " + stats.coins + "/" + stats.total + " in " + time.toFixed(1) + " s", W / 2, H / 2 - 22, "center", 15);
        hudText("Press R, Space or tap Jump to play again", W / 2, H / 2 + 4, "center", 11);
      } else if (!focused) {
        ctx.fillStyle = "rgba(0,0,0,.55)"; ctx.fillRect(0, H - 34, W, 34);
        hudText("Click here to play.  Move: arrow keys or A/D.  Jump: Space, Up or W.  R: restart.", W / 2, H - 25, "center", 11);
      }
    }

    // controls
    if (feelMode) {
      var boxes = {};
      [["accel", "Smooth acceleration"], ["coyote", "Coyote time (0.10 s)"], ["buffer", "Jump buffer (0.12 s)"], ["varjump", "Variable jump height"], ["shake", "Screen shake"]].forEach(function (o) {
        boxes[o[0]] = checkbox(o[1], true, function (v) { feel[o[0]] = v; canvas.focus({ preventScroll: true }); });
        S.controls.appendChild(boxes[o[0]]);
      });
      S.controls.appendChild(button("All off", function () { for (var k in boxes) { boxes[k].input.checked = false; feel[k] = false; } canvas.focus({ preventScroll: true }); }));
      S.controls.appendChild(button("All on", function () { for (var k in boxes) { boxes[k].input.checked = true; feel[k] = true; } canvas.focus({ preventScroll: true }); }));
    } else {
      S.head.appendChild(segmented([["shapes", "Code-drawn"], ["emoji", "Emoji"], ["sprites", "CC0 sprites"]], art, function (v) { art = v; canvas.focus({ preventScroll: true }); }));
    }
    S.controls.appendChild(checkbox("Show hitboxes", false, function (v) { showBoxes = v; canvas.focus({ preventScroll: true }); }));
    S.controls.appendChild(button("Restart", function () { reset(); canvas.focus({ preventScroll: true }); }));
    touchpad(S.root, [[["◀", "left", "Move left"], ["▶", "right", "Move right"]], [["⤒", "jump", "Jump"]]], setKey, canvas);
    if (opts.note) note(S.root, opts.note);

    reset();
    runLoop(canvas, function (dt) { update(dt); render(); });
    STATE[id] = {
      get: function () { return { x: p.x, y: p.y, vx: p.vx, vy: p.vy, onGround: p.onGround, coins: stats.coins, total: stats.total, deaths: stats.deaths, won: won, art: art, spritesReady: spritesReady(), time: time }; },
      key: function (k, down) { setKey(k, !!down); },
      reset: reset,
      setArt: function (v) { art = v; },
      setFeel: function (k, v) { feel[k] = !!v; }
    };
    return STATE[id];
  };

  /* =====================================================================
     2. Game loop & delta time toy
     ===================================================================== */
  GD.loopToy = function (container, opts) {
    opts = opts || {};
    var id = opts.id || ("loop" + (++uid));
    var W = 640, H = 250;
    var S = shell(container, opts.title || "Game loop and delta time", W, H);
    var ctx = S.ctx;
    var fps = 60, spikes = false, clamp = true, paused = false;
    var L = 430, X0 = 190, SPEED = 180;
    var simAcc = 0, nextDelay = 1 / 60, now = 0, lastDt = 1 / 60;
    var x1 = 0, x2 = 0, x3 = 0, x3prev = 0, fixedAcc = 0;
    var samples = [], ticks = [];
    function reset() { x1 = x2 = x3 = x3prev = 0; fixedAcc = 0; samples = []; ticks = []; }

    function gameFrame(dt) {
      lastDt = dt;
      var used = clamp ? Math.min(dt, 0.1) : dt;
      x1 += 3;                                  // per-frame movement: speed depends on frame rate
      x2 += SPEED * used;                       // delta-time movement
      fixedAcc += used; var n = 0;              // fixed 60 Hz simulation with interpolation
      while (fixedAcc >= 1 / 60 && n < 12) { x3prev = x3; x3 += SPEED / 60; fixedAcc -= 1 / 60; n++; ticks.push({ t: now, kind: "u" }); }
      ticks.push({ t: now, kind: "f" });
      samples.push({ t: now, a: x1, b: x2, c: x3 });
      while (samples.length && now - samples[0].t > 1) samples.shift();
      while (ticks.length && now - ticks[0].t > 1.5) ticks.shift();
      draw();
    }
    function speed(key) {
      if (samples.length < 2) return 0;
      var a = samples[0], b = samples[samples.length - 1];
      return b.t > a.t ? (b[key] - a[key]) / (b.t - a.t) : 0;
    }
    function lane(y, label, sub, x, color, sp) {
      ctx.fillStyle = "#1b2238"; ctx.fillRect(X0, y - 14, L, 28);
      ctx.strokeStyle = "#2f3a5c"; ctx.strokeRect(X0 + 0.5, y - 13.5, L - 1, 27);
      ctx.fillStyle = "#e6e8ee"; ctx.font = "bold 13px 'Segoe UI', sans-serif"; ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillText(label, 12, y - 6);
      ctx.fillStyle = "#9aa3bd"; ctx.font = "11.5px 'Segoe UI', sans-serif"; ctx.fillText(sub, 12, y + 9);
      var px = X0 + 10 + ((x % (L - 20)) + (L - 20)) % (L - 20);
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(px, y, 9, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#e6e8ee"; ctx.font = "12px Consolas, monospace"; ctx.textAlign = "right";
      ctx.fillText(Math.round(sp) + " px/s", W - 8, y);
    }
    function draw() {
      ctx.fillStyle = "#0d1020"; ctx.fillRect(0, 0, W, H);
      lane(32, "Per frame", "x += 3 px every frame", x1, "#ff7043", speed("a"));
      lane(82, "Delta time", "x += 180 px/s × dt", x2, "#42a5f5", speed("b"));
      var alpha = fixedAcc * 60;
      lane(132, "Fixed step", "60 Hz updates + interpolation", x3prev + (x3 - x3prev) * alpha, "#66bb6a", speed("c"));
      // timeline
      var ty = 178;
      ctx.fillStyle = "#9aa3bd"; ctx.font = "11.5px 'Segoe UI', sans-serif"; ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillText("Last 1.5 s", 12, ty - 2);
      ctx.fillStyle = "#42a5f5"; ctx.fillText("▮ frame drawn", 12, ty + 13);
      ctx.fillStyle = "#66bb6a"; ctx.fillText("▮ fixed update", 100, ty + 13);
      ctx.fillStyle = "#1b2238"; ctx.fillRect(X0, ty - 10, L, 40);
      ticks.forEach(function (k) {
        var x = X0 + L - (now - k.t) / 1.5 * L;
        if (k.kind === "f") { ctx.fillStyle = "#42a5f5"; ctx.fillRect(x, ty - 8, 2, 16); }
        else { ctx.fillStyle = "#66bb6a"; ctx.fillRect(x, ty + 12, 2, 14); }
      });
      ctx.fillStyle = "#e6e8ee"; ctx.font = "12px Consolas, monospace"; ctx.textAlign = "left";
      var drawn = ticks.filter(function (k) { return k.kind === "f" && now - k.t <= 1; }).length;
      ctx.fillText("target " + fps + " fps, actual " + drawn + " fps   last dt " + (lastDt * 1000).toFixed(1) + " ms" + (clamp && lastDt > 0.1 ? " (clamped to 100 ms)" : ""), 12, H - 14);
    }
    runLoop(S.canvas, function (dt) {
      if (paused) return;
      now += dt; simAcc += dt;
      if (simAcc >= nextDelay - 0.006) {
        var frameDt = simAcc; simAcc = 0;
        nextDelay = 1 / fps + (spikes && Math.random() < 0.04 ? 0.15 + Math.random() * 0.2 : 0);
        gameFrame(frameDt);
      }
    });
    S.controls.appendChild(slider("Frame rate", 10, 144, 1, 60, function (v) { fps = v; nextDelay = 1 / fps; samples = []; }, function (v) { return v + " fps"; }));
    S.controls.appendChild(checkbox("Random lag spikes", false, function (v) { spikes = v; }));
    S.controls.appendChild(checkbox("Clamp dt to 100 ms", true, function (v) { clamp = v; }));
    S.controls.appendChild(checkbox("Pause", false, function (v) { paused = v; }));
    S.controls.appendChild(button("Reset", reset));
    if (opts.note) note(S.root, opts.note);
    draw();
    STATE[id] = { get: function () { return { fps: fps, perFrame: speed("a"), delta: speed("b"), fixed: speed("c") }; }, setFps: function (v) { fps = v; samples = []; } };
    return STATE[id];
  };

  /* =====================================================================
     3. Collision toy: AABB, circles, tunneling
     ===================================================================== */
  GD.collisionToy = function (container, opts) {
    opts = opts || {};
    var id = opts.id || ("collision" + (++uid));
    var W = 640, H = 300;
    var S = shell(container, opts.title || "Collision toy", W, H);
    var canvas = S.canvas, ctx = S.ctx;
    var mode = "aabb", resolve = false, swept = false, bulletSpeed = 30, wall = 10;
    var A = { x: 250, y: 100, w: 140, h: 90 }, B = { x: 120, y: 60, w: 90, h: 60 };
    var CA = { x: 320, y: 150, r: 64 }, CB = { x: 170, y: 110, r: 40 };
    var drag = null, info = "";
    var bullet = { x: 40, y: 150, s: 8 }, trail = [], hits = 0, misses = 0, flashT = 0, tAcc = 0;

    function resolveAabb() {
      var ox = Math.min(A.x + A.w - B.x, B.x + B.w - A.x), oy = Math.min(A.y + A.h - B.y, B.y + B.h - A.y);
      if (ox <= 0 || oy <= 0) return null;
      var bcx = B.x + B.w / 2, acx = A.x + A.w / 2, bcy = B.y + B.h / 2, acy = A.y + A.h / 2;
      return ox < oy ? { x: bcx < acx ? -ox : ox, y: 0 } : { x: 0, y: bcy < acy ? -oy : oy };
    }
    function resolveCircle() {
      var dx = CB.x - CA.x, dy = CB.y - CA.y, d = Math.sqrt(dx * dx + dy * dy) || 0.0001, pen = CA.r + CB.r - d;
      return pen > 0 ? { x: dx / d * pen, y: dy / d * pen, d: d } : { d: d };
    }
    canvas.addEventListener("pointerdown", function (e) {
      var pt = canvasPoint(canvas, e);
      if (mode === "aabb") drag = { o: B, dx: pt.x - B.x, dy: pt.y - B.y };
      else if (mode === "circle") drag = { o: CB, dx: pt.x - CB.x, dy: pt.y - CB.y };
      if (drag) { try { canvas.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } }
    });
    canvas.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var pt = canvasPoint(canvas, e);
      drag.o.x = Math.max(0, Math.min(W - 10, pt.x - drag.dx)); drag.o.y = Math.max(0, Math.min(H - 10, pt.y - drag.dy));
    });
    function endDrag() { drag = null; }
    canvas.addEventListener("pointerup", endDrag); canvas.addEventListener("pointercancel", endDrag);

    function stepBullet() {
      var wx = 430, prevX = bullet.x;
      var n = swept ? Math.max(1, Math.ceil(bulletSpeed / (bullet.s / 2))) : 1;
      var hit = false;
      for (var i = 1; i <= n; i++) {
        var x = prevX + bulletSpeed * i / n;
        if (x + bullet.s > wx && x < wx + wall) { hit = true; break; }
      }
      bullet.x = prevX + bulletSpeed;
      trail.push(bullet.x); if (trail.length > 10) trail.shift();
      if (!hit && !bullet.passed && bullet.x > wx + wall) { misses++; bullet.passed = true; }
      if (hit || bullet.x > W) {
        if (hit) { hits++; flashT = 0.25; }
        bullet.x = 20 + Math.random() * 40; bullet.passed = false; trail = [];
      }
    }

    function draw(dt) {
      ctx.fillStyle = "#0d1020"; ctx.fillRect(0, 0, W, H);
      ctx.font = "13px 'Segoe UI', sans-serif"; ctx.textBaseline = "top"; ctx.textAlign = "left";
      if (mode === "aabb") {
        var m = resolveAabb();
        if (m && resolve) { B.x += m.x; B.y += m.y; m = null; }
        ctx.fillStyle = "rgba(66,165,245,.25)"; ctx.strokeStyle = "#42a5f5"; ctx.lineWidth = 2;
        ctx.fillRect(A.x, A.y, A.w, A.h); ctx.strokeRect(A.x, A.y, A.w, A.h);
        ctx.fillStyle = m ? "rgba(255,82,82,.35)" : "rgba(102,187,106,.3)"; ctx.strokeStyle = m ? "#ff5252" : "#66bb6a";
        ctx.fillRect(B.x, B.y, B.w, B.h); ctx.strokeRect(B.x, B.y, B.w, B.h);
        if (m) {
          var ix = Math.max(A.x, B.x), iy = Math.max(A.y, B.y), iw = Math.min(A.x + A.w, B.x + B.w) - ix, ih = Math.min(A.y + A.h, B.y + B.h) - iy;
          ctx.fillStyle = "rgba(255,82,82,.5)"; ctx.fillRect(ix, iy, iw, ih);
          var cx = B.x + B.w / 2, cy = B.y + B.h / 2; arrow(ctx, cx, cy, cx + m.x, cy + m.y, "#ffeb3b");
          info = "Overlap! Smallest push-out: " + Math.abs(Math.round(m.x || m.y)) + " px on the " + (m.x ? "X" : "Y") + " axis (yellow arrow).";
        } else info = "No overlap. Test: A.left < B.right && A.right > B.left && A.top < B.bottom && A.bottom > B.top";
        ctx.fillStyle = "#e6e8ee"; ctx.fillText("Drag the green box over the blue one.", 12, 10);
      } else if (mode === "circle") {
        var r = resolveCircle();
        if (r.x !== undefined && resolve) { CB.x += r.x; CB.y += r.y; r = resolveCircle(); }
        var over = r.x !== undefined;
        ctx.lineWidth = 2;
        ctx.fillStyle = "rgba(66,165,245,.25)"; ctx.strokeStyle = "#42a5f5"; ctx.beginPath(); ctx.arc(CA.x, CA.y, CA.r, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = over ? "rgba(255,82,82,.35)" : "rgba(102,187,106,.3)"; ctx.strokeStyle = over ? "#ff5252" : "#66bb6a";
        ctx.beginPath(); ctx.arc(CB.x, CB.y, CB.r, 0, 7); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = "#9aa3bd"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(CA.x, CA.y); ctx.lineTo(CB.x, CB.y); ctx.stroke(); ctx.setLineDash([]);
        if (over) arrow(ctx, CB.x, CB.y, CB.x + r.x, CB.y + r.y, "#ffeb3b");
        info = "distance " + Math.round(r.d) + " px vs radius sum " + (CA.r + CB.r) + " px: " + (over ? "overlap by " + Math.round(CA.r + CB.r - r.d) + " px" : "no overlap");
        ctx.fillStyle = "#e6e8ee"; ctx.fillText("Drag the green circle. Circles overlap when distance < r1 + r2.", 12, 10);
      } else {
        tAcc += dt; var stepped = 0;
        while (tAcc >= 1 / 60 && stepped < 5) { stepBullet(); tAcc -= 1 / 60; stepped++; }
        var wx = 430;
        ctx.fillStyle = flashT > 0 ? "#ffeb3b" : "#90a4ae"; ctx.fillRect(wx, 60, wall, 180);
        if (flashT > 0) flashT -= dt;
        trail.forEach(function (tx, i) { ctx.strokeStyle = "rgba(255,112,67," + (0.15 + i / trail.length * 0.6) + ")"; ctx.strokeRect(tx, bullet.y, bullet.s, bullet.s); });
        ctx.fillStyle = "#ff7043"; ctx.fillRect(bullet.x, bullet.y, bullet.s, bullet.s);
        ctx.fillStyle = "#e6e8ee";
        ctx.fillText("A fast bullet only exists at the outlined positions, one per frame.", 12, 10);
        ctx.fillText("If no frame lands inside the wall, a simple overlap test never sees a hit: tunneling.", 12, 28);
        info = "speed " + bulletSpeed + " px/frame, wall " + wall + " px, " + (swept ? "swept test ON" : "swept test OFF") + "   hits " + hits + "   tunneled through " + misses;
      }
      ctx.fillStyle = "#cfd6ea"; ctx.font = "12.5px Consolas, monospace"; ctx.textBaseline = "bottom"; ctx.fillText(info, 12, H - 10);
    }

    var resolveBox = checkbox("Resolve (push out)", false, function (v) { resolve = v; });
    var speedSl = slider("Bullet speed", 2, 60, 1, bulletSpeed, function (v) { bulletSpeed = v; hits = misses = 0; }, function (v) { return v + " px/frame"; });
    var wallSl = slider("Wall", 4, 40, 1, wall, function (v) { wall = v; hits = misses = 0; }, function (v) { return v + " px"; });
    var sweptBox = checkbox("Swept test (sub-steps)", false, function (v) { swept = v; hits = misses = 0; });
    function showCtl() {
      resolveBox.style.display = mode === "tunnel" ? "none" : "";
      speedSl.style.display = wallSl.style.display = sweptBox.style.display = mode === "tunnel" ? "" : "none";
    }
    S.head.appendChild(segmented([["aabb", "Boxes (AABB)"], ["circle", "Circles"], ["tunnel", "Tunneling"]], mode, function (v) { mode = v; showCtl(); }));
    S.controls.appendChild(resolveBox); S.controls.appendChild(speedSl); S.controls.appendChild(wallSl); S.controls.appendChild(sweptBox);
    showCtl();
    if (opts.note) note(S.root, opts.note);
    runLoop(canvas, function (dt) { draw(dt); });
    STATE[id] = { get: function () { return { mode: mode, hits: hits, misses: misses, info: info }; }, setMode: function (m) { mode = m; showCtl(); }, setSwept: function (v) { swept = v; sweptBox.input.checked = v; hits = misses = 0; } };
    return STATE[id];
  };

  /* =====================================================================
     4. Procedural sound effects (WebAudio). Parameters are plain JSON:
        exactly the kind of data a language model can write by itself.
     ===================================================================== */
  GD.sfxToy = function (container, opts) {
    opts = opts || {};
    var id = opts.id || ("sfx" + (++uid));
    var W = 640, H = 150;
    var S = shell(container, opts.title || "Procedural sound effects", W, H);
    var ctx = S.ctx;
    var PRESETS = {
      jump: { wave: "square", freqStart: 260, freqEnd: 720, duration: 0.18, volume: 0.22 },
      coin: { wave: "square", arpeggio: [988, 1319], step: 0.07, duration: 0.3, volume: 0.18 },
      laser: { wave: "sawtooth", freqStart: 1400, freqEnd: 180, duration: 0.22, volume: 0.16 },
      explosion: { noise: true, filterStart: 1800, filterEnd: 60, duration: 0.7, volume: 0.5 },
      hit: { noise: true, filterStart: 3000, filterEnd: 300, duration: 0.12, volume: 0.35 },
      powerup: { wave: "triangle", arpeggio: [523, 659, 784, 1047, 1319], step: 0.06, duration: 0.4, volume: 0.3 }
    };
    var current = null, ac = null, pre = null;
    function audio() {
      if (ac) return ac;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = new AC(); return ac;
    }
    function play(p) {
      var a = audio();
      if (!a) { pre.textContent = "This browser has no WebAudio support."; return; }
      if (a.state === "suspended") a.resume();
      var t = a.currentTime + 0.01, end = t + p.duration;
      var g = a.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(p.volume, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, end);
      g.connect(a.destination);
      if (p.noise) {
        var len = Math.ceil(a.sampleRate * p.duration), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
        for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        var src = a.createBufferSource(); src.buffer = buf;
        var f = a.createBiquadFilter(); f.type = "lowpass";
        f.frequency.setValueAtTime(p.filterStart, t); f.frequency.exponentialRampToValueAtTime(Math.max(20, p.filterEnd), end);
        src.connect(f); f.connect(g); src.start(t); src.stop(end + 0.02);
      } else {
        var o = a.createOscillator(); o.type = p.wave;
        if (p.arpeggio) p.arpeggio.forEach(function (fq, k) { o.frequency.setValueAtTime(fq, t + k * p.step); });
        else { o.frequency.setValueAtTime(p.freqStart, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, p.freqEnd), end); }
        o.connect(g); o.start(t); o.stop(end + 0.02);
      }
      draw(p);
    }
    function draw(p) {
      ctx.fillStyle = "#0d1020"; ctx.fillRect(0, 0, W, H);
      ctx.font = "12px 'Segoe UI', sans-serif"; ctx.fillStyle = "#9aa3bd"; ctx.textBaseline = "top"; ctx.textAlign = "left";
      if (!p) { ctx.fillText("Press a sound button. The curve shows pitch (or filter cutoff) over time; the shaded area is the volume envelope.", 12, 12); return; }
      var x0 = 40, x1 = W - 20, y0 = 20, y1 = H - 24, maxF = 3200;
      function fy(f) { return y1 - (Math.log(Math.max(20, f)) - Math.log(20)) / (Math.log(maxF) - Math.log(20)) * (y1 - y0); }
      ctx.fillStyle = "rgba(66,165,245,.18)"; ctx.beginPath(); ctx.moveTo(x0, y1);
      for (var i = 0; i <= 60; i++) { var u = i / 60, v = u < 0.03 ? u / 0.03 : Math.pow(0.0001 / 1, (u - 0.03) / 0.97); ctx.lineTo(x0 + u * (x1 - x0), y1 - Math.max(0, Math.min(1, v * 1.0)) * (y1 - y0) * 0.9); }
      ctx.lineTo(x1, y1); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#ffca28"; ctx.lineWidth = 2; ctx.beginPath();
      for (var k = 0; k <= 80; k++) {
        var uu = k / 80, tt = uu * p.duration, fq;
        if (p.noise) fq = p.filterStart * Math.pow(p.filterEnd / p.filterStart, uu);
        else if (p.arpeggio) fq = p.arpeggio[Math.min(p.arpeggio.length - 1, Math.floor(tt / p.step))];
        else fq = p.freqStart * Math.pow(p.freqEnd / p.freqStart, uu);
        var xx = x0 + uu * (x1 - x0), yy = fy(fq);
        if (k === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
      }
      ctx.stroke();
      ctx.fillStyle = "#9aa3bd"; ctx.fillText(p.noise ? "filter cutoff (log Hz)" : "pitch (log Hz)", 8, 4);
      ctx.textBaseline = "bottom"; ctx.fillText("0 s", x0, H - 4); ctx.textAlign = "right"; ctx.fillText(p.duration.toFixed(2) + " s", x1, H - 4);
    }
    function mutate(p) {
      var q = JSON.parse(JSON.stringify(p));
      function j(v, r) { return Math.round(v * (1 + (Math.random() * 2 - 1) * r)); }
      if (q.freqStart) { q.freqStart = j(q.freqStart, 0.35); q.freqEnd = j(q.freqEnd, 0.35); }
      if (q.filterStart) { q.filterStart = j(q.filterStart, 0.4); q.filterEnd = Math.max(30, j(q.filterEnd, 0.4)); }
      if (q.arpeggio) { var m = 1 + (Math.random() * 2 - 1) * 0.25; q.arpeggio = q.arpeggio.map(function (f) { return Math.round(f * m); }); }
      q.duration = Math.max(0.05, Math.round(q.duration * (1 + (Math.random() * 2 - 1) * 0.3) * 100) / 100);
      if (q.wave && Math.random() < 0.3) q.wave = ["square", "sawtooth", "triangle", "sine"][Math.floor(Math.random() * 4)];
      return q;
    }
    function show(name, p) { current = p; pre.textContent = "// " + name + "\n" + JSON.stringify(p, null, 1).replace(/\n\s*/g, " "); }
    Object.keys(PRESETS).forEach(function (name) {
      S.controls.appendChild(button(name.charAt(0).toUpperCase() + name.slice(1), function () { show(name, PRESETS[name]); play(PRESETS[name]); }));
    });
    S.controls.appendChild(button("Mutate last", function () { if (!current) return; var m = mutate(current); show("mutated", m); play(m); }));
    pre = el("pre", { style: "margin:0 12px 12px;font-size:12.5px" }); pre.textContent = "// press a button: the sound is generated from these numbers, no audio file";
    S.root.appendChild(pre);
    if (opts.note) note(S.root, opts.note);
    draw(null);
    STATE[id] = { get: function () { return { current: current, ctx: ac ? ac.state : "none" }; } };
    return STATE[id];
  };

  /* =====================================================================
     5. Mini 3D racer. Needs window.THREE (pinned Three.js r149 classic build
        loaded from a CDN by the page). Without it, shows an offline notice.
     ===================================================================== */
  GD.racing = function (container, opts) {
    opts = opts || {};
    var id = opts.id || ("racing" + (++uid));
    var W = 640, H = 360;
    var T = window.THREE;
    if (!T) {
      container.classList.add("demo");
      container.innerHTML = '<div class="demo-head"><span class="title">Mini 3D racer</span></div><div class="demo-stage"><div class="demo-offline">' +
        "The 3D demo could not load Three.js r149 from the jsDelivr CDN (you may be offline or the CDN is blocked).<br>" +
        "Everything else on this page works offline. Reconnect and reload to drive the car.</div></div>";
      STATE[id] = { get: function () { return { loaded: false }; } };
      return STATE[id];
    }
    container.classList.add("demo");
    container.innerHTML = "";
    var head = el("div", { "class": "demo-head" }, '<span class="title">' + (opts.title || "Mini 3D racer") + "</span>");
    var stage = el("div", { "class": "demo-stage" });
    var hud = el("div", { style: "position:absolute;left:10px;top:8px;color:#fff;font:600 13px/1.35 'Segoe UI',sans-serif;text-shadow:0 1px 2px #000;pointer-events:none;line-height:1.4" });
    var controls = el("div", { "class": "demo-controls" });
    container.appendChild(head); container.appendChild(stage); container.appendChild(controls);

    var renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true }); }
    catch (e) {
      stage.innerHTML = '<div class="demo-offline">WebGL is not available in this browser, so the 3D demo cannot run.</div>';
      STATE[id] = { get: function () { return { loaded: false, webgl: false }; } };
      return STATE[id];
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H, false);
    var canvas = renderer.domElement;
    canvas.setAttribute("tabindex", "0");
    canvas.setAttribute("aria-label", "3D racer (click to focus, then drive with the arrow keys or WASD)");
    stage.appendChild(canvas); stage.appendChild(hud);

    var scene = new T.Scene();
    scene.background = new T.Color(0x9fd3ff);
    scene.fog = new T.Fog(0x9fd3ff, 80, 260);
    var camera = new T.PerspectiveCamera(60, W / H, 0.1, 600);
    scene.add(new T.HemisphereLight(0xffffff, 0x557744, 0.9));
    var sun = new T.DirectionalLight(0xffffff, 0.8); sun.position.set(50, 120, 30); scene.add(sun);

    var ground = new T.Mesh(new T.PlaneGeometry(800, 800), new T.MeshLambertMaterial({ color: 0x5fae4e }));
    ground.rotation.x = -Math.PI / 2; scene.add(ground);

    // track: closed Catmull-Rom spline sampled into a ribbon mesh (all procedural, no asset files)
    var pts = [[0, 0], [60, -10], [115, 10], [135, 60], [100, 100], [50, 88], [20, 130], [-40, 122], [-75, 70], [-55, 20]]
      .map(function (q) { return new T.Vector3(q[0], 0, q[1]); });
    var curve = new T.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
    var N = 400, HALF = 7, samples = curve.getSpacedPoints(N);
    samples.pop();
    var normals = samples.map(function (pnt, i) {
      var nx = samples[(i + 1) % N], t = new T.Vector3().subVectors(nx, pnt).normalize();
      return new T.Vector3(t.z, 0, -t.x);
    });
    function ribbon(inner, outer, y, colorFn) {
      var pos = [], col = [], idx = [];
      for (var i = 0; i < N; i++) {
        var a = samples[i].clone().addScaledVector(normals[i], inner), b = samples[i].clone().addScaledVector(normals[i], outer);
        pos.push(a.x, y, a.z, b.x, y, b.z);
        var c = colorFn(i); col.push(c[0], c[1], c[2], c[0], c[1], c[2]);
        var j = (i + 1) % N;
        idx.push(i * 2, j * 2, i * 2 + 1, i * 2 + 1, j * 2, j * 2 + 1);
      }
      var g = new T.BufferGeometry();
      g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
      g.setAttribute("color", new T.Float32BufferAttribute(col, 3));
      g.setIndex(idx); g.computeVertexNormals();
      var m = new T.Mesh(g, new T.MeshLambertMaterial({ vertexColors: true, side: T.DoubleSide }));
      scene.add(m); return m;
    }
    ribbon(-HALF, HALF, 0.02, function (i) { return i < 2 ? [1, 1, 1] : [0.27, 0.28, 0.31]; });
    function kerb(i) { return Math.floor(i / 3) % 2 ? [0.85, 0.1, 0.1] : [0.95, 0.95, 0.95]; }
    ribbon(HALF, HALF + 1.2, 0.03, kerb); ribbon(-HALF - 1.2, -HALF, 0.03, kerb);

    // scenery: seeded random trees outside the track
    var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    var trunkM = new T.MeshLambertMaterial({ color: 0x7a5230 }), leafM = new T.MeshLambertMaterial({ color: 0x2e7d32 });
    for (var k = 0; k < 140; k++) {
      var tx = -150 + rnd() * 340, tz = -80 + rnd() * 270, near = false;
      for (var s = 0; s < N; s += 4) if (Math.abs(samples[s].x - tx) < HALF + 6 && Math.abs(samples[s].z - tz) < HALF + 6) { near = true; break; }
      if (near) continue;
      var tree = new T.Group();
      var trunk = new T.Mesh(new T.CylinderGeometry(0.4, 0.5, 2, 6), trunkM); trunk.position.y = 1; tree.add(trunk);
      var leaf = new T.Mesh(new T.ConeGeometry(2, 5, 7), leafM); leaf.position.y = 4.2; tree.add(leaf);
      tree.position.set(tx, 0, tz); scene.add(tree);
    }

    // car built from primitives
    var car = new T.Group();
    var body = new T.Mesh(new T.BoxGeometry(2, 0.7, 4), new T.MeshLambertMaterial({ color: 0xe53935 })); body.position.y = 0.75; car.add(body);
    var cabin = new T.Mesh(new T.BoxGeometry(1.6, 0.6, 1.8), new T.MeshLambertMaterial({ color: 0x263238 })); cabin.position.set(0, 1.35, -0.3); car.add(cabin);
    var wheels = [], wheelGeo = new T.CylinderGeometry(0.42, 0.42, 0.35, 12), wheelM = new T.MeshLambertMaterial({ color: 0x111111 });
    [[-1.05, 1.3], [1.05, 1.3], [-1.05, -1.3], [1.05, -1.3]].forEach(function (w, i) {
      var pivot = new T.Group(); pivot.position.set(w[0], 0.42, w[1]);
      var m = new T.Mesh(wheelGeo, wheelM); m.rotation.z = Math.PI / 2; pivot.add(m);
      car.add(pivot); wheels.push({ pivot: pivot, mesh: m, front: i < 2 });
    });
    scene.add(car);

    var keys = {}, smoothCam = true, grip = 6;
    var setKey = bindKeys(canvas, { ArrowUp: "up", KeyW: "up", ArrowDown: "down", KeyS: "down", ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right", KeyR: "restart" }, keys,
      function (k, d) { if (k === "restart" && d) reset(); });
    var focused = false;
    canvas.addEventListener("focus", function () { focused = true; });
    canvas.addEventListener("blur", function () { focused = false; });

    var st;
    function reset() {
      var p0 = samples[3], p1 = samples[4];
      st = { x: p0.x, z: p0.z, h: Math.atan2(p1.x - p0.x, p1.z - p0.z), vx: 0, vz: 0, steer: 0, idx: 3, lap: 0, half: false, lapT: 0, best: null, last: null, off: false, spin: 0 };
      camera.position.set(st.x - Math.sin(st.h) * 12, 6, st.z - Math.cos(st.h) * 12);
    }
    function nearest() {
      var best = st.idx, bd = 1e9;
      for (var o = -25; o <= 25; o++) {
        var i = (st.idx + o + N) % N, dx = samples[i].x - st.x, dz = samples[i].z - st.z, d = dx * dx + dz * dz;
        if (d < bd) { bd = d; best = i; }
      }
      if (bd > 900) for (var j = 0; j < N; j++) { var ex = samples[j].x - st.x, ez = samples[j].z - st.z, dd = ex * ex + ez * ez; if (dd < bd) { bd = dd; best = j; } }
      return { i: best, d: Math.sqrt(bd) };
    }
    function step(dt) {
      var fx = Math.sin(st.h), fz = Math.cos(st.h), rx = Math.cos(st.h), rz = -Math.sin(st.h);
      var vF = st.vx * fx + st.vz * fz, vR = st.vx * rx + st.vz * rz;
      var n = nearest(); st.off = n.d > HALF + 1.2;
      if (keys.up) vF += 16 * dt;
      if (keys.down) vF -= (vF > 0 ? 30 : 9) * dt;
      vF -= vF * (st.off ? 1.6 : 0.12) * dt;
      vF = Math.max(-8, Math.min(vF, st.off ? 14 : 40));
      var steerIn = (keys.left ? 1 : 0) - (keys.right ? 1 : 0);
      st.steer += (steerIn - st.steer) * Math.min(1, dt * 8);
      st.h += st.steer * 1.9 * (vF / (Math.abs(vF) + 6)) * dt;
      vR *= Math.exp(-grip * dt);
      fx = Math.sin(st.h); fz = Math.cos(st.h); rx = Math.cos(st.h); rz = -Math.sin(st.h);
      st.vx = fx * vF + rx * vR; st.vz = fz * vF + rz * vR;
      st.x += st.vx * dt; st.z += st.vz * dt;
      st.spin += vF * dt / 0.42;
      if (n.i > N * 0.45 && n.i < N * 0.55) st.half = true;
      if (st.idx > N * 0.9 && n.i < N * 0.1 && st.half) {
        st.lap++; st.half = false; st.last = st.lapT; if (st.best === null || st.lapT < st.best) st.best = st.lapT; st.lapT = 0;
      }
      st.idx = n.i; st.lapT += dt;
      st.vF = vF; st.vR = vR;
    }
    function render(dt) {
      car.position.set(st.x, 0, st.z); car.rotation.y = st.h;
      wheels.forEach(function (w) { w.mesh.rotation.x = st.spin; if (w.front) w.pivot.rotation.y = st.steer * 0.45; });
      var fx = Math.sin(st.h), fz = Math.cos(st.h);
      var want = new T.Vector3(st.x - fx * 11, 5, st.z - fz * 11);
      if (smoothCam) camera.position.lerp(want, 1 - Math.exp(-4 * dt)); else camera.position.copy(want);
      camera.lookAt(st.x + fx * 4, 1, st.z + fz * 4);
      renderer.render(scene, camera);
      var kmh = Math.round(Math.abs(st.vF || 0) * 3.6);
      hud.innerHTML = kmh + " km/h" + (st.off ? ' <span style="color:#ffcc80">off track</span>' : "") + "<br>Lap " + (st.lap + 1) + " · " + st.lapT.toFixed(1) + " s" +
        (st.best !== null ? "<br>Best " + st.best.toFixed(1) + " s" : "") + (Math.abs(st.vR || 0) > 3 ? '<br><span style="color:#80deea">sliding</span>' : "") +
        (focused ? "" : '<br><span style="color:#fff59d">Click the scene to drive: arrows or WASD, R resets</span>');
    }
    var acc = 0;
    runLoop(canvas, function (dt) {
      acc += dt; var n = 0;
      while (acc >= 1 / 120 && n < 30) { step(1 / 120); acc -= 1 / 120; n++; }
      render(dt);
    });
    controls.appendChild(checkbox("Smooth chase camera", true, function (v) { smoothCam = v; canvas.focus({ preventScroll: true }); }));
    controls.appendChild(slider("Tyre grip", 1, 14, 0.5, grip, function (v) { grip = v; }, function (v) { return v < 3 ? v + " (drifty)" : v > 10 ? v + " (on rails)" : String(v); }));
    controls.appendChild(button("Reset car", function () { reset(); canvas.focus({ preventScroll: true }); }));
    touchpad(container, [[["◀", "left", "Steer left"], ["▶", "right", "Steer right"]], [["▼", "down", "Brake"], ["▲", "up", "Accelerate"]]], setKey, canvas);
    if (opts.note) note(container, opts.note);
    reset();
    STATE[id] = {
      get: function () { return { loaded: true, x: st.x, z: st.z, speed: st.vF || 0, lap: st.lap, idx: st.idx, off: st.off }; },
      key: function (k, d) { setKey(k, !!d); }, reset: reset
    };
    return STATE[id];
  };
})();
