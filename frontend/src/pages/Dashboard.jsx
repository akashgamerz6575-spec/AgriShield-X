import React, { useState } from "react";
import { useFarm } from "../context/FarmContext";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  MapPin,
  Leaf,
  Droplets,
  Sprout,
  ShieldAlert
} from "lucide-react";
import WhyAlertModal from "../components/WhyAlertModal";
import CropThumbnail from "../components/CropThumbnail";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { theme, t, farmRiskState, fields, weather, actions } = useFarm();
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const navigate = useNavigate();

  // Consistent 7-day health trend
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

  const localizedStatus = farmRiskState.riskTier === 'Critical'
    ? t.dashboard.criticalRisk
    : farmRiskState.riskTier === 'High'
    ? t.dashboard.highRisk
    : farmRiskState.riskTier === 'Moderate'
    ? t.dashboard.moderateRisk
    : t.dashboard.lowRisk;

  const healthColor = farmRiskState.healthScore < 30 ? "text-red-600 dark:text-red-400" : farmRiskState.healthScore < 60 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400";
  const healthStroke = farmRiskState.healthScore < 30 ? "#dc2626" : farmRiskState.healthScore < 60 ? "#d97706" : "#2d6a4f";

  return (
    <div className="w-full space-y-6 pb-12 animate-fadeIn transition-colors duration-200">
      
      {/* Full-Width Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-outfit tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 leading-relaxed max-w-3xl">
            {t.dashboard.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-xs font-medium">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{weather.location || t.regionLocation}</span>
          </div>
        </div>
      </div>

      {/* Top Grid: Farm Health Score (31%) + Primary Risk Alert (69%) */}
      <div className="flex flex-col lg:flex-row items-stretch gap-5 w-full">
        
        {/* Farm Health Score Card (31% Desktop) */}
        <div className="w-full lg:w-[31%] shrink-0 p-6 rounded-2xl bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-between gap-4 transition-colors duration-200">
          <div className="self-stretch flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              {t.dashboard.healthScoreTitle}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              farmRiskState.riskTier === 'Critical'
                ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800/40'
                : farmRiskState.riskTier === 'High'
                ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800/40'
                : farmRiskState.riskTier === 'Moderate'
                ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
            }`}>
              {localizedStatus}
            </span>
          </div>

          {/* SVG Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="7"
                className="text-slate-100 dark:text-slate-800/80"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={farmRiskState.healthScore < 30 ? "#dc2626" : farmRiskState.healthScore < 60 ? "#d97706" : "#10b981"}
                strokeWidth="7.5"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * farmRiskState.healthScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold font-outfit tracking-tight ${healthColor}`}>
                {farmRiskState.healthScore}
              </span>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                / 100
              </span>
            </div>
          </div>

          {/* Metrics summary */}
          <div className="self-stretch grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/70">
            <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a2435] border border-slate-100 dark:border-slate-800/60">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Health Index</div>
              <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">{farmRiskState.healthScore}</div>
            </div>
            <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a2435] border border-slate-100 dark:border-slate-800/60">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Calculated Risk</div>
              <div className="text-base font-bold font-mono text-red-600 dark:text-red-400 mt-0.5">{100 - farmRiskState.healthScore}%</div>
            </div>
          </div>
        </div>

        {/* Primary Farm Risk Alert Card (69% Desktop - Uses Full Remaining Width) */}
        <div className="w-full lg:w-[69%] flex-1 p-6 rounded-2xl bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-5 transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.dashboard.primaryRiskAlert}</span>
              </div>
              <button
                onClick={() => setIsWhyModalOpen(true)}
                className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.dashboard.whyThisAlert}</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-outfit mt-3">
              {farmRiskState.primaryAlert?.title || "Early Blight Risk Increased on Field A (Tomato)"}
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-4xl">
              {farmRiskState.primaryAlert?.description || "Relative humidity at 82%, imminent rain forecast, and a nearby regional outbreak cluster (12km away) have elevated early blight risk for your tomato field."}
            </p>

            {/* Risk Factor Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-xs font-medium">
                +18 High Humidity (82%)
              </span>
              <span className="px-3 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-xs font-medium">
                +16 Outbreak Cluster (12km)
              </span>
              <span className="px-3 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-xs font-medium">
                +14 Leaf Lesion Scan
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {t.dashboard.recommendedAction || 'Recommended Action'}:
              </span>{" "}
              {actions[0]?.title || "Inspect Field A lower canopy within 24h & apply preventive mulch."}
            </div>
            <button
              onClick={() => navigate('/actions')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
            >
              <span>{t.dashboard.viewActionPlan}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Risk Component Drivers — 5 Column Grid Across Full Available Width */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 w-full transition-colors duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            {t.dashboard.riskDriversTitle}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            5 key predictive indices active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
          {[
            {
              id: "disease",
              name: t.dashboard.riskDrivers?.disease || "Disease Risk",
              value: 90,
              desc: "High pathogen pressure detected",
              color: "bg-red-500",
              textColor: "text-red-600 dark:text-red-400",
              icon: AlertTriangle
            },
            {
              id: "weather",
              name: t.dashboard.riskDrivers?.weather || "Weather Risk",
              value: 77,
              desc: "Conditions favorable for disease spread",
              color: "bg-amber-500",
              textColor: "text-amber-600 dark:text-amber-400",
              icon: CloudSun
            },
            {
              id: "irrigation",
              name: t.dashboard.riskDrivers?.irrigation || "Irrigation Health",
              value: 35,
              desc: "Soil moisture within acceptable range",
              color: "bg-emerald-500",
              textColor: "text-emerald-600 dark:text-emerald-400",
              icon: Droplets
            },
            {
              id: "crop",
              name: t.dashboard.riskDrivers?.crop || "Crop Condition",
              value: 40,
              desc: "Moderate stress indicators",
              color: "bg-teal-500",
              textColor: "text-teal-600 dark:text-teal-400",
              icon: Leaf
            },
            {
              id: "outbreak",
              name: t.dashboard.riskDrivers?.outbreak || "Outbreak Exposure",
              value: 63,
              desc: "Regional activity elevated (12km)",
              color: "bg-red-600",
              textColor: "text-red-600 dark:text-red-400",
              icon: ShieldAlert
            }
          ].map((comp) => {
            const Icon = comp.icon;
            return (
              <div key={comp.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#1a2435] border border-slate-200/80 dark:border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold truncate">
                      <Icon className="w-3.5 h-3.5 shrink-0 text-slate-500 dark:text-slate-400" />
                      <span className="truncate">{comp.name}</span>
                    </div>
                    <span className={`font-mono font-bold text-xs ${comp.textColor}`}>{comp.value}%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                    {comp.desc}
                  </p>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${comp.color} rounded-full transition-all duration-500`}
                    style={{ width: `${comp.value}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lower Dashboard Grid: Active Registered Fields (66%) + 7-Day Trend (34%) */}
      <div className="flex flex-col xl:flex-row items-stretch gap-5 w-full">
        
        {/* Active Registered Fields (66% Desktop) */}
        <div className="w-full xl:w-[66%] flex-1 p-6 rounded-2xl bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                {t.dashboard.activeFieldsTitle} ({fields.length})
              </span>
              <button
                onClick={() => navigate('/fields')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{t.dashboard.viewAllFields}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2x2 Responsive Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field) => {
                const statusBadge = field.status === 'Healthy'
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40"
                  : field.status === 'Needs Attention'
                  ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40"
                  : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40";

                return (
                  <div
                    key={field.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#1a2435] border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3.5">
                      <CropThumbnail crop={field.crop} className="w-14 h-14 shrink-0 rounded-xl overflow-hidden" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm font-outfit truncate">
                            {field.name}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${statusBadge}`}>
                            {field.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {field.crop} • {field.variety} ({field.areaAcres} {t.dashboard.fieldLabels?.acres || 'Acres'})
                        </p>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1 truncate">
                          <span className="text-slate-400 dark:text-slate-500">{t.dashboard.fieldLabels?.disease || 'Disease'}:</span>{' '}
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {field.currentDiagnosis?.diseaseName || "Healthy"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800/70 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="truncate">
                        {t.dashboard.fieldLabels?.stage || 'Stage'}: {field.growthStage}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 shrink-0">
                        {t.dashboard.fieldLabels?.risk || 'Risk'}: <span className={field.riskScore > 60 ? "text-red-600 dark:text-red-400 font-mono" : field.riskScore > 30 ? "text-amber-600 dark:text-amber-400 font-mono" : "text-emerald-600 dark:text-emerald-400 font-mono"}>{field.riskScore}%</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 7-Day Health Trend Chart Card (34% Desktop - Larger Visual Chart) */}
        <div className="w-full xl:w-[34%] shrink-0 p-6 rounded-2xl bg-white dark:bg-[#131b27] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 transition-colors duration-200">
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              {t.dashboard.healthTrendTitle}
            </span>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.dashboard.healthTrendSubtitle}
            </p>
          </div>

          {/* Larger Chart Area */}
          <div className="w-full h-[260px] min-h-[260px]">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} />
                <XAxis
                  dataKey="day"
                  stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                  fontSize={11}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#131b27' : '#ffffff',
                    borderColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
                    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    borderRadius: "8px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                    fontSize: "11px"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#2d6a4f"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#scoreGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1a2435] border border-slate-200/80 dark:border-slate-800/70">
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center leading-relaxed">
              {currentHealth < 50
                ? t.dashboard.healthTrendCriticalText
                : t.dashboard.healthTrendNormalText}
            </p>
          </div>
        </div>

      </div>

      {/* Why Alert Modal */}
      <WhyAlertModal
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
        alert={farmRiskState.primaryAlert}
        healthScore={farmRiskState.healthScore}
        statusText={localizedStatus}
      />
    </div>
  );
}
