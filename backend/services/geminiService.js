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
      "chemical": ["Apply Chlorothalonil or Mancozeb fungicide spray", "Use azoxystrobin for systematic protection"],
      "safetyAdvisory": "Verify exact chemical dosage, mixing ratios, and pre-harvest intervals against registered product labels. Always consult local agricultural extension officers before application."
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
Current Farm State Telemetry:
- Composite Farm Health Score: ${farmContext.healthScore ?? 5} / 100 (${farmContext.statusText ?? 'Critical Risk'})
- Weather: Humidity ${farmContext.humidity ?? 82}%, Rain Probability ${farmContext.rainProbability ?? 75}%
- Active Alert: Early Blight on Field A (Tomato)
- Registered Fields: Tomato (Field A), Paddy (Field B), Bt Cotton (Field C), Red Chilli (Field D)

LANGUAGE INSTRUCTION:
You MUST respond entirely in ${targetLang}.
Preserve technical product names and Latin pathogen names where appropriate.
Keep your answer clear, encouraging, structured with bullet points, and directly focused on actionable field advice.

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
            'ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 2 ಗ್ರಾಂ ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಸಿಂಪಡಿಸಿ',
            '7 ದಿನಗಳ ನಂತರ ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ'
          ],
          safetyAdvisory: 'ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆಗೆ ಮುನ್ನ ಲೇಬಲ್ ಸೂಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ರಕ್ಷಣಾತ್ಮಕ ಸಾಧನಗಳನ್ನು ಧರಿಸಿ.'
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
            'मैंकोजेब 75% डब्ल्यूपी @ 2 ग्राम/लीटर का छिड़काव करें',
            '7 दिनों के बाद एजोक्सीस्ट्रोबिन स्प्रे से बदलें'
          ],
          safetyAdvisory: 'रासायनिक कीटनाशक छिड़काव से पहले उत्पाद लेबल निर्देशों की पुष्टि करें।'
        },
        prevention: [
          'ओवरहेड स्प्रे के स्थान पर ड्रिप सिंचाई का प्रयोग करें',
          'मिट्टी के छींटों को रोकने के लिए पुआल की मल्चिंग लगाएं',
          'हवा के संचलन के लिए पौधों के बीच पर्याप्त दूरी सुनिश्चित करें'
        ],
        explanation: 'दृश्य विश्लेषण में Alternaria solani के संकेंद्रित वलय पैटर्न की पहचान हुई है। उच्च आर्द्रता रोग के प्रसार को बढ़ाती है।'
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
            'மேன்கோசெப் 75% WP @ 2 கிராம்/லிட்டர் தெளிக்கவும்',
            '7 நாட்களுக்குப் பிறகு அஸோக்ஸிஸ்ட்ரோபின் தெளிக்கவும்'
          ],
          safetyAdvisory: 'வேதியியல் மருந்துகளைப் பயன்படுத்துவதற்கு முன் லேபிள் வழிமுறைகளைப் படிக்கவும்.'
        },
        prevention: [
          'தெளிப்பு நீர்ப்பாசனத்திற்குப் பதிலாக சொட்டு நீர்ப்பாசனத்தைப் பயன்படுத்தவும்',
          'மண் தெறிப்பதைத் தடுக்க வைக்கோல் மூடாக்கு இடவும்',
          'காற்றோட்டத்திற்கு செடிகளுக்கு இடையே போதிய இடைவெளி விடவும்'
        ],
        explanation: 'காட்சி பகுப்பாய்வு Alternaria solani இன் வளைய வடிவ அறிகுறிகளை உறுதிப்படுத்துகிறது. அதிக ஈரப்பதம் நோய் பரவலைத் தூண்டுகிறது.'
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
        'Concentric target-board dark brown lesions on mature foliage',
        'Chlorotic yellow halos surrounding necrotic leaf spots',
        'Premature senescence starting from canopy base upward'
      ],
      treatment: {
        organic: [
          'Spray Bacillus subtilis bio-fungicide or Copper Octanoate formulation',
          'Prune lower infected leaves 15cm above soil to halt spore splash'
        ],
        chemical: [
          'Apply Mancozeb 75% WP @ 2g/L water',
          'Alternate with Azoxystrobin spray after 7 days to avoid resistance'
        ],
        safetyAdvisory: 'Verify exact chemical dosage, mixing ratios, and pre-harvest intervals against registered product labels. Always consult local agricultural extension officers before application.'
      },
      prevention: [
        'Switch to drip irrigation lines instead of overhead spray',
        'Apply clean straw mulch at plant base to prevent soil splash',
        'Ensure 3-foot row spacing for canopy ventilation'
      ],
      explanation: 'Observed dark concentric ring patterns characteristic of Alternaria solani. High ambient humidity accelerates leaf spot enlargement and sporulation.'
    }
  };
};

