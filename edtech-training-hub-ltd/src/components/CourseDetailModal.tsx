import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CourseItem } from '../types';
import { X, Clock, Users, CheckCircle2, Star, MessageSquare, ShoppingBag } from 'lucide-react';
import { getCourseReviews, averageRating, totalReviews } from '../utils/reviews';

interface CourseDetailModalProps {
  course: CourseItem | null;
  onClose: () => void;
  onOpenPurchase: (courses: CourseItem[]) => void;
}

const starBar = (rating: number) => {
  const filled = Math.round(rating * 2) / 2;
  return createPortal((
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const diff = filled - i;
        const fill =
          diff >= 0 ? 1 : diff === -0.5 ? 0.5 : 0;
        return (
          <span key={i} className="relative w-4 h-4">
            <Star className="absolute inset-0 w-4 h-4 text-slate-300" />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className="w-4 h-4 text-[#F15A29] fill-[#F15A29]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  ), document.body);
};

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onOpenPurchase,
}) => {
  const reviews = useMemo(
    () => (course ? getCourseReviews(course.id) : []),
    [course]
  );
  const avg = useMemo(
    () => (course ? averageRating(course.id) : 0),
    [course]
  );
  const total = useMemo(
    () => (course ? totalReviews(course.id) : 0),
    [course]
  );

  if (!course) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[85] bg-slate-900/50"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-[86] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="min-h-full flex items-center justify-center p-4">
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
              {total > 0 && (
                <span className="px-2.5 py-1 rounded-md bg-[#F15A29]/20 text-[#ffb59b] text-[11px] font-bold inline-flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#ffb59b]" />
                  {avg.toFixed(1)} ({total})
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

            {/* Instructor */}
            {course.instructor && (
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Your Instructor
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E4E79] to-[#0F6B78] flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {course.instructor.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{course.instructor.name}</p>
                    <p className="text-xs font-semibold text-[#0F6B78]">{course.instructor.title}</p>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {course.instructor.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Student Reviews ({total})
                  </h3>
                  {total > 0 && (
                    <div className="flex items-center gap-2">
                      {starBar(avg)}
                      <span className="text-sm font-bold text-slate-700">{avg.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {reviews.slice(0, 10).map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-[10px] font-bold">
                            {rev.userName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold text-slate-800">
                            {rev.userName}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i <= rev.rating
                                  ? 'text-[#F15A29] fill-[#F15A29]'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {rev.comment}
                      </p>
                      <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
                        {new Date(rev.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {reviews.length === 0 && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <MessageSquare className="w-5 h-5 text-slate-400 shrink-0" />
                <p className="text-sm text-slate-500">No reviews yet — be the first to share your experience.</p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  Investment
                </p>
                <p className="text-xl font-black text-[#F15A29]">
                  {course.price || 'Contact for fee'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => onOpenPurchase([course])}
                  className="px-5 py-2.5 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseDetailModal;