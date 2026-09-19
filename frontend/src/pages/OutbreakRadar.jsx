import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Radar, AlertTriangle, Filter, MapPin, ShieldCheck } from 'lucide-react';

// Custom SVG Icons for Leaflet Markers
const createMarkerIcon = (color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22c0-7.73-6.27-14-14-14z" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
      <circle cx="14" cy="14" r="5" fill="#ffffff"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'custom-map-pin',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -32]
  });
};

const farmIcon = createMarkerIcon('#10b981'); // Emerald
const redClusterIcon = createMarkerIcon('#ef4444'); // Red for high/critical
const amberClusterIcon = createMarkerIcon('#f59e0b'); // Amber for moderate

export default function OutbreakRadar() {
  const { t, outbreakReports } = useFarm();
  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState('ALL');

  const filteredReports = outbreakReports.filter((rep) => {
    if (selectedCropFilter !== 'ALL' && !rep.crop.toLowerCase().includes(selectedCropFilter.toLowerCase())) {
      return false;
    }
    if (selectedSeverityFilter !== 'ALL' && rep.severity.toLowerCase() !== selectedSeverityFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-outfit">
                {t.outbreakRadar.title}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.outbreakRadar.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Transparency Disclosure Badge */}
        <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-medium self-start sm:self-center">
          {t.outbreakRadar.demoDataNotice}
        </div>
      </div>

      {/* Proximity Exposure Alert */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 flex items-start gap-3 text-xs">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-amber-100 block mb-0.5">
            Farm Proximity Alert:
          </span>
          Early Blight cluster active within 12km of your registered tomato fields (Kolar - Chikkaballapur belt). Elevated fungal spore pressure detected.
        </div>
      </div>

      {/* Grid: Left Filters & Clusters List, Right Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Filter Controls and List */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Filter Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-emerald-400" />
              <span>Map Filters</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">{t.outbreakRadar.filterCrop}</label>
                <select
                  value={selectedCropFilter}
                  onChange={(e) => setSelectedCropFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="ALL">All Crops (Tomato, Paddy, Cotton, Chilli)</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Paddy">Paddy Rice</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Chilli">Red Chilli</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">{t.outbreakRadar.filterSeverity}</label>
                <select
                  value={selectedSeverityFilter}
                  onChange={(e) => setSelectedSeverityFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="ALL">All Severity Levels</option>
                  <option value="High">High / Critical</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Regional Clusters Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {t.outbreakRadar.nearbyClusters} ({filteredReports.length})
              </span>
            </div>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {filteredReports.map((rep) => {
                const isHigh = rep.severity === 'High' || rep.severity === 'Critical';
                return (
                  <div
                    key={rep.id}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">{rep.disease}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isHigh ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {rep.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {rep.locationName || rep.location} &bull; {rep.reportCount || rep.reports} incident reports
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/60">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{rep.proximityToUserFarm || rep.distance}</span>
                      </span>
                      <span>{rep.timeframe}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Leaflet Map */}
        <div className="lg:col-span-8 p-3 rounded-2xl bg-slate-900 border border-slate-800 min-h-[480px] flex flex-col">
          <div className="w-full flex-1 rounded-xl overflow-hidden min-h-[450px]">
            <MapContainer
              center={[12.9716, 77.5946]}
              zoom={10}
              scrollWheelZoom={false}
              className="w-full h-full min-h-[450px]"
            >
              <TileLayer
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Farmer Home Location Circle Marker */}
              <Circle
                center={[12.9716, 77.5946]}
                radius={4000}
                pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.15 }}
              />
              <Marker position={[12.9716, 77.5946]} icon={farmIcon}>
                <Popup>
                  <div className="p-1 text-slate-900">
                    <strong className="text-emerald-700 text-xs block">Your AgriShield Farm</strong>
                    <span className="text-[11px] text-slate-600">Bengaluru Agri-Belt (4 Registered Fields)</span>
                  </div>
                </Popup>
              </Marker>

              {/* Outbreak Cluster Circles & Markers */}
              {filteredReports.map((rep) => {
                const isHigh = rep.severity === 'High' || rep.severity === 'Critical';
                return (
                  <React.Fragment key={rep.id}>
                    <Circle
                      center={[rep.lat, rep.lng]}
                      radius={(rep.radiusKm || 15) * 1000}
                      pathOptions={{
                        color: isHigh ? '#ef4444' : '#f59e0b',
                        fillColor: isHigh ? '#ef4444' : '#f59e0b',
                        fillOpacity: 0.15
                      }}
                    />
                    <Marker
                      position={[rep.lat, rep.lng]}
                      icon={isHigh ? redClusterIcon : amberClusterIcon}
                    >
                      <Popup>
                        <div className="p-1.5 space-y-1 text-slate-900">
                          <span className="text-xs font-bold block">{rep.disease}</span>
                          <p className="text-[11px] text-slate-600">Crop: {rep.crop} ({rep.reportCount || rep.reports} reports)</p>
                          <p className="text-[10px] text-slate-500">Location: {rep.locationName || rep.location}</p>
                          <p className="text-[10px] text-red-600 font-semibold">{rep.impactOnUser || 'Regional outbreak exposure signal'}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                );
              })}
            </MapContainer>
          </div>
        </div>

      </div>

    </div>
  );
}