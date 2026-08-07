export const SPACE_WEATHER_DATA = {
  solarActivity: {
    index: 145,
    level: "Moderate",
    description: "Increased solar wind pressure detected from recent Coronal Mass Ejection.",
    statusColor: "#fbbf24", // Amber
  },
  geomagneticActivity: {
    kIndex: 5,
    description: "Minor geomagnetic disturbances. Possible auroral activity in high latitudes.",
    statusColor: "#3b82f6", // Blue
  },
  solarFlares: [
    { id: 1, type: "M-Class", date: "2026-08-07 14:22 UTC", magnitude: "M1.2", region: "AR3142" },
    { id: 2, type: "C-Class", date: "2026-08-07 12:10 UTC", magnitude: "C4.5", region: "AR3141" },
  ],
  auroraProbability: {
    probability: 65,
    region: "High North / Low South",
    description: "Optimal conditions for viewing in Alaska, Northern Canada, and Scandinavia.",
  },
  lastUpdate: "Just now",
};
