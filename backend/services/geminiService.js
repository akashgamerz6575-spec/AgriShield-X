import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini Service for AgriShield X
 * Proxy for crop image analysis and context-aware agricultural copilot.
 * Gracefully falls back to deterministic AI analysis if API key is missing or fails.
 */

const getLangName = (lang) => {
  switch (lang) {
    case 'kn': return 'Kannada (ಕನ್ನಡ)';
    case 'hi': return 'Hindi (हिन्दी)';
    case 'ta': return 'Tamil (தமிழ்)';
    default: return 'English';
  }
};

export const analyzeCropImage = async (base64Image, mimeType = 'image/jpeg', lang = 'en') => {
  const apiKey = process.env.GEMINI_API_KEY;
  const targetLang = getLangName(lang);

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY' && apiKey.trim() !== '') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `You are AgriShield X, an advanced AI agricultural disease diagnostics system.
Analyze the provided crop/plant image.
1. Check if the image contains a plant, leaf, or crop. If NOT, return strict JSON: {"isCrop": false, "reason": "Not a recognized plant or crop image."}.
2. If it IS a crop, identify the plant, disease/health condition, severity, estimated affected surface area percentage, spread risk, action urgency, visible visual symptoms, organic & chemical treatments, prevention steps, and explainable visual reasoning.

CRITICAL LANGUAGE INSTRUCTION:
You MUST generate all user-facing prose (symptoms, organic/chemical treatments, safety advisory, prevention, explainable visual reasoning) in ${targetLang}.
Preserve standard scientific Latin binomials (e.g. Alternaria solani, Magnaporthe oryzae) in their standard form.
Do NOT generate unsupported or speculative chemical pesticide dosages; advise verifying exact dosage against registered product labels.

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
      "organic": ["Apply copper octanoate formulation or Bacillus subtilis", "Prune lower infected leaves 15 cm above soil"],
      "chemical": ["Apply Chlorothalonil or Mancozeb protective spray in accordance with product label", "Use azoxystrobin for systematic rotation if needed"],
      "safetyAdvisory": "Verify exact chemical dosage, mixing ratios, and pre-harvest intervals against registered product labels. Always consult local agricultural extension officers before application. Do not apply unsupported pesticide dosages."
    },
    "prevention": [
      "Ensure proper plant spacing for canopy ventilation",
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
  return getDeterministicCropAnalysis(base64Image, lang);
};

