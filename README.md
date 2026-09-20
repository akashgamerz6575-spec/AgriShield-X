# AgriShield X

**Crop protection is a decision problem, not just an image-classification problem.**

AgriShield X turns fragmented crop-health signals into an explainable, multilingual action loop — helping farmers move from observation to informed action, field by field.

---

## Live Demo

**Production:** [https://agrishield-x.vercel.app](https://agrishield-x.vercel.app)
**Repository:** [https://github.com/akashgamerz6575-spec/AgriShield-X](https://github.com/akashgamerz6575-spec/AgriShield-X)

---

## The Problem

Plant-health management is often reactive.

Image-based disease detection can identify a problem after symptoms become visible — but diagnosis alone does not answer the full operational question a farmer faces every day.

Weather information exists. Crop condition observations exist. Field data exists. Disease guidance exists. Disease pressure from nearby farms may exist.

Yet these signals often remain disconnected.

The farmer still has to manually interpret those fragments and answer:

- Is my field becoming risky — and why?
- Which of my fields deserves attention first?
- What should I actually do, and when?
- Can I understand the recommendation clearly in my language?
- Did the action I took actually help?

The result is a familiar failure pattern:

```
FRAGMENTED SIGNALS
  → MANUAL INTERPRETATION
    → REACTIVE / UNCERTAIN DECISIONS
```

The FAO estimates that plant pests and diseases are responsible for roughly **20–40% of global crop yield losses annually** — a significant share of which occurs where early-warning systems and decision support are absent or inaccessible.
([FAO, The State of Food and Agriculture, 2023](https://www.fao.org/publications/sofa))

### The Design Question

> "What if crop protection worked less like a disease search engine and more like an explainable early-warning and decision-support system?"

---

## The Solution

**AgriShield X turns fragmented crop-health signals into an explainable, multilingual action loop.**

The system brings crop observations, weather, field context, and regional disease signals together — weighs them against each other, surfaces the most urgent priority, explains why, and suggests the next step in the farmer's language.

### Signal → Decision Architecture

```
  Crop Image
+ Weather Conditions
+ Farm / Field Context
+ Crop State
+ Regional Disease Signals
        ↓
  Explainable Risk Model
        ↓
  Prioritized Alert
        ↓
  Multilingual Recommendation
        ↓
  Action
        ↓
  Tracking / Reassessment
```

### The Operational Loop

```
OBSERVE → DIAGNOSE → PREDICT → EXPLAIN → COMMUNICATE → ACT → TRACK
```

Every module in AgriShield X exists to serve one step in this loop.

---

## Why AgriShield X Is Different

### Diagnosis is only one signal

Gemini Crop Doctor provides multimodal visual analysis of a leaf image — but a photograph of one leaf does not represent a whole farm. AgriShield X places the diagnosis result into field context before raising an alert.

### Context changes risk

The same disease symptom carries different urgency depending on current weather, crop growth stage, field moisture, and nearby disease pressure. AgriShield X weights these signals together rather than treating each in isolation.

### Risk should be explainable

A score of `Risk = 95` without explanation is not decision support. AgriShield X shows contributing factors clearly:

| Factor | Direction |
| :--- | :--- |
| Disease pressure (active infection) | Increases risk |
| Weather risk (humidity, leaf wetness forecast) | Increases risk |
| Irrigation / soil moisture condition | Increases or decreases risk |
| Crop condition / growth stage | Increases or decreases risk |
| Regional outbreak proximity | Increases risk |
| Completed mitigation actions | Decreases risk |

Every risk alert has a **"Why?"** button that exposes the exact factor breakdown.

### Alerts should lead to action

A warning without a next step is incomplete. Every alert in AgriShield X connects directly to the Action Center with a prioritized recommendation.

### Action should close the loop

```
Detect → Understand → Act → Reassess
```

When a farmer marks an action complete, the risk model immediately re-evaluates and the health score updates — creating a feedback loop rather than a one-shot notification.

### Intelligence should speak the user's language

English, Kannada, Hindi, and Tamil are part of the usability strategy, not an afterthought. See the dedicated accessibility section below.

---

## Example Decision Flow

> *This is a prototype/demo workflow using a pre-seeded farm scenario. It does not imply scientifically validated disease forecasting.*

**Field A — Tomato (Demo Scenario)**

1. **Crop Doctor** identifies visual evidence consistent with Early Blight from an uploaded leaf image.
2. **Weather module** reports humidity above 75% — conditions favorable for fungal progression.
3. **Outbreak Radar** shows simulated regional disease clusters within proximity of the farm.
4. **Farm context** identifies the affected field, crop variety, and current growth stage.
5. **Risk model** combines those signals into a weighted health score with factor-level transparency.
6. **Dashboard** raises a prioritized alert at the top of the command center.
7. **"Why?"** modal explains the exact contribution of each factor to the current score.
8. **Action Center** surfaces a concrete next step: inspect lower canopy, apply preventive treatment.
9. **Farm Copilot** explains the situation in the farmer's selected language — with context drawn from the active farm state.

---

## Core Product Modules

| Route | Module | Purpose in the Loop |
| :--- | :--- | :--- |
| `/dashboard` | **Farm Command Center** | Aggregated health score, prioritized alert, risk factor drivers, field overview, 7-day trend |
| `/doctor` | **AI Crop Doctor** | Gemini multimodal leaf analysis — disease identification, severity, organic and chemical treatment protocols |
| `/copilot` | **Farm Copilot** | Gemini-powered agronomic assistant with live farm context injection |
| `/radar` | **Outbreak Radar** | Regional disease pressure map (simulated dataset) with proximity alerts |
| `/fields` | **Crop Tracker** | Field registry, crop metadata, growth stage, event timeline |
| `/weather` | **Weather Intelligence** | Live agro-meteorological data from Open-Meteo; spraying window advisory |
| `/actions` | **Action Center** | Prioritized task list; completing tasks reduces risk score in real time |
| `/market` | **Market Intelligence** | Representative commodity price benchmarks and economic loss modeling |
| `/simulator` | **Impact Simulator** | Scenario modeling — treat now vs. delay vs. ignore |

---

## Intelligence Should Speak the Farmer's Language

A technically correct recommendation has limited practical value if the person making the decision cannot comfortably understand it.

```
INSIGHT → UNDERSTANDING → ACTION
```

This is an accessibility and design decision, not cosmetic translation.

AgriShield X currently supports:

| Language | Coverage |
| :--- | :--- |
| English | Full interface + Copilot AI advisory |
| Kannada (ಕನ್ನಡ) | Full interface + Copilot AI advisory |
| Hindi (हिन्दी) | Full interface + Copilot AI advisory |
| Tamil (தமிழ்) | Full interface + Copilot AI advisory |

Language selection applies uniformly across alerts, action recommendations, and Copilot responses. Switching language requires no page reload.

---

## Architecture & Technical Implementation

```
AgriShield-X/
├── api/                        # Vercel serverless function endpoints
│   ├── analyze-crop.js         # AI image diagnosis proxy (Gemini)
│   ├── copilot.js              # Farm Copilot proxy (Gemini + farm context)
│   ├── weather.js              # Open-Meteo weather proxy
│   ├── outbreak-reports.js     # Regional disease dataset endpoint
│   └── health.js               # API health and Gemini connectivity check
├── backend/                    # Express backend server (local dev)
│   ├── routes/api.js           # REST routes
│   ├── services/               # Gemini and Weather service integrations
│   └── server.js               # Express server with SPA delivery
├── frontend/                   # React 18 SPA (Vite + Tailwind CSS)
│   └── src/
│       ├── components/         # Navbar, Sidebar, WhyAlertModal, SampleLeafSelector
│       ├── context/            # FarmContext — global farm state and actions
│       ├── data/               # Pre-seeded demo farm datasets
│       ├── i18n/               # UTF-8 translation dictionaries (EN, KN, HI, TA)
│       ├── pages/              # 9 core application pages
│       └── utils/              # Explainable risk engine algorithm
└── vercel.json                 # Full-stack Vercel deployment configuration
```

---

## Real vs. Demo / Simulated Data

AgriShield X explicitly distinguishes live integrations from demo or simulated data.

| Capability | Implementation | Status |
| :--- | :--- | :--- |
| Crop image analysis | Gemini 2.5 Flash multimodal AI | **Real AI** |
| Farm Copilot | Gemini 2.5 Flash + live farm context | **Real AI** |
| Weather data | Open-Meteo API | **Live external data** |
| Demo farm state | Pre-seeded application data (4 fields, crops, events) | **Demo** |
| Regional outbreak signals | Regional dataset (Raichur District scenario) | **Simulated** |
| Risk engine | Explainable deterministic weighted model | **Prototype** |
| Market intelligence | Representative regional benchmark dataset | **Demo** |
| Economic impact modeling | Scenario-based calculation | **Prototype estimate** |

---

## Responsible AI & Limitations

AgriShield X is a decision-support prototype.

**It does not replace:**
- Agronomists or plant pathologists
- Local agricultural extension officers
- Verified pesticide product labels and manufacturer guidance
- State or national disease surveillance authorities

**Specific disclosures:**

- **AI states are disclosed:** Live Gemini responses are labeled as such. If Gemini is unavailable, the system falls back to deterministic agronomic guidance labeled clearly as *Demo / Fallback Mode*.
- **Outbreak data is disclosed as simulated:** The Outbreak Radar displays a fictional regional dataset to demonstrate proximity alerting architecture. It does not reflect actual disease surveillance data.
- **Market data is representative:** Commodity prices are calibrated against historical Agmarknet benchmarks for scenario modeling, not live price feeds.
- **Economic calculations are scenarios:** ROI and yield loss figures in the Impact Simulator are scenario models, not financial projections or guarantees.
- **Risk score is explainable but not scientifically validated:** The 0–100 Farm Health Score reacts to real inputs and is fully transparent, but it is a prototype weighting model, not a peer-reviewed forecasting instrument.
- **Chemical guidance follows the label principle:** The application references standard active ingredients and directs users to registered product labels and professional guidance. It does not generate arbitrary dosages.
- **No secrets in client code:** All Gemini API credentials are handled server-side via Express or Vercel Serverless functions. No keys are exposed in the browser bundle.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | React 18, Vite 5, Tailwind CSS 3.4 |
| Icons | Lucide React |
| Charts | Recharts |
| Maps | Leaflet + React-Leaflet |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Weather | Open-Meteo API |
| Backend | Node.js, Express |
| Deployment | Vercel (serverless API + static SPA) |

---

## Local Setup

### Prerequisites
- Node.js 18+ (tested to Node.js 24)
- npm 9+

### 1. Clone & Install

```bash
git clone https://github.com/akashgamerz6575-spec/AgriShield-X.git
cd AgriShield-X
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
```

> If `GEMINI_API_KEY` is not provided, AgriShield X operates in deterministic fallback mode. All features remain interactive — the Copilot and Crop Doctor respond using verified agronomic fallback content, labeled clearly as *Demo Mode*.

### 3. Run Development Servers

```bash
# Terminal 1 — Backend API (http://localhost:5000)
npm run dev:backend

# Terminal 2 — Frontend dev server (http://localhost:3000)
npm run dev:frontend
```

### 4. Production Build

```bash
npm run build
npm start
```

---

## Vercel Deployment

AgriShield X is pre-configured for Vercel via `vercel.json`:

1. Push repository to GitHub.
2. Import project into Vercel (connect to GitHub repository).
3. Add environment variable: `GEMINI_API_KEY`.
4. Build command: `npm run build` (or `npm run build:frontend`).
5. Output directory: `frontend/dist`.

Vercel handles serverless API routing automatically via the rewrite rules in `vercel.json`.

---

## HackDevengers 2.0

Developed for **HackDevengers 2.0** by the AgriShield X Team.
