import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini Service for AgriShield X
 * Proxy for crop image analysis and context-aware agricultural copilot.
 * Gracefully falls back to deterministic AI analysis if API key is missing or fails.
 */

export const analyzeCropImage = async (base64Image, mimeType = 'image/jpeg') => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY' && apiKey.trim() !== '') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Try gemini-2.5-flash or gemini-1.5-flash
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `You are AgriShield X, an advanced AI agricultural disease diagnostics system.
Analyze the provided crop/plant image.
1. Check if the image contains a plant, leaf, or crop. If NOT, return strict JSON: {"isCrop": false, "reason": "Not a recognized plant or crop image."}.
2. If it IS a crop, identify the plant, disease/health condition, severity, estimated affected surface area percentage, spread risk, action urgency, visible visual symptoms, organic & chemical treatments, prevention steps, and explainable visual reasoning.

Return output STRICTLY as valid JSON with this exact structure (no extra markdown outside json):
{
  "isCrop": true,
  "data": {
    "cropType": "Tomato",
    "diseaseName": "Early Blight (Alternaria solani)",
    "confidence": 92,
    "severity": "High",
    "affectedArea": 28,
    "spreadRisk": "High",
    "urgency": "Treat within 24-48 hours",
    "symptoms": [
      "Target-board dark brown concentric lesions on lower leaves",
      "Yellow chlorotic halo surrounding tissue",
      "Leaf wilting and premature dropping"
    ],
    "treatment": {
      "organic": ["Apply copper octanoate formulation weekly", "Prune lower infected leaves 6 inches above soil"],
      "chemical": ["Apply Chlorothalonil or Mancozeb fungicide spray", "Use azoxystrobin for systematic protection"]
    },
    "prevention": [
      "Ensure 3-foot spacing between plants for canopy ventilation",
      "Mulch soil base to prevent fungal spore soil-splash",
      "Use drip irrigation instead of overhead spray"
    ],
    "explanation": "Observed dark concentric ring patterns characteristic of Alternaria solani. High ambient humidity accelerates leaf spot enlargement."
  }
}`;

      const imagePart = {
        inlineData: {
          data: base64Image.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: mimeType || 'image/jpeg'
        }
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          ...parsed,
          mode: 'ai_live'
        };
      }
    } catch (err) {
      console.warn('[AgriShield AI Proxy] Gemini API call failed or unconfigured, switching to deterministic demo fallback:', err.message);
    }
  }

  // Deterministic Demo Fallback
  return getDeterministicCropAnalysis(base64Image);
};

export const getCopilotResponse = async (userPrompt, farmContext = {}) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY' && apiKey.trim() !== '') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt = `You are AgriShield Copilot, an AI agronomic advisor for precision crop protection.
Active Farm Context:
- Farm Health Score: ${farmContext.healthScore || 78}/100 (${farmContext.riskTier || 'Moderate Risk'})
- Registered Fields: ${JSON.stringify(farmContext.fieldsSummary || ['Field A: Tomato (Early Blight Risk)', 'Field B: Paddy (Healthy)', 'Field C: Cotton (Irrigation Due)', 'Field D: Chilli (Outbreak Alert)'])}
- Current Weather: Temp ${farmContext.weather?.temp || '28'}°C, Humidity ${farmContext.weather?.humidity || '82'}%, Forecast: ${farmContext.weather?.forecast || 'Rain expected tomorrow'}
- Regional Outbreak Status: ${farmContext.outbreakAlert || 'Early Blight cluster detected 12km away'}

