import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { solutionsData } from '../data/solutionsData';
import { Reveal } from '../components/Reveal';
import {
  Laptop,
  Compass,
  Sparkles,
  Layers,
  GraduationCap,
  Presentation,
  Brain,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Users,
  Building,
  ShieldCheck,
} from 'lucide-react';

interface SolutionsPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  targetId?: string;
  onOpenEnrollment: (courseTitle?: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onNavigate,
  targetId,
  onOpenEnrollment,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    targetId || 'instructional-design'
  );

  useEffect(() => {
    if (targetId) {
      setActiveCategory(targetId);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const audienceWorkWith = [
    'Educators & Teachers',
    'Online Tutors',
    'Trainers & Facilitators',
    'Coaches & Consultants',
    'Knowledge Professionals & Subject-Matter Experts',
    'Instructional Designers & eLearning Professionals',
    'Schools & Education Organisations',
    'Entrepreneurs & Creators',
    'Students & Learners',
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-16 pb-14 border-b border-slate-200/80">
        <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E4E79] tracking-tight leading-tight">
            Digital Learning & EdTech Solutions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            We provide practical learning, training and technology solutions for
            people and organisations looking to teach, learn and work more
            effectively in a digital environment.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Let&apos;s Work Together
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E4E79] border border-slate-300 font-bold text-xs transition-colors"
            >
              View Training Courses
            </button>
          </div>
        </Reveal>
      </section>

      {/* Quick Category Jump Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14">
        <Reveal className="bg-white rounded-2xl p-2.5 shadow-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-1.5">
          {solutionsData.map((sol) => (
            <button
              key={sol.id}
              onClick={() => {
                setActiveCategory(sol.id);
                const el = document.getElementById(sol.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`p-2.5 rounded-xl text-left transition-all ${
                activeCategory === sol.id
                  ? 'bg-[#1E4E79] text-white shadow-sm'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="text-xs font-bold line-clamp-2 leading-tight">
                {sol.title}
              </span>
            </button>
          ))}
        </Reveal>
      </section>

      {/* 2. THE 7 CORE SERVICES (DEEP DIVE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Reveal className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
            Our Core Services
          </h2>
          <p className="text-slate-600 text-sm">
            Explore our comprehensive range of instructional design, technology setup,
            course creation, digital skills training, and academic support.
          </p>
        </Reveal>

        <div className="space-y-10">
          {solutionsData.map((sol, idx) => {
            const IconComp = getSolutionIcon(sol.icon);
            return (
              <Reveal
                key={sol.id}
                id={sol.id}
                delay={0.05}
                className={`bg-white rounded-3xl p-8 sm:p-12 border transition-all scroll-mt-28 ${
                  activeCategory === sol.id
                    ? 'border-[#0F6B78] ring-2 ring-[#0F6B78]/20 shadow-xl'
                    : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column: Solution Identity & Overview */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${sol.accentColor}15`,
                          color: sol.accentColor,
                        }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                          {sol.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-[#0F6B78]">
                      {sol.tagline}
                    </p>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {sol.description}
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Who it is for:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {sol.whoItIsFor.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F15A29]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate('contact')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white font-bold text-xs transition-colors shadow-sm"
                      >
                        <span>Enquire About {sol.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Sub-Services Included Grid */}
                  <div className="lg:col-span-7 bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Services Include
                        </span>
                        <span className="text-xs font-semibold text-[#0F6B78]">
                          {sol.subServices.length} Components
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sol.subServices.map((serviceName, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-2.5"
                          >
                            <CheckCircle2
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: sol.accentColor }}
                            />
                            <span className="text-xs font-semibold text-slate-800">
                              {serviceName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-500">
                        Need tailored implementation or training for this service?
                      </p>
                      <a
                        href={`https://wa.me/2348063383339?text=${encodeURIComponent(
                          `Hello EdTech Training Hub, I would like to enquire about your ${sol.title} service.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Instant WhatsApp Enquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 3. WHO WE WORK WITH */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6B78]">
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
              Who We Work With
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Our services support a broad range of education stakeholders and
              digital practitioners.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {audienceWorkWith.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#F15A29] shrink-0" />
                <span className="text-xs font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('who-we-serve')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79]"
            >
              <span>View dedicated audience profiles & tailored offerings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* 4. WHY WORK WITH US? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="bg-gradient-to-br from-[#1E4E79] to-[#0F6B78] rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29] bg-white/10 px-3 py-1 rounded-full inline-block">
              Why Work With Us?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Because Technology Alone Does Not Create Better Learning.
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              We combine education, technology, learning design and practical
              skills to develop solutions that are useful, purposeful and
              learner-focused.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full md:w-auto px-8 py-4 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 text-center"
            >
              Start a Conversation
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
