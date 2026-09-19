# 🌾 AgriShield X
> **Predictive AI for Smarter Crop Protection**  
> *Built for HackDevengers 2.0*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-5.4-blue.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal.svg)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange.svg)](https://deepmind.google/technologies/gemini/)

AgriShield X is a next-generation predictive agricultural intelligence platform that transitions crop management from **reactive damage control** to **proactive, explainable risk prevention**. By fusing multimodal computer vision, hyper-local agro-meteorology, regional disease outbreak clustering, and context-aware LLM advisory, AgriShield X empowers farmers and agronomists to arrest pathogen outbreaks before widespread crop loss occurs.

---

## 🎯 The Core Problem & Innovation

Traditional agriculture apps are **reactive**: a farmer only scans a crop after leaves are heavily diseased and yield is already destroyed. 

**AgriShield X is predictive and preventative:**
1. **Explainable Risk Engine**: Calculates a composite 0–100 Farm Health Score powered by transparent multi-factor weighting (humidity thresholds, rain likelihood, regional pathogen proximity, active field infections).
2. **Context-Aware Farm Copilot**: An AI agronomic assistant that doesn't just answer generic questions—it queries live farm state, registered field varieties, local humidity, and pending action items.
3. **Regional Outbreak Radar**: Interactive mapping of active pathogen clusters across agricultural corridors with automatic proximity warnings for registered fields.
4. **AI Crop Doctor 2.0**: High-precision leaf vision analysis offering transparent diagnostic reasoning, organic biocontrols, label-compliant chemical guidance, and chemical safety advisories.
5. **Dynamic Action Center**: Resolving prioritized agronomic interventions directly feeds back into the risk engine, lowering risk scores and raising farm health.

---

## 🚀 Key Modules & Capabilities

### 1. 🛡️ Farm Health Command Center (`/dashboard`)
- Real-time gauge of **Farm Health Score** (0–100) and risk tiering (Low, Moderate, High, Critical).
- **Explainable "Why?" Modal**: Mathematical breakdown of exact point additions/deductions driving risk.
- 5-factor component breakdown: Disease Risk, Weather Risk, Irrigation Health, Crop Condition, Outbreak Exposure.
- 7-day historical health trend chart powered by Recharts.

### 2. 🔬 AI Crop Doctor 2.0 (`/doctor`)
- Multimodal image diagnosis for plant foliage.
- **Judge-Friendly Preloaded Test Samples**: Instant testing of Tomato Early Blight, Paddy Leaf Blast, Cotton Leaf Curl, and Healthy Control leaves without manual image hunting.
- Categorized treatment plans: Organic/Biological Controls, Chemical Protocols, Long-term Field Prevention.
- **Strict Chemical Safety Advisory**: Clear guidance ensuring farmers consult registered labels and local extension officers.
- **Save to Field Timeline**: Directly records scan results into field history.

### 3. 📡 Disease Outbreak Radar (`/radar`)
- Geospatial mapping powered by Leaflet and OpenStreetMap.
- Real-time cluster radius visualization for active regional disease outbreaks.
- Filterable by crop (Tomato, Paddy, Cotton, Chilli) and severity (High, Moderate, Low).
- Proximity warning banner calculating exposure distance to user fields.
- Transparent disclosure badge: *Demo Regional Outbreak Dataset*.

### 4. 🤖 AgriShield Farm Copilot (`/copilot`)
- Context-aware conversational AI assistant powered by Google Gemini 2.5 Flash via secure server-side API proxy.
- Automatically injects live farm state: health score, field statuses, ambient temperature/humidity, and regional alerts.
- Suggested query chips for rapid demonstration.
- Clear mode disclosure: Live Gemini AI vs. Deterministic Agronomic Fallback.

### 5. 🌿 Crop Tracker & Lifecycle Management (`/fields`)
- Comprehensive overview of all registered fields (Tomato Arka Rakshak, Paddy IR64, Bt Cotton Bollgard II, Red Chilli Guntur Sannam).
- Deep-dive metadata: Variety, acreage, growth stage, sowing date, soil moisture.
- Chronological field event timeline logging planting, irrigation, diagnosis scans, and alerts.

### 6. 🌤️ Weather Intelligence (`/weather`)
- Live hyper-local agro-meteorological forecasting via Open-Meteo API.
- **Pathogen Germination Risk Meter**: Evaluates relative humidity thresholds (>75%) and leaf wetness duration.
- 5-day agricultural microclimate forecast with temperature ranges and rain likelihood.
- Agronomic spraying advisory to avoid pesticide runoff during rain windows.

### 7. ✅ Action Center (`/actions`)
- Prioritized task checklist (Immediate, Routine, Monitoring).
- Interactive completion toggle: marking tasks resolved instantly applies relief points in the risk engine.
- Explicit risk factor driver tags on every action item.

### 8. 📊 Market Intelligence (`/market`)
- APMC mandi price indices for major regional commodities (Tomato, Paddy, Cotton, Chilli).
- Economic protection modeling calculating crop loss exposure vs. preventive input ROI (~35x return on investment).

### 9. ⚡ Predictive Impact Simulator (`/simulator`)
- Interactive decision sandbox answering: *"What happens if I delay action?"*
- Compares 3 scenarios: **Treat Now (Immediate)**, **Delay 3 Days**, and **Ignore Warning**.
- Displays projected health scores, yield loss estimates, and pathogen progression dynamics.

### 10. 🌐 Multilingual Accessibility
- Full native language localization across **English (EN)**, **Kannada (ಕನ್ನಡ)**, **Hindi (हिन्दी)**, and **Tamil (தமிழ்)**.
- Instant toggle from the top navigation bar without page reloads.

---

## 🔒 Responsible AI Safeguards

1. **Zero Client-Side Secrets**: All Gemini AI credentials are strictly handled server-side via Express / Vercel Serverless endpoints. No keys are ever exposed in client code or bundle artifacts.
2. **Deterministic Fallback Transparency**: If external APIs or networks are unavailable, AgriShield X gracefully switches to verified agronomic fallback models and explicitly labels responses as *Demo / Fallback Mode*.
3. **No Invented Chemical Dosages**: Rather than hallucinating chemical mixture ratios, the system provides standard active ingredient guidance paired with mandatory safety advisories.
4. **Explainable Decision Support**: Every risk metric is backed by transparent mathematical formulas visible through the *Explain Why* modal.

---

## 🛠️ System Architecture & Tech Stack

```
AgriShield-X/
├── api/                     # Vercel serverless function endpoints
│   ├── analyze-crop.js      # Serverless AI image diagnosis proxy
│   ├── copilot.js           # Serverless context-aware chat proxy
│   ├── weather.js           # Serverless Open-Meteo weather proxy
│   └── outbreak-reports.js  # Serverless regional disease dataset
├── backend/                 # Express backend API server (local & node environments)
│   ├── routes/api.js        # REST routes (/api/health, /api/weather, /api/ai/*)
│   ├── services/            # Gemini AI and Weather service integration
│   └── server.js            # Express server with SPA static file delivery
├── frontend/                # React 18 SPA with Vite & Tailwind CSS
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, WhyAlertModal, SampleLeafSelector
│   │   ├── context/         # FarmContext (global farm state & actions)
│   │   ├── data/            # Realistic baseline demo farm datasets
│   │   ├── i18n/            # UTF-8 translation dictionaries (EN, KN, HI, TA)
│   │   ├── pages/           # 10 core pages
│   │   └── utils/           # Explainable risk engine algorithm
│   └── vite.config.js       # Optimized Vite configuration with Rollup WASM bridge
└── vercel.json              # Full-stack Vercel deployment configuration
```

- **Frontend**: React 18, Vite 5, Tailwind CSS 3.4, Lucide Icons, Leaflet & React-Leaflet, Recharts.
- **Backend & Proxy**: Node.js, Express, Google Generative AI SDK (`@google/generative-ai`), Vercel Serverless.
- **External Services**: Google Gemini 2.5 Flash, Open-Meteo Weather API, OpenStreetMap tiles.

---

## 💻 Local Setup & Quickstart

### Prerequisites
- Node.js 18+ (tested up to Node.js 24)
- npm 9+

### 1. Clone & Install
```bash
git clone https://github.com/akashgamerz6575-spec/AgriShield-X.git
cd AgriShield-X
npm install
```

### 2. Configure Environment (Optional for Live Gemini AI)
Create a `.env` file in the root or `backend/` directory:
```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
```
> *Note: If `GEMINI_API_KEY` is not provided, AgriShield X automatically operates in high-fidelity deterministic demo mode so all features remain 100% interactive for testing and judging.*

### 3. Run Development Servers
To run both backend and frontend concurrently:
```bash
# Terminal 1 (Backend API on http://localhost:5000):
npm run dev:backend

# Terminal 2 (Frontend Dev Server on http://localhost:3000):
npm run dev:frontend
```

### 4. Build for Production
```bash
npm run build
npm start
```
The Express server will build and serve the optimized production single-page application at `http://localhost:5000`.

---

## 🚀 Deployment (Vercel)

AgriShield X is pre-configured for one-click deployment on **Vercel** with full serverless API routing via `vercel.json`:
1. Push repository to GitHub.
2. Import project into Vercel.
3. Configure Environment Variables: `GEMINI_API_KEY` (optional for live AI).
4. Set Build Command: `npm run build:frontend`.
5. Set Output Directory: `frontend/dist`.

---

## 👥 HackDevengers 2.0 Team
Developed with ❤️ by the AgriShield X Team for HackDevengers 2.0.