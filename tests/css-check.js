const fs = require("fs");
const css = fs.readFileSync("css/style.css", "utf8") + "\n" + fs.readFileSync("css/client.css", "utf8") + "\n" + fs.readFileSync("css/dashboard.css", "utf8") + "\n" + fs.readFileSync("css/auth.css", "utf8") + "\n" + fs.readFileSync("Admin/css/admin.css", "utf8");
const o = (css.match(/\{/g) || []).length;
const c = (css.match(/\}/g) || []).length;
console.log("braces:", o, "/", c, o === c ? "BALANCED" : "BROKEN");

const defined = new Set();
for (const m of css.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)) defined.add(m[1]);
[
  "is-visible", "is-open", "is-scrolled", "is-active", "is-hidden", "is-in-cart",
  "is-current", "is-locked", "is-passed", "is-correct", "is-wrong", "is-dim",
  "is-done", "is-error", "is-success", "is-out"
].forEach((x) => defined.add(x));

const htmlFiles = [
  "index.html", "courses.html", "services.html", "about.html", "contact.html",
  "login.html", "signup.html", "forgot-password.html", "dashboard.html",
  "Admin/index.html", "Admin/login.html"
];

const missing = [];
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8");
  for (const m of html.matchAll(/class="([^"]+)"/g)) {
    for (const cls of m[1].split(/\s+/)) {
      if (!cls) continue;
      if (defined.has(cls)) continue;
      const base = cls.replace(/--[a-zA-Z0-9-]+$/, "");
      if (!defined.has(base)) missing.push(f + " -> " + cls);
    }
  }
}

if (missing.length) {
  console.log("MISSING (" + missing.length + "):");
  missing.forEach((k) => console.log("  " + k));
} else {
  console.log("all HTML classes covered by CSS");
}
