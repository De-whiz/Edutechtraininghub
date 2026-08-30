(function () {
  "use strict";

  const user = ETH.requireAuth();
  if (!user) return;

  const COURSES = window.ETH_COURSES || [];
  const viewRoot = document.getElementById("dashView");
  const modalRoot = document.getElementById("modalRoot");
  const toastRoot = document.getElementById("toastRoot");

  const ICONS = {
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    book: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    play: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
    lock: '<svg class="lesson-lock" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    award: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>',
    bag: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'
  };

  const TITLES = {
    overview: "Overview",
    courses: "My Courses",
    browse: "Browse Courses",
    grades: "Grades & Scores",
    certificates: "My Certificates",
    access: "My Access",
    settings: "Account Settings",
    player: "Course Player"
  };

  function getCourse(id) {
    return COURSES.find((c) => c.id === Number(id)) || null;
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return mins + " min ago";
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + " hr ago";
    const days = Math.floor(hrs / 24);
    if (days < 7) return days + " day" + (days > 1 ? "s" : "") + " ago";
    return ETH.fmtDate(ts);
  }

  function toast(msg, warn) {
    const el = document.createElement("div");
    el.className = "toast" + (warn ? " toast--warn" : "");
    el.innerHTML = (warn ? ICONS.info : ICONS.checkCircle) + "<span>" + msg + "</span>";
    toastRoot.appendChild(el);
    setTimeout(() => {
      el.classList.add("is-out");
      setTimeout(() => el.remove(), 320);
    }, 3400);
  }

  /* ---------------- shell: theme / clock / confetti / count-ups ---------------- */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    try { localStorage.setItem("eth_theme", theme); } catch (e) {}
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("eth_theme"); } catch (e) {}
    if (!saved) {
      saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(saved);
    document.getElementById("themeToggle").addEventListener("click", () => {
      applyTheme(document.body.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  }

  let clockTimer = null;

  function startClock() {
    if (clockTimer) clearInterval(clockTimer);
    const el = () => document.getElementById("liveClock");
    const tick = () => {
      const node = el();
      if (!node) return;
      node.textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    };
    tick();
    clockTimer = setInterval(tick, 15000);
  }

  function runCountUps(root) {
    root.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseFloat(el.getAttribute("data-count")) || 0;
      if (reducedMotion || target === 0) {
        el.textContent = String(target);
        return;
      }
      const dur = 950;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  const confettiCanvas = document.getElementById("confettiCanvas");
  let confettiParts = [];
  let confettiRunning = false;

  function confettiBurst(big) {
    if (reducedMotion) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    confettiCanvas.width = window.innerWidth * dpr;
    confettiCanvas.height = window.innerHeight * dpr;
    const ctx = confettiCanvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#f15a29", "#ff9a63", "#0f6b78", "#3a97a5", "#1e4e79", "#ffd166"];
    const n = big ? 190 : 120;
    for (let i = 0; i < n; i++) {
      confettiParts.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 220,
        y: window.innerHeight * 0.32,
        vx: (Math.random() - 0.5) * 13,
        vy: -6 - Math.random() * 8.5,
        w: 5 + Math.random() * 6,
        h: 3 + Math.random() * 5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.28,
        color: colors[(Math.random() * colors.length) | 0],
        round: Math.random() < 0.25,
        life: 0
      });
    }
    if (confettiRunning) return;
    confettiRunning = true;
    const frame = () => {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      confettiParts.forEach((p) => {
        p.life++;
        p.vy += 0.24;
        p.vx *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - p.life / 170);
        ctx.fillStyle = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      });
      confettiParts = confettiParts.filter((p) => p.life < 170 && p.y < window.innerHeight + 40);
      if (confettiParts.length) {
        requestAnimationFrame(frame);
      } else {
        confettiRunning = false;
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    };
    requestAnimationFrame(frame);
  }

  /* ---------------- cart & checkout ---------------- */

  function priceNum(p) {
    const n = parseInt(String(p).replace(/[^\d]/g, ""), 10);
    return isNaN(n) ? 0 : n;
  }

  function productFrom(course) {
    const opts = (course && course.options) || [];
    if (!opts.length) return course.price || "";
    let min = null;
    opts.forEach((o) => {
      let p = Number(o && o.priceNum);
      if (!(p > 0)) p = priceNum(o && o.price);
      if (p > 0 && (min === null || p < min)) min = p;
    });
    if (min === null) return opts[0].price || course.price || "";
    let best = opts[0];
    opts.forEach((o) => {
      let p = Number(o.priceNum);
      if (!(p > 0)) p = priceNum(o.price);
      if (p === min) best = o;
    });
    return best.price || String(min);
  }

  function fmtNaira(n) {
    return "\u20a6" + n.toLocaleString("en-NG");
  }

  function liveCart() {
    return ETH.cart().filter((id) => !ETH.isEnrolled(user.id, id) && getCourse(id));
  }

  function paintCartBadge() {
    ETH.cart().slice().forEach((id) => {
      if (ETH.isEnrolled(user.id, id)) ETH.cartRemove(id);
    });
    const b = document.getElementById("dashCartBadge");
    if (!b) return;
    const n = liveCart().length;
    b.textContent = String(n);
    b.hidden = n === 0;
  }

  let payBusy = false;

  function setErr(spanId, msg, inputId) {
    const span = document.getElementById(spanId);
    if (span) span.textContent = msg || "";
    const input = document.getElementById(inputId);
    if (input) input.classList.toggle("is-error", !!msg);
  }

  function openCheckout(ids, fromCart) {
    const courses = ids.map(getCourse).filter(Boolean);
    if (!courses.length) return;
    payBusy = false;
    const total = courses.reduce((s, c) => s + priceNum(c.price), 0);
    document.body.style.overflow = "hidden";

    modalRoot.innerHTML =
      '<div class="quiz-overlay" id="payOverlay">' +
      '<div class="pay-sheet" role="dialog" aria-modal="true" aria-label="Checkout">' +
      '<div class="pay-head"><div><div class="quiz-head__title">Secure Checkout</div>' +
      '<div class="quiz-head__sub">' +
      (courses.length === 1 ? esc(courses[0].title) : courses.length + " courses \u00b7 instant access") +
      "</div></div>" +
      '<button class="quiz-x" id="payClose" aria-label="Close checkout">' + ICONS.x + "</button></div>" +
      '<div class="pay-body" id="payBody">' +
      (courses.length === 1
        ? '<div class="pay-course">' +
          '<img src="' + courses[0].image + '" alt="" class="pay-course__thumb">' +
          '<div class="pay-course__info"><h3>' + esc(courses[0].title) + "</h3>" +
          '<p class="pay-course__desc">' + esc(courses[0].desc) + "</p>" +
          '<div class="course-tile__meta"><span>' + ICONS.clock + " " + esc(courses[0].duration) + "</span><span>" + esc(courses[0].level) + "</span></div></div>" +
          '<strong class="pay-course__price">' + esc(courses[0].price) + "</strong></div>"
        : '<div class="line-items">' +
          courses.map((c) => (
            '<div class="line-item"><img src="' + c.image + '" alt="">' +
            '<span class="line-item__name">' + esc(c.title) + "</span>" +
            '<span class="line-item__price">' + esc(c.price) + "</span></div>"
          )).join("") +
          "</div>") +
      '<div class="total-row"><span>Total due today</span><strong>' + fmtNaira(total) + "</strong></div>" +
      '<form id="cardForm" novalidate autocomplete="off">' +
      '<div class="form-group"><label class="form-label" for="ccName">Name on Card</label>' +
      '<input class="form-control" id="ccName" value="' + esc(user.fname + " " + user.lname) + '"></div>' +
      '<div class="form-group"><label class="form-label" for="ccNum">Card Number</label>' +
      '<input class="form-control cc-input" id="ccNum" inputmode="numeric" placeholder="0000 0000 0000 0000" maxlength="19">' +
      '<span class="field-error" id="errNum"></span></div>' +
      '<div class="card-fields">' +
      '<div class="form-group"><label class="form-label" for="ccExp">Expiry</label>' +
      '<input class="form-control cc-input" id="ccExp" inputmode="numeric" placeholder="MM/YY" maxlength="5">' +
      '<span class="field-error" id="errExp"></span></div>' +
      '<div class="form-group"><label class="form-label" for="ccCvv">CVV</label>' +
      '<input class="form-control cc-input" id="ccCvv" inputmode="numeric" placeholder="123" maxlength="4">' +
      '<span class="field-error" id="errCvv"></span></div></div>' +
      '<p class="pay-note">' + ICONS.info + " Demo checkout \u2014 no real charge. Any numbers work.</p>" +
      '<button type="submit" class="btn btn--primary btn--lg pay-btn" id="payBtn">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>' +
      "Pay " + fmtNaira(total) + "</button>" +
      "</form></div></div></div>";

    const numEl = document.getElementById("ccNum");
    const expEl = document.getElementById("ccExp");

    numEl.addEventListener("input", () => {
      numEl.value = numEl.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
      setErr("errNum", "", "ccNum");
    });
    expEl.addEventListener("input", () => {
      const v = expEl.value.replace(/\D/g, "").slice(0, 4);
      expEl.value = v.length > 2 ? v.slice(0, 2) + "/" + v.slice(2) : v;
      setErr("errExp", "", "ccExp");
    });
    document.getElementById("ccCvv").addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 4);
      setErr("errCvv", "", "ccCvv");
    });

    document.getElementById("cardForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (payBusy) return;
      const digits = numEl.value.replace(/\D/g, "");
      const cvv = document.getElementById("ccCvv").value.trim();
      let ok = true;
      if (digits.length !== 16) { setErr("errNum", "Enter the 16-digit card number.", "ccNum"); ok = false; }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expEl.value)) { setErr("errExp", "Use MM/YY.", "ccExp"); ok = false; }
      if (cvv.length < 3) { setErr("errCvv", "3\u20134 digits.", "ccCvv"); ok = false; }
      if (!ok) return;

      payBusy = true;
      const btn = document.getElementById("payBtn");
      btn.disabled = true;
      btn.classList.add("is-busy");
      btn.innerHTML = '<span class="pay-spinner"></span>Processing payment\u2026';
      setTimeout(() => succeedCheckout(courses, total), 1600);
    });

    document.getElementById("payClose").addEventListener("click", closePayModal);
  }

  function closePayModal() {
    const paid = !!document.getElementById("payDone");
    closeModal();
    paintCartBadge();
    if (paid) render();
    else toast("Saved to your cart \u2014 finish anytime from the bag icon.");
  }

  function succeedCheckout(courses, total) {
    courses.forEach((c) => {
      if (!ETH.isEnrolled(user.id, c.id)) ETH.enroll(user.id, c.id, c.title);
      ETH.cartRemove(c.id);
    });
    const ref = "ETH-" + Math.random().toString(36).slice(2, 8).toUpperCase() + "-" + Date.now().toString().slice(-4);

    document.getElementById("payBody").innerHTML =
      '<div class="pay-success">' +
      '<span class="success-ring"><svg viewBox="0 0 52 52" width="76" height="76">' +
      '<circle class="success-circle" cx="26" cy="26" r="24" fill="none"/>' +
      '<path class="success-check" fill="none" d="M14 27l8 8 16-17"/></svg></span>' +
      "<h3>Payment Successful!</h3>" +
      "<p>You now have full access to " +
      (courses.length === 1 ? "<strong>" + esc(courses[0].title) + "</strong>" : "all <strong>" + courses.length + " courses</strong>") +
      ". Your classes and quizzes are unlocked.</p>" +
      '<div class="ref-chip">Ref ' + ref + " \u00b7 " + fmtNaira(total) + "</div>" +
      '<button class="btn btn--teal btn--lg" id="payDone">Start Learning</button></div>';

    confettiBurst(true);
    updateBadges();
    paintCartBadge();

    document.getElementById("payDone").addEventListener("click", () => {
      closeModal();
      navigate("#courses");
    });
  }

  function closeCartDrawer() {
    const drawer = document.querySelector(".cart-drawer");
    const scrim = document.getElementById("cartScrim");
    if (drawer) drawer.remove();
    if (scrim) scrim.remove();
    document.body.style.overflow = "";
  }

  function openCartDrawer() {
    closeCartDrawer();
    const items = liveCart();
    const total = items.reduce((s, id) => s + priceNum(getCourse(id).price), 0);
    document.body.style.overflow = "hidden";

    const scrim = document.createElement("div");
    scrim.className = "drawer-scrim";
    scrim.id = "cartScrim";
    const drawer = document.createElement("aside");
    drawer.className = "cart-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-label", "Course cart");
    drawer.innerHTML =
      '<div class="cart-drawer__head"><h3>Your Cart</h3>' +
      '<button class="quiz-x" id="cartClose" aria-label="Close cart">' + ICONS.x + "</button></div>" +
      '<div class="cart-drawer__body">' +
      (items.length
        ? items.map((id) => {
            const c = getCourse(id);
            return (
              '<div class="cart-row">' +
              '<img src="' + c.image + '" alt="" class="cart-row__thumb">' +
              '<div class="cart-row__info"><span class="cart-row__title">' + esc(c.title) + "</span>" +
              '<span class="cart-row__price">' + esc(c.price) + "</span></div>" +
              '<button class="cart-row__remove" data-cart-remove="' + id + '" aria-label="Remove ' + esc(c.title) + '">' + ICONS.x + "</button>" +
              "</div>"
            );
          }).join("")
        : '<div class="empty-state" style="margin:18px 6px"><h3>Your cart is empty</h3><p>Courses you add will wait here until you are ready to pay.</p>' +
          '<button class="btn btn--primary btn-sm" data-goto="#browse">Browse Courses</button></div>') +
      "</div>" +
      (items.length
        ? '<div class="cart-drawer__foot">' +
          '<div class="total-row"><span>Total</span><strong>' + fmtNaira(total) + "</strong></div>" +
          '<button class="btn btn--primary btn--lg" id="cartPayAll">Pay Now</button></div>'
        : "");

    document.body.appendChild(scrim);
    document.body.appendChild(drawer);

    scrim.addEventListener("click", closeCartDrawer);
    document.getElementById("cartClose").addEventListener("click", closeCartDrawer);
    drawer.querySelectorAll("[data-cart-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        ETH.cartRemove(Number(btn.getAttribute("data-cart-remove")));
        paintCartBadge();
        openCartDrawer();
      });
    });
    const payAll = document.getElementById("cartPayAll");
    if (payAll) {
      payAll.addEventListener("click", () => {
        closeCartDrawer();
        openCheckout(liveCart(), true);
      });
    }
    drawer.querySelector('[data-goto="#browse"]')?.addEventListener("click", closeCartDrawer);
  }

  /* ---------------- deterministic content generator ---------------- */

  function seeded(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  const THEME_POOL = [
    { name: "Getting Started & the Road Ahead", focus: "orientation", mins: 25 },
    { name: "Core Concepts that Drive Results", focus: "concepts", mins: 35 },
    { name: "Your Essential Toolkit", focus: "tools", mins: 30 },
    { name: "Designing for Real Learners", focus: "design", mins: 40 },
    { name: "Creating & Delivering with Confidence", focus: "creation", mins: 45 },
    { name: "Assessment, Feedback & What Comes Next", focus: "assessment", mins: 30 }
  ];

  const SENTENCES = {
    orientation: [
      "Every strong learning journey begins with clarity about where you are headed and why it matters.",
      "In this opening session we map out the full landscape of \"{course}\" so every later module has a clear place to slot into.",
      "You will set a personal goal for the programme and identify the single outcome you care most about achieving.",
      "Research on adult learning shows learners who write down specific goals are significantly more likely to complete a course.",
      "By the end of this class you will know exactly what tools, habits and checkpoints will carry you through the coming weeks."
    ],
    concepts: [
      "Underneath every practical skill sits a small set of powerful ideas, and this session unpacks them one by one.",
      "We break down the fundamental principles behind \"{theme}\" and look at how professionals apply them in real projects.",
      "Short worked examples show each concept in action, first in isolation and then combined into a realistic workflow.",
      "A common mistake at this stage is rushing to tools before understanding principles; mastery here makes everything later easier.",
      "The knowledge check that follows is designed to make these ideas stick, so take your time with the material above."
    ],
    tools: [
      "The right tool, used well, removes friction and frees you to focus on the quality of your work.",
      "This session walks through the essential toolkit for \"{theme}\", including free options you can start using today.",
      "You will watch a guided walkthrough of each tool, then replicate the steps yourself in a short practice task.",
      "We also cover how to choose between competing tools using three simple criteria: fit, cost and transferability.",
      "Keep your notes handy as the quiz includes scenario questions about selecting the right tool for a given job."
    ],
    design: [
      "Good design is invisible; learners simply move forward without friction, and that is exactly what we are building toward.",
      "Here we translate theory into practical design decisions for \"{theme}\": structure, sequence, pacing and clarity.",
      "You will study two contrasting examples, diagnose what works, and then redesign a weak sample yourself.",
      "Checklists introduced in this class become your quality-control companions for the rest of the programme.",
      "Expect the post-class assessment to present real design scenarios and ask for your professional judgement."
    ],
    creation: [
      "This is where ideas leave the page and become artefacts your audience can actually learn from.",
      "Following the frameworks from earlier classes, you will plan, draft and refine work connected to \"{theme}\".",
      "Step-by-step demonstrations model professional practice, including how to review your own draft with fresh eyes.",
      "Iteration is the heart of quality; the workflow taught here bakes revision in rather than treating it as failure.",
      "The closing activity asks you to produce a small deliverable, which the knowledge check will reinforce."
    ],
    assessment: [
      "Measurement is not about judgement; it is about knowing what worked, what did not, and what to adjust next.",
      "We close this part of \"{course}\" by examining how to assess progress honestly and give feedback that helps.",
      "Rubrics are introduced as practical instruments that turn vague standards into visible, achievable targets.",
      "You will practise evaluating a sample against a rubric, calibrating your judgement against expert annotations.",
      "Finish by reflecting on your own progress in \"{theme}\" before taking the end-of-class quiz."
    ]
  };

  const QUESTION_BANK = [
    {
      q: "What is the recommended first step when starting a new learning programme?",
      options: [
        "Set a clear personal goal and skim the full course roadmap",
        "Jump straight into the most advanced lesson",
        "Wait until the final week to begin studying",
        "Memorise the reading list without studying it"
      ],
      answer: 0,
      explain: "Clear goals plus a mental map of the journey dramatically increase completion rates."
    },
    {
      q: "Why should principles be understood before jumping into tools?",
      options: [
        "Tools change often, but underlying principles transfer everywhere",
        "Tools are never useful in professional work",
        "Principles are only needed when tools fail",
        "It makes the course longer and harder"
      ],
      answer: 0,
      explain: "Principles are durable; tools come and go. Concept-first learning transfers across platforms."
    },
    {
      q: "A colleague must pick one software tool for a new project. Which criteria set is best?",
      options: [
        "Fit for the task, cost, and how transferable the skill is",
        "Whatever has the most colourful adverts",
        "The newest tool regardless of purpose",
        "Only tools the company already blocks"
      ],
      answer: 0,
      explain: "Fit, cost and transferability are the three practical filters used in this course."
    },
    {
      q: "What makes learning objectives effective?",
      options: [
        "They describe observable, measurable outcomes",
        "They use vague verbs like 'understand' only",
        "They hide the outcome to surprise learners",
        "They list every possible topic exhaustively"
      ],
      answer: 0,
      explain: "Objectives work when they are observable and measurable, guiding both teaching and assessment."
    },
    {
      q: "During content creation, why is iteration treated as part of the workflow?",
      options: [
        "Drafts improve through structured review and revision",
        "First drafts are always perfect",
        "Revision means the original plan failed",
        "It avoids ever finishing anything"
      ],
      answer: 0,
      explain: "Quality emerges through cycles of drafting and reviewing — revision is planned, not punished."
    },
    {
      q: "Which practice best supports honest assessment of progress?",
      options: [
        "Using clear rubrics that make standards visible",
        "Comparing yourself to unrelated professions",
        "Avoiding any measurement until the end",
        "Guessing based on mood alone"
      ],
      answer: 0,
      explain: "Rubrics convert vague expectations into concrete, achievable targets you can self-check against."
    },
    {
      q: "What is the most effective way to give constructive feedback?",
      options: [
        "Be specific, reference criteria, and suggest the next step",
        "Keep comments general so nobody feels judged",
        "Focus only on personality traits",
        "Deliver all criticism at once with no praise"
      ],
      answer: 0,
      explain: "Specific, criteria-referenced feedback with a clear next action is what changes performance."
    },
    {
      q: "How does spacing out study sessions affect learning?",
      options: [
        "Retrieval improves when sessions are spaced over time",
        "It has no measurable effect whatsoever",
        "Cramming once is always superior",
        "Spacing only works for physical skills"
      ],
      answer: 0,
      explain: "Spaced repetition strengthens memory far more than a single marathon session."
    },
    {
      q: "When planning a lesson, sequencing should mostly be driven by:",
      options: [
        "The learner's journey from simple foundations to applied practice",
        "The order topics appear in a search engine",
        "Random selection to keep things surprising",
        "Whatever is easiest for the author to type"
      ],
      answer: 0,
      explain: "Effective sequences build from foundations toward application, matching how learners actually progress."
    },
    {
      q: "Which habit most reliably improves completion of an online course?",
      options: [
        "Scheduling regular short study blocks in your calendar",
        "Waiting for motivation to strike randomly",
        "Studying only on the final deadline day",
        "Switching courses whenever one feels hard"
      ],
      answer: 0,
      explain: "Consistent scheduled blocks beat waiting for motivation — systems outperform moods."
    },
    {
      q: "In digital content creation, 'accessibility' primarily means:",
      options: [
        "Ensuring people of all abilities can perceive and use the content",
        "Making files as large as possible",
        "Using the fewest colours available",
        "Removing all text in favour of images"
      ],
      answer: 0,
      explain: "Accessibility ensures every learner — regardless of ability — can access and benefit from content."
    },
    {
      q: "What role do worked examples play in instruction?",
      options: [
        "They model expert thinking step by step before independent practice",
        "They replace the need for any practice entirely",
        "They are only useful for entertainment",
        "They confuse learners and slow progress"
      ],
      answer: 0,
      explain: "Worked examples scaffold understanding, bridging the gap between theory and independent work."
    },
    {
      q: "Which is the smartest response to receiving a low quiz score?",
      options: [
        "Review mistakes, revisit the material, and attempt it again",
        "Abandon the course immediately",
        "Retake repeatedly without reviewing anything",
        "Assume quizzes are random guesses"
      ],
      answer: 0,
      explain: "Errors are information: reviewing them before retrying turns failure into mastery."
    },
    {
      q: "When designing for online delivery, pacing should:",
      options: [
        "Break material into focused segments with pauses for practice",
        "Deliver everything in one unbroken block",
        "Rush ahead regardless of learner questions",
        "Change speed randomly mid-topic"
      ],
      answer: 0,
      explain: "Segmented pacing with active pauses keeps cognitive load manageable online."
    },
    {
      q: "A portfolio's main purpose is to:",
      options: [
        "Showcase evidence of skills and growth over time",
        "List every course ever started",
        "Hide unfinished experiments permanently",
        "Replace the need for any real work samples"
      ],
      answer: 0,
      explain: "Portfolios curate evidence of ability — quality over quantity, showing growth."
    },
    {
      q: "Which statement about goals is supported by learning research?",
      options: [
        "Specific, written goals increase likelihood of completion",
        "Vague ambitions work just as well as written goals",
        "Goals should never be revisited after setting",
        "Only long-term goals matter; short-term ones distract"
      ],
      answer: 0,
      explain: "Written, specific goals — reviewed regularly — measurably boost follow-through."
    }
  ];

  const lessonsCache = {};

  function lessonCount(course) {
    if (course && course.modules && course.modules.length) {
      return course.modules.reduce(
        (s, m) => s + (m.lessons || []).length + (m.examEnabled && m.exam && (m.exam.questions || []).length ? 1 : 0),
        0
      );
    }
    const weeks = parseInt(String(course.duration), 10);
    const base = isNaN(weeks) ? 4 : weeks + 1;
    return Math.min(6, Math.max(4, base));
  }

  function getLessons(course) {
    if (lessonsCache[course.id]) return lessonsCache[course.id];
    if (course.modules && course.modules.length) {
      return buildModuleLessons(course);
    }
    const n = lessonCount(course);
    const rand = seeded(course.id * 131 + 7);
    const themes = [];
    for (let i = 0; i < n; i++) {
      themes.push(THEME_POOL[Math.min(i, THEME_POOL.length - 1)]);
    }
    const lessons = themes.map((theme, i) => {
      const pool = SENTENCES[theme.focus].slice();
      const picks = [];
      while (picks.length < 3 && pool.length) {
        picks.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
      }
      const paras = picks.map((s) => s.replace("{course}", course.title).replace("{theme}", theme.name.toLowerCase()));
      paras.push("Take a moment to jot down one way you could apply this in your own context this week \u2014 writing it down makes it far more likely to happen.");
      return {
        idx: i,
        title: "Class " + (i + 1) + ": " + theme.name,
        mins: theme.mins + Math.floor(rand() * 10),
        paragraphs: paras
      };
    });
    lessonsCache[course.id] = lessons;
    return lessons;
  }

  function examIntro(mod, course) {
    return [
      "This module exam checks what you have learned across \u201c" + (mod.title || "this module") + "\u201d.",
      "Answer the questions below and score at least " + (Number(mod.exam.passMark) || 70) + "% to pass.",
      "You can retake the exam as many times as you like \u2014 your best score is kept."
    ];
  }

  function buildModuleLessons(course) {
    const lessons = [];
    let idx = 0;
    (course.modules || []).forEach((mod) => {
      (mod.lessons || []).forEach((l) => {
        const lIdx = idx++;
        lessons.push({
          idx: lIdx,
          title: l.title || "Lesson " + (lIdx + 1),
          mins: l.mins || 15,
          isExam: false,
          module: mod,
          video: l.video || { type: "none", url: "" },
          paragraphs: l.content && l.content.length ? l.content.slice() : ["This lesson has no written content yet."],
          passMark: 70
        });
      });
      if (mod.examEnabled && mod.exam && (mod.exam.questions || []).length) {
        const pm = Number(mod.exam.passMark) || 70;
        lessons.push({
          idx: idx++,
          title: mod.exam.title || (mod.title || "Module") + " Exam",
          mins: 20,
          isExam: true,
          module: mod,
          video: { type: "none", url: "" },
          paragraphs: examIntro(mod, course),
          examPassMark: pm,
          passMark: pm
        });
      }
    });
    lessonsCache[course.id] = lessons;
    return lessons;
  }

  const quizCache = {};

  function passMarkFor(lesson) {
    return (lesson && lesson.passMark) || 70;
  }

  function getQuiz(course, lessonIdx) {
    const key = course.id * 100 + lessonIdx;
    if (quizCache[key]) return quizCache[key];
    const lesson = getLessons(course)[lessonIdx];
    if (lesson && lesson.isExam && lesson.module && lesson.module.exam && (lesson.module.exam.questions || []).length) {
      const examQs = lesson.module.exam.questions.map((qo) => {
        const opts = (qo.options || []).slice();
        const ans = Math.min(Math.max(Number(qo.answer) || 0, 0), Math.max(0, opts.length - 1));
        return { q: qo.q, options: opts, answer: ans, explain: qo.explain || "" };
      });
      quizCache[key] = examQs;
      return examQs;
    }
    const rand = seeded(course.id * 997 + lessonIdx * 37 + 11);
    const bank = QUESTION_BANK.slice();
    const picked = [];
    while (picked.length < 5 && bank.length) {
      picked.push(bank.splice(Math.floor(rand() * bank.length), 1)[0]);
    }
    const questions = picked.map((item) => {
      const order = item.options.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      return {
        q: item.q,
        options: order.map((oi) => item.options[oi]),
        answer: order.indexOf(item.answer),
        explain: item.explain
      };
    });
    quizCache[key] = questions;
    return questions;
  }

  /* ---------------- shared progress helpers ---------------- */

  function courseState(course) {
    const total = lessonCount(course);
    const prog = ETH.courseProgress(user.id, course.id);
    return {
      course,
      lessons: getLessons(course),
      total,
      done: prog.done,
      quizzes: prog.quizzes,
      completedAt: prog.completedAt,
      percent: ETH.coursePercent(user.id, course.id, total)
    };
  }

  function firstUnfinished(st) {
    for (const l of st.lessons) {
      if (!st.done.includes(l.idx)) return l.idx;
    }
    return 0;
  }

  function isUnlocked(st, idx) {
    if (idx === 0) return true;
    return st.done.includes(idx - 1);
  }

  /* ---------------- router ---------------- */

  function parseRoute() {
    const hash = location.hash.replace(/^#/, "") || "overview";
    const parts = hash.split("/");
    return { name: parts[0] || "overview", a: parts[1], b: parts[2] };
  }

  function navigate(hash) {
    if (location.hash === hash) {
      render();
    } else {
      location.hash = hash;
    }
  }

  function setActiveNav(name) {
    document.querySelectorAll(".dock-link[data-route]").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("data-route") === name);
    });
    document.title = (TITLES[name] || "Dashboard") + " – EdTech Training Hub";
  }

  function render() {
    const route = parseRoute();
    closeModal();
    if (route.name === "player") {
      const st = getCourse(route.a) && ETH.isEnrolled(user.id, route.a) ? courseState(route.a) : null;
      if (!st) {
        toast("You are not enrolled in that course yet.", true);
        return navigate("#browse");
      }
      setActiveNav("courses");
      renderPlayer(st, route.b);
    } else if (route.name === "overview") {
      setActiveNav("overview");
      renderOverview();
    } else if (route.name === "courses") {
      setActiveNav("courses");
      renderCourses();
    } else if (route.name === "browse") {
      setActiveNav("browse");
      renderBrowse();
    } else if (route.name === "grades") {
      setActiveNav("grades");
      renderGrades();
    } else if (route.name === "access") {
      setActiveNav("access");
      renderAccess();
    } else if (route.name === "certificates") {
      setActiveNav("certificates");
      renderCertificates();
    } else if (route.name === "settings") {
      setActiveNav("settings");
      renderSettings();
    } else {
      navigate("#overview");
    }
    updateBadges();
    paintCartBadge();
    runCountUps(viewRoot);
    window.scrollTo({ top: 0 });
  }

  /* ---------------- views ---------------- */

  function renderOverview() {
    const enrolled = ETH.enrollments(user.id);
    const states = enrolled.map(getCourse).filter(Boolean).map(courseState);
    const completed = states.filter((s) => s.completedAt).length;
    const lessonsDone = states.reduce((sum, s) => sum + s.done.length, 0);
    const avg = ETH.avgBestScore(user.id);
    const inProgress = states.filter((s) => !s.completedAt);
    const cont = inProgress.find((s) => s.done.length > 0) || inProgress[0] || null;
    const activities = ETH.getActivity(user.id);

    let heroBody;
    if (cont) {
      const li = firstUnfinished(cont);
      const lesson = cont.lessons[li];
      heroBody =
        '<div class="mini-course">' +
        '<img src="' + cont.course.image + '" alt="" class="mini-course__thumb">' +
        '<div class="mini-course__body">' +
        '<span class="mini-course__kicker">Continue Learning</span>' +
        '<h3 class="mini-course__title">' + esc(cont.course.title) + "</h3>" +
        '<p class="mini-course__meta">Up next: ' + esc(lesson.title) + " · " + lesson.mins + " min</p>" +
        '<div class="progress-row"><strong>' + cont.percent + "% of course</strong><span>" + cont.done.length + "/" + cont.total + " classes</span></div>" +
        '<div class="progress-track"><div class="progress-fill" style="width:' + cont.percent + '%"></div></div>' +
        '<div class="mini-course__foot">' +
        '<button class="btn btn--primary btn-sm" data-open-course="' + cont.course.id + '" data-open-lesson="' + li + '">' +
        (cont.done.length ? "Resume Class " + (li + 1) : "Start Class 1") + "</button>" +
        '<button class="btn btn--outline btn-sm" data-goto="#courses">All Courses</button>' +
        "</div></div></div>";
    } else if (states.length) {
      heroBody =
        '<div class="empty-state"><h3>All caught up!</h3><p>You have completed every enrolled course. Browse the catalogue to keep growing.</p>' +
        '<button class="btn btn--teal btn-sm" data-goto="#browse">Explore More Courses</button></div>';
    } else {
      heroBody =
        '<div class="empty-state"><h3>Start your first course</h3><p>You have no active courses yet. Pick one from the catalogue and begin today.</p>' +
        '<button class="btn btn--teal btn-sm" data-goto="#browse">Browse Courses</button></div>';
    }

    const avgCirc = 2 * Math.PI * 64;
    const ringTile =
      '<section class="tile t-ring">' +
      '<div class="ring-wrap">' +
      '<div class="ring-lg"><svg width="148" height="148" viewBox="0 0 148 148">' +
      "<defs><linearGradient id=\"avgGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">" +
      '<stop offset="0%" stop-color="#f15a29"/><stop offset="100%" stop-color="#0f6b78"/></linearGradient></defs>' +
      '<circle class="ring-track" cx="74" cy="74" r="64"></circle>' +
      '<circle class="ring-val" cx="74" cy="74" r="64" id="avgRingVal" style="stroke-dasharray:' + avgCirc + ';stroke-dashoffset:' + avgCirc + '"></circle></svg>' +
      '<div class="ring-lg__center"><span class="ring-lg__num"><span id="avgNum" data-count="' + avg + '">0</span>%</span>' +
      '<span class="ring-lg__cap">avg best score</span></div></div>' +
      '<p class="ring-note">Your average across every quiz attempt. Keep it above the 70% pass mark.</p>' +
      "</div></section>";

    const statTile = (mod, icon, num, suffix, label) =>
      '<section class="tile t-stat stat--' + mod + '">' +
      '<span class="stat-ico">' + icon + "</span>" +
      '<div class="stat-num-row"><span class="stat-num" data-count="' + num + '">0</span>' +
      (suffix ? '<span class="stat-suffix">' + suffix + "</span>" : "") + "</div>" +
      '<span class="stat-label">' + label + "</span></section>";

    const snapRows = states.slice(0, 4).map((st) => (
      '<button class="snap-item" data-open-course="' + st.course.id + '">' +
      '<img src="' + st.course.image + '" alt="">' +
      '<span class="snap-item__info"><span class="snap-item__title">' + esc(st.course.title) + "</span>" +
      '<span class="snap-item__bar' + (st.completedAt ? " is-done" : "") + '"><i style="width:' + st.percent + '%"></i></span></span>' +
      '<span class="snap-item__pct">' + st.percent + "%</span>" +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>' +
      "</button>"
    )).join("");

    const activityHTML = activities.length
      ? activities.slice(0, 6).map((a) => (
          '<div class="activity-item"><span class="activity-dot"></span>' +
          '<span class="activity-text">' + esc(a.text) +
          '<span class="activity-time">' + timeAgo(a.ts) + "</span></span></div>"
        )).join("")
      : '<div class="empty-state" style="padding:26px 14px"><h3>No activity yet</h3><p>Your enrolments, quiz passes and completions will appear here.</p></div>';

    viewRoot.innerHTML =
      '<div class="view bento">' +

      '<section class="tile t-hero">' +
      '<div class="greet"><div><h2>' + greeting() + ", <span>" + esc(user.fname) + '</span></h2>' +
      '<p class="greet-sub">' + (completed
        ? completed + " course" + (completed > 1 ? "s" : "") + " completed so far — brilliant work."
        : "Let's make today count. Every expert was once a beginner.") + "</p></div>" +
      '<span class="clock-chip"><i></i><span id="liveClock">–:–</span></span></div>' +
      heroBody +
      "</section>" +

      ringTile +

      statTile("orange", ICONS.book.replace('width="14" height="14"', 'width="22" height="22"'), enrolled.length, "", "Enrolled Courses") +
      statTile("blue", ICONS.checkCircle, lessonsDone, "", "Classes Completed") +
      statTile("gold", ICONS.award, completed, "", "Certificates Earned") +

      '<section class="tile t-snap">' +
      '<div class="panel-head"><h3>My Courses</h3>' +
      (enrolled.length ? '<button class="btn btn--outline btn-sm" data-goto="#courses">View All</button>' : "") +
      "</div>" +
      (snapRows
        ? '<div class="snap-list">' + snapRows + "</div>"
        : '<div class="empty-state" style="padding:26px 14px"><h3>Nothing enrolled yet</h3><p>Courses you join will appear here with live progress bars.</p><button class="btn btn--primary btn-sm" data-goto="#browse">Browse Catalogue</button></div>') +
      "</section>" +

      '<section class="tile t-act">' +
      '<div class="panel-head"><h3>Recent Activity</h3></div>' +
      '<div class="activity-list">' + activityHTML + "</div></section>" +

      "</div>";

    startClock();
    requestAnimationFrame(() => {
      setTimeout(() => {
        const ring = document.getElementById("avgRingVal");
        if (ring) ring.style.strokeDashoffset = String(avgCirc * (1 - Math.min(100, avg) / 100));
      }, 80);
    });
  }

  function courseTile(st) {
    const status = st.completedAt
      ? '<span class="course-tile__status course-tile__status--done">Completed</span>'
      : st.done.length
        ? '<span class="course-tile__status course-tile__status--progress">In Progress</span>'
        : '<span class="course-tile__status course-tile__status--new">Not Started</span>';

    return (
      '<article class="course-tile" data-open-course="' + st.course.id + '">' +
      '<div class="course-tile__thumb-wrap">' +
      '<img src="' + st.course.image + '" alt="" class="course-tile__thumb">' + status + "</div>" +
      '<div class="course-tile__body">' +
      '<h3 class="course-tile__title">' + esc(st.course.title) + "</h3>" +
      '<div class="course-tile__meta"><span>' + ICONS.clock + " " + esc(st.course.duration) + "</span><span>" + ICONS.book + " " + st.total + " classes</span></div>" +
      '<div class="progress-row"><strong>' + st.done.length + " of " + st.total + " classes</strong><span class='" + (st.completedAt ? "is-done" : "") + "'>" + st.percent + "%</span></div>" +
      '<div class="progress-track" style="margin-bottom:16px"><div class="progress-fill ' + (st.completedAt ? "progress-fill--done" : "") + '" style="width:' + st.percent + '%"></div></div>' +
      '<div class="course-tile__foot">' +
      (st.completedAt
        ? '<span class="badge">' + ICONS.award.replace('width="22" height="22"', 'width="13" height="13"') + " Certificate ready</span>"
        : '<span class="badge">' + (st.done.length ? st.total - st.done.length + " classes left" : "Fresh start")) + "</span>" +
      '<button class="btn ' + (st.completedAt ? "btn--teal" : "btn--primary") + ' btn-sm" data-open-course="' + st.course.id + '" data-open-lesson="' + firstUnfinished(st) + '">' +
      (st.completedAt ? "Review Course" : st.done.length ? "Resume" : "Start") + "</button>" +
      "</div></div></article>"
    );
  }

  function renderCourses() {
    const enrolled = ETH.enrollments(user.id);
    const states = enrolled.map(getCourse).filter(Boolean).map(courseState);
    viewRoot.innerHTML =
      '<div class="view">' +
      (states.length
        ? '<div class="grid-2" id="courseGrid">' + states.map(courseTile).join("") + "</div>"
        : '<div class="empty-state"><span class="empty-state__icon">' + ICONS.book + "</span>" +
          "<h3>No courses yet</h3><p>Enrol in a course from the catalogue and it will appear here with your live progress.</p>" +
          '<button class="btn btn--primary" data-goto="#browse">Browse Courses</button></div>') +
      "</div>";
  }

  function renderBrowse() {
    const query = () => (document.getElementById("browseSearch") || {}).value || "";
    viewRoot.innerHTML =
      '<div class="view">' +
      '<div class="search-box">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
      '<input type="text" id="browseSearch" placeholder="Search courses\u2026"></div>' +
      '<div class="grid-2" id="browseGrid"></div></div>';

    const grid = document.getElementById("browseGrid");

    function tileHTML(course) {
      if (course.type === "product") {
        const st = ETH.accessStatus(course.id);
        const applied = st.applied;
        return (
          '<article class="course-tile">' +
          '<div class="course-tile__thumb-wrap"><img src="' + course.image + '" alt="" class="course-tile__thumb"></div>' +
          '<div class="course-tile__body">' +
          '<h3 class="course-tile__title">' + esc(course.title) + "</h3>" +
          '<div class="course-tile__meta"><span>' + ICONS.clock + " " + esc(course.duration) + "</span><span>" + esc(course.format || "Digital Product") + "</span></div>" +
          '<p style="font-size:13.5px;color:var(--muted);margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(course.desc) + "</p>" +
          '<div class="course-tile__foot">' +
          (applied
            ? '<span class="badge badge--pass">Applied</span>'
            : '<strong style="font-family:var(--font-head);color:var(--ink)">From ' + esc(productFrom(course)) + "</strong>") +
          '<button class="btn ' + (applied ? "btn--teal" : "btn--primary") + ' btn-sm" data-get-access="' + course.id + '"' + (applied ? " disabled" : "") + ">" +
          (applied ? "Applied" : "Get Access") + "</button></div></div></article>"
        );
      }
      const enrolledAlready = ETH.isEnrolled(user.id, course.id);
      const st = enrolledAlready ? courseState(course.id) : null;
      const inCart = !enrolledAlready && ETH.cart().indexOf(course.id) !== -1;
      return (
        '<article class="course-tile">' +
        '<div class="course-tile__thumb-wrap"><img src="' + course.image + '" alt="" class="course-tile__thumb"></div>' +
        '<div class="course-tile__body">' +
        '<h3 class="course-tile__title">' + esc(course.title) + "</h3>" +
        '<div class="course-tile__meta"><span>' + ICONS.clock + " " + esc(course.duration) + "</span><span>" + esc(course.level) + "</span></div>" +
        (st
          ? '<div class="progress-row"><strong>' + st.percent + "% complete</strong><span class='" + (st.completedAt ? "is-done" : "") + "'>" + st.done.length + "/" + st.total + "</span></div>" +
            '<div class="progress-track" style="margin-bottom:16px"><div class="progress-fill ' + (st.completedAt ? "progress-fill--done" : "") + '" style="width:' + st.percent + '%"></div></div>' +
            '<div class="course-tile__foot"><span class="badge">Enrolled</span><button class="btn btn--teal btn-sm" data-open-course="' + course.id + '" data-open-lesson="' + firstUnfinished(st) + '">Open</button></div>'
          : '<p style="font-size:13.5px;color:var(--muted);margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(course.desc) + "</p>" +
            '<div class="course-tile__foot">' +
            (inCart
              ? '<span class="badge badge--pass">In Cart</span>'
              : '<strong style="font-family:var(--font-head);color:var(--ink)">' + esc(course.price) + "</strong>") +
            '<button class="btn ' + (inCart ? "btn--teal" : "btn--primary") + ' btn-sm" data-enroll-course="' + course.id + '">' +
            (inCart ? "Pay Now" : "Enroll Now") + "</button></div>") +
        "</div></article>"
      );
    }

    function apply() {
      const q = query().toLowerCase().trim();
      const list = COURSES.filter(
        (c) => !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      );
      grid.innerHTML = list.length
        ? list.map(tileHTML).join("")
        : '<div class="empty-state"><h3>No matches</h3><p>Try a different search term.</p></div>';
    }

    document.getElementById("browseSearch").addEventListener("input", apply);
    apply();
  }

  function renderAccess() {
    const list = ETH.myAccess();
    viewRoot.innerHTML =
      '<div class="view">' +
      '<div class="view-head"><h2>My Access</h2><p>Digital products you\u2019ve applied for \u2014 each recording the format you requested.</p></div>' +
      (list.length
        ? '<div class="stack" id="accessList">' +
          list.map((app) => {
            const course = getCourse(app.courseId);
            return (
              '<div class="access-item">' +
              '<div class="access-item__icon">' + ICONS.bag.replace('width="14" height="14"', 'width="20" height="20"') + "</div>" +
              "<div>" +
              "<h3>" + esc(course ? course.title : app.courseTitle) + "</h3>" +
              '<div class="course-tile__meta"><span>' +
              esc(app.option && app.option.label) +
              (app.option && app.option.price ? " \u00b7 " + esc(app.option.price) : "") +
              "</span><span>" +
              new Date(app.ts).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) +
              "</span></div></div>" +
              '<span class="badge badge--pass">Applied</span>' +
              "</div>"
            );
          }).join("") +
          "</div>"
        : '<div class="empty-state"><span class="empty-state__icon">' + ICONS.bag + "</span>" +
          "<h3>No digital products yet</h3>" +
          "<p>When you apply for a digital product on the catalogue or browse page it appears here as \u201cApplied\u201d.</p>" +
          '<button class="btn btn--primary" data-goto="#browse">Browse Catalogue</button></div>') +
      "</div>";
  }

  function renderGrades() {
    const rows = [];
    ETH.enrollments(user.id).forEach((cid) => {
      const course = getCourse(cid);
      if (!course) return;
      const st = courseState(cid);
      st.lessons.forEach((lesson) => {
        const rec = st.quizzes[lesson.idx];
        if (!rec) return;
        const best = rec.best;
        rows.push({
          course,
          lesson,
          rec,
          best,
          passed: best >= (rec.passMark || 70),
          ts: rec.ts || 0
        });
      });
    });
    rows.sort((a, b) => b.ts - a.ts);

    const taken = rows.length;
    const passed = rows.filter((r) => r.passed).length;
    const avg = taken ? Math.round(rows.reduce((s, r) => s + r.best, 0) / taken) : 0;

    const tableHTML = rows.length
      ? '<div class="table-wrap"><table class="data-table"><thead><tr>' +
        "<th>Course</th><th>Class Quiz</th><th>Best Score</th><th>Attempts</th><th>Status</th><th>Last Attempt</th></tr></thead><tbody>" +
        rows.map((r) => (
          "<tr>" +
          '<td style="max-width:230px"><strong style="color:var(--ink);font-weight:600">' + esc(r.course.title) + "</strong></td>" +
          "<td>" + esc(r.lesson.title.split(":")[0]) + "</td>" +
          '<td><span class="score-pill ' + (r.passed ? "score-pill--pass" : "score-pill--fail") + '"><span class="dot"></span>' + r.best + "%</span></td>" +
          "<td>" + r.rec.attempts + "</td>" +
          '<td><span class="badge ' + (r.passed ? "badge--pass" : "badge--fail") + '">' + (r.passed ? "Passed" : "Needs Retry") + "</span></td>" +
          "<td>" + ETH.fmtDate(r.ts) + "</td>" +
          "</tr>"
        )).join("") +
        "</tbody></table></div>"
      : '<div class="empty-state"><span class="empty-state__icon">' + ICONS.award + "</span>" +
        "<h3>No quiz attempts yet</h3><p>Complete a class and pass its quiz to see scores appear here.</p>" +
        '<button class="btn btn--primary" data-goto="#courses">Go to My Courses</button></div>';

    viewRoot.innerHTML =
      '<div class="view">' +
      '<div class="summary-chips">' +
      '<span class="chip-stat">Quizzes taken <strong>' + taken + "</strong></span>" +
      '<span class="chip-stat">Passed <strong>' + passed + "</strong></span>" +
      '<span class="chip-stat">Overall average <strong>' + avg + "%</strong></span>" +
      '<span class="chip-stat">Pass mark per quiz <strong>70%</strong></span>' +
      "</div>" + tableHTML + "</div>";
  }

  function renderCertificates() {
    const done = ETH.enrollments(user.id).map(getCourse).filter(Boolean).map(courseState).filter((s) => s.completedAt);
    viewRoot.innerHTML =
      '<div class="view">' +
      (done.length
        ? '<div class="cert-grid">' + done.map((s) => (
            '<div class="cert-card">' +
            '<span class="cert-card__seal">' + ICONS.award + "</span>" +
            "<h4>" + esc(s.course.title) + "</h4>" +
            '<p class="cert-card__date">Completed ' + ETH.fmtDate(s.completedAt) + "</p>" +
            '<button class="btn btn--primary btn-sm" data-cert="' + s.course.id + '">View Certificate</button>' +
            "</div>"
          )).join("") + "</div>"
        : '<div class="empty-state"><span class="empty-state__icon">' + ICONS.award + "</span>" +
          "<h3>No certificates yet</h3><p>Complete all classes and pass every quiz in a course to earn a printable certificate.</p>" +
          '<button class="btn btn--primary" data-goto="#courses">Continue Learning</button></div>') +
      "</div>";
  }

  function renderSettings() {
    viewRoot.innerHTML =
      '<div class="view"><div class="settings-grid">' +
      '<section class="panel">' +
      '<div class="settings-avatar"><span class="avatar" id="settingsAvatar">' + esc(ETH.initials(user)) + "</span>" +
      "<div><h4>" + esc(user.fname + " " + user.lname) + "</h4><p>Student since " + ETH.fmtDate(user.createdAt) + "</p></div></div>" +
      '<div class="form-alert" id="profileAlert"></div>' +
      '<form id="profileForm" novalidate>' +
      '<div class="form-row"><div class="form-group"><label class="form-label" for="set-fname">First Name</label>' +
      '<input class="form-control" id="set-fname" value="' + esc(user.fname) + '"></div>' +
      '<div class="form-group"><label class="form-label" for="set-lname">Last Name</label>' +
      '<input class="form-control" id="set-lname" value="' + esc(user.lname) + '"></div></div>' +
      '<div class="form-group"><label class="form-label" for="set-email">Email Address</label>' +
      '<input class="form-control" type="email" id="set-email" value="' + esc(user.email) + '"></div>' +
      '<div class="form-group"><label class="form-label" for="set-phone">Phone Number</label>' +
      '<input class="form-control" type="tel" id="set-phone" value="' + esc(user.phone || "") + '"></div>' +
      '<button class="btn btn--primary btn-sm" type="submit">Save Changes</button></form></section>' +

      '<section class="panel"><div class="panel-head"><h3>Change Password</h3></div>' +
      '<div class="form-alert" id="passAlert"></div>' +
      '<form id="passwordForm" novalidate>' +
      '<div class="form-group"><label class="form-label" for="set-current">Current Password</label>' +
      '<div class="pass-wrap"><input class="form-control" type="password" id="set-current">' +
      '<button type="button" class="pass-toggle" data-target="set-current" aria-label="Show password">' + eyeSVG() + "</button></div></div>" +
      '<div class="form-group"><label class="form-label" for="set-new">New Password</label>' +
      '<div class="pass-wrap"><input class="form-control" type="password" id="set-new">' +
      '<button type="button" class="pass-toggle" data-target="set-new" aria-label="Show password">' + eyeSVG() + "</button></div></div>" +
      '<div class="form-group"><label class="form-label" for="set-confirm">Confirm New Password</label>' +
      '<div class="pass-wrap"><input class="form-control" type="password" id="set-confirm">' +
      '<button type="button" class="pass-toggle" data-target="set-confirm" aria-label="Show password">' + eyeSVG() + "</button></div></div>" +
      '<button class="btn btn--teal btn-sm" type="submit">Update Password</button></form></section>' +
      "</div></div>";

    ETH.bindPasswordToggles(viewRoot);

    document.getElementById("profileForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fname = document.getElementById("set-fname").value.trim();
      const lname = document.getElementById("set-lname").value.trim();
      const email = document.getElementById("set-email").value.trim().toLowerCase();
      const phone = document.getElementById("set-phone").value.trim();

      if (!fname || !lname) return ETH.showAlert("profileAlert", "error", "Please enter your full name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return ETH.showAlert("profileAlert", "error", "Please enter a valid email address.");
      if (email !== user.email) {
        const existing = JSON.parse(localStorage.getItem("eth_users") || "[]").find((u) => u.email === email && u.id !== user.id);
        if (existing) return ETH.showAlert("profileAlert", "error", "That email is already used by another account.");
      }
      if (!phone) return ETH.showAlert("profileAlert", "error", "Please enter your phone number.");

      ETH.updateUser(user.id, { fname, lname, email, phone });
      Object.assign(user, { fname, lname, email, phone });
      paintUserChrome();
      ETH.showAlert("profileAlert", "success", "Profile updated successfully.");
      toast("Profile saved.");
    });

    document.getElementById("passwordForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const current = document.getElementById("set-current").value;
      const next = document.getElementById("set-new").value;
      const confirm = document.getElementById("set-confirm").value;

      if (current !== user.password) return ETH.showAlert("passAlert", "error", "Your current password is incorrect.");
      if (next.length < 8) return ETH.showAlert("passAlert", "error", "New password must be at least 8 characters.");
      if (next !== confirm) return ETH.showAlert("passAlert", "error", "New passwords do not match.");

      ETH.updateUser(user.id, { password: next });
      user.password = next;
      e.target.reset();
      ETH.showAlert("passAlert", "success", "Password updated successfully.");
      toast("Password changed.");
    });
  }

  function eyeSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
  }

  /* ---------------- course player ---------------- */

  function youtubeID(url) {
    const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : null;
  }

  function videoHTML(lesson) {
    if (!lesson || lesson.isExam) return "";
    const v = lesson.video || { type: "none", url: "" };
    if (v.type === "url" && v.url) {
      const yt = youtubeID(v.url);
      if (yt) {
        return (
          '<div class="lesson-video-wrap">' +
          '<iframe class="lesson-video" src="https://www.youtube.com/embed/' + yt + '" title="Lesson video" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
          "</div>"
        );
      }
      return '<div class="lesson-video-wrap"><video class="lesson-video" src="' + esc(v.url) + '" controls preload="metadata"></video></div>';
    }
    if (v.type === "file" && v.src) {
      return '<div class="lesson-video-wrap"><video class="lesson-video" src="' + esc(v.src) + '" controls preload="metadata"></video></div>';
    }
    return (
      '<div class="lesson-video-empty">' +
      ICONS.play +
      "<span>Video coming soon</span>" +
      (v.fileName ? "<p>Attached file: " + esc(v.fileName) + "</p>" : "<p>This lesson has no video yet \u2014 the written notes below are the lesson.</p>") +
      "</div>"
    );
  }

  function renderPlayer(st, lessonParam) {
    let current = parseInt(lessonParam, 10);
    if (isNaN(current) || !st.lessons[current]) current = firstUnfinished(st);
    const lesson = st.lessons[current];
    const modeLabel = lesson.isExam
      ? "Module exam"
      : lesson.video && lesson.video.type && lesson.video.type !== "none"
        ? "Self-paced video + notes"
        : "Self-paced notes";

    const itemsHTML = st.lessons.map((l) => {
      const rec = st.quizzes[l.idx];
      const passed = st.done.includes(l.idx);
      const unlocked = isUnlocked(st, l.idx);
      const cls = ["lesson-item", passed ? "is-passed" : "", l.idx === current ? "is-current" : "", unlocked ? "" : "is-locked"].join(" ");
      return (
        '<button class="' + cls + '" data-lesson-jump="' + l.idx + '"' + (unlocked ? "" : " disabled") + ">" +
        '<span class="lesson-num">' + (passed ? ICONS.check.replace('width="18" height="18"', 'width="14" height="14"') : l.idx + 1) + "</span>" +
        '<span class="lesson-info"><span class="lesson-name">' + esc(l.title) + "</span>" +
        '<span class="lesson-sub">' + l.mins + " min \u00b7 " + (l.isExam ? "module exam" : "quiz required") + "</span></span>" +
        (rec
          ? '<span class="lesson-score' + (rec.best < passMarkFor(l) ? " lesson-score--fail" : "") + '">' + rec.best + "%</span>"
          : unlocked ? "" : ICONS.lock) +
        "</button>"
      );
    }).join("");

    const passed = st.done.includes(current);
    const locked = !isUnlocked(st, current);
    const prevBtn = current > 0
      ? '<button class="btn btn--outline btn-sm" data-lesson-jump="' + (current - 1) + '">&larr; Previous Class</button>'
      : "";
    const nextIdx = current + 1 < st.total ? current + 1 : null;

    viewRoot.innerHTML =
      '<div class="view player">' +
      '<div class="player-back"><button class="btn btn--outline btn-sm" data-goto="#courses">&larr; All My Courses</button></div>' +
      '<aside class="panel" style="padding:18px">' +
      '<div class="progress-row" style="margin-bottom:10px"><strong>Course progress</strong><span>' + st.percent + "%</span></div>" +
      '<div class="progress-track" style="margin-bottom:18px"><div class="progress-fill ' + (st.completedAt ? "progress-fill--done" : "") + '" style="width:' + st.percent + '%"></div></div>' +
      '<nav class="lesson-list">' + itemsHTML + "</nav></aside>" +

      '<article class="panel lesson-body lesson-content">' +
      "<h2>" + esc(lesson.title) + "</h2>" +
      '<div class="lesson-content__meta"><span>' + ICONS.clock + " " + lesson.mins + " minutes</span><span>" + ICONS.play + " " + modeLabel + "</span><span>" + ICONS.checkCircle + (passed ? " Completed · best " + (st.quizzes[current].best) + "%" : " Quiz pending") + "</span></div>" +
      videoHTML(lesson) +
      '<div class="lesson-prose">' + lesson.paragraphs.map((p) => "<p>" + esc(p) + "</p>").join("") + "</div>" +
      (locked
        ? '<div class="complete-banner">' + ICONS.lock + "<p>This class unlocks after you pass the previous class quiz.</p></div>"
        : "") +
      (passed
        ? '<div class="complete-banner">' + ICONS.checkCircle + "<p>Well done! You passed this class quiz with " + st.quizzes[current].best + "%. You can retake it anytime to improve your best score.</p></div>"
        : "") +
      (st.completedAt
        ? '<div class="complete-banner">' + ICONS.award + "<p>You have completed this entire course! Your certificate is ready.</p>" +
          '<button class="btn btn--teal btn-sm" style="margin-left:auto" data-cert="' + st.course.id + '">View Certificate</button></div>'
        : "") +
      '<div class="lesson-actions">' +
      prevBtn +
      (locked
        ? ""
        : '<button class="btn btn--primary" id="takeQuizBtn">' + (passed ? "Retake Quiz" : "Mark Complete &amp; Take Quiz") + "</button>") +
      (nextIdx !== null && passed
        ? '<button class="btn btn--teal" data-lesson-jump="' + nextIdx + '">Next Class &rarr;</button>'
        : "") +
      '<span style="flex:1"></span>' +
      "</div></article></div>";
  }

  /* ---------------- quiz engine ---------------- */

  function closeModal() {
    modalRoot.innerHTML = "";
    document.body.style.overflow = "";
  }

  function openQuiz(st, lessonIdx) {
    const lesson = st.lessons[lessonIdx];
    const questions = getQuiz(st.course, lessonIdx);
    const quiz = { st, lessonIdx, lesson, questions, cur: 0, correct: 0, answers: [] };
    document.body.style.overflow = "hidden";

    modalRoot.innerHTML =
      '<div class="quiz-overlay" id="quizOverlay">' +
      '<div class="quiz-sheet" role="dialog" aria-modal="true" aria-label="Class quiz">' +
      '<div class="quiz-head"><div><div class="quiz-head__title">' + esc(st.course.title) + "</div>" +
      '<div class="quiz-head__sub">' + esc(lesson.title) + "</div></div>" +
      '<button class="quiz-x" id="quizClose" aria-label="Close quiz">' + ICONS.x + "</button></div>" +
      '<div class="quiz-body" id="quizBody"></div>' +
      "</div></div>";

    document.getElementById("quizClose").addEventListener("click", () => {
      closeModal();
      render();
    });

    renderQuizIntro(quiz);
  }

  function renderQuizIntro(quiz) {
    const best = quiz.st.quizzes[quiz.lessonIdx];
    const qty = quiz.questions.length;
    const passMark = passMarkFor(quiz.lesson);
    document.getElementById("quizBody").innerHTML =
      '<div class="result-wrap">' +
      '<span class="cert-card__seal" style="margin-bottom:20px">' + ICONS.award + "</span>" +
      '<h2 style="margin-bottom:8px;font-size:24px">' + esc(quiz.lesson.title.split(":")[0]) + " Quiz</h2>" +
      '<p class="result-sub">' + qty + " multiple-choice question" + (qty === 1 ? "" : "s") + " covering this " + (quiz.lesson.isExam ? "module." : "class.") + ' Score at least <strong style="color:var(--ink)">' + passMark + "%</strong> to mark it complete and unlock the next one.</p>" +
      '<div class="summary-chips" style="justify-content:center;margin-bottom:26px">' +
      '<span class="chip-stat">Questions <strong>' + qty + "</strong></span>" +
      '<span class="chip-stat">Pass mark <strong>' + passMark + "%</strong></span>" +
      '<span class="chip-stat">Attempts so far <strong>' + (best ? best.attempts : 0) + "</strong></span>" +
      (best ? '<span class="chip-stat">Best score <strong>' + best.best + "%</strong></span>" : "") +
      "</div>" +
      '<button class="btn btn--primary btn--lg" id="quizStart">Start Quiz</button>' +
      "</div>";

    document.getElementById("quizStart").addEventListener("click", () => renderQuestion(quiz));
  }

  function renderQuestion(quiz) {
    const q = quiz.questions[quiz.cur];
    const dots = quiz.questions.map((_, i) =>
      '<i class="' + (i < quiz.cur ? "is-done" : i === quiz.cur ? "is-current" : "") + '"></i>'
    ).join("");

    document.getElementById("quizBody").innerHTML =
      '<div class="quiz-progress">' + dots + "</div>" +
      '<div class="quiz-q-count">Question ' + (quiz.cur + 1) + " of " + quiz.questions.length + "</div>" +
      '<h3 class="quiz-question">' + esc(q.q) + "</h3>" +
      '<div class="quiz-options">' +
      q.options.map((opt, i) => (
        '<button class="quiz-option" data-opt="' + i + '"><span class="opt-key">' + "ABCD"[i] + "</span><span>" + esc(opt) + "</span></button>"
      )).join("") +
      "</div>" +
      '<div id="quizFeedback"></div>' +
      '<div class="quiz-actions" id="quizActions"></div>';

    document.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => selectAnswer(quiz, q, Number(btn.dataset.opt)));
    });
  }

  function selectAnswer(quiz, q, choice) {
    const buttons = document.querySelectorAll(".quiz-option");
    buttons.forEach((b) => (b.disabled = true));
    const good = choice === q.answer;
    quiz.answers.push(choice);
    if (good) quiz.correct++;

    buttons.forEach((b) => {
      const i = Number(b.dataset.opt);
      if (i === q.answer) b.classList.add("is-correct");
      else if (i === choice) b.classList.add("is-wrong");
      else b.classList.add("is-dim");
    });

    document.getElementById("quizFeedback").innerHTML =
      '<div class="quiz-feedback ' + (good ? "quiz-feedback--ok" : "quiz-feedback--no") + '">' +
      "<strong>" + (good ? "Correct!" : "Not quite.") + "</strong> " + esc(q.explain) + "</div>";

    const last = quiz.cur === quiz.questions.length - 1;
    document.getElementById("quizActions").innerHTML =
      '<button class="btn btn--primary" id="quizNext">' + (last ? "See My Results" : "Next Question &rarr;") + "</button>";

    document.getElementById("quizNext").addEventListener("click", () => {
      if (last) finishQuiz(quiz);
      else {
        quiz.cur++;
        renderQuestion(quiz);
      }
    });
  }

  function finishQuiz(quiz) {
    const pct = Math.round((quiz.correct / quiz.questions.length) * 100);
    const passMark = passMarkFor(quiz.lesson);
    const passed = pct >= passMark;

    let result = { best: pct, passed, justCompleted: false };
    if (passed) {
      result = ETH.passQuiz(
        user.id,
        quiz.st.course.id,
        quiz.lessonIdx,
        pct,
        quiz.st.total,
        quiz.lesson.title,
        quiz.st.course.title,
        passMark
      );
    } else {
      ETH.recordFailedAttempt(user.id, quiz.st.course.id, quiz.lessonIdx);
    }

    const fresh = courseState(quiz.st.course.id);
    Object.assign(quiz.st, fresh);

    const circumference = 2 * Math.PI * 68;
    const reviewHTML = quiz.questions.map((q, i) => {
      const ok = quiz.answers[i] === q.answer;
      return (
        '<div class="review-item ' + (ok ? "is-ok" : "is-no") + '">' +
        '<span class="review-icon" style="color:' + (ok ? "var(--teal)" : "var(--orange-dark)") + '">' +
        (ok ? ICONS.check.replace('width="18" height="18"', 'width="16" height="16"') : ICONS.x) + "</span>" +
        "<span><strong style='color:var(--ink)'>Q" + (i + 1) + ".</strong> " + esc(q.q) +
        (ok ? "" : "<br><em>Correct answer:</em> " + esc(q.options[q.answer])) + "</span></div>"
      );
    }).join("");

    const hasNext = quiz.lessonIdx + 1 < quiz.st.total;

    document.getElementById("quizBody").innerHTML =
      '<div class="result-wrap">' +
      '<div class="ring-holder"><svg width="158" height="158" viewBox="0 0 158 158">' +
      '<defs><linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="' + (passed ? "#0f6b78" : "#d9491c") + '"/>' +
      '<stop offset="100%" stop-color="' + (passed ? "#3a97a5" : "#f15a29") + '"/></linearGradient></defs>' +
      '<circle class="ring-bg" cx="79" cy="79" r="68"></circle>' +
      '<circle class="ring-val" cx="79" cy="79" r="68" id="ringVal"></circle></svg>' +
      '<div class="ring-center"><div><strong id="ringPct">0%</strong><small>' + quiz.correct + " of " + quiz.questions.length + " correct</small></div></div></div>" +
      '<div><span class="result-verdict ' + (passed ? "result-verdict--pass" : "result-verdict--fail") + '">' +
      (passed ? ICONS.checkCircle + " Passed" : ICONS.info + " Below pass mark") + "</span></div>" +
      '<p class="result-sub" style="margin-top:14px">' +
      (result.justCompleted
        ? "Congratulations! You have finished every class in this course \u2014 your certificate has been unlocked."
        : passed
          ? "Class marked complete. Keep the momentum going!"
          : "You need " + passMark + "% to pass this " + (quiz.lesson.isExam ? "module exam" : "class") + ". Review the feedback above and try again \u2014 your best score is kept.") +
      "</p>" +
      '<details style="text-align:left;margin-bottom:22px"><summary style="cursor:pointer;font-weight:600;font-family:var(--font-head);color:var(--blue);font-size:14px">Review answers</summary>' +
      '<div class="review-list" style="margin-top:12px">' + reviewHTML + "</div></details>" +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
      (passed
        ? hasNext
          ? '<button class="btn btn--teal" id="quizAdvance">Continue to Next Class</button>'
          : '<button class="btn btn--teal" data-cert="' + quiz.st.course.id + '" id="quizCert">View My Certificate</button>'
        : '<button class="btn btn--primary" id="quizRetake">Retake Quiz</button>') +
      '<button class="btn btn--outline" id="quizDone">Back to Course</button>' +
      "</div></div>";

    requestAnimationFrame(() => {
      setTimeout(() => {
        const ring = document.getElementById("ringVal");
        ring.style.strokeDashoffset = String(circumference * (1 - pct / 100));
        let shown = 0;
        const step = Math.max(1, Math.round(pct / 32));
        const timer = setInterval(() => {
          shown = Math.min(pct, shown + step);
          document.getElementById("ringPct").textContent = shown + "%";
          if (shown >= pct) clearInterval(timer);
        }, 30);
      }, 60);
    });

    const advanceTarget = document.getElementById("quizAdvance");
    if (advanceTarget) {
      advanceTarget.addEventListener("click", () => {
        closeModal();
        navigate("#player/" + quiz.st.course.id + "/" + (quiz.lessonIdx + 1));
      });
    }
    const certBtn = document.getElementById("quizCert");
    if (certBtn) certBtn.addEventListener("click", () => { closeModal(); });
    const retake = document.getElementById("quizRetake");
    if (retake) retake.addEventListener("click", () => {
      quiz.cur = 0;
      quiz.correct = 0;
      quiz.answers = [];
      renderQuizIntro(quiz);
    });
    document.getElementById("quizDone").addEventListener("click", () => {
      closeModal();
      render();
    });

    if (result.justCompleted) {
      toast("Course completed! Your certificate is ready.");
      confettiBurst(true);
    } else if (passed) {
      toast("Quiz passed with " + pct + "%. Class complete!");
      confettiBurst(false);
    }
  }

  /* ---------------- certificate ---------------- */

  function openCertificate(courseId) {
    const st = courseState(courseId);
    if (!st.completedAt) return;
    const scores = st.lessons.map((l) => (st.quizzes[l.idx] || {}).best || 0);
    const finalScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    let tpl = null;
    if (ETH.readCertTemplate) {
      try { tpl = ETH.readCertTemplate(courseId); } catch (e) {}
    }

    const holder = document.createElement("div");
    holder.className = "cert-overlay";
    holder.id = "certOverlay";

    const certInner = tpl && tpl.dataUrl
      ? '<div class="certificate certificate--tpl" id="certPrint"><div class="cert-tpl-box">' +
        (String(tpl.dataUrl).indexOf("data:application/pdf") === 0
          ? '<iframe src="' + esc(tpl.dataUrl) + '" title="Certificate template"></iframe>'
          : '<img src="' + esc(tpl.dataUrl) + '" alt="Certificate template">') +
        "</div></div>"
      : '<div class="certificate" id="certPrint">' +
        '<div class="cert-logo-row"><img src="images/logo/Logo.jpeg" alt=""><span class="cert-org">EdTech Training Hub Ltd<small>Learn · Teach · Create · Thrive</small></span></div>' +
        '<div class="cert-title">Certificate of Completion</div>' +
        '<div class="cert-line"></div>' +
        '<p class="cert-preamble">This is to certify that</p>' +
        '<div class="cert-name">' + esc(user.fname + " " + user.lname) + "</div>" +
        '<div class="cert-rule"></div>' +
        '<p class="cert-preamble">has successfully completed all classes and assessments of the course</p>' +
        '<div class="cert-course">' + esc(st.course.title) + "</div>" +
        '<p class="cert-preamble">with a final average score of <strong>' + finalScore + "%</strong></p>" +
        '<div class="cert-meta">' +
        "<div><strong>" + ETH.fmtDate(st.completedAt) + "</strong>Date of Completion</div>" +
        '<span class="cert-seal">\u2713</span>' +
        "<div><strong>" + finalScore + "%</strong>Final Score</div>" +
        "</div></div>";

    holder.innerHTML =
      certInner +
      '<div class="cert-toolbar">' +
      (tpl && tpl.dataUrl
        ? '<a class="btn btn--primary btn-sm" href="' + esc(tpl.dataUrl) + '" download="' + esc(tpl.fileName || "certificate") + '">Download Certificate</a>'
        : '<button class="btn btn--primary btn-sm" onclick="window.print()">Download / Print</button>') +
      '<button class="btn btn--outline-light btn-sm" id="certClose">Close</button></div>';

    document.body.appendChild(holder);
    holder.querySelector("#certClose").addEventListener("click", () => holder.remove());
    holder.addEventListener("click", (e) => {
      if (e.target === holder) holder.remove();
    });
  }

  /* ---------------- chrome / events ---------------- */

  function paintUserChrome() {
    const ini = ETH.initials(user);
    const fullName = user.fname + " " + user.lname;
    document.getElementById("topAvatar").textContent = ini;
    document.getElementById("topName").textContent = user.fname;
    document.getElementById("menuName").textContent = fullName;
    document.getElementById("menuEmail").textContent = user.email;
  }

  function updateBadges() {
    const enrolled = ETH.enrollments(user.id).map(getCourse).filter(Boolean).map(courseState);
    document.getElementById("navCourseCount").textContent = enrolled.filter((s) => !s.completedAt).length;
    document.getElementById("navCertCount").textContent = enrolled.filter((s) => s.completedAt).length;
  }

  const avatarBtn = document.getElementById("avatarBtn");
  const userMenu = document.getElementById("userMenu");

  avatarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = userMenu.classList.toggle("is-open");
    avatarBtn.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dash-user")) {
      userMenu.classList.remove("is-open");
      avatarBtn.setAttribute("aria-expanded", "false");
    }
  });

  function doLogout() {
    ETH.logout();
  }

  document.getElementById("menuLogout").addEventListener("click", doLogout);
  document.getElementById("dashCartBtn").addEventListener("click", openCartDrawer);

  document.body.addEventListener("click", (e) => {
    if (e.target.closest("#takeQuizBtn")) {
      const route = parseRoute();
      openQuiz(courseState(route.a), Number(route.b));
      return;
    }

    const gotoEl = e.target.closest("[data-goto]");
    if (gotoEl) {
      e.preventDefault();
      userMenu.classList.remove("is-open");
      avatarBtn.setAttribute("aria-expanded", "false");
      navigate(gotoEl.getAttribute("data-goto"));
      return;
    }

    const openCourse = e.target.closest("[data-open-course]");
    if (openCourse) {
      const lid = openCourse.getAttribute("data-open-lesson");
      navigate("#player/" + openCourse.getAttribute("data-open-course") + (lid != null && lid !== "" ? "/" + lid : ""));
      return;
    }

    const jump = e.target.closest("[data-lesson-jump]");
    if (jump && !jump.disabled) {
      navigate("#player/" + parseRoute().a + "/" + jump.getAttribute("data-lesson-jump"));
      return;
    }

    const enrollBtn = e.target.closest("[data-enroll-course]");
    if (enrollBtn) {
      const cid = Number(enrollBtn.getAttribute("data-enroll-course"));
      const course = getCourse(cid);
      if (course && !ETH.isEnrolled(user.id, cid)) {
        ETH.cartAdd(cid);
        paintCartBadge();
        openCheckout([cid], false);
      }
      return;
    }

    const accessBtn = e.target.closest("[data-get-access]");
    if (accessBtn) {
      if (accessBtn.disabled) return;
      const course = getCourse(Number(accessBtn.getAttribute("data-get-access")));
      if (course) ETH.showAccessModal(course);
      return;
    }

    const certBtn = e.target.closest("[data-cert]");
    if (certBtn) {
      openCertificate(Number(certBtn.getAttribute("data-cert")));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const pay = document.getElementById("payOverlay");
      if (pay) closePayModal();
      else if (document.querySelector(".quiz-overlay")) {
        closeModal();
        render();
      }
      const cert = document.getElementById("certOverlay");
      if (cert) cert.remove();
      closeCartDrawer();
      userMenu.classList.remove("is-open");
      avatarBtn.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("hashchange", render);

  initTheme();

  paintUserChrome();
  render();
})();
