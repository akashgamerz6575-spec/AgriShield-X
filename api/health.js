import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  let geminiTest = null;
  let geminiError = null;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });
      const result = await model.generateContent('Reply AGRISHIELD_AI_OK');
      geminiTest = result.response.text().trim();
    } catch (e) {
      geminiError = {
        message: (e.message || String(e)).replace(/key=[^&\s]+/gi, 'key=***REDACTED***'),
        status: e.status || e.statusCode || null
      };
    }
  }

  res.status(200).json({
    status: 'ok',
    app: 'AgriShield X API',
    timestamp: new Date().toISOString(),
    aiProvider: apiKey ? 'Google Gemini AI (Live Key Configured)' : 'Deterministic AI Demo Mode',
    geminiTest,
    geminiError
  });
}
