import React from "react";
import { useFarm } from "../context/FarmContext";
import { useNavigate } from "react-router-dom";
import { Shield, Sparkles, ArrowRight, Activity, Zap, CheckCircle2, AlertTriangle, Stethoscope, Radar, Bot, Sprout, ArrowDown } from "lucide-react";

export default function LandingPage() {
  const { t } = useFarm();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      
      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 text-center">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
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
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Many crop-disease tools focus primarily on diagnosis after visible symptoms appear. AgriShield X connects foliar leaf vision, agro-weather forecasts, field history, and regional outbreak signals to predict farm risk <span className="text-emerald-400 font-semibold">before</span> widespread losses occur.
        </p>

        {/* Single-Click Hackathon CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2.5 group transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Activity className="w-5 h-5" />
            <span>Explore Demo Farm (1 Click)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/doctor")}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <Stethoscope className="w-5 h-5 text-emerald-400" />
            <span>Analyze a Crop Leaf</span>
          </button>
        </div>

      </div>

      {/* Differentiator Comparison Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
            The AgriShield X Predictive Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Traditional Apps */}
            <div className="p-5 sm:p-6 rounded-2xl bg-rose-950/15 border border-rose-900/30 text-left flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Traditional Reactive Apps</span>
                <div className="mt-3 flex items-center gap-2 text-slate-300 font-mono text-xs">
                  <span className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Leaf Photo</span>
                  <span className="text-rose-400 font-bold">→</span>
                  <span className="px-2.5 py-1.5 rounded-lg bg-rose-950/80 border border-rose-900 text-rose-300">Disease Name Only</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Focuses primarily on diagnostic classification after symptoms are already widespread. Offers limited predictive environmental context or proactive risk modeling.
              </p>
            </div>

            {/* AgriShield X */}
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-left flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AgriShield X Integrated Architecture</span>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono text-slate-200">
                  <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-center">Leaf Vision AI</span>
                  <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-center">Hyper-local Weather</span>
                  <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-center">Field Telemetry</span>
                  <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-center">Regional Outbreaks</span>
                </div>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs text-center">
                Predictive Risk Score → Explainable Alerts → Proactive Actions
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div onClick={() => navigate("/dashboard")} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-white text-sm font-outfit">Explainable Risk Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">0–100 Farm Health Score with clear point-driver mathematical transparency.</p>
          </div>

          <div onClick={() => navigate("/doctor")} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2">
            <Stethoscope className="w-6 h-6 text-teal-400" />
            <h3 className="font-bold text-white text-sm font-outfit">AI Crop Doctor 2.0</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Foliar vision diagnostic with organic biocontrols and chemical safety advisories.</p>
          </div>

          <div onClick={() => navigate("/radar")} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2">
            <Radar className="w-6 h-6 text-cyan-400" />
            <h3 className="font-bold text-white text-sm font-outfit">Outbreak Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Regional disease cluster mapping with proximity exposure warnings.</p>
          </div>

          <div onClick={() => navigate("/copilot")} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2">
            <Bot className="w-6 h-6 text-indigo-400" />
            <h3 className="font-bold text-white text-sm font-outfit">Context Farm Copilot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">AI advisor with active context of your fields, weather, and tasks.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500">
        AgriShield X &bull; Built with pride for HackDevengers 2.0 &bull; Predictive Farm Intelligence
      </footer>

    </div>
  );
}