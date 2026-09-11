import React from 'react';
import { CourseItem } from '../types';
import { X, Clock, Users, CheckCircle2 } from 'lucide-react';

interface CourseDetailModalProps {
  course: CourseItem | null;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
}) => {
  if (!course) return null;

  return (
    <div
      className="fixed inset-0 z-[85] overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#102A45] via-[#1E4E79] to-[#0F6B78] px-8 pt-8 pb-7 text-white">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#F15A29] text-white text-[11px] font-bold">
                {course.category}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-slate-200 text-[11px] font-semibold">
                {course.level}
              </span>
              {course.featured && (
                <span className="px-2.5 py-1 rounded-md bg-white/10 text-[#ffb59b] text-[11px] font-bold">
                  Flagship Programme
                </span>
              )}
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              {course.title}
            </h2>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-300" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-300" />
                {course.format}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-7 space-y-6">
            <div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.description}
              </p>
              {course.secondaryDescription && (
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {course.secondaryDescription}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                What you&apos;ll learn
              </h3>
              <ul className="space-y-2">
                {course.whatYouLearn.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {course.whoIsItFor && course.whoIsItFor.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Who it&apos;s for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.whoIsItFor.map((who, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700"
                    >
                      {who}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-5">
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  Investment
                </p>
                <p className="text-xl font-black text-[#F15A29]">
                  {course.price || 'Contact for fee'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;