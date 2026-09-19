import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function SampleLeafSelector({ onSelectSample }) {
  const sampleLeaves = [
    {
      id: 'sample-tomato-blight',
      crop: 'Tomato',
      condition: 'Early Blight (Alternaria)',
      severity: 'High',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a2e22"/><path d="M50 15 C20 40 25 80 50 90 C75 80 80 40 50 15 Z" fill="%232e7d32"/><circle cx="45" cy="45" r="10" fill="%235d4037"/><circle cx="45" cy="45" r="6" fill="%233e2723"/><circle cx="60" cy="65" r="8" fill="%235d4037"/><path d="M45 45 Q40 40 35 45" stroke="%23fbc02d" stroke-width="2" fill="none"/></svg>'
    },
    {
      id: 'sample-paddy-blast',
      crop: 'Paddy Rice',
      condition: 'Leaf Blast (Magnaporthe)',
      severity: 'Moderate',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a2e22"/><path d="M40 10 Q50 50 45 90 Q55 50 45 10 Z" fill="%2343a047"/><ellipse cx="45" cy="50" rx="4" ry="12" fill="%238d6e63"/><ellipse cx="45" cy="50" rx="2" ry="8" fill="%234e342e"/></svg>'
    },
    {
      id: 'sample-cotton-curl',
      crop: 'Cotton',
      condition: 'Whitefly Leaf Curl Virus',
      severity: 'Moderate',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a2e22"/><path d="M50 15 L70 45 L60 80 L40 80 L30 45 Z" fill="%23388e3c"/><path d="M30 45 Q50 30 70 45" stroke="%23fbc02d" stroke-width="3" fill="none"/></svg>'
    },
    {
      id: 'sample-healthy',
      crop: 'Control Plant',
      condition: 'Healthy Leaf (No Pathogen)',
      severity: 'Low',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230f2818"/><path d="M50 15 C20 40 25 80 50 90 C75 80 80 40 50 15 Z" fill="%234caf50"/><path d="M50 15 L50 90" stroke="%2381c784" stroke-width="2"/></svg>'
    }
  ];

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Quick Test Samples for Judges
          </span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">Click to instant-diagnose</span>
      </div>

      {/* 2x2 Responsive Grid with generous padding & readable typography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sampleLeaves.map((sample) => {
          const isHigh = sample.severity === 'High';
          const isMod = sample.severity === 'Moderate';

          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-2">
                <img
                  src={sample.imageSvg}
                  alt={sample.crop}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-700/60 shrink-0 mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {sample.crop}
                    </p>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium leading-tight mt-0.5 break-words">
                    {sample.condition}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Severity:</span>
                <span
                  className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                    isHigh
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : isMod
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {sample.severity} Severity
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}