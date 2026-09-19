import React, { useState } from "react";
import { useFarm } from "../context/FarmContext";
import { Activity, AlertTriangle, ArrowUpRight, CloudSun, ShieldCheck, CheckCircle2, ChevronRight, Info, HelpCircle } from "lucide-react";
import WhyAlertModal from "../components/WhyAlertModal";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { t, farmRiskState, fields, weather, actions, toggleActionComplete } = useFarm();
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const navigate = useNavigate();

  const activeHighActions = actions.filter(a => !a.completed && a.priority === "HIGH");

  // Recharts Health Score Trend Data
  const trendData = [
    { day: "Day -6", score: 88 },
    { day: "Day -5", score: 85 },
    { day: "Day -4", score: 82 },
    { day: "Day -3", score: 76 },
    { day: "Day -2", score: 74 },
    { day: "Yesterday", score: 75 },
    { day: "Today", score: farmRiskState.healthScore }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-6 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.dashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Live Location</span>
            <span className="text-xs font-bold text-emerald-400">{weather.location || "Bengaluru Agri-Zone"}</span>
          </div>
        </div>
      </div>

      {/* Top Grid: Health Score + Primary Risk Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Farm Health Score Gauge Card */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.dashboard.healthScore}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${farmRiskState.badgeColor}`}>
              {farmRiskState.statusText}
            </span>
          </div>

          {/* Health Radial Counter */}
          <div className="my-6 flex items-center justify-center relative">
            <div className="w-36 h-36 rounded-full bg-slate-950 border-4 border-slate-800 flex flex-col items-center justify-center shadow-inner relative">
              <span className="text-4xl font-extrabold text-white font-outfit">{farmRiskState.healthScore}</span>
              <span className="text-[11px] font-semibold text-slate-400 mt-0.5">/ 100</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-400">
              Risk Level: <span className="font-bold text-slate-200">{farmRiskState.riskScore}%</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Derived from live weather, active diagnoses & outbreak proximity</p>
          </div>
        </div>

        {/* Primary Explainable Risk Alert */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-rose-500/30 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>Primary Farm Risk Alert</span>
              </div>
              
              {/* Explainable WHY Button */}
              <button
                onClick={() => setIsWhyModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-emerald-500/30 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Why?</span>
              </button>
            </div>

            <h3 className="text-xl font-extrabold text-white font-outfit mt-3">
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

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Recommended Action:</span> Inspect Field A lower canopy within 24h.
            </div>
            <button
              onClick={() => navigate("/actions")}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
            >
              <span>Take Action</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Risk Score Component Breakdown Bars */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
          {t.dashboard.breakdown}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { label: "Disease Risk", val: farmRiskState.components.diseaseRisk, color: "bg-rose-500" },
            { label: "Weather Risk", val: farmRiskState.components.weatherRisk, color: "bg-amber-500" },
            { label: "Irrigation Health", val: farmRiskState.components.irrigationHealth, color: "bg-emerald-500" },
            { label: "Crop Condition", val: farmRiskState.components.cropCondition, color: "bg-teal-500" },
            { label: "Outbreak Exposure", val: farmRiskState.components.outbreakExposure, color: "bg-rose-600" }
          ].map(comp => (
            <div key={comp.label} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex justify-between text-xs font-semibold mb-2">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Fields Cards */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Active Registered Fields ({fields.length})</h3>
            <button onClick={() => navigate("/fields")} className="text-xs font-semibold text-emerald-400 hover:underline">
              View All Fields ?
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base font-outfit">{field.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      field.status === "Healthy" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                    }`}>{field.status}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{field.crop} • {field.variety} ({field.areaAcres} Acres)</p>
                  <p className="text-xs text-slate-300 font-semibold mt-2">
                    Disease: {field.currentDiagnosis?.diseaseName || "Healthy"}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Growth Stage: {field.growthStage}</span>
                  <span className="text-slate-300 font-bold">Risk: {field.riskScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Farm Health Trend */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">{t.dashboard.healthTrend}</h3>
            <p className="text-xs text-slate-400 mb-4">Historical farm health index over past week</p>
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
                <YAxis domain={[50, 100]} stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", color: "#f3f4f6", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-2">Score improved +1 pt following recent preventive actions.</p>
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
