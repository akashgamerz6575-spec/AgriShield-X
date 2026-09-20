import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  Radar,
  Bot,
  Sprout,
  CloudSun,
  CheckSquare,
  TrendingUp,
  Zap,
  Home
} from 'lucide-react';

export default function Sidebar() {
  const { t } = useFarm();
  const location = useLocation();

  const navGroups = [
    {
      label: 'Intelligence',
      items: [
        { path: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
        { path: '/doctor', label: t.nav.cropDoctor, icon: Stethoscope },
        { path: '/radar', label: t.nav.outbreakRadar, icon: Radar },
        { path: '/copilot', label: t.nav.farmCopilot, icon: Bot },
      ]
    },
    {
      label: 'Operations',
      items: [
        { path: '/fields', label: t.nav.cropTracker, icon: Sprout },
        { path: '/weather', label: t.nav.weather, icon: CloudSun },
        { path: '/actions', label: t.nav.actionCenter, icon: CheckSquare },
      ]
    },
    {
      label: 'Analytics',
      items: [
        { path: '/market', label: t.nav.market, icon: TrendingUp },
        { path: '/simulator', label: t.nav.simulator, icon: Zap },
      ]
    }
  ];

  const mobileItems = [
    { path: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { path: '/doctor', label: t.nav.cropDoctor, icon: Stethoscope },
    { path: '/radar', label: t.nav.outbreakRadar, icon: Radar },
    { path: '/copilot', label: t.nav.farmCopilot, icon: Bot },
    { path: '/actions', label: t.nav.actionCenter, icon: CheckSquare }
  ];

  return (
    <>
      {/* Desktop Sidebar — 230px standard width */}
      <aside className="hidden lg:flex flex-col justify-between w-[230px] bg-white dark:bg-[#0f1620] border-r border-slate-200 dark:border-slate-800 py-4 shrink-0 min-h-[calc(100vh-48px)] transition-colors duration-200">
        <div className="space-y-5 px-3">
          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Home className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>{t.nav.overview || 'Overview'}</span>
          </Link>

          {/* Grouped Navigation */}
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                {group.label}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-forest-50 dark:bg-emerald-950/40 text-forest-700 dark:text-emerald-400 font-semibold border border-forest-200/60 dark:border-emerald-800/40 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 font-medium'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-forest-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center justify-between px-3 py-2 text-[10px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              AgriShield X
            </span>
            <span className="font-mono">v2.0</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav aria-label="Mobile Bottom Navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0f1620]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around transition-colors duration-200 shadow-lg">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] transition-colors ${
                isActive
                  ? 'text-forest-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="mt-0.5 truncate max-w-[56px] text-center">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
