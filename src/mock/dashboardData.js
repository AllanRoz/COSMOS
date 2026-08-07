export const dashboardData = {
  currentTime: new Date().toISOString(),
  moonPhase: 'Waxing Gibbous',
  distanceToMoon: '384,400 km',
  distanceToSun: '149.6 million km',
  issLocation: {
    lat: 45.23,
    lng: -122.81,
    altitude: '410 km',
    velocity: '7.66 km/s',
  },
  nextIssPass: 'In 4 hours, 12 minutes',
  solarActivity: {
    level: 'Moderate',
    index: 145,
    description: 'Solar flares detected in region 4',
  },
  upcomingLaunch: {
    id: 'LS-2026',
    name: 'Artemis III',
    provider: 'NASA',
    date: '2026-10-12',
    status: 'Scheduled',
  },
  nearEarthObjects: [
    { id: 1, name: '2024 AB', diameter: '450m', velocity: '12.4 km/s', hazard: true },
    { id: 2, name: '2024 BX', diameter: '120m', velocity: '10.1 km/s', hazard: false },
    { id: 3, name: '2024 CY', diameter: '200m', velocity: '15.2 km/s', hazard: true },
  ],
  apod: {
    title: 'The Pillars of Creation',
    url: 'https://images.nasa.gov/apod/placeholder.jpg',
    explanation: 'A stunning view of the Pillars of Creation in the Eagle Nebula.',
  }
};