export const getCopilotResponse = async (userPrompt, farmContext = {}, lang = 'en') => {
  const apiKey = process.env.GEMINI_API_KEY;
  const targetLang = getLangName(lang);

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY' && apiKey.trim() !== '') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const contextPrompt = `You are AgriShield Copilot, an expert AI agronomist providing actionable, scientific crop protection advice to Indian farmers.
Active Farm Telemetry:
- Composite Farm Health Score: ${farmContext.healthScore ?? 5} / 100 (${farmContext.statusText ?? 'Critical Risk'})
- Weather: Humidity ${farmContext.humidity ?? 84}%, Rain Probability ${farmContext.rainProbability ?? 75}%
- Active Alert: Early Blight on Field A (Tomato)
- Registered Fields: Tomato (Field A), Paddy (Field B), Bt Cotton (Field C), Red Chilli (Field D)

CRITICAL INTENT RULES:
1. If the user asks a GENERAL agriculture or horticultural question (e.g. crop growth duration, sunlight, plant spacing, botany, soil type, pests for watermelon, chilli, mango, sugarcane, etc.), ANSWER THE SPECIFIC QUESTION DIRECTLY AND SCIENTIFICALLY FIRST. Do NOT inject or mention unrelated Field A, Early Blight, or farm alert context unless specifically asked.
2. If the user asks a FARM-SPECIFIC question (e.g. should I irrigate, why is my health score low, field status, current farm risk), ground your response in the farm telemetry provided above.
3. LANGUAGE: Respond entirely in ${targetLang}.
4. FORMATTING: Use clean formatting without raw markdown asterisks.

User Question: ${userPrompt}`;

      const result = await model.generateContent(contextPrompt);
      const response = await result.response;
      return {
        reply: response.text(),
        mode: 'gemini_live'
      };
    } catch (err) {
      console.warn('[AgriShield Copilot] Gemini API call failed, using deterministic agronomic fallback:', err.message);
    }
  }

  return getDeterministicCopilotReply(userPrompt, farmContext, lang);
};

const getDeterministicCropAnalysis = (base64Image, lang = 'en') => {
  if (lang === 'kn') {
    return {
      isCrop: true,
      mode: 'deterministic_demo',
      data: {
        cropType: 'ಟೊಮೇಟೊ (ಅರ್ಕ ರಕ್ಷಕ್)',
        diseaseName: 'Early Blight (Alternaria solani)',
        confidence: 94,
        severity: 'ಹೆಚ್ಚು',
        affectedArea: 26,
        spreadRisk: 'ಹೆಚ್ಚು',
        urgency: '24-48 ಗಂಟೆಗಳಲ್ಲಿ ಚಿಕಿತ್ಸೆ ನೀಡಿ',
        symptoms: [
          'ಪಕ್ವ ಎಲೆಗಳ ಮೇಲೆ ಏಕಕೇಂದ್ರಕ ಉಂಗುರದಂತಹ ಕಂದು ಕಲೆಗಳು',
          'ನೆಕ್ರೋಟಿಕ್ ಕಲೆಗಳ ಸುತ್ತಲೂ ಹಳದಿ ವರ್ತುಲ',
          'ಕೆಳಭಾಗದ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಉದುರುವುದು'
        ],
        treatment: {
          organic: [
            'ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ ಅಥವಾ ಕಾಪರ್ ಆಕ್ಟಾನೋಯೇಟ್ ಸಿಂಪಡಿಸಿ',
            'ನೆಲದಿಂದ 15 ಸೆಂ.ಮೀ ಎತ್ತರದವರೆಗೆ ಸೋಂಕಿತ ಕೆಳ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ತೆಗೆಯಿರಿ'
          ],
          chemical: [
            'ನೋಂದಾಯಿತ ಲೇಬಲ್ ಸೂಚನೆಯಂತೆ ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಅಥವಾ ಕ್ಲೋರೋಥಲೋನಿಲ್ ಸಿಂಪಡಿಸಿ',
            'ಶಿಲೀಂಧ್ರ ಪ್ರತಿರೋಧ ತಡೆಯಲು ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ ಜೊತೆ ಬದಲಾಯಿಸಿ'
          ],
          safetyAdvisory: 'ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆಗೆ ಮುನ್ನ ನೋಂದಾಯಿತ ಲೇಬಲ್ ಸೂಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ. ಅನಧಿಕೃತ ಕೀಟನಾಶಕ ಪ್ರಮಾಣ ಬಳಸಬೇಡಿ.'
        },
        prevention: [
          'ಶಿಲೀಂಧ್ರ ಹರಡುವಿಕೆಯನ್ನು ತಡೆಯಲು ಹನಿ ನೀರಾವರಿ ಬಳಸಿ',
          'ಮಣ್ಣಿನ ತೇವಾಂಶ ನಿಯಂತ್ರಿಸಲು ಒಣ ಹುಲ್ಲಿನ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಹಾಕಿ',
          'ಗಾಳಿಯಾಡುವಿಕೆಗೆ ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ'
        ],
        explanation: 'ದೃಶ್ಯ ವಿಶ್ಲೇಷಣೆಯು Alternaria solani ನ ವಿಶಿಷ್ಟ ಏಕಕೇಂದ್ರಕ ಉಂಗುರದ ಲಕ್ಷಣಗಳನ್ನು ದೃಢಪಡಿಸಿದೆ. ಹೆಚ್ಚಿನ ತೇವಾಂಶವು ರೋಗ ಹರಡುವಿಕೆಯನ್ನು ವೇಗಗೊಳಿಸುತ್ತದೆ.'
      }
    };
  }

  if (lang === 'hi') {
    return {
      isCrop: true,
      mode: 'deterministic_demo',
      data: {
        cropType: 'टमाटर (अर्का रक्षक)',
        diseaseName: 'Early Blight (Alternaria solani)',
        confidence: 94,
        severity: 'उच्च',
        affectedArea: 26,
        spreadRisk: 'उच्च',
        urgency: '24-48 घंटों के भीतर उपचार करें',
        symptoms: [
          'निचली पत्तियों पर संकेंद्रित छल्लों जैसे गहरे भूरे धब्बे',
          'घावों के चारों ओर पीला क्लोरोटिक घेरा',
          'निचली पत्तियों का समय से पहले सूखना'
        ],
        treatment: {
          organic: [
            'बैसिलस सबटिलिस बायो-फंगीसाइड या कॉपर ऑक्टानोएट का छिड़काव करें',
            'जमीन से 15 सेमी ऊपर तक संक्रमित निचली पत्तियों को काटें'
          ],
          chemical: [
            'पंजीकृत उत्पाद लेबल के अनुसार मैंकोजेब 75% WP या क्लोरोथैलोनिल का छिड़काव करें',
            'कवक प्रतिरोध से बचने के लिए एजोक्सीस्ट्रोबिन के साथ चक्रानुक्रम करें'
          ],
          safetyAdvisory: 'रासायनिक कीटनाशक छिड़काव से पहले उत्पाद लेबल निर्देशों की पुष्टि करें। स्थानीय कृषि विस्तार अधिकारी से परामर्श लें।'
        },
        prevention: [
          'ओवरहेड स्प्रे के स्थान पर ड्रिप सिंचाई का प्रयोग करें',
          'मिट्टी के छींटों को रोकने के लिए पुआल की मल्चिंग लगाएं',
          'हवा के संचलन के लिए पौधों के बीच पर्याप्त दूरी सुनिश्चित करें'
        ],
        explanation: 'दृश्य विश्लेषण में Alternaria solani के संकेंद्रित वलय पैटर्न की पहचान हुई है।'
      }
    };
  }

  if (lang === 'ta') {
    return {
      isCrop: true,
      mode: 'deterministic_demo',
      data: {
        cropType: 'தக்காளி (அர்கா ரக்ஷக்)',
        diseaseName: 'Early Blight (Alternaria solani)',
        confidence: 94,
        severity: 'அதிகம்',
        affectedArea: 26,
        spreadRisk: 'அதிகம்',
        urgency: '24-48 மணி நேரத்திற்குள் சிகிச்சை',
        symptoms: [
          'முதிர்ந்த இலைகளில் வளைய வடிவிலான அடர் பழுப்பு புள்ளிகள்',
          'புள்ளிகளைச் சுற்றி மஞ்சள் நிற வளையங்கள்',
          'கீழ் இலைகள் முன்கூட்டியே உதிர்தல்'
        ],
        treatment: {
          organic: [
            'பாசில்லஸ் சப்டிலிஸ் அல்லது காப்பர் ஆக்டானோயேட் தெளிக்கவும்',
            'பாதிக்கப்பட்ட கீழ் இலைகளை 15 செ.மீ வரை கத்தரிக்கவும்'
          ],
          chemical: [
            'பதிவுசெய்யப்பட்ட லேபிள் வழிமுறைகளின்படி மேன்கோசெப் 75% WP அல்லது குளோரோதலோனில் தெளிக்கவும்',
            'பூஞ்சை எதிர்ப்பைத் தடுக்க அசோக்சிஸ்ட்ரோபின் மாற்றாகப் பயன்படுத்தவும்'
          ],
          safetyAdvisory: 'வேதியியல் மருந்துகளைப் பயன்படுத்துவதற்கு முன் தயாரிப்பு லேபிள் வழிமுறைகளைப் படிக்கவும்.'
        },
        prevention: [
          'தெளிப்பு நீர்ப்பாசனத்திற்குப் பதிலாக சொட்டு நீர்ப்பாசனத்தைப் பயன்படுத்தவும்',
          'மண் தெறிப்பதைத் தடுக்க வைக்கோல் மூடாக்கு இடவும்',
          'செடிகளுக்கு இடையே போதிய இடைவெளி விடவும்'
        ],
        explanation: 'காட்சி பகுப்பாய்வு Alternaria solani இன் வளைய வடிவ அறிகுறிகளை உறுதிப்படுத்துகிறது.'
      }
    };
  }

  return {
    isCrop: true,
    mode: 'deterministic_demo',
    data: {
      cropType: 'Tomato (Arka Rakshak)',
      diseaseName: 'Early Blight (Alternaria solani)',
      confidence: 94,
      severity: 'High',
      affectedArea: 26,
      spreadRisk: 'High',
      urgency: 'Treat within 24-48 hours',
      symptoms: [
        'Concentric brown target-ring spots on mature lower foliage',
        'Chlorotic yellow halos surrounding dark leaf lesions',
        'Defoliation starting from canopy base upward'
      ],
      treatment: {
        organic: [
          'Spray bio-fungicide Bacillus subtilis or Copper octanoate',
          'Remove infected lower leaves 15 cm above ground level and destroy crop residue'
        ],
        chemical: [
          'Apply Chlorothalonil or Mancozeb 75% WP in accordance with registered product label instructions',
          'Alternate with systematic azoxystrobin spray if infection persists to prevent resistance'
        ],
        safetyAdvisory: 'Verify exact chemical dosage, mixing ratios, and pre-harvest intervals against registered product labels. Always consult local agricultural extension officers before application. Do not apply unsupported pesticide dosages.'
      },
      prevention: [
        'Avoid evening sprinkler irrigation to limit leaf wetness duration',
        'Apply organic straw mulch around tomato roots to prevent soil spore splash',
        'Maintain proper inter-row spacing for rapid leaf drying'
      ],
      explanation: 'Detected characteristic concentric ring brown lesions with chlorotic yellow margins on tomato foliage. Elevated relative humidity accelerates spore tube elongation.'
    }
  };
};

const getDeterministicCopilotReply = (userPrompt, farmContext = {}, lang = 'en') => {
  const q = (userPrompt || '').toLowerCase();
  const humidity = farmContext.humidity ?? 84;
  const healthScore = farmContext.healthScore ?? 5;
  const statusText = farmContext.statusText ?? 'Critical Risk';

  // 1. Watermelon Growth Duration
  if (q.includes('watermelon') || q.includes('ಕಲ್ಲಂಗಡಿ') || q.includes('तरबूज') || q.includes('தர்பூசணி')) {
    if (lang === 'kn') {
      return {
        reply: "ಕಲ್ಲಂಗಡಿ (Watermelon) ಬೀಜ ಮೊಳಕೆಯೊಡೆದ ನಂತರ ಪೂರ್ಣ ಕೊಯ್ಲಿಗೆ ಬರಲು ಸಾಮಾನ್ಯವಾಗಿ 70 ರಿಂದ 90 ದಿನಗಳು (ಸುಮಾರು 10 ರಿಂದ 12 ವಾರಗಳು) ಬೇಕಾಗುತ್ತದೆ. ಸಕ್ಕರೆ ಬೇಬಿ (Sugar Baby) ತಳಿಗಳಿಗೆ ಸುಮಾರು 75 ದಿನಗಳು ಬೇಕಾದರೆ, ದೊಡ್ಡ ತಳಿಗಳಿಗೆ 85–90 ದಿನಗಳು ಬೇಕು. ಕೊಯ್ಲಿನ ಸಂಕೇತವೆಂದರೆ ನೆಲಕ್ಕೆ ತಾಗುವ ಭಾಗವು ಕೆನೆ-ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು ಮತ್ತು ಹತ್ತಿರದ ಬಳ್ಳಿಯ ತಂತು ಒಣಗುವುದು.",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'hi') {
      return {
        reply: "तरबूज (Watermelon) को बीज अंकुरण से पूरी तरह पकने और कटाई तक आमतौर पर 70 से 90 दिन (लगभग 10 से 12 सप्ताह) का समय लगता है। शुगर बेबी जैसी किस्में लगभग 75 दिनों में तैयार हो जाती हैं, जबकि बड़ी किस्में 85-90 दिन लेती हैं। पके तरबूज की पहचान तली का हल्का पीला होना और डंठल के पास की लता का सूखना है।",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'ta') {
      return {
        reply: "தர்பூசணி (Watermelon) விதை முளைத்ததிலிருந்து முழுமையாக அறுவடைக்கு வர பொதுவாக 70 முதல் 90 நாட்கள் (சுமார் 10 முதல் 12 வாரங்கள்) ஆகும். சர்க்கரை பேபி போன்ற குறுகிய கால ரகங்கள் சுமார் 75 நாட்களிலும், பெரிய ரகங்கள் 85-90 நாட்களிலும் முதிர்ச்சியடையும். அடிப்பகுதி வெளிர் மஞ்சள் நிறமாக மாறுவது அறுவடைக்கான அறிகுறியாகும்.",
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: "Watermelon (Citrullus lanatus) typically takes 70 to 90 days (10 to 12 weeks) from seed germination to reach full harvest maturity, depending on the cultivar. Early-maturing varieties like Sugar Baby require approximately 75 days, while larger varieties like Charleston Gray need 85–90 days. Primary harvest indicators include a dull hollow thud when tapped, drying of the nearest stem tendril, and a creamy-yellow ground spot.",
      mode: 'deterministic_fallback'
    };
  }

  // 2. Chilli Sunlight Requirements
  if (q.includes('sunlight') || q.includes('ಬಿಸಿಲು') || q.includes('धूप') || q.includes('சூரிய ஒளி') || (q.includes('chilli') && q.includes('need') && !q.includes('irrigate'))) {
    if (lang === 'kn') {
      return {
        reply: "ಮೆಣಸಿನಕಾಯಿ (Chilli) ಬೆಳೆಗೆ ದಿನಕ್ಕೆ ಕನಿಷ್ಠ 6 ರಿಂದ 8 ಗಂಟೆಗಳ ಕಾಲ ಪೂರ್ಣ, ನೇರ ಸೂರ್ಯನ ಬೆಳಕು ಅಗತ್ಯವಿದೆ. ಸಮರ್ಪಕ ಬಿಸಿಲು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ಹೆಚ್ಚಿಸಿ, ಗಿಡಗಳ ದೃಢ ಬೆಳವಣಿಗೆ, ಹೆಚ್ಚಿನ ಹೂಬಿಡುವಿಕೆ ಮತ್ತು ಉತ್ತಮ ಖಾರ ಹಾಗೂ ಬಣ್ಣಕ್ಕೆ ಸಹಕಾರಿಯಾಗಿದೆ. ಅತಿಯಾದ ನೆರಳಿನಲ್ಲಿ ಗಿಡಗಳು ಸಣಕಲಾಗಿ ಬೆಳೆದು ಹೂವುಗಳು ಉದುರಬಹುದು.",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'hi') {
      return {
        reply: "मिर्च (Chilli) की फसल को प्रतिदिन कम से कम 6 से 8 घंटे की भरपूर सीधी धूप की आवश्यकता होती है। पर्याप्त धूप पौधों को मजबूत बनाती है, प्रकाश संश्लेषण को बढ़ावा देती है और अधिक फूल व फल लाने में मदद करती है। अधिक छाया रहने से पौधे लंबे व कमजोर हो जाते हैं और फूल झड़ने लगते हैं।",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'ta') {
      return {
        reply: "மிளகாய் (Chilli) பயிருக்கு நாள்தோறும் குறைந்தது 6 முதல் 8 மணி நேரம் நேரடி சூரிய ஒளி தேவைப்படுகிறது. போதுமான சூரிய ஒளி செடிகள் திடமாக வளரவும், அதிக பூக்கள் பூக்கவும், பழங்கள் தரமாக உருவாகவும் அவசியமாகும். அதிக நிழல் இருந்தால் செடிகள் பலவீனமாகி பூக்கள் உதிர்ந்துவிடும்.",
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: "Chilli (Capsicum annuum) plants require full, direct sunlight—ideally 6 to 8 hours of unfiltered sunlight per day. Adequate sunlight ensures strong vegetative branching, stimulates abundant flowering, and optimizes fruit set and capsaicin development. Insufficient sunlight leads to leggy growth, premature flower drop, and increased susceptibility to fungal diseases.",
      mode: 'deterministic_fallback'
    };
  }

  // 3. Early Blight Treatment
  if (q.includes('early blight') || q.includes('treat') || q.includes('ಚಿಕಿತ್ಸೆ') || q.includes('उपचार') || q.includes('சிகிச்சை')) {
    if (lang === 'kn') {
      return {
        reply: "ಅರ್ಲಿ ಬ್ಲೈಟ್ (Alternaria solani) ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ ಪರಿಣಾಮಕಾರಿ ಕ್ರಮಗಳು:\n• ಸಾವಯವ / ಜೈವಿಕ ಆಯ್ಕೆಗಳು: ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ (Bacillus subtilis) ಅಥವಾ ಕಾಪರ್ ಆಕ್ಟಾನೋಯೇಟ್ ಸಿಂಪಡಿಸಿ. ನೆಲದಿಂದ 15 ಸೆಂ.ಮೀ ವರೆಗಿನ ಸೋಂಕಿತ ಕೆಳ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ತೋಟದಿಂದ ಹೊರಗೆ ನಾಶಪಡಿಸಿ.\n• ಲೇಬಲ್-ಅನುಸರಣೆಯ ರಾಸಾಯನಿಕ ಮಾರ್ಗದರ್ಶನ: ತೀವ್ರ ಹಂತದಲ್ಲಿ ಲೇಬಲ್ ಸೂಚನೆಯಂತೆ ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಅಥವಾ ಕ್ಲೋರೋಥಲೋನಿಲ್ ಸಿಂಪಡಿಸಿ. ಶಿಲೀಂಧ್ರ ಪ್ರತಿರೋಧ ತಡೆಯಲು ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ ಜೊತೆ ಬದಲಾಯಿಸಿ.\n• ಕೃಷಿ ಪದ್ಧತಿ: ಎಲೆಗಳು ಒದ್ದೆಯಾಗುವುದನ್ನು ತಡೆಯಲು ಹನಿ ನೀರಾವರಿ ಬಳಸಿ ಮತ್ತು ಮಣ್ಣಿನ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಹಾಕಿ.",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'hi') {
      return {
        reply: "अर्ली ब्लाइट (Alternaria solani) के प्रभावी उपचार:\n• जैविक उपचार विकल्प: बैसिलस सबटिलिस या कॉपर ऑक्टानोएट का छिड़काव करें। जमीन से 15 सेमी ऊपर तक की संक्रमित निचली पत्तियों की छंटाई करके नष्ट करें।\n• लेबल-अनुपालन रासायनिक मार्गदर्शन: गंभीर संक्रमण में पंजीकृत उत्पाद लेबल के अनुसार मैंकोजेब 75% WP या क्लोरोथैलोनिल का छिड़काव करें। कवक प्रतिरोध से बचने के लिए एजोक्सीस्ट्रोबिन के साथ चक्रानुक्रम करें।\n• कृषि प्रबंधन: पत्तियों को सूखा रखने के लिए ड्रिप सिंचाई अपनाएं और पुआल की मल्चिंग करें।",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'ta') {
      return {
        reply: "தக்காளி கருகல் நோய் (Alternaria solani) கட்டுப்படுத்தும் முறைகள்:\n• இயற்கை சிகிச்சை முறைகள்: பேசிலஸ் சப்டிலிஸ் அல்லது காப்பர் ஆக்டானோயேட் தெளிக்கவும். தரை மட்டத்திலிருந்து 15 செ.மீ உயரமுள்ள பாதிக்கப்பட்ட இலைகளை வெட்டி அழிக்கவும்.\n• லேபிள்-இணக்கமான இரசாயன வழிகாட்டுதல்: தீவிர பாதிப்புக்கு பதிவுசெய்யப்பட்ட லேபிள் வழிமுறைகளின்படி மேன்கோசெப் 75% WP அல்லது குளோரோதலோனில் தெளிக்கவும். பூஞ்சை எதிர்ப்பைத் தடுக்க அசோக்சிஸ்ட்ரோபின் மாற்றாகப் பயன்படுத்தவும்.\n• பயிர் மேலாண்மை: சொட்டு நீர்ப்பாசனம் செய்யவும் மற்றும் மண்ணிலிருந்து பூஞ்சை தெறிப்பதைத் தடுக்க மூடு பயிர் இடவும்.",
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: "Management protocols for Early Blight (Alternaria solani):\n• Organic / Biological Options: Apply Bacillus subtilis or copper octanoate bio-fungicide. Prune lower infected leaves 15 cm above ground level and destroy crop residue.\n• Label-Compliant Chemical Guidance: For active outbreaks, apply Chlorothalonil or Mancozeb 75% WP according to registered label directions. Alternate with Azoxystrobin to prevent fungicide resistance.\n• Agronomic Cultural Practices: Switch from overhead sprinkler to drip irrigation to minimize canopy wetness, and apply straw mulch to eliminate soil-splash spore dispersal.",
      mode: 'deterministic_fallback'
    };
  }

  // 4. Tomato Mandi Trend
  if (q.includes('mandi') || q.includes('market') || q.includes('price') || q.includes('ಮಾರುಕಟ್ಟೆ') || q.includes('ದರ') || q.includes('मंडी') || q.includes('भाव') || q.includes('சந்தை') || q.includes('விலை')) {
    if (lang === 'kn') {
      return {
        reply: "ನಮ್ಮ ಡೆಮೋ ಮಾರುಕಟ್ಟೆ ಡೇಟಾಸೆಟ್ (APMC ಬೆಂಚ್‌ಮಾರ್ಕ್ ಆಧಾರಿತ) ಪ್ರಕಾರ, ರಾಯಚೂರು / ಕೋಲಾರ APMC ಯಲ್ಲಿ ಟೊಮೇಟೊ ಧಾರಣೆ ಪ್ರಸ್ತುತ ಕ್ವಿಂಟಾಲ್‌ಗೆ ~₹2,850 ರಂತೆ ಏರಿಕೆಯ ಹಾದಿಯಲ್ಲಿದೆ (+₹180 / 6.7% ಹೆಚ್ಚಳ). ಮಳೆಯಿಂದಾಗಿ ಆವಕ ಕಡಿಮೆಯಾಗಿರುವುದರಿಂದ ರೋಗಮುಕ್ತ ಗುಣಮಟ್ಟದ ಬೆಳೆಗೆ ಉತ್ತಮ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಸಿಗುತ್ತಿದೆ.",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'hi') {
      return {
        reply: "हमारे डेमो मार्केट डेटासेट (APMC बेंचमार्क पर आधारित) के अनुसार, रायचूर / कोलार मंडी में टमाटर की कीमतें वर्तमान में ~₹2,850 प्रति क्विंटल (+₹180 / 6.7% उछाल) के साथ तेजी में हैं। हालिया बारिश से आवक सीमित होने के कारण रोगमुक्त, उच्च गुणवत्ता वाले टमाटर को बेहतर मूल्य मिल रहा है।",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'ta') {
      return {
        reply: "எங்கள் மாதிரி சந்தை தரவுத்தொகுப்பின்படி (APMC விலை நிலவரம்), ராயச்சூர் / கோலார் சந்தையில் தக்காளி விலை தற்போது குவிண்டாலுக்கு ~₹2,850 ஆக (+₹180 / 6.7% உயர்வு) அதிகரித்து வருகிறது. வரத்து குறைந்துள்ளதால் நல்ல தரமான தக்காளிக்கு சந்தையில் சிறந்த விலை கிடைக்கிறது.",
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: "According to our Demo Market Dataset (calibrated against regional APMC benchmarks), Tomato prices in Raichur / Kolar APMC are currently trending upward at approximately ₹2,850 per Quintal (+₹180 / +6.7% momentum). Reduced arrivals from wet-weather pockets have driven strong price realization for disease-free, high-grade produce.",
      mode: 'deterministic_fallback'
    };
  }

  // 5. Why is my farm health score 5?
  if (q.includes('health score') || q.includes('score 5') || (q.includes('why') && q.includes('5')) || q.includes('ಆರೋಗ್ಯ') || q.includes('ಸ್ಕೋರ್ 5') || q.includes('स्वास्थ्य') || q.includes('நல மதிப்பெண்')) {
    if (lang === 'kn') {
      return {
        reply: "ನಿಮ್ಮ ಕೃಷಿ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ 5/100 (ಗಂಭೀರ ಅಪಾಯ) ಆಗಿದೆ ಏಕೆಂದರೆ ಇದು ನಿಮ್ಮ ಒಟ್ಟು ಲೆಕ್ಕಹಾಕಿದ ಅಪಾಯದ ಸ್ಕೋರ್ 95/100 ರ ವಿರುದ್ಧ ಸೂಚ್ಯಂಕವಾಗಿದೆ (ಆರೋಗ್ಯ ಸ್ಕೋರ್ = 100 - ಅಪಾಯದ ಸ್ಕೋರ್). ಮುಖ್ಯ ಕಾರಣಗಳು: (1) ಕ್ಷೇತ್ರ A (ಟೊಮೇಟೊ) ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಶಿಲೀಂಧ್ರ ಸೋಂಕು, (2) 84% ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮತ್ತು (3) 12 ಕಿಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ರೋಗದ ಹರಡುವಿಕೆ. ಕಾರ್ಯ ಕೇಂದ್ರದಲ್ಲಿರುವ ತುರ್ತು ಕ್ರಮಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದರೆ ಸ್ಕೋರ್ ಸುಧಾರಿಸುತ್ತದೆ.",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'hi') {
      return {
        reply: "आपका फार्म स्वास्थ्य स्कोर वर्तमान में 5/100 (गंभीर जोखिम) है क्योंकि यह 95/100 के समग्र जोखिम स्कोर का उलटा (100 - जोखिम स्कोर) है। स्कोर गिरने के मुख्य कारण हैं: (1) खेत A (टमाटर) में अर्ली ब्लाइट का सक्रिय संक्रमण, (2) 84% की उच्च आर्द्रता जो फफूंद के अनुकूल है, और (3) 12 किमी के भीतर क्षेत्रीय प्रकोप क्लस्टर। कार्य केंद्र के कार्यों को पूरा करके इसे सुधारा जा सकता है।",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'ta') {
      return {
        reply: "உங்கள் பண்ணை நல மதிப்பெண் தற்போது 5/100 (தீவிர ஆபத்து) ஆக உள்ளது. இது கணக்கிடப்பட்ட 95/100 இடர் மதிப்பெண்ணின் தலைகீழ் கணக்கீடாகும் (நல மதிப்பெண் = 100 - இடர் மதிப்பெண்). முக்கிய காரணங்கள்: (1) புலம் A (தக்காளி) இல் தீவிர கருகல் நோய் தாக்கம், (2) 84% அதிக ஈரப்பதம், மற்றும் (3) 12 கிமீ தொலைவில் உள்ள பிராந்திய நோய் பரவல். செயல் மையப் பணிகளை முடிப்பதன் மூலம் ஆரோக்கிய மதிப்பெண்ணை மீட்டெடுக்கலாம்.",
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: "Your Farm Health Score is currently at 5/100 (Critical Risk) because it is calculated as the inverse of your composite Farm Risk Score of 95/100 (Health Score = 100 - Risk Score). The primary factors driving this critical score are: (1) Active Early Blight infection detected on Field A (Tomato), (2) Highly elevated ambient humidity at 84% accelerating spore germination, and (3) Neighboring disease outbreak clusters active within 12 km in Raichur District. Completing the recommended tasks in your Action Center will progressively restore your health score.",
      mode: 'deterministic_fallback'
    };
  }

  // 6. Irrigation for Field A
  if (q.includes('irrigate') || q.includes('water') || q.includes('field a') || q.includes('ನೀರಾವರಿ') || q.includes('ನೀರು') || q.includes('सिंचाई') || q.includes('पानी') || q.includes('பாசனம்') || q.includes('தண்ணீர்')) {
    if (lang === 'kn') {
      return {
        reply: "ನಿಮ್ಮ ಕೃಷಿ ಮಾಹಿತಿಯ ಪ್ರಕಾರ: ಕ್ಷೇತ್ರ A (ಟೊಮೇಟೊ) ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ ಮತ್ತು ಆರ್ದ್ರತೆ 84% ಇದೆ. ಮಳೆಯ ಮುನ್ಸೂಚನೆಯೂ ಇರುವುದರಿಂದ ಎಲೆಗಳ ತೇವಾಂಶ ಕಡಿಮೆ ಮಾಡಲು ಕ್ಷೇತ್ರ A ಗೆ ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ. ಅತ್ಯಗತ್ಯವಿದ್ದರೆ ಬೇರುಗಳಿಗೆ ಮಾತ್ರ ಹನಿ ನೀರಾವರಿ ನೀಡಿ.",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'hi') {
      return {
        reply: "आपके फार्म डेटा के अनुसार: खेत A (टमाटर) में अर्ली ब्लाइट सक्रिय है और आर्द्रता 84% है। बारिश का पूर्वानुमान होने से पत्तियों के गीलेपन को कम करने के लिए खेत A में स्प्रिंकलर सिंचाई स्थगित करें। आवश्यकता होने पर केवल जड़ों में ड्रिप सिंचाई करें।",
        mode: 'deterministic_fallback'
      };
    }
    if (lang === 'ta') {
      return {
        reply: "உங்கள் பண்ணை தரவுகளின்படி: புலம் A (தக்காளி) இல் கருகல் நோய் தாக்கம் உள்ளது மற்றும் ஈரப்பதம் 84% அதிகமாக உள்ளது. இலைகளில் ஈரப்பதத்தைக் குறைக்க புலம் A க்கான தெளிப்பு நீர்ப்பாசனத்தைத் தள்ளிப்போடுங்கள். தேவைப்பட்டால் சொட்டு நீர்ப்பாசனம் மூலம் வேருக்கு மட்டும் நீர் பாய்ச்சவும்.",
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: "Based on your live farm context: You should delay overhead sprinkler irrigation for Field A (Tomato) tomorrow. Ambient humidity is currently elevated at 84% and rain probability is high (75%). Overhead irrigation will prolong leaf wetness and accelerate fungal spore germination. If soil moisture is critical, apply low-volume drip irrigation directly at root level.",
      mode: 'deterministic_fallback'
    };
  }

  // Generic Fallback
  if (lang === 'kn') {
    return {
      reply: "AgriShield ಕೋಪೈಲಟ್ ವಿಶ್ಲೇಷಣೆ: ನಿಮ್ಮ 4 ಕ್ಷೇತ್ರಗಳು ಪ್ರಸ್ತುತ " + healthScore + "/100 ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕದಲ್ಲಿವೆ (" + statusText + "). ಆರ್ದ್ರತೆ ಹೆಚ್ಚಿರುವುದರಿಂದ (" + humidity + "%), ಟೊಮೇಟೊಗೆ ಶಿಲೀಂಧ್ರ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ. ಕಾರ್ಯ ಕೇಂದ್ರದಲ್ಲಿರುವ ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಕಾರ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
      mode: 'deterministic_fallback'
    };
  }
  if (lang === 'hi') {
    return {
      reply: "AgriShield कोपायलट विश्लेषण: आपके 4 पंजीकृत खेत वर्तमान में " + healthScore + "/100 स्वास्थ्य स्कोर पर हैं (" + statusText + ")। उच्च आर्द्रता (" + humidity + "%) से टमाटर में फंगल जोखिम बढ़ा हुआ है। कार्य केंद्र के कार्यों की समीक्षा करें।",
      mode: 'deterministic_fallback'
    };
  }
  if (lang === 'ta') {
    return {
      reply: "AgriShield கோபிலாட் பகுப்பாய்வு: உங்கள் 4 வயல்கள் " + healthScore + "/100 ஆரோக்கிய மதிப்பெண்ணில் செயல்படுகின்றன (" + statusText + "). ஈரப்பதம் " + humidity + "% ஆக உள்ளதால் பூஞ்சை ஆபத்து உள்ளது. செயல் மைய பணிகளை முடிக்கவும்.",
      mode: 'deterministic_fallback'
    };
  }
  return {
    reply: "AgriShield Copilot analysis: Your 4 registered fields (Tomato, Paddy, Cotton, Chilli) operate at a composite Farm Health Score of " + healthScore + "/100 (" + statusText + "). Ambient humidity is " + humidity + "%. Review high-priority items in your Action Center to restore farm health.",
    mode: 'deterministic_fallback'
  };
};
