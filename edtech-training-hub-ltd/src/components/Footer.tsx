import React from 'react';
import { PageId } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  Linkedin,
  Instagram,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, targetId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#102A45] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/80">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F15A29] via-[#0F6B78] to-[#1E4E79] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#102A45] rounded-[9px] flex items-center justify-center font-black text-white text-sm">
                  ET<span className="text-[#F15A29]">H</span>
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                EdTech Training Hub <span className="text-xs text-[#F15A29] font-normal uppercase">Ltd</span>
              </span>
            </div>

            <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-sm">
              Empowering People to Learn, Teach, Create and Thrive in the Digital Age.
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              We combine education expertise with technology and learning design to make technology practical, purposeful, and learner-focused.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/1Ypmwf76x2/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow EdTech Training Hub on Facebook"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#F15A29] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/edtech-training-hub/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow EdTech Training Hub on LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#0F6B78] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/edtechtraininghub?igsh=amh5NmxlbGlnYnly&igsi=amh5NmxlbGlnYnly&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow EdTech Training Hub on Instagram"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#F15A29] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('who-we-serve')}
                  className="hover:text-white transition-colors"
                >
                  Who We Serve
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'testimonials')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <span>Testimonials</span>
                  <span className="text-[10px] bg-[#F15A29] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    New
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Main Solutions */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Our Services
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('solutions', 'instructional-design')}
                  className="hover:text-[#0F6B78] text-left transition-colors flex items-center gap-1 group"
                >
                  <span>Instructional Design</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions', 'lms-integration')}
                  className="hover:text-[#F15A29] text-left transition-colors flex items-center gap-1 group"
                >
                  <span>LMS Integration & Support</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions', 'course-development')}
                  className="hover:text-[#0F6B78] text-left transition-colors flex items-center gap-1 group"
                >
                  <span>Online Course Development</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions', 'digital-skills')}
                  className="hover:text-[#F15A29] text-left transition-colors flex items-center gap-1 group"
                >
                  <span>Digital Skills Training</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions', 'educator-development')}
                  className="hover:text-[#0F6B78] text-left transition-colors flex items-center gap-1 group"
                >
                  <span>Teacher & Educator Development</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions', 'academic-support')}
                  className="hover:text-[#F15A29] text-left transition-colors flex items-center gap-1 group"
                >
                  <span>Online Tutoring & Academic Support</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions', 'edtech-consultation')}
                  className="hover:text-[#0F6B78] text-left transition-colors flex items-center gap-1 group"
                >
                  <span>Digital Learning & EdTech Consultation</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Us
            </p>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                <span>Abuja, Nigeria</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#0F6B78] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:08063383339" className="block hover:text-white transition-colors">
                    08063383339
                  </a>
                  <a href="tel:07041480782" className="block hover:text-white transition-colors">
                    07041480782
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="https://wa.me/2348063383339?text=Hello%20EdTech%20Training%20Hub,%20I'm%20contacting%20you%20from%20your%20website."
                    target="_blank"
                    rel="noreferrer"
                    className="block text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    WhatsApp: 08063383339
                  </a>
                  <a
                    href="https://wa.me/2347041480782?text=Hello%20EdTech%20Training%20Hub,%20I'm%20contacting%20you%20from%20your%20website."
                    target="_blank"
                    rel="noreferrer"
                    className="block text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    WhatsApp: 07041480782
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                <a
                  href="mailto:info@edtechtraininghub.com"
                  className="hover:text-white transition-colors"
                >
                  info@edtechtraininghub.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>&copy; {new Date().getFullYear()} EdTech Training Hub Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Technology Practical for Learning</span>
            <span>&bull;</span>
            <span>Abuja, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
