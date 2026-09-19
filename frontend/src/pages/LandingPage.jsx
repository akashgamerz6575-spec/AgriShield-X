import React from "react";
import { useFarm } from "../context/FarmContext";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Sparkles, ArrowRight, Activity, Zap, CheckCircle2, AlertTriangle, Eye, Stethoscope, Radar, Bot, Sprout } from "lucide-react";

export default function LandingPage() {
  const { t } = useFarm();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-16 text-center">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>HackDevengers 2.0 Hackathon Entry</span>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-outfit max-w-4xl mx-auto leading-tight">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">AgriShield X</span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl font-bold text-slate-200 font-outfit max-w-2xl mx-auto">
          Predictive AI for Smarter Crop Protection
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Most apps react only after visible crop damage appears. AgriShield X connects crop leaf diagnosis, weather forecasts, field history, and regional outbreak signals to predict farm risk <span className="text-emerald-400 font-semibold">before</span> losses happen.
        </p>

        {/* Single-Click Hackathon CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-base rounded-2xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-3 group transition-all transform hover:-translate-y-0.5"
          >
            <Activity className="w-5 h-5" />
            <span>Explore Demo Farm (1 Click)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/doctor")}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-base rounded-2xl flex items-center justify-center gap-3 transition-colors"
          >
            <Stethoscope className="w-5 h-5 text-emerald-400" />
            <span>Analyze a Crop Leaf</span>
          </button>
        </div>

      </div>

      {/* Differentiator Graphic Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-8">
            The AgriShield X Differentiator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Traditional Apps */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-left">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Traditional Reactive Apps</span>
              <div className="mt-4 flex items-center gap-3 text-slate-300 font-mono text-sm">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Leaf Photo</span>
                <span>?</span>
                <span className="px-3 py-1.5 rounded-lg bg-rose-950 border border-rose-900 text-rose-300">Disease Name Only</span>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Identifies disease only after leaves are already destroyed. No risk forecasting or preventive guidance.
              </p>
            </div>

            {/* AgriShield X */}
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-left relative overflow-hidden">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AgriShield X Predictive Architecture</span>
              <div className="mt-4 text-xs font-mono text-slate-200 grid grid-cols-2 gap-2">
                <span className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Leaf Vision AI</span>
                <span className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Live Weather</span>
                <span className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Farm History</span>
                <span className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Regional Signals</span>
              </div>
              <div className="mt-3 text-center text-emerald-400 font-bold text-xs">?</div>
              <div className="mt-1 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs text-center">
                Predictive Risk Score ? Explainable Alert ? Action Plan
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Feature Highlights Cards */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div onClick={() => navigate("/dashboard")} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all">
            <Activity className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white text-base">Farm Health Dashboard</h3>
            <p className="text-xs text-slate-400 mt-1">78/100 Farm Health Score with mathematical "Why?" factor explainability.</p>
          </div>

          <div onClick={() => navigate("/doctor")} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all">
            <Stethoscope className="w-8 h-8 text-teal-400 mb-3" />
            <h3 className="font-bold text-white text-base">AI Crop Doctor 2.0</h3>
            <p className="text-xs text-slate-400 mt-1">Gemini Vision AI scan for disease severity, symptoms, and organic/chemical protocols.</p>
          </div>

          <div onClick={() => navigate("/radar")} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all">
            <Radar className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="font-bold text-white text-base">Disease Outbreak Radar</h3>
            <p className="text-xs text-slate-400 mt-1">Geographic disease map showing regional clusters and farm exposure warnings.</p>
          </div>

          <div onClick={() => navigate("/copilot")} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all">
            <Bot className="w-8 h-8 text-indigo-400 mb-3" />
            <h3 className="font-bold text-white text-base">Context-Aware Copilot</h3>
            <p className="text-xs text-slate-400 mt-1">Agricultural AI advisor powered by live farm risk context and weather forecast.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>Built for HackDevengers 2.0 Open Innovation Hackathon (September 19–20, 2026)</p>
      </footer>

    </div>
  );
}
