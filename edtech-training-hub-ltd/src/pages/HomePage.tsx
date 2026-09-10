import React, { useEffect } from 'react';
import { PageId } from '../types';
import { solutionsData } from '../data/solutionsData';
import { homeAudienceGroups } from '../data/audienceData';
import { featuredMasterclass } from '../data/coursesData';
import { TestimonialsSection } from '../components/TestimonialsSection';
import heroBannerImg from '../assets/images/hero.jpg';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  Laptop,
  Compass,
  Layers,
  GraduationCap,
  Presentation,
  Briefcase,
  Building2,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Video,
  Brain,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEnrollment: (courseTitle?: string) => void;
  targetId?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnrollment,
  targetId,
}) => {
  useEffect(() => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [targetId]);
  const getSolutionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return Laptop;
      case 'Compass':
        return Compass;
      case 'Sparkles':
        return Sparkles;
      case 'Layers':
        return Layers;
      case 'Presentation':
        return Presentation;
      case 'Brain':
        return Brain;
      case 'GraduationCap':
      default:
        return GraduationCap;
    }
  };

  const getAudienceIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return GraduationCap;
      case 'Video':
        return Video;
      case 'Presentation':
        return Presentation;
      case 'Award':
        return Award;
      case 'Brain':
        return Brain;
      case 'Compass':
        return Compass;
      case 'Building2':
        return Building2;
      case 'Sparkles':
        return Sparkles;
      case 'BookOpen':
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 overflow-hidden">
        {/* Background glow and architectural grid accents */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 -z-10" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#0F6B78]/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F15A29]/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E4E79]/10 text-[#1E4E79] text-xs font-bold tracking-wide border border-[#1E4E79]/15">
                <span className="w-2 h-2 rounded-full bg-[#F15A29]" />
                Digital Learning &bull; Professional Development &bull; Abuja, Nigeria
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E4E79] tracking-tight leading-[1.12]">
                Empowering Better Learning Through{' '}
                <span className="text-[#F15A29] relative inline-block">
                  Technology
                  <svg
                    className="absolute left-0 -bottom-2 w-full text-[#F15A29]/30"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,8 Q50,0 100,8"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>

              {/* Supporting Text */}
              <div className="space-y-3 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                <p>
                  <strong className="text-slate-900 font-semibold">
                    EdTech Training Hub
                  </strong>{' '}
                  helps educators, institutions, knowledge professionals, course
                  creators and learners use technology to teach better, learn
                  effectively and create meaningful digital learning experiences.
                </p>
                <p className="text-sm sm:text-base text-slate-500">
                  From digital skills and educator development to instructional
                  design, eLearning, online course development and LMS
                  solutions, we make technology practical for learning.
                </p>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('solutions')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 group"
                >
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('courses')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E4E79] border border-slate-300 font-bold text-sm shadow-sm hover:border-[#1E4E79] transition-all"
                >
                  <span>View Our Courses</span>
                </button>
              </div>

              {/* Quick stats micro-strip */}
              <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="text-xl font-black text-[#1E4E79]">5 Areas</div>
                  <div className="text-xs text-slate-500">Connected EdTech Solutions</div>
                </div>
                <div>
                  <div className="text-xl font-black text-[#0F6B78]">5 Weeks</div>
                  <div className="text-xs text-slate-500">Flagship Masterclass</div>
                </div>
                <div>
                  <div className="text-xl font-black text-[#F15A29]">100%</div>
                  <div className="text-xs text-slate-500">Practical & Hands-On</div>
                </div>
              </div>
            </div>

            {/* Right Graphic / Educational Technology in Action */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Image Frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
                  <img
                    src={heroBannerImg}
                    alt="African educator utilizing modern digital learning tools and laptop in an interactive learning studio"
                    className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent"></div>

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-[#1E4E79] text-xs font-bold shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#F15A29]" />
                      <span>Empowering Better Learning</span>
                    </span>
                    <span className="text-[11px] font-bold text-white bg-[#0F6B78]/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
                      Abuja, Nigeria
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
                      Hands-On EdTech Training
                    </p>
                    <p className="text-sm sm:text-base font-extrabold leading-snug mt-0.5 text-white drop-shadow-xs">
                      Practical skills for teachers, course creators & learning institutions.
                    </p>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 hidden sm:flex items-center gap-3 max-w-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900 leading-tight">
                      Technology Makes Good Teaching Better
                    </p>
                    <p className="text-slate-500 text-[10px] mt-0.5">
                      Pedagogy first. Practical. Learner-focused.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / POSITIONING SECTION */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
            Education &bull; Technology &bull; Learning Design &bull; Practical Skills
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            &ldquo;We combine education expertise with technology and learning design
            to help people teach, learn and create more effectively in the digital age.&rdquo;
          </p>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION: Where Education Meets Technology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#1E4E79] to-[#0F6B78] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Where Education Meets Technology
            </h2>
            <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed">
              <p>
                Technology is changing how we learn, teach and share knowledge. At
                EdTech Training Hub, we help people and organisations navigate
                that change with practical training, learning design and
                technology-enabled solutions.
              </p>
              <p className="text-slate-300 text-sm sm:text-base">
                Whether you are an educator developing your digital skills, an
                institution building an online learning programme, a course
                creator turning expertise into a course, or a learner seeking
                personalised support, we provide solutions designed around your
                needs.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1E4E79] hover:bg-slate-100 font-bold text-xs transition-colors"
              >
                <span>Read Our Story & Approach</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs transition-colors"
              >
                <span>Speak with an EdTech Advisor</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SOLUTIONS (WHAT WE DO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
              What We Do
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Our work covers different areas of the digital learning ecosystem,
              brought together into one coherent, purposeful environment.
            </p>
          </div>
          <button
            onClick={() => onNavigate('solutions')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79] group"
          >
            <span>Explore all 7 services in detail</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 7 Distinct Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionsData.map((sol) => {
            const IconComp = getSolutionIcon(sol.icon);
            return (
              <div
                key={sol.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${sol.accentColor}15`,
                        color: sol.accentColor,
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1E4E79] transition-colors leading-snug">
                      {sol.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#0F6B78] mt-1">
                      {sol.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sol.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Includes:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {sol.subServices.slice(0, 3).map((sub, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {sub}
                        </span>
                      ))}
                      {sol.subServices.length > 3 && (
                        <span className="text-[11px] text-slate-400 font-medium px-1 py-0.5">
                          +{sol.subServices.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    onClick={() => onNavigate('solutions', sol.id)}
                    className="w-full inline-flex items-center justify-between text-xs font-bold py-2.5 px-4 rounded-lg bg-slate-50 group-hover:bg-[#1E4E79] group-hover:text-white text-[#1E4E79] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 8th Card: Custom Ecosystem Advisory Card */}
          <div className="bg-gradient-to-br from-[#1E4E79] to-[#0F6B78] rounded-2xl p-7 text-white shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold leading-snug">
                Need a Custom Combination of Solutions?
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Whether setting up a school-wide LMS with teacher training or
                packaging an accredited course with custom eLearning modules, we
                design combined packages around your specific needs.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold py-3 px-4 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white transition-all shadow"
              >
                <span>Request Custom Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO WE SERVE SECTION (Grouped cleanly into 5 cards) */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
              Solutions for Different Learning Needs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We work with people and organisations across the education and
              EdTech ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeAudienceGroups.map((aud) => {
              const IconComp = getAudienceIcon(aud.icon);
              return (
                <div
                  key={aud.id}
                  onClick={() => onNavigate('who-we-serve', aud.id)}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1E4E79]/30 transition-all space-y-3 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1E4E79]/10 text-[#1E4E79] flex items-center justify-center group-hover:bg-[#1E4E79] group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1E4E79] transition-colors">
                      {aud.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {aud.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#0F6B78] group-hover:text-[#F15A29] transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('who-we-serve')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <span>Explore Complete Audience Profiles & Dedicated Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & COMMUNITY FEEDBACK */}
      <TestimonialsSection onOpenConsultation={() => onNavigate('contact')} />

      {/* 6. FEATURED PROGRAMME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-[#F15A29]/20 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-8 p-8 sm:p-12 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#F15A29] text-white text-xs font-bold tracking-wide">
                  FEATURED PROGRAMME
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  5 Weeks Intensive
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
                  {featuredMasterclass.title}
                </h2>
                <p className="text-sm font-bold text-[#F15A29] mt-1 uppercase tracking-wider">
                  Learn. Create. Teach. Thrive.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {featuredMasterclass.description}
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {featuredMasterclass.secondaryDescription}
                </p>
              </div>

              {/* Checkmarks / Key Outcomes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {featuredMasterclass.whatYouLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#0F6B78] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Who is it for? */}
              <div className="pt-3 border-t border-slate-200/80 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Who is it for?
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {featuredMasterclass.whoIsItFor?.map((who, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {who}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenEnrollment(featuredMasterclass.title)}
                  className="px-6 py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Enrol in Masterclass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
                >
                  <span>Explore Full Curriculum</span>
                </button>
              </div>
            </div>

            {/* Right Details Strip */}
            <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-[#1E4E79] text-white p-8 sm:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-700">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Tuition Investment
                  </p>
                  <p className="text-4xl font-extrabold text-white mt-1">
                    ₦30,000
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Full access to live coaching, LMS materials & certificate
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-200 border-y border-slate-700/80 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="font-semibold">5 Weeks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Format</span>
                    <span className="font-semibold text-right">
                      Self-Paced + Live Coaching
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Credential</span>
                    <span className="font-semibold text-emerald-300">
                      Certificate of Completion
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <p className="font-semibold text-white">Next Cohort Enrolling:</p>
                  <p className="text-[11px]">
                    Limited cohort seats to ensure individual project feedback
                    and live interactive Q&A.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onOpenEnrollment(featuredMasterclass.title)}
                  className="w-full py-3 px-4 rounded-xl bg-white text-[#1E4E79] hover:bg-slate-100 font-extrabold text-xs transition-colors text-center"
                >
                  Secure Your Place &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY EDTECH TRAINING HUB? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
            Why EdTech Training Hub?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E4E79] tracking-tight sm:whitespace-nowrap">
            We Make Technology Practical for Learning
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Technology should not replace good teaching. It should make good
            teaching better.
          </p>
        </div>

        {/* 4 Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Practical Learning
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Learn skills you can immediately apply.&rdquo; No theoretical fluff;
              every lesson translates to your actual classroom, course, or
              workflow.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F6B78]/10 text-[#0F6B78] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Education Meets Technology
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Technology is used to strengthen teaching and learning, not
              replace good teaching.&rdquo; Pedagogy and human understanding always
              come first.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E4E79]/10 text-[#1E4E79] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Hands-On Approach
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Create projects, resources and practical learning outputs as you
              learn.&rdquo; Graduate with tangible curricula, slides, rubrics, and
              digital products.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Support for Different Skill Levels
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Build confidence from the basics while continuing to develop
              advanced skills.&rdquo; Accessible for beginners and deeply valuable for
              experienced educators.
            </p>
          </div>
        </div>

        {/* Philosophy Visual Box */}
        <div className="bg-gradient-to-br from-[#1E4E79] to-[#0F6B78] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Technology Should Make Good Teaching Better.
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              We don&apos;t believe technology should replace good teaching. We
              believe technology should make good teaching better.
            </p>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Our approach combines:{' '}
              <strong className="text-white font-bold underline decoration-[#F15A29] decoration-2 underline-offset-4">
                Education + Technology + Learning Design + Practical Skills
              </strong>
              . Rather than simply teaching people how to use tools, we focus on
              helping them understand when, why and how to use them effectively.
            </p>
            <p className="text-xs text-slate-300">
              Our programmes and solutions are practical, learner-focused and
              designed for real-world application.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready to Teach, Learn or Create in the Digital Age?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are an educator looking to improve your digital skills,
            an organisation building digital learning, a course creator
            developing your programme, or a learner who needs personalised
            support, we can help.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('solutions')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Explore Our Solutions
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-colors"
            >
              Contact Us &bull; Abuja, Nigeria
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
