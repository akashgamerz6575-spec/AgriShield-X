import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { CheckSquare, CheckCircle2, Circle, AlertTriangle, Clock, ArrowUpRight, Filter, Sparkles } from 'lucide-react';

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
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-outfit">
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
          <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-right">
            <span className="text-slate-400 block text-[11px]">Tasks Completed</span>
            <span className="font-bold text-white text-sm font-outfit">
              {completedCount} / {actions.length} Resolved
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Health Feedback Banner */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.actionCenter.impactNotice}</span>
        </div>
        <span className="font-bold text-emerald-300 hidden sm:inline">
          Active Health Score: {farmRiskState.healthScore}/100
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs">
        {[
          { id: 'ALL', label: 'All Tasks' },
          { id: 'HIGH', label: t.actionCenter.highPriority },
          { id: 'MEDIUM', label: t.actionCenter.mediumPriority },
          { id: 'LOW', label: t.actionCenter.lowPriority }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPriorityFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              priorityFilter === tab.id
                ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Actions Checklist */}
      <div className="space-y-3">
        {filteredActions.map((action) => {
          const isHigh = action.priority === 'HIGH';
          const isMedium = action.priority === 'MEDIUM';

          return (
            <div
              key={action.id}
              onClick={() => toggleActionComplete(action.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                action.completed
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-sm'
              }`}
            >
              {/* Checkbox Icon */}
              <button
                type="button"
                className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
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

              {/* Task Details */}
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold font-outfit ${
                        action.completed ? 'line-through text-slate-500' : 'text-white'
                      }`}
                    >
                      {action.title}
                    </span>
                    <span className="text-[11px] text-slate-400">({action.fieldName})</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isHigh
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : isMedium
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {action.priority} PRIORITY
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{action.dueDate}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {action.description}
                </p>

                {action.reason && (
                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="text-slate-500 font-semibold">Risk Factor Driver:</span>
                    <span className="text-slate-300 font-medium px-2 py-0.5 bg-slate-950/60 rounded border border-slate-800">
                      {action.reason}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="hidden sm:block shrink-0 self-center">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                    action.completed
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {action.completed ? t.actionCenter.completed : t.actionCenter.markComplete}
                </span>
              </div>
            </div>
          );
        })}

        {filteredActions.length === 0 && (
          <div className="p-12 text-center text-xs text-slate-500 rounded-2xl bg-slate-900 border border-slate-800">
            No pending actions under this priority filter.
          </div>
        )}
      </div>

    </div>
  );
}