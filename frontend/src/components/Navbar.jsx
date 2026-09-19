import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Shield, Languages, RotateCcw, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { lang, setLang, t, farmRiskState, resetDemoFarm } = useFarm();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all">
      <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-outfit">AgriShield</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-500/30">X</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden md:block">Predictive AI Crop Protection</p>
          </div>
        </Link>

        {/* Global Health Status Badge & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Farm Risk Badge */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${farmRiskState.badgeColor}`}>
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Health: {farmRiskState.healthScore}/100</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
            <span>Risk: {farmRiskState.riskScore}%</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
            <span>{farmRiskState.statusText}</span>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={resetDemoFarm}
            title={t.resetDemo}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">{t.resetDemo}</span>
          </button>

          {/* Desktop Language Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800/90 border border-slate-700/80 rounded-lg p-1">
            <Languages className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium ${
                  lang === l.code
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Compact Mobile Language Dropdown */}
          <div className="sm:hidden flex items-center bg-slate-800 border border-slate-700 rounded-lg px-2 py-1">
            <Languages className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>
    </header>
  );
}