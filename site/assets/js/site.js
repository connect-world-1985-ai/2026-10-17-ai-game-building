/* AI Game Building — field guide. Shared behaviour.
   Classic script (no modules, no fetch) so every page works from file://.
   Adding a page = add one entry to PAGES. */
(function () {
  "use strict";

  var PAGES = [
    { group: "Start here" },
    { file: "index.html", num: "0", title: "The big picture" },
    { file: "watch.html", num: "W", title: "Spoken lesson (24 min)" },
    { group: "Where assets come from" },
    { file: "01-assets.html", num: "1", title: "Asset taxonomy & how agents get tools" },
    { file: "02-ai-images.html", num: "2", title: "AI images: sprites, tiles, textures" },
    { file: "03-ai-3d.html", num: "3", title: "AI 3D: meshes, rigging, animation" },
    { file: "04-audio.html", num: "4", title: "Audio: procedural, AI, free libraries" },
    { group: "Engines & platforms" },
    { file: "05-engines.html", num: "5", title: "Engines & libraries" },
    { file: "06-ai-platforms.html", num: "6", title: "AI builder platforms & world models" },
    { file: "explorer.html", num: "E", title: "Explorer: engines, libraries, assets" },
    { group: "How games work" },
    { file: "07-fundamentals.html", num: "7", title: "Game fundamentals (with toys)" },
    { group: "Worked examples" },
    { file: "08-platformer.html", num: "8", title: "Worked example: 2D platformer" },
    { file: "09-racing.html", num: "9", title: "Worked example: 3D car racing" },
    { group: "Agents in practice" },
    { file: "10-testing.html", num: "10", title: "How agents test & improve games" },
    { file: "11-one-prompt-truth.html", num: "11", title: "The truth behind one-prompt games" },
    { file: "12-publishing-legal.html", num: "12", title: "Publishing, licences, legal" },
    { group: "Your path" },
    { file: "13-decision.html", num: "13", title: "Decision framework & learning path" },
    { file: "14-hands-on.html", num: "14", title: "Hands-on starter projects" },
    { file: "15-next.html", num: "15", title: "Directions for our next discussion" },
    { group: "Reference" },
    { file: "glossary.html", num: "G", title: "Glossary" },
    { file: "sources.html", num: "S", title: "Sources & method" }
  ];
  window.SITE_PAGES = PAGES;

  var EV_TITLES = {
    v: "Verified fact — checked against a primary source (docs, repo, paper, official announcement).",
    p: "Evidence-supported practice — widely documented way practitioners work.",
    i: "Technical analysis / inference — the author's reasoning from the evidence, not a sourced fact.",
    u: "Unverified claim — reported or marketed, but not independently confirmed.",
    x: "Emerging / experimental — works in demos or research, not yet dependable in production."
  };

  function safeGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function currentFile() {
    var p = decodeURIComponent(location.pathname).replace(/\\/g, "/");
    var f = p.substring(p.lastIndexOf("/") + 1);
    return f || "index.html";
  }
  function slug(s) {
    return s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  }

  /* ---------- theme ---------- */
  var saved = safeGet("aig-theme");
  if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);

  function effectiveTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function buildChrome() {
    var cur = currentFile();
    var body = document.body;
    var main = document.querySelector("main");
    if (!main) return;

    // top bar
    var top = el("header", { "class": "topbar" });
    top.innerHTML =
      '<button class="icon-btn" id="menu-btn" aria-label="Open navigation">☰</button>' +
      '<a class="brand" href="index.html">AI Game Building <small>a field guide for engineers · Oct 2026</small></a>' +
      '<span class="spacer"></span>' +
      '<button class="icon-btn" id="ev-btn" title="Evidence label legend">Labels</button>' +
      '<button class="icon-btn" id="theme-btn" aria-label="Toggle dark mode"></button>';
    body.insertBefore(top, body.firstChild);

    // layout wrapper
    var layout = el("div", { "class": "layout" });
    var side = el("nav", { "class": "sidebar", "aria-label": "Pages" });
    var html = "";
    PAGES.forEach(function (p) {
      if (p.group) { html += '<div class="group">' + p.group + "</div>"; return; }
      html += '<a href="' + p.file + '"' + (p.file === cur ? ' class="active" aria-current="page"' : "") +
        '><span class="num">' + p.num + "</span><span>" + p.title + "</span></a>";
    });
    side.innerHTML = html;
    var toc = el("aside", { "class": "toc", "aria-label": "On this page" });
    main.parentNode.insertBefore(layout, main);
    layout.appendChild(side);
    layout.appendChild(main);
    layout.appendChild(toc);

    // pager
    var list = PAGES.filter(function (p) { return p.file; });
    var idx = -1;
    list.forEach(function (p, i) { if (p.file === cur) idx = i; });
    var content = main.querySelector(".content") || main;
    if (idx >= 0) {
      var pager = el("nav", { "class": "pager", "aria-label": "Previous and next page" });
      var ph = "";
      if (idx > 0) ph += '<a class="prev" href="' + list[idx - 1].file + '"><small>← Previous</small>' + list[idx - 1].title + "</a>";
      else ph += "<span></span>";
      if (idx < list.length - 1) ph += '<a class="next" href="' + list[idx + 1].file + '"><small>Next →</small>' + list[idx + 1].title + "</a>";
      pager.innerHTML = ph;
      content.appendChild(pager);
    }

    // headings → ids + TOC
    var heads = content.querySelectorAll("h2, h3");
    var used = {};
    var th = '<div class="label">On this page</div>';
    Array.prototype.forEach.call(heads, function (h) {
      if (h.closest && h.closest("details")) return;
      if (!h.id) {
        var base = slug(h.textContent) || "s"; var id = base; var n = 2;
        while (used[id] || document.getElementById(id)) { id = base + "-" + n++; }
        h.id = id;
      }
      used[h.id] = true;
      var a = el("a", { "class": "anchor", href: "#" + h.id, "aria-label": "Link to this section" }, "#");
      h.appendChild(a);
      var text = h.textContent.replace(/#$/, "");
      th += '<a class="' + h.tagName.toLowerCase() + '" href="#' + h.id + '">' + text + "</a>";
    });
    toc.innerHTML = heads.length ? th : "";

    // scrollspy
    if ("IntersectionObserver" in window && heads.length) {
      var links = toc.querySelectorAll("a");
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            Array.prototype.forEach.call(links, function (l) {
              l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id);
            });
          }
        });
      }, { rootMargin: "-60px 0px -70% 0px" });
      Array.prototype.forEach.call(heads, function (h) { obs.observe(h); });
    }

    // theme button
    var tb = document.getElementById("theme-btn");
    function paint() { tb.textContent = effectiveTheme() === "dark" ? "☀ Light" : "☾ Dark"; }
    paint();
    tb.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      safeSet("aig-theme", next);
      paint();
    });

    // mobile menu
    document.getElementById("menu-btn").addEventListener("click", function () { body.classList.toggle("nav-open"); });
    side.addEventListener("click", function (e) { if (e.target.closest("a")) body.classList.remove("nav-open"); });

    // evidence legend
    document.getElementById("ev-btn").addEventListener("click", function () {
      var ex = document.getElementById("ev-legend");
      if (ex) { ex.remove(); return; }
      var box = el("div", { id: "ev-legend", "class": "callout", style: "position:fixed;right:16px;top:64px;z-index:40;max-width:420px;box-shadow:0 6px 24px rgba(0,0,0,.18)" });
      box.innerHTML = '<span class="title">Evidence labels used on every page</span>' +
        '<p><span class="ev v">Verified</span> ' + EV_TITLES.v + '</p>' +
        '<p><span class="ev p">Practice</span> ' + EV_TITLES.p + '</p>' +
        '<p><span class="ev i">Inference</span> ' + EV_TITLES.i + '</p>' +
        '<p><span class="ev u">Unverified</span> ' + EV_TITLES.u + '</p>' +
        '<p><span class="ev x">Experimental</span> ' + EV_TITLES.x + '</p>' +
        '<p class="small muted">Click "Labels" again to close.</p>';
      body.appendChild(box);
    });
  }

  /* ---------- evidence badge tooltips ---------- */
  function decorateBadges() {
    Array.prototype.forEach.call(document.querySelectorAll(".ev"), function (b) {
      for (var k in EV_TITLES) if (b.classList.contains(k) && !b.title) b.title = EV_TITLES[k];
    });
  }

  /* ---------- sortable tables: <table data-sortable> ---------- */
  function initSortable(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll("table[data-sortable]"), function (t) {
      var ths = t.querySelectorAll("thead th");
      Array.prototype.forEach.call(ths, function (th, col) {
        th.setAttribute("data-sort", "");
        th.addEventListener("click", function () {
          var tbody = t.tBodies[0]; var rows = Array.prototype.slice.call(tbody.rows);
          var dir = th.getAttribute("data-dir") === "asc" ? "desc" : "asc";
          Array.prototype.forEach.call(ths, function (x) { x.removeAttribute("data-dir"); });
          th.setAttribute("data-dir", dir);
          rows.sort(function (a, b) {
            var x = (a.cells[col].getAttribute("data-v") || a.cells[col].textContent).trim();
            var y = (b.cells[col].getAttribute("data-v") || b.cells[col].textContent).trim();
            var nx = parseFloat(x.replace(/[^0-9.\-]/g, "")), ny = parseFloat(y.replace(/[^0-9.\-]/g, ""));
            var r = (!isNaN(nx) && !isNaN(ny) && /^[\d.,\-\s~k+]+$/i.test(x) && /^[\d.,\-\s~k+]+$/i.test(y)) ? nx - ny : x.localeCompare(y);
            return dir === "asc" ? r : -r;
          });
          rows.forEach(function (r) { tbody.appendChild(r); });
        });
      });
    });
  }
  window.SITE_initSortable = initSortable;

  /* ---------- quick filter: <input data-filter-for="tableId"> ---------- */
  function initFilters() {
    Array.prototype.forEach.call(document.querySelectorAll("input[data-filter-for]"), function (inp) {
      var t = document.getElementById(inp.getAttribute("data-filter-for"));
      if (!t) return;
      inp.addEventListener("input", function () {
        var q = inp.value.toLowerCase();
        Array.prototype.forEach.call(t.tBodies[0].rows, function (r) {
          r.style.display = r.textContent.toLowerCase().indexOf(q) >= 0 ? "" : "none";
        });
      });
    });
  }

  /* ---------- tabs: <div data-tabs> with .tabs buttons[data-tab] and .tab-panel[data-panel] ---------- */
  function initTabs() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-tabs]"), function (box) {
      var btns = box.querySelectorAll(".tabs button");
      var panels = box.querySelectorAll(".tab-panel");
      function show(name) {
        Array.prototype.forEach.call(btns, function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === name ? "true" : "false"); });
        Array.prototype.forEach.call(panels, function (p) { p.hidden = p.getAttribute("data-panel") !== name; });
      }
      Array.prototype.forEach.call(btns, function (b) {
        b.setAttribute("role", "tab");
        b.addEventListener("click", function () { show(b.getAttribute("data-tab")); });
      });
      if (btns.length) show(btns[0].getAttribute("data-tab"));
    });
  }

  /* ---------- expand/collapse all: <button data-toggle-all="containerId"> ---------- */
  function initToggleAll() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-toggle-all]"), function (b) {
      b.addEventListener("click", function () {
        var c = document.getElementById(b.getAttribute("data-toggle-all"));
        if (!c) return;
        var ds = c.querySelectorAll("details");
        var anyClosed = Array.prototype.some.call(ds, function (d) { return !d.open; });
        Array.prototype.forEach.call(ds, function (d) { d.open = anyClosed; });
        b.textContent = anyClosed ? "Collapse all" : "Expand all";
      });
    });
  }

  /* ---------- copy buttons: <div class="prompt-box"><pre>...</pre></div> ---------- */
  function initCopy() {
    Array.prototype.forEach.call(document.querySelectorAll(".prompt-box"), function (box) {
      var pre = box.querySelector("pre");
      if (!pre || box.querySelector(".copy")) return;
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "copy"; btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy prompt to clipboard");
      function done(ok) {
        btn.textContent = ok ? "Copied" : "Select + Ctrl+C";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      }
      function fallback(text) {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      }
      btn.addEventListener("click", function () {
        var text = pre.innerText;
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallback(text); });
        } else fallback(text);
      });
      box.appendChild(btn);
    });
  }

  function clock(t) {
    if (!isFinite(t) || t < 0) t = 0;
    t = Math.floor(t);
    var m = Math.floor(t / 60);
    var s = t % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  /* Controls sit under the picture so burned-in captions stay readable. */
  function initPlayers() {
    Array.prototype.forEach.call(document.querySelectorAll("video.lesson-video"), function (video) {
      if (video.closest(".player")) return;
      var box = document.createElement("div");
      box.className = "player";
      video.parentNode.insertBefore(box, video);
      box.appendChild(video);
      video.controls = false;
      video.setAttribute("controlslist", "nodownload");
      var bar = document.createElement("div");
      bar.className = "player-bar";
      bar.innerHTML =
        '<button type="button" class="play">Play</button>' +
        '<input type="range" min="0" max="0" step="0.1" value="0" aria-label="Position in the lesson">' +
        '<span class="clock">0:00 / 23:50</span>' +
        '<button type="button" class="full">Full screen</button>';
      box.appendChild(bar);
      var play = bar.querySelector(".play");
      var scrub = bar.querySelector("input");
      var label = bar.querySelector(".clock");
      var full = bar.querySelector(".full");
      var sliding = false;
      function paint() {
        var d = video.duration;
        if (isFinite(d) && Number(scrub.max) !== d) scrub.max = String(d);
        if (!sliding) scrub.value = String(video.currentTime || 0);
        label.textContent = clock(video.currentTime) + " / " + (isFinite(d) ? clock(d) : "23:50");
        play.textContent = video.paused ? "Play" : "Pause";
      }
      play.addEventListener("click", function () {
        if (video.paused) {
          var p = video.play();
          if (p && p.catch) p.catch(function () {});
        } else video.pause();
      });
      scrub.addEventListener("pointerdown", function () { sliding = true; });
      scrub.addEventListener("pointerup", function () { sliding = false; paint(); });
      scrub.addEventListener("input", function () {
        video.currentTime = Number(scrub.value) || 0;
        paint();
      });
      full.addEventListener("click", function () {
        var el = document.fullscreenElement ? null : box;
        var req = el ? (box.requestFullscreen || box.webkitRequestFullscreen) : (document.exitFullscreen || document.webkitExitFullscreen);
        if (req) req.call(el || document);
      });
      video.addEventListener("play", paint);
      video.addEventListener("pause", paint);
      video.addEventListener("timeupdate", paint);
      video.addEventListener("loadedmetadata", paint);
      video.addEventListener("durationchange", paint);
      paint();
    });
  }

  function init() {
    buildChrome();
    decorateBadges();
    initSortable();
    initFilters();
    initTabs();
    initToggleAll();
    initCopy();
    initPlayers();
    if (typeof window.PAGE_INIT === "function") window.PAGE_INIT();
    decorateBadges();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
