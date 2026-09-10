import React from 'react';
import authVisualImg from '../assets/images/online-tutoring.jpg';

interface AuthLayoutProps {
  children: React.ReactNode;
  visualEyebrow: string;
  visualHeadline: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  visualEyebrow,
  visualHeadline,
}) => {
  return (
    <section className="bg-gradient-to-br from-[#f8fafc] via-[#eef4f7] to-[#f1f5f9] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
          {/* Form (left) */}
          <div className="px-6 sm:px-12 py-12 self-center">{children}</div>

          {/* Visual (right) */}
          <div className="relative min-h-[320px] lg:min-h-[620px] overflow-hidden bg-[#1E4E79]">
            <img
              src={authVisualImg}
              alt="Learner using practical digital learning tools"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2136]/90 via-[#0F6B78]/20 to-transparent" />
            <div className="absolute right-8 sm:right-10 bottom-8 sm:bottom-10 left-8 sm:left-10 z-10 text-white">
              <span className="text-[#ffb59b] font-extrabold text-xs uppercase tracking-[0.1em]">
                {visualEyebrow}
              </span>
              <h2 className="mt-2.5 text-2xl sm:text-4xl font-extrabold tracking-tight max-w-sm">
                {visualHeadline}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};