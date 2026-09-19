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
    <div className="space-y-6 pb-12">
      
      {/* Title Header */}
      <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white font-outfit">
                {t.actionCenter.title}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.actionCenter.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Risk Relief Metric */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="px-4 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-right">
            <span className="text-slate-400 block text-[11px]">Mitigations Applied</span>
            <span className="font-bold text-white text-sm font-outfit">
              {completedCount} / {actions.length} Completed
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Health Feedback Banner */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.actionCenter.impactNotice}</span>
        </div>
        <span className="font-bold text-emerald-300">
          Active Farm Health Score: {farmRiskState.healthScore} / 100
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs overflow-x-auto">
        {[
          { id: 'ALL', label: 'All Tasks' },
          { id: 'HIGH', label: t.actionCenter.highPriority },
          { id: 'MEDIUM', label: t.actionCenter.mediumPriority },
          { id: 'LOW', label: t.actionCenter.lowPriority }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPriorityFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              priorityFilter === tab.id
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Actions Checklist: Responsive layout adapting smoothly from 1920 to 390px */}
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
                  ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-sm'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors shrink-0 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleActionComplete(action.id);
                  }}
                >
                  {action.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-emerald-400" />
                  )}
                </button>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-sm sm:text-base font-bold font-outfit break-words ${
                        action.completed ? 'line-through text-slate-500' : 'text-white'
                      }`}
                    >
                      {action.title}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md shrink-0">
                      {action.fieldName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed break-words">
                    {action.description}
                  </p>

                  {action.reason && (
                    <div className="pt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                      <Tag className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="text-slate-500 font-medium">Risk Driver:</span>
                      <span className="text-slate-300 font-semibold px-2 py-0.5 bg-slate-950/80 rounded-md border border-slate-800">
                        {action.reason}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Metadata & Action Buttons (wraps cleanly on smaller screens) */}
              <div className="flex items-center justify-between md:flex-col md:items-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      isHigh
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {action.priority}
                  </span>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3 text-slate-500" />
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
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {action.completed ? t.actionCenter.completed : t.actionCenter.markComplete}
                </button>
              </div>

            </div>
          );
        })}

        {filteredActions.length === 0 && (
          <div className="p-12 text-center text-xs text-slate-500 rounded-2xl bg-slate-900 border border-slate-800">
            No actions found under this priority filter.
          </div>
        )}
      </div>

    </div>
  );
}