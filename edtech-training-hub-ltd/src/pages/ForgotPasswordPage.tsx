import React, { useRef, useState } from 'react';
import { PageId } from '../types';
import { AuthLayout } from '../components/AuthLayout';
import { requestReset, verifyResetCode, resetPassword, maskEmail } from '../utils/auth';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
}

type Step = 1 | 2 | 3 | 4;

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [emailMasked, setEmailMasked] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(
    null
  );
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const goStep = (n: Step) => {
    setAlert(null);
    setStep(n);
  };

  const handleOtpChange = (idx: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    if (digit && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    const next = [...otp];
    text.split('').forEach((ch, j) => {
      if (j < 6) next[j] = ch;
    });
    setOtp(next);
    otpRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);
    setTimeout(() => {
      const res = requestReset(email);
      if (res.ok === false) {
        setLoading(false);
        setAlert({ type: 'error', message: res.error });
        return;
      }
      setLoading(false);
      setEmail(res.email || email);
      setEmailMasked(maskEmail(res.email || email));
      setDemoCode(res.code || '');
      setOtp(['', '', '', '', '', '']);
      goStep(2);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }, 500);
  };

  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    const code = otp.join('');
    if (code.length !== 6) {
      setAlert({ type: 'error', message: 'Please enter all 6 digits of the code.' });
      return;
    }
    const res = verifyResetCode(email, code);
    if (res.ok === false) {
      setAlert({ type: 'error', message: res.error });
      return;
    }
    goStep(3);
  };

  const handleResend = () => {
    setAlert(null);
    const res = requestReset(email);
    if (res.ok === false) {
      setAlert({ type: 'error', message: res.error });
      return;
    }
    setDemoCode(res.code || '');
    setOtp(['', '', '', '', '', '']);
    setAlert({ type: 'success', message: 'A fresh code has been generated below.' });
    otpRefs.current[0]?.focus();
  };

  const submitNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    const res = resetPassword(email, newPassword, confirmPassword);
    if (res.ok === false) {
      setAlert({ type: 'error', message: res.error });
      return;
    }
    goStep(4);
    setTimeout(() => {
      onNavigate('login');
    }, 2200);
  };

  const stepDots = (
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3].map((n) => (
        <React.Fragment key={n}>
          <div
            className={`w-8 h-8 rounded-full grid place-items-center text-xs font-black transition-colors ${
              step === n
                ? 'bg-[#F15A29] text-white'
                : step > n
                  ? 'bg-[#0F6B78] text-white'
                  : 'bg-slate-200 text-slate-500'
            }`}
          >
            {step > n ? <CheckCircle2 className="w-4 h-4" /> : n}
          </div>
          {n < 3 && (
            <div
              className={`h-0.5 w-8 sm:w-10 rounded-full ${
                step > n ? 'bg-[#0F6B78]' : 'bg-slate-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const passInputClass =
    'w-full pl-9 pr-11 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition';

  return (
    <AuthLayout
      visualEyebrow="We've got you covered"
      visualHeadline="Secure your account and get back to learning."
    >
      <div>
        {stepDots}

        {step === 1 && (
          <div>
            <span className="inline-block mb-3 text-[#F15A29] font-extrabold text-xs uppercase tracking-[0.12em]">
              Account recovery
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E4E79] tracking-tight">
              Forgot Your Password?
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              No worries. Enter the email linked to your account and we&rsquo;ll send you a
              reset code.
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
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{alert.message}</span>
              </div>
            )}

            <form onSubmit={submitEmail} className="mt-6 space-y-5" noValidate>
              <div>
                <label htmlFor="fp-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="fp-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] ${
                  loading ? 'opacity-70 pointer-events-none' : ''
                }`}
              >
                {loading ? 'Sending code\u2026' : 'Send Reset Code'}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <span className="inline-block mb-3 text-[#F15A29] font-extrabold text-xs uppercase tracking-[0.12em]">
              Check your email
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E4E79] tracking-tight">
              Enter the Code
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              We sent a 6-digit code to <strong className="text-slate-800">{emailMasked}</strong>.
              Enter it below to continue.
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-xs text-amber-700">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                Demo mode &mdash; your code is:{' '}
                <strong className="tracking-[0.2em]">{demoCode.split('').join(' ')}</strong>
              </span>
            </div>

            {alert && (
              <div
                className={`mt-4 flex items-start gap-2.5 rounded-xl px-4 py-3 text-xs font-semibold border ${
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

            <form onSubmit={submitOtp} className="mt-6 space-y-5" noValidate>
              <div className="flex gap-2 justify-between" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    aria-label={`Digit ${idx + 1}`}
                    className="w-11 sm:w-12 h-12 text-center text-lg font-bold text-slate-800 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6B78] focus:border-[#0F6B78] transition"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99]"
              >
                Verify Code
              </button>
              <p className="text-xs text-slate-500 text-center -mt-2">
                Didn&rsquo;t get it?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-1 font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Resend code
                </button>
              </p>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <span className="inline-block mb-3 text-[#F15A29] font-extrabold text-xs uppercase tracking-[0.12em]">
              Almost done
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E4E79] tracking-tight">
              Set a New Password
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Choose a strong password you haven&rsquo;t used before.
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
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{alert.message}</span>
              </div>
            )}

            <form onSubmit={submitNewPassword} className="mt-6 space-y-5" noValidate>
              <div>
                <label htmlFor="fp-new" className="block text-xs font-bold text-slate-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="fp-new"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className={passInputClass}
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
              <div>
                <label htmlFor="fp-confirm" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="fp-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className={passInputClass}
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
                className="w-full py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99]"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#0F6B78]/10 text-[#0F6B78] grid place-items-center mb-5 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E4E79] tracking-tight">
              Password Reset!
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Your password has been changed successfully.
              <br />
              Redirecting you to log in&hellip;
            </p>
          </div>
        )}

        <p className="mt-6 text-sm text-slate-500">
          <button
            onClick={() => onNavigate('login')}
            className="inline-flex items-center gap-1.5 font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to login
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};