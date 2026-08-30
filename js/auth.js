(function () {
  "use strict";

  var KEYS = {
    users: "eth_users",
    session: "eth_session",
    enroll: "eth_enroll",
    progress: "eth_progress",
    resets: "eth_resets",
    activity: "eth_activity",
    catalog: "eth_catalog",
    catalogSeq: "eth_catalog_seq",
    certTemplates: "eth_cert_templates",
    applications: "eth_applications"
  };

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  function uid() {
    return "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
  }

  function users() {
    return read(KEYS.users, []);
  }

  function saveUsers(list) {
    write(KEYS.users, list);
  }

  function findByEmail(email) {
    var target = String(email || "").trim().toLowerCase();
    var list = users();
    for (var i = 0; i < list.length; i++) {
      if (list[i].email === target) return list[i];
    }
    return null;
  }

  function findById(id) {
    var list = users();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function sessionUserId() {
    return read(KEYS.session, null);
  }

  function setSession(id) {
    write(KEYS.session, id);
  }

  function currentUser() {
    var id = sessionUserId();
    return id ? findById(id) : null;
  }

  function requireAuth() {
    var user = currentUser();
    if (!user) {
      window.location.replace("login.html");
      return null;
    }
    return user;
  }

  function logout() {
    localStorage.removeItem(KEYS.session);
    window.location.href = "login.html";
  }

  function passwordScore(pw) {
    var score = 0;
    if (!pw) return 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw) && /\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 4);
  }

  function signup(data) {
    if (!data.fname.trim() || !data.lname.trim()) {
      return { ok: false, error: "Please enter your first and last name." };
    }
    if (!validEmail(data.email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (findByEmail(data.email)) {
      return { ok: false, error: "An account with this email already exists. Try logging in instead." };
    }
    if (!data.phone.trim()) {
      return { ok: false, error: "Please enter your phone number." };
    }
    if ((data.password || "").length < 8) {
      return { ok: false, error: "Password must be at least 8 characters long." };
    }
    if (data.password !== data.confirm) {
      return { ok: false, error: "Passwords do not match." };
    }

    var user = {
      id: uid(),
      fname: data.fname.trim(),
      lname: data.lname.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password,
      createdAt: Date.now()
    };

    var list = users();
    list.push(user);
    saveUsers(list);
    setSession(user.id);

    return { ok: true, user: user };
  }

  function login(email, password) {
    if (!validEmail(email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    var user = findByEmail(email);
    if (!user) {
      return { ok: false, error: "No account found with this email. Please sign up first." };
    }
    if (user.password !== password) {
      return { ok: false, error: "Incorrect password. Please try again or reset it below." };
    }
    setSession(user.id);
    return { ok: true, user: user };
  }

  function requestReset(email) {
    if (!validEmail(email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    var user = findByEmail(email);
    if (!user) {
      return { ok: false, error: "No account found with this email address." };
    }
    var code = "";
    for (var i = 0; i < 6; i++) code += Math.floor(Math.random() * 10);
    var resets = read(KEYS.resets, {});
    resets[user.email] = { code: code, exp: Date.now() + 15 * 60 * 1000 };
    write(KEYS.resets, resets);
    return { ok: true, code: code, email: user.email, fname: user.fname };
  }

  function verifyResetCode(email, code) {
    var resets = read(KEYS.resets, {});
    var entry = resets[String(email).trim().toLowerCase()];
    if (!entry) return { ok: false, error: "No reset request found. Please start again." };
    if (Date.now() > entry.exp) return { ok: false, error: "This code has expired. Please request a new one." };
    if (entry.code !== String(code).trim()) return { ok: false, error: "Incorrect code. Please check and try again." };
    return { ok: true };
  }

  function resetPassword(email, pw, confirm) {
    if ((pw || "").length < 8) {
      return { ok: false, error: "Password must be at least 8 characters long." };
    }
    if (pw !== confirm) {
      return { ok: false, error: "Passwords do not match." };
    }
    var list = users();
    var target = String(email).trim().toLowerCase();
    for (var i = 0; i < list.length; i++) {
      if (list[i].email === target) {
        list[i].password = pw;
        saveUsers(list);
        var resets = read(KEYS.resets, {});
        delete resets[target];
        write(KEYS.resets, resets);
        return { ok: true };
      }
    }
    return { ok: false, error: "Account not found." };
  }

  function updateUser(id, patch) {
    var list = users();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        for (var key in patch) {
          if (Object.prototype.hasOwnProperty.call(patch, key)) {
            list[i][key] = patch[key];
          }
        }
        saveUsers(list);
        return list[i];
      }
    }
    return null;
  }

  function allEnrollments() {
    return read(KEYS.enroll, {});
  }

  function enrollments(userId) {
    var data = allEnrollments();
    return data[userId] || [];
  }

  function saveEnrollments(userId, ids) {
    var data = allEnrollments();
    data[userId] = ids;
    write(KEYS.enroll, data);
  }

  function isEnrolled(userId, courseId) {
    return enrollments(userId).indexOf(courseId) !== -1;
  }

  function enroll(userId, courseId, title) {
    var ids = enrollments(userId);
    if (ids.indexOf(courseId) !== -1) return false;
    ids.push(courseId);
    saveEnrollments(userId, ids);
    logActivity(userId, "Enrolled in \u201c" + title + "\u201d");
    return true;
  }

  function unenroll(userId, courseId) {
    var ids = enrollments(userId);
    var idx = ids.indexOf(courseId);
    if (idx === -1) return;
    ids.splice(idx, 1);
    saveEnrollments(userId, ids);
  }

  function cart() {
    try { return JSON.parse(localStorage.getItem("eth_cart")) || []; }
    catch (e) { return []; }
  }

  function saveCart(ids) {
    localStorage.setItem("eth_cart", JSON.stringify(ids));
  }

  function cartAdd(courseId) {
    var ids = cart();
    if (ids.indexOf(courseId) !== -1) return false;
    ids.push(courseId);
    saveCart(ids);
    return true;
  }

  function cartRemove(courseId) {
    var ids = cart();
    var idx = ids.indexOf(courseId);
    if (idx === -1) return;
    ids.splice(idx, 1);
    saveCart(ids);
  }

  function cartClear() {
    localStorage.removeItem("eth_cart");
  }

  /* ---------------- digital product access applications ---------------- */

  function readApplications() {
    return read(KEYS.applications, []);
  }

  function saveApplications(list) {
    write(KEYS.applications, list);
  }

  function lastApplied(courseId, user) {
    var list = readApplications();
    var match = null;
    for (var i = 0; i < list.length; i++) {
      var app = list[i];
      if (Number(app.courseId) !== Number(courseId)) continue;
      var isMine = user ? (app.userId === user.id || (app.userId == null && String(app.email).toLowerCase() === String(user.email).toLowerCase())) : true;
      if (!isMine) continue;
      if (!match || app.ts > match.ts) match = app;
    }
    return match;
  }

  function accessApply(data) {
    if (!String(data.courseId).length || !data.option || !String(data.option.label).trim()) {
      return { ok: false, error: "Please choose a format." };
    }
    if (!String(data.name || "").trim()) {
      return { ok: false, error: "Please enter your full name." };
    }
    if (!validEmail(data.email)) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (!String(data.phone || "").trim()) {
      return { ok: false, error: "Please enter your phone number." };
    }
    var user = currentUser();
    var app = {
      id: "app_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      courseId: Number(data.courseId),
      courseTitle: String(data.courseTitle || ""),
      option: {
        label: String(data.option.label).trim(),
        price: String(data.option.price || ""),
        desc: String(data.option.desc || "")
      },
      name: String(data.name).trim(),
      email: String(data.email).trim(),
      phone: String(data.phone).trim(),
      note: String(data.note || "").trim(),
      userId: user ? user.id : null,
      status: "applied",
      ts: Date.now()
    };
    var list = readApplications();
    list.push(app);
    saveApplications(list);
    return { ok: true, app: app };
  }

  function myAccess() {
    var user = currentUser();
    var list = readApplications();
    var seen = {};
    var out = [];
    for (var i = list.length - 1; i >= 0; i--) {
      var app = list[i];
      var isMine = user
        ? (app.userId === user.id || (app.userId == null && String(app.email).toLowerCase() === String(user.email).toLowerCase()))
        : false;
      if (!isMine) continue;
      var key = app.courseId;
      if (seen[key]) continue;
      seen[key] = true;
      out.push(app);
    }
    return out;
  }

  function accessStatus(courseId) {
    var user = currentUser();
    var app = lastApplied(courseId, user);
    return app ? { applied: true, app: app } : { applied: false, app: null };
  }

  function refreshGetAccessButtons(courseId) {
    if (!document || !document.querySelectorAll) return;
    var sel = "[data-get-access]";
    document.querySelectorAll(sel).forEach(function (btn) {
      var id = Number(btn.getAttribute("data-get-access"));
      if (courseId != null && id !== Number(courseId)) return;
      var st = accessStatus(id);
      var applied = st.applied;
      btn.classList.toggle("is-applied", applied);
      btn.textContent = applied ? "Applied" : "Get Access";
      btn.disabled = applied;
    });
  }

  function showAccessModal(course, opts) {
    if (!course || typeof document === "undefined" || !document.createElement) return null;
    opts = opts || {};
    var current = currentUser();
    var existing = document.getElementById("accessOverlay");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.className = "access-overlay";
    overlay.id = "accessOverlay";

    var optionsHTML = (course.options || []).map(function (o, i) {
      return (
        '<label class="access-opt">' +
        '<input type="radio" name="access-opt" value="' + i + '"' + (i === 0 ? " checked" : "") + ">" +
        '<span class="access-opt__body"><span class="access-opt__label">' + escAttr(o.label) +
        '<b>' + escAttr(o.price || "") + "</b></span>" +
        (o.desc ? '<span class="access-opt__desc">' + escAttr(o.desc) + "</span>" : "") +
        "</span></label>"
      );
    }).join("");

    overlay.innerHTML =
      '<div class="access-card" role="dialog" aria-modal="true">' +
      '<div class="access-card__head">' +
      "<div><h3>Get Access</h3><p>" + escAttr(course.title) + "</p></div>" +
      '<button class="access-close" type="button" aria-label="Close">&times;</button></div>' +
      '<form class="access-form" novalidate>' +
      '<div class="access-field"><label class="access-label">Choose a format</label>' +
      '<div class="access-opts">' + optionsHTML + "</div></div>" +
      '<div class="access-field"><label class="access-label">Full name *</label>' +
      '<input class="access-input" type="text" name="name" value="' + escAttr(current ? ((current.fname || "") + " " + (current.lname || "")).trim() : "") + '" placeholder="Your full name"></div>' +
      '<div class="access-row">' +
      '<div class="access-field"><label class="access-label">Email *</label>' +
      '<input class="access-input" type="email" name="email" value="' + escAttr(current ? current.email : "") + '" placeholder="you@example.com"></div>' +
      '<div class="access-field"><label class="access-label">Phone *</label>' +
      '<input class="access-input" type="tel" name="phone" value="' + escAttr(current ? current.phone : "") + '" placeholder="e.g. 08012345678"></div>' +
      "</div>" +
      '<div class="access-field"><label class="access-label">How will you use it? <span class="access-optional">(optional)</span></label>' +
      '<textarea class="access-input access-input--area" name="note" rows="3" placeholder="A short note so we can prepare your access\u2026"></textarea></div>' +
      '<div class="access-card__foot">' +
      '<button type="button" class="btn access-cancel">Cancel</button>' +
      '<button type="submit" class="btn btn--primary access-submit">Get Access</button>' +
      "</div></form></div>";

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    function close() {
      overlay.remove();
      document.body.style.overflow = "";
    }

    overlay.addEventListener("mousedown", function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector(".access-close").addEventListener("click", close);
    overlay.querySelector(".access-cancel").addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    if (opts.focusFirst) {
      var first = overlay.querySelector("input[name=name]");
      if (first && !first.value) first.focus();
    }

    overlay.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var form = e.target;
      var sel = form.querySelector("input[name=access-opt]:checked");
      var opt = course.options[Number(sel ? sel.value : 0)];
      var res = accessApply({
        courseId: course.id,
        courseTitle: course.title,
        option: opt,
        name: form.querySelector("input[name=name]").value,
        email: form.querySelector("input[name=email]").value,
        phone: form.querySelector("input[name=phone]").value,
        note: form.querySelector("textarea[name=note]").value
      });
      if (!res.ok) {
        var alert = overlay.querySelector(".access-alert");
        if (!alert) {
          alert = document.createElement("div");
          alert.className = "access-alert";
          form.insertBefore(alert, form.firstChild);
        }
        alert.textContent = res.error;
        return;
      }
      overlay.innerHTML =
        '<div class="access-card access-card--done" role="dialog" aria-modal="true">' +
        '<div class="access-done">' +
        '<span class="access-done__icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>' +
        "<h3>Application received!</h3>" +
        "<p>Thanks, " + escAttr(res.app.name.split(" ")[0]) + ". Your request for <b>" + escAttr(course.title) + "</b> (" + escAttr(res.app.option.label) + ") has been noted. We\u2019ll confirm your access by email shortly.</p>" +
        '<button type="button" class="btn btn--primary access-done-close">Done</button>' +
        "</div></div>";
      overlay.querySelector(".access-done-close").addEventListener("click", close);
      refreshGetAccessButtons(course.id);
    });

    if (course.id != null) refreshGetAccessButtons(null);
    return overlay;
  }

  function escAttr(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function allProgress() {
    return read(KEYS.progress, {});
  }

  function userProgress(userId) {
    return allProgress()[userId] || {};
  }

  function courseProgress(userId, courseId) {
    return userProgress(userId)[courseId] || { done: [], quizzes: {}, completedAt: null };
  }

  function saveCourseProgress(userId, courseId, prog) {
    var data = allProgress();
    if (!data[userId]) data[userId] = {};
    data[userId][courseId] = prog;
    write(KEYS.progress, data);
  }

  function isLessonPassed(userId, courseId, lessonIdx) {
    return courseProgress(userId, courseId).done.indexOf(lessonIdx) !== -1;
  }

  function passQuiz(userId, courseId, lessonIdx, score, totalLessons, lessonTitle, courseTitle, passMark) {
    passMark = passMark === undefined ? 70 : Number(passMark);
    var prog = courseProgress(userId, courseId);
    var prev = prog.quizzes[lessonIdx] || { best: 0, attempts: 0 };
    prog.quizzes[lessonIdx] = {
      best: Math.max(prev.best, score),
      last: score,
      attempts: prev.attempts + 1,
      passMark: passMark,
      ts: Date.now()
    };
    if (score >= passMark && prog.done.indexOf(lessonIdx) === -1) {
      prog.done.push(lessonIdx);
    }
    prog.done.sort(function (a, b) { return a - b; });

    var justCompleted = false;
    if (!prog.completedAt && prog.done.length >= totalLessons) {
      prog.completedAt = Date.now();
      justCompleted = true;
    }
    saveCourseProgress(userId, courseId, prog);

    if (justCompleted) {
      logActivity(userId, "Completed \u201c" + courseTitle + "\u201d \u2014 certificate unlocked!");
    } else if (score >= passMark) {
      logActivity(userId, "Passed quiz \u201c" + lessonTitle + "\u201d with " + score + "%");
    }
    return { best: prog.quizzes[lessonIdx].best, passed: score >= passMark, justCompleted: justCompleted };
  }

  function recordFailedAttempt(userId, courseId, lessonIdx) {
    var prog = courseProgress(userId, courseId);
    var prev = prog.quizzes[lessonIdx] || { best: 0, attempts: 0 };
    prog.quizzes[lessonIdx] = {
      best: prev.best,
      last: 0,
      attempts: prev.attempts + 1,
      ts: Date.now()
    };
    saveCourseProgress(userId, courseId, prog);
  }

  function coursePercent(userId, courseId, totalLessons) {
    if (!totalLessons) return 0;
    var done = courseProgress(userId, courseId).done.length;
    return Math.round((done / totalLessons) * 100);
  }

  function avgBestScore(userId) {
    var prog = userProgress(userId);
    var scores = [];
    Object.keys(prog).forEach(function (cid) {
      var quizzes = prog[cid].quizzes || {};
      Object.keys(quizzes).forEach(function (li) {
        scores.push(quizzes[li].best);
      });
    });
    if (!scores.length) return 0;
    var sum = scores.reduce(function (a, b) { return a + b; }, 0);
    return Math.round(sum / scores.length);
  }

  function allActivities() {
    return read(KEYS.activity, {});
  }

  function getActivity(userId) {
    return allActivities()[userId] || [];
  }

  function logActivity(userId, text) {
    var data = allActivities();
    var list = data[userId] || [];
    list.unshift({ ts: Date.now(), text: text });
    data[userId] = list.slice(0, 15);
    write(KEYS.activity, data);
  }

  function initials(user) {
    return ((user.fname || "?").charAt(0) + (user.lname || "").charAt(0)).toUpperCase();
  }

  function fmtDate(ts) {
    if (!ts) return "\u2014";
    var d = new Date(ts);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  function readCatalog() {
    return read(KEYS.catalog, []);
  }

  function getCatalogCourse(id) {
    var list = readCatalog();
    id = Number(id);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function readCertTemplate(courseId) {
    var t = read(KEYS.certTemplates, {});
    return t[Number(courseId)] || null;
  }

  var eyeOpenSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
  var eyeOffSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>';
  var alertSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';
  var checkCircleSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';

  function showAlert(id, type, msg) {
    var box = document.getElementById(id);
    if (!box) return;
    box.className = "form-alert is-visible form-alert--" + type;
    box.innerHTML = (type === "error" ? alertSVG : checkCircleSVG) + "<span>" + msg + "</span>";
  }

  function hideAlert(id) {
    var box = document.getElementById(id);
    if (box) box.className = "form-alert";
  }

  function bindPasswordToggles(scope) {
    (scope || document).querySelectorAll(".pass-toggle").forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        var input = document.getElementById(btn.getAttribute("data-target"));
        if (!input) return;
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.innerHTML = show ? eyeOffSVG : eyeOpenSVG;
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      });
    });
  }

  function setLoading(btn, isLoading, label) {
    if (!btn) return;
    if (isLoading) {
      btn.dataset.originalText = btn.textContent;
      btn.textContent = label || "Please wait\u2026";
      btn.disabled = true;
      btn.style.opacity = "0.7";
      btn.style.pointerEvents = "none";
    } else {
      btn.textContent = btn.dataset.originalText || btn.textContent;
      btn.disabled = false;
      btn.style.opacity = "";
      btn.style.pointerEvents = "";
    }
  }

  function initLoginForm() {
    var form = document.getElementById("loginForm");
    if (!form) return;
    bindPasswordToggles(form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert("loginAlert");
      var email = document.getElementById("login-email").value;
      var password = document.getElementById("login-password").value;
      var btn = form.querySelector("button[type=submit]");
      setLoading(btn, true, "Logging in\u2026");

      setTimeout(function () {
        var res = login(email, password);
        if (!res.ok) {
          setLoading(btn, false);
          showAlert("loginAlert", "error", res.error);
          return;
        }
        showAlert("loginAlert", "success", "Welcome back, " + res.user.fname + "! Taking you to your dashboard\u2026");
        setTimeout(function () {
          window.location.href = "dashboard.html";
        }, 650);
      }, 450);
    });
  }

  function initSignupForm() {
    var form = document.getElementById("signupForm");
    if (!form) return;
    bindPasswordToggles(form);

    var pwInput = document.getElementById("signup-password");
    var meter = document.getElementById("pwStrength");
    var meterText = document.getElementById("pwStrengthText");
    var labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
    if (pwInput && meter) {
      pwInput.addEventListener("input", function () {
        var score = passwordScore(pwInput.value);
        meter.className = "strength" + (score ? " is-" + score : "");
        if (meterText) meterText.textContent = pwInput.value ? labels[score] : "";
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert("signupAlert");
      var btn = form.querySelector("button[type=submit]");
      setLoading(btn, true, "Creating account\u2026");

      setTimeout(function () {
        var res = signup({
          fname: document.getElementById("signup-fname").value,
          lname: document.getElementById("signup-lname").value,
          email: document.getElementById("signup-email").value,
          phone: document.getElementById("signup-phone").value,
          password: document.getElementById("signup-password").value,
          confirm: document.getElementById("signup-confirm").value
        });
        if (!res.ok) {
          setLoading(btn, false);
          showAlert("signupAlert", "error", res.error);
          return;
        }
        showAlert("signupAlert", "success", "Account created! Welcome aboard, " + res.user.fname + ". Opening your dashboard\u2026");
        setTimeout(function () {
          window.location.href = "dashboard.html";
        }, 900);
      }, 550);
    });
  }

  function initForgotFlow() {
    var step1 = document.getElementById("fpStep1");
    if (!step1) return;

    var state = { email: "", code: "" };

    function goStep(n) {
      [1, 2, 3].forEach(function (i) {
        document.getElementById("fpStep" + i).style.display = i === n ? "" : "none";
      });
      for (var i = 1; i <= 3; i++) {
        var dot = document.getElementById("stepDot" + i);
        var line = document.getElementById("stepLine" + i);
        if (dot) {
          dot.classList.toggle("is-done", i < n);
          dot.classList.toggle("is-active", i === n);
        }
        if (line) line.classList.toggle("is-done", i < n);
      }
    }

    var otpInputs = Array.prototype.slice.call(document.querySelectorAll(".otp-input"));
    otpInputs.forEach(function (input, i) {
      input.addEventListener("input", function () {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);
        if (input.value && otpInputs[i + 1]) otpInputs[i + 1].focus();
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !input.value && otpInputs[i - 1]) otpInputs[i - 1].focus();
      });
      input.addEventListener("paste", function (e) {
        e.preventDefault();
        var text = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, 6);
        text.split("").forEach(function (ch, j) {
          if (otpInputs[j]) otpInputs[j].value = ch;
        });
        if (text.length) otpInputs[Math.min(text.length, 5)].focus();
      });
    });

    document.getElementById("fpForm1").addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert("fpAlert1");
      var btn = this.querySelector("button[type=submit]");
      setLoading(btn, true, "Sending code\u2026");
      setTimeout(function () {
        var res = requestReset(document.getElementById("fp-email").value);
        if (!res.ok) {
          setLoading(btn, false);
          showAlert("fpAlert1", "error", res.error);
          return;
        }
        state.email = res.email;
        state.code = res.code;
        document.getElementById("fpEmailMasked").textContent = maskEmail(res.email);
        document.getElementById("demoCode").textContent = res.code.split("").join(" ");
        setLoading(btn, false);
        goStep(2);
      }, 500);
    });

    document.getElementById("fpForm2").addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert("fpAlert2");
      var code = otpInputs.map(function (i) { return i.value; }).join("");
      if (code.length !== 6) {
        showAlert("fpAlert2", "error", "Please enter all 6 digits of the code.");
        return;
      }
      var res = verifyResetCode(state.email, code);
      if (!res.ok) {
        showAlert("fpAlert2", "error", res.error);
        return;
      }
      goStep(3);
    });

    document.getElementById("fpResend").addEventListener("click", function (e) {
      e.preventDefault();
      var res = requestReset(state.email);
      if (res.ok) {
        state.code = res.code;
        document.getElementById("demoCode").textContent = res.code.split("").join(" ");
        showAlert("fpAlert2", "success", "A fresh code has been generated below.");
        otpInputs.forEach(function (i) { i.value = ""; });
        otpInputs[0].focus();
      }
    });

    document.getElementById("fpForm3").addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert("fpAlert3");
      var res = resetPassword(
        state.email,
        document.getElementById("fp-new").value,
        document.getElementById("fp-confirm").value
      );
      if (!res.ok) {
        showAlert("fpAlert3", "error", res.error);
        return;
      }
      goStep(4);
      setTimeout(function () {
        window.location.href = "login.html";
      }, 2200);
    });

    bindPasswordToggles(document);
  }

  function maskEmail(email) {
    var parts = email.split("@");
    var name = parts[0];
    var visible = name.slice(0, 2);
    return visible + "\u2022\u2022\u2022\u2022@" + parts[1];
  }

  function updateHeaderAuth() {
    if (document.body.hasAttribute("data-auth-page")) return;
    var actions = document.querySelector(".header__actions");
    if (!actions || !currentUser()) return;
    actions.innerHTML =
      '<a href="dashboard.html" class="btn btn--primary btn--enroll">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' +
      "My Dashboard</a>";
  }

  window.ETH = {
    KEYS: KEYS,
    currentUser: currentUser,
    requireAuth: requireAuth,
    logout: logout,
    signup: signup,
    login: login,
    requestReset: requestReset,
    verifyResetCode: verifyResetCode,
    resetPassword: resetPassword,
    updateUser: updateUser,
    passwordScore: passwordScore,
    enrollments: enrollments,
    isEnrolled: isEnrolled,
    enroll: enroll,
    unenroll: unenroll,
    cart: cart,
    cartAdd: cartAdd,
    cartRemove: cartRemove,
    cartClear: cartClear,
    accessApply: accessApply,
    myAccess: myAccess,
    accessStatus: accessStatus,
    showAccessModal: showAccessModal,
    refreshGetAccessButtons: refreshGetAccessButtons,
    courseProgress: courseProgress,
    isLessonPassed: isLessonPassed,
    passQuiz: passQuiz,
    recordFailedAttempt: recordFailedAttempt,
    coursePercent: coursePercent,
    avgBestScore: avgBestScore,
    getActivity: getActivity,
    logActivity: logActivity,
    readCatalog: readCatalog,
    getCatalogCourse: getCatalogCourse,
    readCertTemplate: readCertTemplate,
    initials: initials,
    fmtDate: fmtDate,
    showAlert: showAlert,
    hideAlert: hideAlert,
    setLoading: setLoading,
    bindPasswordToggles: bindPasswordToggles
  };

  function boot() {
    updateHeaderAuth();
    initLoginForm();
    initSignupForm();
    initForgotFlow();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
