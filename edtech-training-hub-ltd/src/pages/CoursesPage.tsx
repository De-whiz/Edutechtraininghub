import React, { useEffect, useState } from 'react';
import { PageId, CourseItem } from '../types';
import {
  featuredMasterclass,
  coursesCatalog,
  trainingApproachPoints,
  courseAudienceList,
} from '../data/coursesData';
import {
  CART_EVENT,
  addToCart,
  catalogIdForCourse,
  inCart,
  removeFromCart,
} from '../utils/cart';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  ArrowRight,
  Filter,
  Search,
  BookOpen,
  Sparkles,
  Zap,
  ShoppingCart,
  Check,
} from 'lucide-react';

interface CoursesPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEnrollment: (courseTitle?: string) => void;
  onOpenPurchase: (courses: CourseItem[]) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onNavigate,
  onOpenEnrollment,
  onOpenPurchase,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [, setCartTick] = useState(0);

  useEffect(() => {
    const bump = () => setCartTick((t) => t + 1);
    window.addEventListener(CART_EVENT, bump);
    window.addEventListener('storage', bump);
    return () => {
      window.removeEventListener(CART_EVENT, bump);
      window.removeEventListener('storage', bump);
    };
  }, []);

  const isInCart = (course: CourseItem) => inCart(catalogIdForCourse(course));

  const categories = [
    'All',
    'Digital Skills',
    'Instructional Design',
    'AI & Technology',
    'Online Teaching',
    'LMS',
    'Course Creation',
  ];

  const filteredCourses = coursesCatalog.filter((c) => {
    const matchesCategory =
      selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-16 pb-14 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E4E79] tracking-tight leading-tight">
            Learn the Skills to Teach, Create and Thrive Digitally
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Practical courses and training designed to help educators,
            professionals, knowledge creators and learners develop the skills
            they need to succeed in a digital learning environment.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('catalogue');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Explore Courses
            </button>
            <button
              onClick={() => onOpenEnrollment(featuredMasterclass.title)}
              className="px-6 py-3.5 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white font-bold text-xs transition-colors shadow-sm"
            >
              Enrol in 5-Week Masterclass (₦30,000)
            </button>
          </div>
        </div>
      </section>

      {/* 2. COURSE CATALOGUE */}
      <section id="catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
              Our Courses
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Explore our growing collection of courses and training programmes
              designed around today&apos;s digital learning needs.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search courses or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78]"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1E4E79] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0F6B78] bg-[#0F6B78]/10 px-2.5 py-0.5 rounded-md">
                    {course.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {course.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                    <span>&bull;</span>
                    <span className="font-semibold text-[#1E4E79]">
                      {course.price || 'Contact for fee'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Key takeaways:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {course.whatYouLearn.slice(0, 2).map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const id = catalogIdForCourse(course);
                      if (isInCart(course)) {
                        removeFromCart(id);
                      } else {
                        addToCart(id);
                      }
                    }}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      isInCart(course)
                        ? 'bg-[#0F6B78] border-[#0F6B78] text-white hover:bg-[#0b5560]'
                        : 'bg-white border-slate-300 text-[#0F6B78] hover:border-[#0F6B78] hover:bg-[#0F6B78]/5'
                    }`}
                  >
                    {isInCart(course) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => onOpenPurchase([course])}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-xs transition-colors text-center"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              No courses found matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#F15A29] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 3. FEATURED PROGRAMME (COMPLETE SYLLABUS BREAKDOWN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#102A45] via-[#1E4E79] to-[#0F6B78] rounded-3xl text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#F15A29] text-white text-xs font-bold">
                  FLAGSHIP PROGRAMME
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium">
                  5-Week Intensive Cohort
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {featuredMasterclass.title}
              </h2>
              <p className="text-lg font-bold text-[#F15A29] uppercase tracking-wider">
                Learn. Create. Teach. Thrive.
              </p>
              <div className="space-y-3 max-w-3xl">
                <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                  {featuredMasterclass.description}
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {featuredMasterclass.secondaryDescription}
                </p>
              </div>
            </div>

            {/* Checkmark Deliverables */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Programme Deliverables & Key Outcomes:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredMasterclass.whatYouLearn.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-100 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who is it for? */}
            <div className="space-y-3 pt-4 border-t border-white/15">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Who is it for?
              </h3>
              <div className="flex flex-wrap gap-2">
                {featuredMasterclass.whoIsItFor?.map((who, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-slate-200 font-medium"
                  >
                    {who}
                  </span>
                ))}
              </div>
            </div>

            {/* Programme Details & Enrolment Strip */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-sm font-bold text-white">5 Weeks</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Format</p>
                <p className="text-sm font-bold text-white">
                  Self-Paced + Weekly Live Coaching & Q&A
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Certificate</p>
                <p className="text-sm font-bold text-emerald-300">
                  Certificate of Completion
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Investment</p>
                <p className="text-2xl font-black text-[#F15A29]">₦30,000</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenEnrollment(featuredMasterclass.title)}
                className="px-8 py-4 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-extrabold text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Enrol Now in Masterclass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/2348063383339?text=Hello%20EdTech%20Training%20Hub,%20I%20would%20like%20to%20enquire%20about%20the%20Digital%20Skills%20%26%20Online%20Teaching%20Masterclass."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs transition-colors"
              >
                WhatsApp Quick Enquiry (08063383339)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR TRAINING APPROACH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6B78]">
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E4E79] tracking-tight">
              Our Training Approach
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              Our courses are designed around practical application. You don&apos;t
              just learn a tool or concept. You learn how to apply it to real
              teaching, learning, professional and digital business situations.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Our training may include:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {trainingApproachPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F15A29] shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO ARE OUR COURSES FOR? */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6B78]">
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E4E79] tracking-tight">
              Who Are Our Courses For?
            </h2>
            <p className="text-slate-600 text-sm">
              Our training is designed to empower diverse educational and
              knowledge stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {courseAudienceList.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#F15A29]" />
                <span className="text-xs font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
