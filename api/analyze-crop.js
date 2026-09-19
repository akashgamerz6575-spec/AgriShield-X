import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { image, mimeType } = req.body || {};
  if (!image) return res.status(400).json({ error: "Base64 image is required" });

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "YOUR_GEMINI_API_KEY" && apiKey.trim() !== "") {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `You are AgriShield X, an advanced AI agricultural disease diagnostics system.
Analyze the provided crop/plant image.
1. Verify if the image contains a plant, leaf, or crop. If NOT, return strict JSON: {"isCrop": false, "reason": "Not a recognized plant or crop image."}.
2. If it IS a crop, identify the plant, disease/health condition, severity, estimated affected surface area percentage, spread risk, action urgency, visible visual symptoms, organic & chemical treatment categories, prevention steps, and explainable visual reasoning.
CRITICAL SAFETY INSTRUCTION: Do NOT fabricate chemical dosage quantities. Instruct the user to verify exact chemical dosage and application rates on the registered product label or with local agricultural extension officers.

Return output STRICTLY as valid JSON with this exact structure:
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
      "chemical": ["Apply Chlorothalonil or Mancozeb protective fungicide spray", "Use azoxystrobin for systematic protection"],
      "safetyAdvisory": "Verify exact chemical dosage and application rates against registered product labels or consult local agricultural extension officers."
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
          data: image.replace(/^data:image\/\w+;base64,/, ""),
          mimeType: mimeType || "image/jpeg"
        }
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.status(200).json({
          ...parsed,
          analysisMode: "AI Analysis",
          isDemo: false
        });
      }
    } catch (err) {
      console.warn("[AgriShield AI] Gemini API call failed, switching to demo fallback:", err.message);
    }
  }

  // Mandatory Fallback Transparency
  return res.status(200).json({
    isCrop: true,
    analysisMode: "Demo Analysis",
    isDemo: true,
    data: {
      cropType: "Tomato (Arka Rakshak)",
      diseaseName: "Early Blight (Alternaria solani)",
      confidence: 94,
      severity: "High",
      affectedArea: 26,
      spreadRisk: "High",
      urgency: "Treat within 24–48 hours",
      symptoms: [
        "Concentric brown target-ring spots on mature lower foliage",
        "Chlorotic yellow halos surrounding dark leaf lesions",
        "Defoliation starting from canopy base upward"
      ],
      treatment: {
        organic: [
          "Spray bio-fungicide Bacillus subtilis or Copper octanoate",
          "Remove infected lower leaves immediately and dispose away from field"
        ],
        chemical: [
          "Apply protective fungicide (e.g. Mancozeb or Chlorothalonil)",
          "Alternate with systematic azoxystrobin spray if infection persists"
        ],
        safetyAdvisory: "Verify exact chemical dosage and application rates against registered product labels or consult local agricultural extension officers before application."
      },
      prevention: [
        "Avoid evening sprinkler irrigation to limit leaf wetness duration",
        "Apply organic straw mulch around tomato roots to prevent soil spore splash",
        "Maintain proper inter-row spacing for rapid leaf drying"
      ],
      explanation: "Detected characteristic concentric ring brown lesions with chlorotic yellow margins on tomato foliage. Elevated relative humidity accelerates spore tube elongation."
    }
  });
}
