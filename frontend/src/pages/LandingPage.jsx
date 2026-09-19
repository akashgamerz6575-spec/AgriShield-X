import React from "react";
import { useFarm } from "../context/FarmContext";
import { useNavigate } from "react-router-dom";
import { Shield, Sparkles, ArrowRight, Activity, Zap, CheckCircle2, AlertTriangle, Stethoscope, Radar, Bot, Sprout, Sun, Moon, Languages } from "lucide-react";

export default function LandingPage() {
  const { theme, toggleTheme, lang, setLang, t } = useFarm();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200">
      
      {/* Top Floating Control Bar */}
      <header className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xs">
            <Shield className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-lg tracking-tight font-outfit text-slate-900 dark:text-white">
            AgriShield <span className="text-emerald-600 dark:text-emerald-400">X</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-2xs">
            <Languages className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-xs px-2 py-1 rounded-lg transition-all font-medium cursor-pointer ${
                  lang === l.code
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 text-center">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-400 text-xs font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.landing.heroTag || 'HackDevengers 2.0 • Predictive Agri-Intelligence'}</span>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-outfit max-w-4xl mx-auto leading-tight">
          <span>{t.landing.heroTitle1 || 'Predict Crop Outbreaks'} </span>
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
            {t.landing.heroTitle2 || 'Before Symptoms Spread'}
          </span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-200 font-outfit max-w-2xl mx-auto">
          {t.tagline || 'Predictive AI for Smarter Crop Protection'}
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t.landing.heroSubtitle || 'AgriShield X synthesizes real-time microclimate sensors, regional outbreak radars, and multimodal computer vision to protect farmer yields.'}
        </p>

        {/* Standardized Single-Click Hackathon CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 dark:from-emerald-500 dark:to-teal-600 dark:hover:from-emerald-400 dark:hover:to-teal-500 text-white dark:text-slate-950 font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2.5 group transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Activity className="w-5 h-5" />
            <span>{t.exploreDemo || 'Explore Demo Farm'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/doctor")}
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-xs"
          >
            <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.diagnoseCrop || 'Diagnose Leaf Scan'}</span>
          </button>
        </div>

      </div>

      {/* Differentiator Comparison Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
            {t.landing.featuresTitle || 'The AgriShield X Predictive Architecture'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Traditional Apps */}
            <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/60 dark:bg-rose-950/15 border border-rose-200 dark:border-rose-900/30 text-left flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Traditional Reactive Apps</span>
                <div className="mt-3 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-mono text-xs">
                  <span className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Leaf Photo</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">→</span>
                  <span className="px-2.5 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300">Disease Name Only</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Focuses primarily on diagnostic classification after symptoms are already widespread. Offers limited predictive environmental context or proactive risk modeling.
              </p>
            </div>

            {/* AgriShield X */}
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 text-left flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">AgriShield X Integrated Architecture</span>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono text-slate-700 dark:text-slate-200">
                  <span className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">Leaf Vision AI</span>
                  <span className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">Hyper-local Weather</span>
                  <span className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">Field Telemetry</span>
                  <span className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">Regional Outbreaks</span>
                </div>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold text-xs text-center">
                Predictive Risk Score → Explainable Alerts → Proactive Actions
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div onClick={() => navigate("/dashboard")} className="p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2 shadow-2xs">
            <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm font-outfit">{t.landing.f1Title || 'Explainable Risk Engine'}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.landing.f1Desc || '0–100 Farm Health Score with clear point-driver mathematical transparency.'}</p>
          </div>

          <div onClick={() => navigate("/doctor")} className="p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2 shadow-2xs">
            <Stethoscope className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm font-outfit">{t.landing.f2Title || 'AI Crop Doctor 2.0'}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.landing.f2Desc || 'Foliar vision diagnostic with organic biocontrols and chemical safety advisories.'}</p>
          </div>

          <div onClick={() => navigate("/radar")} className="p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2 shadow-2xs">
            <Radar className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm font-outfit">{t.landing.f3Title || 'Outbreak Radar'}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.landing.f3Desc || 'Regional disease cluster mapping with proximity exposure warnings.'}</p>
          </div>

          <div onClick={() => navigate("/copilot")} className="p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2 shadow-2xs">
            <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm font-outfit">{t.landing.f4Title || 'Context Farm Copilot'}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.landing.f4Desc || 'AI advisor with active context of your fields, weather, and tasks.'}</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        AgriShield X &bull; Built with pride for HackDevengers 2.0 &bull; Predictive Farm Intelligence
      </footer>

    </div>
  );
}
