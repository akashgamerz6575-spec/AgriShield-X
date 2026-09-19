import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Zap, AlertTriangle, ShieldAlert, ShieldCheck, Clock, ArrowRight, Activity } from 'lucide-react';

export default function ImpactSimulator() {
  const { t, farmRiskState } = useFarm();
  const [selectedScenario, setSelectedScenario] = useState('treat_now');

  const scenarios = {
    treat_now: {
      id: 'treat_now',
      title: 'Treat Now (Immediate Action)',
      riskScore: Math.max(15, farmRiskState.riskScore - 26),
      healthScore: Math.min(85, farmRiskState.healthScore + 26),
      status: 'Risk Controlled',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30',
      lossEstimate: '< 2% (Negligible)',
      impact: 'Fungal spore germination arrested on Field A. Infected lower leaves pruned and bio-fungicide applied within 24h. Spore propagation halted before canopy spread.'
    },
    delay_3_days: {
      id: 'delay_3_days',
      title: 'Delay Action by 3 Days',
      riskScore: Math.min(85, farmRiskState.riskScore + 18),
      healthScore: Math.max(20, farmRiskState.healthScore - 18),
      status: 'High Outbreak Threat',
      badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30',
      lossEstimate: '15% - 25% Yield Loss',
      impact: 'High relative humidity (82%) and imminent rain forecast accelerate fungal sporulation. Secondary concentric leaf lesions expand upward into middle canopy foliage.'
    },
    ignore: {
      id: 'ignore',
      title: 'Ignore Warning & Take No Action',
      riskScore: 92,
      healthScore: 8,
      status: 'Critical Crop Loss Exposure',
      badgeColor: 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30',
      lossEstimate: '35% - 50% Crop Loss',
      impact: 'Severe premature defoliation across Field A (Tomato). Pathogen spores disperse by wind & rain splash toward adjacent fields (Field D Chilli).'
    }
  };

  const active = scenarios[selectedScenario];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn transition-colors duration-200">
      
      {/* Title Header Banner */}
      <div className="bg-white dark:bg-[#111c35] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {t.simulator.title || t.nav.simulator}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.simulator.subtitle || 'Predictive consequence modeling: "What happens to my farm health if I delay action?"'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 text-xs font-medium self-start sm:self-center shadow-2xs">
          Predictive Decision Support Sandbox
        </div>
      </div>

      {/* Scenario Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'treat_now', label: '1. Treat Now (Immediate)', color: 'hover:border-emerald-500' },
          { id: 'delay_3_days', label: '2. Delay Action 3 Days', color: 'hover:border-amber-500' },
          { id: 'ignore', label: '3. Ignore Warning', color: 'hover:border-rose-500' }
        ].map((sc) => (
          <button
            key={sc.id}
            onClick={() => setSelectedScenario(sc.id)}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer shadow-2xs ${
              selectedScenario === sc.id
                ? 'bg-indigo-50/80 text-indigo-950 border-indigo-300 dark:bg-slate-800 dark:border-indigo-500 dark:text-white shadow-xs ring-1 ring-indigo-500/30'
                : 'bg-white hover:bg-slate-50 dark:bg-[#111c35] dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="font-semibold text-xs">{sc.label}</span>
            <ArrowRight
              className={`w-4 h-4 ${
                selectedScenario === sc.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Active Scenario Result Box */}
      <div className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Simulated Scenario Outcome
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-outfit mt-1">
              {active.title}
            </h2>
          </div>

          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${active.badgeColor} self-start sm:self-center`}>
            {active.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Projected Health Score */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t.simulator.projectedHealth || 'Projected Health Score'}</span>
            <div className="text-4xl font-extrabold text-slate-900 dark:text-white font-outfit mt-1">
              {active.healthScore}
              <span className="text-xs font-normal text-slate-400 ml-1">/ 100</span>
            </div>
            <span className="text-[11px] text-slate-500 block">
              Simulated Risk Score: {active.riskScore}%
            </span>
          </div>

          {/* Estimated Yield Loss */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t.simulator.riskDelta || 'Projected Yield Impact'}</span>
            <div className="text-xl font-bold text-slate-900 dark:text-white font-outfit mt-2">
              {active.lossEstimate}
            </div>
            <span className="text-[11px] text-slate-500 block">
              Based on 2.5 acre tomato canopy
            </span>
          </div>

          {/* Action Urgency */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Action Urgency</span>
            <div className="text-xl font-bold text-slate-900 dark:text-white font-outfit mt-2">
              {selectedScenario === 'treat_now' ? 'High ROI Window' : selectedScenario === 'delay_3_days' ? 'Critical Escalation' : 'Permanent Damage'}
            </div>
            <span className="text-[11px] text-slate-500 block">
              Mitigation window: ~48 hours
            </span>
          </div>

        </div>

        {/* Narrative Analysis */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2 text-xs">
          <span className="text-slate-900 dark:text-slate-200 font-bold block text-sm">
            Agronomic Analysis & Pathogen Dynamics:
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {active.impact}
          </p>
        </div>

        <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
          Notice: Predictive consequence simulator for educational and agricultural decision support purposes.
        </div>
      </div>

    </div>
  );
}
