export const initialFields = [
  {
    id: 'field-a',
    name: 'Field A',
    crop: 'Tomato',
    variety: 'Arka Rakshak',
    areaAcres: 2.5,
    plantingDate: '2026-07-15',
    growthStage: 'Fruiting Stage',
    status: 'Needs Attention',
    riskScore: 78,
    irrigationStatus: 'Irrigation Due',
    lastScanned: '2026-09-18',
    currentDiagnosis: {
      diseaseName: 'Early Blight (Alternaria solani)',
      confidence: 94,
      severity: 'High',
      affectedArea: 26,
      spreadRisk: 'High',
      urgency: 'Treat within 24-48 hours',
      symptoms: [
        'Concentric ring dark brown lesions on mature foliage',
        'Yellow chlorotic halos surrounding lesions',
        'Lower foliage defoliation'
      ],
      treatment: {
        organic: ['Spray Copper Octanoate formulation', 'Prune lower infected leaves up to 15cm'],
        chemical: ['Apply Mancozeb 75% WP @ 2g/L', 'Alternate with Azoxystrobin spray after 7 days']
      },
      prevention: ['Switch to drip irrigation lines', 'Apply straw mulch at base of tomato plants']
    },
    timeline: [
      { date: '2026-07-15', type: 'PLANTING', label: 'Planted Tomato (Arka Rakshak)' },
      { date: '2026-08-10', type: 'IRRIGATION', label: 'Drip Irrigation Applied' },
      { date: '2026-09-18', type: 'DIAGNOSIS', label: 'AI Diagnosis: Early Blight Detected (94% confidence)' },
      { date: '2026-09-19', type: 'ACTION', label: 'High Priority Alert Issued' }
    ]
  },
  {
    id: 'field-b',
    name: 'Field B',
    crop: 'Paddy',
    variety: 'IR64',
    areaAcres: 4.0,
    plantingDate: '2026-06-20',
    growthStage: 'Tillering Stage',
    status: 'Healthy',
    riskScore: 22,
    irrigationStatus: 'Optimal Soil Moisture',
    lastScanned: '2026-09-17',
    currentDiagnosis: {
      diseaseName: 'Healthy',
      confidence: 98,
      severity: 'Low',
      affectedArea: 0,
      spreadRisk: 'Low',
      urgency: 'Routine Monitoring',
      symptoms: ['Green healthy tillers', 'No fungal lesions observed'],
      treatment: { organic: ['Apply neem cake fertilizer'], chemical: [] },
      prevention: ['Maintain 5cm standing water in basin']
    },
    timeline: [
      { date: '2026-06-20', type: 'PLANTING', label: 'Transplanted Paddy IR64' },
      { date: '2026-08-25', type: 'IRRIGATION', label: 'Basin Flooding Completed' },
      { date: '2026-09-17', type: 'DIAGNOSIS', label: 'AI Scan: Healthy Crop Condition' }
    ]
  },
  {
    id: 'field-c',
    name: 'Field C',
    crop: 'Bt Cotton',
    variety: 'Bollgard II',
    areaAcres: 3.2,
    plantingDate: '2026-07-01',
    growthStage: 'Square Formation',
    status: 'Irrigation Due',
    riskScore: 45,
    irrigationStatus: 'Irrigation Scheduled Today',
    lastScanned: '2026-09-16',
    currentDiagnosis: {
      diseaseName: 'Mild Leaf Curl Warning',
      confidence: 81,
      severity: 'Moderate',
      affectedArea: 12,
      spreadRisk: 'Moderate',
      urgency: 'Inspect within 3 days',
      symptoms: ['Minor upward leaf curling on top canopy'],
      treatment: { organic: ['Spray yellow sticky traps for whitefly control'], chemical: ['Apply Imidacloprid @ 0.5ml/L'] },
      prevention: ['Control sucking pest vector population']
    },
    timeline: [
      { date: '2026-07-01', type: 'PLANTING', label: 'Sown Bt Cotton Bollgard II' },
      { date: '2026-09-16', type: 'DIAGNOSIS', label: 'AI Scan: Mild Whitefly Leaf Curl Warning' }
    ]
  },
  {
    id: 'field-d',
    name: 'Field D',
    crop: 'Red Chilli',
    variety: 'Guntur Sannam',
    areaAcres: 1.8,
    plantingDate: '2026-07-28',
    growthStage: 'Flowering & Fruiting',
    status: 'Outbreak Exposure',
    riskScore: 58,
    irrigationStatus: 'Sufficient Moisture',
    lastScanned: '2026-09-15',
    currentDiagnosis: {
      diseaseName: 'Anthracnose Fruit Rot Risk',
      confidence: 86,
      severity: 'Moderate',
      affectedArea: 15,
      spreadRisk: 'High',
      urgency: 'Apply preventive spray',
      symptoms: ['Water-soaked sunken circular spots on pods'],
      treatment: { organic: ['Spray Trichoderma viride bio-agent'], chemical: ['Spray Carbendazim @ 1g/L'] },
      prevention: ['Pick infected chilli fruits promptly']
    },
    timeline: [
      { date: '2026-07-28', type: 'PLANTING', label: 'Planted Guntur Red Chilli' },
      { date: '2026-09-15', type: 'DIAGNOSIS', label: 'AI Scan: Anthracnose Fruit Rot Warning' }
    ]
  }
];

