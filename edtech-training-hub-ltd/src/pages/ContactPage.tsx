import React, { useState } from 'react';
import { PageId, ContactFormData } from '../types';
import { Reveal } from '../components/Reveal';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  Facebook,
  Linkedin,
  Instagram,
  ShieldCheck,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'Educator / Teacher',
    serviceInterest: 'Digital Skills Training',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const roleOptions = [
    'Educator / Teacher',
    'School / University',
    'Course Creator',
    'Coach / Consultant',
    'Trainer / Knowledge Professional',
    'Organisation',
    'Student / Learner',
    'Other',
  ];

  const helpOptions = [
    'Digital Skills Training',
    'Teacher Professional Development',
    'Instructional Design',
    'eLearning Development',
    'Online Course Development',
    'EdTech & LMS Solutions',
    'Online Learning / Academic Support',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppInstant = (phoneNum: string) => {
    const formattedMsg = encodeURIComponent(
      `Hello EdTech Training Hub!\n\nName: ${formData.name || '[Your Name]'}\nEmail: ${formData.email || '[Your Email]'}\nPhone: ${formData.phone || '[Your Phone]'}\nI am a: ${formData.role}\nInterested in: ${formData.serviceInterest}\nMessage: ${formData.message || 'I would like to enquire about your services.'}`
    );
    window.open(`https://wa.me/234${phoneNum.slice(1)}?text=${formattedMsg}`, '_blank');
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-16 pb-14 border-b border-slate-200/80">
        <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E4E79] tracking-tight leading-tight">
            Let&apos;s Build Better Learning Experiences Together
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Have a question about our courses, training or EdTech services?
            Whether you are an educator, institution, course creator,
            organisation or learner, we&apos;d love to hear from you. Get in
            touch with us and let&apos;s discuss how we can help.
          </p>
        </Reveal>
      </section>

      {/* 2. MAIN CONTACT DETAILS & FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
                Contact EdTech Training Hub Ltd
              </span>
              <h2 className="text-2xl font-extrabold text-[#1E4E79] tracking-tight mt-1">
                We are based in Abuja, Nigeria
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Serving clients, educators, and institutions across Nigeria, West
                Africa, and globally via modern digital learning channels.
              </p>
            </Reveal>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Location Card */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1E4E79]/10 text-[#1E4E79] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Location
                  </h3>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Abuja, Nigeria
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Federal Capital Territory &bull; On-site & Virtual Services
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#0F6B78]/10 text-[#0F6B78] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Phone Lines
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-1">
                    <a
                      href="tel:08063383339"
                      className="text-sm font-bold text-slate-900 hover:text-[#F15A29] transition-colors"
                    >
                      08063383339
                    </a>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <a
                      href="tel:07041480782"
                      className="text-sm font-bold text-slate-900 hover:text-[#F15A29] transition-colors"
                    >
                      07041480782
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Monday &ndash; Saturday, 8:00 AM &ndash; 6:00 PM (WAT)
                  </p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      WhatsApp Quick Chat
                    </h3>
                    <p className="text-xs text-emerald-700">
                      Chat directly with an EdTech specialist for instant enquiries.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppInstant('08063383339')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      Chat: 08063383339
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWhatsAppInstant('07041480782')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      Chat: 07041480782
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Official Email
                  </h3>
                  <a
                    href="mailto:info@edtechtraininghub.com"
                    className="text-sm font-bold text-slate-900 hover:text-[#1E4E79] transition-colors mt-0.5 block"
                  >
                    info@edtechtraininghub.com
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We respond to all written enquiries within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Promise */}
            <Reveal className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered corporate entity: <strong>EdTech Training Hub Ltd</strong>.
                Committed to ethical, transparent, and learner-first educational solutions.
              </p>
            </Reveal>
          </div>

          {/* Right Column: HOW CAN WE HELP? Contact Form */}
          <Reveal delay={0.1} className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md relative">
            <div className="mb-6 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
                HOW CAN WE HELP?
              </span>
              <h3 className="text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                Use the Contact Form to Tell Us What You Need
              </h3>
              <p className="text-xs text-slate-500">
                Provide your details and requirements below. Our Abuja team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.name}</strong>. Your enquiry regarding{' '}
                  <span className="text-[#1E4E79] font-semibold">{formData.serviceInterest}</span> has been received.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-700">
                  <p className="font-semibold text-slate-900">Summary of your enquiry:</p>
                  <p>&bull; Role: {formData.role}</p>
                  <p>&bull; Email: {formData.email}</p>
                  <p>&bull; Phone: {formData.phone}</p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppInstant('08063383339')}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Also Send to WhatsApp Directly</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        role: 'Educator / Teacher',
                        serviceInterest: 'Digital Skills Training',
                        message: '',
                      });
                    }}
                    className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., info@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., 08063383339"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                    />
                  </div>
                </div>

                {/* I am a: (exact options from prompt) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    I am a: *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  >
                    {roleOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* What can we help you with? (exact options from prompt) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    What can we help you with? *
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceInterest: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  >
                    {helpOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tell us more about what you need */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tell us more about what you need. *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current teaching, course creation, LMS, or learning goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F15A29]"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppInstant('08063383339')}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Prefer WhatsApp? Click to message us directly</span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* 3. CONNECT WITH US (Social Media section from prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Connect With Us
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Follow EdTech Training Hub for practical insights, training
            opportunities and updates on digital learning and EdTech.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="https://www.facebook.com/share/1Ypmwf76x2/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/edtech-training-hub/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-[#0A66C2] text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/edtechtraininghub?igsh=amh5NmxlbGlnYnly&igsi=amh5NmxlbGlnYnly&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-[#E4405F] text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
