export const MISSION_DATA = {
  "starlink-8-5": {
    id: "starlink-8-5",
    name: "Starlink 8-5",
    description: "SpaceX Starlink mission deploying 23 V2 Mini satellites to low Earth orbit, expanding global broadband coverage.",
    status: "Scheduled",
    provider: "SpaceX",
    rocket: "Falcon 9",
    launchDate: "2026-08-10",
    launchTime: "08:45:00",
    location: "Vandenberg Space Force Base, California",
    destination: "Low Earth Orbit",
    details: {
      payload: "23 Starlink V2 Mini satellites",
      orbit: "LEO",
      customer: "SpaceX"
    }
  },
  "crew-9": {
    id: "crew-9",
    name: "SpaceX Crew-9",
    description: "NASA Commercial Crew Program mission carrying astronauts to the International Space Station for a six-month expedition.",
    status: "Scheduled",
    provider: "NASA / SpaceX",
    rocket: "Falcon 9",
    launchDate: "2026-08-15",
    launchTime: "14:23:00",
    location: "Kennedy Space Center, Florida",
    destination: "International Space Station",
    details: {
      crew: 4,
      duration: "6 months",
      orbit: "LEO"
    }
  },
  "artemis-ii": {
    id: "artemis-ii",
    name: "Artemis II",
    description: "First crewed mission of NASA's Artemis program. Four astronauts will orbit the Moon and return to Earth, paving the way for future lunar landings.",
    status: "Scheduled",
    provider: "NASA",
    rocket: "SLS",
    launchDate: "2026-09-20",
    launchTime: "09:15:00",
    location: "Kennedy Space Center, Florida",
    destination: "Lunar Orbit",
    details: {
      crew: 4,
      duration: "10 days",
      milestone: "First crewed lunar flyby since 1972"
    }
  },
  "europa-clipper": {
    id: "europa-clipper",
    name: "Europa Clipper",
    description: "NASA mission to investigate whether Jupiter's moon Europa has conditions suitable for life. Will perform detailed reconnaissance of Europa's ice shell and ocean.",
    status: "In Progress",
    provider: "NASA / JPL",
    rocket: "Falcon Heavy",
    launchDate: "2024-10-14",
    location: "Kennedy Space Center, Florida",
    destination: "Jupiter's Moon Europa",
    details: {
      arrival: "April 2030",
      orbit: "Jupiter orbit",
      instruments: 9
    }
  },
  "insight": {
    id: "insight",
    name: "InSight Lander",
    description: "NASA Mars lander designed to study the interior structure and composition of Mars. Detected over 1,300 marsquakes before mission conclusion.",
    status: "Completed",
    provider: "NASA / JPL",
    rocket: "Atlas V",
    launchDate: "2018-05-05",
    location: "Vandenberg Air Force Base, California",
    destination: "Mars",
    details: {
      landing: "2018-11-26",
      duration: "4 years",
      conclusion: "December 2022"
    }
  },
  "perseverance": {
    id: "perseverance",
    name: "Perseverance Rover",
    description: "NASA Mars 2020 mission rover exploring Jezero Crater, searching for signs of ancient microbial life and collecting samples for future Earth return.",
    status: "In Progress",
    provider: "NASA / JPL",
    rocket: "Atlas V",
    launchDate: "2020-07-30",
    location: "Cape Canaveral, Florida",
    destination: "Mars",
    details: {
      landing: "2021-02-18",
      mission: "Sample collection & astrobiology",
      helicopter: "Ingenuity"
    }
  },
  "james-webb": {
    id: "james-webb",
    name: "James Webb Space Telescope",
    description: "The world's premier space observatory, designed to solve mysteries in our solar system and beyond. Orbiting at L2, it observes in infrared light.",
    status: "In Progress",
    provider: "NASA / ESA / CSA",
    rocket: "Ariane 5",
    launchDate: "2021-12-25",
    location: "Guiana Space Centre, French Guiana",
    destination: "L2 Lagrange Point",
    details: {
      orbit: "L2 halo orbit",
      mirror: "6.5m primary",
      instruments: 4
    }
  },
  "starliner-oft": {
    id: "starliner-oft",
    name: "Starliner Orbital Flight Test 2",
    description: "Boeing's uncrewed orbital flight test to the International Space Station as part of NASA's Commercial Crew Program.",
    status: "Scrubbed",
    provider: "NASA / Boeing",
    rocket: "Atlas V",
    launchDate: "2021-08-03",
    location: "Cape Canaveral, Florida",
    destination: "International Space Station",
    details: {
      reason: "Valve issues in propulsion system",
      rescheduled: "May 2022 (OFT-2 successful)"
    }
  },
  "artemis-i": {
    id: "artemis-i",
    name: "Artemis I",
    description: "Uncrewed test flight of NASA's Space Launch System and Orion spacecraft. Successfully orbited the Moon and returned to Earth after 25 days.",
    status: "Completed",
    provider: "NASA",
    rocket: "SLS",
    launchDate: "2022-11-16",
    location: "Kennedy Space Center, Florida",
    destination: "Lunar Orbit",
    details: {
      duration: "25.5 days",
      orbit: "Distant lunar retrograde orbit",
      milestone: "First SLS launch"
    }
  },
  "mars-reconnaissance-orbiter": {
    id: "mars-reconnaissance-orbiter",
    name: "Mars Reconnaissance Orbiter",
    description: "NASA spacecraft orbiting Mars since 2006, providing high-resolution imaging and serving as a communications relay for surface missions.",
    status: "In Progress",
    provider: "NASA / JPL",
    rocket: "Atlas V",
    launchDate: "2005-08-12",
    location: "Cape Canaveral, Florida",
    destination: "Mars",
    details: {
      altitude: "250-316 km",
      orbit: "Sun-synchronous",
      data_returned: "400+ terabits"
    }
  },
  "hubble": {
    id: "hubble",
    name: "Hubble Space Telescope",
    description: "Iconic space telescope that has revolutionized astronomy. Still operational after multiple servicing missions, observing in visible and ultraviolet light.",
    status: "In Progress",
    provider: "NASA / ESA",
    rocket: "Space Shuttle Discovery",
    launchDate: "1990-04-24",
    location: "Kennedy Space Center, Florida",
    destination: "Low Earth Orbit",
    details: {
      altitude: "547 km",
      orbit: "LEO",
      servicing_missions: 5
    }
  },
  "starlink-9-2": {
    id: "starlink-9-2",
    name: "Starlink 9-2",
    description: "SpaceX Starlink satellite deployment mission from Cape Canaveral. Scrubbed due to unfavorable weather conditions.",
    status: "Scrubbed",
    provider: "SpaceX",
    rocket: "Falcon 9",
    launchDate: "2026-08-05",
    location: "Cape Canaveral, Florida",
    destination: "Low Earth Orbit",
    details: {
      payload: "22 Starlink satellites",
      reason: "Weather violation"
    }
  }
};
