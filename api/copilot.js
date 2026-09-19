import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt, farmContext } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Prompt query is required" });

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "YOUR_GEMINI_API_KEY" && apiKey.trim() !== "") {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt = `You are AgriShield Copilot, an AI agronomic advisor for precision crop protection.
Active Farm Context:
- Farm Health Score: ${farmContext?.healthScore || 78}/100 (${farmContext?.riskTier || "Moderate Risk"})
- Registered Fields: ${JSON.stringify(farmContext?.fieldsSummary || ["Field A: Tomato (Early Blight)", "Field B: Paddy (Healthy)", "Field C: Cotton (Irrigation Due)", "Field D: Chilli (Outbreak Exposure)"])}
- Current Weather: Temp ${farmContext?.weather?.temp || "28"}°C, Humidity ${farmContext?.weather?.humidity || "82"}%, Forecast: ${farmContext?.weather?.forecast || "Rain expected"}
- Regional Outbreak Status: ${farmContext?.outbreakAlert || "Early Blight cluster detected 12km away"}

Answer the farmer query concisely using known context. Append a responsible advisory note if recommending chemical products.
Query: ${prompt}`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      return res.status(200).json({
        reply: response.text(),
        mode: "AI Copilot",
        isDemo: false
      });
    } catch (err) {
      console.warn("[AgriShield Copilot] Gemini API error, switching to fallback:", err.message);
    }
  }

  // Fallback Response
  const query = (prompt || "").toLowerCase();
  let reply = "";

  if (query.includes("irrigate") || query.includes("water")) {
    reply = `Based on your live farm context, Field A (Tomato) has an active Early Blight warning and humidity is high (${farmContext?.weather?.humidity || 82}%). Rain is also expected. Recommendation: Delay overhead sprinkler irrigation for Field A to prevent leaf wetness duration. Soil moisture for Paddy (Field B) remains optimal.`;
  } else if (query.includes("high risk") || query.includes("field a") || query.includes("score") || query.includes("why")) {
    reply = `Your Farm Health Score is currently ${farmContext?.healthScore || 78}/100 (${farmContext?.riskTier || "Moderate Risk"}). Top drivers raising risk:
1. High humidity (+18 pts risk driver)
2. Nearby regional Early Blight outbreak cluster within 12km (+16 pts)
3. Recent foliage symptom scan (+14 pts).

Completing the task "Inspect Tomato Field A & Apply Mulch" will lower your risk score by 12 points.`;
  } else {
    reply = `AgriShield Copilot analyzed your farm state: Your 4 registered fields (Tomato, Paddy, Cotton, Chilli) operate at an aggregate Farm Health Score of ${farmContext?.healthScore || 78}/100. Humidity is high (${farmContext?.weather?.humidity || 82}%), so fungal risk remains elevated for tomato fields. Review high-priority items in Action Center.`;
  }

  return res.status(200).json({
    reply,
    mode: "Demo Copilot",
    isDemo: true,
    disclaimer: "AgriShield X provides decision support. Consult local agricultural extension officers for critical chemical applications."
  });
}
