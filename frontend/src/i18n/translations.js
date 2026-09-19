export const translations = {
  "en": {
    "appName": "AgriShield X",
    "tagline": "Predictive AI for Smarter Crop Protection",
    "exploreDemo": "Explore Demo Farm",
    "diagnoseCrop": "Diagnose Leaf Scan",
    "resetDemo": "Reset Demo Farm",
    "welcomeBack": "WELCOME BACK",
    "farmRegion": "Farm Region",
    "regionLocation": "Bengaluru Agri-Zone (Karnataka)",
    "heroQuote": "“Smarter Insights, Healthier Harvests”",
    "healthStatusLabel": "Health",
    "riskStatusLabel": "Risk",
    "inverseExplanation": "Health score is the positive inverse of calculated risk (100 - Risk Score).",
    "nav": {
      "landing": "Overview",
      "dashboard": "Farm Health",
      "cropDoctor": "AI Crop Doctor",
      "outbreakRadar": "Outbreak Radar",
      "farmCopilot": "Farm Copilot",
      "cropTracker": "Crop Tracker",
      "weather": "Weather Intelligence",
      "actionCenter": "Action Center",
      "market": "Market APMC",
      "simulator": "Impact Simulator",
      "settings": "Settings",
      "help": "Help & Support"
    },
    "dashboard": {
      "title": "Farm Health Command Center",
      "subtitle": "Predictive multi-factor intelligence and proactive crop risk prevention",
      "healthScore": "FARM HEALTH SCORE",
      "healthIndex": "Health Index",
      "calculatedRisk": "Calculated Risk",
      "moderateRisk": "Moderate Risk",
      "lowRisk": "Low Risk (Healthy)",
      "highRisk": "High Risk",
      "criticalRisk": "Critical Risk",
      "primaryAlertTitle": "PRIMARY FARM RISK ALERT",
      "earlyBlightHeadline": "Early Blight Risk Increased on Field A (Tomato)",
      "earlyBlightExplanation": "Relative humidity at 82%, imminent rain forecast, and a nearby regional outbreak cluster (12km away) have elevated early blight risk for your tomato field.",
      "whyButton": "Why?",
      "takeActionButton": "Take Action",
      "recommendedActionLabel": "Recommended Action",
      "recommendedActionText": "Inspect Field A lower canopy within 24h & apply preventive mulch.",
      "riskDriversTitle": "RISK SCORE COMPONENT DRIVERS",
      "activeFieldsTitle": "ACTIVE REGISTERED FIELDS",
      "viewAllFields": "View All Fields",
      "healthTrendTitle": "7-DAY FARM HEALTH INDEX",
      "healthTrendSubtitle": "Historical farm health index over past week",
      "healthTrendCriticalText": "Elevated Early Blight risk active. Resolving Action Center tasks will restore health score.",
      "healthTrendNormalText": "Preventive actions maintained; farm operating within normal risk thresholds.",
      "fieldLabels": {
        "disease": "Disease",
        "stage": "Stage",
        "risk": "Risk",
        "status": "Status",
        "acres": "Acres",
        "healthy": "Healthy",
        "needsAttention": "Needs Attention",
        "irrigationDue": "Irrigation Due",
        "outbreakExposure": "Outbreak Exposure"
      },
      "driverDescriptions": {
        "disease": "High pathogen pressure detected",
        "weather": "Conditions favorable for disease spread",
        "irrigation": "Soil moisture within acceptable range",
        "condition": "Moderate stress indicators",
        "outbreak": "Regional activity elevated (12km)"
      },
      "driverLabels": {
        "disease": "Disease Risk",
        "weather": "Weather Risk",
        "irrigation": "Irrigation Health",
        "condition": "Crop Condition",
        "outbreak": "Outbreak Exposure"
      },
      "factors": {
        "weather-humidity": {
          "label": "Elevated Relative Humidity (>75%)",
          "detail": "Relative humidity at 82% creates ideal fungal spore germination conditions."
        },
        "weather-rain": {
          "label": "Imminent Rainfall Forecast",
          "detail": "Precipitation forecast increases leaf wetness duration."
        },
        "crop-disease": {
          "label": "Active Leaf Lesions Detected (Tomato)",
          "detail": "Alternaria solani lesions identified on Field A lower canopy."
        },
        "outbreak-proximity": {
          "label": "Regional Outbreak Cluster (12km)",
          "detail": "Tomato Early Blight cluster detected in nearby taluk."
        },
        "action-relief": {
          "label": "Preventive Action Applied",
          "detail": "Mulching or bio-spray completed, mitigating pathogen spread."
        }
      }
    },
    "cropDoctor": {
      "title": "AI Crop Doctor 2.0",
      "subtitle": "Visual disease diagnosis with transparent reasoning, organic and chemical protocols",
      "scannerTitle": "Crop Leaf Diagnostic Scanner",
      "dropPrompt": "Drop leaf photograph here, or click to browse file",
      "cameraButton": "Capture Photo",
      "uploadPrompt": "Supported formats: JPG, PNG, WEBP (Max 10MB)",
      "samplePhotosPrompt": "Or select a test leaf sample for evaluation:",
      "samples": {
        "tomato": "Tomato Leaf (Early Blight)",
        "paddy": "Paddy Leaf (Leaf Blast)",
        "cotton": "Cotton Leaf (Leaf Curl)",
        "healthy": "Healthy Leaf (Control)"
      },
      "workflowTitle": "Diagnostic Workflow Guide",
      "workflowSteps": [
        {
          "step": "1",
          "title": "Upload Clear Photograph",
          "desc": "Capture affected leaf surface with natural lighting."
        },
        {
          "step": "2",
          "title": "Multimodal AI Analysis",
          "desc": "Gemini Vision inspects pathogen lesions, chlorosis & tissue necrosis."
        },
        {
          "step": "3",
          "title": "Prescription & Action Plan",
          "desc": "Receive tailored organic and chemical treatments with proactive timeline logging."
        }
      ],
      "analyzing": "AI Analyzing Leaf Surface & Pathogen Markers...",
      "diagnosisAssessment": "Diagnostic Assessment",
      "cropType": "Detected Crop",
      "diseaseName": "Identified Condition",
      "confidence": "AI Confidence",
      "severity": "Severity Level",
      "affectedArea": "Estimated Affected Area",
      "spreadRisk": "Pathogen Spread Risk",
      "urgency": "Action Urgency",
      "tabs": {
        "symptoms": "Symptoms & Evidence",
        "treatment": "Treatment Protocols",
        "prevention": "Preventive Measures",
        "explanation": "Transparent AI Reasoning"
      },
      "organicTreatment": "Organic / Biological Control",
      "chemicalTreatment": "Chemical Treatment Protocol",
      "saveToHistory": "Log to Field Timeline",
      "savedSuccess": "Logged to Field Timeline Successfully!"
    },
    "outbreakRadar": {
      "title": "Disease Outbreak Radar",
      "subtitle": "Regional pathogen cluster alerts and geographic proximity warnings",
      "disclaimer": "Simulated Regional Outbreak Dataset",
      "filterCrop": "Filter by Crop",
      "filterSeverity": "Filter by Severity",
      "allCrops": "All Crops",
      "allSeverities": "All Severities",
      "clusterSummary": "Regional Outbreak Clusters",
      "reportedCases": "Reported Cases",
      "distanceFromFarm": "Distance from farm",
      "viewOnMap": "Locate on Map"
    },
    "farmCopilot": {
      "title": "Farm Copilot AI",
      "subtitle": "Context-aware agricultural advisor powered by predictive telemetry and agronomic science",
      "contextLabel": "Connected to Farm Telemetry & Field State",
      "inputPlaceholder": "Ask about crop symptoms, spray schedules, market prices, or risk mitigation...",
      "sendButton": "Ask Copilot",
      "thinking": "Copilot is synthesizing agronomic advisory...",
      "quickPromptsTitle": "Suggested Inquiries:",
      "quickPrompts": [
        "How should I treat Early Blight on Field A?",
        "Will upcoming rain wash away bio-fungicides?",
        "What is the mandi price trend for Tomato in Kolar?",
        "How can I lower my farm calculated risk score?"
      ]
    },
    "actionCenter": {
      "title": "Proactive Action Center",
      "subtitle": "Prioritized agronomic tasks directly linked to farm risk mitigation",
      "riskReliefNotice": "Completing pending actions reduces farm risk score and restores health rating.",
      "filterAll": "All Actions",
      "filterPending": "Pending",
      "filterCompleted": "Completed",
      "markComplete": "Mark as Resolved",
      "completedBadge": "Resolved",
      "priorityHigh": "High Priority",
      "priorityMedium": "Medium Priority",
      "priorityLow": "Low Priority",
      "dueLabel": "Due Date",
      "reasonLabel": "Reason",
      "emptyMessage": "No actions match the selected filter."
    },
    "weather": {
      "title": "Weather Intelligence",
      "subtitle": "Microclimate tracking and meteorological disease risk forecasting",
      "temperature": "Temperature",
      "humidity": "Relative Humidity",
      "windSpeed": "Wind Speed",
      "precipitation": "Rain Probability",
      "fungalRiskBanner": "High Fungal Disease Spread Potential",
      "fungalRiskDetail": "High ambient humidity combined with rain forecast accelerates fungal sporulation.",
      "forecastHeading": "5-Day Agro-Meteorological Forecast"
    },
    "market": {
      "title": "Market APMC Intelligence",
      "subtitle": "Real-time APMC mandi modal prices, price momentum, and harvest timing guidance",
      "mandiLocation": "Mandi: Kolar & Bengaluru APMC",
      "cropCol": "Crop Variety",
      "priceCol": "Modal Price (₹/Qtl)",
      "changeCol": "24h Trend",
      "arrivalCol": "Daily Arrival",
      "guidanceCol": "Advisory Guidance"
    },
    "simulator": {
      "title": "Scenario Impact Simulator",
      "subtitle": "Simulate weather events, delayed sprays, or irrigation interventions on farm risk",
      "simulateButton": "Run Simulation",
      "currentHealth": "Baseline Health Score",
      "projectedHealth": "Projected Health Score",
      "riskDelta": "Estimated Risk Impact"
    },
    "cropTracker": {
      "title": "Active Crop Tracker",
      "subtitle": "Field-level agronomic records, growth stages, and diagnostic history",
      "addField": "Register New Field",
      "totalAcreage": "Total Cultivated Area",
      "registeredFields": "Registered Fields",
      "fruitingStage": "Fruiting Stage",
      "tilleringStage": "Tillering Stage",
      "squareFormation": "Square Formation",
      "floweringStage": "Flowering & Fruiting"
    },
    "landing": {
      "heroTag": "NEXT-GENERATION PREDICTIVE AGRI-INTELLIGENCE",
      "heroTitle1": "Predict Crop Outbreaks",
      "heroTitle2": "Before Symptoms Spread",
      "heroSubtitle": "AgriShield X synthesizes real-time microclimate sensors, regional outbreak radars, and multimodal computer vision to protect farmer yields.",
      "ctaExplore": "Explore Demo Farm",
      "ctaDoctor": "Try AI Crop Doctor",
      "statFarms": "Active Demo Acreage",
      "statAccuracy": "Pathogen Detection Accuracy",
      "statAlerts": "Early Warning Lead Time",
      "featuresTitle": "Built for Resilient Agriculture",
      "featuresSubtitle": "Integrated decision intelligence from farm boundary to regional market",
      "f1Title": "Predictive Risk Engine",
      "f1Desc": "Synthesizes weather, disease scans, and regional clusters into an explainable 0–100 farm health index.",
      "f2Title": "Multimodal AI Crop Doctor",
      "f2Desc": "Instant visual leaf diagnosis with organic and chemical prescriptions tailored to local practices.",
      "f3Title": "Regional Outbreak Radar",
      "f3Desc": "Geographic tracking of pathogen spread clusters across agricultural taluks and districts.",
      "f4Title": "Context-Aware Farm Copilot",
      "f4Desc": "Bilingual AI advisor grounded in your farm live telemetry, soil moisture, and active crops."
    },
    "common": {
      "whyAlertTitle": "Why is this Farm Risk Alert Active?",
      "whyAlertDesc": "Transparent breakdown of multi-factor environmental and diagnostic drivers.",
      "close": "Close",
      "riskScoreText": "Calculated Risk",
      "healthScoreText": "Health Index"
    }
  },
  "kn": {
    "appName": "AgriShield X",
    "tagline": "ಬುದ್ಧಿವಂತ ಬೆಳೆ ಸಂರಕ್ಷಣೆಗಾಗಿ ಮುನ್ಸೂಚಕ AI",
    "exploreDemo": "Explore Demo Farm",
    "diagnoseCrop": "ಎಲೆ ಸ್ಕ್ಯಾನ್ ರೋಗನಿರ್ಣಯ",
    "resetDemo": "ಡೆಮೊ ಫಾರ್ಮ್ ಮರುಹೊಂದಿಸಿ",
    "welcomeBack": "ಸ್ವಾಗತ",
    "farmRegion": "ಕೃಷಿ ವಲಯ",
    "regionLocation": "ಬೆಂಗಳೂರು ಕೃಷಿ ವಲಯ (ಕರ್ನಾಟಕ)",
    "heroQuote": "“ಉತ್ತಮ ಒಳನೋಟಗಳು, ಆರೋಗ್ಯಕರ ಇಳುವರಿ”",
    "healthStatusLabel": "ಆರೋಗ್ಯ",
    "riskStatusLabel": "ಅಪಾಯ",
    "inverseExplanation": "ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಎಂಬುದು ಲೆಕ್ಕಹಾಕಿದ ಅಪಾಯದ ಧನಾತ್ಮಕ ವಿಲೋಮವಾಗಿದೆ (100 - ಅಪಾಯ ಸ್ಕೋರ್).",
    "nav": {
      "landing": "ಅವಲೋಕನ",
      "dashboard": "ಕೃಷಿ ಆರೋಗ್ಯ",
      "cropDoctor": "AI ಬೆಳೆ ವೈದ್ಯ",
      "outbreakRadar": "ರೋಗ ಹರಡುವಿಕೆ ರೇಡಾರ್",
      "farmCopilot": "ಕೃಷಿ ಕೋಪೈಲಟ್",
      "cropTracker": "ಬೆಳೆ ಟ್ರ್ಯಾಕರ್",
      "weather": "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
      "actionCenter": "ಕಾರ್ಯ ಕೇಂದ್ರ",
      "market": "ಮಾರುಕಟ್ಟೆ ಎಪಿಎಂಸಿ",
      "simulator": "ಪರಿಣಾಮ ಸಿಮ್ಯುಲೇಟರ್",
      "settings": "ಸಂಯೋಜನೆಗಳು",
      "help": "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ"
    },
    "dashboard": {
      "title": "ಕೃಷಿ ಆರೋಗ್ಯ ನಿಯಂತ್ರಣ ಕೇಂದ್ರ",
      "subtitle": "ಮುನ್ಸೂಚಕ ಬಹು-ಅಂಶ ಗುಪ್ತಚರ ಮತ್ತು ಪೂರ್ವಭಾವಿ ಬೆಳೆ ಅಪಾಯ ತಡೆಗಟ್ಟುವಿಕೆ",
      "healthScore": "ಕೃಷಿ ಆರೋಗ್ಯ ಸ್ಕೋರ್",
      "healthIndex": "ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ",
      "calculatedRisk": "ಲೆಕ್ಕಹಾಕಿದ ಅಪಾಯ",
      "moderateRisk": "ಮಧ್ಯಮ ಅಪಾಯ",
      "lowRisk": "ಕಡಿಮೆ ಅಪಾಯ (ಆರೋಗ್ಯಕರ)",
      "highRisk": "ಹೆಚ್ಚಿನ ಅಪಾಯ",
      "criticalRisk": "ತೀವ್ರ ಅಪಾಯ",
      "primaryAlertTitle": "ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಅಪಾಯದ ಎಚ್ಚರಿಕೆ",
      "earlyBlightHeadline": "ಕ್ಷೇತ್ರ A (ಟೊಮೇಟೊ) ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ",
      "earlyBlightExplanation": "82% ಸಾಪೇಕ್ಷ ಆರ್ದ್ರತೆ, ಸನ್ನಿಹಿತ ಮಳೆ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಹತ್ತಿರದ ಪ್ರಾದೇಶಿಕ ರೋಗ ಕ್ಲಸ್ಟರ್ (12 ಕಿಮೀ) ನಿಮ್ಮ ಟೊಮೆಟೊ ಬೆಳೆಗೆ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸಿವೆ.",
      "whyButton": "ಏಕೆ?",
      "takeActionButton": "ಕ್ರಮ ಕೈಗೊಳ್ಳಿ",
      "recommendedActionLabel": "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
      "recommendedActionText": "24 ಗಂಟೆಗಳಲ್ಲಿ ಕ್ಷೇತ್ರ A ಕೆಳಭಾಗದ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ರಕ್ಷಣಾತ್ಮಕ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಹಾಕಿ.",
      "riskDriversTitle": "ಅಪಾಯ ಸ್ಕೋರ್ ಘಟಕ ಚಾಲಕಗಳು",
      "activeFieldsTitle": "ಸಕ್ರಿಯ ನೋಂದಾಯಿತ ಕ್ಷೇತ್ರಗಳು",
      "viewAllFields": "ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
      "healthTrendTitle": "7-ದಿನಗಳ ಕೃಷಿ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ",
      "healthTrendSubtitle": "ಕಳೆದ ವಾರದ ಐತಿಹಾಸಿಕ ಕೃಷಿ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ",
      "healthTrendCriticalText": "ಹೆಚ್ಚಿದ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಅಪಾಯ ಸಕ್ರಿಯವಾಗಿದೆ. ಕಾರ್ಯ ಕೇಂದ್ರದ ಕಾರ್ಯಗಳನ್ನು ಪರಿಹರಿಸುವುದು ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಅನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.",
      "healthTrendNormalText": "ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳನ್ನು ನಿರ್ವಹಿಸಲಾಗಿದೆ; ಕೃಷಿಯು ಸಾಮಾನ್ಯ ಅಪಾಯದ ಮಿತಿಯಲ್ಲಿದೆ.",
      "fieldLabels": {
        "disease": "ರೋಗ",
        "stage": "ಹಂತ",
        "risk": "ಅಪಾಯ",
        "status": "ಸ್ಥಿತಿ",
        "acres": "ಎಕರೆ",
        "healthy": "ಆರೋಗ್ಯಕರ",
        "needsAttention": "ಗಮನ ಅಗತ್ಯವಿದೆ",
        "irrigationDue": "ನೀರಾವರಿ ಬಾಕಿ ಇದೆ",
        "outbreakExposure": "ಹರಡುವಿಕೆ ಅಪಾಯ"
      },
      "driverDescriptions": {
        "disease": "ಹೆಚ್ಚಿನ ರೋಗಕಾರಕ ಒತ್ತಡ ಪತ್ತೆಯಾಗಿದೆ",
        "weather": "ರೋಗ ಹರಡುವಿಕೆಗೆ ಅನುಕೂಲಕರ ಪರಿಸ್ಥಿತಿಗಳು",
        "irrigation": "ಮಣ್ಣಿನ ತೇವಾಂಶ ಸ್ವೀಕಾರಾರ್ಹ ವ್ಯಾಪ್ತಿಯಲ್ಲಿದೆ",
        "condition": "ಮಧ್ಯಮ ಒತ್ತಡದ ಸೂಚಕಗಳು",
        "outbreak": "ಪ್ರಾದೇಶಿಕ ಚಟುವಟಿಕೆ ಹೆಚ್ಚಳ (12 ಕಿಮೀ)"
      },
      "driverLabels": {
        "disease": "ರೋಗ ಅಪಾಯ",
        "weather": "ಹವಾಮಾನ ಅಪಾಯ",
        "irrigation": "ನೀರಾವರಿ ಆರೋಗ್ಯ",
        "condition": "ಬೆಳೆ ಸ್ಥಿತಿ",
        "outbreak": "ಹರಡುವಿಕೆ ಅಪಾಯ"
      },
      "factors": {
        "weather-humidity": {
          "label": "ಹೆಚ್ಚಿನ ಸಾಪೇಕ್ಷ ಆರ್ದ್ರತೆ (>75%)",
          "detail": "82% ಸಾಪೇಕ್ಷ ಆರ್ದ್ರತೆಯು ಶಿಲೀಂಧ್ರ ಬೀಜಕಗಳ ಬೆಳವಣಿಗೆಗೆ ಸೂಕ್ತ ವಾತಾವರಣ ಸೃಷ್ಟಿಸುತ್ತದೆ."
        },
        "weather-rain": {
          "label": "ಸನ್ನಿಹಿತ ಮಳೆ ಮುನ್ಸೂಚನೆ",
          "detail": "ಮಳೆಯ ಮುನ್ಸೂಚನೆಯು ಎಲೆಗಳ ತೇವಾಂಶದ ಅವಧಿಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ."
        },
        "crop-disease": {
          "label": "ಸಕ್ರಿಯ ಎಲೆ ಕಲೆಗಳು ಪತ್ತೆಯಾಗಿವೆ (ಟೊಮೇಟೊ)",
          "detail": "ಕ್ಷೇತ್ರ A ಕೆಳಭಾಗದ ಎಲೆಗಳಲ್ಲಿ Alternaria solani ಕಲೆಗಳು ಗುರುತಿಸಲ್ಪಟ್ಟಿವೆ."
        },
        "outbreak-proximity": {
          "label": "ಪ್ರಾದೇಶಿಕ ರೋಗ ಕ್ಲಸ್ಟರ್ (12 ಕಿಮೀ)",
          "detail": "ಹತ್ತಿರದ ತಾಲೂಕಿನಲ್ಲಿ ಟೊಮೇಟೊ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಕ್ಲಸ್ಟರ್ ಪತ್ತೆಯಾಗಿದೆ."
        },
        "action-relief": {
          "label": "ತಡೆಗಟ್ಟುವ ಕ್ರಮ ಜಾರಿಗೊಳಿಸಲಾಗಿದೆ",
          "detail": "ಮಲ್ಚಿಂಗ್ ಅಥವಾ ಜೈವಿಕ ಸಿಂಪಡಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ, ರೋಗ ಹರಡುವಿಕೆಯನ್ನು ತಗ್ಗಿಸಲಾಗಿದೆ."
        }
      }
    },
    "cropDoctor": {
      "title": "AI ಬೆಳೆ ವೈದ್ಯ 2.0",
      "subtitle": "ಪಾರದರ್ಶಕ ವಿವರಣೆ, ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ದೃಶ್ಯ ರೋಗನಿರ್ಣಯ",
      "scannerTitle": "ಬೆಳೆ ಎಲೆ ರೋಗನಿರ್ಣಯ ಸ್ಕ್ಯಾನರ್",
      "dropPrompt": "ಎಲೆಯ ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಅಥವಾ ಫೈಲ್ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
      "cameraButton": "ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ",
      "uploadPrompt": "ಬೆಂಬಲಿತ ಫಾರ್ಮ್ಯಾಟ್‌ಗಳು: JPG, PNG, WEBP (ಗರಿಷ್ಠ 10MB)",
      "samplePhotosPrompt": "ಅಥವಾ ಪರೀಕ್ಷೆಗಾಗಿ ಮಾದರಿ ಎಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      "samples": {
        "tomato": "ಟೊಮೇಟೊ ಎಲೆ (ಅರ್ಲಿ ಬ್ಲೈಟ್)",
        "paddy": "ಭತ್ತದ ಎಲೆ (ಎಲೆ ಬೆಂಕಿ ರೋಗ)",
        "cotton": "ಹತ್ತಿ ಎಲೆ (ಎಲೆ ಸುರುಟು ರೋಗ)",
        "healthy": "ಆರೋಗ್ಯಕರ ಎಲೆ (ನಿಯಂತ್ರಣ)"
      },
      "workflowTitle": "ರೋಗನಿರ್ಣಯದ ಹಂತಗಳು",
      "workflowSteps": [
        {
          "step": "1",
          "title": "ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
          "desc": "ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಪೀಡಿತ ಎಲೆಯ ಮೇಲ್ಮೈಯನ್ನು ಸೆರೆಹಿಡಿಯಿರಿ."
        },
        {
          "step": "2",
          "title": "ಮಲ್ಟಿಮೋಡಲ್ AI ವಿಶ್ಲೇಷಣೆ",
          "desc": "Gemini Vision ರೋಗಕಾರಕ ಕಲೆಗಳು ಮತ್ತು ಅಂಗಾಂಶ ಹಾನಿಯನ್ನು ಪರೀಕ್ಷಿಸುತ್ತದೆ."
        },
        {
          "step": "3",
          "title": "ಚಿಕಿತ್ಸೆ ಮತ್ತು ಕಾರ್ಯ ಯೋಜನೆ",
          "desc": "ಸೂಕ್ತ ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ."
        }
      ],
      "analyzing": "AI ಎಲೆಯ ಮೇಲ್ಮೈ ಮತ್ತು ರೋಗಕಾರಕ ಗುರುತುಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
      "diagnosisAssessment": "ರೋಗನಿರ್ಣಯ ಮೌಲ್ಯಮಾಪನ",
      "cropType": "ಗುರುತಿಸಲಾದ ಬೆಳೆ",
      "diseaseName": "ಪತ್ತೆಯಾದ ಸ್ಥಿತಿ",
      "confidence": "AI ವಿಶ್ವಾಸಾರ್ಹತೆ",
      "severity": "ತೀವ್ರತೆಯ ಮಟ್ಟ",
      "affectedArea": "ಅಂದಾಜು ಪೀಡಿತ ಪ್ರದೇಶ",
      "spreadRisk": "ರೋಗ ಹರಡುವಿಕೆಯ ಅಪಾಯ",
      "urgency": "ಕ್ರಮದ ತುರ್ತು",
      "tabs": {
        "symptoms": "ಲಕ್ಷಣಗಳು ಮತ್ತು ಪುರಾವೆ",
        "treatment": "ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು",
        "prevention": "ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು",
        "explanation": "ಪಾರದರ್ಶಕ AI ವಿವರಣೆ"
      },
      "organicTreatment": "ಸಾವಯವ / ಜೈವಿಕ ನಿಯಂತ್ರಣ",
      "chemicalTreatment": "ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸಾ ವಿಧಾನ",
      "saveToHistory": "ಕ್ಷೇತ್ರದ ಇತಿಹಾಸಕ್ಕೆ ದಾಖಲಿಸಿ",
      "savedSuccess": "ಕ್ಷೇತ್ರದ ಇತಿಹಾಸಕ್ಕೆ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ!"
    },
    "outbreakRadar": {
      "title": "ರೋಗ ಹರಡುವಿಕೆ ರೇಡಾರ್",
      "subtitle": "ಪ್ರಾದೇಶಿಕ ರೋಗಕಾರಕ ಕ್ಲಸ್ಟರ್ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಭೌಗೋಳಿಕ ಸಾಮೀಪ್ಯ ಮುನ್ಸೂಚನೆ",
      "disclaimer": "ಸಿಮ್ಯುಲೇಟೆಡ್ ಪ್ರಾದೇಶಿಕ ರೋಗ ಹರಡುವಿಕೆ ಡೇಟಾಸೆಟ್",
      "filterCrop": "ಬೆಳೆಯ ಪ್ರಕಾರ ಫಿಲ್ಟರ್",
      "filterSeverity": "ತೀವ್ರತೆಯ ಪ್ರಕಾರ ಫಿಲ್ಟರ್",
      "allCrops": "ಎಲ್ಲಾ ಬೆಳೆಗಳು",
      "allSeverities": "ಎಲ್ಲಾ ತೀವ್ರತೆಗಳು",
      "clusterSummary": "ಪ್ರಾದೇಶಿಕ ರೋಗ ಕ್ಲಸ್ಟರ್‌ಗಳು",
      "reportedCases": "ವರದಿಯಾದ ಪ್ರಕರಣಗಳು",
      "distanceFromFarm": "ಕೃಷಿಯಿಂದ ಅಂತರ",
      "viewOnMap": "ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ"
    },
    "farmCopilot": {
      "title": "ಕೃಷಿ ಕೋಪೈಲಟ್ AI",
      "subtitle": "ಕೃಷಿ ವಿಜ್ಞಾನ ಮತ್ತು ನೈಜ-ಸಮಯದ ಟೆಲಿಮೆಟ್ರಿಯೊಂದಿಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುವ AI ಸಲಹೆಗಾರ",
      "contextLabel": "ಕೃಷಿ ಟೆಲಿಮೆಟ್ರಿ ಮತ್ತು ಕ್ಷೇತ್ರದ ಸ್ಥಿತಿಗೆ ಸಂಪರ್ಕಿಸಲಾಗಿದೆ",
      "inputPlaceholder": "ಬೆಳೆ ಲಕ್ಷಣಗಳು, ಔಷಧ ಸಿಂಪಡಣೆ, ಮಾರುಕಟ್ಟೆ ದರಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
      "sendButton": "ಕೋಪೈಲಟ್ ಕೇಳಿ",
      "thinking": "ಕೋಪೈಲಟ್ ಕೃಷಿ ಸಲಹೆಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದೆ...",
      "quickPromptsTitle": "ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಶ್ನೆಗಳು:",
      "quickPrompts": [
        "ಕ್ಷೇತ್ರ A ನಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ರೋಗವನ್ನು ಹೇಗೆ ಗುಣಪಡಿಸುವುದು?",
        "ಮುಂಬರುವ ಮಳೆಯು ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕಗಳನ್ನು ತೊಳೆದು ಹಾಕುತ್ತದೆಯೇ?",
        "ಕೋಲಾರದಲ್ಲಿ ಟೊಮೆಟೊ ಮಾರುಕಟ್ಟೆ ದರದ ಪ್ರವೃತ್ತಿ ಏನು?",
        "ನನ್ನ ಕೃಷಿ ಅಪಾಯದ ಸ್ಕೋರ್ ಅನ್ನು ಹೇಗೆ ಕಡಿಮೆ ಮಾಡುವುದು?"
      ]
    },
    "actionCenter": {
      "title": "ಪೂರ್ವಭಾವಿ ಕಾರ್ಯ ಕೇಂದ್ರ",
      "subtitle": "ಕೃಷಿ ಅಪಾಯ ತಗ್ಗಿಸುವಿಕೆಗೆ ನೇರವಾಗಿ ಲಿಂಕ್ ಮಾಡಲಾದ ಆದ್ಯತೆಯ ಕಾರ್ಯಗಳು",
      "riskReliefNotice": "ಬಾಕಿ ಉಳಿದಿರುವ ಕಾರ್ಯಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸುವುದರಿಂದ ಕೃಷಿ ಅಪಾಯ ಕಡಿಮೆಯಾಗುತ್ತದೆ ಮತ್ತು ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಸುಧಾರಿಸುತ್ತದೆ.",
      "filterAll": "ಎಲ್ಲಾ ಕಾರ್ಯಗಳು",
      "filterPending": "ಬಾಕಿ ಉಳಿದಿರುವವು",
      "filterCompleted": "ಪೂರ್ಣಗೊಂಡವು",
      "markComplete": "ಪರಿಹರಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ",
      "completedBadge": "ಪರಿಹರಿಸಲಾಗಿದೆ",
      "priorityHigh": "ಹೆಚ್ಚಿನ ಆದ್ಯತೆ",
      "priorityMedium": "ಮಧ್ಯಮ ಆದ್ಯತೆ",
      "priorityLow": "ಕಡಿಮೆ ಆದ್ಯತೆ",
      "dueLabel": "ಅಂತಿಮ ದಿನಾಂಕ",
      "reasonLabel": "ಕಾರಣ",
      "emptyMessage": "ಆಯ್ಕೆಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಕಾರ್ಯಗಳು ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ."
    },
    "weather": {
      "title": "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
      "subtitle": "ಮೈಕ್ರೋಕ್ಲೈಮೇಟ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಹವಾಮಾನ ರೋಗದ ಅಪಾಯದ ಮುನ್ಸೂಚನೆ",
      "temperature": "ತಾಪಮಾನ",
      "humidity": "ಸಾಪೇಕ್ಷ ಆರ್ದ್ರತೆ",
      "windSpeed": "ಗಾಳಿಯ ವೇಗ",
      "precipitation": "ಮಳೆಯ ಸಾಧ್ಯತೆ",
      "fungalRiskBanner": "ಶಿಲೀಂಧ್ರ ರೋಗ ಹರಡುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚಾಗಿದೆ",
      "fungalRiskDetail": "ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮತ್ತು ಮಳೆಯ ಮುನ್ಸೂಚನೆಯು ಶಿಲೀಂಧ್ರ ಹರಡುವಿಕೆಯನ್ನು ವೇಗಗೊಳಿಸುತ್ತದೆ.",
      "forecastHeading": "5-ದಿನಗಳ ಕೃಷಿ-ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ"
    },
    "market": {
      "title": "ಮಾರುಕಟ್ಟೆ ಎಪಿಎಂಸಿ ಮಾಹಿತಿ",
      "subtitle": "ನೈಜ-ಸಮಯದ ಎಪಿಎಂಸಿ ಮಂಡಿ ದರಗಳು, ಬೆಲೆ ಪ್ರವೃತ್ತಿ ಮತ್ತು ಕೊಯ್ಲು ಸಮಯದ ಮಾರ್ಗದರ್ಶನ",
      "mandiLocation": "ಮಂಡಿ: ಕೋಲಾರ ಮತ್ತು ಬೆಂಗಳೂರು ಎಪಿಎಂಸಿ",
      "cropCol": "ಬೆಳೆ ತಳಿ",
      "priceCol": "ಮಾದರಿ ಬೆಲೆ (₹/ಕ್ವಿಂಟಾಲ್)",
      "changeCol": "24 ಗಂಟೆ ಪ್ರವೃತ್ತಿ",
      "arrivalCol": "ದೈನಂದಿನ ಆವಕ",
      "guidanceCol": "ಸಲಹಾ ಮಾರ್ಗದರ್ಶನ"
    },
    "simulator": {
      "title": "ಪರಿಣಾಮ ಸಿಮ್ಯುಲೇಟರ್",
      "subtitle": "ಹವಾಮಾನ ಘಟನೆಗಳು ಅಥವಾ ವಿಳಂಬಿತ ಸಿಂಪಡಣೆಗಳ ಪರಿಣಾಮವನ್ನು ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ",
      "simulateButton": "ಸಿಮ್ಯುಲೇಶನ್ ಚಲಾಯಿಸಿ",
      "currentHealth": "ಪ್ರಸ್ತುತ ಆರೋಗ್ಯ ಸ್ಕೋರ್",
      "projectedHealth": "ಅಂದಾಜು ಆರೋಗ್ಯ ಸ್ಕೋರ್",
      "riskDelta": "ಅಂದಾಜು ಅಪಾಯದ ಪ್ರಭಾವ"
    },
    "cropTracker": {
      "title": "ಸಕ್ರಿಯ ಬೆಳೆ ಟ್ರ್ಯಾಕರ್",
      "subtitle": "ಕ್ಷೇತ್ರ ಮಟ್ಟದ ಕೃಷಿ ದಾಖಲೆಗಳು, ಬೆಳವಣಿಗೆಯ ಹಂತಗಳು ಮತ್ತು ಇತಿಹಾಸ",
      "addField": "ಹೊಸ ಕ್ಷೇತ್ರ ನೋಂದಾಯಿಸಿ",
      "totalAcreage": "ಒಟ್ಟು ಕೃಷಿ ಪ್ರದೇಶ",
      "registeredFields": "ನೋಂದಾಯಿತ ಕ್ಷೇತ್ರಗಳು",
      "fruitingStage": "ಕಾಯಿ ಬಿಡುವ ಹಂತ",
      "tilleringStage": "ಕವಲೊಡೆಯುವ ಹಂತ",
      "squareFormation": "ಹೂಮೊಗ್ಗು ಹಂತ",
      "floweringStage": "ಹೂವು ಮತ್ತು ಕಾಯಿ ಹಂತ"
    },
    "landing": {
      "heroTag": "ಮುಂದಿನ ಪೀಳಿಗೆಯ ಮುನ್ಸೂಚಕ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ",
      "heroTitle1": "ರೋಗ ಹರಡುವ ಮುನ್ನವೇ",
      "heroTitle2": "ಬೆಳೆ ರೋಗಗಳನ್ನು ಊಹಿಸಿ",
      "heroSubtitle": "AgriShield X ರೈತರ ಇಳುವರಿಯನ್ನು ರಕ್ಷಿಸಲು ಮೈಕ್ರೋಕ್ಲೈಮೇಟ್ ಸಂವೇದಕಗಳು, ಪ್ರಾದೇಶಿಕ ರೋಗ ರೇಡಾರ್ ಮತ್ತು AI ತಂತ್ರಜ್ಞಾನವನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ.",
      "ctaExplore": "Explore Demo Farm",
      "ctaDoctor": "AI ಬೆಳೆ ವೈದ್ಯ ಪ್ರಯತ್ನಿಸಿ",
      "statFarms": "ಸಕ್ರಿಯ ಡೆಮೊ ವಿಸ್ತೀರ್ಣ",
      "statAccuracy": "ರೋಗ ಪತ್ತೆ ನಿಖರತೆ",
      "statAlerts": "ಮುಂಚಿತ ಎಚ್ಚರಿಕೆ ಸಮಯ",
      "featuresTitle": "ರೈತರ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ",
      "featuresSubtitle": "ಹೊಲದ ಗಡಿಯಿಂದ ಪ್ರಾದೇಶಿಕ ಮಾರುಕಟ್ಟೆಯವರೆಗೆ ಸಂಯೋಜಿತ ನಿರ್ಧಾರ ಬುದ್ಧಿಮತ್ತೆ",
      "f1Title": "ಮುನ್ಸೂಚಕ ಅಪಾಯ ಎಂಜಿನ್",
      "f1Desc": "ಹವಾಮಾನ, ರೋಗ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಕ್ಲಸ್ಟರ್‌ಗಳನ್ನು 0–100 ಕೃಷಿ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕವಾಗಿ ಸಂಯೋಜಿಸುತ್ತದೆ.",
      "f2Title": "ಮಲ್ಟಿಮೋಡಲ್ AI ಬೆಳೆ ವೈದ್ಯ",
      "f2Desc": "ಸ್ಥಳೀಯ ಪದ್ಧತಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ತಕ್ಷಣದ ಎಲೆ ರೋಗನಿರ್ಣಯ.",
      "f3Title": "ಪ್ರಾದೇಶಿಕ ರೋಗ ಹರಡುವಿಕೆ ರೇಡಾರ್",
      "f3Desc": "ಕೃಷಿ ತಾಲೂಕುಗಳು ಮತ್ತು ಜಿಲ್ಲೆಗಳಲ್ಲಿ ರೋಗಕಾರಕ ಹರಡುವಿಕೆಯ ಭೌಗೋಳಿಕ ಟ್ರ್ಯಾಕಿಂಗ್.",
      "f4Title": "ಕೃಷಿ ಕೋಪೈಲಟ್ AI",
      "f4Desc": "ನಿಮ್ಮ ಕೃಷಿ ಡೇಟಾ, ಮಣ್ಣಿನ ತೇವಾಂಶ ಮತ್ತು ಬೆಳೆಗಳಿಗೆ ಹೊಂದಿಕೊಂಡ ದ್ವಿಭಾಷಾ AI ಸಲಹೆಗಾರ."
    },
    "common": {
      "whyAlertTitle": "ಈ ಕೃಷಿ ಅಪಾಯದ ಎಚ್ಚರಿಕೆ ಏಕೆ ಸಕ್ರಿಯವಾಗಿದೆ?",
      "whyAlertDesc": "ಪರಿಸರ ಮತ್ತು ರೋಗನಿರ್ಣಯದ ಬಹು-ಅಂಶ ಚಾಲಕಗಳ ಪಾರದರ್ಶಕ ವಿವರಣೆ.",
      "close": "ಮುಚ್ಚಿ",
      "riskScoreText": "ಲೆಕ್ಕಹಾಕಿದ ಅಪಾಯ",
      "healthScoreText": "ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ"
    }
  },
  "hi": {
    "appName": "AgriShield X",
    "tagline": "स्मार्ट फसल सुरक्षा के लिए प्रेडिक्टिव एआई",
    "exploreDemo": "Explore Demo Farm",
    "diagnoseCrop": "पत्ती स्कैन निदान करें",
    "resetDemo": "डेमो फार्म रीसेट करें",
    "welcomeBack": "स्वागत है",
    "farmRegion": "कृषि क्षेत्र",
    "regionLocation": "बेंगलुरु कृषि-क्षेत्र (कर्नाटक)",
    "heroQuote": "“बेहतर अंतर्दृष्टि, स्वस्थ पैदावार”",
    "healthStatusLabel": "स्वास्थ्य",
    "riskStatusLabel": "जोखिम",
    "inverseExplanation": "स्वास्थ्य स्कोर परिकलित जोखिम का सकारात्मक व्युत्क्रम है (100 - जोखिम स्कोर)।",
    "nav": {
      "landing": "अवलोकन",
      "dashboard": "फार्म स्वास्थ्य",
      "cropDoctor": "एआई फसल डॉक्टर",
      "outbreakRadar": "प्रकोप रडार",
      "farmCopilot": "फार्म कोपायलट",
      "cropTracker": "फसल ट्रैकर",
      "weather": "मौसम पूर्वानुमान",
      "actionCenter": "कार्य केंद्र",
      "market": "मंडी एपीएमसी",
      "simulator": "प्रभाव सिम्युलेटर",
      "settings": "सेटिंग्स",
      "help": "सहायता एवं समर्थन"
    },
    "dashboard": {
      "title": "फार्म स्वास्थ्य कमांड सेंटर",
      "subtitle": "पूर्वानुमानित बहु-कारक बुद्धिमत्ता और सक्रिय फसल जोखिम रोकथाम",
      "healthScore": "फार्म स्वास्थ्य स्कोर",
      "healthIndex": "स्वास्थ्य सूचकांक",
      "calculatedRisk": "परिकलित जोखिम",
      "moderateRisk": "मध्यम जोखिम",
      "lowRisk": "कम जोखिम (स्वस्थ)",
      "highRisk": "उच्च जोखिम",
      "criticalRisk": "गंभीर जोखिम",
      "primaryAlertTitle": "प्राथमिक फार्म जोखिम चेतावनी",
      "earlyBlightHeadline": "खेत A (टमाटर) पर अगेती झुलसा (अर्ली ब्लाइट) जोखिम बढ़ा",
      "earlyBlightExplanation": "82% सापेक्ष आर्द्रता, आसन्न वर्षा का पूर्वानुमान और पास के क्षेत्रीय प्रकोप क्लस्टर (12 किमी) ने आपके टमाटर के खेत के लिए अर्ली ब्लाइट जोखिम बढ़ा दिया है।",
      "whyButton": "क्यों?",
      "takeActionButton": "कार्रवाई करें",
      "recommendedActionLabel": "अनुशंसित कार्रवाई",
      "recommendedActionText": "24 घंटे के भीतर खेत A की निचली पत्तियों का निरीक्षण करें और निवारक मल्चिंग लगाएं।",
      "riskDriversTitle": "जोखिम स्कोर घटक चालक",
      "activeFieldsTitle": "सक्रिय पंजीकृत खेत",
      "viewAllFields": "सभी खेत देखें",
      "healthTrendTitle": "7-दिवसीय फार्म स्वास्थ्य सूचकांक",
      "healthTrendSubtitle": "पिछले सप्ताह का ऐतिहासिक फार्म स्वास्थ्य सूचकांक",
      "healthTrendCriticalText": "अगेती झुलसा जोखिम सक्रिय है। कार्य केंद्र के कार्यों को हल करने से स्वास्थ्य स्कोर बहाल होगा।",
      "healthTrendNormalText": "निवारक उपाय बनाए रखे गए हैं; खेत सामान्य जोखिम सीमा के भीतर काम कर रहा है।",
      "fieldLabels": {
        "disease": "रोग",
        "stage": "अवस्था",
        "risk": "जोखिम",
        "status": "स्थिति",
        "acres": "एकड़",
        "healthy": "स्वस्थ",
        "needsAttention": "ध्यान देने की आवश्यकता",
        "irrigationDue": "सिंचाई देय",
        "outbreakExposure": "प्रकोप जोखिम"
      },
      "driverDescriptions": {
        "disease": "उच्च रोगज़नक़ दबाव पाया गया",
        "weather": "रोग फैलने के लिए अनुकूल परिस्थितियां",
        "irrigation": "मिट्टी की नमी स्वीकार्य सीमा में है",
        "condition": "मध्यम तनाव संकेतक",
        "outbreak": "क्षेत्रीय गतिविधि बढ़ी हुई है (12 किमी)"
      },
      "driverLabels": {
        "disease": "रोग जोखिम",
        "weather": "मौसम जोखिम",
        "irrigation": "सिंचाई स्वास्थ्य",
        "condition": "फसल स्थिति",
        "outbreak": "प्रकोप जोखिम"
      },
      "factors": {
        "weather-humidity": {
          "label": "उच्च सापेक्ष आर्द्रता (>75%)",
          "detail": "82% सापेक्ष आर्द्रता फंगल बीजाणुओं के अंकुरण के लिए अनुकूल स्थिति बनाती है।"
        },
        "weather-rain": {
          "label": "आसन्न वर्षा का पूर्वानुमान",
          "detail": "वर्षा का पूर्वानुमान पत्तियों के गीले रहने की अवधि को बढ़ाता है।"
        },
        "crop-disease": {
          "label": "सक्रिय पत्ती घाव पाए गए (टमाटर)",
          "detail": "खेत A की निचली पत्तियों पर Alternaria solani के लक्षण पहचाने गए हैं।"
        },
        "outbreak-proximity": {
          "label": "क्षेत्रीय प्रकोप क्लस्टर (12 किमी)",
          "detail": "पास के तालुका में टमाटर अर्ली ब्लाइट क्लस्टर पाया गया है।"
        },
        "action-relief": {
          "label": "निवारक कार्रवाई लागू की गई",
          "detail": "मल्चिंग या बायो-स्प्रे पूरा हुआ, रोग के प्रसार को कम किया गया।"
        }
      }
    },
    "cropDoctor": {
      "title": "एआई फसल डॉक्टर 2.0",
      "subtitle": "पारदर्शी तर्क, जैविक और रासायनिक उपचार प्रोटोकॉल के साथ दृश्य रोग निदान",
      "scannerTitle": "फसल पत्ती नैदानिक स्कैनर",
      "dropPrompt": "पत्ती की तस्वीर यहां खींचें या फ़ाइल चुनने के लिए क्लिक करें",
      "cameraButton": "फोटो खींचें",
      "uploadPrompt": "समर्थित प्रारूप: JPG, PNG, WEBP (अधिकतम 10MB)",
      "samplePhotosPrompt": "या परीक्षण के लिए नमूना पत्ती चुनें:",
      "samples": {
        "tomato": "टमाटर की पत्ती (अगेती झुलसा)",
        "paddy": "धान की पत्ती (झोंका रोग/ब्लास्ट)",
        "cotton": "कपास की पत्ती (पत्ती मरोड़ रोग)",
        "healthy": "स्वस्थ पत्ती (नियंत्रण)"
      },
      "workflowTitle": "रोग निदान कार्यप्रणाली मार्गदर्शिका",
      "workflowSteps": [
        {
          "step": "1",
          "title": "स्पष्ट तस्वीर अपलोड करें",
          "desc": "प्राकृतिक प्रकाश में प्रभावित पत्ती की सतह को कैप्चर करें।"
        },
        {
          "step": "2",
          "title": "मल्टीमॉडल एआई विश्लेषण",
          "desc": "Gemini Vision रोगज़नक़ के घावों और ऊतक क्षति की जांच करता है।"
        },
        {
          "step": "3",
          "title": "उपचार और कार्य योजना",
          "desc": "स्थानीय प्रथाओं के अनुरूप उपयुक्त जैविक और रासायनिक उपचार प्राप्त करें।"
        }
      ],
      "analyzing": "एआई पत्ती की सतह और रोगज़नक़ मार्करों का विश्लेषण कर रहा है...",
      "diagnosisAssessment": "नैदानिक मूल्यांकन",
      "cropType": "पहचानी गई फसल",
      "diseaseName": "पहचानी गई स्थिति",
      "confidence": "एआई विश्वसनीयता",
      "severity": "गंभीरता का स्तर",
      "affectedArea": "अनुमानित प्रभावित क्षेत्र",
      "spreadRisk": "रोग प्रसार का जोखिम",
      "urgency": "कार्रवाई की तात्कालिकता",
      "tabs": {
        "symptoms": "लक्षण एवं साक्ष्य",
        "treatment": "उपचार प्रोटोकॉल",
        "prevention": "निवारक उपाय",
        "explanation": "पारदर्शी एआई तर्क"
      },
      "organicTreatment": "जैविक / प्राकृतिक नियंत्रण",
      "chemicalTreatment": "रासायनिक उपचार प्रोटोकॉल",
      "saveToHistory": "खेत टाइमलाइन में दर्ज करें",
      "savedSuccess": "खेत टाइमलाइन में सफलतापूर्वक दर्ज किया गया!"
    },
    "outbreakRadar": {
      "title": "रोग प्रकोप रडार",
      "subtitle": "क्षेत्रीय रोगज़नक़ क्लस्टर अलर्ट और भौगोलिक निकटता चेतावनी",
      "disclaimer": "सिम्युलेटेड क्षेत्रीय प्रकोप डेटासेट",
      "filterCrop": "फसल द्वारा फ़िल्टर करें",
      "filterSeverity": "गंभीरता द्वारा फ़िल्टर करें",
      "allCrops": "सभी फसलें",
      "allSeverities": "सभी गंभीरता स्तर",
      "clusterSummary": "क्षेत्रीय प्रकोप क्लस्टर",
      "reportedCases": "दर्ज किए गए मामले",
      "distanceFromFarm": "खेत से दूरी",
      "viewOnMap": "मानचित्र पर देखें"
    },
    "farmCopilot": {
      "title": "फार्म कोपायलट एआई",
      "subtitle": "सटीक कृषि विज्ञान और रीयल-टाइम टेलीमेट्री द्वारा संचालित कृषि सलाहकार",
      "contextLabel": "फार्म टेलीमेट्री और खेत स्थिति से जुड़ा हुआ",
      "inputPlaceholder": "फसल के लक्षणों, छिड़काव अनुसूची, मंडी भाव के बारे में पूछें...",
      "sendButton": "कोपायलट से पूछें",
      "thinking": "कोपायलट कृषि सलाह तैयार कर रहा है...",
      "quickPromptsTitle": "सुझाए गए प्रश्न:",
      "quickPrompts": [
        "खेत A पर अर्ली ब्लाइट का उपचार कैसे करें?",
        "क्या आने वाली बारिश बायो-फंगीसाइड्स को धो देगी?",
        "कोलार में टमाटर का मंडी भाव क्या चल रहा है?",
        "मैं अपने फार्म के जोखिम स्कोर को कैसे कम कर सकता हूँ?"
      ]
    },
    "actionCenter": {
      "title": "सक्रिय कार्य केंद्र",
      "subtitle": "फार्म जोखिम न्यूनीकरण से सीधे जुड़े प्राथमिकता वाले कृषि कार्य",
      "riskReliefNotice": "लंबित कार्यों को पूरा करने से फार्म जोखिम स्कोर घटता है और स्वास्थ्य स्कोर सुधरता है।",
      "filterAll": "सभी कार्य",
      "filterPending": "लंबित",
      "filterCompleted": "पूर्ण",
      "markComplete": "हल के रूप में चिह्नित करें",
      "completedBadge": "हल किया गया",
      "priorityHigh": "उच्च प्राथमिकता",
      "priorityMedium": "मध्यम प्राथमिकता",
      "priorityLow": "कम प्राथमिकता",
      "dueLabel": "अंतिम तिथि",
      "reasonLabel": "कारण",
      "emptyMessage": "चयनित फ़िल्टर से कोई कार्य मेल नहीं खाता।"
    },
    "weather": {
      "title": "मौसम पूर्वानुमान",
      "subtitle": "माइक्रोक्लाइमेट ट्रैकिंग और मौसम संबंधी फसल रोग जोखिम पूर्वानुमान",
      "temperature": "तापमान",
      "humidity": "सापेक्ष आर्द्रता",
      "windSpeed": "हवा की गति",
      "precipitation": "वर्षा की संभावना",
      "fungalRiskBanner": "फंगल रोग फैलने की उच्च संभावना",
      "fungalRiskDetail": "उच्च आर्द्रता और वर्षा का पूर्वानुमान फंगल बीजाणुओं के प्रसार को तेज करता है।",
      "forecastHeading": "5-दिवसीय कृषि-मौसम पूर्वानुमान"
    },
    "market": {
      "title": "मंडी एपीएमसी बुद्धिमत्ता",
      "subtitle": "रीयल-टाइम एपीएमसी मंडी भाव, मूल्य रुझान और फसल कटाई समय सलाह",
      "mandiLocation": "मंडी: कोलार एवं बेंगलुरु एपीएमसी",
      "cropCol": "फसल किस्म",
      "priceCol": "मॉडल मूल्य (₹/क्विंटल)",
      "changeCol": "24 घंटे रुझान",
      "arrivalCol": "दैनिक आवक",
      "guidanceCol": "सलाहकार मार्गदर्शन"
    },
    "simulator": {
      "title": "परिदृश्य प्रभाव सिम्युलेटर",
      "subtitle": "मौसम की घटनाओं या विलंबित छिड़काव के प्रभाव का अनुकरण करें",
      "simulateButton": "सिम्युलेशन चलाएं",
      "currentHealth": "वर्तमान स्वास्थ्य स्कोर",
      "projectedHealth": "अनुमानित स्वास्थ्य स्कोर",
      "riskDelta": "अनुमानित जोखिम प्रभाव"
    },
    "cropTracker": {
      "title": "सक्रिय फसल ट्रैकर",
      "subtitle": "खेत स्तर के कृषि रिकॉर्ड, विकास अवस्थाएं और नैदानिक इतिहास",
      "addField": "नया खेत पंजीकृत करें",
      "totalAcreage": "कुल कृषि क्षेत्र",
      "registeredFields": "पंजीकृत खेत",
      "fruitingStage": "फल लगने की अवस्था",
      "tilleringStage": "कल्ले फूटने की अवस्था",
      "squareFormation": "कली बनने की अवस्था",
      "floweringStage": "फूल व फल अवस्था"
    },
    "landing": {
      "heroTag": "अगली पीढ़ी की पूर्वानुमानित कृषि बुद्धिमत्ता",
      "heroTitle1": "लक्षण फैलने से पहले ही",
      "heroTitle2": "फसल रोगों का पूर्वानुमान लगाएं",
      "heroSubtitle": "AgriShield X किसानों की उपज की सुरक्षा के लिए मौसम सेंसर, क्षेत्रीय प्रकोप रडार और एआई विज़न तकनीक को जोड़ता है।",
      "ctaExplore": "Explore Demo Farm",
      "ctaDoctor": "एआई फसल डॉक्टर आजमाएं",
      "statFarms": "सक्रिय डेमो रकबा",
      "statAccuracy": "रोग पहचान सटीकता",
      "statAlerts": "पूर्व चेतावनी का समय",
      "featuresTitle": "किसान लचीलेपन के लिए निर्मित",
      "featuresSubtitle": "खेत की सीमा से क्षेत्रीय मंडी तक एकीकृत निर्णय बुद्धिमत्ता",
      "f1Title": "पूर्वानुमानित जोखिम इंजन",
      "f1Desc": "मौसम, रोग स्कैन और क्षेत्रीय क्लस्टरों को 0-100 फार्म स्वास्थ्य सूचकांक में जोड़ता है।",
      "f2Title": "मल्टीमॉडल एआई फसल डॉक्टर",
      "f2Desc": "स्थानीय प्रथाओं के अनुरूप जैविक और रासायनिक उपचार के साथ त्वरित पत्ती निदान।",
      "f3Title": "क्षेत्रीय प्रकोप रडार",
      "f3Desc": "कृषि तालुकों और जिलों में रोगज़नक़ प्रसार का भौगोलिक मानचित्रण।",
      "f4Title": "संदर्भ-सचेत फार्म कोपायलट",
      "f4Desc": "आपके फार्म डेटा, मिट्टी की नमी और फसलों पर आधारित एआई सलाहकार।"
    },
    "common": {
      "whyAlertTitle": "यह फार्म जोखिम चेतावनी क्यों सक्रिय है?",
      "whyAlertDesc": "पर्यावरणीय और नैदानिक कारकों का पारदर्शी विवरण।",
      "close": "बंद करें",
      "riskScoreText": "परिकलित जोखिम",
      "healthScoreText": "स्वास्थ्य सूचकांक"
    }
  },
  "ta": {
    "appName": "AgriShield X",
    "tagline": "திறமையான பயிர் பாதுகாப்புக்கான முன்கணிப்பு AI",
    "exploreDemo": "Explore Demo Farm",
    "diagnoseCrop": "இலை ஸ்கேன் நோயறிதல்",
    "resetDemo": "டெமோ பண்ணையை மீட்டமைக்கவும்",
    "welcomeBack": "நல்வரவு",
    "farmRegion": "பண்ணை மண்டலம்",
    "regionLocation": "பெங்களூரு விவசாய மண்டலம் (கர்நாடகா)",
    "heroQuote": "“சிறந்த நுண்ணறிவு, ஆரோக்கியமான அறுவடை”",
    "healthStatusLabel": "ஆரோக்கியம்",
    "riskStatusLabel": "ஆபத்து",
    "inverseExplanation": "ஆரோக்கிய மதிப்பெண் என்பது கணக்கிடப்பட்ட ஆபத்தின் நேர்மறை தலைகீழ் ஆகும் (100 - ஆபத்து மதிப்பெண்).",
    "nav": {
      "landing": "கண்ணோட்டம்",
      "dashboard": "பண்ணை ஆரோக்கியம்",
      "cropDoctor": "AI பயிர் மருத்துவர்",
      "outbreakRadar": "நோய் பரவல் ரேடார்",
      "farmCopilot": "பண்ணை கோபிலாட்",
      "cropTracker": "பயிர் டிராக்கர்",
      "weather": "வானிலை நுண்ணறிவு",
      "actionCenter": "செயல் மையம்",
      "market": "சந்தை ஏபிஎம்சி",
      "simulator": "தாக்க உருவகப்படுத்துதல்",
      "settings": "அமைப்புகள்",
      "help": "உதவி & ஆதரவு"
    },
    "dashboard": {
      "title": "பண்ணை ஆரோக்கிய கட்டளை மையம்",
      "subtitle": "முன்கணிப்பு பல காரணி நுண்ணறிவு மற்றும் செயலூக்க பயிர் இடர் தடுப்பு",
      "healthScore": "பண்ணை ஆரோக்கிய மதிப்பெண்",
      "healthIndex": "ஆரோக்கிய குறியீடு",
      "calculatedRisk": "கணக்கிடப்பட்ட ஆபத்து",
      "moderateRisk": "மிதமான ஆபத்து",
      "lowRisk": "குறைந்த ஆபத்து (ஆரோக்கியமானது)",
      "highRisk": "அதிக ஆபத்து",
      "criticalRisk": "முக்கிய ஆபத்து",
      "primaryAlertTitle": "முக்கிய பண்ணை இடர் எச்சரிக்கை",
      "earlyBlightHeadline": "புலம் A (தக்காளி) இல் முன் பருவ கருகல் நோய் ஆபத்து அதிகரித்துள்ளது",
      "earlyBlightExplanation": "82% ஈரப்பதம், வரவிருக்கும் மழை முன்னறிவிப்பு மற்றும் அருகிலுள்ள பிராந்திய நோய் தாக்கம் (12 கிமீ) உங்கள் தக்காளி வயலுக்கு கருகல் நோய் ஆபத்தை அதிகரித்துள்ளது.",
      "whyButton": "ஏன்?",
      "takeActionButton": "நடவடிக்கை எடுங்கள்",
      "recommendedActionLabel": "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
      "recommendedActionText": "24 மணி நேரத்திற்குள் புலம் A கீழ் இலைகளை ஆய்வு செய்து தடுப்பு மூடாக்கு இடவும்.",
      "riskDriversTitle": "இடர் மதிப்பெண் கூறு இயக்கிகள்",
      "activeFieldsTitle": "செயலில் உள்ள பதிவு செய்யப்பட்ட வயல்கள்",
      "viewAllFields": "அனைத்து வயல்களையும் காண்க",
      "healthTrendTitle": "7-நாள் பண்ணை ஆரோக்கிய குறியீடு",
      "healthTrendSubtitle": "கடந்த வார வரலாற்று பண்ணை ஆரோக்கிய குறியீடு",
      "healthTrendCriticalText": "கருகல் நோய் ஆபத்து செயலில் உள்ளது. செயல் மைய பணிகளை முடிப்பது ஆரோக்கிய மதிப்பெண்ணை மீட்டெடுக்கும்.",
      "healthTrendNormalText": "தடுப்பு நடவடிக்கைகள் பராமரிக்கப்படுகின்றன; பண்ணை இயல்பான ஆபத்து வரம்பிற்குள் செயல்படுகிறது.",
      "fieldLabels": {
        "disease": "நோய்",
        "stage": "நிலை",
        "risk": "ஆபத்து",
        "status": "நிலை",
        "acres": "ஏக்கர்",
        "healthy": "ஆரோக்கியமானது",
        "needsAttention": "கவனம் தேவை",
        "irrigationDue": "பாசனம் தேவை",
        "outbreakExposure": "பரவல் ஆபத்து"
      },
      "driverDescriptions": {
        "disease": "அதிக நோய்க்கிருமி அழுத்தம் கண்டறியப்பட்டது",
        "weather": "நோய் பரவுவதற்கு சாதகமான சூழ்நிலைகள்",
        "irrigation": "மண் ஈரப்பதம் ஏற்றுக்கொள்ளக்கூடிய வரம்பில் உள்ளது",
        "condition": "மிதமான அழுத்த குறிகாட்டிகள்",
        "outbreak": "பிராந்திய செயல்பாடு அதிகரித்துள்ளது (12 கிமீ)"
      },
      "driverLabels": {
        "disease": "நோய் ஆபத்து",
        "weather": "வானிலை ஆபத்து",
        "irrigation": "பாசன ஆரோக்கியம்",
        "condition": "பயிர் நிலை",
        "outbreak": "பரவல் ஆபத்து"
      },
      "factors": {
        "weather-humidity": {
          "label": "அதிக ஈரப்பதம் (>75%)",
          "detail": "82% ஈரப்பதம் பூஞ்சை வித்துக்கள் முளைப்பதற்கு சாதகமான சூழலை உருவாக்குகிறது."
        },
        "weather-rain": {
          "label": "வரவிருக்கும் மழை முன்னறிவிப்பு",
          "detail": "மழை முன்னறிவிப்பு இலைகளில் ஈரப்பதம் நீடிக்கும் காலத்தை அதிகரிக்கிறது."
        },
        "crop-disease": {
          "label": "செயலில் உள்ள இலை புள்ளிகள் கண்டறியப்பட்டன (தக்காளி)",
          "detail": "புலம் A கீழ் இலைகளில் Alternaria solani புள்ளிகள் அடையாளம் காணப்பட்டுள்ளன."
        },
        "outbreak-proximity": {
          "label": "பிராந்திய நோய் தாக்கம் (12 கிமீ)",
          "detail": "அருகிலுள்ள தாலுகாவில் தக்காளி கருகல் நோய் தாக்கம் கண்டறியப்பட்டுள்ளது."
        },
        "action-relief": {
          "label": "தடுப்பு நடவடிக்கை செயல்படுத்தப்பட்டது",
          "detail": "மூடாக்கு அல்லது உயிரியல் தெளிப்பு நிறைவடைந்தது, நோய் பரவல் குறைக்கப்பட்டது."
        }
      }
    },
    "cropDoctor": {
      "title": "AI பயிர் மருத்துவர் 2.0",
      "subtitle": "வெளிப்படையான விளக்கம், இயற்கை மற்றும் வேதியியல் பரிந்துரைகளுடன் கூடிய காட்சி நோயறிதல்",
      "scannerTitle": "பயிர் இலை நோயறிதல் ஸ்கேனர்",
      "dropPrompt": "இலை புகைப்படத்தை இங்கே இழுக்கவும் அல்லது கோப்பைத் தேர்ந்தெடுக்க கிளிக் செய்யவும்",
      "cameraButton": "புகைப்படம் எடுக்கவும்",
      "uploadPrompt": "ஆதரிக்கப்படும் வடிவங்கள்: JPG, PNG, WEBP (அதிகபட்சம் 10MB)",
      "samplePhotosPrompt": "அல்லது சோதனைக்கு மாதிரி இலையைத் தேர்ந்தெடுக்கவும்:",
      "samples": {
        "tomato": "தக்காளி இலை (முன் கருகல் நோய்)",
        "paddy": "நெல் இலை (இலை குலை நோய்)",
        "cotton": "பருத்தி இலை (இலை சுருள் நோய்)",
        "healthy": "ஆரோக்கியமான இலை (கட்டுப்பாடு)"
      },
      "workflowTitle": "நோயறிதல் பணிப்பாய்வு வழிகாட்டி",
      "workflowSteps": [
        {
          "step": "1",
          "title": "தெளிவான புகைப்படத்தைப் பதிவேற்றவும்",
          "desc": "இயற்கை வெளிச்சத்தில் பாதிக்கப்பட்ட இலை மேற்பரப்பை புகைப்படம் எடுக்கவும்."
        },
        {
          "step": "2",
          "title": "மல்டிமாடல் AI பகுப்பாய்வு",
          "desc": "Gemini Vision நோய்க்கிருமி புள்ளிகள் மற்றும் திசு சேதத்தை ஆய்வு செய்கிறது."
        },
        {
          "step": "3",
          "title": "சிகிச்சை மற்றும் செயல் திட்டம்",
          "desc": "பொருத்தமான இயற்கை மற்றும் வேதியியல் சிகிச்சை பரிந்துரைகளைப் பெறுங்கள்."
        }
      ],
      "analyzing": "AI இலை மேற்பரப்பு மற்றும் நோய்க்கிருமி குறிகாட்டிகளை பகுப்பாய்வு செய்கிறது...",
      "diagnosisAssessment": "நோயறிதல் மதிப்பீடு",
      "cropType": "கண்டறியப்பட்ட பயிர்",
      "diseaseName": "அடையாளம் காணப்பட்ட நிலை",
      "confidence": "AI நம்பிக்கை அளவு",
      "severity": "தீவிரத்தன்மை நிலை",
      "affectedArea": "மதிப்பிடப்பட்ட பாதிக்கப்பட்ட பகுதி",
      "spreadRisk": "நோய் பரவும் ஆபத்து",
      "urgency": "நடவடிக்கை அவசரம்",
      "tabs": {
        "symptoms": "அறிகுறிகள் & சான்றுகள்",
        "treatment": "சிகிச்சை நெறிமுறைகள்",
        "prevention": "தடுப்பு நடவடிக்கைகள்",
        "explanation": "வெளிப்படையான AI விளக்கம்"
      },
      "organicTreatment": "இயற்கை / உயிரியல் கட்டுப்பாடு",
      "chemicalTreatment": "வேதியியல் சிகிச்சை முறை",
      "saveToHistory": "புல வரலாற்று பதிவேட்டில் பதிவு செய்",
      "savedSuccess": "புல வரலாற்று பதிவேட்டில் வெற்றிகரமாக பதிவு செய்யப்பட்டது!"
    },
    "outbreakRadar": {
      "title": "நோய் பரவல் ரேடார்",
      "subtitle": "பிராந்திய நோய்க்கிருமி எச்சரிக்கைகள் மற்றும் புவியியல் அருகாமை எச்சரிக்கை",
      "disclaimer": "உருவகப்படுத்தப்பட்ட பிராந்திய நோய் பரவல் தரவுத்தொகுப்பு",
      "filterCrop": "பயிர் மூலம் வடிகட்டவும்",
      "filterSeverity": "தீவிரத்தன்மை மூலம் வடிகட்டவும்",
      "allCrops": "அனைத்து பயிர்கள்",
      "allSeverities": "அனைத்து நிலைகள்",
      "clusterSummary": "பிராந்திய நோய் திரள்கள்",
      "reportedCases": "பதிவான வழக்குகள்",
      "distanceFromFarm": "பண்ணையிலிருந்து தூரம்",
      "viewOnMap": "வரைபடத்தில் காண்க"
    },
    "farmCopilot": {
      "title": "பண்ணை கோபிலாட் AI",
      "subtitle": "துல்லியமான வேளாண் அறிவியல் மற்றும் நேரடி டெலிமெட்ரி மூலம் இயங்கும் ஆலோசகர்",
      "contextLabel": "பண்ணை டெலிமெட்ரி மற்றும் வயல் நிலையுடன் இணைக்கப்பட்டுள்ளது",
      "inputPlaceholder": "பயிர் அறிகுறிகள், மருந்து தெளிப்பு அட்டவணை, சந்தை விலைகள் பற்றி கேளுங்கள்...",
      "sendButton": "கோபிலாட்டிடம் கேளுங்கள்",
      "thinking": "கோபிலாட் வேளாண் ஆலோசனையைத் தயாரிக்கிறது...",
      "quickPromptsTitle": "பரிந்துரைக்கப்பட்ட கேள்விகள்:",
      "quickPrompts": [
        "புலம் A இல் முன் கருகல் நோயை எவ்வாறு குணப்படுத்துவது?",
        "வரவிருக்கும் மழை இயற்கை பூஞ்சைக் கொல்லிகளை கழுவி விடுமா?",
        "கோலாரில் தக்காளி சந்தை விலை போக்கு என்ன?",
        "எனது பண்ணை இடர் மதிப்பெண்ணை எவ்வாறு குறைப்பது?"
      ]
    },
    "actionCenter": {
      "title": "செயலூக்க செயல் மையம்",
      "subtitle": "பண்ணை இடர் தணிப்புடன் நேரடியாக இணைக்கப்பட்ட முன்னுரிமைப் பணிகள்",
      "riskReliefNotice": "நிலுவையில் உள்ள பணிகளை முடிப்பது பண்ணை இடர் மதிப்பெண்ணைக் குறைத்து ஆரோக்கியத்தை மீட்டெடுக்கும்.",
      "filterAll": "அனைத்து பணிகள்",
      "filterPending": "நிலுவையில் உள்ளவை",
      "filterCompleted": "முடிந்தவை",
      "markComplete": "தீர்க்கப்பட்டதாகக் குறிக்கவும்",
      "completedBadge": "தீர்க்கப்பட்டது",
      "priorityHigh": "அதிக முன்னுரிமை",
      "priorityMedium": "நடுத்தர முன்னுரிமை",
      "priorityLow": "குறைந்த முன்னுரிமை",
      "dueLabel": "முடிவு தேதி",
      "reasonLabel": "காரணம்",
      "emptyMessage": "தேர்ந்தெடுக்கப்பட்ட வடிகட்டிக்கு பணிகள் எதுவும் பொருந்தவில்லை."
    },
    "weather": {
      "title": "வானிலை நுண்ணறிவு",
      "subtitle": "மைக்ரோக்ளைமேட் கண்காணிப்பு மற்றும் வானிலை நோய் இடர் முன்னறிவிப்பு",
      "temperature": "வெப்பநிலை",
      "humidity": "சார்பு ஈரப்பதம்",
      "windSpeed": "காற்றின் வேகம்",
      "precipitation": "மழைக்கான வாய்ப்பு",
      "fungalRiskBanner": "பூஞ்சை நோய் பரவுவதற்கான அதிக வாய்ப்பு",
      "fungalRiskDetail": "அதிக ஈரப்பதம் மற்றும் மழை முன்னறிவிப்பு பூஞ்சை பரவுவதை துரிதப்படுத்துகிறது.",
      "forecastHeading": "5-நாள் வேளாண்-வானிலை முன்னறிவிப்பு"
    },
    "market": {
      "title": "சந்தை ஏபிஎம்சி நுண்ணறிவு",
      "subtitle": "நேரலை ஏபிஎம்சி மண்டி விலைகள், விலை போக்கு மற்றும் அறுவடை நேர வழிகாட்டுதல்",
      "mandiLocation": "மண்டி: கோலார் மற்றும் பெங்களூரு ஏபிஎம்சி",
      "cropCol": "பயிர் வகை",
      "priceCol": "மாதிரி விலை (₹/குவிண்டால்)",
      "changeCol": "24 மணி போக்கு",
      "arrivalCol": "தினசரி வரத்து",
      "guidanceCol": "ஆலோசனை வழிகாட்டுதல்"
    },
    "simulator": {
      "title": "தாக்க உருவகப்படுத்துதல்",
      "subtitle": "வானிலை நிகழ்வுகள் அல்லது தாமதமான தெளிப்புகளின் தாக்கத்தை உருவகப்படுத்துங்கள்",
      "simulateButton": "உருவகப்படுத்துதலை இயக்கவும்",
      "currentHealth": "தற்போதைய ஆரோக்கிய மதிப்பெண்",
      "projectedHealth": "கணிக்கப்பட்ட ஆரோக்கிய மதிப்பெண்",
      "riskDelta": "மதிப்பிடப்பட்ட இடர் தாக்கம்"
    },
    "cropTracker": {
      "title": "செயலில் உள்ள பயிர் டிராக்கர்",
      "subtitle": "வயல் மட்ட வேளாண் பதிவுகள், வளர்ச்சி நிலைகள் மற்றும் நோயறிதல் வரலாறு",
      "addField": "புதிய வயலை பதிவு செய்யவும்",
      "totalAcreage": "மொத்த பயிரிடப்பட்ட பகுதி",
      "registeredFields": "பதிவு செய்யப்பட்ட வயல்கள்",
      "fruitingStage": "காய் பிடிக்கும் நிலை",
      "tilleringStage": "தூர்கட்டும் நிலை",
      "squareFormation": "மொட்டு விடும் நிலை",
      "floweringStage": "பூக்கும் மற்றும் காய்க்கும் நிலை"
    },
    "landing": {
      "heroTag": "அடுத்த தலைமுறை முன்கணிப்பு வேளாண் தொழில்நுட்பம்",
      "heroTitle1": "நோய் பரவுவதற்கு முன்பே",
      "heroTitle2": "பயிர் நோய்களை கணிக்கவும்",
      "heroSubtitle": "AgriShield X விவசாயிகளின் விளைச்சலைப் பாதுகாக்க சென்சார்கள், பிராந்திய நோய் ரேடார் மற்றும் AI தொழில்நுட்பத்தை ஒருங்கிணைக்கிறது.",
      "ctaExplore": "Explore Demo Farm",
      "ctaDoctor": "AI பயிர் மருத்துவரை முயற்சிக்கவும்",
      "statFarms": "செயலில் உள்ள டெமோ பரப்பளவு",
      "statAccuracy": "நோய் கண்டறிதல் துல்லியம்",
      "statAlerts": "முன்கூட்டிய எச்சரிக்கை நேரம்",
      "featuresTitle": "விவசாயிகளின் உறுதித்தன்மைக்காக உருவாக்கப்பட்டது",
      "featuresSubtitle": "வயல் எல்லை முதல் பிராந்திய சந்தை வரை ஒருங்கிணைந்த முடிவு நுண்ணறிவு",
      "f1Title": "முன்கணிப்பு இடர் இயந்திரம்",
      "f1Desc": "வானிலை, நோய் ஸ்கேன் மற்றும் பிராந்திய திரள்களை 0–100 ஆரோக்கிய குறியீடாக இணைக்கிறது.",
      "f2Title": "மல்டிமாடல் AI பயிர் மருத்துவர்",
      "f2Desc": "உள்ளூர் நடைமுறைகளுக்கு ஏற்ப இயற்கை மற்றும் வேதியியல் பரிந்துரைகளுடன் உடனடி இலை நோயறிதல்.",
      "f3Title": "பிராந்திய நோய் பரவல் ரேடார்",
      "f3Desc": "விவசாய தாலுகாக்கள் மற்றும் மாவட்டங்களில் நோய்க்கிருமி பரவலின் புவியியல் கண்காணிப்பு.",
      "f4Title": "பண்ணை கோபிலாட் AI",
      "f4Desc": "உங்கள் பண்ணை தரவு, மண் ஈரப்பதம் மற்றும் பயிர்களுக்கு ஏற்ப இயங்கும் AI உதவியாளர்."
    },
    "common": {
      "whyAlertTitle": "இந்த பண்ணை இடர் எச்சரிக்கை ஏன் செயலில் உள்ளது?",
      "whyAlertDesc": "சுற்றுச்சூழல் மற்றும் நோயறிதல் காரணிகளின் வெளிப்படையான விளக்கம்.",
      "close": "மூடு",
      "riskScoreText": "கணக்கிடப்பட்ட ஆபத்து",
      "healthScoreText": "ஆரோக்கிய குறியீடு"
    }
  }
};
