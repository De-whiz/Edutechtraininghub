import React from 'react';
import { motion } from 'motion/react';

interface PageLoaderProps {
  label?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ label }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[95] bg-slate-50 flex flex-col items-center justify-center gap-5"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="eth-book-loader" data-eth-book-loader>
        <div className="book-spine" />
        <div className="book-flap book-flap--left" />
        <div className="book-flap book-flap--right" />
        <div className="book-mark" />
      </div>
      <p className="text-sm font-bold text-[#1E4E79] tracking-wide">
        {label ?? 'Preparing your learning experience\u2026'}
      </p>
      <div className="w-40 h-1 rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#1E4E79] via-[#0F6B78] to-[#F15A29]"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};

export default PageLoader;