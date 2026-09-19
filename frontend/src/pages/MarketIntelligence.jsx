import React from 'react';
import { useFarm } from '../context/FarmContext';
import { TrendingUp, TrendingDown, Store, ArrowUpRight, ShieldCheck, DollarSign, BarChart3 } from 'lucide-react';

export default function MarketIntelligence() {
  const { t, marketPrices } = useFarm();

  return (
    <div className="space-y-6 pb-12 animate-fadeIn transition-colors duration-200">
      
      {/* Title Header Banner */}
      <div className="bg-white dark:bg-[#111c35] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {t.market.title || t.nav.market}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.market.subtitle || 'Regional APMC mandi price indices & crop economic protection valuation'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium self-start sm:self-center shadow-2xs">
          {t.market.mandiLocation || 'Demo Market Dataset • APMC Benchmark Proxy'}
        </div>
      </div>

      {/* Demo Dataset Provenance Notice */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3 shadow-2xs">
        <Store className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-slate-900 dark:text-slate-200 block mb-0.5">
            {t.market.provenanceTitle || 'Demo Market Dataset Transparency Notice:'}
          </span>
          {t.market.provenanceDesc || 'Commodity price indices shown are representative regional benchmarks based on historical Agmarknet ranges for demonstration and economic crop protection valuation. They do not represent real-time spot trades.'}
        </div>
      </div>

      {/* APMC Mandi Price Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketPrices.map((item, idx) => {
          const isUp = item.trend === 'UP';
          const isDown = item.trend === 'DOWN';

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm font-outfit">{item.crop}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                    isUp
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                      : isDown
                      ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isUp ? <TrendingUp className="w-3 h-3" /> : isDown ? <TrendingDown className="w-3 h-3" /> : null}
                  <span>{item.change}</span>
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">{t.market.priceCol || 'Benchmark Mandi Price (Demo)'}</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white font-outfit mt-1">
                  ₹{item.pricePerQuintal.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1">/ Quintal</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Store className="w-3 h-3 text-slate-400" />
                  <span>{item.mandi}</span>
                </span>
                <span className="font-medium text-emerald-700 dark:text-emerald-400">{item.momentum}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Economic Value of Timely Protection Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Crop Yield Loss Prevention Economics (2.5 Acre Tomato Model)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs space-y-1">
            <span className="text-slate-500 dark:text-slate-400 block font-medium">Estimated Field Production</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white font-outfit">350 Quintals</span>
            <span className="text-[11px] text-slate-500 block">Gross Value: ~₹9,97,500</span>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-xs space-y-1">
            <span className="text-rose-800 dark:text-rose-300 block font-medium">Unmitigated Early Blight Loss</span>
            <span className="text-lg font-bold text-rose-900 dark:text-rose-200 font-outfit">-30% to -45% Yield</span>
            <span className="text-[11px] text-rose-700 dark:text-rose-300/80 block">Potential loss: ₹2,99,000</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs space-y-1">
            <span className="text-emerald-800 dark:text-emerald-300 block font-medium">AgriShield X Mitigation Cost</span>
            <span className="text-lg font-bold text-emerald-900 dark:text-emerald-200 font-outfit">&lt; ₹8,500 Bio-Inputs</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-300/80 block">ROI: ~35x Saved Crop Value</span>
          </div>
        </div>
      </div>

    </div>
  );
}
