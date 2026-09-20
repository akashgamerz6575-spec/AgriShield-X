import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Languages, RotateCcw, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AgriShieldMark } from './BrandMark';

export default function Navbar() {
  const { theme, toggleTheme, lang, setLang, t, resetDemoFarm } = useFarm();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0f1620]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 2xl:px-10 transition-colors duration-200">
      <div className="w-full h-12 flex items-center justify-between gap-3">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="AgriShield X Home">
          <AgriShieldMark size={20} className="text-emerald-600 dark:text-emerald-400" />
          <span className="font-outfit font-bold text-sm tracking-tight text-slate-900 dark:text-white">
            AgriShield X
          </span>
        </Link>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Reset Demo */}
          <button
            onClick={resetDemoFarm}
            title={t.resetDemo}
            className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium shadow-2xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">{t.resetDemo}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300/80 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            )}
          </button>

          {/* Desktop Language Selector */}
          <div className="hidden sm:flex items-center border border-slate-300/80 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/60 p-0.5">
            <Languages className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 ml-1.5 mr-1 shrink-0" />
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all ${
                  lang === l.code
                    ? 'bg-emerald-600 dark:bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Mobile Language Dropdown */}
          <div className="sm:hidden flex items-center border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white/60 dark:bg-slate-800/40">
            <Languages className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mr-1 shrink-0" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-[11px] text-slate-800 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
              aria-label="Select Language"
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
