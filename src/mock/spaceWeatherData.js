export const SPACE_WEATHER_DATA = {
  geomagneticActivity: [40, 70, 50, 90, 60, 30, 80, 95, 40, 60, 80, 85],
  solarActivity: {
    index: 6,
    level: "Moderate",
    description: "Solar flares observed in active regions. Geomagnetic storms expected."
  },
  auroraProbability: {
    probability: 65,
    description: "High probability of auroras in high-latitude regions due to increased solar wind."
  },
  solarFlares: [
    { id: 1, type: "M-Class Flare", magnitude: "M8.7", date: "2024-08-06 14:20 UTC", region: "AR3664" },
    { id: 2, type: "X-Class Flare", magnitude: "X1.2", date: "2024-08-07 02:45 UTC", region: "AR3664" },
    { id: 3, type: "M-Class Flare", magnitude: "M5.4", date: "2024-08-08 11:15 UTC", region: "AR3664" }
  ]
};
