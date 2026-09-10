import React, { useState, useEffect } from 'react';
import { X, CheckCircle, MessageSquare, ArrowRight, Shield } from 'lucide-react';
import { featuredMasterclass } from '../data/coursesData';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseTitle?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  defaultCourseTitle,
}) => {
  const [courseTitle, setCourseTitle] = useState(
    defaultCourseTitle || featuredMasterclass.title
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Educator / Teacher');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultCourseTitle) {
      setCourseTitle(defaultCourseTitle);
    }
  }, [defaultCourseTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    const message = encodeURIComponent(
      `Hello EdTech Training Hub! I want to enrol in "${courseTitle}".\nName: ${name || '[My Name]'}\nPhone: ${phone || '[My Phone]'}\nRole: ${role}`
    );
    window.open(`https://wa.me/2348063383339?text=${message}`, '_blank');
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Enrolment Received!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-slate-800">{name || 'valued learner'}</span>. We have logged your enquiry for{' '}
              <span className="font-semibold text-[#1E4E79]">{courseTitle}</span>.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 text-left space-y-1.5 border border-slate-200">
              <p className="font-semibold text-slate-800">What happens next?</p>
              <p>&bull; Our admissions team in Abuja will reach out via WhatsApp or phone ({phone || 'your phone number'}).</p>
              <p>&bull; You will receive syllabus access and payment/onboarding instructions for the upcoming cohort.</p>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleWhatsAppInstant}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </button>
              <button
                onClick={resetForm}
                className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F15A29]/10 text-[#F15A29] text-xs font-bold mb-2">
                Course Enrolment &bull; Cohort Admission
              </div>
              <h2 className="text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                {courseTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Complete this quick registration to reserve your place or receive full syllabus details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Selected Course / Programme
                </label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F6B78]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Deborah Adeleke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., 08063383339"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  I am a:
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                >
                  <option value="Educator / Teacher">Educator / Teacher</option>
                  <option value="Online Tutor">Online Tutor</option>
                  <option value="Trainer / Facilitator">Trainer / Facilitator</option>
                  <option value="Coach / Consultant">Coach / Consultant</option>
                  <option value="Course Creator">Course Creator</option>
                  <option value="School / Organisation">School / Organisation</option>
                  <option value="Student / Learner">Student / Learner</option>
                  <option value="Professional / Other">Professional / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Questions or specific learning goals (Optional)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Tell us what you hope to achieve..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                ></textarea>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Enrolment Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppInstant}
                  className="w-full py-2.5 px-4 rounded-xl border border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Enquire Directly via WhatsApp (08063383339)</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Your information is confidential. EdTech Training Hub Ltd, Abuja.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
