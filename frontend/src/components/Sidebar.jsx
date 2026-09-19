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
  Home,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar() {
  const { t } = useFarm();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t.nav.landing, icon: Home },
    { path: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { path: '/doctor', label: t.nav.cropDoctor, icon: Stethoscope },
    { path: '/radar', label: t.nav.outbreakRadar, icon: Radar },
    { path: '/copilot', label: t.nav.farmCopilot, icon: Bot },
    { path: '/fields', label: t.nav.cropTracker, icon: Sprout },
    { path: '/weather', label: t.nav.weather, icon: CloudSun },
    { path: '/actions', label: t.nav.actionCenter, icon: CheckSquare },
    { path: '/market', label: t.nav.market, icon: TrendingUp },
    { path: '/simulator', label: t.nav.simulator, icon: Zap }
  ];

  return (
    <>
      {/* Desktop Sidebar (Left Panel) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-slate-50/90 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0 min-h-[calc(100vh-65px)] transition-colors duration-200">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-slate-400 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer Brand Info Badge */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1 mt-6 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 font-outfit">HackDevengers 2.0</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Predictive Farm Intelligence for Resilient Harvests
          </p>
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[9px] text-slate-400">
            <span>AgriShield X</span>
            <span>v2.0 Production</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex items-center justify-around shadow-lg transition-colors duration-200">
        {[
          { path: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
          { path: '/doctor', label: t.nav.cropDoctor, icon: Stethoscope },
          { path: '/radar', label: t.nav.outbreakRadar, icon: Radar },
          { path: '/copilot', label: t.nav.farmCopilot, icon: Bot },
          { path: '/actions', label: t.nav.actionCenter, icon: CheckSquare }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate max-w-[58px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
