/* Unifi Digital Acquisition Team — page behaviour
   ------------------------------------------------
   You normally don't need to edit this file: the words and photos live in content.js.
   This file:
     1. builds the team, quotes, impact tiles, achievements, polaroids and scrapbook from content.js
     2. adds the interactions from the Figma prototype (profile popups, carousel, cycling polaroids,
        scrapbook, smile badge, mobile menu) and the scroll-in animations.
   Layout details from the design (card tilts, collage positions, polaroid spots) are kept here,
   so editors only deal with text and pictures. */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad2 = (n) => String(n).padStart(2, "0");

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ==================================================================
     1. CONTENT — read content.js and report problems in plain English
     ================================================================== */
  const problems = [...(window.__contentErrors || [])];
  const content = window.SITE_CONTENT;
  if (!content) {
    problems.unshift("content.js couldn't be read, so the team, quotes, achievements and scrapbook are missing. " +
      "This is almost always a missing comma, quote mark or bracket. Press F12 and open the Console tab to see the line number.");
  }

  let alertBox = null;
  function showProblems() {
    if (!problems.length) return;
    if (!alertBox) {
      alertBox = el("div", "content-alert");
      alertBox.setAttribute("role", "alert");
      const close = el("button", "content-alert__close", "×");
      close.type = "button";
      close.setAttribute("aria-label", "Dismiss");
      close.addEventListener("click", () => alertBox.remove());
      alertBox.append(el("strong", null, "Something in content.js needs fixing:"), el("ul"), close);
      document.body.prepend(alertBox);
    }
    $("ul", alertBox).replaceChildren(...[...new Set(problems)].map((p) => el("li", null, p)));
  }
  function report(message) {
    problems.push(message);
    console.warn("[content.js]", message);
    showProblems();
  }

  const list = (value, name) => {
    if (value == null) return [];
    if (!Array.isArray(value)) {
      report(`"${name}" should be a list in square brackets [ ... ].`);
      return [];
    }
    if (value.some((v) => v == null)) report(`"${name}" has an empty entry, usually a doubled comma ", ,". It was skipped.`);
    return value.filter((v) => v != null);
  };
  const text = (value) => (value == null ? "" : String(value));
  function need(item, fields, label) {
    const missing = fields.filter((f) => f.split(".").reduce((o, k) => (o == null ? o : o[k]), item) == null);
    if (missing.length) report(`${label} is missing: ${missing.join(", ")}.`);
    return missing.length === 0;
  }
  function choice(value, allowed, fallback, label) {
    if (value == null) return fallback;
    if (allowed.includes(value)) return value;
    report(`${label}: "${value}" isn't a colour option. Use one of: ${allowed.join(", ")}.`);
    return fallback;
  }
  function picture(src, alt, cls) {
    const img = el("img", cls);
    img.alt = alt || "";
    img.loading = "lazy";
    if (!src) return img; // already reported as a missing field
    img.addEventListener("error", () => report(`Picture not found: "${src}". Check the file name and folder (capital letters matter).`), { once: true });
    img.src = src;
    return img;
  }

  const data = {
    impact: list(content && content.impact, "impact"),
    team: list(content && content.team, "team"),
    quotes: list(content && content.quotes, "quotes"),
    achievements: list(content && content.achievements, "achievements"),
    polaroids: list(content && content.polaroids, "polaroids"),
    scrapbook: list(content && content.scrapbook, "scrapbook")
  };

  /* ==================================================================
     2. LAYOUT PRESETS — taken from the Figma design
     ================================================================== */
  // Team cards: vertical offset, photo tilt, hover lift, pill width (+ nudge) for each position.
  const TEAM_SLOTS = [
    { offset: 11, tilt: 1.8, lift: -5, pill: 140 },
    { offset: 27, tilt: -1.7, lift: -11, pill: 156.4 },
    { offset: 11, tilt: 1.5, lift: -6, pill: 143.6 },
    { offset: 27, tilt: -1.5, lift: -10, pill: 125, pillX: -4 },
    { offset: 17, tilt: 1.5, lift: -6, pill: 156.4 },
    { offset: 27, tilt: -1.6, lift: -10, pill: 143.6, pillX: 9 },
    { offset: 9, tilt: 1.2, lift: -6, pill: 162 }
  ];

  // Quote collage (1440px wide): card box, ribbon, accent line, portrait and text size for 7 positions.
  const QUOTE_SLOTS = [
    { x: 75, y: 69, w: 500, h: 198, rot: 1.6, rx: -2.39, ry: 24.95, rw: 500, rh: 164, lx: 19.88, ly: 189.03, lw: 360, px: 437, ps: 126, qw: 385, size: "" },
    { x: 620, y: 83, w: 740, h: 222, rot: -1.3, rx: 33.68, ry: 9.26, rw: 704.57, rh: 161.75, lx: 68.98, ly: 173.04, lw: 532.8, px: 674, ps: 132, qw: 590, size: "" },
    { x: 4, y: 319, w: 467, h: 196, rot: -1.2, rx: 28.8, ry: 12.78, rw: 442.84, rh: 162, lx: 98, ly: 176.45, lw: 338.4, px: 411, ps: 118, qw: 320, size: "lg" },
    { x: 553, y: 316, w: 330, h: 184, rot: 1.5, rx: -2.02, ry: 22.29, rw: 330, rh: 150, lx: 19.91, ly: 173.1, lw: 237.6, px: 276, ps: 108, qw: 180, size: "md" },
    { x: 947, y: 287, w: 425, h: 220, rot: -1.4, rx: 1.95, ry: 12.79, rw: 425, rh: 165, lx: 20, ly: 178.26, lw: 306, px: 367, ps: 116, qw: 295.8, size: "" },
    { x: 66, y: 531, w: 530, h: 208, rot: 1.2, rx: -1.88, ry: 23.53, rw: 530, rh: 174, lx: 19.92, ly: 198, lw: 381.6, px: 469, ps: 122, qw: 380, size: "lg" },
    { x: 685, y: 526, w: 626, h: 212, rot: -1, rx: 8.3, ry: 12.17, rw: 653.2, rh: 178, lx: 20, ly: 193.85, lw: 475.2, px: 599, ps: 122, qw: 510, size: "sm" }
  ];

  // Behind-the-scenes polaroids: where each of the 6 sits in the 968 × 611 group, and its tilt.
  const POLAROID_SLOTS = [
    { x: 0, y: 40.7, bw: 318.8, bh: 300.245, rot: 4 },
    { x: 319.53, y: 0, bw: 314.243, bh: 295.317, rot: -3 },
    { x: 599.76, y: 35.7, bw: 309.589, bh: 290.299, rot: 2 },
    { x: 59.53, y: 280.23, bw: 309.589, bh: 290.299, rot: -2 },
    { x: 344.88, y: 315.7, bw: 314.243, bh: 295.317, rot: 3 },
    { x: 649.53, y: 274.77, bw: 318.801, bh: 300.245, rot: -4 }
  ];

  // Scrapbook polaroid spots on the 1200 × 639 book spread, and which spots are used for 1–5 photos.
  const SNAP_SLOTS = {
    p1: { bx: 41.63, by: 206, bw: 477.739, bh: 374.593, w: 460, h: 351, pw: 440, ph: 293, rot: 3 },
    p2: { bx: 640, by: 27.77, bw: 305.896, bh: 257.65, w: 290, h: 238, pw: 270, ph: 180, rot: -4 },
    p3: { bx: 893.96, by: 90, bw: 260.7, bh: 223.795, w: 250, h: 211, pw: 230, ph: 153, rot: 3 },
    p4: { bx: 641.45, by: 326, bw: 308.368, bh: 255.321, w: 300, h: 245, pw: 280, ph: 187, rot: 2 },
    p5: { bx: 930, by: 337.95, bw: 246.382, bh: 217.292, w: 230, h: 198, pw: 210, ph: 140, rot: -5 },
    p2L: { bx: 640, by: 41.21, bw: 354.552, bh: 304.361, w: 340, h: 286.96, pw: 312.8, ph: 208.08, rot: -3, k: 1.36 },
    p3L: { bx: 837.9, by: 288, bw: 343.652, bh: 286.402, w: 330, h: 269.5, pw: 308, ph: 205.7, rot: 3, k: 1.1 }
  };
  const SNAP_LAYOUTS = {
    1: ["p1"],
    2: ["p1", "p2L"],
    3: ["p1", "p2L", "p3L"],
    4: ["p1", "p2", "p3", "p4"],
    5: ["p1", "p2", "p3", "p4", "p5"]
  };

  const setVars = (node, vars) => Object.entries(vars).forEach(([k, v]) => node.style.setProperty(`--${k}`, v));

  /* ==================================================================
     3. BUILD THE PAGE FROM CONTENT
     ================================================================== */
  function renderImpact(container) {
    container.replaceChildren(...data.impact.map((item, i) => {
      const label = `Impact tile ${i + 1}`;
      need(item, ["value", "title"], label);
      const colour = choice(item.colour, ["cream", "orange", "blue", "indigo"], "cream", `${label} colour`);
      const li = el("li", `stat stat--${colour}`);
      li.setAttribute("data-reveal", "");
      // Longer values (e.g. "2% → 8%") use the design's smaller 30px size.
      const value = el("p", `stat__value${text(item.value).length > 6 ? " stat__value--sm" : ""}`, text(item.value));
      value.setAttribute("data-count", "");
      if (item.countFrom != null) value.dataset.countFrom = item.countFrom;
      const body = el("div", "stat__body");
      body.append(el("h3", "stat__title", text(item.title)), el("p", "stat__desc", text(item.text)));
      li.append(value, body);
      return li;
    }));
  }

  function renderPersonas(container) {
    const names = data.team.map((m) => text(m.persona).toUpperCase()).filter(Boolean);
    if (!names.length) return container.replaceChildren();
    // Three lines of three names each, wrapping round the list (as in the design).
    container.replaceChildren(...[0, 1, 2].map((line) =>
      el("p", null, [0, 1, 2].map((k) => names[(line * 3 + k) % names.length]).join(" · "))));
  }

  function renderTeam(container) {
    container.classList.toggle("team__grid--wrap", data.team.length !== TEAM_SLOTS.length);
    container.replaceChildren(...data.team.map((m, i) => {
      const label = `Team member ${i + 1}${m.name ? ` (${m.name})` : ""}`;
      need(m, ["name", "persona", "photos.card", "profile.fullName"], label);
      const slot = TEAM_SLOTS[i % TEAM_SLOTS.length];
      const li = el("li");
      li.setAttribute("data-reveal", "");
      li.style.setProperty("--offset", `${slot.offset}px`);

      const card = el("button", "member");
      card.type = "button";
      card.dataset.profile = i;
      card.setAttribute("aria-haspopup", "dialog");
      card.setAttribute("aria-label", `${text(m.name)}, ${text(m.persona)}. Open profile`);
      setVars(card, { tilt: `${slot.tilt}deg`, lift: `${slot.lift}px` });

      const photo = el("span", "member__photo");
      photo.append(picture(m.photos && m.photos.card, "", null));

      const info = el("span", "member__info");
      const personaColour = choice(m.personaColour, ["orange", "navy", "blue"], "orange", `${label} personaColour`);
      const focusColour = choice(m.focusColour, ["orange", "blue"], "orange", `${label} focusColour`);
      const pill = el("span", `persona persona--${personaColour}`, text(m.persona));
      setVars(pill, { "pill-w": `${slot.pill}px`, "pill-x": `${slot.pillX || 0}px` });
      info.append(
        pill,
        el("span", "member__name", text(m.name)),
        el("span", `member__focus member__focus--${focusColour}`, text(m.focus)),
        el("span", "member__desc", text(m.summary))
      );
      card.append(photo, info);
      li.append(card);
      return li;
    }));
  }

  function renderQuotes(container) {
    container.replaceChildren(...data.quotes.map((q, i) => {
      const label = `Quote ${i + 1}${q.name ? ` (${q.name})` : ""}`;
      need(q, ["name", "text", "photo"], label);
      const slot = QUOTE_SLOTS[i % QUOTE_SLOTS.length];
      const colour = choice(q.colour, ["navy", "orange", "blue"], "navy", `${label} colour`);
      const accent = choice(q.accent, ["orange", "navy"], colour === "orange" ? "navy" : "orange", `${label} accent`);

      const fig = el("figure", `voice voice--${colour} voice--accent-${accent}`);
      fig.setAttribute("data-reveal", "");
      setVars(fig, {
        x: slot.x, y: slot.y, w: slot.w, h: slot.h, rot: `${slot.rot}deg`,
        rx: slot.rx, ry: slot.ry, rw: slot.rw, rh: slot.rh, lx: slot.lx, ly: slot.ly, lw: slot.lw,
        px: slot.px, ps: slot.ps, qw: slot.qw
      });
      const ribbon = el("div", "voice__ribbon");
      ribbon.append(
        el("figcaption", "voice__name", text(q.name)),
        el("blockquote", `voice__quote${slot.size ? ` voice__quote--${slot.size}` : ""}`, text(q.text))
      );
      if (q.attribution) ribbon.append(el("p", "voice__cite", text(q.attribution)));
      // A ready-made round quote photo (quote.png) already has its ring; any other photo gets one from CSS.
      const ready = /quote\.png$/i.test(text(q.photo));
      fig.append(ribbon, el("span", "voice__line"), picture(q.photo, text(q.name), `voice__portrait${ready ? "" : " voice__portrait--ring"}`));
      return fig;
    }));
  }

  function renderAchievements(container) {
    container.replaceChildren(...data.achievements.map((a, i) => {
      need(a, ["title", "image"], `Achievement ${i + 1}${a.title ? ` (${a.title})` : ""}`);
      const li = el("li", "hit");
      li.setAttribute("data-reveal", "");
      const card = el("article", "hit__card");
      const media = el("div", "hit__media");
      media.append(picture(a.image, "", null));
      card.append(media, el("h3", "hit__title", text(a.title)));
      if (a.tag) card.append(el("span", "hit__pill", text(a.tag)));
      card.append(el("p", "hit__desc", text(a.text)), el("p", "hit__result", text(a.result)));
      li.append(card);
      return li;
    }));
  }

  function renderPolaroids(container) {
    if (data.polaroids.length > POLAROID_SLOTS.length) {
      report(`There are ${data.polaroids.length} polaroids but only room for ${POLAROID_SLOTS.length}; the extra ones aren't shown.`);
    }
    const frames = data.polaroids.slice(0, POLAROID_SLOTS.length).map((p, i) => {
      const photos = list(p.photos, `polaroid ${i + 1} photos`).map(text).filter(Boolean);
      if (!photos.length) report(`Polaroid ${i + 1} has no photos.`);
      const slot = POLAROID_SLOTS[i];
      const fig = el("figure", "polaroid");
      fig.setAttribute("data-reveal", "drop");
      setVars(fig, { x: slot.x, y: slot.y, bw: slot.bw, bh: slot.bh, rot: `${slot.rot}deg` });
      if (photos[0]) fig.append(picture(photos[0], "Team moment", null));
      return { fig, photos, interval: (Number(p.seconds) || 3) * 1000 };
    });
    container.replaceChildren(...frames.map((f) => f.fig));
    return frames;
  }

  const render = (selector, fn) => {
    const container = $(selector);
    if (!container) return undefined;
    try {
      return fn(container);
    } catch (err) {
      report(`The ${selector.replace(/\[data-render="(.+)"\]/, "$1")} section couldn't be built: ${err.message}. Check that part of content.js.`);
      console.error(err);
      return undefined;
    }
  };
  render('[data-render="impact"]', renderImpact);
  render('[data-render="personas"]', renderPersonas);
  render('[data-render="team"]', renderTeam);
  render('[data-render="quotes"]', renderQuotes);
  render('[data-render="achievements"]', renderAchievements);
  const polaroidFrames = render('[data-render="polaroids"]', renderPolaroids) || [];
  showProblems();

  /* ==================================================================
     4. LAYOUT HELPERS
     ================================================================== */
  function setScrollbarWidth() {
    root.style.setProperty("--sbw", (window.innerWidth - root.clientWidth) + "px");
  }

  // Elements with [data-fit="<design width>"] are zoomed down to fit their parent.
  function fitAll() {
    $$("[data-fit]").forEach((node) => {
      if (getComputedStyle(node).getPropertyValue("--fit").trim() === "off") {
        node.style.zoom = "";
        return;
      }
      const parent = node.parentElement;
      const cs = getComputedStyle(parent);
      const avail = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const z = Math.min(1, avail / Number(node.dataset.fit));
      node.style.zoom = z < 0.999 ? z.toFixed(4) : "";
    });
  }

  // Shrink text a pixel at a time until it fits (keeps edited quotes and numbers inside their boxes).
  function shrinkToFit(node, fits, min = 14) {
    node.style.fontSize = "";
    node.style.lineHeight = "";
    let size = parseFloat(getComputedStyle(node).fontSize);
    const ratio = parseFloat(getComputedStyle(node).lineHeight) / size || 1.15;
    while (!fits() && size > min) {
      size -= 1;
      node.style.fontSize = `${size}px`;
      node.style.lineHeight = `${Math.round(size * ratio)}px`;
    }
  }

  // Quotes: the scattered collage needs exactly 7 quotes and a wide screen; otherwise show a list.
  const quoteCollage = $('[data-render="quotes"]');
  const narrowScreen = window.matchMedia("(max-width: 899px)");
  function layoutQuotes() {
    if (!quoteCollage) return;
    const isList = data.quotes.length !== QUOTE_SLOTS.length || narrowScreen.matches;
    quoteCollage.classList.toggle("is-list", isList);
    $$(".voice", quoteCollage).forEach((fig) => {
      const quote = $(".voice__quote", fig);
      if (isList) { quote.style.fontSize = ""; quote.style.lineHeight = ""; return; }
      const ribbon = $(".voice__ribbon", fig);
      const cite = $(".voice__cite", fig);
      shrinkToFit(quote, () => quote.offsetTop + quote.offsetHeight <= (cite ? cite.offsetTop - 4 : ribbon.clientHeight - 6));
    });
  }

  function fitStatValues() {
    $$(".stat__value").forEach((v) => shrinkToFit(v, () => v.scrollWidth <= v.clientWidth + 1, 18));
  }

  let resizeTimer = 0;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setScrollbarWidth();
      layoutQuotes();
      fitAll();
      fitStatValues();
      carousel && carousel.update();
      scaleBook();
    }, 60);
  }

  /* ==================================================================
     5. NAV (mobile menu)
     ================================================================== */
  const navToggle = $(".nav__toggle");
  const navMenu = $("#nav-menu");
  if (navToggle && navMenu) {
    const setOpen = (open) => {
      navToggle.setAttribute("aria-expanded", String(open));
      navMenu.classList.toggle("is-open", open);
    };
    navToggle.addEventListener("click", () => setOpen(navToggle.getAttribute("aria-expanded") !== "true"));
    navMenu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  /* ==================================================================
     6. MODALS (focus handling + scroll lock)
     ================================================================== */
  let lastFocus = null;
  let openModalEl = null;

  function openModal(modal, focusEl) {
    lastFocus = document.activeElement;
    openModalEl = modal;
    modal.hidden = false;
    document.body.classList.add("is-locked");
    void modal.offsetWidth; // commit the hidden → visible change so the fade-in transition runs
    modal.classList.add("is-open");
    (focusEl || modal).focus({ preventScroll: true });
  }

  function closeModal(modal) {
    if (!modal || modal.hidden) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    openModalEl = null;
    const done = () => { modal.hidden = true; };
    if (reduceMotion) done(); else setTimeout(done, 300);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function trapFocus(e, modal) {
    if (e.key !== "Tab") return;
    const items = $$('button:not([disabled]):not([hidden]), a[href], [tabindex]:not([tabindex="-1"])', modal)
      .filter((node) => node.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  document.addEventListener("keydown", (e) => {
    if (!openModalEl) return;
    if (e.key === "Escape") closeModal(openModalEl);
    else trapFocus(e, openModalEl);
  });

  $$(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeModal(modal);
    });
  });

  /* ==================================================================
     7. PROFILE POPUP
     ================================================================== */
  const profileModal = $("#profile-modal");

  function renderProfile(index) {
    const m = data.team[index];
    const p = m.profile || {};
    const card = $(".profile", profileModal);

    const photo = $(".profile__photo", card);
    photo.src = (m.photos && (m.photos.profile || m.photos.card)) || "";
    photo.alt = text(p.fullName || m.name);

    $(".profile__watermark", card).textContent = pad2(index + 1);
    $(".profile__edu-title", card).textContent = text(p.educationTitle || "EDUCATION");
    $(".profile__edu", card).textContent = text(p.education);
    $(".profile__name", card).textContent = text(p.fullName || m.name);
    $(".profile__role", card).textContent = text(p.role);
    $('[data-field="overviewLabel"]', card).textContent = text(p.overviewTitle || "PROFILE OVERVIEW");
    $('[data-field="detailsLabel"]', card).textContent = text(p.detailsTitle || "HIGHLIGHTS");
    $(".profile__paras", card).replaceChildren(...list(p.overview, "overview").map((t) => el("p", null, text(t))));

    const highlight = p.highlight || {};
    $(".profile__feature", card).hidden = !(highlight.title || highlight.text);
    $(".profile__feature-label", card).textContent = text(highlight.label);
    $(".profile__feature-name", card).textContent = text(highlight.title);
    $(".profile__feature-summary", card).textContent = text(highlight.text);

    $(".profile__details", card).replaceChildren(...list(p.details, "details").map((d, i) => {
      const li = el("li", "detail");
      li.append(
        el("span", "detail__num", pad2(i + 1)),
        el("span", "detail__title", text(d.title)),
        el("span", "detail__desc", text(d.text))
      );
      return li;
    }));
  }

  $$(".member[data-profile]").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderProfile(Number(btn.dataset.profile));
      openModal(profileModal, $(".close-btn", profileModal));
      profileModal.scrollTop = 0;
    });
  });

  /* ==================================================================
     8. ACHIEVEMENTS CAROUSEL
     ================================================================== */
  const carousel = (function () {
    const rootEl = $("[data-carousel]");
    if (!rootEl) return null;
    const viewport = $(".hits__viewport", rootEl);
    const track = $(".hits__track", rootEl);
    const items = $$(".hit", track);
    const prev = $("[data-prev]", rootEl);
    const next = $("[data-next]", rootEl);
    let index = 0;

    function metrics() {
      if (!items.length) return { step: 0, max: 0 };
      const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      const step = items[0].getBoundingClientRect().width + gap;
      const visible = Math.max(1, Math.floor((viewport.clientWidth + gap + 1) / step));
      return { step, max: Math.max(0, items.length - visible) };
    }

    function update() {
      const { step, max } = metrics();
      index = Math.max(0, Math.min(index, max));
      track.style.transform = `translateX(${-index * step}px)`;
      prev.disabled = index === 0;
      next.disabled = index === max;
      items.forEach((item, i) => {
        const inView = i >= index && i < index + (items.length - max);
        item.setAttribute("aria-hidden", String(!inView));
      });
    }

    const go = (delta) => { index += delta; update(); };
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    });

    // Swipe / drag
    let startX = null;
    viewport.addEventListener("pointerdown", (e) => { startX = e.clientX; });
    viewport.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    });
    viewport.addEventListener("pointercancel", () => { startX = null; });

    update();
    return { update };
  })();

  /* ==================================================================
     9. CYCLING POLAROIDS (Behind the scenes)
     ================================================================== */
  function setupPolaroid({ fig, photos, interval }) {
    const imgs = [fig.querySelector("img")];
    let current = 0;
    let timer = 0;

    function getImg(i) {
      if (!imgs[i]) {
        const img = picture(photos[i], "Team moment", null);
        img.loading = "eager";
        img.style.opacity = "0";
        fig.appendChild(img);
        imgs[i] = img;
      }
      return imgs[i];
    }

    function tick() {
      const nextIndex = (current + 1) % photos.length;
      const incoming = getImg(nextIndex);
      const outgoing = imgs[current];
      const show = () => {
        fig.appendChild(incoming); // keep the incoming photo on top
        void incoming.offsetWidth;
        incoming.style.opacity = "1";
        setTimeout(() => { if (outgoing !== incoming) outgoing.style.opacity = "0"; }, 500);
        current = nextIndex;
      };
      if (incoming.complete && incoming.naturalWidth) show();
      else incoming.decode().then(show, show);
    }

    return {
      start() { if (!timer && photos.length > 1) timer = setInterval(tick, interval); },
      stop() { clearInterval(timer); timer = 0; }
    };
  }

  const polaroidCycles = polaroidFrames.map(setupPolaroid);
  const polaroidGroup = $(".polaroids");
  if (polaroidGroup && polaroidCycles.length) {
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => polaroidCycles.forEach((c) => (entry.isIntersecting ? c.start() : c.stop())));
      }, { threshold: 0.15 }).observe(polaroidGroup);
    } else {
      polaroidCycles.forEach((c) => c.start());
    }
  }

  /* ==================================================================
     10. SCRAPBOOK ("View our moments")
     ================================================================== */
  const scrapModal = $("#scrapbook-modal");
  const book = $(".book", scrapModal);
  const bookContent = $(".book__content", book);
  const bookPrev = $("[data-book-prev]", book);
  const bookNext = $("[data-book-next]", book);
  const chapters = data.scrapbook.map((c, i) => {
    const label = `Scrapbook chapter ${i + 1}${c.title ? ` (${c.title})` : ""}`;
    need(c, ["title"], label);
    let photos = list(c.photos, `${label} photos`);
    if (photos.length > 5) {
      report(`${label} has ${photos.length} photos; a page holds up to 5, so only the first 5 are shown. Start a new chapter for the rest.`);
      photos = photos.slice(0, 5);
    }
    if (!photos.length) report(`${label} has no photos.`);
    return { title: text(c.title), subtitle: text(c.subtitle), photos };
  });
  let chapterIndex = 0;

  function scaleBook() {
    if (!scrapModal || scrapModal.hidden) return;
    const s = Math.min(1, (window.innerWidth - 48) / 1236, (window.innerHeight - 48) / 663);
    scrapModal.style.setProperty("--book-scale", Math.max(0.3, s).toFixed(4));
  }

  function renderChapter(i, dir) {
    const c = chapters[i];
    const chapter = el("div", "chapter");
    chapter.style.setProperty("--dir", dir < 0 ? "-24px" : "24px");
    chapter.append(
      el("p", "chapter__label", `CHAPTER ${pad2(i + 1)}`),
      el("h3", "chapter__name", c.title),
      el("p", "chapter__sub", c.subtitle)
    );

    let photoNo = chapters.slice(0, i).reduce((n, ch) => n + ch.photos.length, 0);
    (SNAP_LAYOUTS[c.photos.length] || []).forEach((slotKey, n) => {
      const slot = SNAP_SLOTS[slotKey];
      const photo = c.photos[n];
      photoNo += 1;
      const fig = el("figure", "snap");
      fig.dataset.fit = String(slot.w);
      setVars(fig, { bx: slot.bx, by: slot.by, bw: slot.bw, bh: slot.bh, w: slot.w, h: slot.h, pw: slot.pw, ph: slot.ph, k: slot.k || 1, rot: `${slot.rot}deg` });
      const frame = el("span", "snap__photo");
      const img = picture(photo.image, text(photo.caption), null);
      img.loading = "eager";
      frame.append(img);
      fig.append(
        frame,
        el("figcaption", "snap__caption", text(photo.caption)),
        el("span", "snap__num", pad2(photoNo)),
        el("span", "snap__tape")
      );
      chapter.appendChild(fig);
    });

    // Clear every page still in the book, not just the first one: when pages are turned
    // faster than the fade-out, earlier pages would otherwise be left stacked underneath.
    Array.from(bookContent.children).forEach((old) => {
      const isStacked = getComputedStyle(old).position === "absolute"; // single-column mobile layout isn't
      if (reduceMotion || !isStacked || old.classList.contains("is-leaving")) {
        old.remove();
      } else {
        old.classList.add("is-leaving");
        setTimeout(() => old.remove(), 200);
      }
    });
    bookContent.appendChild(chapter);

    $(".book__page-num--l", book).textContent = pad2(i * 2 + 1);
    $(".book__page-num--r", book).textContent = pad2(i * 2 + 2);
    bookPrev.disabled = i === 0;
    bookNext.hidden = i === chapters.length - 1;
    chapterIndex = i;
    fitAll();
  }

  function goChapter(delta) {
    const target = chapterIndex + delta;
    if (target < 0 || target >= chapters.length) return;
    renderChapter(target, delta);
    const focusTarget = delta > 0 && bookNext.hidden ? bookPrev : delta < 0 && bookPrev.disabled ? bookNext : null;
    if (focusTarget) focusTarget.focus();
  }

  // Preload the remaining chapters once the scrapbook is opened, so pages turn instantly
  // without downloading every photo for visitors who never open it.
  let preloaded = false;
  const preloadScrapbook = () => {
    if (preloaded) return;
    preloaded = true;
    chapters.forEach((c) => c.photos.forEach((p) => { new Image().src = p.image; }));
  };

  const openScrapbook = $("[data-open-scrapbook]");
  if (openScrapbook && chapters.length) {
    openScrapbook.addEventListener("click", () => {
      renderChapter(0, 1);
      openModal(scrapModal, $(".close-btn--book", scrapModal));
      scaleBook();
      fitAll();
      setTimeout(preloadScrapbook, 600);
    });
  } else if (openScrapbook) {
    openScrapbook.hidden = true; // nothing to show yet
  }
  bookPrev.addEventListener("click", () => goChapter(-1));
  bookNext.addEventListener("click", () => goChapter(1));
  scrapModal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goChapter(1);
    if (e.key === "ArrowLeft") goChapter(-1);
  });

  /* ==================================================================
     11. SMILE BADGE: wink on hover (CSS), squash → hop on click
     ================================================================== */
  const badge = $(".smile-badge");
  if (badge) {
    badge.addEventListener("click", () => {
      badge.classList.remove("is-hopping");
      void badge.offsetWidth; // restart the animation
      badge.classList.add("is-hopping");
    });
    badge.addEventListener("animationend", (e) => { if (e.animationName.startsWith("badge-")) badge.classList.remove("is-hopping"); });
  }

  /* ==================================================================
     12. ENTRANCE SEQUENCES
     [data-seq] groups play once when they scroll into view ("load" plays on page load).
     Each [data-reveal] item gets a delay: data-delay if set, otherwise
     data-start + its position in the group × data-stagger. CSS does the motion.
     ================================================================== */
  function countUp(node, delay) {
    if (node.dataset.counted) return;
    node.dataset.counted = "true";
    const final = node.textContent.trim();
    const match = final.match(/\d[\d,]*(?:\.\d+)?(?!.*\d)/); // the last number in the text
    if (!match) return;
    const raw = match[0];
    const decimals = (raw.split(".")[1] || "").length;
    const target = parseFloat(raw.replace(/,/g, ""));
    const from = parseFloat(node.dataset.countFrom || "0");
    const before = final.slice(0, match.index);
    const after = final.slice(match.index + raw.length);
    const format = (v) => before + v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: raw.includes(",")
    }) + after;

    // Screen readers get the real value; the ticking digits are decorative.
    const live = el("span");
    live.setAttribute("aria-hidden", "true");
    live.textContent = format(from);
    const label = el("span", "sr-only", final);
    node.replaceChildren(live, label);

    const duration = 1400;
    setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        live.textContent = p < 1 ? format(from + (target - from) * eased) : final;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  }

  function initMotion() {
    if (!root.classList.contains("motion")) return; // no JS-driven motion (reduced motion / old browser)
    window.__motionReady = true;

    const groups = new Map($$("[data-seq]").map((g) => [g, []]));
    const loose = [];
    $$("[data-reveal]").forEach((node) => {
      const group = node.hasAttribute("data-seq") ? node : node.parentElement.closest("[data-seq]");
      (group ? groups.get(group) : loose).push(node);
    });

    function play(group, items) {
      const start = Number(group.dataset.start) || 0;
      const stagger = Number(group.dataset.stagger) || 80;
      let index = 0;
      group.classList.add("is-in");
      items.forEach((node) => {
        const delay = node.dataset.delay != null ? Number(node.dataset.delay) : start + index++ * stagger;
        node.style.setProperty("--d", `${delay}ms`);
        node.classList.add("is-in");
        // Count only numbers that belong to this item (not ones inside nested items, e.g. tiles in a panel)
        const counters = [node, ...$$("[data-count]", node)].filter((c) => c.matches("[data-count]") && c.closest("[data-reveal]") === node);
        counters.forEach((c) => countUp(c, delay + 250));
      });
    }

    const pending = new Map(); // element → items, for anything not played yet
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !pending.has(entry.target)) return;
        play(entry.target, pending.get(entry.target));
        pending.delete(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });

    groups.forEach((items, group) => {
      if (group.dataset.seq === "load") {
        // Wait (briefly) for the web fonts so headlines don't swap mid-animation.
        const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
        Promise.race([fonts, new Promise((r) => setTimeout(r, 450))]).then(() => setTimeout(() => play(group, items), 60));
      } else {
        pending.set(group, items);
        observer.observe(group);
      }
    });
    loose.forEach((node) => { pending.set(node, [node]); observer.observe(node); });

    // The last few elements can sit inside the bottom margin even when fully scrolled down.
    const flushAtBottom = () => {
      if (!pending.size || window.innerHeight + window.scrollY < root.scrollHeight - 4) return;
      pending.forEach((items, node) => {
        if (node.getBoundingClientRect().top < window.innerHeight) {
          play(node, items);
          pending.delete(node);
          observer.unobserve(node);
        }
      });
    };
    window.addEventListener("scroll", flushAtBottom, { passive: true });
  }

  try {
    initMotion();
  } catch (err) {
    root.classList.remove("motion"); // never leave content hidden
    throw err;
  }

  /* ==================================================================
     13. INIT
     ================================================================== */
  setScrollbarWidth();
  layoutQuotes();
  fitAll();
  fitStatValues();
  window.addEventListener("resize", onResize);
  if (document.fonts) document.fonts.ready.then(() => { layoutQuotes(); fitStatValues(); });
  window.addEventListener("load", () => { layoutQuotes(); fitAll(); fitStatValues(); carousel && carousel.update(); });
})();
