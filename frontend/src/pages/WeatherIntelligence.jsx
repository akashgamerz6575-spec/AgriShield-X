import React from 'react';
import { useFarm } from '../context/FarmContext';
import { CloudSun, Droplets, Wind, Thermometer, AlertTriangle, ShieldCheck, Calendar, Info } from 'lucide-react';

export default function WeatherIntelligence() {
  const { t, weather } = useFarm();

  const isFungalHigh = weather.fungalRiskLevel === 'HIGH';

  return (
    <div className="space-y-6 pb-12 animate-fadeIn transition-colors duration-200">
      
      {/* Title Header Banner */}
      <div className="bg-white dark:bg-[#111c35] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {t.weather.title || t.nav.weather}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.weather.subtitle || 'Hyper-local agro-meteorological forecasting & pathogen spore germination modeling'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium self-start sm:self-center shadow-2xs">
          <span>{t.farmRegion || 'Location'}: </span>
          <strong className="text-slate-900 dark:text-white font-semibold">{weather.location || t.regionLocation}</strong>
        </div>
      </div>

      {/* Primary Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Current Metrics Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Temperature */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold">{t.weather.temperature || 'Temperature'}</span>
                <Thermometer className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {weather.temp}°C
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Daily Peak: 29°C</span>
            </div>

            {/* Relative Humidity */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold">{t.weather.humidity || 'Humidity'}</span>
                <Droplets className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {weather.humidity}%
              </div>
              <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold block">Spore Trigger (&gt;75%)</span>
            </div>

            {/* Rain Probability */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold">{t.weather.precipitation || 'Precipitation'}</span>
                <CloudSun className="w-4 h-4 text-cyan-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {weather.rainProbability}%
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Rain Expected</span>
            </div>

            {/* Wind Speed */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold">{t.weather.windSpeed || 'Wind Speed'}</span>
                <Wind className="w-4 h-4 text-teal-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">
                {weather.wind} <span className="text-xs font-normal text-slate-400">km/h</span>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Gentle Breeze</span>
            </div>

          </div>

          {/* Agronomic Spraying Window Advisory */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
              <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Agronomic Application Window Advisory:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              With rain probability at {weather.rainProbability}%, foliar spraying of contact bio-fungicides should be scheduled during dry morning hours to allow at least 3 hours of drying time. Avoid late evening irrigation to minimize canopy wetness duration.
            </p>
          </div>
        </div>

        {/* Right 5 Cols: Fungal Pathogen Spore Risk Meter */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pathogen Germination Risk
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                isFungalHigh
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
              }`}
            >
              {weather.fungalRiskLevel} RISK
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-600 dark:text-slate-400">Atmospheric Moisture Pressure:</span>
              <span className="font-bold text-slate-900 dark:text-white">{weather.humidity}% (Threshold: 75%)</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${isFungalHigh ? 'bg-rose-500' : 'bg-amber-500'}`}
                style={{ width: `${weather.humidity}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {t.weather.fungalRiskDetail || 'High ambient humidity combined with rain forecast accelerates fungal sporulation.'}
            </p>
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Source: Open-Meteo Precision Agro-Weather API & Localized Field Models
          </div>
        </div>

      </div>

      {/* 5-Day Agricultural Forecast Cards */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.weather.forecastHeading || '5-Day Agro-Meteorological Forecast'}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(weather.forecast || [
            { day: 'Today', condition: 'Overcast Rain', maxTemp: 29, minTemp: 21, rainProb: 75 },
            { day: 'Tomorrow', condition: 'Scattered Showers', maxTemp: 28, minTemp: 20, rainProb: 65 },
            { day: 'Day +2', condition: 'Partly Cloudy', maxTemp: 30, minTemp: 21, rainProb: 40 },
            { day: 'Day +3', condition: 'Sunny / Dry', maxTemp: 31, minTemp: 22, rainProb: 20 },
            { day: 'Day +4', condition: 'Clear Skies', maxTemp: 32, minTemp: 21, rainProb: 15 }
          ]).map((day, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-2 shadow-2xs"
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white block">{day.day}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{day.condition}</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                {day.maxTemp}° / <span className="text-slate-400 text-xs">{day.minTemp}°</span>
              </div>
              <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">
                Rain: {day.rainProb}%
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
