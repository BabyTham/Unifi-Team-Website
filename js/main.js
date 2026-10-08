/* Unifi Digital Acquisition Team — interactions
   Mirrors the Figma prototype: hover states (CSS), profile popups, achievements carousel,
   cycling polaroids, "Our Moments" scrapbook, smile badge, nav. */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Data
     ------------------------------------------------------------------ */
  const PROFILES = [
    {
      name: "HIEW FONG FONG",
      role: "Head, New Customer Acquisition",
      photo: "assets/profile/01.png",
      overviewLabel: "PROFILE OVERVIEW",
      overview: [
        "Hiew is a digital leader at Telekom Malaysia whose public profile emphasises growth, efficiency and customer-focused digital outcomes, with her current remit centred on new customer acquisition.",
        "Her public credentials also show continued development across digital strategy, digital marketing, user experience and people leadership."
      ],
      feature: {
        label: "TEAM RECOGNITION",
        name: "MARKETING EXCELLENCE 2025",
        summary: "Named among the Unifi and Unifi Business team congratulated after multiple Gold and Bronze wins across major 2025 campaigns."
      },
      detailsLabel: "PUBLIC PROFILE HIGHLIGHTS",
      details: [
        ["NEW CUSTOMER ACQUISITION", "Public org information lists Hiew as Head, New Customer Acquisition within Unifi Brand & Marketing."],
        ["DIGITAL STRATEGY", "Certified Digital Marketing Specialist – Strategy and Planning, Digital Marketing Institute (2022)."],
        ["DIGITAL MARKETING", "Certified Digital Marketing Professional, Digital Marketing Institute (2021)."],
        ["UX FOUNDATIONS", "Completed Google’s Foundations of User Experience (UX) Design certification in 2024."],
        ["LEADERSHIP DEVELOPMENT", "Public certifications include Human Leadership, Project Leadership, emotional intelligence and people-management courses."]
      ],
      eduTitle: "EDUCATION",
      edu: "Degree in Arts, Mass Communication and Media Studies\n\nUniversiti Tunku Abdul Rahman (2006–2010)"
    },
    {
      name: "FATIMA NUR ZAHRA BINTI ISMAIL",
      role: "Assistant Manager Content Management (SME) Digital, Division Section New Install (NI)",
      photo: "assets/profile/02.png",
      overviewLabel: "PROFILE OVERVIEW",
      overview: [
        "Fatima manages and enhances the Unifi Business digital and web experience, covering website performance, content accuracy, content management, UI/UX, analytics and digital transformation initiatives.",
        "She works closely with business, BA, UI/UX, development and technical teams to translate requirements into effective digital solutions and ensure website changes are delivered accurately and on time."
      ],
      feature: {
        label: "FEATURED PROJECT",
        name: "IMPAK BIZ",
        summary: "End-to-end digital platform delivery: requirements → UI/UX → development → testing → deployment → production support → digital tracking."
      },
      detailsLabel: "KEY RESPONSIBILITIES",
      details: [
        ["Website Performance", "Audits speed, broken links and technical issues; uses analytics to drive optimisation."],
        ["Accuracy & Quality", "Resolves obsolete campaigns, typos and inconsistencies while protecting content quality."],
        ["Content Management", "Coordinates minor and major website changes with internal teams and clear approvals."],
        ["Prioritisation & Tracking", "Prioritises website requests by urgency and impact and tracks them through completion."],
        ["Change Documentation", "Maintains centralised records of website changes, approvals and completion dates."]
      ],
      eduTitle: "EDUCATION",
      edu: "Diploma In Information Technology\n\nDegree in Information System"
    },
    {
      name: "STEPHEN JEGANATHAN",
      role: "Manager Digital Campaign",
      photo: "assets/profile/03.png",
      overviewLabel: "PROFILE OVERVIEW",
      overview: [
        "Stephen manages and optimises Unifi’s digital customer journey on unifi.com.my, with a focus on online sales, conversion and campaign delivery. In 2026, he was involved in the TaaS PI-5 migration project and led the revamp of the Unifi Developer Partnership (UDP) program, including the purchase-journey transition from iJOIN to SLOF.",
        "The revamped program supported the launch of four new UDP projects in 2026, strengthening the digital purchase experience and partner-program delivery."
      ],
      feature: {
        label: "CARRER HIGHTLIGHTS",
        name: "16 YEARS AT TM",
        summary: "Career progression across fraud investigation, risk & assurance, strategy, OTT partnerships, vernacular content and digital campaign management. Public profile data also lists Group CEO Merit Awards in 2021 and 2023."
      },
      detailsLabel: "KEY PROJECTS & 2026 DELIVERY",
      details: [
        ["TaaS PI-5 MIGRATION", "Involved in the 2026 TaaS PI-5 migration project, supporting delivery during the platform transition."],
        ["UDP PROGRAM REVAMP", "Led the 2026 revamp of the Unifi Developer Partnership program."],
        ["iJOIN → SLOF JOURNEY", "Revamped the UDP purchase journey from iJOIN to SLOF to create a refreshed buying flow."],
        ["4 NEW UDP PROJECTS", "Successfully launched four new Unifi Developer Partnership projects in 2026."],
        ["2026 PROJECT DELIVERY", "Led and supported migration, journey-revamp and partner-program initiatives across the year."]
      ],
      eduTitle: "EDUCATION",
      edu: "Bachelor of Arts (BA)\nUniversity of Greenwich\n\nDiploma in Accounting\nMultimedia University (MMU)"
    },
    {
      name: "WAN AFIFAH NAJIHAH BINTI WAN MOHD SYUKRI",
      role: "Assistant Manager, Web Optimization Specialist",
      photo: "assets/profile/04.png",
      overviewLabel: "PROFILE OVERVIEW",
      overview: [
        "Afifah oversees the performance of key digital products across Home Broadband, Postpaid, Prepaid, Devices and Unifi TV, with a focus on Net Adds (NI) performance and conversion optimisation.",
        "She combines performance monitoring, inventory planning and customer-journey insight to support business targets and improve conversion across digital channels."
      ],
      feature: {
        label: "KEY CONTRIBUTIONS",
        name: "UNIFI ESHOP EXPERIENCE",
        summary: "Website Revamp: business and performance insights improved the Devices and Postpaid purchase journey.  •  WhatsApp Integration: direct agent assistance reduced friction during online registration and application."
      },
      detailsLabel: "KEY RESPONSIBILITIES",
      details: [
        ["DIGITAL PRODUCT PERFORMANCE", "Oversees product performance and Net Adds across Home Broadband, Mobile, Devices and Unifi TV."],
        ["DEVICE INVENTORY PLANNING", "Plans stock availability, replenishment and forecasts for upcoming launches with Device Operations."],
        ["SALES & ACTIVATION MONITORING", "Monitors daily sales, activations and cancellations across Home and Mobile against business targets."],
        ["WEBSITE & JOURNEY OPTIMISATION", "Provides insights to improve website performance, customer journeys and conversion rates across digital channels."],
        ["DIGITAL PRODUCT SCOPE", "Home Broadband  ·  Postpaid  ·  Prepaid  ·  Devices  ·  Unifi TV"]
      ],
      eduTitle: "EDUCATION",
      edu: "Bachelor of Electronics Engineering (Hons.) in Computer Engineering\n\nMultimedia University (MMU), Cyberjaya"
    },
    {
      name: "FARHAN AL HAFIZ BIN MUSTAFAR ALBAKRI",
      role: "Assistant Manager Digital Operations",
      photo: "assets/profile/05.png",
      photoFlipped: true, // the Figma layer is rotated 180°
      overviewLabel: "PROFILE OVERVIEW",
      overview: [
        "Farhan drives operational performance, customer experience and team productivity through performance management, customer lifecycle oversight, stakeholder coordination and continuous process improvement.",
        "His work spans business performance monitoring, customer engagement, operational issue resolution, team development and data analysis to keep service delivery aligned with business objectives and quality standards."
      ],
      feature: {
        label: "KEY CONTRIBUTIONS",
        name: "OPERATIONAL EXCELLENCE & GROWTH",
        summary: "Led performance and productivity initiatives, strengthened customer lifecycle management, supported retention and reduced fallout through data-driven process improvement and cross-functional coordination."
      },
      detailsLabel: "KEY RESPONSIBILITIES",
      details: [
        ["PERFORMANCE & PRODUCTIVITY", "Monitors operational performance and leads productivity improvement initiatives to support business targets."],
        ["CUSTOMER LIFECYCLE & RETENTION", "Oversees verification, onboarding, follow-ups, retention efforts and issue resolution to strengthen customer experience."],
        ["QUALITY & FALLOUT REDUCTION", "Drives quality verification and proactive follow-up to reduce return orders, fallout cases and service issues."],
        ["DATA & PROCESS IMPROVEMENT", "Uses performance insights to identify gaps, support decisions, streamline workflows and improve business outcomes."],
        ["TEAM & STAKEHOLDER ENABLEMENT", "Collaborates across functions, coaches team members and promotes knowledge sharing, accountability and operational excellence."]
      ],
      eduTitle: "EDUCATION",
      edu: "Bachelor’s Degree in Computer Software Engineering"
    },
    {
      name: "NUR HAZIRAH BINTI MOHAMMAD KHIR",
      role: "Assistant Manager Back-End",
      photo: "assets/profile/06.png",
      overviewLabel: "PROFILE OVERVIEW",
      overview: [
        "Nur Hazirah Binti Mohammad Khir is part of Telekom Malaysia’s Digital division, with her team profile aligned to eShop and website development.",
        "Her responsibilities include managing request for portal enhancement (eshop/idiscover for NI) and ensure the items requested by the team are being registered in the Github and will be included into sprint planning."
      ],
      feature: {
        label: "KEY PROJECT FOCUS",
        name: "ESHOP JOURNEY & DELIVERY",
        summary: "Channel lead and product owner across TaaS Pi-5 migration, iJoin journey revamp and New Install BAU — covering DVT readiness, stakeholder timelines, enhancements, bug fixes and sprint planning."
      },
      detailsLabel: "KEY PROJECTS & DELIVERY",
      details: [
        ["TaaS PI-5 MIGRATION", "Channel lead during DVT, ensuring eShop journeys worked as intended during migration to the new TaaS back-end."],
        ["iJOIN JOURNEY REVAMP", "Product owner for the new iJoin journey, keeping WIP aligned to stakeholder timelines and reducing journey drop-off."],
        ["BAU / NEW INSTALL", "Manages stakeholder requests, channel readiness, enhancements and bug fixes for New Install customers."],
        ["CHANNEL READINESS", "Ensures eShop journeys remain functional and ready across DVT, enhancements and BAU delivery."],
        ["SPRINT DELIVERY", "Oversees in-progress development and sprint planning for enhancements, fixes and stakeholder requests."]
      ],
      eduTitle: "EDUCATION",
      edu: "Diploma in Education, Electrical and Electronics Engineering\n\nDegree in Information and Technology, Data communication and Networking"
    },
    {
      name: "AHMAD NAJMI BIN NAILLUL HAFIDZ",
      role: "Assistant Manager for Web Content Mangement",
      photo: "assets/profile/07.png",
      overviewLabel: "ROLE OVERVIEW",
      overview: [
        "Manages and maintains Unifi website content across updates, campaign deployment, page enhancements, promotional materials and content optimisation to keep digital experiences clear, current and conversion-focused.",
        "Nearly 16 years with TM across Enterprise Product Marketing, Unifi TV and Unifi Digital, with experience spanning SaaS & Cloud, sports marketing, SEO, Drupal and website optimisation."
      ],
      feature: {
        label: "IMPACT HIGHLIGHT",
        name: "SMARTHOME\nCONVERSION",
        summary: "Introduced targeted special deals through the iJoin intercept, contributing to a 200% increase in Smarthome bundle sales in May."
      },
      detailsLabel: "KEY PROJECTS & CONTRIBUTIONS",
      details: [
        ["UNIFI TV JOURNEY REVAMP", "Led the iDiscovery and purchase journey revamp to simplify navigation, improve content clarity and create a smoother purchase experience."],
        ["FIFA WORLD CUP 2026", "Delivered the FIFA World Cup 2026 microsite in June, supporting campaign objectives through a dedicated digital experience."],
        ["SEO & ORGANIC GROWTH", "Drove ongoing Unifi Portal SEO optimisation in 2025/2026, improving organic visibility and contributing to growth in organic traffic."],
        ["WEB CONTENT MANAGEMENT", "Manages content updates, campaign deployment, page enhancements, promotional materials and continuous content optimisation."]
      ],
      eduTitle: "CAREER BACKGROUND",
      career: true,
      edu: "TM ENTERPRISE — 9 YEARS\nEnterprise Product Marketing / SaaS & Cloud Services\n\nUNIFI TV — 3 YEARS\nSports content marketing & digital campaigns\n\nUNIFI DIGITAL — 4 YEARS\nWeb content, SEO, digital marketing, optimisation & Drupal"
    }
  ];

  // Polaroid slot geometry from the Figma "Scrapbook / Chapter Spread" component (book is 1200 × 639).
  const SLOTS = {
    p1:  { bx: 41.63,  by: 206,    bw: 477.739, bh: 374.593, w: 460, h: 351,    pw: 440,   ph: 293,    rot: 3 },
    p2:  { bx: 640,    by: 27.77,  bw: 305.896, bh: 257.65,  w: 290, h: 238,    pw: 270,   ph: 180,    rot: -4 },
    p3:  { bx: 893.96, by: 90,     bw: 260.7,   bh: 223.795, w: 250, h: 211,    pw: 230,   ph: 153,    rot: 3 },
    p4:  { bx: 641.45, by: 326,    bw: 308.368, bh: 255.321, w: 300, h: 245,    pw: 280,   ph: 187,    rot: 2 },
    p5:  { bx: 930,    by: 337.95, bw: 246.382, bh: 217.292, w: 230, h: 198,    pw: 210,   ph: 140,    rot: -5 },
    p2L: { bx: 640,    by: 41.21,  bw: 354.552, bh: 304.361, w: 340, h: 286.96, pw: 312.8, ph: 208.08, rot: -3, k: 1.36 },
    p3L: { bx: 837.9,  by: 288,    bw: 343.652, bh: 286.402, w: 330, h: 269.5,  pw: 308,   ph: 205.7,  rot: 3,  k: 1.1 }
  };
  const LAYOUT = {
    five:  ["p1", "p2", "p3", "p4", "p5"],
    four:  ["p1", "p2", "p3", "p4"],
    three: ["p1", "p2L", "p3L"]
  };
  const CHAPTERS = [
    { name: "Genting Trip", sub: "Welcome To Skyworlds!", layout: "five",
      photos: [["01", "Skyworlds yayyyy"], ["02", "Title Group Photo"], ["03", "Epic Voyage to Moonhaven"], ["04", "Epic Voyage to Moonhaven"], ["05", "Welcome to Skyworlds"]] },
    { name: "Genting Trip", sub: "Cable Car", layout: "five",
      photos: [["06", "Cable Car"], ["07", "Cable Car"], ["08", "Cable Car"], ["09", "Cable Car"], ["10", "Cable Car"]] },
    { name: "Genting Trip", sub: "Resort World Genting", layout: "four",
      photos: [["11", "Invasion of the Planet of the Apes"], ["12", "Central Park"], ["13", "Lining up for a ride"], ["14", "Unifi Store at Genting Mall"]] },
    { name: "Events", sub: "4 photos", layout: "four",
      photos: [["15", "Fifa World Cup Opening"], ["16", "GBM Team Building"], ["17", "GBM Team Building"], ["18", "Unifi Sport Day!!"]] },
    { name: "Luncheon", sub: "3 photos", layout: "three",
      photos: [["19", "Luncheon Time"], ["20", "Luncheon Time"], ["21", "Luncheon Time"]] },
    { name: "Lets Meet offline", sub: "3 photos", layout: "three",
      photos: [["22", "Group Photo"], ["23", "Smile"], ["24", ":)))"]] }
  ];

  /* ------------------------------------------------------------------
     Layout helpers
     ------------------------------------------------------------------ */
  const root = document.documentElement;

  function setScrollbarWidth() {
    root.style.setProperty("--sbw", (window.innerWidth - root.clientWidth) + "px");
  }

  // Elements with [data-fit="<design width>"] are zoomed down to fit their parent.
  function fitAll() {
    $$("[data-fit]").forEach((el) => {
      if (getComputedStyle(el).getPropertyValue("--fit").trim() === "off") {
        el.style.zoom = "";
        return;
      }
      const parent = el.parentElement;
      const cs = getComputedStyle(parent);
      const avail = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const z = Math.min(1, avail / Number(el.dataset.fit));
      el.style.zoom = z < 0.999 ? z.toFixed(4) : "";
    });
  }

  let resizeTimer = 0;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setScrollbarWidth();
      fitAll();
      carousel && carousel.update();
      scaleBook();
    }, 60);
  }

  /* ------------------------------------------------------------------
     Nav (mobile menu)
     ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
     Modal helpers (focus handling + scroll lock)
     ------------------------------------------------------------------ */
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
      .filter((el) => el.offsetParent !== null);
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

  /* ------------------------------------------------------------------
     Profile popup
     ------------------------------------------------------------------ */
  const profileModal = $("#profile-modal");

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderProfile(index) {
    const p = PROFILES[index];
    const card = $(".profile", profileModal);
    card.classList.toggle("profile--career", !!p.career);

    const photo = $(".profile__photo", card);
    photo.src = p.photo;
    photo.alt = p.name;
    photo.classList.toggle("is-flipped", !!p.photoFlipped);

    $(".profile__watermark", card).textContent = String(index + 1).padStart(2, "0");
    $(".profile__edu-title", card).textContent = p.eduTitle;
    $(".profile__edu", card).textContent = p.edu;
    $(".profile__name", card).textContent = p.name;
    $(".profile__role", card).textContent = p.role;
    $('[data-field="overviewLabel"]', card).textContent = p.overviewLabel;
    $('[data-field="detailsLabel"]', card).textContent = p.detailsLabel;

    const paras = $(".profile__paras", card);
    paras.replaceChildren(...p.overview.map((t) => el("p", null, t)));

    $(".profile__feature-label", card).textContent = p.feature.label;
    $(".profile__feature-name", card).textContent = p.feature.name;
    $(".profile__feature-summary", card).textContent = p.feature.summary;

    const list = $(".profile__details", card);
    list.replaceChildren(...p.details.map(([title, desc], i) => {
      const li = el("li", "detail");
      li.append(
        el("span", "detail__num", String(i + 1).padStart(2, "0")),
        el("span", "detail__title", title),
        el("span", "detail__desc", desc)
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

  /* ------------------------------------------------------------------
     Achievements carousel
     ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
     Polaroid cycles (Behind the scenes)
     ------------------------------------------------------------------ */
  function setupPolaroid(frame) {
    const ids = frame.dataset.cycle.split(",");
    const interval = Number(frame.dataset.interval) || 3000;
    const imgs = [frame.querySelector("img")];
    let current = 0;
    let timer = 0;

    function getImg(i) {
      if (!imgs[i]) {
        const img = document.createElement("img");
        img.alt = "Team moment";
        img.src = `assets/scrapbook/${ids[i]}.jpg`;
        img.style.opacity = "0";
        frame.appendChild(img);
        imgs[i] = img;
      }
      return imgs[i];
    }

    function tick() {
      const nextIndex = (current + 1) % ids.length;
      const incoming = getImg(nextIndex);
      const outgoing = imgs[current];
      const show = () => {
        frame.appendChild(incoming); // keep the incoming photo on top
        void incoming.offsetWidth;
        incoming.style.opacity = "1";
        setTimeout(() => { if (outgoing !== incoming) outgoing.style.opacity = "0"; }, 500);
        current = nextIndex;
      };
      if (incoming.complete && incoming.naturalWidth) show();
      else incoming.decode().then(show, show);
    }

    return {
      start() { if (!timer) timer = setInterval(tick, interval); },
      stop() { clearInterval(timer); timer = 0; }
    };
  }

  const polaroidCycles = $$(".polaroid[data-cycle]").map(setupPolaroid);
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

  /* ------------------------------------------------------------------
     Scrapbook ("View our moments")
     ------------------------------------------------------------------ */
  const scrapModal = $("#scrapbook-modal");
  const book = $(".book", scrapModal);
  const bookContent = $(".book__content", book);
  const bookPrev = $("[data-book-prev]", book);
  const bookNext = $("[data-book-next]", book);
  let chapterIndex = 0;

  function scaleBook() {
    if (!scrapModal || scrapModal.hidden) return;
    const s = Math.min(1, (window.innerWidth - 48) / 1236, (window.innerHeight - 48) / 663);
    scrapModal.style.setProperty("--book-scale", Math.max(0.3, s).toFixed(4));
  }

  function renderChapter(i, dir) {
    const c = CHAPTERS[i];
    const chapter = el("div", "chapter");
    chapter.style.setProperty("--dir", dir < 0 ? "-24px" : "24px");
    chapter.append(
      el("p", "chapter__label", `CHAPTER ${String(i + 1).padStart(2, "0")}`),
      el("h3", "chapter__name", c.name),
      el("p", "chapter__sub", c.sub)
    );

    let photoNo = CHAPTERS.slice(0, i).reduce((n, ch) => n + ch.photos.length, 0);
    LAYOUT[c.layout].forEach((slotKey, n) => {
      const slot = SLOTS[slotKey];
      const [file, caption] = c.photos[n];
      photoNo += 1;
      const fig = el("figure", "snap");
      fig.dataset.fit = String(slot.w);
      const vars = { bx: slot.bx, by: slot.by, bw: slot.bw, bh: slot.bh, w: slot.w, h: slot.h, pw: slot.pw, ph: slot.ph, k: slot.k || 1 };
      Object.entries(vars).forEach(([k, v]) => fig.style.setProperty(`--${k}`, v));
      fig.style.setProperty("--rot", `${slot.rot}deg`);
      const img = el("img", "snap__photo");
      img.src = `assets/scrapbook/${file}.jpg`;
      img.alt = caption;
      fig.append(
        img,
        el("figcaption", "snap__caption", caption),
        el("span", "snap__num", String(photoNo).padStart(2, "0")),
        el("span", "snap__tape")
      );
      chapter.appendChild(fig);
    });

    const old = bookContent.firstElementChild;
    if (old && !reduceMotion) {
      old.classList.add("is-leaving");
      setTimeout(() => old.remove(), 200);
    } else if (old) {
      old.remove();
    }
    bookContent.appendChild(chapter);

    $(".book__page-num--l", book).textContent = String(i * 2 + 1).padStart(2, "0");
    $(".book__page-num--r", book).textContent = String(i * 2 + 2).padStart(2, "0");
    bookPrev.disabled = i === 0;
    bookNext.hidden = i === CHAPTERS.length - 1;
    chapterIndex = i;
    fitAll();
  }

  function goChapter(delta) {
    const target = chapterIndex + delta;
    if (target < 0 || target >= CHAPTERS.length) return;
    renderChapter(target, delta);
    const focusTarget = delta > 0 && bookNext.hidden ? bookPrev : delta < 0 && bookPrev.disabled ? bookNext : null;
    if (focusTarget) focusTarget.focus();
  }

  $("[data-open-scrapbook]") && $("[data-open-scrapbook]").addEventListener("click", () => {
    renderChapter(0, 1);
    openModal(scrapModal, $(".close-btn--book", scrapModal));
    scaleBook();
    fitAll();
  });
  bookPrev.addEventListener("click", () => goChapter(-1));
  bookNext.addEventListener("click", () => goChapter(1));
  scrapModal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goChapter(1);
    if (e.key === "ArrowLeft") goChapter(-1);
  });

  // Preload the scrapbook photos once the page is idle so chapters turn instantly.
  const preload = () => CHAPTERS.forEach((c) => c.photos.forEach(([f]) => { new Image().src = `assets/scrapbook/${f}.jpg`; }));
  if ("requestIdleCallback" in window) requestIdleCallback(preload, { timeout: 4000 });
  else setTimeout(preload, 2500);

  /* ------------------------------------------------------------------
     Smile badge: wink on hover (CSS), squash → hop on click
     ------------------------------------------------------------------ */
  const badge = $(".smile-badge");
  if (badge) {
    badge.addEventListener("click", () => {
      badge.classList.remove("is-hopping");
      void badge.offsetWidth; // restart the animation
      badge.classList.add("is-hopping");
    });
    badge.addEventListener("animationend", () => badge.classList.remove("is-hopping"));
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  setScrollbarWidth();
  fitAll();
  window.addEventListener("resize", onResize);
  window.addEventListener("load", () => { fitAll(); carousel && carousel.update(); });
})();
