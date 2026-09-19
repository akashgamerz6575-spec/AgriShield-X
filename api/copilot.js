import { GoogleGenerativeAI } from "@google/generative-ai";

const getLangName = (lang) => {
  switch (lang) {
    case 'kn': return 'Kannada (ಕನ್ನಡ)';
    case 'hi': return 'Hindi (हिन्दी)';
    case 'ta': return 'Tamil (தமிழ்)';
    default: return 'English';
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt, farmContext, lang = "en" } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Prompt query is required" });

  const targetLang = getLangName(lang);
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "YOUR_GEMINI_API_KEY" && apiKey.trim() !== "") {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt = `You are AgriShield Copilot, an AI agronomic advisor for precision crop protection.
Active Farm Context:
- Farm Health Score: ${farmContext?.healthScore || 5}/100 (${farmContext?.statusText || "Critical Risk"})
- Weather: Humidity ${farmContext?.humidity || 82}%, Rain Probability ${farmContext?.rainProbability || 75}%
- Active Alert: Early Blight on Field A (Tomato)

CRITICAL LANGUAGE INSTRUCTION:
You MUST respond entirely in ${targetLang}.
Keep your reply structured, concise, respectful, and actionable.

User Question: ${prompt}`;

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

  if (lang === 'kn') {
    if (query.includes("irrigate") || query.includes("ನೀರಾವರಿ") || query.includes("ನೀರು")) {
      reply = "ಕ್ಷೇತ್ರ A (ಟೊಮೇಟೊ) ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಸಕ್ರಿಯವಾಗಿದೆ ಮತ್ತು ಆರ್ದ್ರತೆ ಹೆಚ್ಚಾಗಿದೆ (82%). ಮಳೆಯೂ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಎಲೆಗಳ ತೇವಾಂಶ ಕಡಿಮೆ ಮಾಡಲು ಕ್ಷೇತ್ರ A ಗೆ ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ.";
    } else {
      reply = "AgriShield ಕೋಪೈಲಟ್ ವಿಶ್ಲೇಷಣೆ: ನಿಮ್ಮ ಕೃಷಿ ಆರೋಗ್ಯ ಸ್ಕೋರ್ 5/100 (ತೀವ್ರ ಅಪಾಯ) ಆಗಿದೆ. ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆಯು ರೋಗ ಹರಡುವಿಕೆಯನ್ನು ಪ್ರೇರೇಪಿಸುತ್ತದೆ. ಕಾರ್ಯ ಕೇಂದ್ರದಲ್ಲಿರುವ ತುರ್ತು ಕಾರ್ಯಗಳನ್ನು ಪರಿಹರಿಸಿ.";
    }
  } else if (lang === 'hi') {
    if (query.includes("irrigate") || query.includes("सिंचाई") || query.includes("पानी")) {
      reply = "खेत A (टमाटर) में अर्ली ब्लाइट सक्रिय है और आर्द्रता अधिक है (82%)। बारिश का भी पूर्वानुमान है। पत्तियों के गीलेपन को कम करने के लिए खेत A में स्प्रिंकलर सिंचाई स्थगित करें।";
    } else {
      reply = "AgriShield कोपायलट विश्लेषण: आपका फार्म स्वास्थ्य स्कोर 5/100 (गंभीर जोखिम) है। उच्च आर्द्रता से फंगल जोखिम बढ़ा हुआ है। कार्य केंद्र के कार्यों को तुरंत पूरा करें।";
    }
  } else if (lang === 'ta') {
    if (query.includes("irrigate") || query.includes("பாசனம்") || query.includes("தண்ணீர்")) {
      reply = "புலம் A (தக்காளி) இல் கருகல் நோய் தாக்கம் உள்ளது மற்றும் ஈரப்பதம் 82% அதிகமாக உள்ளது. இலைகளில் ஈரப்பதத்தைக் குறைக்க புலம் A க்கான தெளிப்பு நீர்ப்பாசனத்தைத் தள்ளிப்போடுங்கள்.";
    } else {
      reply = "AgriShield கோபிலாட் பகுப்பாய்வு: உங்கள் பண்ணை ஆரோக்கிய மதிப்பெண் 5/100 (முக்கிய ஆபத்து) ஆக உள்ளது. செயல் மைய பணிகளை விரைவாக முடிக்கவும்.";
    }
  } else {
    if (query.includes("irrigate") || query.includes("water")) {
      reply = "Based on your live farm context, Field A (Tomato) has an active Early Blight warning and humidity is high (82%). Rain is also expected. Recommendation: Delay overhead sprinkler irrigation for Field A to prevent leaf wetness duration. Soil moisture for Paddy (Field B) remains optimal.";
    } else {
      reply = "AgriShield Copilot analysis: Your 4 registered fields operate at an aggregate Farm Health Score of 5/100 (Critical Risk). High humidity (82%) elevates fungal risk for tomato crops. Inspect Field A and complete high-priority tasks in your Action Center.";
    }
  }

  return res.status(200).json({
    reply,
    mode: "Demo Copilot",
    isDemo: true,
    disclaimer: "AgriShield X provides decision support. Consult local agricultural extension officers for critical chemical applications."
  });
}
