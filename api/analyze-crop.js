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

  const { image, mimeType, lang = "en" } = req.body || {};
  if (!image) return res.status(400).json({ error: "Base64 image is required" });

  const targetLang = getLangName(lang);
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "YOUR_GEMINI_API_KEY" && apiKey.trim() !== "") {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

      const prompt = `You are AgriShield X, an advanced AI agricultural disease diagnostics system.
Analyze the provided crop/plant image.
1. Verify if the image contains a plant, leaf, or crop. If NOT, return strict JSON: {"isCrop": false, "reason": "Not a recognized plant or crop image."}.
2. If it IS a crop, identify the plant, disease/health condition, severity, estimated affected surface area percentage, spread risk, action urgency, visible visual symptoms, organic & chemical treatment categories, prevention steps, and explainable visual reasoning.
CRITICAL SAFETY INSTRUCTION: Do NOT fabricate chemical dosage quantities. Instruct the user to verify exact chemical dosage and application rates on registered product labels or with local agricultural extension officers.

CRITICAL LANGUAGE INSTRUCTION:
You MUST generate all user-facing descriptions (symptoms, treatments, prevention, explanation) in ${targetLang}.
Preserve standard scientific Latin binomials (e.g. Alternaria solani) in standard Latin format.

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

  // Localized Fallback
  if (lang === 'kn') {
    return res.status(200).json({
      isCrop: true,
      analysisMode: "Demo Analysis",
      isDemo: true,
      data: {
        cropType: "ಟೊಮೇಟೊ (ಅರ್ಕ ರಕ್ಷಕ್)",
        diseaseName: "Early Blight (Alternaria solani)",
        confidence: 94,
        severity: "ಹೆಚ್ಚು",
        affectedArea: 26,
        spreadRisk: "ಹೆಚ್ಚು",
        urgency: "24-48 ಗಂಟೆಗಳಲ್ಲಿ ಚಿಕಿತ್ಸೆ ನೀಡಿ",
        symptoms: [
          "ಪಕ್ವ ಎಲೆಗಳ ಮೇಲೆ ಏಕಕೇಂದ್ರಕ ಉಂಗುರದಂತಹ ಕಂದು ಕಲೆಗಳು",
          "ನೆಕ್ರೋಟಿಕ್ ಕಲೆಗಳ ಸುತ್ತಲೂ ಹಳದಿ ವರ್ತುಲ",
          "ಕೆಳಭಾಗದ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಉದುರುವುದು"
        ],
        treatment: {
          organic: [
            "ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ ಅಥವಾ ಕಾಪರ್ ಆಕ್ಟಾನೋಯೇಟ್ ಸಿಂಪಡಿಸಿ",
            "ನೆಲದಿಂದ 15 ಸೆಂ.ಮೀ ಎತ್ತರದವರೆಗೆ ಸೋಂಕಿತ ಕೆಳ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ತೆಗೆಯಿರಿ"
          ],
          chemical: [
            "ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 2 ಗ್ರಾಂ ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಸಿಂಪಡಿಸಿ",
            "7 ದಿನಗಳ ನಂತರ ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ"
          ],
          safetyAdvisory: "ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆಗೆ ಮುನ್ನ ಲೇಬಲ್ ಸೂಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."
        },
        prevention: [
          "ಶಿಲೀಂಧ್ರ ಹರಡುವಿಕೆಯನ್ನು ತಡೆಯಲು ಹನಿ ನೀರಾವರಿ ಬಳಸಿ",
          "ಮಣ್ಣಿನ ತೇವಾಂಶ ನಿಯಂತ್ರಿಸಲು ಒಣ ಹುಲ್ಲಿನ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಹಾಕಿ",
          "ಗಿಡಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ"
        ],
        explanation: "ದೃಶ್ಯ ವಿಶ್ಲೇಷಣೆಯು Alternaria solani ನ ವಿಶಿಷ್ಟ ಏಕಕೇಂದ್ರಕ ಉಂಗುರದ ಲಕ್ಷಣಗಳನ್ನು ದೃಢಪಡಿಸಿದೆ."
      }
    });
  }

  if (lang === 'hi') {
    return res.status(200).json({
      isCrop: true,
      analysisMode: "Demo Analysis",
      isDemo: true,
      data: {
        cropType: "टमाटर (अर्का रक्षक)",
        diseaseName: "Early Blight (Alternaria solani)",
        confidence: 94,
        severity: "उच्च",
        affectedArea: 26,
        spreadRisk: "उच्च",
        urgency: "24-48 घंटों के भीतर उपचार करें",
        symptoms: [
          "निचली पत्तियों पर संकेंद्रित छल्लों जैसे गहरे भूरे धब्बे",
          "घावों के चारों ओर पीला क्लोरोटिक घेरा",
          "निचली पत्तियों का समय से पहले सूखना"
        ],
        treatment: {
          organic: [
            "बैसिलस सबटिलिस बायो-फंगीसाइड या कॉपर ऑक्टानोएट का छिड़काव करें",
            "जमीन से 15 सेमी ऊपर तक संक्रमित निचली पत्तियों को काटें"
          ],
          chemical: [
            "मैंकोजेब 75% डब्ल्यूपी @ 2 ग्राम/लीटर का छिड़काव करें",
            "7 दिनों के बाद एजोक्सीस्ट्रोबिन स्प्रे से बदलें"
          ],
          safetyAdvisory: "रासायनिक कीटनाशक छिड़काव से पहले उत्पाद लेबल निर्देशों की पुष्टि करें।"
        },
        prevention: [
          "ओवरहेड स्प्रे के स्थान पर ड्रिप सिंचाई का प्रयोग करें",
          "मिट्टी के छींटों को रोकने के लिए पुआल की मल्चिंग लगाएं",
          "हवा के संचलन के लिए पौधों के बीच पर्याप्त दूरी रखें"
        ],
        explanation: "दृश्य विश्लेषण में Alternaria solani के संकेंद्रित वलय पैटर्न की पहचान हुई है।"
      }
    });
  }

  if (lang === 'ta') {
    return res.status(200).json({
      isCrop: true,
      analysisMode: "Demo Analysis",
      isDemo: true,
      data: {
        cropType: "தக்காளி (அர்கா ரக்ஷக்)",
        diseaseName: "Early Blight (Alternaria solani)",
        confidence: 94,
        severity: "அதிகம்",
        affectedArea: 26,
        spreadRisk: "அதிகம்",
        urgency: "24-48 மணி நேரத்திற்குள் சிகிச்சை",
        symptoms: [
          "முதிர்ந்த இலைகளில் வளைய வடிவிலான அடர் பழுப்பு புள்ளிகள்",
          "புள்ளிகளைச் சுற்றி மஞ்சள் நிற வளையங்கள்",
          "கீழ் இலைகள் முன்கூட்டியே உதிர்தல்"
        ],
        treatment: {
          organic: [
            "பாசில்லஸ் சப்டிலிஸ் அல்லது காப்பர் ஆக்டானோயேட் தெளிக்கவும்",
            "பாதிக்கப்பட்ட கீழ் இலைகளை 15 செ.மீ வரை கத்தரிக்கவும்"
          ],
          chemical: [
            "மேன்கோசெப் 75% WP @ 2 கிராம்/லிட்டர் தெளிக்கவும்",
            "7 நாட்களுக்குப் பிறகு அஸோக்ஸிஸ்ட்ரோபின் தெளிக்கவும்"
          ],
          safetyAdvisory: "வேதியியல் மருந்துகளைப் பயன்படுத்துவதற்கு முன் லேபிள் வழிமுறைகளைப் படிக்கவும்."
        },
        prevention: [
          "தெளிப்பு நீர்ப்பாசனத்திற்குப் பதிலாக சொட்டு நீர்ப்பாசனத்தைப் பயன்படுத்தவும்",
          "மண் தெறிப்பதைத் தடுக்க வைக்கோல் மூடாக்கு இடவும்",
          "செடிகளுக்கு இடையே போதிய இடைவெளி விடவும்"
        ],
        explanation: "காட்சி பகுப்பாய்வு Alternaria solani இன் வளைய வடிவ அறிகுறிகளை உறுதிப்படுத்துகிறது."
      }
    });
  }

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
      urgency: "Treat within 24-48 hours",
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