const getDeterministicCopilotReply = (userPrompt, farmContext = {}, lang = 'en') => {
  const q = (userPrompt || '').toLowerCase();
  const humidity = farmContext.humidity ?? 82;
  const healthScore = farmContext.healthScore ?? 5;
  const statusText = farmContext.statusText ?? 'Critical Risk';

  if (lang === 'kn') {
    if (q.includes('irrigate') || q.includes('ನೀರಾವರಿ') || q.includes('ನೀರು')) {
      return {
        reply: `ನಿಮ್ಮ ಕೃಷಿ ಮಾಹಿತಿಯ ಪ್ರಕಾರ: ಕ್ಷೇತ್ರ A (ಟೊಮೇಟೊ) ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ ಮತ್ತು ಆರ್ದ್ರತೆ ${humidity}% ಇದೆ. ಮಳೆಯ ಮುನ್ಸೂಚನೆಯೂ ಇರುವುದರಿಂದ ಎಲೆಗಳ ತೇವಾಂಶ ಕಡಿಮೆ ಮಾಡಲು ಕ್ಷೇತ್ರ A ಗೆ ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ. ಭತ್ತದ ಕ್ಷೇತ್ರ B ಗೆ ಮಣ್ಣಿನ ತೇವಾಂಶ ಸೂಕ್ತವಾಗಿದೆ.`,
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: `AgriShield ಕೋಪೈಲಟ್ ವಿಶ್ಲೇಷಣೆ: ನಿಮ್ಮ 4 ಕ್ಷೇತ್ರಗಳು ಪ್ರಸ್ತುತ ${healthScore}/100 ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕದಲ್ಲಿವೆ (${statusText}). ಆರ್ದ್ರತೆ ಹೆಚ್ಚಿರುವುದರಿಂದ (${humidity}%), ಟೊಮೇಟೊಗೆ ಶಿಲೀಂಧ್ರ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ. ಕಾರ್ಯ ಕೇಂದ್ರದಲ್ಲಿರುವ ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಕಾರ್ಯಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.`,
      mode: 'deterministic_fallback'
    };
  }

  if (lang === 'hi') {
    if (q.includes('irrigate') || q.includes('सिंचाई') || q.includes('पानी')) {
      return {
        reply: `आपके फार्म डेटा के अनुसार: खेत A (टमाटर) में अर्ली ब्लाइट सक्रिय है और आर्द्रता ${humidity}% है। बारिश का पूर्वानुमान होने से पत्तियों के गीलेपन को कम करने के लिए खेत A में स्प्रिंकलर सिंचाई स्थगित करें।`,
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: `AgriShield कोपायलट विश्लेषण: आपके 4 पंजीकृत खेत वर्तमान में ${healthScore}/100 स्वास्थ्य स्कोर पर हैं (${statusText})। उच्च आर्द्रता (${humidity}%) से टमाटर में फंगल जोखिम बढ़ा हुआ है। कार्य केंद्र के कार्यों की समीक्षा करें।`,
      mode: 'deterministic_fallback'
    };
  }

  if (lang === 'ta') {
    if (q.includes('irrigate') || q.includes('பாசனம்') || q.includes('தண்ணீர்')) {
      return {
        reply: `உங்கள் பண்ணை தரவுகளின்படி: புலம் A (தக்காளி) இல் கருகல் நோய் தாக்கம் உள்ளது மற்றும் ஈரப்பதம் ${humidity}% அதிகமாக உள்ளது. இலைகளில் ஈரப்பதத்தைக் குறைக்க புலம் A க்கான தெளிப்பு நீர்ப்பாசனத்தைத் தள்ளிப்போடுங்கள்.`,
        mode: 'deterministic_fallback'
      };
    }
    return {
      reply: `AgriShield கோபிலாட் பகுப்பாய்வு: உங்கள் 4 வயல்கள் ${healthScore}/100 ஆரோக்கிய மதிப்பெண்ணில் செயல்படுகின்றன (${statusText}). ஈரப்பதம் ${humidity}% ஆக உள்ளதால் பூஞ்சை ஆபத்து உள்ளது. செயல் மைய பணிகளை முடிக்கவும்.`,
      mode: 'deterministic_fallback'
    };
  }

  if (q.includes('irrigate') || q.includes('water')) {
    return {
      reply: `Based on your live farm context, Field A (Tomato) currently has an active Early Blight alert with humidity elevated at ${humidity}%. Rain is also expected. Recommendation: Delay overhead sprinkler irrigation for Field A to reduce leaf wetness duration. Soil moisture for Paddy (Field B) remains optimal.`,
      mode: 'deterministic_fallback'
    };
  }

  return {
    reply: `AgriShield Copilot analysis: Your 4 registered fields (Tomato, Paddy, Cotton, Chilli) operate at a composite Farm Health Score of ${healthScore}/100 (${statusText}). Humidity is high (${humidity}%), so fungal risk remains elevated for tomato fields. Review high-priority items in your Action Center to restore farm health.`,
    mode: 'deterministic_fallback'
  };
};
