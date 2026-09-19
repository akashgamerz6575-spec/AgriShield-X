import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FarmProvider } from './context/FarmContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CropDoctor from './pages/CropDoctor';
import OutbreakRadar from './pages/OutbreakRadar';
import CropTracker from './pages/CropTracker';
import FarmCopilot from './pages/FarmCopilot';
import WeatherIntelligence from './pages/WeatherIntelligence';
import ActionCenter from './pages/ActionCenter';
import MarketIntelligence from './pages/MarketIntelligence';
import ImpactSimulator from './pages/ImpactSimulator';

function MainLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 lg:pb-0">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctor" element={<CropDoctor />} />
            <Route path="/radar" element={<OutbreakRadar />} />
            <Route path="/copilot" element={<FarmCopilot />} />
            <Route path="/fields" element={<CropTracker />} />
            <Route path="/weather" element={<WeatherIntelligence />} />
            <Route path="/actions" element={<ActionCenter />} />
            <Route path="/market" element={<MarketIntelligence />} />
            <Route path="/simulator" element={<ImpactSimulator />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FarmProvider>
      <MainLayout />
    </FarmProvider>
  );
}