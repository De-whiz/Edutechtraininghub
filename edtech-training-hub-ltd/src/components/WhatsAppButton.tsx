import React, { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">Chat with EdTech Training Hub</p>
              <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Official Abuja Support Team
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3">
            Have questions about training, courses, LMS setup, or academic support? Message us directly:
          </p>

          <div className="space-y-2">
            <a
              href="https://wa.me/2348063383339?text=Hello%20EdTech%20Training%20Hub,%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60 transition-colors group text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Line 1: 08063383339</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded">Chat</span>
            </a>

            <a
              href="https://wa.me/2347041480782?text=Hello%20EdTech%20Training%20Hub,%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60 transition-colors group text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Line 2: 07041480782</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded">Chat</span>
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-center">
            <a
              href="tel:08063383339"
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800"
            >
              <Phone className="w-3 h-3 text-[#F15A29]" />
              <span>Or click to call directly: 08063383339</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95 group focus:outline-none"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
