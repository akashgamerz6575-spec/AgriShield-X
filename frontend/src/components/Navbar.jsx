import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Languages, RotateCcw, Activity, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AgriShieldLogo, AgriShieldMobileLogo } from './BrandMark';

export default function Navbar() {
  const { theme, toggleTheme, lang, setLang, t, farmRiskState, resetDemoFarm } = useFarm();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  const localizedStatus = farmRiskState.riskTier === 'Critical'
    ? t.dashboard.criticalRisk
    : farmRiskState.riskTier === 'High'
    ? t.dashboard.highRisk
    : farmRiskState.riskTier === 'Moderate'
    ? t.dashboard.moderateRisk
    : t.dashboard.lowRisk;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-colors duration-200">
      <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center group shrink-0" aria-label="AgriShield X Home">
          <div className="hidden sm:block">
            <AgriShieldLogo iconSize={32} />
          </div>
          <div className="sm:hidden">
            <AgriShieldMobileLogo />
          </div>
        </Link>

        {/* Global Health Status Badge & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Farm Risk Badge */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${farmRiskState.badgeColor}`}>
            <Activity className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span>{t.healthStatusLabel || 'Health'}: {farmRiskState.healthScore}/100</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
            <span>{t.riskStatusLabel || 'Risk'}: {farmRiskState.riskScore}%</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
            <span>{localizedStatus}</span>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={resetDemoFarm}
            title={t.resetDemo}
            className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.resetDemo}</span>
          </button>

          {/* Theme Toggle (Sun / Moon) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Desktop Language Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-lg p-1">
            <Languages className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ml-1 shrink-0" />
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                  lang === l.code
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Compact Mobile Language Dropdown */}
          <div className="sm:hidden flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1">
            <Languages className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 mr-1 shrink-0" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-xs text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
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
