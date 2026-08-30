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
sandbox.location = {};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("js/auth.js", "utf8"), sandbox);

const ETH = sandbox.window.ETH;
let pass = 0, fail = 0;
function t(name, cond) {
  if (cond) { pass++; console.log("PASS " + name); }
  else { fail++; console.log("FAIL " + name); }
}

let r = ETH.signup({ fname: "Chinwe", lname: "Okafor", email: "chinwe@test.com", phone: "08012345678", password: "secret123", confirm: "secret123" });
const uid = ETH.currentUser().id;
t("signup succeeds", r.ok === true);

t("not applied before any request", ETH.accessStatus(5000).applied === false);

r = ETH.accessApply({ courseId: 5000, option: { label: "E-Book", price: "\u20a65,000" }, name: "Chinwe Okafor", email: "chinwe@test.com", phone: "08012345678" });
t("valid application accepted", r.ok === true && r.app.status === "applied");
t("application records course + option", r.app.courseId === 5000 && r.app.option.label === "E-Book" && r.app.option.price === "\u20a65,000");
t("application records user", r.app.userId === uid);

r = ETH.accessApply({ courseId: 5000, option: { label: "E-Book" }, name: "   ", email: "chinwe@test.com", phone: "08012345678" });
t("blank name rejected", r.ok === false && /name/.test(r.error));

r = ETH.accessApply({ courseId: 5000, option: { label: "E-Book" }, name: "Chinwe Okafor", email: "not-an-email", phone: "08012345678" });
t("bad email rejected", r.ok === false && /email/.test(r.error));

r = ETH.accessApply({ courseId: 5000, option: { label: "E-Book" }, name: "Chinwe Okafor", email: "chinwe@test.com", phone: "   " });
t("blank phone rejected", r.ok === false && /phone/.test(r.error));

r = ETH.accessApply({ courseId: 5000, option: { label: "", price: "\u20a65,000" }, name: "Chinwe Okafor", email: "chinwe@test.com", phone: "08012345678" });
t("blank option label rejected", r.ok === false && /format/.test(r.error));

const st1 = ETH.accessStatus(5000);
t("status applied after request", st1.applied === true && st1.app.option.label === "E-Book");

r = ETH.accessApply({ courseId: 5000, option: { label: "Full Kit", price: "\u20a68,500" }, name: "Chinwe Okafor", email: "chinwe@test.com", phone: "08012345678" });
t("re-apply accepted", r.ok === true);
const st2 = ETH.accessStatus(5000);
t("status reflects latest application", st2.app.option.label === "Full Kit" && st2.app.ts >= st1.app.ts);

r = ETH.accessApply({ courseId: 6000, option: { label: "Templates Pack", price: "\u20a612,000" }, name: "Chinwe Okafor", email: "chinwe@test.com", phone: "08012345678" });
let mine = ETH.myAccess();
t("myAccess lists one record per course", mine.length === 2);
t("myAccess newest-first order", mine[0].courseId === 6000 && mine[1].courseId === 5000);

r = ETH.signup({ fname: "Ade", lname: "Bello", email: "ade@test.com", phone: "08100000000", password: "secret123", confirm: "secret123" });
t("second user access empty", ETH.myAccess().length === 0);
ETH.logout();

r = ETH.accessApply({ courseId: 7000, option: { label: "E-Book", price: "\u20a63,000" }, name: "Chinwe Okafor", email: "chinwe@test.com", phone: "08000000000" });
t("anonymous application accepted", r.ok === true && r.app.userId === null);
t("anonymous myAccess empty", ETH.myAccess().length === 0);

ETH.login("chinwe@test.com", "secret123");
t("guest request visible to same-email user", ETH.accessStatus(7000).applied === true && ETH.accessStatus(7000).app.userId === null);

ETH.login("ade@test.com", "secret123");
t("other user's request not visible", ETH.accessStatus(7000).applied === false);

ETH.login("chinwe@test.com", "secret123");
t("guest request counted in myAccess", ETH.myAccess().some((a) => a.courseId === 7000));
r = ETH.accessApply({ courseId: 7000, option: { label: "Templates Pack", price: "\u20a69,000" }, name: "Chinwe Okafor", email: "chinwe@test.com", phone: "08012345678" });
t("guest request upgraded to user record", r.ok === true && r.app.userId === uid);
t("latest request wins regardless of ownership", ETH.accessStatus(7000).app.userId === uid);

t("showAccessModal DOM-less returns null", ETH.showAccessModal({ id: 7000, title: "Pack", options: [{ label: "E-Book", price: "\u20a63,000" }] }) === null);

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);