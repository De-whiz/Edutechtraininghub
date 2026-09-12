import React from 'react';
import { PageId } from '../types';

interface TermsPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-br from-[#102A45] via-[#1E4E79] to-[#0F6B78] text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Terms &amp; Conditions</h1>
          <p className="mt-4 text-slate-200">
            Effective date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10">
          <p className="text-sm text-slate-500 leading-relaxed">
            Welcome to EdTech Training Hub. These Terms &amp; Conditions govern your access to and use of our programmes,
            website and services. By registering for or participating in any of our courses, programmes or masterclasses,
            you agree to be bound by these terms.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">1. Services Provided</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            EdTech Training Hub offers professional development programmes including short courses, masterclasses,
            and training workshops focused on digital skills, instructional design, online teaching and course creation.
            Services may be delivered online, in-person or in hybrid format.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">2. Registration &amp; Eligibility</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Participation is open to all eligible individuals. Accurate and complete information must be provided during
            registration. You are responsible for maintaining the confidentiality of your account credentials.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">3. Payments &amp; Refunds</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Full payment is required prior to course commencement. Refund requests are assessed on a case-by-case basis
            within 14 days of purchase. Non-attendance does not automatically qualify for a refund. Bundle or promotional
            pricing may carry separate terms communicated at the point of sale.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">4. Intellectual Property</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            All course materials, content and resources provided during programmes are the intellectual property of EdTech
            Training Hub or its licensors. You may not reproduce, redistribute or commercially exploit any materials
            without express written permission.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            EdTech Training Hub shall not be liable for any indirect, incidental or consequential damages arising from
            your participation in our programmes. Our total liability shall not exceed the amount paid by you for the
            specific programme in question.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">6. Changes to These Terms</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            We reserve the right to update these terms at any time. Material changes will be communicated via email or
            posted on our website. Continued participation after changes are posted constitutes acceptance of the revised
            terms.
          </p>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white text-sm font-bold transition-colors"
          >
            Questions? Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;