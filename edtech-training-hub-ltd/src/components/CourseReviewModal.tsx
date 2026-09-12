import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { addReview } from '../utils/reviews';

interface CourseReviewModalProps {
  isOpen: boolean;
  courseId: string;
  courseTitle: string;
  userId: string;
  userName: string;
  onClose: () => void;
}

export const CourseReviewModal: React.FC<CourseReviewModalProps> = ({
  isOpen,
  courseId,
  courseTitle,
  userId,
  userName,
  onClose,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating < 1 || rating > 5) {
      setError('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a short review.');
      return;
    }
    const ok = addReview({ userId, courseId, userName, rating, comment: comment.trim() });
    if (!ok) {
      setError('You have already reviewed this course.');
      return;
    }
    setSubmitted(true);
  };

  const activeRating = hoverRating || rating;
  const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <>
      <div
        className="fixed inset-0 z-[88] bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-[89] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#102A45] via-[#1E4E79] to-[#0F6B78] px-8 pt-8 pb-6 text-white">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-xs font-bold uppercase tracking-wider text-[#ffb59b] mb-2">
              Rate this course
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight pr-8">
              {courseTitle}
            </h2>
          </div>

          {/* Body */}
          <div className="px-8 py-7 space-y-6">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Star className="w-8 h-8" fill="currentColor" />
                </div>
                <p className="mt-5 text-xl font-bold text-slate-900">Review submitted</p>
                <p className="mt-2 text-sm text-slate-500">Thank you for your feedback!</p>
                <button
                  onClick={onClose}
                  className="mt-7 px-6 py-2.5 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* Star rating */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Your rating
                  </label>
                  <div className="flex items-center gap-1 pt-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => {
                          setRating(value);
                          setError('');
                        }}
                        aria-label={`${value} star${value > 1 ? 's' : ''}`}
                        className="p-0.5 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            value <= activeRating
                              ? 'text-[#F15A29] fill-[#F15A29]'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    {activeRating > 0 && (
                      <span className="ml-3 text-sm font-semibold text-slate-600">
                        {labels[activeRating - 1]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Your review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      setError('');
                    }}
                    rows={4}
                    placeholder="Share your experience — what did you find most useful?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4E79]/30 focus:border-[#1E4E79]/40 resize-none transition-shadow"
                  />
                </div>

                {error && (
                  <p className="text-xs font-semibold text-red-600">{error}</p>
                )}

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-xl bg-[#F15A29] hover:bg-[#d94f23] text-white text-xs font-bold transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseReviewModal;