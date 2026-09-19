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

      const systemPrompt = `You are AgriShield Copilot, an expert AI agronomic advisor.
Active Farm Context:
- Farm Health Score: ${farmContext?.healthScore || 5}/100 (${farmContext?.statusText || "Critical Risk"})
- Weather: Humidity ${farmContext?.humidity || 84}%, Rain Probability ${farmContext?.rainProbability || 75}%
- Active Alert: Early Blight on Field A (Tomato)

CRITICAL INTENT RULES:
1. If the user asks a GENERAL agriculture or horticultural question (e.g. crop growth duration, sunlight, plant spacing, botany, soil type, pests for watermelon, chilli, mango, sugarcane, etc.), ANSWER THE SPECIFIC QUESTION DIRECTLY AND SCIENTIFICALLY FIRST. Do NOT inject or mention unrelated Field A, Early Blight, or farm alert context unless specifically asked.
2. If the user asks a FARM-SPECIFIC question (e.g. should I irrigate, why is my health score low, field status, current farm risk), ground your response in the farm telemetry provided above.
3. LANGUAGE: Respond entirely in ${targetLang}.
4. FORMATTING: Use clean formatting without raw markdown symbols.`;

      const result = await model.generateContent([
        { text: systemPrompt },
        { text: "User Question: " + prompt }
      ]);
      const response = await result.response;
      return res.status(200).json({
        reply: response.text(),
        mode: "gemini_live",
        isDemo: false
      });
    } catch (err) {
      console.warn("[AgriShield Copilot] Gemini API error, switching to fallback:", err.message);
    }
  }

  // Deterministic Fallback
  const q = (prompt || "").toLowerCase();
  let reply = "";

  if (q.includes('watermelon') || q.includes('ಕಲ್ಲಂಗಡಿ') || q.includes('तरबूज') || q.includes('தர்பூசணி')) {
    if (lang === 'kn') {
      reply = "ಕಲ್ಲಂಗಡಿ (Watermelon) ಬೀಜ ಮೊಳಕೆಯೊಡೆದ ನಂತರ ಪೂರ್ಣ ಕೊಯ್ಲಿಗೆ ಬರಲು ಸಾಮಾನ್ಯವಾಗಿ 70 ರಿಂದ 90 ದಿನಗಳು (ಸುಮಾರು 10 ರಿಂದ 12 ವಾರಗಳು) ಬೇಕಾಗುತ್ತದೆ. ಸಕ್ಕರೆ ಬೇಬಿ (Sugar Baby) ತಳಿಗಳಿಗೆ ಸುಮಾರು 75 ದಿನಗಳು ಬೇಕಾದರೆ, ದೊಡ್ಡ ತಳಿಗಳಿಗೆ 85–90 ದಿನಗಳು ಬೇಕು. ಕೊಯ್ಲಿನ ಸಂಕೇತವೆಂದರೆ ನೆಲಕ್ಕೆ ತಾಗುವ ಭಾಗವು ಕೆನೆ-ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು ಮತ್ತು ಹತ್ತಿರದ ಬಳ್ಳಿಯ ತಂತು ಒಣಗುವುದು.";
    } else if (lang === 'hi') {
      reply = "तरबूज (Watermelon) को बीज अंकुरण से पूरी तरह पकने और कटाई तक आमतौर पर 70 से 90 दिन (लगभग 10 से 12 सप्ताह) का समय लगता है। शुगर बेबी जैसी किस्में लगभग 75 दिनों में तैयार हो जाती हैं, जबकि बड़ी किस्में 85-90 दिन लेती हैं।";
    } else if (lang === 'ta') {
      reply = "தர்பூசணி (Watermelon) விதை முளைத்ததிலிருந்து முழுமையாக அறுவடைக்கு வர பொதுவாக 70 முதல் 90 நாட்கள் (சுமார் 10 முதல் 12 வாரங்கள்) ஆகும். சர்க்கரை பேபி போன்ற குறுகிய கால ரகங்கள் சுமார் 75 நாட்களிலும், பெரிய ரகங்கள் 85-90 நாட்களிலும் முதிர்ச்சியடையும்.";
    } else {
      reply = "Watermelon (Citrullus lanatus) typically takes 70 to 90 days (10 to 12 weeks) from seed germination to reach full harvest maturity, depending on the cultivar. Early-maturing varieties like Sugar Baby require approximately 75 days, while larger varieties like Charleston Gray need 85–90 days. Primary harvest indicators include a dull hollow thud when tapped, drying of the nearest stem tendril, and a creamy-yellow ground spot.";
    }
  } else if (q.includes('sunlight') || q.includes('ಬಿಸಿಲು') || q.includes('धूप') || q.includes('சூரிய ஒளி') || (q.includes('chilli') && q.includes('need') && !q.includes('irrigate'))) {
    if (lang === 'kn') {
      reply = "ಮೆಣಸಿನಕಾಯಿ (Chilli) ಬೆಳೆಗೆ ದಿನಕ್ಕೆ ಕನಿಷ್ಠ 6 ರಿಂದ 8 ಗಂಟೆಗಳ ಕಾಲ ಪೂರ್ಣ, ನೇರ ಸೂರ್ಯನ ಬೆಳಕು ಅಗತ್ಯವಿದೆ. ಸಮರ್ಪಕ ಬಿಸಿಲು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ಹೆಚ್ಚಿಸಿ, ಗಿಡಗಳ ದೃಢ ಬೆಳವಣಿಗೆ, ಹೆಚ್ಚಿನ ಹೂಬಿಡುವಿಕೆ ಮತ್ತು ಉತ್ತಮ ಖಾರ ಹಾಗೂ ಬಣ್ಣಕ್ಕೆ ಸಹಕಾರಿಯಾಗಿದೆ.";
    } else if (lang === 'hi') {
      reply = "मिर्च (Chilli) की फसल को प्रतिदिन कम से कम 6 से 8 घंटे की भरपूर सीधी धूप की आवश्यकता होती है। पर्याप्त धूप पौधों को मजबूत बनाती है और अधिक फूल व फल लाने में मदद करती है।";
    } else if (lang === 'ta') {
      reply = "மிளகாய் (Chilli) பயிருக்கு நாள்தோறும் குறைந்தது 6 முதல் 8 மணி நேரம் நேரடி சூரிய ஒளி தேவைப்படுகிறது. போதுமான சூரிய ஒளி செடிகள் திடமாக வளரவும், அதிக பூக்கள் பூக்கவும் உதவுகிறது.";
    } else {
      reply = "Chilli (Capsicum annuum) plants require full, direct sunlight—ideally 6 to 8 hours of unfiltered sunlight per day. Adequate sunlight ensures strong vegetative branching, stimulates abundant flowering, and optimizes fruit set and capsaicin development.";
    }
  } else if (q.includes('early blight') || q.includes('treat') || q.includes('ಚಿಕಿತ್ಸೆ') || q.includes('उपचार') || q.includes('சிகிச்சை')) {
    if (lang === 'kn') {
      reply = "ಅರ್ಲಿ ಬ್ಲೈಟ್ (Alternaria solani) ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ ಕ್ರಮಗಳು:\n• ಸಾವಯವ / ಜೈವಿಕ ಆಯ್ಕೆಗಳು: ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ ಅಥವಾ ಕಾಪರ್ ಆಕ್ಟಾನೋಯೇಟ್ ಸಿಂಪಡಿಸಿ. ಸೋಂಕಿತ ಕೆಳ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ನಾಶಪಡಿಸಿ.\n• ಲೇಬಲ್-ಅನುಸರಣೆಯ ರಾಸಾಯನಿಕ ಮಾರ್ಗದರ್ಶನ: ಲೇಬಲ್ ಸೂಚನೆಯಂತೆ ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಅಥವಾ ಕ್ಲೋರೋಥಲೋನಿಲ್ ಸಿಂಪಡಿಸಿ.\n• ಕೃಷಿ ಪದ್ಧತಿ: ಎಲೆಗಳು ಒದ್ದೆಯಾಗುವುದನ್ನು ತಡೆಯಲು ಹನಿ ನೀರಾವರಿ ಬಳಸಿ.";
    } else if (lang === 'hi') {
      reply = "अर्ली ब्लाइट (Alternaria solani) के उपचार:\n• जैविक उपचार विकल्प: बैसिलस सबटिलिस या कॉपर ऑक्टानोएट का छिड़काव करें।\n• लेबल-अनुपालन रासायनिक मार्गदर्शन: पंजीकृत उत्पाद लेबल के अनुसार मैंकोजेब 75% WP या क्लोरोथैलोनिल का छिड़काव करें।\n• कृषि प्रबंधन: पत्तियों को सूखा रखने के लिए ड्रिप सिंचाई अपनाएं।";
    } else if (lang === 'ta') {
      reply = "தக்காளி கருகல் நோய் (Alternaria solani) முறைகள்:\n• இயற்கை சிகிச்சை முறைகள்: பேசிலஸ் சப்டிலிஸ் அல்லது காப்பர் ஆக்டானோயேட் தெளிக்கவும்.\n• லேபிள்-இணக்கமான இரசாயன வழிகாட்டுதல்: மேன்கோசெப் 75% WP அல்லது குளோரோதலோனில் தெளிக்கவும்.\n• பயிர் மேலாண்மை: சொட்டு நீர்ப்பாசனம் செய்யவும்.";
    } else {
      reply = "Management protocols for Early Blight (Alternaria solani):\n• Organic / Biological Options: Apply Bacillus subtilis or copper octanoate bio-fungicide. Prune lower infected leaves 15 cm above ground.\n• Label-Compliant Chemical Guidance: Apply Chlorothalonil or Mancozeb 75% WP according to registered label directions. Alternate with Azoxystrobin to prevent resistance.\n• Agronomic Practices: Switch to drip irrigation to prevent leaf wetness.";
    }
  } else if (q.includes('mandi') || q.includes('market') || q.includes('price') || q.includes('ಮಾರುಕಟ್ಟೆ') || q.includes('ದರ') || q.includes('मंडी') || q.includes('भाव') || q.includes('சந்தை') || q.includes('விலை')) {
    if (lang === 'kn') {
      reply = "ನಮ್ಮ ಡೆಮೋ ಮಾರುಕಟ್ಟೆ ಡೇಟಾಸೆಟ್ (APMC ಬೆಂಚ್‌ಮಾರ್ಕ್ ಆಧಾರಿತ) ಪ್ರಕಾರ, ರಾಯಚೂರು / ಕೋಲಾರ APMC ಯಲ್ಲಿ ಟೊಮೇಟೊ ಧಾರಣೆ ಪ್ರಸ್ತುತ ಕ್ವಿಂಟಾಲ್‌ಗೆ ~₹2,850 ರಂತೆ ಏರಿಕೆಯ ಹಾದಿಯಲ್ಲಿದೆ (+₹180 / 6.7% ಹೆಚ್ಚಳ).";
    } else if (lang === 'hi') {
      reply = "हमारे डेमो मार्केट डेटासेट (APMC बेंचमार्क पर आधारित) के अनुसार, रायचूर / कोलार मंडी में टमाटर की कीमतें वर्तमान में ~₹2,850 प्रति क्विंटल (+₹180 / 6.7% उछाल) के साथ तेजी में हैं।";
    } else if (lang === 'ta') {
      reply = "எங்கள் மாதிரி சந்தை தரவுத்தொகுப்பின்படி (APMC விலை நிலவரம்), ராயச்சூர் / கோலார் சந்தையில் தக்காளி விலை தற்போது குவிண்டாலுக்கு ~₹2,850 ஆக (+₹180 / 6.7% உயர்வு) அதிகரித்து வருகிறது.";
    } else {
      reply = "According to our Demo Market Dataset (calibrated against regional APMC benchmarks), Tomato prices in Raichur / Kolar APMC are currently trending upward at approximately ₹2,850 per Quintal (+₹180 / +6.7% momentum).";
    }
  } else if (q.includes('health score') || q.includes('score 5') || (q.includes('why') && q.includes('5')) || q.includes('ಆರೋಗ್ಯ') || q.includes('ಸ್ಕೋರ್ 5') || q.includes('स्वास्थ्य') || q.includes('நல மதிப்பெண்')) {
    if (lang === 'kn') {
      reply = "ನಿಮ್ಮ ಕೃಷಿ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ 5/100 (ಗಂಭೀರ ಅಪಾಯ) ಆಗಿದೆ ಏಕೆಂದರೆ ಇದು ಒಟ್ಟು ಲೆಕ್ಕಹಾಕಿದ ಅಪಾಯದ ಸ್ಕೋರ್ 95/100 ರ ವಿರುದ್ಧ ಸೂಚ್ಯಂಕವಾಗಿದೆ (ಆರೋಗ್ಯ ಸ್ಕೋರ್ = 100 - ಅಪಾಯದ ಸ್ಕೋರ್). ಮುಖ್ಯ ಕಾರಣಗಳು: ಕ್ಷೇತ್ರ A ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಶಿಲೀಂಧ್ರ ಸೋಂಕು, 84% ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮತ್ತು 12 ಕಿಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ರೋಗದ ಹರಡುವಿಕೆ.";
    } else if (lang === 'hi') {
      reply = "आपका फार्म स्वास्थ्य स्कोर वर्तमान में 5/100 (गंभीर जोखिम) है क्योंकि यह 95/100 के समग्र जोखिम स्कोर का उलटा (100 - जोखिम स्कोर) है। मुख्य कारण: खेत A में अर्ली ब्लाइट, 84% आर्द्रता और 12 किमी के भीतर क्षेत्रीय प्रकोप क्लस्टर।";
    } else if (lang === 'ta') {
      reply = "உங்கள் பண்ணை நல மதிப்பெண் தற்போது 5/100 (தீவிர ஆபத்து) ஆக உள்ளது. இது கணக்கிடப்பட்ட 95/100 இடர் மதிப்பெண்ணின் தலைகீழ் கணக்கீடாகும் (நல மதிப்பெண் = 100 - இடர் மதிப்பெண்). முக்கிய காரணங்கள்: புலம் A இல் தீவிர கருகல் நோய் தாக்கம், 84% அதிக ஈரப்பதம், மற்றும் 12 கிமீ தொலைவில் உள்ள பிரಾந்திய நோய் பரவல்.";
    } else {
      reply = "Your Farm Health Score is currently at 5/100 (Critical Risk) because it is calculated as the inverse of your composite Farm Risk Score of 95/100 (Health Score = 100 - Risk Score). Driven by active Early Blight on Field A, 84% humidity, and 12 km proximity to regional outbreak clusters.";
    }
  } else if (q.includes('irrigate') || q.includes('water') || q.includes('field a') || q.includes('ನೀರಾವರಿ') || q.includes('ನೀರು') || q.includes('सिंचाई') || q.includes('पानी') || q.includes('பாசனம்') || q.includes('தண்ணீர்')) {
    if (lang === 'kn') {
      reply = "ನಿಮ್ಮ ಕೃಷಿ ಮಾಹಿತಿಯ ಪ್ರಕಾರ: ಕ್ಷೇತ್ರ A (ಟೊಮೇಟೊ) ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ ಮತ್ತು ಆರ್ದ್ರತೆ 84% ಇದೆ. ಮಳೆಯ ಮುನ್ಸೂಚನೆಯೂ ಇರುವುದರಿಂದ ಎಲೆಗಳ ತೇವಾಂಶ ಕಡಿಮೆ ಮಾಡಲು ಕ್ಷೇತ್ರ A ಗೆ ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ. ಅತ್ಯಗತ್ಯವಿದ್ದರೆ ಬೇರುಗಳಿಗೆ ಮಾತ್ರ ಹನಿ ನೀರಾವರಿ ನೀಡಿ.";
    } else if (lang === 'hi') {
      reply = "खेत A (टमाटर) में अर्ली ब्लाइट सक्रिय है और आर्द्रता 84% है। बारिश का पूर्वानुमान होने से पत्तियों के गीलेपन को कम करने के लिए खेत A में स्प्रिंकलर सिंचाई स्थगित करें। आवश्यकता होने पर केवल जड़ों में ड्रिप सिंचाई करें।";
    } else if (lang === 'ta') {
      reply = "உங்கள் பண்ணை தரவுகளின்படி: புலம் A (தக்காளி) இல் கருகல் நோய் தாக்கம் உள்ளது மற்றும் ஈரப்பதம் 84% அதிகமாக உள்ளது. இலைகளில் ஈரப்பதத்தைக் குறைக்க புலம் A க்கான தெளிப்பு நீர்ப்பாசனத்தைத் தள்ளிப்போடுங்கள். தேவைப்பட்டால் சொட்டு நீர்ப்பாசனம் மூலம் வேருக்கு மட்டும் நீர் பாய்ச்சவும்.";
    } else {
      reply = "Based on your live farm context: You should delay overhead sprinkler irrigation for Field A (Tomato) tomorrow. Ambient humidity is currently elevated at 84% and rain probability is high (75%). Overhead irrigation will prolong leaf wetness and accelerate fungal spore germination. If soil moisture is critical, apply low-volume drip irrigation directly at root level.";
    }
  } else {
    if (lang === 'kn') {
      reply = "AgriShield ಕೋಪೈಲಟ್ ವಿಶ್ಲೇಷಣೆ: ನಿಮ್ಮ 4 ಕ್ಷೇತ್ರಗಳು ಪ್ರಸ್ತುತ 5/100 ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕದಲ್ಲಿವೆ (ಗಂಭೀರ ಅಪಾಯ). ಆರ್ದ್ರತೆ ಹೆಚ್ಚಿರುವುದರಿಂದ (84%), ಟೊಮೇಟೊಗೆ ಶಿಲೀಂಧ್ರ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ. ಕಾರ್ಯ ಕೇಂದ್ರದಲ್ಲಿರುವ ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಕಾರ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.";
    } else if (lang === 'hi') {
      reply = "AgriShield कोपायलट विश्लेषण: आपके 4 पंजीकृत खेत वर्तमान में 5/100 स्वास्थ्य स्कोर पर हैं (गंभीर जोखिम)। उच्च आर्द्रता (84%) से टमाटर में फंगल जोखिम बढ़ा हुआ है। कार्य केंद्र के कार्यों की समीक्षा करें।";
    } else if (lang === 'ta') {
      reply = "AgriShield கோபிலாட் பகுப்பாய்வு: உங்கள் 4 வயல்கள் 5/100 ஆரோக்கிய மதிப்பெண்ணில் செயல்படுகின்றன (தீவிர ஆபத்து). ஈரப்பதம் 84% ஆக உள்ளதால் பூஞ்சை ஆபத்து உள்ளது. செயல் மைய பணிகளை முடிக்கவும்.";
    } else {
      reply = "AgriShield Copilot analysis: Your 4 registered fields (Tomato, Paddy, Cotton, Chilli) operate at a composite Farm Health Score of 5/100 (Critical Risk). Ambient humidity is 84%. Review high-priority items in your Action Center to restore farm health.";
    }
  }

  return res.status(200).json({
    reply,
    mode: "deterministic_fallback",
    isDemo: true,
    disclaimer: "AgriShield X provides decision support. Consult local agricultural extension officers for critical chemical applications."
  });
}
