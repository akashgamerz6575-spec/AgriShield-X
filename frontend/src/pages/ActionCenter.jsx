import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { CheckSquare, CheckCircle2, Circle, AlertTriangle, Clock, ArrowUpRight, Filter, Sparkles, Tag } from 'lucide-react';

export default function ActionCenter() {
  const { t, actions, toggleActionComplete, farmRiskState } = useFarm();
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredActions = actions.filter((action) => {
    if (priorityFilter !== 'ALL' && action.priority !== priorityFilter) return false;
    return true;
  });

  const completedCount = actions.filter(a => a.completed).length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn transition-colors duration-200">
      
      {/* Title Header Banner */}
      <div className="bg-white dark:bg-[#111c35] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {t.actionCenter.title}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.actionCenter.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Risk Relief Metric */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-right">
            <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-medium">Mitigations Applied</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm font-outfit">
              {completedCount} / {actions.length} Completed
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Health Feedback Banner */}
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{t.actionCenter.riskReliefNotice || 'Completing pending actions reduces farm risk score and restores health rating.'}</span>
        </div>
        <span className="font-bold text-emerald-700 dark:text-emerald-300">
          Active Farm Health Score: {farmRiskState.healthScore} / 100
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs overflow-x-auto">
        {[
          { id: 'ALL', label: t.actionCenter.filterAll || 'All Tasks' },
          { id: 'HIGH', label: t.actionCenter.priorityHigh || 'High Priority' },
          { id: 'MEDIUM', label: t.actionCenter.priorityMedium || 'Medium Priority' },
          { id: 'LOW', label: t.actionCenter.priorityLow || 'Low Priority' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPriorityFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              priorityFilter === tab.id
                ? 'bg-slate-100 text-emerald-700 border border-slate-300 dark:bg-slate-800 dark:text-emerald-400 dark:border-slate-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Actions Checklist */}
      <div className="space-y-3.5">
        {filteredActions.map((action) => {
          const isHigh = action.priority === 'HIGH';
          const isMedium = action.priority === 'MEDIUM';

          return (
            <div
              key={action.id}
              onClick={() => toggleActionComplete(action.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                action.completed
                  ? 'bg-slate-100/60 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/50 opacity-60'
                  : 'bg-white dark:bg-[#111c35] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleActionComplete(action.id);
                  }}
                  aria-label="Toggle action completion"
                >
                  {action.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400" />
                  )}
                </button>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-sm sm:text-base font-bold font-outfit break-words ${
                        action.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {action.title}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-md shrink-0">
                      {action.fieldName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed break-words">
                    {action.description}
                  </p>

                  {action.reason && (
                    <div className="pt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <Tag className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="font-medium">{t.actionCenter.reasonLabel || 'Reason'}:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-300 px-2 py-0.5 bg-slate-100 dark:bg-slate-950/80 rounded-md border border-slate-200 dark:border-slate-800">
                        {action.reason}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Metadata & Action Buttons */}
              <div className="flex items-center justify-between md:flex-col md:items-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      isHigh
                        ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                        : isMedium
                        ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                        : 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {action.priority}
                  </span>

                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{action.dueDate}</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleActionComplete(action.id);
                  }}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    action.completed
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700'
                  }`}
                >
                  {action.completed ? (t.actionCenter.completedBadge || 'Resolved') : (t.actionCenter.markComplete || 'Mark as Resolved')}
                </button>
              </div>

            </div>
          );
        })}

        {filteredActions.length === 0 && (
          <div className="p-12 text-center text-xs text-slate-500 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800">
            {t.actionCenter.emptyMessage || 'No actions found under this priority filter.'}
          </div>
        )}
      </div>

    </div>
  );
}
