export default async function handler(req, res) {
  const { lat = 12.9716, lon = 77.5946 } = req.query || {};

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
    );

    if (response.ok) {
      const data = await response.json();
      const current = data.current || {};
      const daily = data.daily || {};

      const temp = Math.round(current.temperature_2m ?? 28);
      const humidity = Math.round(current.relative_humidity_2m ?? 82);
      const wind = Math.round(current.wind_speed_10m ?? 12);
      const rainProb = daily.precipitation_probability_max?.[0] ?? 65;

      return res.status(200).json({
        weatherMode: "Live Weather API (Open-Meteo)",
        isDemo: false,
        location: "Bengaluru Agri-Zone (Karnataka)",
        temp,
        humidity,
        wind,
        rainProbability: rainProb,
        condition: getWeatherConditionText(current.weather_code || 3),
        fungalRiskLevel: calculateFungalRisk(temp, humidity, rainProb),
        forecast: [
          { day: "Today", maxTemp: daily.temperature_2m_max?.[0] ?? 29, minTemp: daily.temperature_2m_min?.[0] ?? 20, rainProb: daily.precipitation_probability_max?.[0] ?? 65, condition: "Light Rain" },
          { day: "Tomorrow", maxTemp: daily.temperature_2m_max?.[1] ?? 28, minTemp: daily.temperature_2m_min?.[1] ?? 19, rainProb: daily.precipitation_probability_max?.[1] ?? 80, condition: "Moderate Showers" },
          { day: "Day 3", maxTemp: daily.temperature_2m_max?.[2] ?? 30, minTemp: daily.temperature_2m_min?.[2] ?? 21, rainProb: daily.precipitation_probability_max?.[2] ?? 40, condition: "Partly Cloudy" },
          { day: "Day 4", maxTemp: daily.temperature_2m_max?.[3] ?? 31, minTemp: daily.temperature_2m_min?.[3] ?? 21, rainProb: daily.precipitation_probability_max?.[3] ?? 20, condition: "Sunny" },
          { day: "Day 5", maxTemp: daily.temperature_2m_max?.[4] ?? 30, minTemp: daily.temperature_2m_min?.[4] ?? 20, rainProb: daily.precipitation_probability_max?.[4] ?? 35, condition: "Overcast" }
        ]
      });
    }
  } catch (err) {
    console.warn("[Weather API] Failed, returning fallback demo weather:", err.message);
  }

  // Fallback Demo Weather
  return res.status(200).json({
    weatherMode: "Demo Weather Fallback",
    isDemo: true,
    location: "Bengaluru Agri-Zone (Karnataka)",
    temp: 28,
    humidity: 82,
    wind: 14,
    rainProbability: 75,
    condition: "Humid & Overcast (Rain Expected)",
    fungalRiskLevel: "HIGH",
    forecast: [
      { day: "Today", maxTemp: 29, minTemp: 20, rainProb: 75, condition: "Light Rain" },
      { day: "Tomorrow", maxTemp: 28, minTemp: 19, rainProb: 85, condition: "Moderate Showers" },
      { day: "Day 3", maxTemp: 30, minTemp: 21, rainProb: 40, condition: "Partly Cloudy" },
      { day: "Day 4", maxTemp: 31, minTemp: 21, rainProb: 20, condition: "Sunny" },
      { day: "Day 5", maxTemp: 30, minTemp: 20, rainProb: 30, condition: "Clear" }
    ]
  });
}

function calculateFungalRisk(temp, humidity, rainProb) {
  if (humidity > 75 && rainProb > 50 && temp >= 22 && temp <= 32) return "HIGH";
  if (humidity > 60 || rainProb > 40) return "MODERATE";
  return "LOW";
}

function getWeatherConditionText(code) {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 65) return "Rain Showers";
  if (code <= 82) return "Heavy Rainfall";
  return "Overcast";
}
