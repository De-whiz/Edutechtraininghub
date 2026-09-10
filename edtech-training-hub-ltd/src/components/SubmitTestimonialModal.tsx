import React, { useState } from 'react';
import { TestimonialItem } from '../types';
import {
  X,
  Star,
  CheckCircle2,
  Send,
  MessageSquare,
  Building,
  User,
  Award,
} from 'lucide-react';

interface SubmitTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestimonialAdded: (testimonial: TestimonialItem) => void;
}

export const SubmitTestimonialModal: React.FC<SubmitTestimonialModalProps> = ({
  isOpen,
  onClose,
  onTestimonialAdded,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [category, setCategory] = useState('Educator / Teacher');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const categories = [
    'Educator / Teacher',
    'School / University',
    'Online Tutor',
    'Course Creator',
    'Corporate Trainer / L&D',
    'Student / Learner',
    'EdTech Partner',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !quote.trim()) return;

    const initials = name
      .trim()
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const newTestimonial: TestimonialItem = {
      id: `testimonial-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      organization: organization.trim() || 'Independent Professional',
      avatarText: initials || 'EP',
      quote: quote.trim(),
      rating,
      category,
      date: 'Just now',
    };

    // Save to local storage for persistent community testimonials
    try {
      const stored = localStorage.getItem('eth_user_testimonials');
      const list: TestimonialItem[] = stored ? JSON.parse(stored) : [];
      list.unshift(newTestimonial);
      localStorage.setItem('eth_user_testimonials', JSON.stringify(list));
    } catch {
      // Ignore storage errors
    }

    onTestimonialAdded(newTestimonial);
    setSubmitted(true);
  };

  const handleShareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello EdTech Training Hub Ltd,\n\nI just submitted a testimonial on your website!\n\nName: ${name}\nRole: ${role}\nOrganisation: ${organization || 'N/A'}\nRating: ${rating}/5 Stars\nTestimonial: "${quote}"`
    );
    window.open(`https://wa.me/2348063383339?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setName('');
    setRole('');
    setOrganization('');
    setQuote('');
    setRating(5);
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-modal-title"
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/70 rounded-t-3xl sticky top-0 z-10">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F15A29]">
              Community Stories
            </span>
            <h3
              id="testimonial-modal-title"
              className="text-lg sm:text-xl font-extrabold text-[#1E4E79]"
            >
              Share Your Testimonial
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900">
                Thank You for Your Feedback!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your testimonial has been published to our community reviews
                section. Your story helps educators and institutions across the
                EdTech ecosystem discover practical ways to teach and learn.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <p className="font-bold text-slate-900">
                  {name} &bull; <span className="font-normal text-slate-600">{role}</span>
                </p>
                {organization && (
                  <p className="text-slate-500 font-medium">{organization}</p>
                )}
                <div className="flex items-center gap-1 text-amber-500 pt-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="italic text-slate-700 pt-1">&ldquo;{quote}&rdquo;</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="button"
                  onClick={handleShareToWhatsApp}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Also Send to WhatsApp Directly</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white text-xs font-bold transition-colors"
                >
                  Done & View on Page
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Have you taken a course, partnered with us on learning design,
                or implemented an LMS? Tell us about your journey with EdTech
                Training Hub Ltd.
              </p>

              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Client / Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ngozi Okonjo / Mr. Emmanuel Davies"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  />
                </div>
              </div>

              {/* Role & Organisation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Teacher / Online Tutor"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organisation / School
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Leadway College, Abuja"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Star Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ecosystem Group
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setRating(starVal)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                        title={`${starVal} out of 5 stars`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starVal <= rating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {rating} / 5
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial Quote */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Testimonial / Story *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share how EdTech Training Hub helped you or your organisation develop digital skills, build courses, or improve learning..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Publish My Testimonial</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Your testimonial will appear on the website and help guide future
                educators and learners.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
