import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PageId } from '../types';
import { CART_EVENT } from '../utils/cart';
import {
  Menu,
  X,
  ChevronDown,
  Layers,
  Laptop,
  Compass,
  Sparkles,
  GraduationCap,
  Presentation,
  Brain,
  PhoneCall,
  MessageCircle,
  ShoppingCart,
  UserRound,
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, targetId?: string) => void;
  onCartOpenChange: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onCartOpenChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [solutionsSubMenuOpen, setSolutionsSubMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const syncAccountState = () => {
      setIsLoggedIn(Boolean(window.localStorage.getItem('eth_session')));
      try {
        const cart = JSON.parse(window.localStorage.getItem('eth_cart') || '[]');
        setCartCount(Array.isArray(cart) ? cart.length : 0);
      } catch {
        setCartCount(0);
      }
    };

    syncAccountState();
    window.addEventListener('storage', syncAccountState);
    window.addEventListener(CART_EVENT, syncAccountState);
    return () => {
      window.removeEventListener('storage', syncAccountState);
      window.removeEventListener(CART_EVENT, syncAccountState);
    };
  }, []);

  const solutionLinks = [
    {
      id: 'instructional-design',
      title: 'Instructional Design',
      icon: Compass,
      color: 'text-[#0F6B78]',
    },
    {
      id: 'lms-integration',
      title: 'LMS Integration & Support',
      icon: Layers,
      color: 'text-[#1E4E79]',
    },
    {
      id: 'course-development',
      title: 'Online Course Development',
      icon: Sparkles,
      color: 'text-[#F15A29]',
    },
    {
      id: 'digital-skills',
      title: 'Digital Skills Training',
      icon: Laptop,
      color: 'text-[#0F6B78]',
    },
    {
      id: 'educator-development',
      title: 'Teacher & Educator Development',
      icon: Presentation,
      color: 'text-[#1E4E79]',
    },
    {
      id: 'academic-support',
      title: 'Online Tutoring & Academic Support',
      icon: GraduationCap,
      color: 'text-[#F15A29]',
    },
    {
      id: 'edtech-consultation',
      title: 'Digital Learning & EdTech Consultation',
      icon: Brain,
      color: 'text-[#0F6B78]',
    },
  ];

  const handleNav = (page: PageId, targetId?: string) => {
    onNavigate(page, targetId);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    setSolutionsSubMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top micro-bar for quick contact */}
      <div className="bg-[#1E4E79] text-slate-100 text-xs py-1.5 px-4 sm:px-8 border-b border-[#163959]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Abuja, Nigeria &bull; EdTech Training Hub
            </span>
            <span className="hidden md:inline text-slate-300/60">|</span>
            <span className="hidden md:inline text-slate-200">
              Empowering Better Learning Through Technology
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:08063383339"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#F15A29]" />
              <span>08063383339</span>
            </a>
            <span className="text-slate-400">/</span>
            <a
              href="tel:07041480782"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>07041480782</span>
            </a>
            <a
              href="https://wa.me/2348063383339?text=Hello%20EdTech%20Training%20Hub,%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-medium ml-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center text-left group focus:outline-none"
            aria-label="EdTech Training Hub Home"
          >
            <img
              src="/images/logo/Logo.jpeg"
              alt="EdTech Training Hub"
              className="h-9 sm:h-11 w-auto object-contain drop-shadow-sm group-hover:scale-105 group-hover:drop-shadow-md transition-all duration-200"
            />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'text-[#F15A29] font-bold bg-[#F15A29]/10'
                  : 'hover:text-[#1E4E79] hover:bg-slate-100/80'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'about'
                  ? 'text-[#F15A29] font-bold bg-[#F15A29]/10'
                  : 'hover:text-[#1E4E79] hover:bg-slate-100/80'
              }`}
            >
              About
            </button>

            {/* Solutions with rich Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav('solutions')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors ${
                  currentPage === 'solutions'
                    ? 'text-[#F15A29] font-bold bg-[#F15A29]/10'
                    : 'hover:text-[#1E4E79] hover:bg-slate-100/80'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    solutionsDropdownOpen ? 'rotate-180 text-[#F15A29]' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {solutionsDropdownOpen && (
                  <motion.div
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 8, scale: 0.98 }
                    }
                    animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 mt-1 w-84 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Major Solution Categories
                      </p>
                    </div>
                    <div className="space-y-1">
                      {solutionLinks.map((item, i) => {
                        const IconComp = item.icon;
                        return (
                          <motion.div
                            key={item.id}
                            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.18,
                              delay: reduceMotion ? 0 : 0.03 + i * 0.035,
                            }}
                          >
                            <button
                              onClick={() => handleNav('solutions', item.id)}
                              className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group/item"
                            >
                              <div className="p-1.5 rounded-md bg-slate-100 group-hover/item:bg-slate-200/70 transition-colors">
                                <IconComp className={`w-4 h-4 ${item.color}`} />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-800 group-hover/item:text-[#1E4E79]">
                                  {item.title}
                                </p>
                              </div>
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="pt-2 mt-1 border-t border-slate-100">
                      <button
                        onClick={() => handleNav('solutions')}
                        className="w-full text-center text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79] py-1.5 block"
                      >
                        View All Solutions &rarr;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNav('courses')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'courses'
                  ? 'text-[#F15A29] font-bold bg-[#F15A29]/10'
                  : 'hover:text-[#1E4E79] hover:bg-slate-100/80'
              }`}
            >
              Courses
            </button>

            <button
              onClick={() => handleNav('who-we-serve')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'who-we-serve'
                  ? 'text-[#F15A29] font-bold bg-[#F15A29]/10'
                  : 'hover:text-[#1E4E79] hover:bg-slate-100/80'
              }`}
            >
              Who We Serve
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'contact'
                  ? 'text-[#F15A29] font-bold bg-[#F15A29]/10'
                  : 'hover:text-[#1E4E79] hover:bg-slate-100/80'
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => handleNav('blog')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'blog'
                  ? 'text-[#F15A29] font-bold bg-[#F15A29]/10'
                  : 'hover:text-[#1E4E79] hover:bg-slate-100/80'
              }`}
            >
              Blog
            </button>
          </nav>

          {/* Account and cart actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={() => handleNav('dashboard')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1E4E79] hover:text-[#F15A29] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <UserRound className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => handleNav('login')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1E4E79] hover:text-[#F15A29] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <UserRound className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
            <button
              onClick={() => onCartOpenChange(true)}
              className="relative inline-flex items-center justify-center p-2.5 rounded-lg text-[#1E4E79] hover:text-[#F15A29] hover:bg-slate-100 transition-colors"
              aria-label={`View cart${cartCount ? `, ${cartCount} items` : ''}`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#F15A29] text-white text-[10px] leading-4 text-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => handleNav('dashboard')}
                className="p-2 rounded-lg text-[#1E4E79] hover:bg-slate-100"
                aria-label="Open dashboard"
              >
                <UserRound className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => handleNav('login')}
                className="p-2 rounded-lg text-[#1E4E79] hover:bg-slate-100"
                aria-label="Log in"
              >
                <UserRound className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => onCartOpenChange(true)}
              className="relative p-2 rounded-lg text-[#1E4E79] hover:bg-slate-100"
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#F15A29] text-white text-[10px] leading-4 text-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`text-left px-3 py-2.5 rounded-lg ${
                currentPage === 'home'
                  ? 'bg-[#F15A29]/10 text-[#F15A29] font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`text-left px-3 py-2.5 rounded-lg ${
                currentPage === 'about'
                  ? 'bg-[#F15A29]/10 text-[#F15A29] font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setSolutionsSubMenuOpen(!solutionsSubMenuOpen)}
              aria-expanded={solutionsSubMenuOpen}
              className={`text-left px-3 py-2.5 rounded-lg flex items-center justify-between w-full ${
                currentPage === 'solutions'
                  ? 'bg-[#F15A29]/10 text-[#F15A29] font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>Solutions &amp; Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  solutionsSubMenuOpen ? 'rotate-180 text-[#F15A29]' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Sub-services links on mobile — mirrors desktop dropdown, toggleable */}
            <AnimatePresence initial={false}>
              {solutionsSubMenuOpen && (
                <motion.div
                  initial={reduceMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 pr-1 py-2 space-y-1 bg-slate-50 rounded-lg">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Major Solution Categories
                      </p>
                    </div>
                    {solutionLinks.map((item, i) => {
                      const IconComp = item.icon;
                      return (
                        <motion.div
                          key={item.id}
                          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.18,
                            delay: reduceMotion ? 0 : 0.03 + i * 0.03,
                          }}
                        >
                          <button
                            onClick={() => handleNav('solutions', item.id)}
                            className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors group/item"
                          >
                            <div className="p-1.5 rounded-md bg-slate-100 group-hover/item:bg-slate-200/70 transition-colors">
                              <IconComp className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <span className="text-xs font-semibold text-slate-700 group-hover/item:text-[#1E4E79]">
                              {item.title}
                            </span>
                          </button>
                        </motion.div>
                      );
                    })}
                    <div className="pt-2 mt-1 border-t border-slate-100">
                      <button
                        onClick={() => handleNav('solutions')}
                        className="w-full text-center text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79] py-1.5 block"
                      >
                        View All Solutions &rarr;
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => handleNav('courses')}
              className={`text-left px-3 py-2.5 rounded-lg ${
                currentPage === 'courses'
                  ? 'bg-[#F15A29]/10 text-[#F15A29] font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Courses & Masterclasses
            </button>
            <button
              onClick={() => handleNav('who-we-serve')}
              className={`text-left px-3 py-2.5 rounded-lg ${
                currentPage === 'who-we-serve'
                  ? 'bg-[#F15A29]/10 text-[#F15A29] font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Who We Serve
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`text-left px-3 py-2.5 rounded-lg ${
                currentPage === 'contact'
                  ? 'bg-[#F15A29]/10 text-[#F15A29] font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNav('blog')}
              className={`text-left px-3 py-2.5 rounded-lg ${
                currentPage === 'blog'
                  ? 'bg-[#F15A29]/10 text-[#F15A29] font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              Blog
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-white border border-slate-200 text-[#1E4E79] font-bold text-sm flex items-center justify-center gap-2"
              >
                <UserRound className="w-4 h-4" />
                My Dashboard
              </button>
            ) : (
              <button
                onClick={() => handleNav('login')}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-white border border-slate-200 text-[#1E4E79] font-bold text-sm flex items-center justify-center gap-2"
              >
                <UserRound className="w-4 h-4" />
                Log In
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCartOpenChange(true);
              }}
              className="relative w-full text-center py-2.5 px-4 rounded-lg bg-white border border-slate-200 text-[#0F6B78] font-bold text-sm flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              View Cart
              {cartCount > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 min-w-4 h-4 px-1 rounded-full bg-[#F15A29] text-white text-[10px] leading-4 text-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
