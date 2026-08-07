export const ASTRONOMY_DATA = {
  planets: [
    { name: "Mars", visibility: "High", magnitude: "-1.5", color: "#e27b58" },
    { name: "Jupiter", visibility: "Very High", magnitude: "-2.5", color: "#d39c7e" },
    { name: "Saturn", visibility: "Medium", magnitude: "+0.6", color: "#c5ab7b" },
    { name: "Venus", visibility: "Very High", magnitude: "-4.0", color: "#e3bb76" },
  ],
  moon: {
    phase: "Waxing Gibbous",
    rise: "04:30 AM",
    set: "11:20 PM",
    illumination: "85%",
  },
  events: [
    { name: "Perseid Meteor Shower", date: "August 12-13", peak: "03:00 AM", type: "Meteor Shower" },
    { name: "Partial Lunar Eclipse", date: "September 15", type: "Eclipse" },
  ],
  constellations: [
    { name: "Orion", description: "The Hunter", region: "Winter Sky" },
    { name: "Cassiopeia", description: "The Queen", region: "Northern Sky" },
    { name: "Ursa Major", description: "Great Bear", region: "Northern Sky" },
  ],
};