Answer the farmer's query concisely, using known farm context directly. Keep tone encouraging, professional, and practical. Always append a concise responsible AI advisory note if suggesting chemicals.
Query: ${userPrompt}`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      return {
        reply: response.text(),
        mode: 'ai_live'
      };
    } catch (err) {
      console.warn('[AgriShield AI Copilot] Gemini API error, returning context fallback:', err.message);
    }
  }

  return getDeterministicCopilotResponse(userPrompt, farmContext);
};

// Deterministic Analysis Generator for robust demo / fallback
function getDeterministicCropAnalysis(base64Image) {
  // Simple heuristic or pre-configured realistic diagnose based on mock inputs
  return {
    isCrop: true,
    mode: 'demo',
    data: {
      cropType: 'Tomato (Arka Rakshak)',
      diseaseName: 'Early Blight (Alternaria solani)',
      confidence: 94,
      severity: 'High',
      affectedArea: 26,
      spreadRisk: 'High',
      urgency: 'Treat within 24–48 hours',
      symptoms: [
        'Concentric brown "bullseye" spots on mature lower foliage',
        'Chlorotic yellow halos surrounding dark leaf lesions',
        'Defoliation starting from canopy base upward'
      ],
      treatment: {
        organic: [
          'Spray bio-fungicide Bacillus subtilis or Copper octanoate',
          'Remove infected lower leaves immediately and dispose away from farm'
        ],
        chemical: [
          'Apply Mancozeb 75% WP @ 2g/L water',
          'Alternate with Azoxystrobin 23% SC @ 1ml/L after 7 days'
        ]
      },
      prevention: [
        'Avoid evening sprinkler irrigation to keep leaf wetness duration low',
        'Apply straw mulch around tomato roots to prevent soil spore splash',
        'Maintain 3-foot inter-row spacing for rapid leaf drying'
      ],
      explanation: 'Detected characteristic concentric ring brown lesions with chlorotic yellow margins on tomato foliage. High humidity (82%) accelerates fungal spore germ tube elongation.'
    }
  };
}

function getDeterministicCopilotResponse(userPrompt, farmContext = {}) {
  const query = (userPrompt || '').toLowerCase();

  let reply = '';

  if (query.includes('irrigate') || query.includes('water')) {
    reply = `Based on your farm context, Field A (Tomato) currently has an active **Early Blight** alert and humidity is high (${farmContext.weather?.humidity || 82}%). Rainfall is also expected in your region tomorrow. **Recommendation**: Delay overhead irrigation for Field A today to prevent prolonged leaf wetness. Soil moisture for Paddy (Field B) remains optimal.`;
  } else if (query.includes('high risk') || query.includes('field a') || query.includes('score') || query.includes('why')) {
    reply = `Your Farm Health Score is currently **${farmContext.healthScore || 78}/100 (Moderate Risk)**. The top driver raising risk is Field A (Tomato) due to:
1. High humidity (+18 pts risk driver)
2. Nearby regional Early Blight outbreak cluster within 12km (+16 pts)
3. Recent foliage symptom reports (+14 pts).

Completing the task "Inspect Tomato Field A & Apply Mulch" will immediately lower your farm risk score by 12 points.`;
  } else if (query.includes('early blight') || query.includes('blight') || query.includes('disease')) {
    reply = `Early Blight (*Alternaria solani*) thrives when leaf wetness exceeds 6 hours at 24-28°C. For Field A:
- **Immediate Action**: Prune infected lower leaves up to 15cm from ground.
- **Organic Treatment**: Apply Copper Hydroxide spray.
- **Preventive Measure**: Avoid sprinkler irrigation; switch to drip irrigation lines.`;
  } else {
    reply = `AgriShield Copilot analyzed your farm status: Your 4 fields (Tomato, Paddy, Cotton, Chilli) are currently operating at a aggregate Farm Health Score of **${farmContext.healthScore || 78}/100**. Humidity is elevated (${farmContext.weather?.humidity || 82}%), so fungal risk remains elevated for tomatoes. Consider reviewing your high-priority items in the Action Center.`;
  }

  return {
    reply,
    mode: 'demo',
    disclaimer: 'AgriShield X provides decision support. Verify critical chemical applications with local agricultural extension officers.'
  };
}