export const initialActions = [
  {
    id: 'action-01',
    priority: 'HIGH',
    fieldId: 'field-a',
    fieldName: 'Field A (Tomato)',
    title: 'Inspect Tomato Field A for Early Blight Lesions',
    description: 'Fungi spore pressure elevated by 82% humidity. Check lower canopy leaves.',
    reason: '+18 Humidity | +16 Regional Outbreak Proximity',
    dueDate: 'Today (Within 24 Hours)',
    completed: false
  },
  {
    id: 'action-02',
    priority: 'HIGH',
    fieldId: 'field-a',
    fieldName: 'Field A (Tomato)',
    title: 'Avoid Overhead Evening Sprinkler Irrigation',
    description: 'Switch to drip irrigation lines to limit leaf wetness duration.',
    reason: '+12 Rain Probability | High Fungal Spore Growth',
    dueDate: 'Today',
    completed: false
  },
  {
    id: 'action-03',
    priority: 'MEDIUM',
    fieldId: 'field-c',
    fieldName: 'Field C (Bt Cotton)',
    title: 'Deploy Yellow Sticky Traps for Whitefly Vector Control',
    description: 'Install 15 traps per acre to intercept whiteflies spreading leaf curl.',
    reason: 'Prevent Vector-Borne Virus Spread',
    dueDate: 'Tomorrow',
    completed: false
  },
  {
    id: 'action-04',
    priority: 'LOW',
    fieldId: 'field-b',
    fieldName: 'Field B (Paddy)',
    title: 'Routine Nitrogen Top-Dressing Evaluation',
    description: 'Verify tillering progress before second urea split application.',
    reason: 'Optimal Agronomic Growth Cycle',
    dueDate: 'In 3 Days',
    completed: false
  }
];

export const demoOutbreakDataset = [
  {
    id: 'ob-1',
    disease: 'Early Blight (Alternaria solani)',
    crop: 'Tomato',
    severity: 'High',
    reports: 9,
    timeframe: 'Last 72 hours',
    lat: 13.0125,
    lng: 77.5684,
    location: 'Kolar Agri District',
    distance: '12 km North-East'
  },
  {
    id: 'ob-2',
    disease: 'Paddy Leaf Blast',
    crop: 'Paddy',
    severity: 'Moderate',
    reports: 4,
    timeframe: 'Last 48 hours',
    lat: 12.8942,
    lng: 77.4912,
    location: 'Mandya Paddy Belt',
    distance: '28 km South-West'
  },
  {
    id: 'ob-3',
    disease: 'Chilli Anthracnose',
    crop: 'Chilli',
    severity: 'Critical',
    reports: 12,
    timeframe: 'Last 72 hours',
    lat: 12.9200,
    lng: 77.6800,
    location: 'Guntur-Bengaluru Corridor',
    distance: '16 km East'
  },
  {
    id: 'ob-4',
    disease: 'Cotton Leaf Curl Virus',
    crop: 'Cotton',
    severity: 'Low',
    reports: 2,
    timeframe: 'Last 24 hours',
    lat: 13.1500,
    lng: 77.7000,
    location: 'Davanagere Cotton Zone',
    distance: '42 km North'
  }
];

export const demoMarketPrices = [
  { crop: 'Tomato (Hybrid)', mandi: 'Kolar APMC', pricePerQuintal: 2850, change: '+12.4%', trend: 'UP', momentum: 'High Demand' },
  { crop: 'Paddy (IR64)', mandi: 'Mandya Market', pricePerQuintal: 2320, change: '+2.1%', trend: 'STABLE', momentum: 'Steady' },
  { crop: 'Bt Cotton', mandi: 'Raichur APMC', pricePerQuintal: 7450, change: '-1.5%', trend: 'DOWN', momentum: 'Moderate' },
  { crop: 'Red Chilli (Guntur)', mandi: 'Guntur APMC', pricePerQuintal: 18400, change: '+8.7%', trend: 'UP', momentum: 'Strong' }
];
