import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Sprout, Calendar, Droplets, Stethoscope, ChevronRight, Activity, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function CropTracker() {
  const { t, fields } = useFarm();
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || 'field-a');

  const activeField = fields.find(f => f.id === selectedFieldId) || fields[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-outfit">
                {t.nav.cropTracker}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Lifecycle monitoring, soil moisture status, and disease timeline for all registered fields
              </p>
            </div>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300 font-medium self-start sm:self-center">
          {fields.length} Active Farm Fields Monitored
        </div>
      </div>

      {/* Field Selector Cards / Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fields.map((field) => {
          const isSelected = field.id === selectedFieldId;
          const isHealthy = field.status === 'Healthy';
          return (
            <button
              key={field.id}
              onClick={() => setSelectedFieldId(field.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm font-outfit">{field.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isHealthy
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {field.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{field.crop} &bull; {field.variety}</p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{field.areaAcres} Acres</span>
                <span className="font-semibold text-slate-200">Risk: {field.riskScore}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Field Detail View */}
      {activeField && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Field Overview & Metrics (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Field Metadata Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white font-outfit">{activeField.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{activeField.crop} ({activeField.variety})</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Risk Score</span>
                  <span className="text-xl font-bold text-white font-outfit">{activeField.riskScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Cultivated Area</span>
                  <span className="text-slate-200 font-semibold">{activeField.areaAcres} Acres</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Growth Stage</span>
                  <span className="text-slate-200 font-semibold">{activeField.growthStage}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Sowing / Planting</span>
                  <span className="text-slate-200 font-semibold">{activeField.plantingDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[11px]">Irrigation Status</span>
                  <span className="text-slate-200 font-semibold">{activeField.irrigationStatus}</span>
                </div>
              </div>
            </div>

            {/* Current Health & Diagnosis Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <Stethoscope className="w-4 h-4 text-emerald-400" />
                <span>Active Diagnosis Status</span>
              </div>

              {activeField.currentDiagnosis ? (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-sm block">
                        {activeField.currentDiagnosis.diseaseName}
                      </span>
                      <span className="text-xs text-slate-400">
                        {activeField.currentDiagnosis.urgency || 'Routine Monitoring'}
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {activeField.currentDiagnosis.severity} Severity
                    </span>
                  </div>

                  {activeField.currentDiagnosis.symptoms?.length > 0 && (
                    <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800/60">
                      <span className="text-slate-400 font-semibold block text-[11px]">Primary Symptoms:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                        {activeField.currentDiagnosis.symptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeField.currentDiagnosis.treatment?.organic?.length > 0 && (
                    <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800/60">
                      <span className="text-emerald-400 font-semibold block text-[11px]">Recommended Organic Action:</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {activeField.currentDiagnosis.treatment.organic[0]}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-950/40 border border-slate-800 text-center text-xs text-slate-500">
                  No active disease logged for this field.
                </div>
              )}
            </div>

          </div>

          {/* Chronological Field Timeline (Right 7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-outfit">
                  Field Agronomic Timeline
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                {activeField.timeline?.length || 0} Recorded Events
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {activeField.timeline?.map((evt, idx) => (
                <div key={idx} className="flex gap-4 items-start relative pb-4 last:pb-0">
                  {idx !== activeField.timeline.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-800"></div>
                  )}

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 z-10 ${
                      evt.type === 'DIAGNOSIS'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : evt.type === 'ACTION'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : evt.type === 'IRRIGATION'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {evt.type === 'DIAGNOSIS' ? (
                      <Stethoscope className="w-4 h-4" />
                    ) : evt.type === 'IRRIGATION' ? (
                      <Droplets className="w-4 h-4" />
                    ) : (
                      <Sprout className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{evt.label}</span>
                      <span className="text-[10px] text-slate-400">{evt.date}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                      Event Type: {evt.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}