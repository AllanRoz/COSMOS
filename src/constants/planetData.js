export const PLANET_DATA = {
  sun: {
    name: "Sun",
    color: "#ffcc00",
    size: 5,
    distance: 0,
    speed: 0,
    description: "The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, providing the energy that supports life on Earth.",
    stats: {
      diameter: "1,392,700 km",
      mass: "1.989 × 10^30 kg",
      gravity: "26.93 m/s²",
      temperature: "5,500°C (Surface)",
      orbitalPeriod: "N/A",
      rotationPeriod: "25.4 days",
      moons: 0,
      atmosphere: "Hydrogen, Helium, Helium-3",
    },
    facts: [
      "The Sun makes up 99.8% of the total mass of our solar system.",
      "It's so big that about 1.3 million Earths could fit inside it.",
      "Light takes about 8 minutes and 20 seconds to reach Earth from the Sun."
    ]
  },
  mercury: {
    name: "Mercury",
    color: "#a5a5a5",
    size: 0.8,
    distance: 10,
    speed: 0.04,
    description: "Mercury is the smallest planet in our solar system and the closest to the Sun. It has no atmosphere to trap heat, leading to extreme temperature swings.",
    stats: {
      diameter: "4,879 km",
      mass: "3.30 × 10^23 kg",
      gravity: "3.7 m/s²",
      temperature: "167°C (Average)",
      orbitalPeriod: "88 days",
      rotationPeriod: "58.6 days",
      moons: 0,
      atmosphere: "Thin exosphere",
    },
    facts: [
      "Mercury is the fastest planet, orbiting the Sun every 88 Earth days.",
      "It has the largest temperature swings in the solar system.",
      "Mercury has no moons and no rings."
    ]
  },
  venus: {
    name: "Venus",
    color: "#e3bb76",
    size: 1.2,
    distance: 15,
    speed: 0.015,
    description: "Venus is often called Earth's twin because of its similar size. However, it has a thick, toxic atmosphere that traps heat, making it the hottest planet.",
    stats: {
      diameter: "12,104 km",
      mass: "4.87 ×労働 24 kg",
      gravity: "8.87 m/s²",
      temperature: "464°C",
      orbitalPeriod: "225 days",
      rotationPeriod: "243 days",
      moons: 0,
      atmosphere: "Carbon dioxide, Nitrogen",
    },
    facts: [
      "Venus rotates backwards (retrograde rotation) compared to most other planets.",
      "Its surface temperature is hot enough to melt lead.",
      "The atmosphere is 96% carbon dioxide."
    ]
  },
  earth: {
    name: "Earth",
    color: "#2271b3",
    size: 1.3,
    distance: 20,
    speed: 0.01,
    description: "Our home. Earth is the only planet known to harbor life. It is uniquely suited for life due to its liquid water and oxygen-rich atmosphere.",
    stats: {
      diameter: "12,742 km",
      mass: "5.97 × 10^24 kg",
      gravity: "9.8 m/s²",
      temperature: "15°C (Average)",
      orbitalPeriod: "365 days",
      rotationPeriod: "24 hours",
      moons: 1,
      atmosphere: "Nitrogen, Oxygen",
    },
    facts: [
      "Earth is the only planet with liquid water on its surface.",
      "About 71% of Earth's surface is covered by water.",
      "The atmosphere protects us from the Sun's harmful radiation."
    ]
  },
  mars: {
    name: "Mars",
    color: "#e27b58",
    size: 1,
    distance: 26,
    speed: 0.008,
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. It is home to the solar system's largest volcano and deepest canyon.",
    stats: {
      diameter: "6,779 km",
      mass: "6.39 × 10^23 kg",
      gravity: "3.72 m/s²",
      temperature: "-65°C (Average)",
      orbitalPeriod: "687 days",
      rotationPeriod: "24.6 hours",
      moons: 2,
      atmosphere: "Carbon dioxide, Nitrogen",
    },
    facts: [
      "Mars has the tallest volcano in the solar system, Olympus Mons.",
      "It has the deepest canyon, Valles Marineris.",
      "Mars's atmosphere is 95% carbon dioxide."
    ]
  },
  jupiter: {
    name: "Jupiter",
    color: "#d39c7e",
    size: 3.5,
    distance: 38,
    speed: 0.004,
    description: "Jupiter is the largest planet in our solar system—more than twice as massive as all the other planets combined. It is a gas giant with a diverse set of moons.",
    stats: {
      diameter: "139,820 km",
      mass: "1.89 × 10^27 kg",
      gravity: "24.79 m/s²",
      temperature: "-125°C",
      orbitalPeriod: "12 years",
      rotationPeriod: "9.9 hours",
      moons: 95,
      atmosphere: "Hydrogen, Helium",
    },
    facts: [
      "Jupiter's Great Red Spot is a storm that has been raging for hundreds of years.",
      "Jupiter has the most moons in the solar system (over 90).",
      "It is so massive that it protects Earth from many asteroid impacts."
    ]
  },
  saturn: {
    name: "Saturn",
    color: "#c5ab7b",
    size: 3,
    distance: 50,
    speed: 0.003,
    description: "Saturn is unique for its complex and beautiful ring system, made primarily of ice particles, rocks, and dust.",
    stats: {
      diameter: "116,460 km",
      mass: "5.68 × 10^26 kg",
      gravity: "10.44 m/s²",
      temperature: "-140°C",
      orbitalPeriod: "29 years",
      rotationPeriod: "10.7 hours",
      moons: 146,
      atmosphere: "Hydrogen, Helium",
    },
    facts: [
      "Saturn's rings are so thin they would only reach the ground if they were on Earth.",
      "Saturn is the least dense planet; it could float in water.",
      "It has a diverse collection of moons, including the geologically active Enceladus."
    ]
  },
  uranus: {
    name: "Uranus",
    color: "#b5e3e3",
    size: 2,
    distance: 62,
    speed: 0.002,
    description: "Uranus is an ice giant with a unique tilt, rotating on its side. It has a very cold atmosphere and 27 known moons.",
    stats: {
      diameter: "50,724 km",
      mass: "8.68 × 10^25 kg",
      gravity: "8.69 m/s²",
      temperature: "-195°C",
      orbitalPeriod: "84 years",
      rotationPeriod: "17.2 hours",
      moons: 27,
      atmosphere: "Hydrogen, Helium, Methane",
    },
    facts: [
      "Uranus rotates on its side, likely due to a massive collision in the past.",
      "It is one of the coldest planets in the solar system.",
      "Its atmosphere contains methane, which gives it a blue-green color."
    ]
  },
  neptune: {
    name: "Neptune",
    color: "#4b71e3",
    size: 2,
    distance: 70,
    speed: 0.001,
    description: "Neptune is the most distant major planet in our solar system. It is a dark, cold ice giant with supersonic winds.",
    stats: {
      diameter: "49,244 km",
      mass: "1.02 × 10^26 kg",
      gravity: "11.15 m/s²",
      temperature: "-201°C",
      orbitalPeriod: "165 years",
      rotationPeriod: "16.1 hours",
      moons: 14,
      atmosphere: "Hydrogen, Helium, Methane",
    },
    facts: [
      "Neptune has the strongest winds in the solar system, reaching 2,100 km/h.",
      "It was the first planet located through mathematical prediction.",
      "Neptune is roughly 30 times further from the Sun than Earth."
    ]
  },
  pluto: {
    name: "Pluto",
    color: "#ffffff",
    size: 0.4,
    distance: 80,
    speed: 0.0008,
    description: "Pluto is a dwarf planet in the Kuiper Belt. Once considered the ninth planet, it is now classified as a dwarf planet due to its size and orbital characteristics.",
    stats: {
      diameter: "2,376 km",
      mass: "1.31 × 10^22 kg",
      gravity: "0.62 m/s²",
      temperature: "-230°C",
      orbitalPeriod: "248 years",
      rotationPeriod: "6.4 days",
      moons: 5,
      atmosphere: "Nitrogen, Methane, Carbon monoxide",
    },
    facts: [
      "Pluto has a complex surface with mountains and plains of ice.",
      "It has five known moons, including Charon, which is nearly half its size.",
      "Pluto's orbit is tilted relative to the other planets."
    ]
  }
};
