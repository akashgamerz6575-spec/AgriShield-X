import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function SampleLeafSelector({ onSelectSample }) {
  const { t } = useFarm();

  const sampleLeaves = [
    {
      id: 'sample-tomato-blight',
      imageSrc: '/samples/tomato-early-blight.jpg',
      crop: 'Tomato',
      cropKey: 'tomato',
      condition: 'Early Blight (Alternaria solani)',
      label: t.cropDoctor.samples?.tomato || 'Tomato Leaf (Early Blight)',
      severity: 'High',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a2e22"/><path d="M50 15 C20 40 25 80 50 90 C75 80 80 40 50 15 Z" fill="%232e7d32"/><circle cx="45" cy="45" r="10" fill="%235d4037"/><circle cx="45" cy="45" r="6" fill="%233e2723"/><circle cx="60" cy="65" r="8" fill="%235d4037"/><path d="M45 45 Q40 40 35 45" stroke="%23fbc02d" stroke-width="2" fill="none"/></svg>'
    },
    {
      id: 'sample-paddy-blast',
      crop: 'Paddy Rice',
      cropKey: 'paddy',
      condition: 'Leaf Blast (Magnaporthe oryzae)',
      label: t.cropDoctor.samples?.paddy || 'Paddy Leaf (Leaf Blast)',
      severity: 'Moderate',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a2e22"/><path d="M40 10 Q50 50 45 90 Q55 50 45 10 Z" fill="%2343a047"/><ellipse cx="45" cy="50" rx="4" ry="12" fill="%238d6e63"/><ellipse cx="45" cy="50" rx="2" ry="8" fill="%234e342e"/></svg>'
    },
    {
      id: 'sample-cotton-curl',
      crop: 'Cotton',
      cropKey: 'cotton',
      condition: 'Whitefly Leaf Curl Virus',
      label: t.cropDoctor.samples?.cotton || 'Cotton Leaf (Leaf Curl)',
      severity: 'Moderate',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a2e22"/><path d="M50 15 L70 45 L60 80 L40 80 L30 45 Z" fill="%23388e3c"/><path d="M30 45 Q50 30 70 45" stroke="%23fbc02d" stroke-width="3" fill="none"/></svg>'
    },
    {
      id: 'sample-healthy',
      crop: 'Control Plant',
      cropKey: 'healthy',
      condition: 'Healthy Leaf (No Pathogen)',
      label: t.cropDoctor.samples?.healthy || 'Healthy Leaf (Control)',
      severity: 'Low',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230f2818"/><path d="M50 15 C20 40 25 80 50 90 C75 80 80 40 50 15 Z" fill="%234caf50"/><path d="M50 15 L50 90" stroke="%2381c784" stroke-width="2"/></svg>'
    }
  ];

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {t.cropDoctor.samplePhotosPrompt || 'Or select a test leaf sample for evaluation:'}
          </span>
        </div>
      </div>

      {/* 2x2 Responsive Grid with zero clipping and high contrast in both themes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sampleLeaves.map((sample) => {
          const isHigh = sample.severity === 'High';
          const isMod = sample.severity === 'Moderate';

          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/80 dark:hover:bg-slate-800/90 border border-slate-200 hover:border-emerald-500/50 dark:border-slate-800 dark:hover:border-emerald-500/50 text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-xs cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-2">
                <img
                  src={sample.imageSrc || sample.imageSvg}
                  alt={sample.crop}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700/60 shrink-0 mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                      {sample.label}
                    </p>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-tight mt-0.5 break-words">
                    {sample.condition}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {t.cropDoctor.severity || 'Severity'}:
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                    isHigh
                      ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                      : isMod
                      ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                  }`}
                >
                  {sample.severity}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
