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
      <aside className="hidden lg:block w-64 bg-slate-900/60 border-r border-slate-800 p-4 shrink-0 min-h-[calc(100vh-61px)]">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Main Navigation</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Hackathon Info Card at Bottom */}
        <div className="mt-8 p-3 rounded-xl bg-slate-800/40 border border-slate-800/80 text-xs text-slate-400">
          <p className="font-semibold text-slate-300">HackDevengers 2.0</p>
          <p className="text-[11px] mt-0.5 text-slate-500">Predictive Farm Intelligence Platform</p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-800 px-2 py-1.5 backdrop-blur-lg flex items-center justify-around">
        {[
          { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/doctor', label: 'Doctor', icon: Stethoscope },
          { path: '/radar', label: 'Radar', icon: Radar },
          { path: '/copilot', label: 'Copilot', icon: Bot },
          { path: '/fields', label: 'Fields', icon: Sprout }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
