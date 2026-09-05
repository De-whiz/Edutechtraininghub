(function () {
  "use strict";

  var COURSES = [];

  window.ETH_COURSES = COURSES;

  /* ---------------- admin catalog merge (published admin courses) ---------------- */

  function toPublicCourse(c) {
    var modules = c.modules || [];
    var lessonTotal = 0;
    var examTotal = 0;
    var videoTotal = 0;
    var titles = [];
    modules.forEach(function (m) {
      var ls = m.lessons || [];
      if (m.title) titles.push(m.title);
      lessonTotal += ls.length;
      if (m.examEnabled && m.exam && (m.exam.questions || []).length) examTotal++;
      ls.forEach(function (l) {
        if (l.video && l.video.type === "file" && l.video.src) videoTotal++;
        else if (l.video && l.video.type === "url" && l.video.url) videoTotal++;
      });
    });

    var specs = [
      { label: modules.length + " Module" + (modules.length === 1 ? "" : "s"), sub: "Structured modules" },
      { label: String(lessonTotal) + (lessonTotal === 1 ? " Lesson" : " Lessons"), sub: "Total lessons" },
      { label: examTotal ? String(examTotal) + (examTotal === 1 ? " Exam" : " Exams") : "No Exams", sub: examTotal ? "Module assessments" : "Learn at your own pace" },
      { label: c.duration || "Self-Paced", sub: "Course duration" },
      { label: c.level || "All Levels", sub: "Skill level" },
      { label: "Certificate", sub: "Certificate of completion" }
    ];

    var outcomes = ["Complete " + modules.length + " guided module" + (modules.length === 1 ? "" : "s") + " of structured learning"];
    if (examTotal) {
      outcomes.push("Pass " + examTotal + " module exam" + (examTotal === 1 ? "" : "s") + " to test your understanding");
    } else {
      outcomes.push("Work through every lesson at your own pace");
    }
    if (titles.length) outcomes.push("Modules: " + titles.join("\u00b7"));
    outcomes.push("Earn a certificate of completion when you finish");

    var formatDetails = [
      "Learn module by module \u2014 each one builds on the last",
      videoTotal ? "Watch " + videoTotal + " video lesson" + (videoTotal === 1 ? "" : "s") + " as you progress" : "Every lesson includes clear written material you can study at your own pace",
      examTotal ? "Every module ends with an exam that checks your understanding" : "Track your progress and retake quizzes to improve your best score",
      "Certificate of completion when you finish"
    ];

    return {
      id: Number(c.id),
      title: c.title,
      tagline: c.tagline || "",
      desc: c.desc || "",
      image: c.image || "images/hero.jpg",
      price: c.price || "\u20a60",
      priceNum: Number(c.priceNum) || 0,
      duration: c.duration || "Self-Paced",
      level: c.level || "All Levels",
      format: c.format || (examTotal ? "Modules + Exams" : "Self-Paced"),
      featured: !!c.featured,
      cat: c.cat || "digital-skills",
      specs: specs,
      outcomes: outcomes,
      audience: ["Anyone ready to learn " + c.title, "Learners who want a structured, self-paced programme", "Professionals building practical, transferable skills"],
      formatDetails: formatDetails
    };
  }

  function isLegacySeed(c) {
    var text = String(c.title || "") + " " + String(c.tagline || "") + " " + String(c.desc || "");
    if (text.toLowerCase().indexOf("orientation to your learning journey") !== -1) return true;
    var modules = c.modules || [];
    for (var i = 0; i < modules.length; i++) {
      var mid = modules[i] && modules[i].id;
      if (mid === "dm1" || mid === "dm2") return true;
    }
    return false;
  }

  function catalogCourses() {
    if (!window.ETH || !window.ETH.readCatalog) return [];
    var list = [];
    try { list = window.ETH.readCatalog(); } catch (e) { return []; }
    var out = [];
    (list || []).forEach(function (c) {
      if (!c || c.published === false) return;
      if (!String(c.title || "").trim()) return;
      if (isLegacySeed(c)) return;
      out.push(toPublicCourse(c));
    });
    return out;
  }

  var catalog = catalogCourses();
  COURSES = catalog;
  window.ETH_COURSES = COURSES;

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  var progressBar = document.querySelector(".scroll-progress");
  var toTop = document.querySelector(".to-top");

  function onScroll() {
    if (header) {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    if (progressBar) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progressBar.style.width = pct + "%";
    }

var CARD_CLOCK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  var CARD_EYE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';

  function escHTML(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function productFrom(course) {
    var opts = (course && course.options) || [];
    if (!opts.length) return course.price || "";
    var min = null;
    opts.forEach(function (o) {
      var p = Number(o && o.priceNum);
      if (!(p > 0)) p = parseInt(String(o && o.price || "").replace(/[^\d]/g, ""), 10) || 0;
      if (p > 0 && (min === null || p < min)) min = p;
    });
    if (min === null) return opts[0].price || course.price || "";
    var best = opts[0];
    opts.forEach(function (o) {
      var p = Number(o.priceNum);
      if (!(p > 0)) p = parseInt(String(o.price || "").replace(/[^\d]/g, ""), 10) || 0;
      if (p === min) best = o;
    });
    return best.price || String(min);
  }

  function courseCardHTML(course) {
    if (course.type === "product") {
      return (
        '<article class="course-card" data-cat="' + escHTML(course.cat) + '" data-course-id="' + course.id + '">' +
        '<div class="course-card__thumb">' +
        '<img src="' + escHTML(course.image) + '" alt="' + escHTML(course.title) + '">' +
        (course.featured ? '<span class="course-card__tag course-card__tag--featured">Featured</span>' : "") +
        "</div>" +
        '<div class="course-card__body">' +
        '<h3 class="course-card__title">' + escHTML(course.title) + "</h3>" +
        '<p class="course-card__desc">' + escHTML(course.desc) + "</p>" +
        '<div class="course-meta">' +
        '<span class="course-meta__item">' + CARD_CLOCK_SVG + " " + escHTML(course.duration) + "</span>" +
        '<span class="course-meta__item">' + CARD_EYE_SVG + " " + escHTML(course.level) + "</span>" +
        "</div>" +
        '<div class="course-card__foot">' +
        '<span class="course-card__price">From ' + escHTML(productFrom(course)) + "<small>digital product</small></span>" +
        '<button class="btn btn--primary course-card__getaccess" data-get-access="' + course.id + '">Get Access</button>' +
        "</div></div></article>"
      );
    }
    return (
      '<article class="course-card" data-cat="' + escHTML(course.cat) + '" data-course-id="' + course.id + '">' +
      '<div class="course-card__thumb">' +
      '<img src="' + escHTML(course.image) + '" alt="' + escHTML(course.title) + '">' +
      (course.featured ? '<span class="course-card__tag course-card__tag--featured">Featured</span>' : "") +
      "</div>" +
      '<div class="course-card__body">' +
      '<h3 class="course-card__title">' + escHTML(course.title) + "</h3>" +
      '<p class="course-card__desc">' + escHTML(course.desc) + "</p>" +
      '<div class="course-meta">' +
      '<span class="course-meta__item">' + CARD_CLOCK_SVG + " " + escHTML(course.duration) + "</span>" +
      '<span class="course-meta__item">' + CARD_EYE_SVG + " " + escHTML(course.level) + "</span>" +
      "</div>" +
      '<div class="course-card__foot">' +
      '<span class="course-card__price">' + escHTML(course.price) + "<small>per participant</small></span>" +
      '<div class="course-card__buttons">' +
      '<button class="btn btn--primary course-card__enroll" data-course-id="' + course.id + '">Enroll</button>' +
      '<button class="btn btn--outline course-card__cart" data-course-id="' + course.id + '">Add to Cart</button>' +
      "</div></div></div></article>"
    );
  }

  function injectAdminCourses() {
    var grids = [];
    var catalogGrid = document.querySelector(".catalog-grid");
    var miniGrid = document.querySelector(".mini-courses__grid");
    if (catalogGrid) grids.push(catalogGrid);
    if (miniGrid) grids.push(miniGrid);
    if (!grids.length) return;
    if (!COURSES.length) {
      grids.forEach(function (grid) {
        grid.insertAdjacentHTML("beforeend", catalogEmptyHTML());
      });
      var sec = miniGrid ? document.getElementById("courses") : null;
      if (sec) sec.style.display = "none";
      return;
    }
    COURSES.forEach(function (course) {
      if (!course.title) return;
      grids.forEach(function (grid) {
        if (!grid.querySelector('[data-course-id="' + course.id + '"]')) {
          grid.insertAdjacentHTML("beforeend", courseCardHTML(course));
        }
      });
    });
  }

  function catalogEmptyHTML() {
    return (
      '<div class="catalog-empty">' +
      "<strong>New courses are on the way</strong>" +
      "<p>Courses created by our team will appear here as soon as they are published.</p>" +
      "</div>"
    );
  }

  if (toTop) {
      toTop.classList.toggle("is-visible", window.scrollY > 500);
    }
  }

  function initHeader() {
    if (navToggle && mainNav) {
      navToggle.addEventListener("click", function () {
        var isOpen = mainNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
      });

      mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mainNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    document.querySelectorAll(".main-nav a[data-page]").forEach(function (link) {
      var page = link.getAttribute("data-page");
      if (page === document.body.getAttribute("data-page")) {
        link.classList.add("active");
      }
    });
  }

  function initReveal() {
    var selectors = ".reveal, .reveal-left, .reveal-right, .reveal-zoom";
    var els = document.querySelectorAll(selectors);

    if ("IntersectionObserver" in window && els.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  function initMarquee() {
    var track = document.querySelector(".marquee__track");
    if (!track) return;
    var group = track.querySelector(".marquee__group");
    if (!group) return;
    var clone = group.cloneNode(true);
    track.appendChild(clone);
  }

  function initTestimonials() {
    var carousel = document.querySelector(".testimonials__carousel");
    var track = document.querySelector(".testimonials__track");
    if (!carousel || !track) return;

    var cards = track.querySelectorAll(".testimonial-card");
    var dotsWrap = document.querySelector(".testimonials__dots");
    var prevBtn = carousel.querySelector(".testimonials__arrow--prev");
    var nextBtn = carousel.querySelector(".testimonials__arrow--next");
    var total = cards.length;
    var current = 0;
    var autoTimer = null;

    if (!total || !dotsWrap) return;

    cards.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "testimonials__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Testimonial " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    var dots = dotsWrap.querySelectorAll(".testimonials__dot");

    function goTo(index) {
      current = ((index % total) + total) % total;
      cards.forEach(function (c, i) {
        c.classList.toggle("is-active", i === current);
      });
      var cardW = cards[0].offsetWidth + 20;
      var centerOffset = (track.parentElement.offsetWidth - cardW) / 2;
      track.style.transform = "translateX(" + (centerOffset - current * cardW) + "px)";
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === current); });
      resetTimer();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function resetTimer() {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 5000);
    }

    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    goTo(0);
  }

  function initCounters() {
    var nums = document.querySelectorAll(".stat__num[data-count]");
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      var isDecimal = target % 1 !== 0;
      var duration = 1600;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent =
          prefix +
          (isDecimal ? value.toFixed(1) : Math.round(value)) +
          suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              run(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      nums.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      nums.forEach(run);
    }
  }

  function initTilt() {
    var cards = document.querySelectorAll(".tilt");
    if (!cards.length || !window.matchMedia("(pointer: fine)").matches) return;

    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" +
          (-y * 6).toFixed(2) +
          "deg) rotateY(" +
          (x * 6).toFixed(2) +
          "deg) translateY(-6px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  function initFilters() {
    var chips = document.querySelectorAll(".filter-chip[data-filter]");
    var cards = document.querySelectorAll(".course-card[data-cat]");
    var search = document.getElementById("courseSearch");

    if (!chips.length) return;

    function applyFilters() {
      var activeChip = document.querySelector(".filter-chip.is-active");
      var filter = activeChip ? activeChip.getAttribute("data-filter") : "all";
      var query = search ? search.value.toLowerCase().trim() : "";

      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-cat") || "").split(" ");
        var title = (card.querySelector(".course-card__title") || {}).textContent || "";
        var matchFilter = filter === "all" || cats.indexOf(filter) !== -1;
        var matchSearch = !query || title.toLowerCase().indexOf(query) !== -1;
        card.classList.toggle("is-hidden", !(matchFilter && matchSearch));
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        applyFilters();
      });
    });

    if (search) {
      search.addEventListener("input", applyFilters);
    }
  }

  function initModal() {
    var modal = document.getElementById("courseModal");
    if (!modal) return;

    var modalThumb = document.getElementById("modalThumb");
    var modalTitle = document.getElementById("modalTitle");
    var modalTagline = document.getElementById("modalTagline");
    var modalTag = document.getElementById("modalTag");
    var modalDesc = document.getElementById("modalDesc");
    var modalMeta = document.getElementById("modalMeta");
    var modalSpecs = document.getElementById("modalSpecs");
    var modalPrice = document.getElementById("modalPrice");
    var modalOutcomes = document.getElementById("modalOutcomes");
    var modalAudience = document.getElementById("modalAudience");
    var modalFormat = document.getElementById("modalFormat");

    var clockSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
    var eyeSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
    var playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>';
    var checkSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

    function openModal(courseId) {
      var course = null;
      for (var i = 0; i < COURSES.length; i++) {
        if (COURSES[i].id === courseId) { course = COURSES[i]; break; }
      }
      if (!course) return;

      modalThumb.src = course.image;
      modalThumb.alt = course.title;
      modalTitle.textContent = course.title;
      modalTagline.textContent = course.tagline || "";
      modalTag.textContent = course.featured ? "Featured Programme" : course.level;
      modalTag.className = "course-modal__tag" + (course.featured ? " course-modal__tag--featured" : "");
      modalDesc.textContent = course.desc;
      modalPrice.innerHTML = (course.type === "product" ? "From " + productFrom(course) : course.price) +
        '<small>' + (course.type === "product" ? "digital product" : "per participant") + '</small>';

      modalMeta.innerHTML =
        '<span class="course-meta__item">' + clockSVG + ' ' + course.duration + '</span>' +
        '<span class="course-meta__item">' + eyeSVG + ' ' + course.level + '</span>' +
        '<span class="course-meta__item">' + playSVG + ' ' + course.format + '</span>';

      modalSpecs.innerHTML = "";
      if (course.specs) {
        course.specs.forEach(function (s) {
          var div = document.createElement("div");
          div.className = "spec";
          div.innerHTML = "<strong>" + s.label + "</strong><span>" + s.sub + "</span>";
          modalSpecs.appendChild(div);
        });
      }

      modalOutcomes.innerHTML = "";
      if (course.outcomes) {
        course.outcomes.forEach(function (item) {
          var li = document.createElement("li");
          li.innerHTML = '<span class="check-list__icon">' + checkSVG + '</span><span>' + item + '</span>';
          modalOutcomes.appendChild(li);
        });
      }

      modalAudience.innerHTML = "";
      if (course.audience) {
        course.audience.forEach(function (item) {
          var li = document.createElement("li");
          li.innerHTML = '<span class="check-list__icon">' + checkSVG + '</span><span>' + item + '</span>';
          modalAudience.appendChild(li);
        });
      }

      modalFormat.innerHTML = "";
      if (course.formatDetails) {
        course.formatDetails.forEach(function (item) {
          var li = document.createElement("li");
          li.innerHTML = '<span class="check-list__icon">' + checkSVG + '</span><span>' + item + '</span>';
          modalFormat.appendChild(li);
        });
      }

      if (course.type === "product") {
        var enrollBtn = modal.querySelector(".course-modal__enroll-btn");
        if (enrollBtn) {
          enrollBtn.textContent = "Get Access";
          enrollBtn.setAttribute("href", "#");
          enrollBtn.onclick = function (e) {
            e.preventDefault();
            closeModal();
            ETH.showAccessModal(course);
          };
        }
        var note = modal.querySelector(".course-modal__note");
        if (note) note.textContent = "Choose the format you need when you apply";
        var fmtIntro = modal.querySelector(".course-modal__format-intro");
        if (fmtIntro) fmtIntro.textContent = "This digital product is available in these formats:";
        modalFormat.innerHTML = "";
        (course.options || []).forEach(function (o) {
          var li = document.createElement("li");
          li.innerHTML = '<span class="check-list__icon">' + checkSVG + "</span>" +
            "<span><b>" + escHTML(o.label) + " \u2014 " + escHTML(o.price || "") + "</b>" +
            (o.desc ? "<br>" + escHTML(o.desc) : "") + "</span>";
          modalFormat.appendChild(li);
        });
      }

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".course-card__enroll[data-course-id]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var id = parseInt(btn.getAttribute("data-course-id"), 10);
        openModal(id);
      });
    });

    document.querySelectorAll(".course-card[data-course-id]").forEach(function (card) {
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        if (e.target.closest(".course-card__enroll") || e.target.closest(".course-card__cart")) return;
        var id = parseInt(card.getAttribute("data-course-id"), 10);
        openModal(id);
      });
    });

    modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  function getCart() {
    try { return JSON.parse(localStorage.getItem("eth_cart")) || []; }
    catch (e) { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem("eth_cart", JSON.stringify(cart));
  }

  function updateCartBadge() {
    var cart = getCart();
    var count = cart.length;
    var badge = document.getElementById("cartBadge");
    var toggle = document.getElementById("cartToggle");
    if (badge) badge.textContent = count;
    if (toggle) toggle.setAttribute("data-count", count);
    document.querySelectorAll(".course-card__cart").forEach(function (btn) {
      var id = parseInt(btn.getAttribute("data-course-id"), 10);
      var inCart = cart.indexOf(id) !== -1;
      btn.classList.toggle("is-in-cart", inCart);
      btn.textContent = inCart ? "In Cart" : "Add to Cart";
    });
  }

  function initCart() {
    document.querySelectorAll(".course-card__cart[data-course-id]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var id = parseInt(btn.getAttribute("data-course-id"), 10);
        var cart = getCart();
        var idx = cart.indexOf(id);
        if (idx === -1) {
          cart.push(id);
        } else {
          cart.splice(idx, 1);
        }
        saveCart(cart);
        updateCartBadge();
      });
    });

    var cartToggle = document.getElementById("cartToggle");
    if (cartToggle) {
      cartToggle.addEventListener("click", function () {
        var cart = getCart();
        if (cart.length === 0) {
          alert("Your cart is empty. Browse our courses and add some!");
          return;
        }
        var names = [];
        cart.forEach(function (id) {
          for (var i = 0; i < COURSES.length; i++) {
            if (COURSES[i].id === id) { names.push(COURSES[i].title); break; }
          }
        });
        alert("Cart (" + cart.length + " course" + (cart.length > 1 ? "s" : "") + "):\n\n" + names.join("\n") + "\n\nCheckout coming soon!");
      });
    }

    updateCartBadge();
  }

  function bindGetAccess() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".course-card__getaccess[data-get-access]");
      if (!btn || (btn.disabled && btn.classList.contains("is-applied"))) return;
      e.preventDefault();
      e.stopPropagation();
      var id = parseInt(btn.getAttribute("data-get-access"), 10);
      var course = null;
      for (var i = 0; i < COURSES.length; i++) {
        if (Number(COURSES[i].id) === id) { course = COURSES[i]; break; }
      }
      if (course && window.ETH && ETH.showAccessModal) ETH.showAccessModal(course);
    });
    if (window.ETH && ETH.refreshGetAccessButtons) ETH.refreshGetAccessButtons(null);
  }

  function initEnrollButtons() {
    var number = "234803383339";
    var buttons = document.querySelectorAll("[data-enroll]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var course = btn.getAttribute("data-enroll");
        var text = "Hello EdTech Training Hub! I'd like to enroll in *" + course + "*.";
        window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(text), "_blank");
      });
    });
  }

  function initContactForm() {
    var contactForm = document.querySelector(".contact-form[data-whatsapp]");
    if (!contactForm) return;
    var whatsappNumber = contactForm.getAttribute("data-whatsapp");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('[name="name"]').value.trim();
      var email = contactForm.querySelector('[name="email"]').value.trim();
      var phone = contactForm.querySelector('[name="phone"]').value.trim();
      var interest = contactForm.querySelector('[name="interest"]').value;
      var message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !message) {
        alert("Please fill in your name and message.");
        return;
      }

      var lines = [
        "Hello EdTech Training Hub!",
        "",
        "*Name:* " + (name || "-"),
        "*Email:* " + (email || "-"),
        "*Phone:* " + (phone || "-"),
        "*Interested in:* " + interest,
        "",
        message
      ];

      var url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(lines.join("\n"));

      window.open(url, "_blank");
      contactForm.reset();
    });
  }

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  initHeader();
  initReveal();
  initMarquee();
  initTestimonials();
  initCounters();
  initTilt();
  injectAdminCourses();
  initFilters();
  initModal();
  initCart();
  bindGetAccess();
  initEnrollButtons();
  initContactForm();

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
