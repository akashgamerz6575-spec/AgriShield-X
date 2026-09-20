import React, { useState, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Activity,
  Stethoscope,
  Radar,
  Bot,
  Sun,
  Moon,
  Languages,
  CheckCircle2,
  ShieldAlert,
  Droplets,
  CloudRain,
  Check,
  ChevronRight,
  Leaf,
  Thermometer,
  Menu,
  X,
  ShieldCheck,
  Cpu,
  Database,
  Sparkles
} from 'lucide-react';
import { AgriShieldMark } from '../components/BrandMark';

export default function LandingPage() {
  const { theme, toggleTheme, lang, setLang } = useFarm();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  // Handle smooth scroll navigation
  const handleNavClick = (e, targetId) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  // Handle logo click to scroll to top
  const handleLogoClick = (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', window.location.pathname);
  };

  // Check URL hash on initial load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, []);

  return (
    <div id="top" className="min-h-screen bg-slate-50 dark:bg-[#0c1117] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 font-sans">
      
      {/* ================================================================= */}
      {/* NAVBAR — Clean horizontal bar aligned to the main container grid */}
      {/* ================================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-[#0c1117]/90 backdrop-blur-md transition-colors duration-200">
        <div className="w-full max-w-[1260px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          
          {/* Left: Logo & Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <a
              href="#top"
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 transition-transform active:scale-95"
              aria-label="AgriShield X - Return to top"
            >
              <AgriShieldMark size={22} className="text-emerald-600 dark:text-emerald-400" />
              <span className="font-outfit font-bold text-base tracking-tight text-slate-900 dark:text-white">
                AgriShield X
              </span>
            </a>
            
            {/* Nav Links — Desktop */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {[
                { id: 'product', label: 'Product' },
                { id: 'solutions', label: 'Solutions' },
                { id: 'resources', label: 'Resources' },
                { id: 'about', label: 'About' }
              ].map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:focus-visible:ring-emerald-500/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Right: Controls & CTAs */}
          <div className="flex items-center gap-2">
            
            {/* Language Selector (Desktop) */}
            <div className="hidden sm:flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white/80 dark:bg-slate-800/60">
              <Languages className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 ml-2 shrink-0" />
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-xs px-2 py-1.5 font-medium cursor-pointer transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 ${
                    lang === l.code
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            
            {/* Language Selector (Mobile) */}
            <div className="sm:hidden flex items-center border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white/80 dark:bg-slate-800/60">
              <Languages className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                aria-label="Select language"
                className="bg-transparent text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            
            {/* Desktop Get Started CTA */}
            <button
              onClick={() => navigate('/dashboard')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-colors cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0c1117]/98 backdrop-blur-md px-4 py-3 space-y-2 shadow-lg animate-fadeIn">
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {[
                { id: 'product', label: 'Product' },
                { id: 'solutions', label: 'Solutions' },
                { id: 'resources', label: 'Resources' },
                { id: 'about', label: 'About' }
              ].map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors block"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <span>Get Started (Open Demo Farm)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================================================================= */}
      {/* HERO SECTION — 45% Left / 55% Right split with substantial image */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-[#0c1117] transition-colors duration-200">
        <div className="w-full max-w-[1260px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            
            {/* LEFT: 45% Content Container */}
            <div className="w-full lg:w-[45%] shrink-0 text-left space-y-6">
              
              {/* Uppercase label */}
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-emerald-700 dark:text-emerald-400">
                Field intelligence for a more resilient tomorrow
              </p>
              
              {/* High Contrast Headline — Slate 900 in Light, White in Dark */}
              <h1 className="text-[32px] sm:text-[42px] lg:text-[48px] font-outfit font-bold leading-[1.12] tracking-tight text-slate-900 dark:text-white">
                Know what's changing in your field —{' '}
                <em className="font-serif italic font-semibold text-emerald-700 dark:text-emerald-400 not-italic" style={{fontStyle: 'italic'}}>
                  before
                </em>{' '}
                it becomes a problem.
              </h1>
              
              {/* Subheadline — Slate 600 in Light, Slate 300 in Dark */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Weather, crop imagery, and field context come together in AgriShield X to help you spot risks earlier and make more confident on-farm decisions.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer group shadow-sm"
                >
                  <span>Open Demo Farm</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/doctor')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Analyze a Leaf</span>
                </button>
              </div>
              
              {/* Credibility pills */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Healthier Crops</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>More Resilient Farms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>A Stronger Tomorrow</span>
                </div>
              </div>
            </div>
            
            {/* RIGHT: 55% Substantial Agricultural Visual */}
            <div className="w-full lg:w-[55%] flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 dark:shadow-black/40 border border-slate-200/80 dark:border-slate-800">
                <img
                  src="/hero-farmer.jpg"
                  alt="Farmer walking through agricultural fields at golden hour"
                  className="w-full h-[340px] sm:h-[420px] lg:h-[480px] xl:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Bottom tagline */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <p className="text-white/95 font-serif italic text-base sm:text-lg font-medium drop-shadow-lg">
                    Healthier fields,<br />Brighter tomorrows
                  </p>
                </div>
              </div>
              
              {/* Floating risk notification card */}
              <div className="absolute -top-2 right-2 sm:top-4 sm:right-4 lg:-right-4 lg:top-6 bg-white dark:bg-[#131b27] rounded-xl shadow-xl shadow-slate-900/10 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 p-4 max-w-[250px] animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/40 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4.5 h-4.5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Early blight risk rising</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 shrink-0">High</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      Tomato — Field 2
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-1">
                      Conditions are becoming favorable in next 5–7 days.
                    </p>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="mt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 cursor-pointer hover:underline"
                    >
                      <span>View details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PRODUCT WORKFLOW SECTION (#product) */}
      {/* ================================================================= */}
      <section id="product" className="scroll-mt-14 border-t border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f1620] py-16 lg:py-24 transition-colors duration-200">
        <div className="w-full max-w-[1260px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-12 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Product Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900 dark:text-white">
              See the field. Understand the risk. Decide what to do next.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              AgriShield X transforms fragmented telemetry into a continuous, three-step protective loop designed for real farm workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            
            {/* 01 — See the field */}
            <div className="space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">01</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-outfit mt-1">See the field</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Bring satellite imagery, weather and field data together in one clear view of your farm's health.
                </p>
              </div>
              
              {/* Mini dashboard preview */}
              <div className="bg-slate-50 dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <AgriShieldMark size={14} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">Farm Overview</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 font-mono">Green Valley Farm</span>
                </div>
                
                <div className="flex gap-2">
                  <div className="w-16 shrink-0 space-y-1">
                    {['Overview', 'Fields', 'Insights', 'Advisories', 'Reports'].map((item, i) => (
                      <div key={item} className={`text-[9px] px-1.5 py-1 rounded font-medium truncate ${i === 0 ? 'bg-emerald-600 text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-3 gap-1">
                      <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mb-1"></div>
                        <span className="text-[8px] font-semibold text-slate-700 dark:text-slate-300">Healthy</span>
                        <div className="text-[7px] text-slate-400">Paddy</div>
                      </div>
                      <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mb-1"></div>
                        <span className="text-[8px] font-semibold text-slate-700 dark:text-slate-300">Moderate</span>
                        <div className="text-[7px] text-slate-400">Cotton</div>
                      </div>
                      <div className="p-1.5 rounded bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40">
                        <div className="w-2 h-2 rounded-full bg-red-500 mb-1"></div>
                        <span className="text-[8px] font-semibold text-slate-700 dark:text-slate-300">High Risk</span>
                        <div className="text-[7px] text-slate-400">Tomato</div>
                      </div>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-[#1a2435] border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 dark:text-slate-400">Vigor Index (NDVI)</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">0.78 avg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 02 — Understand the risk */}
            <div className="space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">02</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-outfit mt-1">Understand the risk</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Spot emerging disease and pest pressure before visible symptoms spread through the crop.
                </p>
              </div>
              
              {/* Risk explanation card */}
              <div className="bg-slate-50 dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Risk Assessment</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                    Emerging Alert
                  </span>
                </div>
                
                <div className="bg-white dark:bg-[#1a2435] border border-slate-200 dark:border-slate-700 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Early Blight Risk Rising</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Tomato — Field 2 · High Risk</p>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Environmental conditions are favorable for early blight development in next 5–7 days.
                  </p>
                  
                  <div className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 pt-1">Key contributing factors</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-400">
                      <Thermometer className="w-3 h-3 text-amber-500" />
                      <span>Warm temperatures (24–28°C)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-400">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span>High humidity (82%)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-400">
                      <CloudRain className="w-3 h-3 text-indigo-500" />
                      <span>Recent rainfall (2.8 mm)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 03 — Decide what to do next */}
            <div className="space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">03</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-outfit mt-1">Decide what to do next</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Get practical, field-specific recommendations from your farm copilot, tailored to your crops and conditions.
                </p>
              </div>
              
              {/* Chat preview */}
              <div className="bg-slate-50 dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">AgriShield Copilot</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">BETA</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500">Karnataka Agro</span>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-emerald-600 text-white rounded-xl rounded-tr-sm px-3 py-2 text-[11px] max-w-[80%]">
                    What should I do about early blight in Field 2?
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#1a2435] border border-slate-200 dark:border-slate-700 rounded-xl rounded-tl-sm p-3 text-[11px] space-y-2">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Based on current field telemetry and humidity:
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">Inspect lower canopy</span>
                        <p className="text-slate-500 dark:text-slate-400">Check lower foliage for circular concentric brown lesions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">Apply preventative fungicide</span>
                        <p className="text-slate-500 dark:text-slate-400">Mancozeb 75% WP @ 2g/L within next 48h before rain.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2435] text-[11px] text-slate-400 dark:text-slate-500">
                    Ask another question...
                  </div>
                  <button
                    onClick={() => navigate('/copilot')}
                    className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-colors"
                    aria-label="Open Copilot"
                  >
                    <ArrowRight className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SOLUTIONS SECTION (#solutions) */}
      {/* ================================================================= */}
      <section id="solutions" className="scroll-mt-14 border-t border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-[#0c1117] py-16 lg:py-24 transition-colors duration-200">
        <div className="w-full max-w-[1260px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-12 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Core Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900 dark:text-white">
              Built for every stage of crop protection
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Four specialized capabilities delivering comprehensive intelligence from satellite-level field health down to leaf-level molecular diagnosis.
            </p>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Farm Health */}
            <div className="bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Telemetry & NDVI
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">
                  Farm Health & Telemetry
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Continuous multi-field vigor monitoring combining multispectral satellite imagery, micro-climate weather stations, and soil moisture tracking.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Real-time parcel health scoring across crops</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Vegetation index (NDVI/EVI) anomaly detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Automated irrigation and drought stress flags</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group cursor-pointer"
                >
                  <span>Explore Farm Health</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2. Crop Doctor */}
            <div className="bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                  Gemini Vision AI
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">
                  Crop Doctor Diagnostics
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Multi-modal leaf photo diagnosis delivering immediate pathogen identification, damage grading, and agronomic treatment prescriptions.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Fungal, bacterial, viral, and pest damage detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Lab-grade active chemical & organic remedies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Pre-harvest interval (PHI) & safety precautions</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/doctor')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group cursor-pointer"
                >
                  <span>Launch Crop Doctor</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* 3. Outbreak Radar */}
            <div className="bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
                  <Radar className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                  Epidemic Modeling
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">
                  Outbreak Radar & Early Warning
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Regional risk trajectory forecasting that calculates pathogen spread vectors up to 7 days ahead based on microclimates and wind vectors.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Micro-climate disease pressure indexes (Early Blight, Rust)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Cluster risk buffers around neighboring outbreaks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Proactive spray window recommendations</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/radar')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group cursor-pointer"
                >
                  <span>Explore Outbreak Radar</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* 4. Farm Copilot */}
            <div className="bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
                  Multilingual AI
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">
                  Farm Copilot Agronomist
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Interactive generative agronomy copilot fluent in Kannada, Hindi, Tamil, and English, grounded in your farm's active parcel telemetry.
                </p>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Regional vernacular voice & text support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Precise dosage, dilution, and fertilizer calculations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Direct integration with task dispatch and farm logs</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/copilot')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group cursor-pointer"
                >
                  <span>Consult Farm Copilot</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* RESOURCES SECTION (#resources) */}
      {/* ================================================================= */}
      <section id="resources" className="scroll-mt-14 border-t border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f1620] py-16 lg:py-24 transition-colors duration-200">
        <div className="w-full max-w-[1260px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-12 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 mb-3">
              <Database className="w-3.5 h-3.5" />
              Technology & Resources
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-900 dark:text-white">
              Engineered for agricultural resilience
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Reliable models, transparent agricultural science, and zero-latency access built for smallholders and enterprise growers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Resource 1 */}
            <div className="bg-slate-50 dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-outfit text-slate-900 dark:text-white">
                Gemini Multi-modal AI Architecture
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Powered by Google Gemini 1.5 multi-modal models trained to analyze botanical structures, pinpoint leaf lesions, and formulate verified chemical regimens.
              </p>
            </div>

            {/* Resource 2 */}
            <div className="bg-slate-50 dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-outfit text-slate-900 dark:text-white">
                Hyperlocal Remote Sensing
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Integrates 10-meter Sentinel-2 earth observation datasets with micro-meteorological observations to forecast humidity and disease vectors.
              </p>
            </div>

            {/* Resource 3 */}
            <div className="bg-slate-50 dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-outfit text-slate-900 dark:text-white">
                Open Agronomy Extension Protocols
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Advisory protocols conform with Indian Council of Agricultural Research (ICAR) benchmarks, ensuring actionable recommendations without bias.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* ABOUT SECTION (#about) */}
      {/* ================================================================= */}
      <section id="about" className="scroll-mt-14 border-t border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-[#0c1117] py-16 lg:py-24 transition-colors duration-200">
        <div className="w-full max-w-[1260px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left: About details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/70 dark:border-slate-700">
                About AgriShield X
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-outfit text-slate-900 dark:text-white leading-tight">
                Shifting agriculture from reactive treatment to proactive early defense.
              </h2>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Traditional crop management suffers from a fundamental delay: farmers only spray after lesions and wilting are widespread. By that time, 15–30% of harvest yield has already been lost.
              </p>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                AgriShield X was developed for <span className="font-semibold text-emerald-600 dark:text-emerald-400">HackDevengers 2.0</span> to solve this gap. By uniting spatial environmental modeling with multi-modal Gemini AI reasoning, AgriShield X empowers growers to anticipate outbreaks days in advance and act with scientific precision.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">Multilingual Inclusivity</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Full support for Kannada, Hindi, Tamil, and English voices.</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">Zero Setup Demo Farm</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Preloaded with real crop fields, active sensors, and live scenarios.</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Call to Action Banner */}
            <div className="lg:col-span-5 bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 rounded-2xl p-7 sm:p-8 space-y-6 shadow-sm">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">Ready to Explore?</span>
                <h3 className="text-xl font-bold font-outfit text-slate-900 dark:text-white mt-1">
                  Test the complete platform live
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Open the Green Valley Demo Farm to inspect parcel vigor, run the crop doctor on sample leaves, or consult the multilingual farm copilot.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-sm group"
                >
                  <span>Get Started — Open Demo Farm</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/doctor')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs rounded-xl transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Analyze a Leaf Photo</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FOOTER */}
      {/* ================================================================= */}
      <footer className="border-t border-slate-200/90 dark:border-slate-800 py-8 bg-white dark:bg-[#0a0e14] transition-colors duration-200">
        <div className="w-full max-w-[1260px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="#top"
            onClick={handleLogoClick}
            className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="AgriShield X - Return to top"
          >
            <AgriShieldMark size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span className="font-outfit font-semibold text-slate-800 dark:text-slate-200">AgriShield X</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>Smarter Insights. Healthier crops. Stronger tomorrows.</span>
          </a>
          <nav className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400" aria-label="Footer Navigation">
            {[
              { id: 'product', label: 'Product' },
              { id: 'solutions', label: 'Solutions' },
              { id: 'resources', label: 'Resources' },
              { id: 'about', label: 'About' }
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => navigate('/dashboard')}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
            >
              Demo Farm
            </button>
          </nav>
        </div>
        <div className="w-full max-w-[1260px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
          <p>© 2024 AgriShield X — Built for HackDevengers 2.0. All rights reserved.</p>
          <p>Autonomous Predictive Agricultural Intelligence</p>
        </div>
      </footer>
    </div>
  );
}
