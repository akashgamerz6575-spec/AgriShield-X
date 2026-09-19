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
  Info,
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

  return (
    <div className="space-y-6 pb-12 animate-fadeIn transition-colors duration-200">
      
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
        {/* Subtle decorative agricultural landscape watermark */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none opacity-5 dark:opacity-10 overflow-hidden">
          <svg viewBox="0 0 400 150" className="w-full h-full object-cover" preserveAspectRatio="none">
            <path d="M0,150 Q100,80 200,120 T400,90 L400,150 Z" fill="#10b981" />
            <path d="M50,150 Q150,60 280,110 T400,70 L400,150 Z" fill="#047857" opacity="0.6" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold tracking-wider mb-2 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t.welcomeBack || 'WELCOME BACK'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-outfit tracking-tight">
              {t.dashboard.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {t.dashboard.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start md:self-center">
            {/* Region Location Tag */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-left">
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
                  {t.farmRegion || 'Farm Region'}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {weather.location || t.regionLocation}
                </span>
              </div>
            </div>

            {/* Inspirational Slogan Tag */}
            <div className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs italic">
              <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.heroQuote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Grid: Farm Health Score Gauge + Primary Farm Risk Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Farm Health Score Gauge Card (4 cols) */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t.dashboard.healthScore}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${farmRiskState.badgeColor}`}>
              {localizedStatus}
            </span>
          </div>

          {/* Health Radial Gauge Visual */}
          <div className="my-2 flex items-center justify-center relative">
            <div className="w-36 h-36 rounded-full bg-slate-50 dark:bg-slate-950 border-4 border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center shadow-inner relative">
              {/* Colored arc indicator */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-slate-200 dark:text-slate-800"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray={276}
                  strokeDashoffset={276 - (276 * farmRiskState.healthScore) / 100}
                  strokeLinecap="round"
                  className={farmRiskState.healthScore < 30 ? "text-rose-500" : farmRiskState.healthScore < 60 ? "text-amber-500" : "text-emerald-500"}
                  fill="none"
                />
              </svg>
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit z-10">
                {farmRiskState.healthScore}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 z-10">
                / 100
              </span>
              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mt-0.5 z-10">
                Health Score
              </span>
            </div>
          </div>

          {/* Side-by-side Health Index vs Calculated Risk comparison */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium">
              <span>{t.dashboard.healthIndex}:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{farmRiskState.healthScore} / 100</strong>
            </div>
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium">
              <span>{t.dashboard.calculatedRisk}:</span>
              <strong className="text-rose-600 dark:text-rose-400 font-bold">{farmRiskState.riskScore} / 100</strong>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
            {t.inverseExplanation || t.dashboard.healthScoreExplanation}
          </p>
        </div>

        {/* Primary Farm Risk Alert Card (8 cols) */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t.dashboard.primaryAlertTitle}</span>
              </div>
              <button
                onClick={() => setIsWhyModalOpen(true)}
                className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.dashboard.whyButton}</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-outfit mt-3">
              {t.dashboard.earlyBlightHeadline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {t.dashboard.earlyBlightExplanation}
            </p>

            {/* Risk Factor Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs font-medium">
                +18 High Humidity (82%)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs font-medium">
                +16 Outbreak Cluster Proximity
              </span>
              <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs font-medium">
                +14 Leaf Lesion Scan
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-slate-200">{t.dashboard.recommendedActionLabel}:</span> {t.dashboard.recommendedActionText}
            </div>
            <button
              onClick={() => navigate("/actions")}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
            >
              <span>{t.dashboard.takeActionButton}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Risk Score Component Drivers Grid */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {t.dashboard.riskDriversTitle}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {[
            {
              id: 'disease',
              label: t.dashboard.driverLabels?.disease || 'Disease Risk',
              val: farmRiskState.components.diseaseRisk,
              color: "bg-rose-500",
              desc: t.dashboard.driverDescriptions?.disease || 'High pathogen pressure detected',
              icon: AlertTriangle
            },
            {
              id: 'weather',
              label: t.dashboard.driverLabels?.weather || 'Weather Risk',
              val: farmRiskState.components.weatherRisk,
              color: "bg-amber-500",
              desc: t.dashboard.driverDescriptions?.weather || 'Conditions favorable for disease spread',
              icon: CloudSun
            },
            {
              id: 'irrigation',
              label: t.dashboard.driverLabels?.irrigation || 'Irrigation Health',
              val: farmRiskState.components.irrigationHealth,
              color: "bg-emerald-500",
              desc: t.dashboard.driverDescriptions?.irrigation || 'Soil moisture within acceptable range',
              icon: Droplets
            },
            {
              id: 'condition',
              label: t.dashboard.driverLabels?.condition || 'Crop Condition',
              val: farmRiskState.components.cropCondition,
              color: "bg-teal-500",
              desc: t.dashboard.driverDescriptions?.condition || 'Moderate stress indicators',
              icon: Sprout
            },
            {
              id: 'outbreak',
              label: t.dashboard.driverLabels?.outbreak || 'Outbreak Exposure',
              val: farmRiskState.components.outbreakExposure,
              color: "bg-rose-600",
              desc: t.dashboard.driverDescriptions?.outbreak || 'Regional activity elevated (12km)',
              icon: ShieldAlert
            }
          ].map(comp => {
            const Icon = comp.icon;
            return (
              <div key={comp.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>{comp.label}</span>
                    </div>
                    <span className="text-slate-900 dark:text-white font-extrabold">{comp.val}%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                    {comp.desc}
                  </p>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${comp.color} transition-all duration-500`} style={{ width: `${comp.val}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fields Overview & Health Trend Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Active Fields Cards (2 cols on xl) */}
        <div className="xl:col-span-2 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t.dashboard.activeFieldsTitle} ({fields.length})
            </h3>
            <button
              onClick={() => navigate("/fields")}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer"
            >
              {t.dashboard.viewAllFields} →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(field => {
              const statusBadge = field.status === "Healthy"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30"
                : field.riskScore > 70
                ? "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30"
                : "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30";

              return (
                <div
                  key={field.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Crop Thumbnail */}
                    <CropThumbnail crop={field.crop} className="w-14 h-14" />

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
                        <span className="text-slate-500 dark:text-slate-400">{t.dashboard.fieldLabels?.disease || 'Disease'}:</span>{' '}
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {field.currentDiagnosis?.diseaseName || "Healthy"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="truncate">
                      {t.dashboard.fieldLabels?.stage || 'Stage'}: {field.growthStage}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 shrink-0">
                      {t.dashboard.fieldLabels?.risk || 'Risk'}: <span className={field.riskScore > 60 ? "text-rose-600 dark:text-rose-400" : field.riskScore > 30 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}>{field.riskScore}%</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7-Day Farm Health Trend (1 col on xl) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t.dashboard.healthTrendTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.dashboard.healthTrendSubtitle}
            </p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} />
                <XAxis
                  dataKey="day"
                  stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                  fontSize={10}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#111c35' : '#ffffff',
                    borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                    color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#scoreGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
            <p className="text-[11px] text-slate-600 dark:text-slate-400 text-center leading-relaxed">
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
        factors={farmRiskState.factors}
        healthScore={farmRiskState.healthScore}
        statusText={localizedStatus}
      />

    </div>
  );
}
