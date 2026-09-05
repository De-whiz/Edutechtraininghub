const fs = require("fs");
const vm = require("vm");

const store = {};
const order = [];
let throwWrite = false;

function storedKeys() {
  return order.filter((k) => k in store);
}

const sandbox = {};
const lsMock = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => {
    if (throwWrite) throw new Error("QuotaExceededError");
    if (!(k in store)) order.push(k);
    store[k] = String(v);
  },
  removeItem: (k) => { delete store[k]; },
  key: (i) => storedKeys()[i] || null
};
Object.defineProperty(lsMock, "length", { get: () => storedKeys().length });
sandbox.localStorage = lsMock;
sandbox.document = {
  readyState: "loading",
  addEventListener: () => {},
  body: { hasAttribute: () => true },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null
};
sandbox.Math = Math; sandbox.JSON = JSON; sandbox.Date = Date; sandbox.console = console;
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("js/auth.js", "utf8"), sandbox);
vm.runInContext(fs.readFileSync("Admin/js/admin-store.js", "utf8"), sandbox);

const ETH = sandbox.window.ETH;
const A = sandbox.window.ETH_ADMIN;
let pass = 0, fail = 0;
function t(name, cond) {
  if (cond) { pass++; console.log("PASS " + name); }
  else { fail++; console.log("FAIL " + name); }
}

t("DEV_MODE is on", A.DEV_MODE === true);
t("default account seeded", A.getAccount().username === A.DEFAULT_USERNAME && A.getAccount().password === A.DEFAULT_PASSWORD);
t("login wrong rejected", A.adminLogin("Edutech Admin", "nope").ok === false);
t("login right accepted", A.adminLogin("Edutech Admin", "1234Asdf!!!").ok === true);
t("session persisted", A.isLoggedIn() === true);
A.adminLogout();
t("logout clears session", A.isLoggedIn() === false);

const cred = A.changeCredentials("New Admin", "newpass1");
t("dev change locked", cred.ok === false && cred.dev === true && /In development mode/.test(cred.error));
t("account unchanged in dev", A.getAccount().username === A.DEFAULT_USERNAME);

t("courses start empty", A.listCatalog().length === 0);

const blank = A.blankCourse();
t("next ids >= 100", blank.id >= 100);

res = A.saveCourse({ id: 5, title: "Too Low" });
t("id below 100 rejected", res.ok === false && /Invalid course id/.test(res.error));

res = A.saveCourse({ id: blank.id, title: "  " });
t("untitled course rejected", res.ok === false && /title/.test(res.error));

let course = blank;
course.title = "Prompt Engineering Basics";
course.modules = [
  {
    id: "m1", title: "Module 1: Foundations",
    lessons: [{ id: "l1", title: "Intro", mins: 8, video: { type: "none", url: "" }, content: ["Hello."] }],
    examEnabled: true,
    exam: { title: "M1 Exam", passMark: 50, questions: [{ q: "Q1?", options: ["A", "B"], answer: 0 }] }
  }
];
res = A.saveCourse(course);
t("course saves", res.ok === true);
const cid = res.course.id;
t("getCourse returns it", A.getCourse(cid).title === "Prompt Engineering Basics");
t("courseTitle resolves", A.courseTitle(cid) === "Prompt Engineering Basics");
t("module-aware lesson total", A.courseLessonTotal(cid) === 2);
t("action logged", A.getActions().some((a) => /Prompt Engineering/.test(a.text)));
t("summary counts 1/1/1/0", A.summaryOf(A.getCourse(cid)).modules === 1 && A.summaryOf(A.getCourse(cid)).lessons === 1 && A.summaryOf(A.getCourse(cid)).exams === 1 && A.summaryOf(A.getCourse(cid)).videos === 0);

/* ---- digital product type ---- */

let prod = A.blankProduct();
prod.title = "Darkroom Course Pack";
prod.options = [];
res = A.saveCourse(prod);
t("product with no formats rejected", res.ok === false && /least one format/.test(res.error));

prod = A.blankProduct();
prod.title = "Darkroom Course Pack";
prod.options = [{ label: "", price: "\u20a65,000", priceNum: 5000 }];
res = A.saveCourse(prod);
t("product format without label rejected", res.ok === false && /needs a label/.test(res.error));

prod = A.blankProduct();
prod.title = "Darkroom Course Pack";
prod.options = [{ label: "E-Book", price: "", priceNum: 0 }];
res = A.saveCourse(prod);
t("product format without price rejected", res.ok === false && /needs a price/.test(res.error));

