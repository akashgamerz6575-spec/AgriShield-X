import React, { useState } from "react";
import { useFarm } from "../context/FarmContext";
import { Activity, AlertTriangle, ArrowUpRight, CloudSun, ShieldCheck, CheckCircle2, ChevronRight, Info, HelpCircle, MapPin } from "lucide-react";
import WhyAlertModal from "../components/WhyAlertModal";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { t, farmRiskState, fields, weather, actions } = useFarm();
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const navigate = useNavigate();

  // Recharts Health Score Trend Data (Consistently reflects current health score)
  const currentHealth = farmRiskState.healthScore;
  const trendData = [
    { day: "Day -6", score: Math.min(100, currentHealth + 14) },
    { day: "Day -5", score: Math.min(100, currentHealth + 11) },
    { day: "Day -4", score: Math.min(100, currentHealth + 9) },
    { day: "Day -3", score: Math.min(100, currentHealth + 5) },
    { day: "Day -2", score: Math.min(100, currentHealth + 2) },
    { day: "Yesterday", score: Math.min(100, currentHealth + 1) },
    { day: "Today", score: currentHealth }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-outfit tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.dashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Farm Region</span>
            <span className="text-xs font-semibold text-slate-200">{weather.location || "Bengaluru Agri-Zone (Karnataka)"}</span>
          </div>
        </div>
      </div>

      {/* Top Grid: Health Score vs Risk + Primary Risk Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Farm Health Score Gauge Card (4 cols) */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.dashboard.healthScore}</span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${farmRiskState.badgeColor}`}>
              {farmRiskState.statusText}
            </span>
          </div>

          {/* Health Radial Counter */}
          <div className="my-2 flex items-center justify-center relative">
            <div className="w-32 h-32 rounded-full bg-slate-950 border-4 border-slate-800 flex flex-col items-center justify-center shadow-inner relative">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">{farmRiskState.healthScore}</span>
              <span className="text-[11px] font-semibold text-slate-400 mt-0.5">/ 100</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1 text-center">
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span>Health Index:</span>
              <strong className="text-emerald-400">{farmRiskState.healthScore} / 100</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span>Calculated Risk:</span>
              <strong className="text-rose-400">{farmRiskState.riskScore} / 100</strong>
            </div>
            <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 mt-1">
              Health score is the positive inverse of calculated risk (100 − Risk Score).
            </p>
          </div>
        </div>

        {/* Primary Explainable Risk Alert (8 cols) */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-slate-900 border border-rose-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Primary Farm Risk Alert</span>
              </div>
              
              {/* Explainable WHY Button */}
              <button
                onClick={() => setIsWhyModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-emerald-500/30 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Why?</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white font-outfit mt-3">
              Early Blight Risk Increased on Field A (Tomato)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Relative humidity at 82%, imminent rain forecast, and a nearby regional outbreak cluster (12km away) have elevated early blight risk for your tomato field.
            </p>

            {/* Quick Reason Bullets */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                +18 High Humidity (82%)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                +16 Outbreak Cluster Proximity
              </span>
              <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                +14 Leaf Lesion Scan
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Recommended Action:</span> Inspect Field A lower canopy within 24h & apply preventive mulch.
            </div>
            <button
              onClick={() => navigate("/actions")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Take Action</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Risk Score Component Breakdown Bars */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {t.dashboard.breakdown}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {[
            { label: "Disease Risk", val: farmRiskState.components.diseaseRisk, color: "bg-rose-500" },
            { label: "Weather Risk", val: farmRiskState.components.weatherRisk, color: "bg-amber-500" },
            { label: "Irrigation Health", val: farmRiskState.components.irrigationHealth, color: "bg-emerald-500" },
            { label: "Crop Condition", val: farmRiskState.components.cropCondition, color: "bg-teal-500" },
            { label: "Outbreak Exposure", val: farmRiskState.components.outbreakExposure, color: "bg-rose-600" }
          ].map(comp => (
            <div key={comp.label} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">{comp.label}</span>
                <span className="text-white">{comp.val}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className={`h-full ${comp.color} transition-all duration-500`} style={{ width: `${comp.val}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fields Overview & Health Trend */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Active Fields Cards (2 cols on xl) */}
        <div className="xl:col-span-2 p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Registered Fields ({fields.length})</h3>
            <button onClick={() => navigate("/fields")} className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
              View All Fields →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm font-outfit">{field.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      field.status === "Healthy" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}>{field.status}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{field.crop} • {field.variety} ({field.areaAcres} Acres)</p>
                  <p className="text-xs text-slate-300 font-medium mt-2">
                    Disease: <span className="font-semibold text-white">{field.currentDiagnosis?.diseaseName || "Healthy"}</span>
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Stage: {field.growthStage}</span>
                  <span className="text-slate-300 font-semibold">Risk: {field.riskScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Farm Health Trend (1 col on xl) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">{t.dashboard.healthTrend}</h3>
            <p className="text-xs text-slate-400">Historical farm health index over past week</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", color: "#f3f4f6", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            {currentHealth < 50
              ? "Elevated Early Blight risk active. Resolving Action Center tasks will restore health score."
              : "Preventive actions maintained; farm operating within normal risk thresholds."}
          </p>
        </div>

      </div>

      {/* Why Alert Modal */}
      <WhyAlertModal
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
        factors={farmRiskState.factors}
        healthScore={farmRiskState.healthScore}
        statusText={farmRiskState.statusText}
      />

    </div>
  );
}