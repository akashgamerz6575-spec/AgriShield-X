import React, { useState, useRef, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { Bot, Send, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

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
      const response = await fetch('/api/ai/copilot', {
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
      // Deterministic Agronomic Fallback when backend is disconnected or offline
      let fallbackReply = '';
      const q = text.toLowerCase();

      if (lang === 'kn') {
        if (q.includes('irrigate') || q.includes('ನೀರಾವರಿ') || q.includes('ನೀರು')) {
          fallbackReply = `ನಿಮ್ಮ ಕೃಷಿ ಮಾಹಿತಿಯ ಪ್ರಕಾರ: ಕ್ಷೇತ್ರ A (ಟೊಮೇಟೊ) ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ ಮತ್ತು ಗಾಳಿಯಲ್ಲಿ ತೇವಾಂಶ ${weather.humidity}% ನಷ್ಟಿದೆ. ಮಳೆಯ ಮುನ್ಸೂಚನೆಯೂ ಇದೆ. ಶಿಫಾರಸು: ಎಲೆಗಳ ತೇವಾಂಶ ಕಡಿಮೆ ಮಾಡಲು ಕ್ಷೇತ್ರ A ಗೆ ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ. ಭತ್ತದ ಕ್ಷೇತ್ರ B ಗೆ ಮಣ್ಣಿನ ತೇವಾಂಶ ಸೂಕ್ತವಾಗಿದೆ.`;
        } else if (q.includes('score') || q.includes('ಸ್ಕೋರ್') || q.includes('ಏಕೆ') || q.includes('why')) {
          fallbackReply = `ನಿಮ್ಮ ಕೃಷಿ ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಪ್ರಸ್ತುತ ${farmRiskState.healthScore}/100 (${farmRiskState.statusText}) ಆಗಿದೆ. ಅಪಾಯ ಹೆಚ್ಚಲು ಮುಖ್ಯ ಕಾರಣಗಳು: 1) ಹೆಚ್ಚಿನ ಸಾಪೇಕ್ಷ ಆರ್ದ್ರತೆ (+18 ಅಂಕಗಳು), 2) 12 ಕಿಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ರೋಗ ಕ್ಲಸ್ಟರ್ (+16 ಅಂಕಗಳು), ಮತ್ತು 3) ಟೊಮೇಟೊ ಎಲೆ ಕಲೆಗಳ ಪತ್ತೆ (+14 ಅಂಕಗಳು). ಕಾರ್ಯ ಕೇಂದ್ರದ ಕಾರ್ಯಗಳನ್ನು ಪರಿಹರಿಸುವುದರಿಂದ ಸ್ಕೋರ್ ಸುಧಾರಿಸುತ್ತದೆ.`;
        } else {
          fallbackReply = `AgriShield ಕೋಪೈಲಟ್ ವಿಶ್ಲೇಷಣೆ: ನಿಮ್ಮ 4 ಕ್ಷೇತ್ರಗಳು (ಟೊಮೇಟೊ, ಭತ್ತ, ಹತ್ತಿ, ಮೆಣಸಿನಕಾಯಿ) ಪ್ರಸ್ತುತ ${farmRiskState.healthScore}/100 ಆರೋಗ್ಯ ಸ್ಕೋರ್‌ನಲ್ಲಿವೆ. ಆರ್ದ್ರತೆ ಹೆಚ್ಚಿರುವುದರಿಂದ (${weather.humidity}%), ಟೊಮೇಟೊಗೆ ಶಿಲೀಂಧ್ರ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ. ಕಾರ್ಯ ಕೇಂದ್ರದಲ್ಲಿರುವ ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಕಾರ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.`;
        }
      } else if (lang === 'hi') {
        if (q.includes('irrigate') || q.includes('सिंचाई') || q.includes('पानी')) {
          fallbackReply = `आपके फार्म डेटा के अनुसार: खेत A (टमाटर) में अर्ली ब्लाइट का प्रकोप सक्रिय है और आर्द्रता ${weather.humidity}% अधिक है। बारिश का भी पूर्वानुमान है। सलाह: पत्तियों के गीलेपन को कम करने के लिए खेत A में स्प्रिंकलर सिंचाई स्थगित करें।`;
        } else if (q.includes('score') || q.includes('स्कोर') || q.includes('क्यों') || q.includes('why')) {
          fallbackReply = `आपका फार्म स्वास्थ्य स्कोर वर्तमान में ${farmRiskState.healthScore}/100 (${farmRiskState.statusText}) है। जोखिम बढ़ाने वाले शीर्ष चालक: 1) उच्च आर्द्रता (+18 अंक), 2) 12 किमी के भीतर क्षेत्रीय अर्ली ब्लाइट क्लस्टर (+16 अंक), और 3) टमाटर की पत्ती के घाव (+14 अंक)। कार्य केंद्र के कार्यों को पूरा करने से स्कोर में सुधार होगा।`;
        } else {
          fallbackReply = `AgriShield कोपायलट विश्लेषण: आपके 4 पंजीकृत खेत (टमाटर, धान, कपास, मिर्च) ${farmRiskState.healthScore}/100 स्वास्थ्य स्कोर पर काम कर रहे हैं। आर्द्रता अधिक होने से (${weather.humidity}%), टमाटर के लिए फंगल जोखिम बढ़ा हुआ है। कार्य केंद्र के कार्यों की समीक्षा करें।`;
        }
      } else if (lang === 'ta') {
        if (q.includes('irrigate') || q.includes('பாசனம்') || q.includes('தண்ணீர்')) {
          fallbackReply = `உங்கள் பண்ணை தரவுகளின்படி: புலம் A (தக்காளி) இல் கருகல் நோய் தாக்கம் உள்ளது மற்றும் ஈரப்பதம் ${weather.humidity}% அதிகமாக உள்ளது. மழை முன்னறிவிப்பும் உள்ளது. ஆலோசனை: இலைகளில் ஈரப்பதத்தைக் குறைக்க புலம் A க்கான தெளிப்பு நீர்ப்பாசனத்தைத் தள்ளிப்போடுங்கள்.`;
        } else if (q.includes('score') || q.includes('மதிப்பெண்') || q.includes('ஏன்') || q.includes('why')) {
          fallbackReply = `உங்கள் பண்ணை ஆரோக்கிய மதிப்பெண் ${farmRiskState.healthScore}/100 (${farmRiskState.statusText}) ஆக உள்ளது. முக்கிய இடர் இயக்கிகள்: 1) அதிக ஈரப்பதம் (+18 புள்ளிகள்), 2) 12 கிமீக்குள் பிராந்திய நோய் தாக்கம் (+16 புள்ளிகள்), மற்றும் 3) தக்காளி இலைப்புள்ளி கண்டறிதல் (+14 புள்ளிகள்).`;
        } else {
          fallbackReply = `AgriShield கோபிலாட் பகுப்பாய்வு: உங்கள் 4 வயல்கள் ${farmRiskState.healthScore}/100 ஆரோக்கிய மதிப்பெண்ணில் செயல்படுகின்றன. ஈரப்பதம் அதிகமாக உள்ளதால் (${weather.humidity}%), தக்காளிக்கு பூஞ்சை ஆபத்து உள்ளது. செயல் மைய பணிகளை முடிக்கவும்.`;
        }
      } else {
        if (q.includes('irrigate') || q.includes('water')) {
          fallbackReply = `Based on your live farm context, Field A (Tomato) currently has an active Early Blight alert with humidity elevated at ${weather.humidity}%. Rain is also expected. Recommendation: Delay overhead sprinkler irrigation for Field A to reduce leaf wetness duration. Soil moisture for Paddy (Field B) remains optimal.`;
        } else if (q.includes('score') || q.includes('why') || q.includes('78') || q.includes('5')) {
          fallbackReply = `Your Farm Health Score is currently ${farmRiskState.healthScore}/100 (${farmRiskState.statusText}). Top drivers raising risk: 1) High humidity (+18 pts risk driver), 2) Nearby regional Early Blight outbreak cluster within 12km (+16 pts), and 3) Recent tomato leaf lesion detection (+14 pts). Completing the Action Center tasks will restore your health score.`;
        } else if (q.includes('early blight') || q.includes('treatment') || q.includes('blight')) {
          fallbackReply = `For Early Blight on Tomato (Field A): 1) Organic Protocol: Spray Copper Octanoate or Bacillus subtilis bio-agent and prune infected foliage 15cm from ground. 2) Chemical Protocol: Consider Mancozeb 75% WP or Azoxystrobin, verifying exact labeled dosages with local agricultural extension officers.`;
        } else {
          fallbackReply = `AgriShield Copilot analysis: Your 4 registered fields (Tomato, Paddy, Cotton, Chilli) operate at a composite Farm Health Score of ${farmRiskState.healthScore}/100. Humidity is high (${weather.humidity}%), so fungal risk remains elevated for tomato fields. Review high-priority items in your Action Center.`;
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
                <div className="whitespace-pre-wrap">{msg.text}</div>

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
