import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Sprout, Calendar, Droplets, Stethoscope, ChevronRight, Activity, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import CropThumbnail from '../components/CropThumbnail';

export default function CropTracker() {
  const { t, fields } = useFarm();
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || 'field-a');

  const activeField = fields.find(f => f.id === selectedFieldId) || fields[0];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn transition-colors duration-200">
      
      {/* Title Header Banner */}
      <div className="bg-white dark:bg-[#111c35] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {t.cropTracker.title || t.nav.cropTracker}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.cropTracker.subtitle || 'Lifecycle monitoring, soil moisture status, and disease timeline for all registered fields'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium self-start sm:self-center shadow-2xs">
          <span>{t.cropTracker.totalAcreage || 'Total Cultivated Area'}: </span>
          <strong className="text-emerald-700 dark:text-emerald-400">11.5 {t.dashboard.fieldLabels?.acres || 'Acres'}</strong>
        </div>
      </div>

      {/* Field Selector Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fields.map((field) => {
          const isSelected = field.id === activeField?.id;
          return (
            <button
              key={field.id}
              onClick={() => setSelectedFieldId(field.id)}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between gap-2.5 cursor-pointer shadow-2xs ${
                isSelected
                  ? 'bg-emerald-50/90 text-emerald-950 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/60 shadow-xs ring-1 ring-emerald-500/30'
                  : 'bg-white hover:bg-slate-50 dark:bg-[#111c35] dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <CropThumbnail crop={field.crop} className="w-10 h-10" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm font-outfit text-slate-900 dark:text-white truncate">
                      {field.name}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      field.status === 'Healthy'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300'
                    }`}>
                      {field.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {field.crop} • {field.variety}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>{field.areaAcres} {t.dashboard.fieldLabels?.acres || 'Acres'}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {t.dashboard.fieldLabels?.risk || 'Risk'}: {field.riskScore}%
                </span>
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
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">{activeField.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activeField.crop} ({activeField.variety})</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">{t.dashboard.fieldLabels?.risk || 'Risk'} Score</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white font-outfit">{activeField.riskScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-medium">{t.cropTracker.totalAcreage || 'Cultivated Area'}</span>
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">{activeField.areaAcres} {t.dashboard.fieldLabels?.acres || 'Acres'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-medium">{t.dashboard.fieldLabels?.stage || 'Growth Stage'}</span>
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">{activeField.growthStage}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-medium">Sowing / Planting</span>
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">{activeField.plantingDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-medium">Irrigation Status</span>
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">{activeField.irrigationStatus}</span>
                </div>
              </div>
            </div>

            {/* Current Health & Diagnosis Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Active Diagnosis Status</span>
              </div>

              {activeField.currentDiagnosis ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm block">
                        {activeField.currentDiagnosis.diseaseName}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {activeField.currentDiagnosis.urgency || 'Routine Monitoring'}
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30">
                      {activeField.currentDiagnosis.severity} {t.cropDoctor.severity}
                    </span>
                  </div>

                  {activeField.currentDiagnosis.symptoms?.length > 0 && (
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800/60">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold block text-[11px]">Primary Symptoms:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                        {activeField.currentDiagnosis.symptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeField.currentDiagnosis.treatment?.organic?.length > 0 && (
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800/60">
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold block text-[11px]">{t.cropDoctor.organicTreatment}:</span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                        {activeField.currentDiagnosis.treatment.organic[0]}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                  No active disease logged for this field.
                </div>
              )}
            </div>

          </div>

          {/* Chronological Field Timeline (Right 7 Cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider font-outfit">
                  Field Agronomic Timeline
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {activeField.timeline?.length || 0} Recorded Events
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {activeField.timeline?.map((evt, idx) => (
                <div key={idx} className="flex gap-4 items-start relative pb-4 last:pb-0">
                  {idx !== activeField.timeline.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
                  )}

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 z-10 ${
                      evt.type === 'DIAGNOSIS'
                        ? 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30'
                        : evt.type === 'ACTION'
                        ? 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30'
                        : evt.type === 'IRRIGATION'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
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

                  <div className="flex-1 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{evt.label}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{evt.date}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-semibold">
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
