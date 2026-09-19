import React from 'react';
import { Leaf, Sparkles } from 'lucide-react';

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
      crop: 'Tomato',
      condition: 'Healthy Leaf Condition',
      severity: 'Low',
      imageSvg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230f2818"/><path d="M50 15 C20 40 25 80 50 90 C75 80 80 40 50 15 Z" fill="%234caf50"/><path d="M50 15 L50 90" stroke="%2381c784" stroke-width="2"/></svg>'
    }
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-semibold text-slate-300">Quick Test Samples for Judges:</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sampleLeaves.map((sample) => (
          <button
            key={sample.id}
            onClick={() => onSelectSample(sample)}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 hover:border-emerald-500/50 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 mb-2">
              <img src={sample.imageSvg} alt={sample.crop} className="w-8 h-8 rounded-lg object-cover" />
              <div>
                <p className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{sample.crop}</p>
                <p className="text-[10px] text-slate-400 line-clamp-1">{sample.condition}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] mt-1 pt-2 border-t border-slate-700/50">
              <span className="text-slate-400">Severity:</span>
              <span className={`font-semibold ${
                sample.severity === 'High' ? 'text-rose-400' : sample.severity === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
              }`}>{sample.severity}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
