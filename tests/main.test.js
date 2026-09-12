const fs = require("fs");
const vm = require("vm");

const store = {};
const lsMock = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; }
};

function makeGrid() {
  return {
    html: [],
    insertAdjacentHTML(pos, html) { this.html.push(String(html)); },
    querySelector() { return null; },
    querySelectorAll() { return []; }
  };
}

function catalogKey() {
  return "eth_catalog";
}

function runMain() {
  const catalogGrid = makeGrid();
  const miniGrid = makeGrid();
  const sandbox = {
    localStorage: lsMock,
    document: {
      readyState: "loading",
      body: { getAttribute: () => "home", hasAttribute: () => true, style: {} },
      addEventListener: () => {},
      removeEventListener: () => {},
      querySelector(sel) {
        if (sel === ".catalog-grid") return catalogGrid;
        if (sel === ".mini-courses__grid") return miniGrid;
        return null;
      },
      querySelectorAll: () => [],
      getElementById: () => null,
      createElement: () => ({ className: "", addEventListener: () => {} }),
      documentElement: { scrollHeight: 0 }
    },
    Math, JSON, Date, console,
    requestAnimationFrame: () => 0,
    setInterval: () => 0,
    clearInterval: () => {},
    scrollTo: () => {},
    open: () => {},
    alert: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
  };
  sandbox.window = sandbox;
  sandbox.location = { hash: "" };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("js/auth.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("js/main.js", "utf8"), sandbox);
  return { ETH: sandbox.window.ETH, COURSES: sandbox.window.ETH_COURSES, catalogGrid, miniGrid };
}

let pass = 0, fail = 0;
function t(name, cond) {
  if (cond) { pass++; console.log("PASS " + name); }
  else { fail++; console.log("FAIL " + name); }
}

const catalog = [
  { id: 101, type: "course", title: "AI for Educators", cat: "ai", published: true,
    price: "₦25,000", priceNum: 25000, duration: "3 Weeks", level: "All Levels", featured: false,
    modules: [{ title: "Module 1", lessons: [{ title: "Lesson 1", video: { type: "url", url: "https://x/v.mp4" } }] }] },
  { id: 102, type: "course", title: "Unpublished Draft", cat: "digital-skills", published: false,
    price: "₦10,000", priceNum: 10000, duration: "Self-Paced", level: "Beginner", modules: [] },
  { id: 103, type: "course", title: "Broken Modules Course", cat: "lms", published: true,
    price: "₦20,000", priceNum: 20000, duration: "Self-Paced", level: "Intermediate", modules: { not: "an array" } },
  { id: 104, type: "course", title: "Legacy Orientation to Your Learning Journey", cat: "digital-skills", published: true,
    price: "₦0", duration: "Self-Paced", level: "All Levels",
    modules: [{ id: "dm1", title: "Welcome", lessons: [] }] }
];

store[catalogKey()] = JSON.stringify(catalog);

let r = runMain();

t("main.js runs without throwing (no ReferenceError)", Array.isArray(r.COURSES));
t("published course included", r.COURSES.some((c) => c.id === 101));
t("unpublished course excluded", !r.COURSES.some((c) => c.id === 102));
t("malformed course no longer wipes the catalog", r.COURSES.some((c) => c.id === 103) && r.COURSES.length === 2);
t("legacy seed excluded", !r.COURSES.some((c) => c.id === 104));
t("catalog exposed on window.ETH_COURSES", Array.isArray(r.COURSES) && r.COURSES.length === 2);

const joined = r.catalogGrid.html.join("");
t("course card injected into .catalog-grid", joined.indexOf("AI for Educators") !== -1);
t("unpublished card not injected", joined.indexOf("Unpublished Draft") === -1);
t("course card exposes data-course-id", /data-course-id="101"/.test(joined));
t("card includes enroll button", joined.indexOf("Enroll") !== -1);

delete store[catalogKey()];
r = runMain();
const emptyJoined = r.catalogGrid.html.join("");
t("empty catalog renders empty state", /New courses are on the way/.test(emptyJoined));
t("empty catalog leaves ETH_COURSES as []", Array.isArray(r.COURSES) && r.COURSES.length === 0);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);