prod = A.blankProduct();
res = A.saveCourse(prod);
t("untitled product rejected", res.ok === false && /title/.test(res.error));

prod = A.blankProduct();
const pid = prod.id;
prod.title = "Darkroom Course Pack";
prod.desc = "A digital pack.";
prod.options = [
  { label: "E-Book", price: "\u20a65,000", priceNum: 0, desc: "PDF guide" },
  { label: "E-Book + Templates", price: "\u20a612,000", priceNum: 12000, desc: "Plus editable files" },
  { label: "Full Kit", price: "\u20a68,500", priceNum: 0, desc: "Everything" }
];
res = A.saveCourse(prod);
t("product saves", res.ok === true);
const p = A.getCourse(pid);
t("product type preserved", p.type === "product");
t("product options preserved", p.options.length === 3 && p.options[0].label === "E-Book");
t("option priceNum derived from string", p.options[0].priceNum === 5000);
t("product priceNum is min", p.priceNum === 5000);
t("product has no modules", (p.modules || []).length === 0);

t("standard course keeps type course", A.getCourse(cid).type === "course");

res = A.setPublished(cid, false);
t("publish flag toggles", res.ok === true && A.getCourse(cid).published === false);

let bad = A.getCourse(cid);
bad.modules[0].exam.passMark = 30;
res = A.saveCourse(bad);
t("pass mark below 40 rejected", res.ok === false && /pass mark/.test(res.error));

bad = A.getCourse(cid);
bad.modules[0].exam.questions = [{ q: "Only one option", options: ["A"], answer: 0 }];
res = A.saveCourse(bad);
t("incomplete exam question rejected", res.ok === false && /incomplete question/.test(res.error));

const dup = A.duplicateCourse(cid);
t("duplicate creates copy", dup.ok === true && dup.course.id > cid && /\(Copy\)/.test(dup.course.title) && dup.course.published === false);

const tpl = { fileName: "cert.pdf", size: 100, mime: "application/pdf", dataUrl: "data:application/pdf;base64,JVBERi0=", uploadedAt: Date.now() };
t("cert template set", A.setCertTemplate(cid, tpl).ok === true);
t("cert template get", A.getCertTemplate(cid).fileName === "cert.pdf");

t("10 MB file rejected", A.validateSize({ name: "big.mp4", size: A.FILE_LIMIT_BYTES + 1 }).ok === false && /test mode exceeded/.test(A.validateSize({ name: "big.mp4", size: A.FILE_LIMIT_BYTES + 1 }).error));
t("small file accepted", A.validateSize({ name: "ok.png", size: 1024 }).ok === true);
t("fmtBytes labels", A.fmtBytes(0) === "0 B" && A.fmtBytes(1024) === "1.0 KB");

t("enroll user", A.enrollUser("u1", cid).ok === true);
t("double enroll blocked", A.enrollUser("u1", cid).ok === false);
t("force complete", A.forceComplete("u1", cid).ok === true);
let stats = A.enrollmentStats().stats;
t("stats count seats/completed", stats.seats === 1 && stats.completed === 1 && stats.enrolledUsers === 1);
t("unenroll", A.unenrollUser("u1", cid).ok === true);
t("unenroll not enrolled", A.unenrollUser("u1", cid).ok === false);

throwWrite = true;
const full = A.setPublished(cid, true);
t("quota error surfaces", full.ok === false && /Storage is full/.test(full.error));
throwWrite = false;

const exportStr = A.exportAll();
t("export is JSON with data", (() => { try { const j = JSON.parse(exportStr); return !!j.data; } catch (e) { return false; } })());
A.wipeAll();
t("wipe empties catalog", A.listCatalog().length === 0);
t("account reseeded after wipe", A.getAccount().username === A.DEFAULT_USERNAME);
const imp = A.importAll(exportStr);
t("import restores", imp.ok === true && imp.count > 0);
t("import restores course", A.getCourse(cid) && A.getCourse(cid).title === "Prompt Engineering Basics");
t("import restores cert template", A.getCertTemplate(cid).fileName === "cert.pdf");
t("import bad json rejected", A.importAll("{nope").ok === false && /not valid JSON/.test(A.importAll("{nope").error));
t("import wrong shape rejected", A.importAll('{"foo":1}').ok === false && /missing the/.test(A.importAll('{"foo":1}').error));

t("clear admin data keeps account", A.clearAdminData().ok === true && A.getAccount().username === A.DEFAULT_USERNAME);

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);