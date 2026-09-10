import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageId, CourseItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { CoursesPage } from './pages/CoursesPage';
import { WhoWeServePage } from './pages/WhoWeServePage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { EnrollmentModal } from './components/EnrollmentModal';
import { PurchaseModal } from './components/PurchaseModal';
import { PageLoader } from './components/PageLoader';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [targetId, setTargetId] = useState<string | undefined>(undefined);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const loaderTimer = useRef<number | undefined>(undefined);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState<
    string | undefined
  >(undefined);
  const [purchaseCourses, setPurchaseCourses] = useState<CourseItem[] | null>(
    null
  );

  // Sync hash with page on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const [pagePart, idPart] = hash.split('/');
        const validPages: PageId[] = [
          'home',
          'about',
          'solutions',
          'courses',
          'who-we-serve',
          'contact',
          'login',
          'signup',
          'forgot-password',
        ];
        if (validPages.includes(pagePart as PageId)) {
          setCurrentPage(pagePart as PageId);
          setTargetId(idPart);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setIsPageLoading(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  const stopLoading = () => {
    window.clearTimeout(loaderTimer.current);
    loaderTimer.current = window.setTimeout(() => setIsPageLoading(false), 600);
  };

  const handleNavigate = (page: PageId, target?: string) => {
    setCurrentPage(page);
    setTargetId(target);
    const newHash = target ? `#${page}/${target}` : `#${page}`;
    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPageLoading(true);
    stopLoading();
  };

  const handleOpenEnrollment = (courseTitle?: string) => {
    setSelectedCourseForEnrollment(courseTitle);
    setEnrollmentModalOpen(true);
  };

  const handleOpenPurchase = (courses: CourseItem[]) => {
    setPurchaseCourses(courses);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#F15A29]/20 selection:text-[#F15A29]">
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPurchase={handleOpenPurchase}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenEnrollment={handleOpenEnrollment}
                targetId={targetId}
              />
            )}
            {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
            {currentPage === 'solutions' && (
              <SolutionsPage
                onNavigate={handleNavigate}
                targetId={targetId}
                onOpenEnrollment={handleOpenEnrollment}
              />
            )}
            {currentPage === 'courses' && (
              <CoursesPage
                onNavigate={handleNavigate}
                onOpenEnrollment={handleOpenEnrollment}
                onOpenPurchase={handleOpenPurchase}
              />
            )}
            {currentPage === 'who-we-serve' && (
              <WhoWeServePage
                onNavigate={handleNavigate}
                onOpenEnrollment={handleOpenEnrollment}
              />
            )}
            {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
            {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
            {currentPage === 'signup' && <SignupPage onNavigate={handleNavigate} />}
            {currentPage === 'forgot-password' && (
              <ForgotPasswordPage onNavigate={handleNavigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Enrolment Modal */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        defaultCourseTitle={selectedCourseForEnrollment}
      />

      {/* Purchase Checkout Modal */}
      <PurchaseModal
        isOpen={purchaseCourses !== null}
        courses={purchaseCourses || []}
        onClose={() => setPurchaseCourses(null)}
        onNavigate={handleNavigate}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* Book-opening page loader (boot + navigation) */}
      <AnimatePresence>{isPageLoading && <PageLoader />}</AnimatePresence>
    </div>
  );
}
