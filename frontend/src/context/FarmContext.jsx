import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialFields, initialActions, demoOutbreakDataset, demoMarketPrices } from '../data/demoData';
import { calculateFarmRiskScore } from '../utils/riskEngine';
import { translations } from '../i18n/translations';

const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  // Theme State: 'dark' | 'light', defaulting to dark and persisting in localStorage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('agrishield_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('agrishield_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Language State: 'en' | 'kn' | 'hi' | 'ta'
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('agrishield_lang') || 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('agrishield_lang', newLang);
  };

  const [fields, setFields] = useState(() => {
    const saved = localStorage.getItem('agrishield_fields');
    return saved ? JSON.parse(saved) : initialFields;
  });

  const [actions, setActions] = useState(() => {
    const saved = localStorage.getItem('agrishield_actions');
    return saved ? JSON.parse(saved) : initialActions;
  });

  const [weather, setWeather] = useState({
    temp: 28,
    humidity: 82,
    wind: 14,
    rainProbability: 75,
    condition: 'Humid & Overcast (Rain Expected)',
    fungalRiskLevel: 'HIGH',
    location: 'Bengaluru Agri-Zone (Karnataka)'
  });

  const [outbreakReports, setOutbreakReports] = useState(demoOutbreakDataset);
  const [marketPrices] = useState(demoMarketPrices);
  const [activeView, setActiveView] = useState('landing');

  // Fetch real weather if backend or free open weather is available
  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        if (data && data.temp) setWeather(data);
      })
      .catch(() => {
        // Fallback to pre-seeded weather
      });
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('agrishield_fields', JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem('agrishield_actions', JSON.stringify(actions));
  }, [actions]);

  // Reactive Farm Risk Engine Calculation
  const completedActions = useMemo(() => actions.filter(a => a.completed), [actions]);
  const farmRiskState = useMemo(() => {
    return calculateFarmRiskScore(fields, weather, outbreakReports, completedActions);
  }, [fields, weather, outbreakReports, completedActions]);

  const t = translations[lang] || translations.en;

  const resetDemoFarm = () => {
    setFields(initialFields);
    setActions(initialActions);
    localStorage.removeItem('agrishield_fields');
    localStorage.removeItem('agrishield_actions');
  };

  const toggleActionComplete = (actionId) => {
    setActions(prev => prev.map(act => {
      if (act.id === actionId) {
        return { ...act, completed: !act.completed };
      }
      return act;
    }));
  };

  const addDiagnosisToField = (fieldId, diagnosisData) => {
    setFields(prev => prev.map(field => {
      if (field.id === fieldId) {
        const newTimelineEvent = {
          date: new Date().toISOString().split('T')[0],
          type: 'DIAGNOSIS',
          label: `AI Scan: ${diagnosisData.diseaseName} (${diagnosisData.confidence}% confidence)`
        };
        return {
          ...field,
          status: diagnosisData.diseaseName === 'Healthy' ? 'Healthy' : 'Needs Attention',
          currentDiagnosis: diagnosisData,
          lastScanned: new Date().toISOString().split('T')[0],
          timeline: [newTimelineEvent, ...(field.timeline || [])]
        };
      }
      return field;
    }));

    if (diagnosisData.diseaseName !== 'Healthy') {
      const targetField = fields.find(f => f.id === fieldId) || { name: 'Target Field' };
      const newAction = {
        id: `action-${Date.now()}`,
        priority: 'HIGH',
        fieldId,
        fieldName: targetField.name,
        title: `Apply Treatment for ${diagnosisData.diseaseName}`,
        description: diagnosisData.treatment?.organic?.[0] || 'Follow recommended treatment protocol immediately.',
        reason: `AI Identified ${diagnosisData.severity || 'High'} Severity Risk`,
        dueDate: 'Within 24 Hours',
        completed: false
      };
      setActions(prev => [newAction, ...prev]);
    }
  };

  return (
    <FarmContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        lang,
        setLang,
        t,
        fields,
        actions,
        weather,
        outbreakReports,
        marketPrices,
        farmRiskState,
        activeView,
        setActiveView,
        resetDemoFarm,
        toggleActionComplete,
        addDiagnosisToField
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => useContext(FarmContext);
