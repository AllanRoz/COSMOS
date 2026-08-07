import { nasaService } from '../services/nasa';
import { SPACE_WEATHER_DATA } from '../mock/spaceWeatherData';

export const spaceWeatherService = {
  // In a real app, we'd fetch from NOAA or SWPC
  getSpaceWeather: async () => {
    // For now, return mock data but keep the async structure for future API integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SPACE_WEATHER_DATA);
      }, 800);
    });
  },
};
