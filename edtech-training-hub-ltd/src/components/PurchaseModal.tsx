import React, { useEffect, useMemo, useState } from 'react';
import { PageId, CourseItem } from '../types';
import { currentUser } from '../utils/auth';
import { catalogIdForCourse, formatPrice, parsePrice, removeFromCart } from '../utils/cart';
import { enrollCourses } from '../utils/purchases';
import {
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  UserRound,
  ArrowRight,
} from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  courses: CourseItem[];
  onClose: () => void;
  onNavigate: (page: PageId, targetId?: string) => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  courses,
  onClose,
  onNavigate,
}) => {
  const user = currentUser();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const total = useMemo(
    () => courses.reduce((sum, c) => sum + parsePrice(c.price), 0),
    [courses]
  );

  useEffect(() => {
    if (isOpen) {
      setCardName(
        user ? `${user.fname || ''} ${user.lname || ''}`.trim() : ''
      );
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setError(null);
      setProcessing(false);
      setPaid(false);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(digits.replace(/(\d{4})(?=\d)/g, '$1 '));
  };

  const handleExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) {
      setExpiry(digits);
    } else {
      setExpiry(digits.slice(0, 2) + '/' + digits.slice(2));
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const num = cardNumber.replace(/\D/g, '');
    if (!cardName.trim()) {
      setError('Please enter the cardholder name.');
      return;
    }
    if (num.length !== 16) {
      setError('Please enter a valid 16-digit card number.');
      return;
    }
    const expMatch = /^(\d{2})\/(\d{2})$/.exec(expiry);
    if (!expMatch) {
      setError('Please enter your expiry as MM/YY.');
      return;
    }
    const mm = parseInt(expMatch[1], 10);
    const yy = parseInt(expMatch[2], 10);
    if (mm < 1 || mm > 12) {
      setError('Expiry month is invalid.');
      return;
    }
    const now = new Date();
    const expDate = new Date(2000 + yy, mm, 1);
    const curDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    if (expDate.getTime() < curDate.getTime()) {
      setError('This card has expired.');
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('Please enter a valid CVV.');
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      if (!user) {
        setProcessing(false);
        setError('Your session expired. Please log in again.');
        return;
      }
      enrollCourses(
        user.id,
        courses.map((c) => ({ id: catalogIdForCourse(c), title: c.title }))
      );
      courses.forEach((c) => removeFromCart(catalogIdForCourse(c)));
      setProcessing(false);
      setPaid(true);
    }, 1200);
  };

  const goDashboard = () => {
    window.location.href = '../dashboard.html';
  };

  const fieldClass =
    'w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition';

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={processing ? undefined : onClose}
      />
      <div className="relative min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {paid ? (
            <div className="p-8 sm:p-10 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 grid place-items-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                Payment Successful!
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {courses.length === 1
                  ? `${courses[0].title} has been added to your dashboard.`
                  : `${courses.length} courses have been added to your dashboard.`}
              </p>
              <div className="mt-6 space-y-3">
                <button
                  onClick={goDashboard}
                  className="w-full py-3 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('courses');
                  }}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : !user ? (
            // Account required — lock the purchase until the user is logged in
            <div className="p-8 sm:p-10 text-center">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-20 h-20 mx-auto rounded-full bg-[#F15A29]/10 text-[#F15A29] grid place-items-center">
                <Lock className="w-9 h-9" />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                Account Required
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
                You need an account before you can purchase a course. Log in or
                create one to continue.
              </p>
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('login');
                  }}
                  className="w-full py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <UserRound className="w-4 h-4" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('signup');
                  }}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
                >
                  Create an Account
                </button>
                <button
                  onClick={onClose}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="px-8 pt-8 pb-6 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F6B78]/10 text-[#0F6B78] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1">
                    <Lock className="w-3 h-3" /> Secure Checkout
                  </span>
                  <h2 className="mt-2.5 text-2xl font-extrabold text-[#1E4E79] tracking-tight">
                    Complete Purchase
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Paying as {user.fname} {user.lname} &bull; {user.email}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order summary */}
              <div className="px-8 pb-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 divide-y divide-slate-200">
                  {courses.map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{c.title}</p>
                        <p className="text-[11px] text-slate-500">{c.duration}</p>
                      </div>
                      <span className="text-xs font-bold text-[#1E4E79]">
                        {c.price || 'Contact for fee'}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Total
                    </span>
                    <span className="text-lg font-black text-[#F15A29]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment form */}
              <form className="px-8 pb-8 space-y-4" onSubmit={handlePay} noValidate>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on card"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => handleCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-600">
                      DEMO
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={expiry}
                      onChange={(e) => handleExpiry(e.target.value)}
                      placeholder="08/28"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      CVV
                    </label>
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="•••"
                      className={fieldClass}
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs font-semibold text-red-700" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    processing ? 'opacity-70 pointer-events-none' : ''
                  }`}
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {'Processing\u2026'}
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Pay {formatPrice(total)}
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <Lock className="w-3 h-3" />
                  Demo checkout — no real payment is processed. Your course will be added straight to your dashboard.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};