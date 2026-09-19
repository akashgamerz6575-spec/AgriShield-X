/**
 * Predictive Farm Risk Engine for AgriShield X
 * Generates transparent 0–100 risk scores and explainable factor breakdowns.
 * Score range:
 * 0–29: Low Risk (Healthy)
 * 30–59: Moderate Risk (Attention Required)
 * 60–79: High Risk (Urgent Action Needed)
 * 80–100: Critical Risk (Severe Outbreak Threat)
 */

export const calculateFarmRiskScore = (fields = [], weather = {}, outbreakReports = [], completedActions = []) => {
  let baseRisk = 15;
  const factors = [];

  // 1. Weather Impact
  const humidity = weather.humidity ?? 82;
  const rainProb = weather.rainProbability ?? 75;

  if (humidity > 75) {
    const humidityPoints = 18;
    baseRisk += humidityPoints;
    factors.push({
      id: 'weather-humidity',
      label: 'Elevated Relative Humidity (>75%)',
      impact: `+${humidityPoints}`,
      type: 'negative',
      detail: `Relative humidity at ${humidity}% creates ideal fungal spore germination conditions.`
    });
  }

  if (rainProb > 50) {
    const rainPoints = 12;
    baseRisk += rainPoints;
    factors.push({
      id: 'weather-rain',
      label: 'Imminent Rainfall Forecast',
      impact: `+${rainPoints}`,
      type: 'negative',
      detail: `${rainProb}% precipitation probability increases leaf wetness duration.`
    });
  }

  // 2. Crop Diagnosis & Disease History
  fields.forEach(field => {
    if (field.currentDiagnosis && field.currentDiagnosis.diseaseName !== 'Healthy') {
      const severity = field.currentDiagnosis.severity || 'Moderate';
      let diagPoints = 16;
      if (severity === 'High') diagPoints = 22;
      if (severity === 'Critical') diagPoints = 28;

      baseRisk += diagPoints;
      factors.push({
        id: `diag-${field.id}`,
        label: `Active ${field.currentDiagnosis.diseaseName} on ${field.name}`,
        impact: `+${diagPoints}`,
        type: 'negative',
        detail: `Confirmed ${severity} severity infection affecting ~${field.currentDiagnosis.affectedArea || 25}% foliage area.`
      });
    }
  });

  // 3. Regional Outbreak Exposure
  const highSeverityClusters = outbreakReports.filter(r => r.severity === 'High' || r.severity === 'Critical');
  if (highSeverityClusters.length > 0) {
    const outbreakPoints = 14;
    baseRisk += outbreakPoints;
    factors.push({
      id: 'outbreak-cluster',
      label: 'Regional Outbreak Cluster Proximity',
      impact: `+${outbreakPoints}`,
      type: 'negative',
      detail: `${highSeverityClusters.length} active fungal clusters reported within 20km radius.`
    });
  }

  // 4. Completed Preventive Actions (Reduces Risk!)
  if (completedActions.length > 0) {
    const reliefPoints = Math.min(completedActions.length * 8, 24);
    baseRisk -= reliefPoints;
    factors.push({
      id: 'actions-completed',
      label: 'Completed Preventive Actions',
      impact: `-${reliefPoints}`,
      type: 'positive',
      detail: `Mitigation steps applied (${completedActions.length} task(s) resolved).`
    });
  }

  // Clamp total risk score between 0 and 100
  const finalRiskScore = Math.max(5, Math.min(95, baseRisk));
  const healthScore = 100 - finalRiskScore;

  let riskTier = 'Low';
  let badgeColor = 'badge-low';
  let statusText = 'Low Risk';

  if (finalRiskScore >= 30 && finalRiskScore < 60) {
    riskTier = 'Moderate';
    badgeColor = 'badge-moderate';
    statusText = 'Moderate Risk';
  } else if (finalRiskScore >= 60 && finalRiskScore < 80) {
    riskTier = 'High';
    badgeColor = 'badge-high';
    statusText = 'High Risk';
  } else if (finalRiskScore >= 80) {
    riskTier = 'Critical';
    badgeColor = 'badge-critical';
    statusText = 'Critical Risk';
  }

  // Component breakdown (0-100 scale for gauges)
  const components = {
    diseaseRisk: Math.min(90, Math.round(finalRiskScore * 0.95)),
    weatherRisk: Math.min(88, Math.round((humidity / 100) * 85)),
    irrigationHealth: Math.max(35, 100 - Math.round(finalRiskScore * 0.7)),
    cropCondition: Math.max(40, 100 - Math.round(finalRiskScore * 0.8)),
    outbreakExposure: Math.min(92, Math.round((highSeverityClusters.length / 4) * 85 + 20))
  };

  return {
    riskScore: finalRiskScore,
    healthScore,
    riskTier,
    badgeColor,
    statusText,
    factors,
    components
  };
};
