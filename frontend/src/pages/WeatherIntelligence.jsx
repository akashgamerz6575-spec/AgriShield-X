import React from 'react';
import { useFarm } from '../context/FarmContext';
import { CloudSun, Droplets, Wind, Thermometer, AlertTriangle, ShieldCheck, Calendar, Info } from 'lucide-react';

export default function WeatherIntelligence() {
  const { t, weather } = useFarm();

  const isFungalHigh = weather.fungalRiskLevel === 'HIGH';

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-outfit">
                {t.nav.weather}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Hyper-local agro-meteorological forecasting & pathogen spore germination modeling
              </p>
            </div>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300 font-medium self-start sm:self-center">
          Location: {weather.location || 'Bengaluru Agri-Zone'}
        </div>
      </div>

      {/* Primary Weather Grid: Current Conditions & Fungal Risk Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Current Metrics Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Temperature */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Temperature</span>
                <Thermometer className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white font-outfit">
                {weather.temp}°C
              </div>
              <span className="text-[11px] text-slate-500 block">Daily Peak: 29°C</span>
            </div>

            {/* Relative Humidity */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Humidity</span>
                <Droplets className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white font-outfit">
                {weather.humidity}%
              </div>
              <span className="text-[11px] text-rose-400 font-semibold block">Spore Trigger (&gt;75%)</span>
            </div>

            {/* Rain Probability */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Precipitation</span>
                <CloudSun className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white font-outfit">
                {weather.rainProbability}%
              </div>
              <span className="text-[11px] text-slate-400 block">Rain Forecasted</span>
            </div>

            {/* Wind Speed */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Wind Speed</span>
                <Wind className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-2xl font-bold text-white font-outfit">
                {weather.wind} <span className="text-xs font-normal">km/h</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Gentle Breeze</span>
            </div>

          </div>

          {/* Agronomic Spraying Window Advisory */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Agronomic Application Window Advisory:</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              With rain probability at {weather.rainProbability}%, foliar spraying of contact bio-fungicides should be scheduled during dry morning hours to allow at least 3 hours of drying time. Avoid late evening irrigation to minimize canopy wetness duration.
            </p>
          </div>
        </div>

        {/* Right 5 Cols: Fungal Pathogen Spore Risk Meter */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Pathogen Germination Risk
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                isFungalHigh
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {weather.fungalRiskLevel} RISK
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Atmospheric Moisture Pressure:</span>
              <span className="font-bold text-white">{weather.humidity}% (Threshold: 75%)</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${isFungalHigh ? 'bg-rose-500' : 'bg-amber-500'}`}
                style={{ width: `${weather.humidity}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Prolonged relative humidity exceeding 75% combined with moderate temperatures (24-28°C) provides optimal conditions for <em>Alternaria solani</em> (Early Blight) spore germination.
            </p>
          </div>

          <div className="text-[11px] text-slate-500">
            Source: Open-Meteo Precision Agro-Weather API & Localized Field Models
          </div>
        </div>

      </div>

      {/* 5-Day Agricultural Forecast Cards */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>5-Day Microclimate Agricultural Forecast</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {weather.forecast?.map((day, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2"
            >
              <span className="text-xs font-bold text-white block">{day.day}</span>
              <span className="text-[11px] text-slate-400 block">{day.condition}</span>
              <div className="text-sm font-bold text-white font-outfit">
                {day.maxTemp}° / <span className="text-slate-400 text-xs">{day.minTemp}°</span>
              </div>
              <div className="text-[10px] text-cyan-400 font-medium">
                Rain: {day.rainProb}%
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}