/* EdTech Training Hub — Admin Panel application. */
(function () {
  "use strict";

  var S = window.ETH_ADMIN;
  var appView = document.getElementById("adminView");
  var modalRoot = document.getElementById("modalRoot");
  var toastRoot = document.getElementById("toastRoot");

  if (!S.requireAdmin || !S.isLoggedIn()) {
    window.location.replace("login.html");
    return;
  }

  var TITLES = {
    overview: "Overview",
    courses: "Courses & Modules",
    course: "Course Editor",
    students: "Students",
    certificates: "Certificates",
    blog: "Blog",
    settings: "Settings"
  };

  var ICONS = {
    dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
    book: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    award: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
    settings: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    add: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
    edit: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
    dup: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    trash: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    eye: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    up: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
    down: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>',
    alert: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    bag: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l2 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></svg>',
    download: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    upload: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    logout: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
    sun: '<svg class="tt-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    moon: '<svg class="tt-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
  };

  /* ---------------- helpers ---------------- */

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function timeAgo(ts) {
    if (!ts) return "";
    var diff = Date.now() - ts;
    var mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return mins + " min ago";
    var hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + " hr ago";
    var days = Math.floor(hrs / 24);
    if (days < 7) return days + " day" + (days > 1 ? "s" : "") + " ago";
    return fmtDate(ts);
  }

  function fmtDate(ts) {
    if (!ts) return "\u2014";
    var d = new Date(ts);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function initials(name) {
    name = String(name || "").trim();
    if (!name) return "A";
    return name.split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
  }

  function toast(msg, isError) {
    var el = document.createElement("div");
    el.className = "a-toast" + (isError ? " a-toast--error" : "");
    el.innerHTML = (isError ? ICONS.alert : ICONS.check) + "<span>" + msg + "</span>";
    toastRoot.appendChild(el);
    setTimeout(function () {
      el.classList.add("is-out");
      setTimeout(function () { el.remove(); }, 300);
    }, 3600);
  }

  function openModal(html) {
    closeModal();
    var div = document.createElement("div");
    div.className = "a-overlay";
    div.id = "aOverlay";
    div.innerHTML = html;
    modalRoot.appendChild(div);
    div.addEventListener("mousedown", function (e) {
      if (e.target === div) closeModal();
    });
    return div;
  }

  function closeModal() {
    modalRoot.innerHTML = "";
  }

  function confirmModal(opts) {
    openModal(
      '<div class="a-modal" role="dialog" aria-modal="true">' +
      '<div class="a-modal__head"><h3>' + esc(opts.title || "Confirm") + "</h3>" +
      '<button class="icon-btn" data-modal-x aria-label="Close">' + ICONS.x + "</button></div>" +
      '<div class="a-modal__body"><p style="margin:0;font-size:14px;line-height:1.6;color:var(--a-ink-soft)">' + opts.body + "</p></div>" +
      '<div class="a-modal__foot">' +
      '<button class="a-btn a-btn--ghost" data-modal-cancel>Cancel</button>' +
      '<button class="a-btn ' + (opts.okClass || "a-btn--primary") + '" data-modal-ok>' + esc(opts.okLabel || "Confirm") + "</button>" +
      "</div></div>"
    );
    var overlay = document.getElementById("aOverlay");
    overlay.querySelector("[data-modal-ok]").addEventListener("click", function () {
      closeModal();
      if (opts.onOk) opts.onOk();
    });
    overlay.querySelector("[data-modal-cancel]").addEventListener("click", closeModal);
    overlay.querySelector("[data-modal-x]").addEventListener("click", closeModal);
  }

  /* ---------------- chrome ---------------- */

  function paintChrome() {
    var acc = S.getAccount();
    document.getElementById("adminName").textContent = acc.username;
    document.getElementById("adminAvatar").textContent = initials(acc.username);
  }

  function paintStorage() {
    var r = S.storageReport();
    var mb = (r.usedBytes / (1024 * 1024)).toFixed(2);
    var pct = r.limitBytes ? Math.min(100, Math.round((r.usedBytes / r.limitBytes) * 100)) : 0;
    var chip = document.getElementById("storageChip");
    var dot = document.getElementById("storageDot");
    var text = document.getElementById("storageText");
    chip.classList.toggle("is-warn", pct > 70 && pct <= 95);
    chip.classList.toggle("is-full", pct > 95);
    text.textContent = mb + " MB used";
    var side = document.getElementById("sideStorage");
    if (side) side.textContent = "Storage: " + mb + " MB / ~5 MB";
  }

  function applyTheme(t) {
    document.body.setAttribute("data-theme", t);
    try { localStorage.setItem("eth_admin_theme", t); } catch (e) {}
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("eth_admin_theme"); } catch (e) {}
    applyTheme(saved || "light");
    document.getElementById("themeToggle").addEventListener("click", function () {
      applyTheme(document.body.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  function setActiveNav(name) {
    var base = name === "course" ? "courses" : name;
    document.querySelectorAll(".a-nav a[data-route]").forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-route") === base);
    });
    document.getElementById("topTitle").textContent = TITLES[name] || TITLES.overview;
    document.title = TITLES[name] + " – EdTech Admin";
  }

  /* ---------------- router ---------------- */

  function parseRoute() {
    var hash = location.hash.replace(/^#/, "") || "overview";
    var parts = hash.split("/");
    return { name: parts[0] || "overview", a: parts[1], b: parts[2] };
  }

  function navigate(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  }

  function render() {
    var route = parseRoute();
    closeModal();
    if (route.name === "overview") { setActiveNav("overview"); renderOverview(); }
    else if (route.name === "courses") { setActiveNav("courses"); renderCourses(); }
    else if (route.name === "course") { setActiveNav("course"); renderCourseEditor(route.a); }
    else if (route.name === "students") { setActiveNav("students"); renderStudents(); }
    else if (route.name === "certificates") { setActiveNav("certificates"); renderCertificates(); }
    else if (route.name === "blog") { setActiveNav("blog"); renderBlog(); }
    else if (route.name === "settings") { setActiveNav("settings"); renderSettings(); }
    else navigate("#overview");
    paintStorage();
    window.scrollTo({ top: 0 });
  }

  /* ---------------- overview ---------------- */

  function statCard(iconMod, svg, num, label, extra) {
    return (
      '<div class="stat-card">' +
      '<div class="stat-card__top"><span class="stat-card__num">' + num + "</span>" +
      '<span class="stat-card__icon stat-card__icon--' + iconMod + '">' + svg + "</span></div>" +
      '<div class="stat-card__label">' + label + "</div>" +
      (extra ? '<div class="stat-card__extra">' + extra + "</div>" : "") +
      "</div>"
    );
  }

  function coursePriceNum(courseId) {
    var c = S.getCourse(courseId);
    if (c && Number(c.priceNum)) return Number(c.priceNum);
    var statics = S.staticCourses();
    for (var i = 0; i < statics.length; i++) {
      if (Number(statics[i].id) === Number(courseId)) {
        return Number(statics[i].priceNum) || (parseInt(String(statics[i].price || "").replace(/[^\d]/g, ""), 10) || 0);
      }
    }
    return 0;
  }

  function renderOverview() {
    var es = S.enrollmentStats();
    var catalog = S.listCatalog();
    var published = catalog.filter(function (c) { return c.published !== false; });
    var summary = { modules: 0, lessons: 0, exams: 0 };
    catalog.forEach(function (c) {
      (c.modules || []).forEach(function (m) {
        summary.modules++;
        summary.lessons += (m.lessons || []).length;
        if (m.examEnabled) summary.exams++;
      });
    });

    var revenue = 0;
    var enroll = S.allEnrollments();
    Object.keys(enroll).forEach(function (uid) {
      (enroll[uid] || []).forEach(function (cid) { revenue += coursePriceNum(cid); });
    });

    var report = S.storageReport();
    var pct = report.limitBytes ? Math.min(100, (report.usedBytes / report.limitBytes) * 100) : 0;
    var fillColor = pct > 90 ? "linear-gradient(90deg,#e04f4f,#c22c2c)" : "linear-gradient(90deg,var(--a-teal),var(--a-green))";

    var actions = S.getActions();
    var actHTML = actions.length
      ? actions.slice(0, 8).map(function (a) {
          return '<div class="a-act__item"><span class="a-act__dot"></span>' +
            "<span>" + esc(a.text) + '<span class="a-act__time">' + timeAgo(a.ts) + "</span></span></div>";
        }).join("")
      : '<div class="a-empty"><h4>No activity yet</h4><p>Course edits, enrolments and certificate uploads will be logged here.</p></div>';

    var topHTML = es.top.length
      ? es.top.map(function (t) {
          return '<div class="a-act__item"><span class="a-act__dot" style="background:var(--a-teal)"></span>' +
            "<span>" + esc(t.title) +
            '<span class="a-act__time">' + t.seats + " enrolled \u00b7 " + t.completed + " completed</span></span></div>";
        }).join("")
      : '<div class="a-empty"><h4>No enrollments yet</h4><p>Sign-ups and purchases will appear here.</p></div>';

    appView.innerHTML =
      '<div class="a-view__head"><div><h2 class="a-view__title">Welcome back, Admin</h2>' +
      '<p class="a-view__sub">Everything you need to manage the EdTech LMS — courses, modules, exams, certificates and students.</p></div>' +
      '<div class="a-toolbar" style="margin:0">' +
      '<button class="a-btn a-btn--primary" data-act="course-new">' + ICONS.add + " New Course</button>" +
      '<a class="a-btn a-btn--outline" href="../index.html" target="_blank" rel="noopener">View Website</a>' +
      "</div></div>" +

      '<div class="stat-grid">' +
      statCard("blue", ICONS.users, es.stats.students, "Registered Students", es.stats.enrolledUsers + " have enrolled in a course") +
      statCard("orange", ICONS.book, es.stats.seats, "Enrollment Seats", "Across all courses") +
      statCard("teal", ICONS.book, catalog.length, "Courses in Admin Catalog", published.length + " published \u00b7 " + summary.exams + " module exams") +
      statCard("gold", ICONS.award, es.stats.completed, "Courses Completed", "Certificates earned by students") +
      statCard("teal", ICONS.dashboard, summary.modules, "Modules Built", summary.lessons + " lessons across the catalog") +
      "</div>" +

      '<div class="a-grid">' +
      '<div class="a-card a-card--wide"><div class="a-card__head"><h3>Storage</h3>' +
      '<span class="a-chip">' + S.fmtBytes(report.usedBytes) + " of ~5 MB</span></div>" +
      '<div class="a-card__body"><div class="meter">' +
      '<div class="meter__row"><span>Browser storage used</span><strong>' + pct.toFixed(0) + "%</strong></div>" +
      '<div class="meter__bar"><div class="meter__fill" style="width:' + pct + '%;background:' + fillColor + '"></div></div>' +
      '<p class="a-hint" style="margin:0">Data lives in this browser (localStorage). Videos \u2014 prefer URLs; uploaded files are capped at <b>10 MB each</b> in test mode.</p>' +
      "</div></div></div>" +

      '<div class="a-card"><div class="a-card__head"><h3>Top Courses</h3></div>' +
      '<div class="a-card__body"><div class="a-act">' + topHTML + "</div></div></div>" +

      '<div class="a-card"><div class="a-card__head"><h3>Recent Admin Activity</h3></div>' +
      '<div class="a-card__body"><div class="a-act">' + actHTML + "</div></div></div>" +

      '<div class="a-card a-card--wide"><div class="a-card__head"><h3>Quick actions</h3></div>' +
      '<div class="a-card__body"><div class="a-toolbar" style="margin:0">' +
      '<button class="a-btn a-btn--primary" data-act="course-new">' + ICONS.add + " Create Course</button>" +
      '<button class="a-btn a-btn--outline" data-act="goto-students">' + ICONS.users + " Manage Students</button>" +
      '<button class="a-btn a-btn--outline" data-act="goto-certificates">' + ICONS.award + " Certificates</button>" +
      "</div></div></div>" +
      "</div>";
  }

  /* ---------------- courses list ---------------- */

  function loadSeedCatalog() {
    var url = new URL("seed-data.json", window.location.href).href;
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (seedList) {
        var res = S.importSeedCatalog(seedList);
        if (!res.ok) { toast(res.error, true); return; }
        if (res.imported === 0) {
          toast(res.message || "Sample catalog already loaded.");
          render();
          return;
        }
        toast("Imported " + res.imported + " sample course" + (res.imported === 1 ? "" : "s") + (res.skipped ? " \u00b7 " + res.skipped + " skipped (already present)" : "") + ".");
        render();
      })
      .catch(function (err) {
        toast("Could not load seed-data.json \u2014 " + err.message, true);
      });
  }

  function renderCourses() {
    var catalog = S.listCatalog();
    var rows = catalog.map(function (c) {
      var sum = S.summaryOf(c);
      var isProduct = c.type === "product";
      var priceLabel = isProduct
        ? (c.options && c.options.length ? "From " + c.options[0].price + " (" + c.options.length + " formats)" : "From " + esc(c.price))
        : esc(c.price);
      var structLabel = isProduct
        ? "Digital product \u00b7 " + (c.options || []).length + " format" + ((c.options || []).length === 1 ? "" : "s")
        : sum.modules + " modules \u00b7 " + sum.lessons + " lessons \u00b7 " + sum.exams + " exams";
      return (
        '<tr>' +
        '<td><div class="a-row-main">' +
        '<div><div class="td-title">' + esc(c.title) + (isProduct ? ' <span class="a-chip a-chip--gold">Product</span>' : "") + "</div>" +
        '<div class="is-muted" style="font-size:12px">#' + c.id + " \u00b7 " + priceLabel + "</div></div></div></td>" +
        '<td><span class="a-chip">' + structLabel + "</span></td>" +
        '<td>' + (c.published !== false
          ? '<span class="a-badge a-badge--green">Published</span>'
          : '<span class="a-badge a-badge--gray">Draft</span>') + "</td>" +
        '<td class="is-muted">' + fmtDate(c.updatedAt) + "</td>" +
        '<td><div class="cell-actions">' +
        '<button class="a-btn a-btn--outline a-btn--sm" data-act="course-edit" data-id="' + c.id + '">' + ICONS.edit + " Edit</button>" +
        '<button class="a-btn a-btn--ghost a-btn--sm" data-act="course-duplicate" data-id="' + c.id + '" title="Duplicate">' + ICONS.dup + "</button>" +
        '<button class="a-btn ' + (c.published !== false ? "a-btn--teal" : "a-btn--outline") + ' a-btn--sm" data-act="course-publish" data-id="' + c.id + '">' +
        (c.published !== false ? "Unpublish" : "Publish") + "</button>" +
        '<button class="a-btn a-btn--ghost a-btn--sm a-btn--danger" data-act="course-delete" data-id="' + c.id + '">' + ICONS.trash + "</button>" +
        "</div></td></tr>"
      );
    }).join("");

    appView.innerHTML =
      '<div class="a-view__head"><div><h2 class="a-view__title">Courses & Modules</h2>' +
      '<p class="a-view__sub">Create courses, build modules, attach lessons &amp; videos, and add an exam after each module.</p></div>' +
      '<div class="a-toolbar" style="margin:0">' +
      '<button class="a-btn a-btn--primary" data-act="course-new">' + ICONS.add + " New Course</button>" +
      '<button class="a-btn a-btn--ghost" data-act="course-seed" title="Load the 13-course sample catalog from seed-data.json">' + ICONS.download + " Load Sample Catalog</button>" +
      "</div></div>" +

      (catalog.length
        ? '<div class="a-search" style="margin-bottom:16px">' + ICONS.search + '<input class="a-input" id="courseSearch" placeholder="Search admin courses\u2026"></div>' +
          '<div class="a-table-wrap"><table class="a-table"><thead><tr>' +
          "<th>Course</th><th>Structure</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead>" +
          "<tbody id=\"courseRows\">" + rows + "</tbody></table></div>"
        : '<div class="a-empty">' + ICONS.book +
          "<h4>No courses yet</h4><p>Create and publish your first course \u2014 it will appear on the public pages and in student dashboards.</p>" +
          '<div class="a-toolbar" style="justify-content:center">' +
          '<button class="a-btn a-btn--primary" data-act="course-new">' + ICONS.add + " Create Course</button>" +
          '<button class="a-btn a-btn--ghost" data-act="course-seed">' + ICONS.download + " Load Sample Catalog</button>" +
          "</div></div>") +

      '<div class="a-alert a-alert--info" style="margin-top:18px">' + ICONS.info +
      "<span>Only courses you create and publish here appear on the public pages, in the course catalog and in student dashboards.</span></div>";
  }

  /* ---------------- course editor ---------------- */

  var draft = null;
  var pendingProduct = false;
  var IDX = { mod: 0, lesson: 0, quest: 0 };
  function oid() { return "m" + (++IDX.mod) + "_" + Date.now().toString(36); }
  function lid() { return "l" + (++IDX.lesson) + "_" + Date.now().toString(36); }

  function blankLesson(title) {
    return {
      id: lid(),
      title: title || "New lesson",
      mins: 15,
      video: { type: "none", url: "" },
      content: ["Describe the lesson content here \u2014 one paragraph per line."]
    };
  }

  function blankModule() {
    return {
      id: oid(),
      title: "Module " + ((draft.modules || []).length + 1),
      lessons: [blankLesson("Lesson 1")],
      examEnabled: false,
      exam: { title: "Module Exam", passMark: 70, questions: [] }
    };
  }

  function blankQuestion() {
    return { q: "", options: ["", "", "", ""], answer: 0, explain: "" };
  }

  function setPath(obj, path, val) {
    var parts = String(path).split(".");
    var o = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      var k = parts[i];
      var nextIsIdx = /^\d+$/.test(parts[i + 1] || "");
      if (!o[k]) o[k] = nextIsIdx ? [] : {};
      o = o[k];
    }
    var last = parts[parts.length - 1];
    if (/^\d+$/.test(last)) o[Number(last)] = val;
    else o[last] = val;
  }

  function renderModulesPanel() {
    var wrap = document.getElementById("moduleWrap");
    if (!wrap) return;

    var mods = (draft.modules || []).map(function (m, mi) {
      var lessons = (m.lessons || []).map(function (l, li) {
        var video = l.video || { type: "none", url: "" };
        var videoControl = "";
        if (video.type === "url") {
          videoControl =
            '<div class="a-field"><label class="a-label">Video URL (YouTube / direct link)</label>' +
            '<input class="a-input" type="text" data-path="modules.' + mi + '.lessons.' + li + '.video.url" value="' + esc(video.url || "") + '" placeholder="https://www.youtube.com/watch?v=...">' +
            '<span class="a-hint">Paste a YouTube or hosted-video URL \u2014 recommended to save browser storage.</span></div>';
        } else if (video.type === "file") {
          videoControl =
            '<div class="a-field"><label class="a-label">Uploaded video</label>' +
            '<div class="a-video-preview">' + (video.src ? '<video controls src="' + video.src + '"></video>' : "") +
            (video.fileName ? '<span class="a-hint">' + esc(video.fileName) + " \u00b7 " + S.fmtBytes(video.size || 0) + "</span>" : "") + "</div>" +
            '<label class="a-upload"><input type="file" accept="video/*" data-filepath="modules.' + mi + '.lessons.' + li + '.video" data-filefield="src" data-filelabel="video"><span class="a-upload__label">' + ICONS.upload + " Replace video file</span>" +
            '<span class="a-upload__note">' + (video.fileName ? "Current: " + esc(video.fileName) : "Upload a short clip") + " \u00b7 Max size: <b>10 MB</b> (test mode)</span></label></div>";
        } else {
          videoControl = "";
        }

        return (
          '<div class="a-lesson">' +
          '<div class="a-lesson__head">' +
          '<span class="a-avatar" style="width:26px;height:26px;font-size:11px">' + (li + 1) + "</span>" +
          '<span class="a-lesson__name">Lesson ' + (li + 1) + "</span>" +
          '<div class="head-actions">' +
          '<button class="icon-btn" data-act="lesson-up" data-mi="' + mi + '" data-li="' + li + '"' + (li === 0 ? " disabled" : "") + ' title="Move up">' + ICONS.up + "</button>" +
          '<button class="icon-btn" data-act="lesson-down" data-mi="' + mi + '" data-li="' + li + '"' + (li === m.lessons.length - 1 ? " disabled" : "") + ' title="Move down">' + ICONS.down + "</button>" +
          '<button class="icon-btn icon-btn--danger" data-act="lesson-del" data-mi="' + mi + '" data-li="' + li + '" title="Delete lesson">' + ICONS.trash + "</button>" +
          "</div></div>" +

          '<div class="a-form-grid">' +
          '<div class="a-field" style="grid-column:span 2"><label class="a-label">Lesson title</label>' +
          '<input class="a-input" data-path="modules.' + mi + '.lessons.' + li + '.title" value="' + esc(l.title || "") + '"></div>' +
          '<div class="a-field"><label class="a-label">Minutes</label>' +
          '<input class="a-input" type="number" min="1" max="240" data-type="num" data-path="modules.' + mi + '.lessons.' + li + '.mins" value="' + (l.mins || 15) + '"></div>' +
          '<div class="a-field"><label class="a-label">Video / content type</label>' +
          '<select class="a-input" data-path="modules.' + mi + '.lessons.' + li + '.video.type">' +
          '<option value="none"' + (video.type === "none" ? " selected" : "") + ">Text only (no video)</option>" +
          '<option value="url"' + (video.type === "url" ? " selected" : "") + ">Video URL</option>" +
          '<option value="file"' + (video.type === "file" ? " selected" : "") + ">Uploaded video (&le; 10 MB)</option></select></div>" +
          "</div>" +
          videoControl +
          '<div class="a-field"><label class="a-label">Lesson content <span class="a-hint">(one paragraph per line)</span></label>' +
          '<textarea class="a-input" data-textpath="modules.' + mi + '.lessons.' + li + '.content">' + esc((l.content || []).join("\n")) + "</textarea></div>" +
          "</div>"
        );
      }).join("");

      var examHTML = "";
      var exam = m.exam || { title: "Module Exam", passMark: 70, questions: [] };
      if (m.examEnabled) {
        var questions = (exam.questions || []).map(function (qq, qi) {
          var opts = (qq.options || ["", "", "", ""]);
          while (opts.length < 4) opts.push("");
          var optRows = opts.slice(0, 4).map(function (o, oi) {
            return (
              '<div class="a-opt-row">' +
              '<span class="opt-key">' + "ABCD"[oi] + "</span>" +
              '<input class="a-input" data-path="modules.' + mi + '.exam.questions.' + qi + '.options.' + oi + '" value="' + esc(o || "") + '" placeholder="Option ' + (oi + 1) + '">' +
              '<input type="radio" name="ans-' + mi + "-" + qi + '" data-anspath="modules.' + mi + '.exam.questions.' + qi + '.answer" value="' + oi + '"' + (Number(qq.answer) === oi ? " checked" : "") + ' title="Mark as correct answer"></div>'
            );
          }).join("");
          return (
            '<div class="a-question">' +
            '<div class="a-question__head"><b>Question ' + (qi + 1) + "</b>" +
            '<button class="icon-btn icon-btn--danger" data-act="question-del" data-mi="' + mi + '" data-qi="' + qi + '" title="Remove question">' + ICONS.trash + "</button></div>" +
            '<div class="a-field"><label class="a-label">Question</label>' +
            '<textarea class="a-input" data-path="modules.' + mi + '.exam.questions.' + qi + '.q">' + esc(qq.q || "") + "</textarea></div>" +
            '<div class="a-field"><label class="a-label">Options <span class="a-hint">(select the radio of the correct answer)</span></label>' +
            '<div style="display:flex;flex-direction:column;gap:8px">' + optRows + "</div></div>" +
            '<div class="a-field"><label class="a-label">Explanation (shown to the student)</label>' +
            '<input class="a-input" data-path="modules.' + mi + '.exam.questions.' + qi + '.explain" value="' + esc(qq.explain || "") + '"></div>' +
            "</div>"
          );
        }).join("");
        examHTML =
          '<div class="a-exam">' +
          '<div class="a-exam__head" style="display:flex;align-items:center;justify-content:space-between">' +
          '<b class="a-sub-head" style="margin:0">Module Exam</b>' +
          '<button class="a-btn a-btn--ghost a-btn--sm" data-act="exam-toggle" data-mi="' + mi + '">' + ICONS.x + " Disable exam</button></div>" +
          '<div class="a-form-grid">' +
          '<div class="a-field"><label class="a-label">Exam title</label>' +
          '<input class="a-input" data-path="modules.' + mi + '.exam.title" value="' + esc(exam.title || "Module Exam") + '"></div>' +
          '<div class="a-field"><label class="a-label">Pass mark (%)</label>' +
          '<input class="a-input" type="number" min="40" max="100" data-type="num" data-path="modules.' + mi + '.exam.passMark" value="' + (exam.passMark || 70) + '">' +
          '<span class="a-hint">This module unlocks only after passing at <b>' + (exam.passMark || 70) + '%</b>.</span></div>' +
          "</div>" +
          (questions || '<div class="a-empty" style="padding:14px"><h4 style="font-size:13px">No questions yet</h4><p style="font-size:12.5px">Add questions below.</p></div>') +
          '<div class="a-toolbar" style="margin:0"><button class="a-btn a-btn--teal a-btn--sm" data-act="question-add" data-mi="' + mi + '">' + ICONS.add + " Add Question</button></div>" +
          "</div>";
      }

      return (
        '<div class="a-module">' +
        '<div class="a-module__head">' +
        '<span class="a-module__num">Module ' + (mi + 1) + "</span>" +
        '<input class="a-input" style="flex:1" data-path="modules.' + mi + '.title" value="' + esc(m.title || "") + '" placeholder="Module ' + (mi + 1) + " title\">" +
        '<div class="head-actions">' +
        '<button class="icon-btn" data-act="module-up" data-mi="' + mi + '"' + (mi === 0 ? " disabled" : "") + ' title="Move module up">' + ICONS.up + "</button>" +
        '<button class="icon-btn" data-act="module-down" data-mi="' + mi + '"' + (mi === draft.modules.length - 1 ? " disabled" : "") + ' title="Move module down">' + ICONS.down + "</button>" +
        '<button class="icon-btn icon-btn--danger" data-act="module-del" data-mi="' + mi + '" title="Delete module">' + ICONS.trash + "</button>" +
        (m.examEnabled
          ? '<button class="icon-btn" data-act="exam-toggle" data-mi="' + mi + '" title="Exam enabled" style="color:var(--a-teal)">' + ICONS.check + "</button>"
          : "") +
        "</div></div>" +
        '<div class="a-module__body">' +
        lessons +
        '<div><button class="a-btn a-btn--outline a-btn--sm" data-act="lesson-add" data-mi="' + mi + '">' + ICONS.add + " Add Lesson</button></div>" +
        (m.examEnabled
          ? examHTML
          : '<button class="a-btn a-btn--teal a-btn--sm" data-act="exam-toggle" data-mi="' + mi + '">' + ICONS.check + " Add Exam to This Module</button>") +
        "</div></div>"
      );
    }).join("");

    wrap.innerHTML =
      (mods || '<div class="a-empty"><h4>No modules yet</h4><p>Courses are structured into modules — each can hold lessons/videos and an exam at the end.</p></div>') +
      '<button class="a-btn a-btn--primary a-btn--block" data-act="module-add">' + ICONS.add + " Add Module</button>";
  }

  function renderCourseEditor(routeId) {
    if (routeId && routeId !== "new") {
      var src = S.getCourse(routeId);
      if (!src) { toast("Course not found.", true); navigate("#courses"); return; }
      draft = JSON.parse(JSON.stringify(src));
    } else {
      draft = pendingProduct ? S.blankProduct() : S.blankCourse();
      pendingProduct = false;
    }
    if (draft.type === "product") {
      renderProductEditor(routeId);
      return;
    }
    if (!draft.modules) draft.modules = [];

    appView.innerHTML =
      '<div class="a-view__head"><div><h2 class="a-view__title">' + (routeId && routeId !== "new" ? "Edit" : "New") + " Course</h2>" +
      '<p class="a-view__sub">#' + draft.id + " \u00b7 " + (draft.published !== false ? "Published" : "Draft") + "</p></div>" +
      '<div class="a-toolbar" style="margin:0">' +
      '<button class="a-btn a-btn--outline" data-act="editor-cancel">' + ICONS.x + " Cancel</button>" +
      '<button class="a-btn a-btn--primary" data-act="save-course">' + ICONS.check + " Save Course</button>" +
      "</div></div>" +

      '<div class="a-card" style="margin-bottom:18px"><div class="a-card__head"><h3>Course details</h3>' +
      '<a href="#courses" class="a-btn a-btn--ghost a-btn--sm">&larr; Back</a></div>' +
      '<div class="a-card__body">' +
      '<div class="a-alert a-alert--info" style="margin-bottom:16px">' + ICONS.info +
      "<span>Uploads are capped at <b>10 MB per file</b> in test mode. Files over that size are rejected with a friendly message.</span></div>" +

      '<div class="a-field"><label class="a-label">Course title <span class="req">*</span></label>' +
      '<input class="a-input" data-path="title" value="' + esc(draft.title || "") + '" placeholder="e.g. Financial Literacy Basics"></div>' +

      '<div class="a-form-row" style="margin-top:14px">' +
      '<div class="a-field"><label class="a-label">Tagline</label>' +
      '<input class="a-input" data-path="tagline" value="' + esc(draft.tagline || "") + '" placeholder="Short hook line"></div>' +
      '<div class="a-field"><label class="a-label">Category</label>' +
      '<input class="a-input" data-path="cat" value="' + esc(draft.cat || "") + '" placeholder="digital-skills teaching"></div>' +
      "</div>" +

      '<div class="a-field" style="margin-top:14px"><label class="a-label">Description</label>' +
      '<textarea class="a-input" data-path="desc">' + esc(draft.desc || "") + "</textarea></div>" +

      '<div class="a-form-grid" style="margin-top:14px">' +
      '<div class="a-field"><label class="a-label">Mode</label>' +
      '<select class="a-input" data-path="format">' +
      ["Self-Paced", "Self-Paced + Live Coaching", "Self-Paced + Live Q&A", "Live Sessions"].map(function (f) {
        return '<option value="' + f + '"' + (draft.format === f ? " selected" : "") + ">" + f + "</option>";
      }).join("") + "</select></div>" +
      '<div class="a-field"><label class="a-label">Level</label>' +
      '<select class="a-input" data-path="level">' +
      ["Beginner", "Intermediate", "Advanced", "All Levels"].map(function (f) {
        return '<option value="' + f + '"' + (draft.level === f ? " selected" : "") + ">" + f + "</option>";
      }).join("") + "</select></div>" +
      '<div class="a-field"><label class="a-label">Duration</label>' +
      '<input class="a-input" data-path="duration" value="' + esc(draft.duration || "") + '" placeholder="e.g. 5 weeks"></div>' +
      '<div class="a-field"><label class="a-label">Price</label>' +
      '<input class="a-input" data-path="price" value="' + esc(draft.price || "") + '" placeholder="\u20a620,000"></div>' +
      "</div>" +

      '<div class="a-form-row" style="margin-top:14px">' +
      '<div class="a-field"><span class="a-toggle" style="margin-top:20px"><input type="checkbox" data-path="featured" data-type="bool"' + (draft.featured ? " checked" : "") + '> Featured on the site</span>' +
      '<span class="a-toggle"><input type="checkbox" data-path="published" data-type="bool"' + (draft.published !== false ? " checked" : "") + '> Published (visible to students)</span></div>' +
      "</div></div></div>" +

      '<div class="a-card"><div class="a-card__head"><h3>Modules, lessons & exams</h3>' +
      '<span class="a-chip">Lesson videos \u2264 10 MB each (test mode)</span></div>' +
      '<div class="a-card__body" id="moduleWrap"></div></div>' +

      '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px">' +
      '<button class="a-btn a-btn--outline" data-act="editor-cancel">' + ICONS.x + " Cancel</button>" +
      '<button class="a-btn a-btn--primary" data-act="save-course">' + ICONS.check + " Save Course</button></div>";

    renderModulesPanel();
  }

  function openNewCourseChooser() {
    openModal(
      '<div class="a-modal" role="dialog" aria-modal="true" style="max-width:560px">' +
      '<div class="a-modal__head"><h3>Create a new course</h3>' +
      '<button class="icon-btn" data-modal-x aria-label="Close">' + ICONS.x + "</button></div>" +
      '<div class="a-modal__body" style="display:grid;grid-template-columns:1fr 1fr;gap:14px">' +
      '<button class="a-pick" data-chooser="standard" style="text-align:left">' +
      '<span class="a-pick__icon">' + ICONS.book + "</span>" +
      '<span class="a-pick__title">Standard Course</span>' +
      "<span>Modules with lessons, videos and an exam per module. Students enroll, study and earn a certificate.</span></button>" +
      '<button class="a-pick" data-chooser="product" style="text-align:left">' +
      '<span class="a-pick__icon">' + ICONS.bag + "</span>" +
      '<span class="a-pick__title">Digital Product</span>' +
      "<span>Digital item sold in different formats and prices. Students apply via a \u201cGet Access\u201d form.</span></button>" +
      "</div>" +
      '<div class="a-modal__foot"><button class="a-btn a-btn--ghost" data-modal-cancel>Cancel</button></div></div>'
    );
    var overlay = document.getElementById("aOverlay");
    overlay.querySelectorAll("[data-chooser]").forEach(function (pick) {
      pick.addEventListener("click", function () {
        closeModal();
        pendingProduct = pick.getAttribute("data-chooser") === "product";
        navigate("#course/new");
      });
    });
    overlay.querySelector("[data-modal-cancel]").addEventListener("click", closeModal);
    overlay.querySelector("[data-modal-x]").addEventListener("click", closeModal);
  }

  function renderProductEditor(routeId) {
    if (!draft.options) draft.options = [{ label: "", price: "\u20a6", priceNum: 0, desc: "" }];

    appView.innerHTML =
      '<div class="a-view__head"><div><h2 class="a-view__title">' + (routeId && routeId !== "new" ? "Edit" : "New") + " Digital Product</h2>" +
      '<p class="a-view__sub">#' + draft.id + " \u00b7 " + (draft.published !== false ? "Published" : "Draft") + "</p></div>" +
      '<div class="a-toolbar" style="margin:0">' +
      '<button class="a-btn a-btn--outline" data-act="editor-cancel">' + ICONS.x + " Cancel</button>" +
      '<button class="a-btn a-btn--primary" data-act="save-course">' + ICONS.check + " Save Product</button>" +
      "</div></div>" +

      '<div class="a-card" style="margin-bottom:18px"><div class="a-card__head"><h3>Product details</h3>' +
      '<a href="#courses" class="a-btn a-btn--ghost a-btn--sm">&larr; Back</a></div>' +
      '<div class="a-card__body">' +
      '<div class="a-field"><label class="a-label">Product title <span class="req">*</span></label>' +
      '<input class="a-input" data-path="title" value="' + esc(draft.title || "") + '" placeholder="e.g. Wedding Photography Kit"></div>' +

      '<div class="a-form-row" style="margin-top:14px">' +
      '<div class="a-field"><label class="a-label">Tagline</label>' +
      '<input class="a-input" data-path="tagline" value="' + esc(draft.tagline || "") + '" placeholder="Short hook line"></div>' +
      '<div class="a-field"><label class="a-label">Category</label>' +
      '<input class="a-input" data-path="cat" value="' + esc(draft.cat || "") + '" placeholder="digital-skills"></div>' +
      "</div>" +

      '<div class="a-field" style="margin-top:14px"><label class="a-label">Description</label>' +
      '<textarea class="a-input" data-path="desc" placeholder="What is this digital product and who is it for?">' + esc(draft.desc || "") + "</textarea></div>" +

      '<div class="a-form-row" style="margin-top:14px">' +
      '<div class="a-field"><span class="a-toggle" style="margin-top:20px"><input type="checkbox" data-path="featured" data-type="bool"' + (draft.featured ? " checked" : "") + '> Featured on the site</span>' +
      '<span class="a-toggle"><input type="checkbox" data-path="published" data-type="bool"' + (draft.published !== false ? " checked" : "") + '> Published (visible to students)</span></div>' +
      "</div></div></div>" +

      '<div class="a-card"><div class="a-card__head"><h3>Formats &amp; pricing</h3>' +
      '<span class="a-chip">Each format is a version of the product with its own price</span></div>' +
      '<div class="a-card__body" id="formatWrap"></div></div>' +

      '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px">' +
      '<button class="a-btn a-btn--outline" data-act="editor-cancel">' + ICONS.x + " Cancel</button>" +
      '<button class="a-btn a-btn--primary" data-act="save-course">' + ICONS.check + " Save Product</button></div>";

    renderFormatsPanel();
  }

  function renderFormatsPanel() {
    var wrap = document.getElementById("formatWrap");
    if (!wrap) return;
    var opts = draft.options || [];
    var html = opts.map(function (o, fi) {
      return (
        '<div class="a-format">' +
        '<div class="a-form-grid">' +
        '<div class="a-field" style="grid-column:span 2"><label class="a-label">Format name</label>' +
        '<input class="a-input" data-path="options.' + fi + '.label" value="' + esc(o.label || "") + '" placeholder="e.g. E-Book, Video Pack, Full Bundle"></div>' +
        '<div class="a-field"><label class="a-label">Price</label>' +
        '<input class="a-input" data-path="options.' + fi + '.price" value="' + esc(o.price || "\u20a6") + '" placeholder="\u20a65,000"></div>' +
        '<div class="a-field" style="align-self:end"><label class="a-label">Description <span class="a-hint">(optional)</span></label>' +
        '<input class="a-input" data-path="options.' + fi + '.desc" value="' + esc(o.desc || "") + '" placeholder="e.g. PDF guide + worksheets"></div>' +
        "</div>" +
        '<div class="head-actions" style="margin-top:10px">' +
        '<button class="icon-btn icon-btn--danger" data-act="format-del" data-fi="' + fi + '"' + (opts.length > 1 ? "" : " disabled") + ' title="Remove format">' + ICONS.trash + "</button>" +
        "</div></div>"
      );
    }).join("");
    wrap.innerHTML =
      html +
      '<button class="a-btn a-btn--teal" data-act="format-add" style="margin-top:14px">' + ICONS.add + " Add Format</button>";
  }

  /* ---------------- students ---------------- */

  function userStats(user) {
    var enroll = (S.allEnrollments()[user.id] || []);
    var prog = (S.allProgress()[user.id] || {});
    var avgs = [];
    var completed = 0;
    enroll.forEach(function (cid) {
      var total = S.courseLessonTotal(cid);
      var p = prog[cid];
      var done = (p && p.done) ? p.done.length : 0;
      if (p && p.completedAt) completed++;
      if (total) avgs.push(Math.round((done / total) * 100));
    });
    var avg = avgs.length ? Math.round(avgs.reduce(function (a, b) { return a + b; }, 0) / avgs.length) : 0;
    return { enrolled: enroll.length, avg: avg, completed: completed };
  }

  function renderStudents() {
    var users = S.listUsers();
    appView.innerHTML =
      '<div class="a-view__head"><div><h2 class="a-view__title">Students</h2>' +
      '<p class="a-view__sub">' + users.length + " registered account" + (users.length === 1 ? "" : "s") + " \u00b7 manage enrolment and progress.</p></div></div>" +

      (users.length
        ? '<div class="a-search" style="margin-bottom:16px">' + ICONS.search + '<input class="a-input" id="studentSearch" placeholder="Search by name or email\u2026"></div>' +
          '<div class="a-table-wrap"><table class="a-table"><thead><tr>' +
          "<th>Student</th><th>Joined</th><th>Enrolled</th><th>Avg progress</th><th>Completed</th><th>Action</th></tr></thead>" +
          "<tbody id=\"studentRows\">" + users.map(function (u) {
            var s = userStats(u);
            return (
              "<tr>" +
              '<td><div class="a-row-main"><span class="a-avatar">' + esc(initials((u.fname || "") + " " + (u.lname || ""))) + "</span>" +
              "<div><div class=\"td-title\">" + esc((u.fname || "") + " " + (u.lname || "")) + "</div>" +
              '<div class="is-muted" style="font-size:12px">' + esc(u.email) + "</div></div></div></td>" +
              "<td class=\"is-muted\">" + fmtDate(u.createdAt) + "</td>" +
              "<td><span class=\"a-chip\">" + s.enrolled + " course" + (s.enrolled === 1 ? "" : "s") + "</span></td>" +
              '<td style="min-width:130px"><div class="a-progress-row" style="margin-bottom:4px"><span class="is-muted">' + s.avg + "%</span></div>" +
              '<div class="a-track"><div class="a-fill" style="width:' + s.avg + '%"></div></div></td>' +
              "<td><span class=\"a-badge " + (s.completed ? "a-badge--green" : "a-badge--gray") + "\">" + s.completed + "</span></td>" +
              '<td><button class="a-btn a-btn--primary a-btn--sm" data-act="student-view" data-id="' + u.id + '">' + ICONS.eye + " Manage</button></td>" +
              "</tr>"
            );
          }).join("") + "</tbody></table></div>"
        : '<div class="a-empty"><h4>No registered students yet</h4><p>When visitors sign up on the website, they\u2019ll appear here with their enrolments and progress.</p></div>');
  }

  function openStudent(userId) {
    var u = null;
    S.listUsers().forEach(function (x) { if (x.id === userId) u = x; });
    if (!u) { toast("Student not found.", true); return; }

    var bodyId = "studentBody";
    function renderBody() {
      var sv = userStats(u);
      var enroll = S.allEnrollments()[u.id] || [];
      var prog = S.allProgress()[u.id] || {};

      var allCourses = S.staticCourses().map(function (c) { return { id: Number(c.id), title: c.title, kind: "Static", custom: false }; })
        .concat(S.listCatalog().map(function (c) { return { id: Number(c.id), title: c.title, kind: "Custom", custom: true }; }));
      var avail = allCourses.filter(function (c) { return enroll.indexOf(c.id) === -1; });

      var courseRows = enroll.map(function (cid) {
        var title = S.courseTitle(cid);
        var total = S.courseLessonTotal(cid);
        var p = prog[cid];
        var done = (p && p.done) ? p.done.length : 0;
        var pct = total ? Math.round((done / total) * 100) : 0;
        var doneFlag = !!(p && p.completedAt);
        return (
          '<div class="s-course">' +
          '<div class="s-course__head"><span class="s-course__title">' + esc(title) + "</span>" +
          (doneFlag ? '<span class="a-badge a-badge--green">Completed</span>' : '<span class="a-badge a-badge--teal">' + pct + "%</span>") + "</div>" +
          '<div class="a-progress-row" style="margin-bottom:4px"><span class="is-muted">' + done + " of " + total + " items</span></div>" +
          '<div class="a-track" style="margin-bottom:10px"><div class="a-fill' + (doneFlag ? " a-fill--done" : "") + '" style="width:' + pct + '%"></div></div>' +
          '<div class="s-course__actions">' +
          '<button class="a-btn a-btn--outline a-btn--sm" data-act="student-reset" data-id="' + u.id + '" data-cid="' + cid + '">Reset progress</button>' +
          '<button class="a-btn a-btn--teal a-btn--sm" data-act="student-complete" data-id="' + u.id + '" data-cid="' + cid + '">Mark complete</button>' +
          '<button class="a-btn a-btn--ghost a-btn--sm" data-act="student-unenroll" data-id="' + u.id + '" data-cid="' + cid + '">Unenroll</button>' +
          "</div></div>"
        );
      }).join("");

      document.getElementById(bodyId).innerHTML =
        '<div class="a-field"><label class="a-label">Enrol student in a course</label>' +
        '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
        '<select class="a-input" id="studentCourseSelect" style="flex:1;min-width:220px">' +
        (avail.length ? avail.map(function (c) { return '<option value="' + c.id + '">' + esc(c.title) + "</option>"; }).join("") : '<option value="">No further courses available</option>') +
        "</select>" +
        '<button class="a-btn a-btn--primary a-btn--sm" data-act="student-enroll" data-id="' + u.id + '">' + ICONS.add + " Enroll</button></div></div>" +
        '<div style="margin:16px 0;border-bottom:1px solid var(--a-brd)"></div>' +
        (enroll.length ? courseRows : '<div class="a-empty" style="padding:14px"><h4 style="font-size:13px">Not enrolled in any courses yet</h4></div>');
    }

    openModal(
      '<div class="a-modal" role="dialog" aria-modal="true">' +
      '<div class="a-modal__head"><h3>Manage Student</h3>' +
      '<button class="icon-btn" data-modal-x> ' + ICONS.x + "</button></div>" +
      '<div class="a-modal__body">' +
      '<div class="s-head">' +
      '<span class="a-avatar">' + esc(initials((u.fname || "") + " " + (u.lname || ""))) + "</span>" +
      "<div><h4>" + esc((u.fname || "") + " " + (u.lname || "")) + "</h4>" +
      '<p>' + esc(u.email) + (u.phone ? " \u00b7 " + esc(u.phone) : "") + "</p></div></div>" +
      '<div class="a-chip-row">' +
      '<span class="a-chip">Joined <strong>' + fmtDate(u.createdAt) + "</strong></span>" +
      '<span class="a-chip">Enrolled <strong id="chEnrolled">0</strong></span>' +
      '<span class="a-chip">Completed <strong id="chCompleted">0</strong></span>' +
      "</div>" +
      '<div id="' + bodyId + '"></div>' +
      "</div>" +
      '<div class="a-modal__foot"><button class="a-btn a-btn--ghost" data-modal-x>Close</button></div>' +
      "</div>"
    );

    renderBody();
    document.querySelectorAll("[data-modal-x]").forEach(function (b) { b.addEventListener("click", closeModal); });
  }

  /* ---------------- certificates ---------------- */

  function earnedCount(courseId) {
    var prog = S.allProgress();
    var n = 0;
    Object.keys(prog).forEach(function (uid) {
      var p = prog[uid];
      if (p && p[courseId] && p[courseId].completedAt) n++;
    });
    return n;
  }

  function renderCertificates() {
    var rows = [];
    S.staticCourses().forEach(function (c) {
      rows.push({ id: Number(c.id), title: c.title, tagline: c.tagline || "", kind: "Default site course" });
    });
    S.listCatalog().forEach(function (c) {
      rows.push({ id: Number(c.id), title: c.title, tagline: c.tagline || "", kind: c.published !== false ? "Admin course" : "Admin draft" });
    });

    var bodyRows = rows.map(function (r) {
      var tpl = S.getCertTemplate(r.id);
      var earned = earnedCount(r.id);
      var status = tpl
        ? '<span class="a-badge a-badge--green">' + ICONS.check + " Template uploaded</span>"
        : '<span class="a-badge a-badge--gray">No template \u2014 generated cert used</span>';
      return (
        "<tr>" +
        '<td><div class="a-row-main"><span class="a-avatar">' + esc(initials(r.title)) + "</span>" +
        "<div><div class=\"td-title\">" + esc(r.title) + "</div>" +
        '<div class="is-muted" style="font-size:12px">' + esc(r.kind) + "</div></div></div></td>" +
        "<td>" + status + "</td>" +
        '<td><span class="a-chip">' + earned + " earned</span></td>" +
        '<td><div class="cell-actions">' +
        '<label class="a-btn a-btn--outline a-btn--sm" style="cursor:pointer">' + ICONS.upload + " " + (tpl ? "Replace" : "Upload") +
        '<input type="file" accept="image/*,application/pdf" style="display:none" data-certfile="' + r.id + '"></label>' +
        (tpl ? '<button class="a-btn a-btn--ghost a-btn--sm" data-act="cert-preview" data-id="' + r.id + '">' + ICONS.eye + " Preview</button>" : "") +
        (tpl ? '<button class="a-btn a-btn--ghost a-btn--sm" data-act="cert-remove" data-id="' + r.id + '">' + ICONS.trash + "</button>" : "") +
        "</div></td></tr>"
      );
    }).join("");

    appView.innerHTML =
      '<div class="a-view__head"><div><h2 class="a-view__title">Certificates</h2>' +
      '<p class="a-view__sub">Upload a certificate template per course (image or PDF, max <b>10 MB</b>). Students download it when they complete all modules.</p></div></div>' +
      '<div class="a-alert a-alert--info" style="margin-bottom:16px">' + ICONS.info +
      '<span>If no template is uploaded, students still receive the automatic generated certificate on completion.</span></div>' +
      (bodyRows
        ? '<div class="a-table-wrap"><table class="a-table"><thead><tr>' +
          "<th>Course</th><th>Template</th><th>Earned</th><th>Manage</th></tr></thead><tbody>" + bodyRows + "</tbody></table></div>"
        : '<div class="a-empty"><h4>No courses available</h4><p>Create a course to start managing its certificate.</p></div>');
  }

  /* ---------------- blog ---------------- */

  function renderBlog() {
    var posts = S.getBlogPosts();
    var rows = posts.map(function (p) {
      var tags = (p.tags || []).slice(0, 3).join(", ");
      return (
        "<tr>" +
        '<td><div class="a-row-main"><div><div class="td-title">' + esc(p.title) + "</div>" +
        '<div class="is-muted" style="font-size:12px">' + esc(p.category) + " \u00b7 " + esc(p.author) + "</div></div></div></td>" +
        '<td class="is-muted">' + esc(p.date || "\u2014") + "</td>" +
        '<td><span class="a-chip">' + esc(p.readTime || "\u2014") + "</span></td>" +
        '<td class="is-muted">' + (tags ? esc(tags) : "\u2014") + "</td>" +
        '<td><div class="cell-actions">' +
        '<button class="a-btn a-btn--outline a-btn--sm" data-act="blog-edit" data-id="' + esc(p.id) + '">' + ICONS.edit + " Edit</button>" +
        '<button class="a-btn a-btn--ghost a-btn--sm a-btn--danger" data-act="blog-delete" data-id="' + esc(p.id) + '">' + ICONS.trash + "</button>" +
        "</div></td></tr>"
      );
    }).join("");

    appView.innerHTML =
      '<div class="a-view__head"><div><h2 class="a-view__title">Blog Posts</h2>' +
      '<p class="a-view__sub">Publish and manage articles that appear on the website blog.</p></div>' +
      '<div class="a-toolbar" style="margin:0"><button class="a-btn a-btn--primary" data-act="blog-new">' + ICONS.add + " New Post</button></div></div>" +
      (posts.length
        ? '<div class="a-table-wrap"><table class="a-table"><thead><tr>' +
          "<th>Post</th><th>Date</th><th>Read time</th><th>Tags</th><th>Action</th></tr></thead>" +
          "<tbody>" + rows + "</tbody></table></div>"
        : '<div class="a-empty"><h4>No blog posts yet</h4><p>Click \u201cNew Post\u201d to publish your first article \u2014 it will appear on the website immediately.</p></div>');
  }

  function openBlogPost(post) {
    var d = post || {
      id: "", title: "", excerpt: "", content: "",
      category: "News", author: "EdTech Training Hub Team",
      tags: [], date: "", readTime: ""
    };
    var tagsVal = (d.tags || []).join(", ");
    openModal(
      '<div class="a-modal" role="dialog" aria-modal="true" style="max-width:700px">' +
      '<div class="a-modal__head"><h3>' + (post ? "Edit Blog Post" : "New Blog Post") + "</h3>" +
      '<button class="icon-btn" data-modal-cancel aria-label="Close">' + ICONS.x + "</button></div>" +
      '<div class="a-modal__body">' +
      '<div class="a-field"><label class="a-label">Title *</label>' +
      '<input class="a-input" id="blogTitle" value="' + esc(d.title) + '" maxlength="140"></div>' +
      '<div class="a-field"><label class="a-label">Excerpt *</label>' +
      '<textarea class="a-input" id="blogExcerpt" rows="2" maxlength="280">' + esc(d.excerpt) + "</textarea></div>" +
      '<div class="a-field"><label class="a-label">Content * <span class="a-hint">(separate paragraphs with a blank line)</span></label>' +
      '<textarea class="a-input" id="blogContent" rows="12" style="font-family:inherit">' + esc(d.content) + "</textarea></div>" +
      '<div class="a-grid" style="grid-template-columns:1fr 1fr;gap:12px">' +
      '<div class="a-field"><label class="a-label">Category</label>' +
      '<input class="a-input" id="blogCategory" value="' + esc(d.category) + '" list="blogCats" placeholder="e.g. AI &amp; Technology">' +
      '<datalist id="blogCats">' + ["AI & Technology", "Digital Skills", "Course Creation", "LMS", "Online Teaching", "Instructional Design", "News"].map(function (c) { return '<option value="' + esc(c) + '">'; }).join("") + "</datalist></div>" +
      '<div class="a-field"><label class="a-label">Author</label>' +
      '<input class="a-input" id="blogAuthor" value="' + esc(d.author) + '"></div></div>' +
      '<div class="a-field"><label class="a-label">Tags <span class="a-hint">(comma separated)</span></label>' +
      '<input class="a-input" id="blogTags" value="' + esc(tagsVal) + '" placeholder="AI, Education, Nigeria"></div>' +
      "</div>" +
      '<div class="a-modal__foot">' +
      '<button class="a-btn a-btn--ghost" data-modal-cancel>Cancel</button>' +
      '<button class="a-btn a-btn--primary" data-blog-save>' + ICONS.check + " " + (post ? "Save Changes" : "Publish Post") + "</button>" +
      "</div></div>"
    );
    var overlay = document.getElementById("aOverlay");
    overlay.querySelector("[data-blog-save]").addEventListener("click", function () {
      var title = document.getElementById("blogTitle").value.trim();
      var content = document.getElementById("blogContent").value.trim();
      if (!title) { toast("Please give the post a title.", true); return; }
      if (!content) { toast("Please write some body content.", true); return; }
      var words = content.split(/\s+/).filter(Boolean).length;
      var readTime = Math.max(1, Math.round(words / 200)) + " min read";
      var tags = document.getElementById("blogTags").value.split(",").map(function (t) { return t.trim(); }).filter(Boolean);
      var res = S.saveBlogPost({
        id: d.id,
        title: title,
        excerpt: document.getElementById("blogExcerpt").value.trim() || title,
        content: content,
        category: document.getElementById("blogCategory").value.trim() || "News",
        author: document.getElementById("blogAuthor").value.trim() || "EdTech Training Hub Team",
        date: d.date || new Date().toISOString().slice(0, 10),
        readTime: readTime,
        tags: tags
      });
      if (!res.ok) { toast(res.error, true); return; }
      closeModal();
      toast("Blog post published \u2014 it is live on the website.");
      render();
    });
    overlay.querySelectorAll("[data-modal-cancel]").forEach(function (b) { b.addEventListener("click", closeModal); });
  }

  /* ---------------- settings ---------------- */

  function renderSettings() {
    var acc = S.getAccount();
    var report = S.storageReport();
    var pct = report.limitBytes ? Math.min(100, (report.usedBytes / report.limitBytes) * 100) : 0;

    appView.innerHTML =
      '<div class="a-view__head"><div><h2 class="a-view__title">Settings</h2>' +
      '<p class="a-view__sub">Admin credentials are locked in development mode and will be changeable after production handover.</p></div></div>' +

      '<div class="a-grid">' +

      '<div class="a-card"><div class="a-card__head"><h3>Admin login</h3></div>' +
      '<div class="a-card__body">' +
      '<div class="a-alert a-alert--info" style="margin-bottom:16px">' + ICONS.alert +
      "<span><b>Development mode.</b> Username and password changes are disabled and will take effect in production after handover.</span></div>" +
      '<div class="a-field"><label class="a-label">Username</label>' +
      '<input class="a-input" value="' + esc(acc.username) + '" disabled></div>' +
      '<div class="a-field"><label class="a-label">Password</label>' +
      '<input class="a-input" type="password" value="' + esc(acc.password) + '" disabled></div>' +
      '<div style="display:flex;gap:8px;margin-top:4px">' +
      '<button class="a-btn a-btn--primary" disabled>Save credentials (locked)</button></div>' +
      "</div></div>" +

      '<div class="a-card"><div class="a-card__head"><h3>Data controls</h3></div>' +
      '<div class="a-card__body" style="display:flex;flex-direction:column;gap:12px">' +
      '<div class="a-toolbar" style="margin:0;flex-wrap:wrap">' +
      '<button class="a-btn a-btn--primary" data-act="settings-export">' + ICONS.download + " Export All Data (JSON)</button>" +
      '<label class="a-btn a-btn--outline" style="cursor:pointer">' + ICONS.upload + " Import Backup" +
      '<input type="file" accept="application/json,.json" style="display:none" id="importFile"></label></div>' +
      '<div class="a-toolbar" style="margin:0;flex-wrap:wrap">' +
      '<button class="a-btn a-btn--outline" data-act="settings-clear-admin">' + ICONS.trash + " Clear Admin Data</button>" +
      '<button class="a-btn a-btn--danger" data-act="settings-wipe">' + ICONS.alert + " Reset Entire LMS</button></div>" +
      "</div></div>" +

      '<div class="a-card a-card--wide"><div class="a-card__head"><h3>Storage</h3><span class="a-chip">' + S.fmtBytes(report.usedBytes) + " of ~5 MB</span></div>" +
      '<div class="a-card__body"><div class="meter">' +
      '<div class="meter__row"><span>Browser storage used</span><strong>' + pct.toFixed(0) + "%</strong></div>" +
      '<div class="meter__bar"><div class="meter__fill" style="width:' + pct + '%"></div></div></div>' +
      '<p class="a-hint" style="margin:12px 0 0">All LMS data \u2014 accounts, enrolments, progress, admin courses, exams and certificate templates \u2014 lives in this browser (localStorage). Export backups regularly.</p>' +
      "</div></div>" +

      '<div class="a-card a-card--wide"><div class="a-card__head"><h3>About</h3></div>' +
      '<div class="a-card__body"><p class="a-hint" style="line-height:1.7;margin:0">' +
      "EdTech Training Hub Ltd \u00b7 Learn \u00b7 Teach \u00b7 Create \u00b7 Thrive.<br>" +
      "Admin console version 1.0 (development). File uploads limited to <b>10 MB per file</b> in test mode; larger files are rejected with a clear message.</p></div></div>" +
      "</div>";
  }

  /* ---------------- editor input delegation ---------------- */

  function parseVal(el, val, path) {
    var t = el.getAttribute("data-type") || el.getAttribute("data-textpath") ? "txt" : "";
    if (el.hasAttribute("data-textpath")) return String(val || "").split("\n");
    if (t === "bool") return el.type === "checkbox" || el.type === "radio" ? el.checked : val === true || val === "true";
    if (t === "num" || /(mins|passMark|priceNum)$/.test(path)) return Number(val) || 0;
    if (el.type === "checkbox" || el.type === "radio") return el.checked;
    if (el.type === "number") return Number(val) || 0;
    return val;
  }

  appView.addEventListener("input", function (e) {
    if (draft && e.target.hasAttribute("data-path")) {
      setPath(draft, e.target.getAttribute("data-path"), parseVal(e.target, e.target.value, e.target.getAttribute("data-path")));
      if (/^price$/.test(e.target.getAttribute("data-path"))) {
        var price = e.target.value;
        draft.priceNum = Number(parseInt(String(price || "").replace(/[^\d]/g, ""), 10)) || 0;
      }
    }
  });

  appView.addEventListener("change", function (e) {
    var t = e.target;
    if (!draft) return;

    if (t.hasAttribute("data-path")) {
      setPath(draft, t.getAttribute("data-path"), parseVal(t, t.value, t.getAttribute("data-path")));
      if (/^price$/.test(t.getAttribute("data-path"))) {
        draft.priceNum = Number(parseInt(String(t.value || "").replace(/[^\d]/g, ""), 10)) || 0;
      }
    }

    if (t.hasAttribute("data-anspath")) {
      setPath(draft, t.getAttribute("data-anspath"), Number(t.value));
    }

    if (t.hasAttribute("data-filepath")) {
      var path = t.getAttribute("data-filepath");
      var field = t.getAttribute("data-filefield") || "src";
      var label = t.getAttribute("data-filelabel") || "file";
      var file = (t.files && t.files[0]) || null;
      var old = getPathChecked(draft, path);
      var oldType = (old && old.type) || null;
      S.readFileAsDataUrl(file, { label: label }).then(function (res) {
        if (!res.ok) { toast(res.error, true); return; }
        var obj = (old && (typeof old === "object")) ? old : { type: oldType || "file", url: "" };
        obj.type = "file";
        obj[field] = res.dataUrl;
        obj.fileName = res.fileName;
        obj.size = res.size;
        obj.mime = res.mime;
        setPath(draft, path, obj);
        renderModulesPanel();
        var preview = document.getElementById("moduleWrap");
        if (preview) toast((label === "video" ? "Video" : "File") + " added \u2014 " + S.fmtBytes(res.size));
      });
    }
  });

  function getPathChecked(obj, path) {
    var parts = String(path).split(".");
    var o = obj;
    for (var i = 0; i < parts.length; i++) {
      if (o == null) return null;
      o = o[parts[i]];
    }
    return o;
  }

  // certificate upload works across views (draft may be null there)
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.hasAttribute("data-certfile")) {
      var cid = Number(t.getAttribute("data-certfile"));
      var file = (t.files && t.files[0]) || null;
      S.readFileAsDataUrl(file, { label: "certificate" }).then(function (res) {
        if (!res.ok) { toast(res.error, true); return; }
        var res2 = S.setCertTemplate(cid, { fileName: res.fileName, size: res.size, mime: res.mime, dataUrl: res.dataUrl, uploadedAt: Date.now() });
        if (!res2.ok) { toast(res2.error, true); return; }
        toast("Certificate template uploaded for course #" + cid);
        render();
      });
    }
    if (t && t.id === "importFile") {
      var f = (t.files && t.files[0]) || null;
      var reader = new FileReader();
      reader.onload = function () {
        var res = S.importAll(reader.result);
        if (!res.ok) { toast(res.error, true); return; }
        toast("Backup imported \u2014 " + res.count + " data areas restored.");
        render();
      };
      reader.onerror = function () { toast("Could not read that file.", true); };
      if (f) reader.readAsText(f);
    }
  });

  /* ---------------- actions ---------------- */

  appView.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act");
    var mi = Number(el.getAttribute("data-mi"));
    var li = Number(el.getAttribute("data-li"));
    var qi = Number(el.getAttribute("data-qi"));

    function modules() { return draft ? draft.modules || [] : []; }
    function rerender() { renderModulesPanel(); }

    switch (act) {
      case "course-new":
        openNewCourseChooser();
        break;
      case "course-seed":
        loadSeedCatalog();
        break;
      case "course-edit":
        navigate("#course/" + el.getAttribute("data-id"));
        break;
      case "course-duplicate":
        var dup = S.duplicateCourse(el.getAttribute("data-id"));
        if (!dup.ok) toast(dup.error, true); else { toast("Course duplicated."); render(); }
        break;
      case "course-publish":
        var shouldPublish = el.textContent.trim() === "Publish";
        var pub = S.setPublished(el.getAttribute("data-id"), shouldPublish);
        if (!pub.ok) toast(pub.error, true); else render();
        break;
      case "course-delete":
        confirmModal({
          title: "Delete course?",
          body: "This removes the course, its modules, lessons and exams from the admin catalog. Student progress in this course is untouched but the course will disappear from the site.",
          okLabel: "Delete course",
          okClass: "a-btn--danger",
          onOk: function () {
            var d = S.deleteCourse(el.getAttribute("data-id"));
            if (!d.ok) toast(d.error, true); else { toast("Course deleted."); render(); }
          }
        });
        break;

      case "format-add":
        if (!draft.options) draft.options = [];
        draft.options.push({ label: "", price: "\u20a6", priceNum: 0, desc: "" });
        renderFormatsPanel();
        break;
      case "format-del":
        if (draft.options && draft.options.length > 1) {
          draft.options.splice(Number(el.getAttribute("data-fi")), 1);
          renderFormatsPanel();
        } else {
          toast("A digital product needs at least one format.", true);
        }
        break;

      case "editor-cancel":
        navigate("#courses");
        break;

      case "save-course":
        if (!draft) return;
        var saved = S.saveCourse(draft);
        if (!saved.ok) { toast(saved.error, true); return; }
        toast("Course saved \u2014 published: " + (draft.published !== false ? "yes" : "no"));
        navigate("#courses");
        break;

      case "module-add":
        draft.modules.push(blankModule());
        rerender();
        break;
      case "module-del":
        confirmModal({
          title: "Delete module?",
          body: "This removes the module, its lessons and its exam.",
          okClass: "a-btn--danger",
          onOk: function () { draft.modules.splice(mi, 1); rerender(); }
        });
        break;
      case "module-up":
        if (mi > 0) { var tmp = draft.modules[mi - 1]; draft.modules[mi - 1] = draft.modules[mi]; draft.modules[mi] = tmp; rerender(); }
        break;
      case "module-down":
        if (mi < draft.modules.length - 1) { var t2 = draft.modules[mi + 1]; draft.modules[mi + 1] = draft.modules[mi]; draft.modules[mi] = t2; rerender(); }
        break;

      case "lesson-add":
        draft.modules[mi].lessons.push(blankLesson("Lesson " + (draft.modules[mi].lessons.length + 1)));
        rerender();
        break;
      case "lesson-del":
        confirmModal({
          title: "Delete lesson?",
          body: "Remove this lesson and its video/content from the module.",
          okClass: "a-btn--danger",
          onOk: function () { draft.modules[mi].lessons.splice(li, 1); rerender(); }
        });
        break;
      case "lesson-up":
        if (li > 0) { var m = draft.modules[mi].lessons; var tmp3 = m[li - 1]; m[li - 1] = m[li]; m[li] = tmp3; rerender(); }
        break;
      case "lesson-down":
        if (li < draft.modules[mi].lessons.length - 1) { var m2 = draft.modules[mi].lessons; var t4 = m2[li + 1]; m2[li + 1] = m2[li]; m2[li] = t4; rerender(); }
        break;

      case "exam-toggle":
        var mod = draft.modules[mi];
        if (mod.examEnabled) {
          confirmModal({
            title: "Disable module exam?",
            body: "The exam at the end of this module will no longer be shown to students.",
            onOk: function () { mod.examEnabled = false; rerender(); }
          });
        } else {
          mod.examEnabled = true;
          if (!mod.exam) mod.exam = { title: "Module Exam", passMark: 70, questions: [] };
          rerender();
        }
        break;
      case "question-add":
        draft.modules[mi].exam.questions.push(blankQuestion());
        rerender();
        break;
      case "question-del":
        confirmModal({
          title: "Remove question?",
          body: "Delete this question and its options from the exam.",
          okClass: "a-btn--danger",
          onOk: function () { draft.modules[mi].exam.questions.splice(qi, 1); rerender(); }
        });
        break;

      case "student-view":
        openStudent(el.getAttribute("data-id"));
        break;
      case "student-enroll":
        var sel = document.getElementById("studentCourseSelect");
        var cid = sel ? Number(sel.value) : NaN;
        if (!cid) { toast("Select a course to enrol the student.", true); return; }
        var en = S.enrollUser(el.getAttribute("data-id"), cid);
        if (!en.ok) toast(en.error, true); else { toast("Student enrolled."); openStudent(el.getAttribute("data-id")); }
        break;
      case "student-reset":
        confirmModal({
          title: "Reset progress?",
          body: "This clears the student\u2019s quiz scores and completion for this course so they can start over.",
          okClass: "a-btn--danger",
          onOk: function () {
            S.resetProgress(el.getAttribute("data-id"), el.getAttribute("data-cid"));
            toast("Progress reset.");
            openStudent(el.getAttribute("data-id"));
          }
        });
        break;
      case "student-complete":
        confirmModal({
          title: "Mark course complete?",
          body: "Force-completes the course: all items marked done and the certificate unlocked.",
          okClass: "a-btn--teal",
          onOk: function () {
            var fc = S.forceComplete(el.getAttribute("data-id"), el.getAttribute("data-cid"));
            if (!fc.ok) toast(fc.error, true); else { toast("Course marked complete."); openStudent(el.getAttribute("data-id")); }
          }
        });
        break;
      case "student-unenroll":
        confirmModal({
          title: "Unenroll student?",
          body: "Removes this course from the student\u2019s dashboard. Their progress is kept on file.",
          okClass: "a-btn--danger",
          onOk: function () {
            var un = S.unenrollUser(el.getAttribute("data-id"), el.getAttribute("data-cid"));
            if (!un.ok) toast(un.error, true); else { toast("Student unenrolled."); openStudent(el.getAttribute("data-id")); }
          }
        });
        break;

      case "cert-preview":
        var tpl = S.getCertTemplate(el.getAttribute("data-id"));
        if (!tpl) return;
        var inner = String(tpl.dataUrl).indexOf("data:application/pdf") === 0
          ? '<iframe src="' + tpl.dataUrl + '" title="Certificate preview"></iframe>'
          : '<img src="' + tpl.dataUrl + '" alt="Certificate preview">';
        openModal(
          '<div class="a-modal" role="dialog" aria-modal="true" style="max-width:720px">' +
          '<div class="a-modal__head"><h3>Certificate template \u00b7 ' + esc(S.courseTitle(el.getAttribute("data-id"))) + "</h3>" +
          '<button class="icon-btn" data-modal-x>' + ICONS.x + "</button></div>" +
          '<div class="a-modal__body"><div class="cert-preview">' + inner + "</div>" +
          '<p class="a-hint" style="margin:12px 0 0">Students receive this file when they complete the course. You can also print it from here.</p></div>' +
          '<div class="a-modal__foot"><a class="a-btn a-btn--primary" href="' + tpl.dataUrl + '" download="' + esc(tpl.fileName || "certificate") + '">' + ICONS.download + " Download template</a>" +
          '<button class="a-btn a-btn--ghost" data-modal-x>Close</button></div></div>'
        );
        document.querySelectorAll("[data-modal-x]").forEach(function (b) { b.addEventListener("click", closeModal); });
        document.querySelector("a[download]").setAttribute("target", "_blank");
        break;
      case "cert-remove":
        confirmModal({
          title: "Remove certificate template?",
          body: "The course will fall back to the automatic generated certificate.",
          okClass: "a-btn--danger",
          onOk: function () { S.clearCertTemplate(el.getAttribute("data-id")); toast("Template removed."); render(); }
        });
        break;

      case "settings-export":
        var blob = new Blob([S.exportAll()], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "edtech-lms-backup-" + new Date().toISOString().slice(0, 10) + ".json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 400);
        toast("Backup downloaded.");
        break;
      case "settings-clear-admin":
        confirmModal({
          title: "Clear admin data?",
          body: "Removes all admin courses, certificate templates, activity logs and the admin session. Student accounts and progress are untouched.",
          okClass: "a-btn--danger",
          onOk: function () {
            S.clearAdminData();
            toast("Admin data cleared.");
            window.location.href = "login.html";
          }
        });
        break;
      case "settings-wipe":
        confirmModal({
          title: "Reset the entire LMS?",
          body: "Deletes ALL browser data for this LMS \u2014 student accounts, enrolments, progress, admin courses, certificates and settings. This cannot be undone unless you exported a backup first.",
          okLabel: "Yes, wipe everything",
          okClass: "a-btn--danger",
          onOk: function () {
            S.wipeAll();
            window.location.href = "login.html";
          }
        });
        break;

      case "blog-new":
        openBlogPost();
        break;
      case "blog-edit":
        var blogList = S.getBlogPosts();
        var bp = null;
        for (var bi = 0; bi < blogList.length; bi++) {
          if (blogList[bi].id === el.getAttribute("data-id")) { bp = blogList[bi]; break; }
        }
        if (bp) openBlogPost(bp); else toast("Blog post not found.", true);
        break;
      case "blog-delete":
        confirmModal({
          title: "Delete blog post?",
          body: "This removes the article from the website immediately.",
          okClass: "a-btn--danger",
          onOk: function () {
            var bd = S.deleteBlogPost(el.getAttribute("data-id"));
            if (!bd.ok) toast(bd.error, true); else { toast("Blog post deleted."); render(); }
          }
        });
        break;

      case "goto-students":
        navigate("#students");
        break;
      case "goto-certificates":
        navigate("#certificates");
        break;
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", function () {
    S.adminLogout();
    window.location.href = "login.html";
  });

  /* search (courses + students) */
  appView.addEventListener("input", function (e) {
    if (e.target.id === "courseSearch") {
      var q = e.target.value.toLowerCase().trim();
      document.querySelectorAll("#courseRows tr").forEach(function (tr) {
        tr.style.display = tr.textContent.toLowerCase().indexOf(q) !== -1 ? "" : "none";
      });
    }
    if (e.target.id === "studentSearch") {
      var q2 = e.target.value.toLowerCase().trim();
      document.querySelectorAll("#studentRows tr").forEach(function (tr) {
        tr.style.display = tr.textContent.toLowerCase().indexOf(q2) !== -1 ? "" : "none";
      });
    }
  });

  /* ---------------- boot ---------------- */

  window.addEventListener("hashchange", render);

  initTheme();
  paintChrome();
  paintStorage();
  render();
})();