const fs = require("fs");
const vm = require("vm");

const store = {};
const sandbox = {
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  },
  document: {
    readyState: "loading",
    addEventListener: () => {},
    body: { hasAttribute: () => true },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null
  },
  Math, JSON, Date, console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("js/auth.js", "utf8"), sandbox);

const ETH = sandbox.window.ETH;
let pass = 0, fail = 0;
function t(name, cond) {
  if (cond) { pass++; console.log("PASS " + name); }
  else { fail++; console.log("FAIL " + name); }
}

let r = ETH.signup({ fname: "Chinwe", lname: "Okafor", email: "chinwe@test.com", phone: "08012345678", password: "secret123", confirm: "secret123" });
t("signup succeeds", r.ok === true);
t("session set", ETH.currentUser().email === "chinwe@test.com");
t("no free enrollment at signup", ETH.enrollments(ETH.currentUser().id).length === 0);

r = ETH.signup({ fname: "A", lname: "B", email: "CHINWE@test.com", phone: "1", password: "secret123", confirm: "secret123" });
t("duplicate email blocked", r.ok === false);

r = ETH.signup({ fname: "A", lname: "B", email: "x@y.com", phone: "1", password: "short", confirm: "short" });
t("short password blocked", r.ok === false && /8 characters/.test(r.error));

r = ETH.signup({ fname: "A", lname: "B", email: "x@y.com", phone: "1", password: "longenough1", confirm: "different12" });
t("confirm mismatch blocked", r.ok === false && /match/.test(r.error));

r = ETH.login("chinwe@test.com", "wrongpass");
t("wrong password rejected", r.ok === false);

r = ETH.login("chinwe@test.com", "secret123");
t("login succeeds", r.ok === true);

r = ETH.requestReset("nobody@test.com");
t("reset unknown email blocked", r.ok === false);

r = ETH.requestReset("chinwe@test.com");
t("reset code generated", r.ok === true && /^\d{6}$/.test(r.code));
const code = r.code;

t("wrong code rejected", ETH.verifyResetCode("chinwe@test.com", "000000").ok === false);
t("right code accepted", ETH.verifyResetCode("chinwe@test.com", code).ok === true);

r = ETH.resetPassword("chinwe@test.com", "newsecret99", "newsecret99");
t("password reset", r.ok === true);
t("old password rejected", ETH.login("chinwe@test.com", "secret123").ok === false);
t("new password accepted", ETH.login("chinwe@test.com", "newsecret99").ok === true);
t("one-time code consumed", ETH.verifyResetCode("chinwe@test.com", code).ok === false);

const uid = ETH.currentUser().id;
t("enroll works", ETH.enroll(uid, 3, "AI for Educators") === true);
t("isEnrolled true", ETH.isEnrolled(uid, 3) === true);
t("double enroll blocked", ETH.enroll(uid, 3, "AI for Educators") === false);

t("percent 0 before quiz", ETH.coursePercent(uid, 3, 5) === 0);
t("failed attempt recorded", typeof ETH.recordFailedAttempt(uid, 3, 0) === "undefined");

let res = ETH.passQuiz(uid, 3, 0, 60, 5, "Class 1", "AI for Educators");
t("60% does not complete lesson", res.passed === false);
t("best kept at 0", res.best >= 0);

res = ETH.passQuiz(uid, 3, 0, 80, 5, "Class 1", "AI for Educators");
t("80% passes lesson", res.passed === true);
t("best score tracked", res.best === 80);

ETH.passQuiz(uid, 3, 0, 90, 5, "Class 1", "AI for Educators");
t("retake improves best to 90", ETH.courseProgress(uid, 3).quizzes[0].best === 90);
t("attempts counted", ETH.courseProgress(uid, 3).quizzes[0].attempts === 4);
t("lesson marked done once", ETH.courseProgress(uid, 3).done.filter((x) => x === 0).length === 1);

t("percent partial", ETH.coursePercent(uid, 3, 5) === 20);
t("not completed yet", ETH.courseProgress(uid, 3).completedAt === null);

for (let i = 1; i < 5; i++) ETH.passQuiz(uid, 3, i, 100, 5, "Class " + (i + 1), "AI for Educators");
t("course auto-completes", ETH.courseProgress(uid, 3).completedAt !== null);
t("percent 100", ETH.coursePercent(uid, 3, 5) === 100);

const prog = ETH.courseProgress(uid, 3);
const bests = Object.values(prog.quizzes).map((q) => q.best);
t("avgBestScore correct", ETH.avgBestScore(uid) === Math.round(bests.reduce((a, b) => a + b, 0) / bests.length));

t("activity logged", ETH.getActivity(uid).length > 0);
t("completion in activity", ETH.getActivity(uid).some((a) => /certificate/i.test(a.text)));

ETH.updateUser(uid, { lname: "Okafor-Bello" });
t("profile update persists", ETH.currentUser().lname === "Okafor-Bello");

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
