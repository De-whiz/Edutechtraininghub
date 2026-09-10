import React, { useState } from 'react';
import { PageId } from '../types';
import { allAudiencesDetailed } from '../data/audienceData';
import {
  GraduationCap,
  Video,
  Presentation,
  Award,
  Brain,
  Compass,
  Building2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface WhoWeServePageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEnrollment: (courseTitle?: string) => void;
}

export const WhoWeServePage: React.FC<WhoWeServePageProps> = ({
  onNavigate,
  onOpenEnrollment,
}) => {
  const [selectedAudienceId, setSelectedAudienceId] = useState<string>(
    allAudiencesDetailed[0].id
  );

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
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-16 pb-14 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E4E79] tracking-tight leading-tight">
            Who We Serve
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Different people have different learning and technology needs. Our
            solutions are designed around the realities of modern educators,
            professionals, organisations and learners.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500">
            <span className="bg-white px-3 py-1 rounded-full border border-slate-200">
              9 Tailored Pathways
            </span>
            <span>&bull;</span>
            <span className="bg-white px-3 py-1 rounded-full border border-slate-200">
              K-12 & Higher Ed
            </span>
            <span>&bull;</span>
            <span className="bg-white px-3 py-1 rounded-full border border-slate-200">
              Creators & Enterprises
            </span>
          </div>
        </div>
      </section>

      {/* 2. AUDIENCE QUICK NAV BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14">
        <div className="bg-white rounded-2xl p-2.5 shadow-lg border border-slate-200 flex flex-wrap items-center justify-center gap-1.5">
          {allAudiencesDetailed.map((aud) => (
            <button
              key={aud.id}
              onClick={() => {
                setSelectedAudienceId(aud.id);
                const el = document.getElementById(aud.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAudienceId === aud.id
                  ? 'bg-[#1E4E79] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {aud.title.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </section>

      {/* 3. DETAILED SECTIONS FOR ALL 9 AUDIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
           
          </span>
          <h2 className="text-3xl font-extrabold text-[#1E4E79] tracking-tight">
            How We Partner With You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAudiencesDetailed.map((aud) => {
            const IconComp = getAudienceIcon(aud.icon);
            const isSelected = selectedAudienceId === aud.id;
            return (
              <div
                key={aud.id}
                id={aud.id}
                className={`bg-white rounded-3xl p-7 border transition-all flex flex-col justify-between scroll-mt-28 ${
                  isSelected
                    ? 'border-[#0F6B78] ring-2 ring-[#0F6B78]/20 shadow-lg'
                    : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F6B78]/10 text-[#0F6B78] flex items-center justify-center shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {aud.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {aud.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Common challenges & needs */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Core Needs & Challenges:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {aud.needs.map((need, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F15A29] shrink-0 mt-1.5" />
                          <span>{need}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How We Help */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <p className="text-[11px] font-bold text-[#1E4E79] uppercase tracking-wider">
                      How We Help:
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {aud.howWeHelp}
                    </p>
                  </div>

                  {/* Recommended Solutions */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Recommended Solutions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {aud.recommendedSolutions.map((sol, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {sol}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full inline-flex items-center justify-between text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#1E4E79] hover:text-white text-[#1E4E79] transition-colors"
                  >
                    <span>Connect as {aud.title.split('&')[0].trim()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. NOT SURE WHERE TO START? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E4E79] to-[#0F6B78] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29] bg-white/10 px-3 py-1 rounded-full inline-block">
              
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Unsure Which Solution Fits Your Current Stage?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Tell our team in Abuja about your teaching goals, course idea, or
              institutional roadmap. We will recommend the exact training or
              learning design pathway.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="shrink-0 px-7 py-3.5 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-lg transition-all active:scale-95 text-center"
          >
            Request Free Assessment Call
          </button>
        </div>
      </section>
    </div>
  );
};
