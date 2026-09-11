import React, { useState } from 'react';
import { PageId } from '../types';
import { AuthLayout } from '../components/AuthLayout';
import { login } from '../utils/auth';
import { getPendingCheckout } from '../utils/account';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      if (res.ok === false) {
        setLoading(false);
        setAlert({ type: 'error', message: res.error });
        return;
      }
      setAlert({
        type: 'success',
        message: `Welcome back, ${res.user?.fname}! Taking you back to your dashboard\u2026`,
      });
      setTimeout(() => {
        const pending = getPendingCheckout();
        if (pending) {
          onNavigate(pending.returnPage, pending.returnTarget);
          return;
        }
        onNavigate('dashboard');
      }, 650);
    }, 450);
  };

  return (
    <AuthLayout
      visualEyebrow="Learn. Teach. Create. Thrive."
      visualHeadline="Build practical skills for the digital age."
    >
      <div>
        <span className="inline-block mb-3 text-[#F15A29] font-extrabold text-xs uppercase tracking-[0.12em]">
          Student portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
          Welcome Back
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Log in to the student portal to access your courses.
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
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-bold text-slate-700 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="login-password"
                className="block text-xs font-bold text-slate-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] ${
              loading ? 'opacity-70 pointer-events-none' : ''
            }`}
          >
            {loading ? 'Logging in\u2026' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600 text-center">
          Don&rsquo;t have an account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
          >
            Sign up here
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};