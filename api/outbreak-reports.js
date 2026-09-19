export default function handler(req, res) {
  res.status(200).json({
    dataSource: "Demo Regional Disease Dataset",
    isDemo: true,
    lastUpdated: new Date().toISOString(),
    clusterAlerts: [
      {
        id: "outbreak-01",
        disease: "Early Blight (Alternaria solani)",
        crop: "Tomato",
        severity: "High",
        reportCount: 9,
        timeframe: "Last 72 hours",
        radiusKm: 15,
        lat: 13.0125,
        lng: 77.5684,
        locationName: "Kolar - Chikkaballapur Agri Belt",
        proximityToUserFarm: "12 km North-East",
        impactOnUser: "High risk exposure to Field A (Tomato)"
      },
      {
        id: "outbreak-02",
        disease: "Paddy Leaf Blast (Magnaporthe oryzae)",
        crop: "Paddy",
        severity: "Moderate",
        reportCount: 4,
        timeframe: "Last 48 hours",
        radiusKm: 25,
        lat: 12.8942,
        lng: 77.4912,
        locationName: "Mandya - Ramanagara District",
        proximityToUserFarm: "28 km South-West",
        impactOnUser: "Low-Moderate exposure to Field B (Paddy)"
      },
      {
        id: "outbreak-03",
        disease: "Cotton Leaf Curl Virus",
        crop: "Cotton",
        severity: "Moderate",
        reportCount: 3,
        timeframe: "Last 24 hours",
        radiusKm: 40,
        lat: 13.1500,
        lng: 77.7000,
        locationName: "Davanagere Cotton Zone",
        proximityToUserFarm: "42 km North",
        impactOnUser: "Monitoring recommended for Field C"
      },
      {
        id: "outbreak-04",
        disease: "Chilli Anthracnose (Fruit Rot)",
        crop: "Chilli",
        severity: "Critical",
        reportCount: 12,
        timeframe: "Last 72 hours",
        radiusKm: 18,
        lat: 12.9200,
        lng: 77.6800,
        locationName: "Guntur - Bengaluru Highway Belt",
        proximityToUserFarm: "16 km East",
        impactOnUser: "Elevated risk warning for Field D (Chilli)"
      }
    ]
  });
}
