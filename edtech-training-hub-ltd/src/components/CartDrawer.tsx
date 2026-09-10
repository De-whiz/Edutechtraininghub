import React, { useEffect, useState } from 'react';
import { CourseItem, PageId } from '../types';
import {
  CART_EVENT,
  cartCourses,
  cartTotal,
  courseFromCatalogId,
  formatPrice,
  getCart,
  inCart,
  removeFromCart,
} from '../utils/cart';
import {
  X,
  ShoppingCart,
  Clock,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenPurchase: (courses: CourseItem[]) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenPurchase,
}) => {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const sync = () => setIds(getCart());
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener('storage', sync);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener('storage', sync);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const courses = ids
    .filter((id) => inCart(id))
    .map((id) => courseFromCatalogId(id))
    .filter((c): c is CourseItem => c !== null);

  const total = cartTotal();

  const goToCourses = () => {
    onClose();
    onNavigate('courses');
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[#1E4E79]" />
              {courses.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#F15A29] text-white text-[10px] leading-4 text-center">
                  {courses.length}
                </span>
              )}
            </div>
            <h2 className="text-lg font-extrabold text-[#1E4E79] tracking-tight">
              Your Cart
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {courses.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 grid place-items-center">
              <ShoppingBag className="w-9 h-9" />
            </div>
            <h3 className="mt-5 text-lg font-extrabold text-slate-800">
              Your cart is empty
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Add courses or training programmes you want to buy and they will
              appear here.
            </p>
            <button
              onClick={goToCourses}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {courses.map((course) => {
                const catalogId = ids.find((id) => {
                  const c = courseFromCatalogId(id);
                  return c && c.id === course.id;
                });
                return (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-bold text-[#0F6B78] bg-[#0F6B78]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {course.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {course.duration}
                          </span>
                          <span className="font-bold text-[#1E4E79]">
                            {course.price || 'Contact for fee'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => catalogId && removeFromCart(catalogId)}
                        aria-label={`Remove ${course.title} from cart`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => onOpenPurchase([course])}
                      className="w-full py-2 rounded-lg bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shadow-sm transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-slate-200 bg-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600">Subtotal</span>
                <span className="text-xl font-black text-[#F15A29]">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                onClick={() => onOpenPurchase(courses)}
                className="w-full py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Checkout for {formatPrice(total)}
              </button>
              <button
                onClick={goToCourses}
                className="w-full text-center text-xs font-bold text-[#0F6B78] hover:text-[#1E4E79] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};