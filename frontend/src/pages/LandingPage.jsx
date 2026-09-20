import React from 'react';
import { useFarm } from '../context/FarmContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Activity,
  AlertTriangle,
  Stethoscope,
  Radar,
  Bot,
  Sun,
  Moon,
  Languages,
  CheckCircle2,
  ShieldAlert,
  Droplets,
  Wind,
  CloudRain,
  Check,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { AgriShieldLogo } from '../components/BrandMark';

export default function LandingPage() {
  const { theme, toggleTheme, lang, setLang } = useFarm();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1d] text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300 font-sans transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0a0f1d]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <AgriShieldLogo iconSize={26} showSubtitle={false} />
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
              Precision Crop Protection
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Farm Access */}
            <button
              onClick={() => navigate('/dashboard')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-lg transition-colors cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Live Farm Health</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5">
              <Languages className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5 shrink-0" />
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-xs px-2 py-1 rounded-md transition-all font-medium cursor-pointer ${
                    lang === l.code
                      ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* HERO SECTION — ASYMMETRIC DESKTOP LAYOUT */}
        {/* ========================================================================= */}
        <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* LEFT COLUMN: Editorial Headline & Actions */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                {/* Grounded Provenance Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                  <span>Agricultural Risk Intelligence • Bengaluru Rural Zone</span>
                </div>

                {/* Solid Restrained Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-[44px] xl:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-outfit leading-[1.15]">
                  See crop risk{' '}
                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">
                    before it becomes crop loss.
                  </span>
                </h1>

                {/* Grounded Subheadline */}
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
                  AgriShield X combines leaf analysis, weather conditions, field history and regional disease signals to help farmers decide what to inspect, treat and monitor next.
                </p>

                {/* Clear Primary & Secondary CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer group"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Open Demo Farm</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigate('/doctor')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-xl transition-colors cursor-pointer shadow-2xs"
                  >
                    <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Analyze a Crop Photo</span>
                  </button>
                </div>

                {/* Credibility & Field Verification Points */}
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Open-Meteo Live Data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Tomato, Potato & Chilli</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Multimodal Vision</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Polished Real Product Preview (Derived from Farm Health Dashboard) */}
              <div className="lg:col-span-6">
                <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/40 overflow-hidden text-left">
                  
                  {/* Top Bar of Dashboard Preview */}
                  <div className="px-5 py-3.5 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Farm Health Monitor</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">• Bengaluru Agri-Zone</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 font-medium">
                      Active Advisory
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-5">
                    
                    {/* Health Score & Risk Alert */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
                      
                      {/* Health Score Box */}
                      <div className="sm:col-span-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Health Score</span>
                          <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">MODERATE RISK</span>
                        </div>
                        <div className="my-2 flex items-baseline gap-2">
                          <span className="text-4xl font-bold font-outfit text-amber-700 dark:text-amber-400">58</span>
                          <span className="text-xs text-slate-400 font-mono">/ 100</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '58%' }}></div>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                          Inverted metric (42 risk penalty points)
                        </span>
                      </div>

                      {/* Active Risk Alert */}
                      <div className="sm:col-span-7 p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider">High Threat Detected</span>
                        </div>
                        <div className="my-1">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Early Blight (Alternaria solani)</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                            Tomato Block B (Vegetative Day 48) — Favorable spore germination window detected.
                          </p>
                        </div>
                        <div className="text-[11px] text-rose-800 dark:text-rose-300 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Action window: Next 24 hours</span>
                        </div>
                      </div>

                    </div>

                    {/* 3 Real Risk Drivers */}
                    <div>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                        <span>Primary Risk Drivers</span>
                        <span className="text-[11px] text-slate-400">Calculated from weather + field data</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                            <Droplets className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-[11px]">Leaf Wetness</span>
                          </div>
                          <div className="font-semibold text-slate-900 dark:text-slate-200">14.2 Hours</div>
                          <span className="text-[10px] text-rose-600 dark:text-rose-400">Exceeds 10h threshold</span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                            <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="text-[11px]">Relative Humidity</span>
                          </div>
                          <div className="font-semibold text-slate-900 dark:text-slate-200">88% RH</div>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400">24.5°C canopy temp</span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                            <Radar className="w-3.5 h-3.5 text-cyan-500" />
                            <span className="text-[11px]">Regional Radar</span>
                          </div>
                          <div className="font-semibold text-slate-900 dark:text-slate-200">2 Clusters</div>
                          <span className="text-[10px] text-rose-600 dark:text-rose-400">Within 8.5 km radius</span>
                        </div>

                      </div>
                    </div>

                    {/* Small Field Status Grid */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Field Blocks Overview</span>
                        <span className="text-[11px] text-slate-400 font-mono">4 monitored parcels</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-2 rounded-md bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-left">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">Block A • Tomato</div>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs">86 Health</span>
                        </div>
                        <div className="p-2 rounded-md bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800/60 text-left">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">Block B • Tomato</div>
                          <span className="text-rose-700 dark:text-rose-400 font-bold text-xs">58 Alert</span>
                        </div>
                        <div className="p-2 rounded-md bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-left">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">Block C • Potato</div>
                          <span className="text-amber-700 dark:text-amber-400 font-bold text-xs">74 Monitor</span>
                        </div>
                        <div className="p-2 rounded-md bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-left">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">Block D • Chilli</div>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs">92 Health</span>
                        </div>
                      </div>
                    </div>

                    {/* Immediate Recommended Action Strip */}
                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                          Priority Task: Apply preventive Copper Oxychloride (2.5 g/L) on Block B.
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 shrink-0">
                        Ready in Action Center →
                      </span>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECOND SECTION — PRODUCT WORKFLOW (DIAGNOSE → PREDICT → EXPLAIN → ACT) */}
        {/* ========================================================================= */}
        <section className="py-16 lg:py-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0d1424]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-12 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                Operational Workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-outfit tracking-tight">
                From symptom to spray decision in four explainable steps
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Agricultural intelligence is only valuable when every recommendation is grounded in real field physics, traceable weather data, and transparent risk mathematics.
              </p>
            </div>

            {/* Workflow Steps with Tangible Product UI Fragments */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Step 1: Diagnose */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">01 / DIAGNOSE</span>
                    <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">Leaf Vision Analysis</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Gemini 2.5 Flash inspects uploaded foliar photos for fungal, bacterial, and pest patterns.
                  </p>
                </div>

                {/* Micro UI Fragment */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Alternaria solani</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">94.2% match</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    Concentric target-board lesions identified on lower tomato foliage.
                  </div>
                  <div className="flex gap-1 pt-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">Stage 2 Early</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-mono">Active Spores</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Predict */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">02 / PREDICT</span>
                    <CloudRain className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">Microclimate Modeling</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Correlates Open-Meteo hourly dew point, leaf wetness duration, and canopy temp.
                  </p>
                </div>

                {/* Micro UI Fragment */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">72h Spore Vulnerability</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">High Window</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span>Rain in 26h:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">18 mm forecast</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              {/* Step 3: Explain */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400">03 / EXPLAIN</span>
                    <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">Deterministic Math</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    No black-box hallucination. Every risk score point is traceable to audited inputs.
                  </p>
                </div>

                {/* Micro UI Fragment */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Baseline Score:</span>
                    <span>100 pts</span>
                  </div>
                  <div className="flex justify-between text-rose-600 dark:text-rose-400">
                    <span>Weather Factor:</span>
                    <span>-24 pts</span>
                  </div>
                  <div className="flex justify-between text-amber-600 dark:text-amber-400">
                    <span>Regional Spores:</span>
                    <span>-18 pts</span>
                  </div>
                  <div className="pt-1 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Farm Health Score:</span>
                    <span className="text-amber-600 dark:text-amber-400">58 / 100</span>
                  </div>
                </div>
              </div>

              {/* Step 4: Act */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">04 / ACT</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">Action Protocol</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Provides immediate dosage rates, organic alternatives, and pre-harvest withholding rules.
                  </p>
                </div>

                {/* Micro UI Fragment */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Recommended Protocol</span>
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                    Copper Oxychloride @ 2.5g/L
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400">
                    <span>Withholding: 7 days</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Spray before rain</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PRODUCT STORY — 3 VISUALLY VARIED SECTIONS (NOT 4 IDENTICAL CARDS) */}
        {/* ========================================================================= */}
        <section className="py-16 lg:py-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ----------------------------------------------------------------------- */}
          {/* 1. CROP DOCTOR — FOLIAR VISION DIAGNOSTIC */}
          {/* ----------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            
            {/* Story Text Left */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Crop Doctor 2.0</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-outfit tracking-tight">
                Multimodal foliar diagnostics with dual remediation protocols
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Standard agricultural apps stop at disease classification. AgriShield X's Crop Doctor identifies the specific pathogen, evaluates the progression stage, and delivers calibrated treatment plans.
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Pathogen & Stage:</strong> Distinguishes early vs late blight lesions and evaluates defoliation risk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Organic Biocontrol:</strong> Calibrated dosages for Trichoderma viride and neem oil extract.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Chemical Safety:</strong> Pre-harvest withholding intervals (PHI) and pollinator precautions.</span>
                </li>
              </ul>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/doctor')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 group cursor-pointer"
                >
                  <span>Test with sample leaf photo</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Real Product Leaf Preview Right */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-900/5 space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">Inspection Result #EB-4409</span>
                    <span className="text-slate-400">• Tomato Foliage</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800/40">
                    Confidence: 94.2%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Photo with Bounding Overlay */}
                  <div className="sm:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-4/3 flex items-center justify-center group">
                    <img
                      src="/samples/tomato-early-blight.jpg"
                      alt="Tomato Early Blight Inspection Sample"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-2 pointer-events-none">
                      <span className="self-start px-1.5 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono rounded">
                        CAMERA SCAN
                      </span>
                      <div className="border-2 border-rose-500 rounded p-1 text-[9px] font-mono font-bold bg-rose-950/60 text-white self-center">
                        Target Lesion [94%]
                      </div>
                      <span className="self-end text-[9px] text-white/80 font-mono">Solanum lycopersicum</span>
                    </div>
                  </div>

                  {/* Diagnosis Details */}
                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-mono">
                        Pathogen Detected
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Early Blight (Alternaria solani)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Characteristic dark concentric rings with chlorotic yellow halo. Fungal mycelium actively sporulating.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Organic Biocontrol</span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Trichoderma @ 5g/L</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">Zero toxicity / 0d PHI</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Chemical Intervention</span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Chlorothalonil 75% WP</span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">7-Day Pre-Harvest Interval</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 2. OUTBREAK RADAR — REGIONAL GEOSPATIAL SURVEILLANCE */}
          {/* ----------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            
            {/* Real Product Radar Preview Left */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-900/5 space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <Radar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="font-bold text-slate-900 dark:text-white">Surveillance Map • Bengaluru North District</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                    15 km Vector Sweep
                  </span>
                </div>

                {/* Radar Cluster List Preview */}
                <div className="space-y-2.5">
                  
                  <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800/60 flex items-center justify-center shrink-0 font-mono font-bold text-rose-700 dark:text-rose-400 text-xs">
                        3.4k
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Late Blight Outbreak Cluster</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Chikkaballapur Road • 12 farms reporting active sporulation</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 shrink-0">
                      High Risk
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60 flex items-center justify-center shrink-0 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">
                        8.1k
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Tomato Early Blight Vector</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Doddaballapur Sector • Upwind spore trajectory towards your farm</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 shrink-0">
                      Monitoring
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 font-mono font-bold text-slate-600 dark:text-slate-400 text-xs">
                        14.6k
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Powdery Mildew on Solanaceae</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Nelamangala Highway • Contained within greenhouse facilities</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                      Low Threat
                    </span>
                  </div>

                </div>

                {/* Explicit Simulated Dataset Truthfulness Disclaimer */}
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 text-[9px] font-bold uppercase tracking-wider shrink-0 mt-0.5">
                    Demo Dataset
                  </span>
                  <span>
                    Regional outbreak surveillance is populated with simulated Karnataka agricultural zone cluster data for hackathon demonstration. Configured to integrate with Krishi Vigyan Kendra (KVK) disease reporting feeds.
                  </span>
                </div>

              </div>
            </div>

            {/* Story Text Right */}
            <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                <Radar className="w-3.5 h-3.5" />
                <span>Outbreak Radar</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-outfit tracking-tight">
                Geospatial spore proximity and regional disease warnings
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Plant pathogens do not respect farm fences. Spores migrate on wind currents from neighboring farms. AgriShield X calculates infection vulnerability based on cluster distance, wind velocity, and spore viability.
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Radius Exposure:</strong> Tracks known outbreaks within 5 km, 15 km, and 30 km zones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Wind-Vector Integration:</strong> Weighs downwind pathogen drift against Open-Meteo wind directions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Community Reporting:</strong> Designed to connect farmer diagnoses into anonymized protection clusters.</span>
                </li>
              </ul>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/radar')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 group cursor-pointer"
                >
                  <span>Explore regional outbreak radar</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3. FARM COPILOT — CONTEXT-GROUNDED CHAT */}
          {/* ----------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            
            {/* Story Text Left */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                <Bot className="w-3.5 h-3.5" />
                <span>Farm Copilot</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-outfit tracking-tight">
                Agronomic advice grounded in your live field telemetry
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Generic chatbots offer vague gardening advice that fails under real farm conditions. AgriShield Copilot feeds real-time weather forecasts, current crop health scores, and regional spray guidelines directly into every answer.
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Weather-Aware Spraying:</strong> Prevents costly chemical run-off by tracking rainfall arrival hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Field-Specific History:</strong> Knows tomato Block B is at vegetative day 48 with prior blight exposure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Multilingual Intelligence:</strong> Supports Kannada, Hindi, Tamil, and English agronomic queries.</span>
                </li>
              </ul>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/copilot')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 group cursor-pointer"
                >
                  <span>Chat with Farm Copilot</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Real Product Chat UI Preview Right */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-900/5 space-y-4">
                
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900 dark:text-white">AgriShield Copilot</span>
                    <span className="text-slate-400">• Gemini 2.5 Flash</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <span>Context: Tomato Block B + Open-Meteo</span>
                  </div>
                </div>

                {/* Chat Conversation */}
                <div className="space-y-3 text-xs">
                  
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-[85%] font-medium">
                      Should I spray fungicide on Tomato Block B today given tomorrow's forecast?
                    </div>
                  </div>

                  {/* Copilot Response */}
                  <div className="flex justify-start">
                    <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-xs p-4 max-w-[95%] space-y-2.5">
                      
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs">
                        <Bot className="w-3.5 h-3.5" />
                        <span>Recommendation: Postpone contact spraying until Friday morning</span>
                      </div>

                      <p className="leading-relaxed text-xs text-slate-700 dark:text-slate-300">
                        Open-Meteo predicts <strong>18 mm rainfall tomorrow afternoon around 2:00 PM</strong>. Applying contact fungicides (like Copper Oxychloride or Chlorothalonil) today will result in wash-off before adequate foliar adhesion occurs.
                      </p>

                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/50 space-y-1 text-[11px]">
                        <div className="font-semibold text-slate-900 dark:text-white">Immediate Action Protocol:</div>
                        <div className="text-slate-600 dark:text-slate-300">
                          1. Inspect Block B furrow drains today to prevent standing water during tomorrow's rain.
                        </div>
                        <div className="text-slate-600 dark:text-slate-300">
                          2. Spray preventive Copper Oxychloride (2.5 g/L) Friday morning once leaf surfaces dry.
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        <span>Telemetry verified: 88% humidity</span>
                        <span>•</span>
                        <span>Open-Meteo 72h precipitation window</span>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* RESTRAINED ENTERPRISE CREDIBILITY & PROVENANCE SECTION */}
        {/* ========================================================================= */}
        <section className="py-14 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="space-y-1.5">
                <div className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">
                  Diagnostic Vision
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Google Gemini 2.5 Flash multimodal vision calibrated on solanaceous and vegetable leaf pathologies.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">
                  Weather Intelligence
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Open-Meteo Global Atmospheric model delivering hourly precipitation, dew point, and leaf wetness windows.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">
                  Deterministic Math
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Point-driver algorithmic scoring engine with zero hallucination and mathematical transparency.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider">
                  Regional Surveillance
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Simulated spatial epidemiology clusters modeled after district agricultural monitoring infrastructure.
                </p>
              </div>

            </div>

            {/* Bottom Call to Action Strip */}
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                  Explore the full AgriShield X operational environment
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Zero signup required. Fully pre-loaded with demonstration field telemetry and diagnostic samples.
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <span>Launch Farm Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Professional Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8 bg-white dark:bg-[#0a0f1d] text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AgriShieldLogo iconSize={20} showSubtitle={false} />
            <span className="text-slate-400 dark:text-slate-500">|</span>
            <span>Precision Agricultural Risk Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>HackDevengers 2.0 Evaluation Build</span>
            <span>•</span>
            <span>Bengaluru Agri-Zone (Karnataka)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
