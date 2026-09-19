import express from 'express';
import { analyzeCropImage, getCopilotResponse } from '../services/geminiService.js';
import { getWeatherForecast } from '../services/weatherService.js';

const router = express.Router();

// System Health Endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'AgriShield X API',
    timestamp: new Date().toISOString(),
    aiProvider: process.env.GEMINI_API_KEY ? 'Google Gemini AI (Live)' : 'Deterministic AI Demo Mode'
  });
});

// Crop Image Analysis
router.post('/ai/analyze-crop', async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Base64 image string is required' });
    }
    const result = await analyzeCropImage(image, mimeType);
    res.json(result);
  } catch (error) {
    console.error('[API Error /ai/analyze-crop]:', error);
    res.status(500).json({ error: 'Failed to complete image diagnosis', message: error.message });
  }
});

// AgriShield Copilot Chat
router.post('/ai/copilot', async (req, res) => {
  try {
    const { prompt, farmContext } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt query is required' });
    }
    const result = await getCopilotResponse(prompt, farmContext);
    res.json(result);
  } catch (error) {
    console.error('[API Error /ai/copilot]:', error);
    res.status(500).json({ error: 'Failed to fetch copilot response', message: error.message });
  }
});

// Weather Intelligence Endpoint
router.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const weather = await getWeatherForecast(lat ? parseFloat(lat) : 12.9716, lon ? parseFloat(lon) : 77.5946);
    res.json(weather);
  } catch (error) {
    console.error('[API Error /weather]:', error);
    res.status(500).json({ error: 'Failed to fetch weather metrics' });
  }
});

// Regional Disease Outbreak Dataset Endpoint
router.get('/outbreak-reports', (req, res) => {
  res.json({
    source: 'Demo Regional Disease Dataset',
    lastUpdated: new Date().toISOString(),
    clusterAlerts: [
      {
        id: 'outbreak-01',
        disease: 'Early Blight (Alternaria solani)',
        crop: 'Tomato',
        severity: 'High',
        reportCount: 9,
        timeframe: 'Last 72 hours',
        radiusKm: 15,
        lat: 13.0125,
        lng: 77.5684,
        locationName: 'Kolar - Chikkaballapur Agri Belt',
        proximityToUserFarm: '12 km North-East',
        impactOnUser: 'High risk exposure to Field A (Tomato)'
      },
      {
        id: 'outbreak-02',
        disease: 'Paddy Leaf Blast (Magnaporthe oryzae)',
        crop: 'Paddy',
        severity: 'Moderate',
        reportCount: 4,
        timeframe: 'Last 48 hours',
        radiusKm: 25,
        lat: 12.8942,
        lng: 77.4912,
        locationName: 'Mandya - Ramanagara District',
        proximityToUserFarm: '28 km South-West',
        impactOnUser: 'Low-Moderate exposure to Field B (Paddy)'
      },
      {
        id: 'outbreak-03',
        disease: 'Cotton Leaf Curl Virus',
        crop: 'Cotton',
        severity: 'Moderate',
        reportCount: 3,
        timeframe: 'Last 24 hours',
        radiusKm: 40,
        lat: 13.1500,
        lng: 77.7000,
        locationName: 'Davanagere Cotton Zone',
        proximityToUserFarm: '42 km North',
        impactOnUser: 'Monitoring recommended for Field C'
      },
      {
        id: 'outbreak-04',
        disease: 'Chilli Anthracnose (Fruit Rot)',
        crop: 'Chilli',
        severity: 'Critical',
        reportCount: 12,
        timeframe: 'Last 72 hours',
        radiusKm: 18,
        lat: 12.9200,
        lng: 77.6800,
        locationName: 'Guntur - Bengaluru Highway Belt',
        proximityToUserFarm: '16 km East',
        impactOnUser: 'Elevated risk warning for Field D (Chilli)'
      }
    ]
  });
});

export default router;
