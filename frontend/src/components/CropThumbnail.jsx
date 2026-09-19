import React from 'react';

export default function CropThumbnail({ crop = 'Tomato', className = 'w-16 h-16' }) {
  const normalized = crop.toLowerCase();

  if (normalized.includes('tomato')) {
    return (
      <div className={`${className} rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-emerald-950/20 to-rose-950/30 dark:from-emerald-950/40 dark:to-rose-950/60 border border-emerald-500/20 flex items-center justify-center relative shadow-xs`}>
        <svg viewBox="0 0 80 80" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="tomGrad1" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="60%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </radialGradient>
            <radialGradient id="tomGrad2" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="70%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
          </defs>
          {/* Background foliage */}
          <path d="M20 18 Q35 10 40 25 Q30 30 20 18 Z" fill="#15803d" opacity="0.8" />
          <path d="M45 15 Q60 12 55 28 Q45 25 45 15 Z" fill="#16a34a" opacity="0.8" />
          <path d="M22 28 Q40 20 42 40" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
          {/* Back Tomato */}
          <circle cx="50" cy="46" r="19" fill="url(#tomGrad2)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
          <path d="M50 28 L48 24 M50 28 L54 25 M50 28 L51 22" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Front Tomato */}
          <circle cx="32" cy="52" r="21" fill="url(#tomGrad1)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))" />
          {/* Green Calyx Star */}
          <path d="M32 32 L34 26 M32 32 L26 28 M32 32 L38 30 M32 32 L30 36 M32 32 L35 36" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          {/* Highlight gloss */}
          <ellipse cx="26" cy="44" rx="4" ry="7" transform="rotate(-30 26 44)" fill="#ffffff" opacity="0.4" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('paddy') || normalized.includes('rice')) {
    return (
      <div className={`${className} rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-amber-950/20 to-emerald-950/30 dark:from-amber-950/40 dark:to-emerald-950/60 border border-emerald-500/20 flex items-center justify-center relative shadow-xs`}>
        <svg viewBox="0 0 80 80" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="paddyGrad" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="50%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          {/* Stems & Leaves */}
          <path d="M22 75 Q26 40 46 15" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 75 Q42 45 32 20" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <path d="M52 75 Q50 48 64 22" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Golden rice grains on arching head */}
          <ellipse cx="46" cy="16" rx="3.5" ry="6" transform="rotate(30 46 16)" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
          <ellipse cx="49" cy="22" rx="3.5" ry="6" transform="rotate(45 49 22)" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
          <ellipse cx="53" cy="29" rx="3.5" ry="6" transform="rotate(55 53 29)" fill="#eab308" stroke="#ca8a04" strokeWidth="0.8" />
          <ellipse cx="58" cy="37" rx="3.5" ry="6" transform="rotate(65 58 37)" fill="#ca8a04" stroke="#a16207" strokeWidth="0.8" />
          <ellipse cx="41" cy="23" rx="3" ry="5.5" transform="rotate(20 41 23)" fill="#eab308" />
          <ellipse cx="33" cy="22" rx="3" ry="5.5" transform="rotate(-15 33 22)" fill="#facc15" />
          <ellipse cx="29" cy="28" rx="3" ry="5.5" transform="rotate(-30 29 28)" fill="#84cc16" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('cotton')) {
    return (
      <div className={`${className} rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-slate-200/50 to-emerald-950/20 dark:from-slate-800/60 dark:to-emerald-950/40 border border-slate-300 dark:border-slate-700/60 flex items-center justify-center relative shadow-xs`}>
        <svg viewBox="0 0 80 80" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem and sepals */}
          <path d="M40 70 Q40 45 40 38" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M40 45 Q26 40 22 36" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M40 46 Q54 42 58 38" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Dark brown bracts/calyx cups */}
          <path d="M28 50 C24 38 28 30 38 32 C38 30 46 30 52 38 C56 46 48 54 40 52 Z" fill="#451a03" />
          {/* Fluffy cotton segments */}
          <circle cx="34" cy="34" r="10" fill="#f8fafc" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))" />
          <circle cx="46" cy="34" r="10" fill="#ffffff" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))" />
          <circle cx="40" cy="25" r="9" fill="#f1f5f9" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))" />
          <circle cx="40" cy="37" r="9" fill="#ffffff" />
          {/* Leaf points */}
          <path d="M20 38 L24 44 L28 40 Z" fill="#581c87" opacity="0.3" />
          <path d="M58 38 L54 44 L50 40 Z" fill="#15803d" opacity="0.7" />
        </svg>
      </div>
    );
  }

  // Default / Chilli
  return (
    <div className={`${className} rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-rose-950/20 to-red-950/40 dark:from-rose-950/40 dark:to-red-950/70 border border-rose-500/20 flex items-center justify-center relative shadow-xs`}>
      <svg viewBox="0 0 80 80" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chilliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="60%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
        {/* Branch */}
        <path d="M25 15 Q40 22 55 18" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
        {/* Left Chilli */}
        <path d="M34 22 Q30 45 42 66 Q45 68 43 62 Q38 46 38 24 Z" fill="url(#chilliGrad)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.35))" />
        <path d="M34 22 L32 18 M34 22 L36 17 M34 22 L38 20" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right Chilli */}
        <path d="M48 20 Q56 42 50 64 Q47 66 49 58 Q52 42 46 22 Z" fill="#b91c1c" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
        <path d="M48 20 L49 16 M48 20 L46 16" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
