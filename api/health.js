export default async function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    app: 'AgriShield X API',
    timestamp: new Date().toISOString(),
    aiProvider: process.env.GEMINI_API_KEY ? 'Google Gemini AI (Live Key Configured)' : 'Deterministic AI Demo Mode'
  });
}
