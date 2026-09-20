import React, { useState, useRef, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { Bot, Send, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';


// Helper component to render clean formatted text without raw markdown symbols
function FormattedMessage({ text }) {
  if (!text) return null;

  // Split lines
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1" />;

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('- ');
        const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, '') : line;

        // Parse **bold** inside the line
        const parts = cleanLine.split(/(\*[^*]+\*)/g);

        const renderedLine = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return (
              <em key={pIdx} className="italic text-slate-800 dark:text-slate-200">
                {part.slice(1, -1)}
              </em>
            );
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-2">
              <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
              <span className="flex-1">{renderedLine}</span>
            </div>
          );
        }

        return <p key={lIdx} className="leading-relaxed">{renderedLine}</p>;
      })}
    </div>
  );
}

export default function FarmCopilot() {
  const { lang, t, fields, farmRiskState, weather, outbreakReports } = useFarm();
  
  const copilotT = t.farmCopilot || t.copilot || {};

  const getInitialGreeting = () => {
    if (lang === 'kn') {
      return `ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AgriShield ಕೃಷಿ ಕೋಪೈಲಟ್. ನಿಮ್ಮ 4 ನೋಂದಾಯಿತ ಕ್ಷೇತ್ರಗಳು, ಪ್ರಸ್ತುತ ಹವಾಮಾನ (ತಾಪಮಾನ ${weather.temp}°C, ಆರ್ದ್ರತೆ ${weather.humidity}%), ಮತ್ತು ಪ್ರಾದೇಶಿಕ ರೋಗಗಳ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ನನ್ನ ಬಳಿಯಿದೆ. ನಿಮ್ಮ ಕೃಷಿಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;
    }
    if (lang === 'hi') {
      return `नमस्ते! मैं आपका AgriShield फार्म कोपायलट हूँ। मेरे पास आपके 4 पंजीकृत खेतों, वर्तमान मौसम (तापमान ${weather.temp}°C, आर्द्रता ${weather.humidity}%), और क्षेत्रीय प्रकोपों की पूरी जानकारी है। मैं आज आपकी फसल सुरक्षा में कैसे सहायता कर सकता हूँ?`;
    }
    if (lang === 'ta') {
      return `வணக்கம்! நான் உங்கள் AgriShield பண்ணை கோபிலாட். உங்கள் 4 பதிவு செய்யப்பட்ட வயல்கள், தற்போதைய வானிலை (வெப்பநிலை ${weather.temp}°C, ஈரப்பதம் ${weather.humidity}%) மற்றும் பிராந்திய நோய் தகவல்கள் என்னிடம் உள்ளன. உங்கள் பயிர் பாதுகாப்பிற்கு நான் எவ்வாறு உதவ முடியும்?`;
    }
    return `Hello! I am your AgriShield Copilot. I have full telemetry context of your 4 registered fields, current weather metrics (Temp ${weather.temp}°C, Humidity ${weather.humidity}%), and regional disease clusters. How can I assist your crop protection today?`;
  };

  const [messages, setMessages] = useState([
    {
      id: 'welcome-01',
      sender: 'assistant',
      text: getInitialGreeting(),
      mode: 'Farm-Grounded Advisory',
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome-01',
        sender: 'assistant',
        text: getInitialGreeting(),
        mode: 'Farm-Grounded Advisory',
        timestamp: 'Just now'
      }
    ]);
  }, [lang]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const suggestedQueries = copilotT.quickPrompts || [
    "Should I irrigate Tomato Field A today?",
    "Why is my Farm Health Score at 5/100?",
    "What are the best organic treatments for Early Blight?",
    "What is the mandi price trend for Tomato in Kolar?"
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (queryToSend) => {
    const text = queryToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          lang,
          farmContext: {
            healthScore: farmRiskState.healthScore,
            riskScore: farmRiskState.riskScore,
            statusText: farmRiskState.statusText,
            humidity: weather.humidity,
            rainProbability: weather.rainProbability,
            fields: fields.map(f => ({ name: f.name, crop: f.crop, status: f.status, disease: f.currentDiagnosis?.diseaseName }))
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          mode: data.mode === 'gemini_live' ? 'Gemini 2.5 Live Reasoning' : 'Deterministic Advisory Fallback',
          disclaimer: 'AgriShield X provides agronomic decision support. Verify chemical application rates with registered product labels and local extension officers.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('Copilot API error');
      }
    } catch (err) {
      // Smart Intent Classification Fallback for client-side offline mode
      const q = (text || '').toLowerCase();
      let fallbackReply = '';

      if (q.includes('watermelon') || q.includes('ಕಲ್ಲಂಗಡಿ') || q.includes('तरबूज') || q.includes('தர்பூசணி')) {
        if (lang === 'kn') {
          fallbackReply = "ಕಲ್ಲಂಗಡಿ (Watermelon) ಬೀಜ ಮೊಳಕೆಯೊಡೆದ ನಂತರ ಪೂರ್ಣ ಕೊಯ್ಲಿಗೆ ಬರಲು ಸಾಮಾನ್ಯವಾಗಿ 70 ರಿಂದ 90 ದಿನಗಳು (ಸುಮಾರು 10 ರಿಂದ 12 ವಾರಗಳು) ಬೇಕಾಗುತ್ತದೆ. ಸಕ್ಕರೆ ಬೇಬಿ ತಳಿಗಳಿಗೆ ಸುಮಾರು 75 ದಿನಗಳು, ದೊಡ್ಡ ತಳಿಗಳಿಗೆ 85–90 ದಿನಗಳು ಬೇಕು.";
        } else if (lang === 'hi') {
          fallbackReply = "तरबूज (Watermelon) को बीज अंकुरण से पूरी तरह पकने और कटाई तक आमतौर पर 70 से 90 दिन (लगभग 10 से 12 सप्ताह) का समय लगता है। शुगर बेबी जैसी किस्में लगभग 75 दिनों में तैयार हो जाती हैं।";
        } else if (lang === 'ta') {
          fallbackReply = "தர்பூசணி (Watermelon) விதை முளைத்ததிலிருந்து அறுவடைக்கு வர பொதுவாக 70 முதல் 90 நாட்கள் (சுமார் 10 முதல் 12 வாரங்கள்) ஆகும். சர்க்கரை பேபி போன்ற ரகங்கள் 75 நாட்களில் முதிர்ச்சியடையும்.";
        } else {
          fallbackReply = "Watermelon (Citrullus lanatus) typically takes 70 to 90 days (10 to 12 weeks) from seed germination to reach full harvest maturity, depending on the cultivar. Early-maturing varieties like Sugar Baby require approximately 75 days, while larger varieties like Charleston Gray need 85–90 days.";
        }
      } else if (q.includes('sunlight') || q.includes('ಬಿಸಿಲು') || q.includes('धूप') || q.includes('சூரிய ஒளி') || (q.includes('chilli') && q.includes('need') && !q.includes('irrigate'))) {
        if (lang === 'kn') {
          fallbackReply = "ಮೆಣಸಿನಕಾಯಿ (Chilli) ಬೆಳೆಗೆ ದಿನಕ್ಕೆ ಕನಿಷ್ಠ 6 ರಿಂದ 8 ಗಂಟೆಗಳ ಕಾಲ ಪೂರ್ಣ, ನೇರ ಸೂರ್ಯನ ಬೆಳಕು ಅಗತ್ಯವಿದೆ. ಸಮರ್ಪಕ ಬಿಸಿಲು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ಹೆಚ್ಚಿಸಿ, ಗಿಡಗಳ ದೃಢ ಬೆಳವಣಿಗೆ ಮತ್ತು ಹೂಬಿಡುವಿಕೆಗೆ ಸಹಕಾರಿಯಾಗಿದೆ.";
        } else if (lang === 'hi') {
          fallbackReply = "मिर्च (Chilli) की फसल को प्रतिदिन कम से कम 6 से 8 घंटे की भरपूर सीधी धूप की आवश्यकता होती है। पर्याप्त धूप पौधों को मजबूत बनाती है और अधिक फूल व फल लाने में मदद करती है।";
        } else if (lang === 'ta') {
          fallbackReply = "மிளகாய் (Chilli) பயிருக்கு நாள்தோறும் குறைந்தது 6 முதல் 8 மணி நேரம் நேரடி சூரிய ஒளி தேவைப்படுகிறது. போதுமான சூரிய ஒளி செடிகள் திடமாக வளரவும், அதிக பூக்கள் பூக்கவும் உதவுகிறது.";
        } else {
          fallbackReply = "Chilli (Capsicum annuum) plants require full, direct sunlight—ideally 6 to 8 hours of unfiltered sunlight per day. Adequate sunlight ensures strong vegetative branching, stimulates abundant flowering, and optimizes fruit set.";
        }
      } else if (q.includes('early blight') || q.includes('treat') || q.includes('ಚಿಕಿತ್ಸೆ') || q.includes('उपचार') || q.includes('சிகிச்சை')) {
        if (lang === 'kn') {
          fallbackReply = "ಅರ್ಲಿ ಬ್ಲೈಟ್ (Alternaria solani) ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ ಕ್ರಮಗಳು:\n• ಸಾವಯವ / ಜೈವಿಕ ಆಯ್ಕೆಗಳು: ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ ಅಥವಾ ಕಾಪರ್ ಆಕ್ಟಾನೋಯೇಟ್ ಸಿಂಪಡಿಸಿ. ಸೋಂಕಿತ ಕೆಳ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ನಾಶಪಡಿಸಿ.\n• ಲೇಬಲ್-ಅನುಸರಣೆಯ ರಾಸಾಯನಿಕ ಮಾರ್ಗದರ್ಶನ: ಲೇಬಲ್ ಸೂಚನೆಯಂತೆ ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಅಥವಾ ಕ್ಲೋರೋಥಲೋನಿಲ್ ಸಿಂಪಡಿಸಿ.\n• ಕೃಷಿ ಪದ್ಧತಿ: ಎಲೆಗಳು ಒದ್ದೆಯಾಗುವುದನ್ನು ತಡೆಯಲು ಹನಿ ನೀರಾವರಿ ಬಳಸಿ.";
        } else if (lang === 'hi') {
          fallbackReply = "अर्ली ब्लाइट (Alternaria solani) के उपचार:\n• जैविक उपचार विकल्प: बैसिलस सबटिलिस या कॉपर ऑक्टानोएट का छिड़काव करें।\n• लेबल-अनुपालन रासायनिक मार्गदर्शन: पंजीकृत उत्पाद लेबल के अनुसार मैंकोजेब 75% WP या क्लोरोथैलोनिल का छिड़काव करें।\n• कृषि प्रबंधन: पत्तियों को सूखा रखने के लिए ड्रिप सिंचाई अपनाएं।";
        } else if (lang === 'ta') {
          fallbackReply = "தக்காளி கருகல் நோய் (Alternaria solani) முறைகள்:\n• இயற்கை சிகிச்சை முறைகள்: பேசிலஸ் சப்டிலிஸ் அல்லது காப்பர் ஆக்டானோயேட் தெளிக்கவும்.\n• லேபிள்-இணக்கமான இரசாயன வழிகாட்டுதல்: மேன்கோசெப் 75% WP அல்லது குளோரோதலோனில் தெளிக்கவும்.\n• பயிர் மேலாண்மை: சொட்டு நீர்ப்பாசனம் செய்யவும்.";
        } else {
          fallbackReply = "Management protocols for Early Blight (Alternaria solani):\n• Organic / Biological Options: Apply Bacillus subtilis or copper octanoate bio-fungicide. Prune lower infected leaves 15 cm above ground.\n• Label-Compliant Chemical Guidance: Apply Chlorothalonil or Mancozeb 75% WP according to registered label directions. Alternate with Azoxystrobin to prevent resistance.\n• Agronomic Practices: Switch to drip irrigation to prevent leaf wetness.";
        }
      } else if (q.includes('mandi') || q.includes('market') || q.includes('price') || q.includes('ಮಾರುಕಟ್ಟೆ') || q.includes('ದರ') || q.includes('मंडी') || q.includes('भाव') || q.includes('சந்தை') || q.includes('விலை')) {
        if (lang === 'kn') {
          fallbackReply = "ನಮ್ಮ ಡೆಮೋ ಮಾರುಕಟ್ಟೆ ಡೇಟಾಸೆಟ್ (APMC ಬೆಂಚ್‌ಮಾರ್ಕ್ ಆಧಾರಿತ) ಪ್ರಕಾರ, ರಾಯಚೂರು / ಕೋಲಾರ APMC ಯಲ್ಲಿ ಟೊಮೇಟೊ ಧಾರಣೆ ಪ್ರಸ್ತುತ ಕ್ವಿಂಟಾಲ್‌ಗೆ ~₹2,850 ರಂತೆ ಏರಿಕೆಯ ಹಾದಿಯಲ್ಲಿದೆ (+₹180 / 6.7% ಹೆಚ್ಚಳ).";
        } else if (lang === 'hi') {
          fallbackReply = "हमारे डेमो मार्केट डेटासेट (APMC बेंचमार्क पर आधारित) के अनुसार, रायचूर / कोलार मंडी में टमाटर की कीमतें वर्तमान में ~₹2,850 प्रति क्विंटल (+₹180 / 6.7% उछाल) के साथ तेजी में हैं।";
        } else if (lang === 'ta') {
          fallbackReply = "எங்கள் மாதிரி சந்தை தரவுத்தொகுப்பின்படி (APMC விலை நிலவரம்), ராயச்சூர் / கோலார் சந்தையில் தக்காளி விலை தற்போது குவிண்டாலுக்கு ~₹2,850 ஆக (+₹180 / 6.7% உயர்வு) அதிகரித்து வருகிறது.";
        } else {
          fallbackReply = "According to our Demo Market Dataset (calibrated against regional APMC benchmarks), Tomato prices in Raichur / Kolar APMC are currently trending upward at approximately ₹2,850 per Quintal (+₹180 / +6.7% momentum).";
        }
      } else if (q.includes('health score') || q.includes('score 5') || (q.includes('why') && q.includes('5')) || q.includes('ಆರೋಗ್ಯ') || q.includes('ಸ್ಕೋರ್ 5') || q.includes('स्वास्थ्य') || q.includes('நல மதிப்பெண்')) {
        if (lang === 'kn') {
          fallbackReply = "ನಿಮ್ಮ ಕೃಷಿ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ 5/100 (ಗಂಭೀರ ಅಪಾಯ) ಆಗಿದೆ ಏಕೆಂದರೆ ಇದು ಒಟ್ಟು ಲೆಕ್ಕಹಾಕಿದ ಅಪಾಯದ ಸ್ಕೋರ್ 95/100 ರ ವಿರುದ್ಧ ಸೂಚ್ಯಂಕವಾಗಿದೆ (ಆರೋಗ್ಯ ಸ್ಕೋರ್ = 100 - ಅಪಾಯದ ಸ್ಕೋರ್). ಮುಖ್ಯ ಕಾರಣಗಳು: ಕ್ಷೇತ್ರ A ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಶಿಲೀಂಧ್ರ ಸೋಂಕು, 84% ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮತ್ತು 12 ಕಿಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ರೋಗದ ಹರಡುವಿಕೆ.";
        } else if (lang === 'hi') {
          fallbackReply = "आपका फार्म स्वास्थ्य स्कोर वर्तमान में 5/100 (गंभीर जोखिम) है क्योंकि यह 95/100 के समग्र जोखिम स्कोर का उलटा (100 - जोखिम स्कोर) है। मुख्य कारण: खेत A में अर्ली ब्लाइट, 84% आर्द्रता और 12 किमी के भीतर क्षेत्रीय प्रकोप क्लस्टर।";
        } else if (lang === 'ta') {
          fallbackReply = "உங்கள் பண்ணை நல மதிப்பெண் தற்போது 5/100 (தீவிர ஆபத்து) ஆக உள்ளது. இது கணக்கிடப்பட்ட 95/100 இடர் மதிப்பெண்ணின் தலைகீழ் கணக்கீடாகும் (நல மதிப்பெண் = 100 - இடர் மதிப்பெண்). முக்கிய காரணங்கள்: புலம் A இல் தீவிர கருகல் நோய் தாக்கம், 84% அதிக ஈரப்பதம், மற்றும் 12 கிமீ தொலைவில் உள்ள பிராந்திய நோய் பரவல்.";
        } else {
          fallbackReply = "Your Farm Health Score is currently at 5/100 (Critical Risk) because it is calculated as the inverse of your composite Farm Risk Score of 95/100 (Health Score = 100 - Risk Score). Driven by active Early Blight on Field A, 84% humidity, and 12 km proximity to regional outbreak clusters.";
        }
      } else if (q.includes('irrigate') || q.includes('water') || q.includes('field a') || q.includes('ನೀರಾವರಿ') || q.includes('ನೀರು') || q.includes('सिंचाई') || q.includes('पानी') || q.includes('பாசனம்') || q.includes('தண்ணீர்')) {
        if (lang === 'kn') {
          fallbackReply = "ನಿಮ್ಮ ಕೃಷಿ ಮಾಹಿತಿಯ ಪ್ರಕಾರ: ಕ್ಷೇತ್ರ A (ಟೊಮೇಟೊ) ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ ಮತ್ತು ಆರ್ದ್ರತೆ 84% ಇದೆ. ಮಳೆಯ ಮುನ್ಸೂಚನೆಯೂ ಇರುವುದರಿಂದ ಎಲೆಗಳ ತೇವಾಂಶ ಕಡಿಮೆ ಮಾಡಲು ಕ್ಷೇತ್ರ A ಗೆ ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ.";
        } else if (lang === 'hi') {
          fallbackReply = "खेत A (टमाटर) में अर्ली ब्लाइट सक्रिय है और आर्द्रता 84% है। बारिश का पूर्वानुमान होने से पत्तियों के गीलेपन को कम करने के लिए खेत A में स्प्रिंकलर सिंचाई स्थगित करें।";
        } else if (lang === 'ta') {
          fallbackReply = "புலம் A (தக்காளி) இல் கருகல் நோய் தாக்கம் உள்ளது மற்றும் ஈரப்பதம் 84% அதிகமாக உள்ளது. இலைகளில் ஈரப்பதத்தைக் குறைக்க புலம் A க்கான தெளிப்பு நீர்ப்பாசனத்தைத் தள்ளிப்போடுங்கள்.";
        } else {
          fallbackReply = "Based on your live farm context: You should delay overhead sprinkler irrigation for Field A (Tomato) tomorrow. Ambient humidity is currently elevated at 84% and rain probability is high (75%). Overhead irrigation will prolong leaf wetness and accelerate fungal spore germination.";
        }
      } else {
        if (lang === 'kn') {
          fallbackReply = "AgriShield ಕೋಪೈಲಟ್ ವಿಶ್ಲೇಷಣೆ: ನಿಮ್ಮ 4 ಕ್ಷೇತ್ರಗಳು ಪ್ರಸ್ತುತ 5/100 ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕದಲ್ಲಿವೆ (ಗಂಭೀರ ಅಪಾಯ). ಆರ್ದ್ರತೆ ಹೆಚ್ಚಿರುವುದರಿಂದ (84%), ಟೊಮೇಟೊಗೆ ಶಿಲೀಂಧ್ರ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ. ಕಾರ್ಯ ಕೇಂದ್ರದಲ್ಲಿರುವ ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಕಾರ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.";
        } else if (lang === 'hi') {
          fallbackReply = "AgriShield कोपायलट विश्लेषण: आपके 4 पंजीकृत खेत वर्तमान में 5/100 स्वास्थ्य स्कोर पर हैं (गंभीर जोखिम)। उच्च आर्द्रता (84%) से टमाटर में फंगल जोखिम बढ़ा हुआ है। कार्य केंद्र के कार्यों की समीक्षा करें।";
        } else if (lang === 'ta') {
          fallbackReply = "AgriShield கோபிலாட் பகுப்பாய்வு: உங்கள் 4 வயல்கள் 5/100 ஆரோக்கிய மதிப்பெண்ணில் செயல்படுகின்றன (தீவிர ஆபத்து). ஈரப்பதம் 84% ஆக உள்ளதால் பூஞ்சை ஆபத்து உள்ளது. செயல் மைய பணிகளை முடிக்கவும்.";
        } else {
          fallbackReply = "AgriShield Copilot analysis: Your 4 registered fields (Tomato, Paddy, Cotton, Chilli) operate at a composite Farm Health Score of 5/100 (Critical Risk). Ambient humidity is 84%. Review high-priority items in your Action Center to restore farm health.";
        }
      }

const fallbackMsg = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        mode: 'Context Fallback Mode',
        disclaimer: 'AgriShield X provides agronomic decision support. Verify chemical application rates with local agricultural extension officers.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 flex flex-col h-[calc(100vh-140px)] animate-fadeIn transition-colors duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#111c35] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">
                {copilotT.title || 'Farm Copilot AI'}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                {copilotT.contextLabel || 'Farm Telemetry Connected'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {copilotT.subtitle || 'Context-aware agricultural advisor'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Clear chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                  isUser
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <FormattedMessage text={msg.text} />

                {!isUser && msg.disclaimer && (
                  <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{msg.disclaimer}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.mode && (
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {msg.mode}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-xl mr-auto">
            <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 dark:text-teal-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111c35] border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>{copilotT.thinking || 'AgriShield Copilot is synthesizing agronomic advisory...'}</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Query Chips */}
      <div className="shrink-0 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{copilotT.quickPromptsTitle || 'Suggested Inquiries:'}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {suggestedQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="shrink-0 flex gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={copilotT.inputPlaceholder || 'Ask about crop symptoms, spray schedules, market prices, or risk mitigation...'}
          className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none shadow-2xs"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <span>{copilotT.sendButton || 'Ask Copilot'}</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
