/* AdminStore — EdTech Training Hub admin data layer (localStorage only). */
(function () {
  "use strict";

  var FILE_LIMIT_BYTES = 10 * 1024 * 1024;      /* 10 MB per file in test mode */
  var STORAGE_QUOTA = 5 * 1024 * 1024;          /* ~5 MB localStorage soft limit */
  var DEV_MODE = true;                          /* flips false at production handover */

  var KEYS = {
    account: "eth_admin_account",
    session: "eth_admin_session",
    catalog: "eth_catalog",
    seq: "eth_catalog_seq",
    log: "eth_admin_log",
    certTemplates: "eth_cert_templates",
    users: "eth_users",
    enroll: "eth_enroll",
    progress: "eth_progress",
    blog: "eth_blog_posts"
  };

  var DEFAULT_USERNAME = "Edutech Admin";
  var DEFAULT_PASSWORD = "1234Asdf!!!";

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
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Storage is full \u2014 remove large videos or files, or export and clear data to free space." };
    }
  }

  function estimateSize(value) {
    try { return (JSON.stringify(value) || "").length * 2; } catch (e) { return 0; }
  }

  function storageBytes() {
    var total = 0;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        var v = localStorage.getItem(k);
        total += (k.length + (v ? v.length : 0)) * 2;
      }
    } catch (e) {}
    return total;
  }

  function storageLimit() {
    return STORAGE_QUOTA;
  }

  function storageReport() {
    return { usedBytes: storageBytes(), limitBytes: STORAGE_QUOTA };
  }

  function fmtBytes(bytes) {
    if (!bytes) return "0 B";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  function validateSize(file, maxBytes) {
    maxBytes = maxBytes || FILE_LIMIT_BYTES;
    if (!file) return { ok: false, error: "No file selected." };
    if (file.size > maxBytes) {
      return {
        ok: false,
        error: "File size in test mode exceeded \u2014 maximum allowed is " + fmtBytes(maxBytes) + " (this file is " + fmtBytes(file.size) + ")."
      };
    }
    return { ok: true, size: file.size };
  }

  function readFileAsDataUrl(file, opts) {
    opts = opts || {};
    var maxBytes = opts.maxBytes || FILE_LIMIT_BYTES;
    var label = opts.label || "file";
    return new Promise(function (resolve) {
      var check = validateSize(file, maxBytes);
      if (!check.ok) { resolve(check); return; }
      if (typeof FileReader === "undefined") {
        resolve({ ok: false, error: "File reading is not supported in this environment." });
        return;
      }
      var reader = new FileReader();
      reader.onerror = function () {
        resolve({ ok: false, error: "Could not read that " + label + "." });
      };
      reader.onload = function () {
        resolve({
          ok: true,
          dataUrl: reader.result,
          fileName: file.name || "",
          size: file.size,
          mime: (file.type || (reader.result || "").split(",")[0] || "application/octet-stream").split(":")[1] || ""
        });
      };
      reader.readAsDataURL(file);
    });
  }

  /* ---------------- admin auth ---------------- */

  function seedAccount() {
    var acc = read(KEYS.account, null);
    if (acc && acc.username !== undefined && acc.password !== undefined) return acc;
    acc = { username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD, seededAt: Date.now() };
    write(KEYS.account, acc);
    return acc;
  }

  function getAccount() {
    return seedAccount();
  }

  function adminLogin(username, password) {
    var acc = getAccount();
    if (!username || !password) {
      return { ok: false, error: "Please enter your username and password." };
    }
    var u = String(username).trim();
    var p = String(password);
    if (u.toLowerCase() === String(acc.username).toLowerCase() && p === acc.password) {
      write(KEYS.session, { username: acc.username, ts: Date.now() });
      logAction("Admin logged in");
      return { ok: true, account: acc };
    }
    return { ok: false, error: "Incorrect admin credentials. Try the development credentials shown below." };
  }

  function isLoggedIn() {
    var s = read(KEYS.session, null);
    return !!(s && s.username);
  }

  function adminLogout() {
    try { localStorage.removeItem(KEYS.session); } catch (e) {}
  }

  function requireAdmin() {
    if (!isLoggedIn()) window.location.replace("login.html");
  }

  function changeCredentials(username, password) {
    if (DEV_MODE) {
      return {
        ok: false,
        dev: true,
        error: "In development mode. Username / password changes are disabled and will take effect in production after handover."
      };
    }
    var acc = getAccount();
    if (username) acc.username = String(username).trim();
    if (password) acc.password = String(password);
    var res = write(KEYS.account, acc);
    if (!res.ok) return res;
    logAction("Admin credentials changed");
    return { ok: true };
  }

  /* ---------------- catalog CRUD ---------------- */

  function nextCourseId() {
    var n = read(KEYS.seq, 100);
    var id = Math.max(100, n + 1);
    write(KEYS.seq, id);
    return id;
  }

  function listCatalog() {
    return read(KEYS.catalog, []);
  }

  function getCourse(id) {
    var list = listCatalog();
    id = Number(id);
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function saveCourse(course) {
    if (!course) return { ok: false, error: "No course to save." };
    course.id = Number(course.id);
    if (!course.id || course.id < 100) return { ok: false, error: "Invalid course id." };
    if (!course.title || !String(course.title).trim()) {
      return { ok: false, error: "Please give the course a title." };
    }

    if (course.type === "product") {
      var opts = course.options || [];
      if (!opts.length) {
        return { ok: false, error: "Digital products need at least one format with a label and price." };
      }
      for (var z = 0; z < opts.length; z++) {
        var opt = opts[z] || {};
        if (!String(opt.label || "").trim()) {
          return { ok: false, error: "Format " + (z + 1) + " needs a label (e.g. \u201cE-Book\u201d)." };
        }
        var pn = Number(opt.priceNum) === 0 ? parsePriceNum(opt.price) : Number(opt.priceNum);
        if (!(Number(opt.priceNum) > 0) && !(pn > 0)) {
          return { ok: false, error: "Format \u201c" + opt.label + "\u201d needs a price." };
        }
      }
      course.options = opts.map(function (o) {
        o.priceNum = Number(o.priceNum) === 0 ? parsePriceNum(o.price) : Number(o.priceNum);
        return o;
      });
      course.priceNum = productMinPrice(course);
      course.modules = [];
      return saveCourseCore(course);
    }

    course.type = "course";

    var mods = course.modules || [];
    for (var m = 0; m < mods.length; m++) {
      var mod = mods[m];
      if (mod.examEnabled) {
        var pm = Number(mod.exam && mod.exam.passMark);
        if (isNaN(pm) || pm < 40 || pm > 100) {
          return { ok: false, error: "Module \u201c" + (mod.title || "Module " + (m + 1)) + "\u201d exam pass mark must be between 40 and 100." };
        }
        var qs = (mod.exam && mod.exam.questions) || [];
        for (var q = 0; q < qs.length; q++) {
          var qq = qs[q];
          var opts = qq.options || [];
          if (!qq.q || !String(qq.q).trim() || opts.length < 1 || opts.filter(function (o) { return String(o || "").trim(); }).length < 2) {
            return { ok: false, error: "Exam in \u201c" + (mod.title || "Module " + (m + 1)) + "\u201d has an incomplete question (needs a question and at least 2 options)." };
          }
        }
      }
    }

    return saveCourseCore(course);
  }

  function saveCourseCore(course) {
    var list = listCatalog();
    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === course.id) {
        list[i] = course;
        found = true;
        break;
      }
    }
    if (!found) list.push(course);
    course.updatedAt = Date.now();
    if (!course.createdAt) course.createdAt = course.updatedAt;

    var res = write(KEYS.catalog, list);
    if (!res.ok) return res;
    logAction("Saved course \u201c" + course.title + "\u201d");
    return { ok: true, course: course };
  }

  function parsePriceNum(price) {
    return Number(parseInt(String(price || "").replace(/[^\d]/g, ""), 10)) || 0;
  }

  function productMinPrice(product) {
    var opts = (product && product.options) || [];
    var min = 0;
    opts.forEach(function (o) {
      var p = Number(o && o.priceNum);
      if (!(p > 0)) p = parsePriceNum(o && o.price);
      if (p > 0 && (min === 0 || p < min)) min = p;
    });
    return min;
  }

  function deleteCourse(id) {
    var list = listCatalog();
    var kept = list.filter(function (c) { return c.id !== Number(id); });
    if (kept.length === list.length) {
      return { ok: false, error: "Course not found." };
    }
    var res = write(KEYS.catalog, kept);
    if (!res.ok) return res;
    clearCertTemplate(id);
    logAction("Deleted course #" + id);
    return { ok: true };
  }

  function setPublished(id, published) {
    var c = getCourse(id);
    if (!c) return { ok: false, error: "Course not found." };
    c.published = published !== false;
    return saveCourse(c);
  }

  function duplicateCourse(id) {
    var src = getCourse(id);
    if (!src) return { ok: false, error: "Course not found." };
    var copy = JSON.parse(JSON.stringify(src));
    copy.id = nextCourseId();
    copy.title = src.title + " (Copy)";
    copy.published = false;
    copy.createdAt = Date.now();
    copy.updatedAt = copy.createdAt;
    var res = saveCourse(copy);
    if (res.ok) logAction("Duplicated \u201c" + src.title + "\u201d as \u201c" + copy.title + "\u201d");
    return res;
  }

  function blankCourse() {
    return {
      id: nextCourseId(),
      type: "course",
      title: "",
      tagline: "",
      desc: "",
      price: "\u20a6",
      priceNum: 0,
      duration: "4 weeks",
      level: "All Levels",
      format: "Self-Paced",
      cat: "digital-skills",
      featured: false,
      modules: [],
      published: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  }

  function blankProduct() {
    var base = blankCourse();
    base.type = "product";
    base.price = "From \u20a6";
    base.duration = "Instant access";
    base.level = "All Levels";
    base.format = "Digital Product";
    base.options = [
      { label: "", price: "\u20a6", priceNum: 0, desc: "" }
    ];
    return base;
  }

  /* ---------------- certificate templates ---------------- */

  function getCertTemplates() {
    return read(KEYS.certTemplates, {});
  }

  function getCertTemplate(courseId) {
    var t = getCertTemplates();
    return t[Number(courseId)] || null;
  }

  function setCertTemplate(courseId, meta) {
    var t = getCertTemplates();
    t[Number(courseId)] = meta;
    var res = write(KEYS.certTemplates, t);
    if (res.ok) logAction("Uploaded certificate template for course #" + courseId);
    return res;
  }

  function clearCertTemplate(courseId) {
    var t = getCertTemplates();
    if (t[Number(courseId)]) {
      delete t[Number(courseId)];
      write(KEYS.certTemplates, t);
    }
  }

  /* ---------------- static course registry (shared with public site) ---------------- */

  function staticCourses() {
    if (typeof window !== "undefined" && window.ETH_COURSES) return window.ETH_COURSES;
    return [];
  }

  function courseTitle(courseId) {
    courseId = Number(courseId);
    var c = getCourse(courseId);
    if (c) return c.title;
    var statics = staticCourses();
    for (var i = 0; i < statics.length; i++) {
      if (Number(statics[i].id) === courseId) return statics[i].title;
    }
    return "Course #" + courseId;
  }

  function courseLessonTotal(courseId) {
    var c = getCourse(courseId) || null;
    var statics = staticCourses();
    if (!c) {
      for (var i = 0; i < statics.length; i++) {
        if (Number(statics[i].id) === Number(courseId)) { c = statics[i]; break; }
      }
    }
    if (!c) return 0;
    if (c.modules && c.modules.length) {
      var total = 0;
      c.modules.forEach(function (m) {
        total += (m.lessons || []).length;
        if (m.examEnabled) total += 1;
      });
      return total;
    }
    var weeks = parseInt(String(c.duration || ""), 10);
    var base = isNaN(weeks) ? 4 : weeks + 1;
    return Math.min(6, Math.max(4, base));
  }

  /* ---------------- students ---------------- */

  function listUsers() {
    return read(KEYS.users, []);
  }

  function allEnrollments() {
    return read(KEYS.enroll, {});
  }

  function allProgress() {
    return read(KEYS.progress, {});
  }

  function enrollUser(userId, courseId) {
    var data = allEnrollments();
    var ids = data[userId] || [];
    courseId = Number(courseId);
    if (ids.indexOf(courseId) !== -1) return { ok: false, error: "Already enrolled." };
    ids.push(courseId);
    data[userId] = ids;
    var res = write(KEYS.enroll, data);
    if (res.ok) logAction("Enrolled student in \u201c" + courseTitle(courseId) + "\u201d");
    return res;
  }

  function unenrollUser(userId, courseId) {
    var data = allEnrollments();
    var ids = data[userId] || [];
    var idx = ids.indexOf(Number(courseId));
    if (idx === -1) return { ok: false, error: "Student is not enrolled in that course." };
    ids.splice(idx, 1);
    data[userId] = ids;
    var res = write(KEYS.enroll, data);
    if (res.ok) logAction("Unenrolled student from \u201c" + courseTitle(courseId) + "\u201d");
    return res;
  }

  function resetProgress(userId, courseId) {
    var data = allProgress();
    if (data[userId] && data[userId][courseId] !== undefined) {
      delete data[userId][courseId];
      write(KEYS.progress, data);
    }
    logAction("Reset progress for course \u201c" + courseTitle(courseId) + "\u201d");
    return { ok: true };
  }

  function forceComplete(userId, courseId) {
    var total = courseLessonTotal(courseId);
    if (!total) return { ok: false, error: "Could not determine lesson count." };
    var data = allProgress();
    if (!data[userId]) data[userId] = {};
    var done = [];
    var quizzes = {};
    for (var i = 0; i < total; i++) {
      done.push(i);
      quizzes[i] = { best: 100, last: 100, attempts: 1, passMark: 70, ts: Date.now() };
    }
    data[userId][courseId] = { done: done, quizzes: quizzes, completedAt: Date.now() };
    var res = write(KEYS.progress, data);
    if (res.ok) logAction("Marked \u201c" + courseTitle(courseId) + "\u201d complete for a student");
    return res;
  }

  function enrollmentStats() {
    var enroll = allEnrollments();
    var prog = allProgress();
    var byCourse = {};
    var stats = { students: listUsers().length, seats: 0, enrolledUsers: 0, completed: 0 };
    Object.keys(enroll).forEach(function (uid) {
      var ids = enroll[uid] || [];
      if (ids.length) stats.enrolledUsers++;
      stats.seats += ids.length;
      ids.forEach(function (cid) {
        if (!byCourse[cid]) byCourse[cid] = { seats: 0, completed: 0, title: courseTitle(cid) };
        byCourse[cid].seats++;
        if (prog[uid] && prog[uid][cid] && prog[uid][cid].completedAt) {
          byCourse[cid].completed++;
          stats.completed++;
        }
      });
    });
    var top = Object.keys(byCourse).map(function (cid) { return byCourse[cid]; })
      .sort(function (a, b) { return b.seats - a.seats; })
      .slice(0, 5);
    return { stats: stats, top: top };
  }

  /* ---------------- blog ---------------- */

  function getBlogPosts() {
    var list = read(KEYS.blog, []);
    return Array.isArray(list) ? list : [];
  }

  function saveBlogPost(post) {
    if (!post) return { ok: false, error: "No blog post to save." };
    if (!String(post.title || "").trim()) {
      return { ok: false, error: "Please give the post a title." };
    }
    if (!String(post.content || "").trim()) {
      return { ok: false, error: "Please write some body content." };
    }
    var list = getBlogPosts();
    post.id = String(post.id || ("blog_" + Date.now()));
    post.date = String(post.date || new Date().toISOString().slice(0, 10));
    post.readTime = String(post.readTime || "");
    if (!Array.isArray(post.tags)) post.tags = [];
    if (!String(post.category || "").trim()) post.category = "News";
    if (!String(post.author || "").trim()) post.author = "EdTech Training Hub Team";

    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === post.id) { list[i] = post; found = true; break; }
    }
    if (!found) list.unshift(post);

    var res = write(KEYS.blog, list);
    if (!res.ok) return res;
    logAction("Published blog \u201c" + post.title + "\u201d");
    return { ok: true, post: post };
  }

  function deleteBlogPost(id) {
    var list = getBlogPosts();
    var kept = list.filter(function (p) { return p.id !== String(id); });
    if (kept.length === list.length) {
      return { ok: false, error: "Blog post not found." };
    }
    var res = write(KEYS.blog, kept);
    if (!res.ok) return res;
    logAction("Deleted a blog post");
    return { ok: true };
  }

  /* ---------------- activity log ---------------- */

  function getActions() {
    return read(KEYS.log, []);
  }

  function logAction(text) {
    var list = getActions();
    list.unshift({ ts: Date.now(), text: String(text || "") });
    write(KEYS.log, list.slice(0, 60));
  }

  /* ---------------- data tools ---------------- */

  function exportAll() {
    var out = { exportedAt: Date.now(), data: {} };
    try {
      var keysToExport = ["eth_users", "eth_enroll", "eth_progress", "eth_cart", "eth_activity", "eth_resets", "eth_blog_posts", KEYS.catalog, KEYS.seq, KEYS.certTemplates, KEYS.log, KEYS.account];
      var seen = {};
      keysToExport.forEach(function (k) {
        if (seen[k]) return;
        seen[k] = true;
        try { out.data[k] = JSON.parse(localStorage.getItem(k) || "null"); } catch (e) {}
      });
    } catch (e) {}
    return JSON.stringify(out);
  }

  function importAll(json) {
    var parsed = null;
    try { parsed = JSON.parse(json); } catch (e) {
      return { ok: false, error: "That file is not valid JSON." };
    }
    if (!parsed || typeof parsed !== "object" || !parsed.data) {
      return { ok: false, error: "Unsupported backup file \u2014 missing the \u201cdata\u201d object." };
    }
    var written = 0;
    for (var key in parsed.data) {
      if (Object.prototype.hasOwnProperty.call(parsed.data, key)) {
        var res = write(key, parsed.data[key]);
        if (!res.ok) return res;
        written++;
      }
    }
    logAction("Imported backup (" + written + " data areas)");
    return { ok: true, count: written };
  }

  function clearAdminData() {
    try {
      localStorage.removeItem(KEYS.session);
      localStorage.removeItem(KEYS.log);
      localStorage.removeItem(KEYS.catalog);
      localStorage.removeItem(KEYS.seq);
      localStorage.removeItem(KEYS.certTemplates);
    } catch (e) {}
    seedAccount();
    return { ok: true };
  }

  function wipeAll() {
    var keep = [];
    try {
      for (var i = localStorage.length - 1; i >= 0; i--) {
        var k = localStorage.key(i);
        if (String(k).indexOf("eth_") === 0) keep.push(k);
      }
      keep.forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} });
    } catch (e) {}
    seedAccount();
    return { ok: true };
  }

  /* ---------------- sample catalog import ---------------- */

  function importSeedCatalog(seedList) {
    if (!Array.isArray(seedList)) {
      return { ok: false, error: "Seed file does not contain a course list." };
    }
    var list = listCatalog();
    var imported = 0;
    var skipped = 0;
    var firstError = null;

    seedList.forEach(function (seed) {
      if (!seed || !String(seed.title || "").trim()) { skipped++; return; }
      var exists = list.some(function (c) {
        return String(c.title || "").trim().toLowerCase() === String(seed.title).trim().toLowerCase();
      });
      if (exists) { skipped++; return; }

      var course = JSON.parse(JSON.stringify(seed));
      course.type = "course";
      course.published = course.published !== false;
      course.featured = !!course.featured;
      course.priceNum = Number(course.priceNum) || parsePriceNum(course.price);
      course.price = course.price || "\u20a60";
      if (!course.cat) course.cat = "digital-skills";
      if (course.modules && Array.isArray(course.modules)) {
        course.modules = course.modules.map(function (m, mi) {
          return {
            id: "m" + mi + "_" + course.id,
            title: String(m.title || "Module " + (mi + 1)),
            lessons: (m.lessons || []).map(function (l, li) {
              return {
                id: "l" + li + "_" + course.id,
                title: String(l.title || "Lesson " + (li + 1)),
                mins: Number(l.mins) > 0 ? Number(l.mins) : 15,
                video: l.video || { type: "none", url: "" },
                content: Array.isArray(l.content) && l.content.length ? l.content : [String(l.title || "Lesson " + (li + 1))]
              };
            }),
            examEnabled: false
          };
        });
      } else {
        course.modules = [];
      }

      if (!Number(course.id) || Number(course.id) < 100) course.id = nextCourseId();
      course.id = Number(course.id);

      var hasId = list.some(function (c) { return c.id === course.id; });
      if (hasId) course.id = nextCourseId();

      list.push(course);
      imported++;
    });

    if (!imported) {
      return { ok: true, imported: 0, skipped: skipped, message: "Nothing to import \u2014 your catalog already has all sample courses." };
    }

    var res = write(KEYS.catalog, list);
    if (!res.ok) return res;
    logAction("Imported " + imported + " sample course" + (imported === 1 ? "" : "s"));
    return { ok: true, imported: imported, skipped: skipped };
  }

  /* ---------------- statico helpers used by UI ---------------- */

  function summaryOf(course) {
    var mods = course.modules || [];
    var lessons = 0, exams = 0, videos = 0;
    mods.forEach(function (m) {
      lessons += (m.lessons || []).length;
      if (m.examEnabled) exams++;
      (m.lessons || []).forEach(function (l) {
        if (l.video && l.video.type === "file" && l.video.src) videos++;
        if (l.video && l.video.type === "url" && l.video.url) videos++;
      });
    });
    return { modules: mods.length, lessons: lessons, exams: exams, videos: videos };
  }

  window.ETH_ADMIN = {
    KEYS: KEYS,
    DEV_MODE: DEV_MODE,
    DEFAULT_USERNAME: DEFAULT_USERNAME,
    DEFAULT_PASSWORD: DEFAULT_PASSWORD,
    FILE_LIMIT_BYTES: FILE_LIMIT_BYTES,
    validateSize: validateSize,
    readFileAsDataUrl: readFileAsDataUrl,
    fmtBytes: fmtBytes,
    storageBytes: storageBytes,
    storageLimit: storageLimit,
    storageReport: storageReport,
    getAccount: getAccount,
    adminLogin: adminLogin,
    isLoggedIn: isLoggedIn,
    adminLogout: adminLogout,
    requireAdmin: requireAdmin,
    changeCredentials: changeCredentials,
    listCatalog: listCatalog,
    getCourse: getCourse,
    saveCourse: saveCourse,
    deleteCourse: deleteCourse,
    setPublished: setPublished,
    duplicateCourse: duplicateCourse,
    blankCourse: blankCourse,
    blankProduct: blankProduct,
    productMinPrice: productMinPrice,
    nextCourseId: nextCourseId,
    getCertTemplates: getCertTemplates,
    getCertTemplate: getCertTemplate,
    setCertTemplate: setCertTemplate,
    clearCertTemplate: clearCertTemplate,
    staticCourses: staticCourses,
    courseTitle: courseTitle,
    courseLessonTotal: courseLessonTotal,
    listUsers: listUsers,
    allEnrollments: allEnrollments,
    allProgress: allProgress,
    enrollUser: enrollUser,
    unenrollUser: unenrollUser,
    resetProgress: resetProgress,
    forceComplete: forceComplete,
    enrollmentStats: enrollmentStats,
    getActions: getActions,
    logAction: logAction,
    exportAll: exportAll,
    importAll: importAll,
    clearAdminData: clearAdminData,
    wipeAll: wipeAll,
    importSeedCatalog: importSeedCatalog,
    summaryOf: summaryOf,
    getBlogPosts: getBlogPosts,
    saveBlogPost: saveBlogPost,
    deleteBlogPost: deleteBlogPost
  };
})();