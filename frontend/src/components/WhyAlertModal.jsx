import React from 'react';
import { X, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export default function WhyAlertModal({ isOpen, onClose, factors = [], healthScore = 78, statusText = 'Moderate Risk' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-outfit">Explainable Risk Score Drivers</h3>
              <p className="text-xs text-slate-400">Mathematical breakdown for Farm Health Score ({healthScore}/100)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Factors List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          <p className="text-xs text-slate-400 mb-2">
            AgriShield X calculates risk dynamically using multi-factor environmental & crop health weighting:
          </p>

          {factors.map((factor, idx) => (
            <div
              key={factor.id || idx}
              className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                factor.type === 'negative'
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-200'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <Info className={`w-4 h-4 mt-0.5 shrink-0 ${factor.type === 'negative' ? 'text-rose-400' : 'text-emerald-400'}`} />
                <div>
                  <h4 className="text-sm font-semibold">{factor.label}</h4>
                  <p className="text-xs opacity-80 mt-0.5">{factor.detail}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md shrink-0 ${
                factor.type === 'negative' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {factor.impact}
              </span>
            </div>
          ))}

          {factors.length === 0 && (
            <div className="text-center py-6 text-slate-500 text-sm">
              No elevated risk factors present. All fields operating within optimal thresholds.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
}
