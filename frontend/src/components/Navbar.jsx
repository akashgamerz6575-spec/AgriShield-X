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
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-outfit">AgriShield</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">X</span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Predictive AI Crop Protection</p>
          </div>
        </Link>

        {/* Global Health Status Badge & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Farm Risk Badge */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${farmRiskState.badgeColor}`}>
            <Activity className="w-4 h-4 animate-pulse" />
            <span>Health Score: {farmRiskState.healthScore}/100</span>
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            <span>{farmRiskState.statusText}</span>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={resetDemoFarm}
            title={t.resetDemo}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.resetDemo}</span>
          </button>

          {/* Multilingual Selector */}
          <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-lg p-1">
            <Languages className="w-3.5 h-3.5 text-slate-400 ml-1 hidden sm:block" />
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-xs px-2 py-1 rounded-md transition-all font-medium ${
                  lang === l.code
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

        </div>

      </div>
    </header>
  );
}