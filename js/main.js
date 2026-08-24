(function () {
  "use strict";

  var COURSES = [
    {
      id: 1,
      title: "Digital Skills & Online Teaching Masterclass",
      tagline: "Learn. Create. Teach. Thrive.",
      desc: "A practical programme designed to take participants from basic digital confidence to online teaching, curriculum and course design, digital content creation and professional positioning. Participants learn how to use essential digital and AI tools, teach effectively online, design a curriculum or course, create digital learning resources and develop a professional portfolio and knowledge-based offer.",
      image: "images/courses/masterclass.jpg",
      price: "\u20a630,000",
      priceNum: 30000,
      duration: "5 weeks",
      level: "All Levels",
      format: "Self-Paced + Live Coaching",
      featured: true,
      cat: "digital-skills teaching",
      specs: [
        { label: "5 Weeks", sub: "Duration" },
        { label: "Self-Paced Lessons", sub: "Learn at your own pace" },
        { label: "Weekly Live Coaching", sub: "Live Q&A every week" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Project-Based", sub: "Hands-on practical work" },
        { label: "Portfolio", sub: "Build evidence of your skills" }
      ],
      outcomes: ["Essential digital skills", "Basic AI skills", "An online teaching sample", "A curriculum / course / training outline", "A digital learning resource or product", "A professional portfolio", "A knowledge-based offer", "A simple launch plan"],
      audience: ["Teachers and educators ready to teach online", "Online tutors building sustainable opportunities", "Trainers and facilitators delivering workshops", "Coaches and consultants packaging their knowledge", "Knowledge professionals and subject-matter experts", "Entrepreneurs and creators building digital products", "Anyone with knowledge or skills they want to teach or share online"],
      formatDetails: ["Self-paced lessons you can study around your schedule", "Weekly live coaching & Q&A with experienced facilitators", "Practical projects you complete as you learn", "Certificate of completion when you finish", "Designed for every level \u2014 from beginners to experienced professionals"]
    },
    {
      id: 2,
      title: "Instructional Design Fundamentals",
      tagline: "Structure learning that works.",
      desc: "Learn how to structure engaging learning experiences from the ground up using proven instructional design principles and frameworks. Covers learning objectives, storyboarding, course structure and assessment design.",
      image: "images/courses/instructional-design.jpg",
      price: "\u20a625,000",
      priceNum: 25000,
      duration: "4 weeks",
      level: "Beginner",
      format: "Self-Paced",
      featured: false,
      cat: "design teaching",
      specs: [
        { label: "4 Weeks", sub: "Duration" },
        { label: "Self-Paced", sub: "Study on your schedule" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Project-Based", sub: "Hands-on assignments" }
      ],
      outcomes: ["Instructional design fundamentals", "Learning objective writing", "Storyboarding basics", "Course structure skills", "Assessment design"],
      audience: ["Educators building their first online courses", "Trainers moving from in-person to digital", "Content creators structuring learning material", "HR and L&D professionals"],
      formatDetails: ["Self-paced lessons you can study around your schedule", "Practical assignments you complete as you learn", "Certificate of completion when you finish", "Designed for beginners with no prior experience"]
    },
    {
      id: 3,
      title: "AI for Educators",
      tagline: "Teach smarter with AI.",
      desc: "Use AI tools meaningfully to save time and create better learning materials. Understand when, why and how to integrate AI into your teaching practice with confidence.",
      image: "images/courses/ai-for-educators.jpg",
      price: "\u20a620,000",
      priceNum: 20000,
      duration: "3 weeks",
      level: "Beginner",
      format: "Self-Paced",
      featured: false,
      cat: "ai-tech teaching",
      specs: [
        { label: "3 Weeks", sub: "Duration" },
        { label: "Self-Paced", sub: "Study on your schedule" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Hands-On", sub: "Real AI tool practice" }
      ],
      outcomes: ["AI tool fluency", "AI-assisted content creation", "Prompt engineering basics", "Workflow automation", "Ethical AI use in education"],
      audience: ["Teachers looking to integrate AI into the classroom", "Trainers wanting to speed up content creation", "Educators curious about AI but unsure where to start", "Instructional designers exploring AI-assisted workflows"],
      formatDetails: ["Self-paced lessons you can study around your schedule", "Hands-on exercises with real AI tools", "Practical projects you complete as you learn", "Certificate of completion when you finish", "No prior AI experience needed"]
    },
    {
      id: 4,
      title: "LMS for Course Creators",
      tagline: "Launch your own learning platform.",
      desc: "Set up, organise and deliver your own online courses with a Learning Management System from scratch. Learn platform selection, course setup and learner management.",
      image: "images/courses/lms-course-creators.jpg",
      price: "\u20a622,000",
      priceNum: 22000,
      duration: "3 weeks",
      level: "Intermediate",
      format: "Self-Paced + Live Q&A",
      featured: false,
      cat: "ai-tech digital-skills",
      specs: [
        { label: "3 Weeks", sub: "Duration" },
        { label: "Self-Paced + Live Q&A", sub: "Flexible with support" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Hands-On", sub: "Set up your own LMS" }
      ],
      outcomes: ["LMS platform selection", "Course setup and configuration", "Content organisation", "Learner management", "Reporting and analytics"],
      audience: ["Educators creating their first online course", "Training organisations going digital", "Entrepreneurs packaging knowledge into courses", "Instructional designers needing platform skills"],
      formatDetails: ["Self-paced lessons with weekly live Q&A sessions", "Hands-on LMS setup projects", "Practical exercises you complete as you learn", "Certificate of completion when you finish", "Some teaching experience recommended"]
    },
    {
      id: 5,
      title: "Digital Skills for Teachers",
      tagline: "Teach effectively in the digital age.",
      desc: "Build practical digital skills that help you teach more effectively in modern classrooms and online environments. Covers digital productivity, collaboration and content creation.",
      image: "images/courses/digital-skills-teachers.jpg",
      price: "\u20a618,000",
      priceNum: 18000,
      duration: "3 weeks",
      level: "All Levels",
      format: "Self-Paced",
      featured: false,
      cat: "digital-skills teaching",
      specs: [
        { label: "3 Weeks", sub: "Duration" },
        { label: "Self-Paced", sub: "Study on your schedule" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Practical", sub: "Real classroom applications" }
      ],
      outcomes: ["Digital productivity tools", "Online collaboration", "Digital content creation", "Virtual classroom management", "Digital assessment basics"],
      audience: ["Classroom teachers building digital confidence", "School administrators going paperless", "Tutors moving to online delivery", "Teacher trainers updating their toolkit"],
      formatDetails: ["Self-paced lessons you can study around your schedule", "Practical exercises for real classroom use", "Projects you complete as you learn", "Certificate of completion when you finish", "Designed for every level"]
    },
    {
      id: 6,
      title: "eLearning Content Development",
      tagline: "Create content learners love.",
      desc: "Create engaging digital learning content including interactive modules, multimedia lessons and structured eLearning materials that learners enjoy.",
      image: "images/courses/elearning-content.jpg",
      price: "\u20a625,000",
      priceNum: 25000,
      duration: "4 weeks",
      level: "Intermediate",
      format: "Self-Paced + Project-Based",
      featured: false,
      cat: "design",
      specs: [
        { label: "4 Weeks", sub: "Duration" },
        { label: "Self-Paced + Projects", sub: "Flexible with deliverables" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Portfolio-Ready", sub: "Build sample content" }
      ],
      outcomes: ["eLearning content authoring", "Multimedia integration", "Interactive content design", "Storytelling for learning", "Quality assurance standards"],
      audience: ["Instructional designers expanding their skill set", "Training managers building in-house courses", "Content creators moving into eLearning", "HR professionals developing training materials"],
      formatDetails: ["Self-paced lessons with project milestones", "Hands-on content creation projects", "Build portfolio-ready eLearning samples", "Certificate of completion when you finish", "Some design or teaching experience recommended"]
    },
    {
      id: 7,
      title: "Online Tutoring & Academic Support",
      tagline: "Help learners thrive online.",
      desc: "Develop effective online tutoring skills with a focus on understanding, confidence and strong foundational learning. Personalised approaches that work.",
      image: "images/courses/online-tutoring.jpg",
      price: "\u20a615,000",
      priceNum: 15000,
      duration: "2 weeks",
      level: "All Levels",
      format: "Self-Paced + Live Practice",
      featured: false,
      cat: "teaching",
      specs: [
        { label: "2 Weeks", sub: "Duration" },
        { label: "Self-Paced + Live Practice", sub: "Flexible with sessions" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Practical", sub: "Real tutoring practice" }
      ],
      outcomes: ["Online tutoring techniques", "Student engagement strategies", "Session planning", "Assessment and feedback", "Building student confidence"],
      audience: ["Private tutors going online", "Teachers offering after-school support", "Homeschooling parents", "Academic coaches and mentors"],
      formatDetails: ["Self-paced lessons with live practice sessions", "Real tutoring scenario practice", "Practical exercises you complete as you learn", "Certificate of completion when you finish", "Suitable for all experience levels"]
    },
    {
      id: 8,
      title: "Digital Product Creation",
      tagline: "Turn knowledge into products.",
      desc: "Turn your knowledge and expertise into valuable digital products including courses, guides, templates and toolkits. Learn ideation, design, pricing and launch.",
      image: "images/courses/digital-product-creation.jpg",
      price: "\u20a620,000",
      priceNum: 20000,
      duration: "3 weeks",
      level: "All Levels",
      format: "Self-Paced + Projects",
      featured: false,
      cat: "business digital-skills",
      specs: [
        { label: "3 Weeks", sub: "Duration" },
        { label: "Self-Paced + Projects", sub: "Flexible with deliverables" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Launch-Ready", sub: "Build your first product" }
      ],
      outcomes: ["Product ideation and validation", "Digital product design", "Content packaging", "Pricing and positioning", "Launch strategy"],
      audience: ["Entrepreneurs monetising their expertise", "Coaches packaging their knowledge", "Educators creating supplementary materials", "Content creators diversifying income", "Subject-matter experts going digital"],
      formatDetails: ["Self-paced lessons with project milestones", "Build a real digital product as you learn", "Practical pricing and launch exercises", "Certificate of completion when you finish", "Suitable for all experience levels"]
    },
    {
      id: 9,
      title: "Advanced Instructional Design",
      tagline: "Design at the highest level.",
      desc: "Go beyond the basics with advanced learning design strategies, complex curriculum mapping and evidence-based instructional frameworks for experienced designers.",
      image: "images/courses/instructional-design.jpg",
      price: "\u20a630,000",
      priceNum: 30000,
      duration: "5 weeks",
      level: "Advanced",
      format: "Self-Paced + Live Coaching",
      featured: false,
      cat: "design",
      specs: [
        { label: "5 Weeks", sub: "Duration" },
        { label: "Self-Paced + Coaching", sub: "Flexible with expert support" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Advanced", sub: "For experienced designers" }
      ],
      outcomes: ["Advanced learning theories", "Complex curriculum mapping", "Competency-based design", "Learning analytics", "Programme evaluation"],
      audience: ["Experienced instructional designers", "Training leads managing large programmes", "Curriculum developers in education", "L&D professionals in corporations", "Academics designing higher-ed courses"],
      formatDetails: ["Self-paced lessons with weekly coaching sessions", "Advanced design projects and case studies", "Peer discussion and expert feedback", "Certificate of completion when you finish", "Prior instructional design experience required"]
    },
    {
      id: 10,
      title: "AI-Powered Content Creation",
      tagline: "Create faster with AI.",
      desc: "Leverage AI tools to create high-quality educational content faster, from lesson plans and assessments to multimedia resources and interactive materials.",
      image: "images/courses/ai-for-educators.jpg",
      price: "\u20a622,000",
      priceNum: 22000,
      duration: "3 weeks",
      level: "Intermediate",
      format: "Self-Paced + Projects",
      featured: false,
      cat: "ai-tech",
      specs: [
        { label: "3 Weeks", sub: "Duration" },
        { label: "Self-Paced + Projects", sub: "Flexible with deliverables" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Hands-On", sub: "Real AI tool practice" }
      ],
      outcomes: ["AI content generation", "AI-assisted research", "Automated assessment creation", "Multimedia with AI tools", "Content quality control"],
      audience: ["Educators wanting to speed up content creation", "Content creators exploring AI workflows", "Instructional designers automating repetitive tasks", "Trainers building materials faster"],
      formatDetails: ["Self-paced lessons with project milestones", "Hands-on AI tool exercises", "Practical content creation projects", "Certificate of completion when you finish", "Basic familiarity with AI tools recommended"]
    },
    {
      id: 11,
      title: "Digital Productivity for Professionals",
      tagline: "Work smarter, deliver more.",
      desc: "Master the digital tools and workflows that help professionals work smarter, collaborate better and deliver more in less time. Practical and immediately applicable.",
      image: "images/courses/digital-skills-teachers.jpg",
      price: "\u20a615,000",
      priceNum: 15000,
      duration: "2 weeks",
      level: "All Levels",
      format: "Self-Paced",
      featured: false,
      cat: "digital-skills business",
      specs: [
        { label: "2 Weeks", sub: "Duration" },
        { label: "Self-Paced", sub: "Study on your schedule" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Immediately Useful", sub: "Apply from day one" }
      ],
      outcomes: ["Digital productivity tools", "Cloud collaboration", "Workflow automation", "Time management with tech", "Professional digital portfolio"],
      audience: ["Professionals wanting to work more efficiently", "Managers coordinating remote teams", "Entrepreneurs juggling multiple tasks", "Anyone looking to modernise their workflow"],
      formatDetails: ["Self-paced lessons you can study around your schedule", "Practical exercises with real productivity tools", "Immediately applicable techniques", "Certificate of completion when you finish", "No prior experience needed"]
    },
    {
      id: 12,
      title: "Video Course Production",
      tagline: "Produce professional video courses.",
      desc: "Learn to plan, produce and edit professional video content for online courses, from scripting and recording to post-production and publishing.",
      image: "images/courses/elearning-content.jpg",
      price: "\u20a628,000",
      priceNum: 28000,
      duration: "4 weeks",
      level: "Intermediate",
      format: "Self-Paced + Hands-On",
      featured: false,
      cat: "design digital-skills",
      specs: [
        { label: "4 Weeks", sub: "Duration" },
        { label: "Self-Paced + Hands-On", sub: "Flexible with practice" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Portfolio-Ready", sub: "Produce sample videos" }
      ],
      outcomes: ["Video scripting and storyboarding", "Recording techniques", "Video editing fundamentals", "Screen capture and tutorials", "Publishing and distribution"],
      audience: ["Educators creating video-based courses", "Content creators expanding to video", "Trainers producing internal training videos", "Entrepreneurs building video courses"],
      formatDetails: ["Self-paced lessons with hands-on projects", "Real video production exercises", "Build portfolio-ready video samples", "Certificate of completion when you finish", "Some familiarity with content creation recommended"]
    },
    {
      id: 13,
      title: "LMS Administration & Management",
      tagline: "Run your LMS with confidence.",
      desc: "Gain the skills to administer, manage and optimise a Learning Management System for schools, organisations or training providers. Covers user management and analytics.",
      image: "images/courses/lms-course-creators.jpg",
      price: "\u20a620,000",
      priceNum: 20000,
      duration: "3 weeks",
      level: "Intermediate",
      format: "Self-Paced + Live Q&A",
      featured: false,
      cat: "ai-tech business",
      specs: [
        { label: "3 Weeks", sub: "Duration" },
        { label: "Self-Paced + Live Q&A", sub: "Flexible with support" },
        { label: "Certificate", sub: "Certificate of completion" },
        { label: "Hands-On", sub: "Real LMS admin practice" }
      ],
      outcomes: ["LMS administration", "User and role management", "Course enrolment workflows", "Reporting and analytics", "Troubleshooting and support"],
      audience: ["IT administrators managing learning platforms", "School coordinators running eLearning programmes", "Training managers overseeing LMS operations", "HR teams administering staff training platforms", "LMS support staff needing structured training"],
      formatDetails: ["Self-paced lessons with weekly live Q&A", "Hands-on LMS administration exercises", "Real-world troubleshooting scenarios", "Certificate of completion when you finish", "Some LMS experience recommended"]
    }
  ];

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
      modalPrice.innerHTML = course.price + '<small>per participant</small>';

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
      course.outcomes.forEach(function (item) {
        var li = document.createElement("li");
        li.innerHTML = '<span class="check-list__icon">' + checkSVG + '</span><span>' + item + '</span>';
        modalOutcomes.appendChild(li);
      });

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
  initFilters();
  initModal();
  initCart();
  initEnrollButtons();
  initContactForm();

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
