import React, { useEffect, useState } from 'react';
import { PageId, CourseItem } from '../types';
import { currentUser, setSession } from '../utils/auth';
import { enrolledCourses, formatWhen, userActivity } from '../utils/account';
import { coursesCatalog } from '../data/coursesData';
import {
  CART_EVENT,
  addToCart,
  catalogIdForCourse,
  inCart,
  removeFromCart,
} from '../utils/cart';
import { CourseDetailModal } from '../components/CourseDetailModal';
import {
  LayoutDashboard,
  BookOpen,
  Search,
  GraduationCap,
  Award,
  KeyRound,
  Settings,
  ShoppingCart,
  UserRound,
  ChevronDown,
  LogOut,
  Clock,
  CheckCircle2,
  Activity,
  CalendarDays,
  Check,
  ShoppingBag,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenPurchase: (courses: CourseItem[]) => void;
  onOpenCart: () => void;
}

type DashTab =
  | 'overview'
  | 'courses'
  | 'browse'
  | 'grades'
  | 'certificates'
  | 'access'
  | 'settings';

const CATEGORIES = [
  'All',
  'Digital Skills',
  'Instructional Design',
  'AI & Technology',
  'Online Teaching',
  'LMS',
  'Course Creation',
];

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenPurchase,
  onOpenCart,
}) => {
  const user = currentUser();
  const [tab, setTab] = useState<DashTab>('overview');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [browseCategory, setBrowseCategory] = useState('All');
  const [browseQuery, setBrowseQuery] = useState('');

  useEffect(() => {
    const sync = () => {
      try {
        const cart = JSON.parse(window.localStorage.getItem('eth_cart') || '[]');
        setCartCount(Array.isArray(cart) ? cart.length : 0);
      } catch {
        setCartCount(0);
      }
    };
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 shadow-lg p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#F15A29]/10 text-[#F15A29] grid place-items-center">
            <Lock className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E4E79] tracking-tight">
              Log In to View Your Dashboard
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your purchased courses and learning activity will appear here once
              you are signed in.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-colors"
            >
              <UserRound className="w-4 h-4" />
              Log In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="px-7 py-3 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white font-bold text-sm transition-colors shadow-sm"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const courses = enrolledCourses(user.id);
  const activities = userActivity(user.id);
  const ownedIds = new Set(courses.map((c) => catalogIdForCourse(c)));
  const initials = `${user.fname?.[0] || ''}${user.lname?.[0] || ''}`.toUpperCase();

  const tabs: { id: DashTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen, badge: courses.length },
    { id: 'browse', label: 'Browse', icon: Search },
    { id: 'grades', label: 'Grades', icon: GraduationCap },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'access', label: 'My Access', icon: KeyRound },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const tabButtonClass = (id: DashTab) =>
    `inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
      tab === id
        ? 'bg-[#1E4E79] text-white shadow-sm'
        : 'text-slate-700 hover:bg-slate-100'
    }`;

  const handleLogout = () => {
    setSession(null);
    onNavigate('home');
  };

  const filteredCourses = coursesCatalog.filter((c) => {
    const matchesCategory =
      browseCategory === 'All' || c.category === browseCategory;
    const q = browseQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const isOwned = (course: CourseItem) => ownedIds.has(catalogIdForCourse(course));

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Dashboard top bar */}
      <header className="sticky top-0 z-40 h-16 bg-[#102A45] text-white border-b border-white/10">
        <div className="h-full max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
            aria-label="Back to EdTech Training Hub home"
          >
            <img
              src="/images/logo/Logo.jpeg"
              alt="EdTech Training Hub"
              className="h-9 w-auto object-contain rounded"
            />
            <span className="hidden sm:block text-left">
              <span className="block text-xs font-extrabold tracking-tight">
                Student Dashboard
              </span>
              <span className="block text-[10px] text-slate-300 group-hover:text-[#ffb59b] transition-colors">
                Back to site
              </span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={onOpenCart}
              aria-label={`View cart${cartCount ? `, ${cartCount} items` : ''}`}
              className="relative p-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#F15A29] text-white text-[10px] leading-4 text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              {userMenuOpen && (
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setUserMenuOpen(false)}
                />
              )}
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                aria-expanded={userMenuOpen}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-[#F15A29] text-white text-xs font-black grid place-items-center">
                  {initials || '?'}
                </span>
                <span className="hidden md:block text-xs font-bold max-w-[140px] truncate">
                  {user.fname} {user.lname}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-300 transition-transform ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-40 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <p className="text-sm font-extrabold text-slate-900">
                      {user.fname} {user.lname}
                    </p>
                    <p className="text-[11px] text-slate-500 break-all">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      setTab('settings');
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile tab strip */}
      <nav className="lg:hidden flex gap-1.5 overflow-x-auto px-4 py-3 bg-white border-b border-slate-200 sticky top-16 z-30">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={tabButtonClass(t.id)}
            >
              <Icon className="w-4 h-4" />
              {t.label}
              {typeof t.badge === 'number' && t.badge > 0 && (
                <span className="ml-1 min-w-4 h-4 px-1 rounded-full bg-[#F15A29] text-white text-[10px] leading-4 text-center">
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col gap-1.5 w-64 shrink-0 p-4 bg-white border-r border-slate-200 sticky top-16 self-start">
          <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Dashboard
          </p>
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  tab === t.id
                    ? 'bg-[#1E4E79] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left whitespace-nowrap">{t.label}</span>
                {typeof t.badge === 'number' && t.badge > 0 && (
                  <span
                    className={`min-w-4 h-4 px-1 rounded-full text-[10px] leading-4 text-center ${
                      tab === t.id
                        ? 'bg-[#F15A29] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100 pt-4"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {/* ============ OVERVIEW ============ */}
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#102A45] via-[#1E4E79] to-[#0F6B78] rounded-3xl p-6 sm:p-9 text-white relative overflow-hidden">
                <div className="relative max-w-2xl space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Student Dashboard
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                    Welcome back, {user.fname}
                  </h1>
                  <p className="text-sm text-[#ffb59b] font-medium">
                    {new Date().toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Enrolled Courses', value: courses.length, icon: BookOpen },
                  { label: 'Recent Activity', value: activities.length, icon: Activity },
                  { label: 'Items in Cart', value: cartCount, icon: ShoppingBag },
                  { label: 'Programmes Available', value: coursesCatalog.length, icon: GraduationCap },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {s.label}
                        </p>
                        <p className="mt-1 text-3xl font-black text-[#1E4E79]">
                          {s.value}
                        </p>
                      </div>
                      <div className="w-11 h-11 rounded-xl bg-[#0F6B78]/10 text-[#0F6B78] grid place-items-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Latest courses */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-extrabold text-[#1E4E79]">
                      My Latest Courses
                    </h2>
                    <button
                      onClick={() => setTab('courses')}
                      className="text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
                    >
                      View all
                    </button>
                  </div>
                  {courses.length === 0 ? (
                    <div className="py-8 text-center space-y-3">
                      <p className="text-xs text-slate-500">
                        No courses yet. Start by browsing the catalogue.
                      </p>
                      <button
                        onClick={() => setTab('browse')}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-sm transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Browse Courses
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {courses.slice(0, 3).map((c) => (
                        <div
                          key={c.id}
                          className="flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                              {c.title}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1">
                              {c.duration} &bull; {c.category}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedCourse(c)}
                            className="shrink-0 text-xs font-bold text-[#0F6B78] bg-[#0F6B78]/10 hover:bg-[#0F6B78]/15 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Recent activity */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-extrabold text-[#1E4E79]">
                      Recent Activity
                    </h2>
                  </div>
                  {activities.length === 0 ? (
                    <p className="py-8 text-center text-xs text-slate-500">
                      Your activity feed is empty for now.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {activities.slice(0, 5).map((a, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1E4E79]/10 text-[#1E4E79] grid place-items-center shrink-0">
                            <CalendarDays className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 line-clamp-2">
                              {a.text}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {formatWhen(a.ts)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}

          {/* ============ MY COURSES ============ */}
          {tab === 'courses' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                    My Courses
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Courses and training programmes purchased on your account.
                  </p>
                </div>
                <button
                  onClick={() => setTab('browse')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Browse More Courses
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {courses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-slate-400 grid place-items-center">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-800">
                      No courses yet
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      When you purchase a course or training programme it will
                      show up here automatically.
                    </p>
                  </div>
                  <button
                    onClick={() => setTab('browse')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Explore Course Catalogue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-[#0F6B78] bg-[#0F6B78]/10 px-2.5 py-0.5 rounded-md">
                            {course.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            Purchased
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {course.duration}
                          </span>
                          <span>&bull;</span>
                          <span className="line-clamp-1">{course.format}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="mt-5 w-full py-2.5 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white font-bold text-xs shadow-sm transition-colors"
                      >
                        View Course Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ BROWSE ============ */}
          {tab === 'browse' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                  Browse Courses
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Explore our catalogue and add or buy any course you like.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search courses or topics..."
                    value={browseQuery}
                    onChange={(e) => setBrowseQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78]"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setBrowseCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        browseCategory === cat
                          ? 'bg-[#1E4E79] text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                  <p className="text-sm font-semibold text-slate-700">
                    No courses found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setBrowseCategory('All');
                      setBrowseQuery('');
                    }}
                    className="text-xs font-bold text-[#F15A29] hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
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
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="pt-5 mt-4 border-t border-slate-100">
                        {isOwned(course) ? (
                          <button
                            onClick={() => setSelectedCourse(course)}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Purchased — View Details
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const id = catalogIdForCourse(course);
                                if (inCart(id)) {
                                  removeFromCart(id);
                                } else {
                                  addToCart(id);
                                }
                              }}
                              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                                inCart(catalogIdForCourse(course))
                                  ? 'bg-[#0F6B78] border-[#0F6B78] text-white hover:bg-[#0b5560]'
                                  : 'bg-white border-slate-300 text-[#0F6B78] hover:border-[#0F6B78] hover:bg-[#0F6B78]/5'
                              }`}
                            >
                              {inCart(catalogIdForCourse(course)) ? (
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
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ GRADES ============ */}
          {tab === 'grades' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 sm:p-14 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-slate-400 grid place-items-center">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-slate-800">
                  No grades yet
                </h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Assessment results will appear here once your courses have
                  been graded by the facilitators.
                </p>
              </div>
            </div>
          )}

          {/* ============ CERTIFICATES ============ */}
          {tab === 'certificates' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 sm:p-14 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-slate-400 grid place-items-center">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-slate-800">
                  No certificates yet
                </h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your certificates of completion will appear here once you
                  finish a course.
                </p>
              </div>
            </div>
          )}

          {/* ============ MY ACCESS ============ */}
          {tab === 'access' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                  My Access
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Courses you currently have access to on your account.
                </p>
              </div>

              {courses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-4">
                  <p className="text-xs text-slate-500">
                    No active course access yet.
                  </p>
                  <button
                    onClick={() => setTab('browse')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Browse Courses
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between gap-3 px-5 py-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                          {c.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {c.duration} &bull; {c.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          Access Active
                        </span>
                        <button
                          onClick={() => setSelectedCourse(c)}
                          className="text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ SETTINGS ============ */}
          {tab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                  Account Settings
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your profile details on your account.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                <div className="px-6 py-5 flex items-center gap-4">
                  <span className="w-14 h-14 rounded-full bg-[#F15A29] text-white text-lg font-black grid place-items-center">
                    {initials || '?'}
                  </span>
                  <div>
                    <p className="text-base font-extrabold text-slate-900">
                      {user.fname} {user.lname}
                    </p>
                    <p className="text-xs text-slate-500">
                      Student account
                    </p>
                  </div>
                </div>
                {[
                  { label: 'First Name', value: user.fname },
                  { label: 'Last Name', value: user.lname },
                  { label: 'Email', value: user.email },
                  { label: 'Phone', value: user.phone },
                  {
                    label: 'Member Since',
                    value: formatWhen(user.createdAt) || '—',
                  },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="px-6 py-4 flex items-start justify-between gap-4"
                  >
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider pt-0.5">
                      {f.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 break-all text-right">
                      {f.value}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          )}
        </main>
      </div>

      <footer className="text-center text-[11px] text-slate-400 py-5 border-t border-slate-200">
        EdTech Training Hub Ltd &bull; Learn &bull; Teach &bull; Create &bull; Thrive
      </footer>

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
};

export default DashboardPage;