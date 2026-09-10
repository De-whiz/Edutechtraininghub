import React, { useState, useEffect } from 'react';
import { TestimonialItem } from '../types';
import { initialTestimonials } from '../data/testimonialsData';
import {
  Star,
  PlusCircle,
  MessageSquare,
  Building,
} from 'lucide-react';
import { SubmitTestimonialModal } from './SubmitTestimonialModal';

interface TestimonialsSectionProps {
  onOpenConsultation?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenConsultation,
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Load custom submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('eth_user_testimonials');
      if (stored) {
        const customItems: TestimonialItem[] = JSON.parse(stored);
        if (customItems && customItems.length > 0) {
          // Merge custom testimonials before default ones (keeping unique IDs)
          setTestimonials((prev) => {
            const existingIds = new Set(customItems.map((item) => item.id));
            const filteredDefaults = prev.filter((item) => !existingIds.has(item.id));
            return [...customItems, ...filteredDefaults];
          });
        }
      }
    } catch {
      // Ignore local storage parse error
    }
  }, []);

  const handleTestimonialAdded = (newTestimonial: TestimonialItem) => {
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const categories = [
    'All',
    'Higher Education',
    'Online Teaching',
    'Corporate L&D / LMS',
    'Course Creation',
    'K-12 Education',
  ];

  const filteredTestimonials = testimonials.filter((t) => {
    if (selectedFilter === 'All') return true;
    return t.category === selectedFilter;
  });

  return (
    <section
      id="testimonials"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-28"
    >
      {/* 1. SECTION HEADER & ACTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
            What Our Community Says
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real experiences from teachers, institutions, course creators, and
            learners who have partnered with EdTech Training Hub Ltd.
          </p>
        </div>

        {/* CTA TO SUBMIT TESTIMONIAL BUTTON */}
        <div className="shrink-0 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your Testimonial</span>
          </button>
          <a
            href="https://wa.me/2348063383339?text=Hello%20EdTech%20Training%20Hub,%20I%20would%20like%20to%20share%20a%20testimonial%20about%20your%20services."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Share on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
          Filter by Group:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedFilter === cat
                ? 'bg-[#1E4E79] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. TESTIMONIAL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-6 relative group"
          >
            <div className="space-y-4">
              {/* Rating & Group Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                {t.category && (
                  <span className="text-[11px] font-semibold text-[#0F6B78] bg-[#0F6B78]/10 px-2.5 py-0.5 rounded-full">
                    {t.category}
                  </span>
                )}
              </div>

              {/* Testimonial Quote */}
              <p className="text-sm text-slate-700 leading-relaxed italic relative">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Space for Client's Name and Role / Organisation */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E4E79]/10 text-[#1E4E79] font-black text-xs flex items-center justify-center shrink-0">
                {t.avatarText || t.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                {/* Client Name */}
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {t.name}
                </h4>
                {/* Client Role & Organisation */}
                <p className="text-[11px] text-slate-600 truncate">
                  {t.role}
                </p>
                {t.organization && (
                  <p className="text-[10px] text-slate-400 font-medium truncate flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3 shrink-0" />
                    <span>{t.organization}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. CALL TO ACTION FOR USERS TO SUBMIT THEIR OWN TESTIMONIALS */}
      <div className="bg-slate-100/90 rounded-3xl p-8 sm:p-10 border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
            Your Voice Matters
          </span>
          <h3 className="text-2xl font-extrabold text-[#1E4E79] tracking-tight">
            Have You Learned or Partnered With Us?
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            We value feedback from all our students, alumni, educators, and
            institutional partners. Submit your testimonial to share how EdTech
            Training Hub Ltd has impacted your teaching or career.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your Testimonial</span>
          </button>
          <a
            href="https://wa.me/2348063383339?text=Hello%20EdTech%20Training%20Hub,%20I%20would%20like%20to%20send%20my%20testimonial%20and%20review."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-700 border border-slate-300 font-bold text-xs shadow-xs transition-colors text-center flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Send via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Interactive Modal for Testimonial Submission */}
      <SubmitTestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTestimonialAdded={handleTestimonialAdded}
      />
    </section>
  );
};
