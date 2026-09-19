import React from 'react';
import { useFarm } from '../context/FarmContext';
import { X, Info, ShieldAlert } from 'lucide-react';

export default function WhyAlertModal({ isOpen, onClose, factors = [], healthScore = 5, statusText = 'Critical Risk' }) {
  const { t } = useFarm();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-colors duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white font-outfit">
                {t.common?.whyAlertTitle || 'Why is this Farm Risk Alert Active?'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.common?.whyAlertDesc || 'Transparent breakdown of multi-factor environmental & diagnostic drivers.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Factors List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {factors.map((factor, idx) => {
            const localizedFactor = t.dashboard.factors?.[factor.id];
            const displayLabel = localizedFactor?.label || factor.label;
            const displayDetail = localizedFactor?.detail || factor.detail;

            return (
              <div
                key={factor.id || idx}
                className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                  factor.type === 'negative'
                    ? 'bg-rose-50/80 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-950 dark:text-rose-200'
                    : 'bg-emerald-50/80 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-950 dark:text-emerald-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Info className={`w-4 h-4 mt-0.5 shrink-0 ${factor.type === 'negative' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  <div>
                    <h4 className="text-sm font-semibold">{displayLabel}</h4>
                    <p className="text-xs opacity-80 mt-0.5">{displayDetail}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md shrink-0 ${
                  factor.type === 'negative' ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300' : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                }`}>
                  {factor.impact}
                </span>
              </div>
            );
          })}

          {factors.length === 0 && (
            <div className="text-center py-6 text-slate-500 text-sm">
              No elevated risk factors present. All fields operating within optimal thresholds.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            <span>{t.common?.healthScoreText || 'Health Index'}: </span>
            <strong className="text-emerald-600 dark:text-emerald-400">{healthScore}/100</strong>
            <span className="mx-2">•</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{statusText}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {t.common?.close || 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
