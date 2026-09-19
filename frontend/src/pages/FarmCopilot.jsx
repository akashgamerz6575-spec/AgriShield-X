import React, { useState, useRef, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { Bot, Send, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function FarmCopilot() {
  const { t, fields, farmRiskState, weather, outbreakReports } = useFarm();
  
  const [messages, setMessages] = useState([
    {
      id: 'welcome-01',
      sender: 'assistant',
      text: `Hello! I am your AgriShield Copilot. I have full context of your 4 registered fields, current weather metrics (Temp ${weather.temp}°C, Humidity ${weather.humidity}%), and regional disease clusters. How can I assist your crop protection today?`,
      mode: 'assistant',
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const suggestedQueries = [
    "Should I irrigate Tomato Field A today?",
    "Why is my Farm Health Score at 78/100?",
    "What are the best organic treatments for Early Blight?",
    "How does high humidity impact Field B (Paddy)?"
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
    if (!queryToSend) setInputQuery('');
    setIsLoading(true);

    const farmContext = {
      healthScore: farmRiskState.healthScore,
      riskTier: farmRiskState.statusText,
      fieldsSummary: fields.map(f => `${f.name}: ${f.crop} (${f.status}, Risk ${f.riskScore}%)`),
      weather: {
        temp: weather.temp,
        humidity: weather.humidity,
        forecast: weather.condition,
        rainProbability: weather.rainProbability
      },
      outbreakAlert: outbreakReports[0] ? `${outbreakReports[0].disease} reported in ${outbreakReports[0].locationName || outbreakReports[0].location}` : 'None'
    };

    try {
      const response = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, farmContext })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          mode: data.mode || (data.isDemo ? 'Demo Fallback' : 'Live Gemini AI'),
          disclaimer: data.disclaimer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Deterministic Agronomic Fallback when backend is disconnected
      let fallbackReply = '';
      const q = text.toLowerCase();
      if (q.includes('irrigate') || q.includes('water')) {
        fallbackReply = `Based on your live farm context, Field A (Tomato) currently has an active Early Blight alert with humidity elevated at ${weather.humidity}%. Rain is also expected. Recommendation: Delay overhead sprinkler irrigation for Field A to reduce leaf wetness duration. Soil moisture for Paddy (Field B) remains optimal.`;
      } else if (q.includes('score') || q.includes('why') || q.includes('78')) {
        fallbackReply = `Your Farm Health Score is currently ${farmRiskState.healthScore}/100 (${farmRiskState.statusText}). Top drivers raising risk: 1) High humidity (+18 pts risk driver), 2) Nearby regional Early Blight outbreak cluster within 12km (+16 pts), and 3) Recent tomato leaf lesion detection (+14 pts). Completing the Action Center tasks will lower your risk score.`;
      } else if (q.includes('early blight') || q.includes('treatment') || q.includes('blight')) {
        fallbackReply = `For Early Blight on Tomato (Field A): 1) Organic Protocol: Spray Copper Octanoate or Bacillus subtilis bio-agent and prune infected foliage 15cm from ground. 2) Chemical Protocol: Consider Mancozeb 75% WP or Azoxystrobin, verifying exact labeled dosages with local agricultural extension officers.`;
      } else {
        fallbackReply = `AgriShield Copilot analysis: Your 4 registered fields (Tomato, Paddy, Cotton, Chilli) operate at a composite Farm Health Score of ${farmRiskState.healthScore}/100. Humidity is high (${weather.humidity}%), so fungal risk remains elevated for tomato fields. Review high-priority items in your Action Center.`;
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
    <div className="space-y-6 pb-12 flex flex-col h-[calc(100vh-140px)]">
      
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-outfit">
                {t.copilot.title}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Farm Aware
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.copilot.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-xs text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          title="Clear chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-teal-400 border border-slate-700'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {!isUser && msg.disclaimer && (
                  <div className="pt-2 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{msg.disclaimer}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.mode && (
                    <span className="text-slate-400 font-medium">
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
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>AgriShield Copilot is analyzing farm status...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Query Chips */}
      <div className="shrink-0 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.copilot.suggestedPrompts}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {suggestedQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 whitespace-nowrap transition-colors"
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
          placeholder={t.copilot.placeholder}
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}