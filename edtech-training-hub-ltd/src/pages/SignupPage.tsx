import React, { useState } from 'react';
import { PageId } from '../types';
import { AuthLayout } from '../components/AuthLayout';
import { signup, passwordScore } from '../utils/auth';
import { Eye, EyeOff, Mail, Lock, UserRound, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SignupPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
}

const STRENGTH_LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const score = passwordScore(form.password);

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    setTimeout(() => {
      const res = signup(form);
      if (res.ok === false) {
        setLoading(false);
        setAlert({ type: 'error', message: res.error });
        return;
      }
      setAlert({
        type: 'success',
        message: `Account created! Welcome aboard, ${res.user?.fname}. Opening your dashboard\u2026`,
      });
      setTimeout(() => {
        window.location.href = '../dashboard.html';
      }, 900);
    }, 550);
  };

  const inputClass =
    'w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition';

  return (
    <AuthLayout
      visualEyebrow="Practical. Purposeful. Learner-focused."
      visualHeadline="Start turning knowledge into meaningful opportunity."
    >
      <div>
        <span className="inline-block mb-3 text-[#F15A29] font-extrabold text-xs uppercase tracking-[0.12em]">
          Join the learning community
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
          Create Your Account
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Sign up to enrol in courses and access the student portal.
        </p>

        {alert && (
          <div
            className={`mt-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-xs font-semibold border ${
              alert.type === 'error'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
            role="alert"
          >
            {alert.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{alert.message}</span>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="signup-fname"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                First Name
              </label>
              <div className="relative">
                <UserRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="signup-fname"
                  type="text"
                  required
                  value={form.fname}
                  onChange={update('fname')}
                  placeholder="Chinwe"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="signup-lname"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Last Name
              </label>
              <div className="relative">
                <UserRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="signup-lname"
                  type="text"
                  required
                  value={form.lname}
                  onChange={update('lname')}
                  placeholder="Okafor"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="signup-email"
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-phone" className="block text-xs font-bold text-slate-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="signup-phone"
                type="tel"
                required
                value={form.phone}
                onChange={update('phone')}
                placeholder="0801 234 5678"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={update('password')}
                placeholder="Min. 8 characters"
                className="w-full pl-9 pr-11 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`w-6 h-1.5 rounded-full transition-colors ${
                      score >= i
                        ? score <= 1
                          ? 'bg-red-400'
                          : score === 2
                            ? 'bg-amber-400'
                            : 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {form.password ? STRENGTH_LABELS[score] : ''}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="signup-confirm" className="block text-xs font-bold text-slate-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="signup-confirm"
                type={showConfirm ? 'text' : 'password'}
                required
                value={form.confirm}
                onChange={update('confirm')}
                placeholder="Re-enter password"
                className="w-full pl-9 pr-11 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition"
              />
              <button
                type="button"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] ${
              loading ? 'opacity-70 pointer-events-none' : ''
            }`}
          >
            {loading ? 'Creating account\u2026' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600 text-center">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
          >
            Log in here
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};