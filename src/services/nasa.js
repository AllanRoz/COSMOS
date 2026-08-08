import axios from 'axios';

const BASE_URL = 'https://api.nasa.gov';
const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const nasaService = {
  // Astronomy Picture of the Day
  getApod: async () => {
    const response = await client.get('/planetary/apod');
    return response.data;
  },

  // Near Earth Objects
  getNeo: async (startDate, endDate) => {
    const response = await client.get('/neo/rest/v1/feed', {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: API_KEY, // sometimes needed if not in base params
      },
    });
    return response.data.near_earth_objects;
  },

  // Mars Rover Photos
  getMarsPhotos: async (roverId = 'perseverance') => {
    const response = await client.get(`/mars-photos/api/v1/rovers/${roverId}/photos`);
    return response.data.photos;
  },

  // Image Library (Search)
  searchImages: async (query) => {
    const response = await client.get('/image', {
      params: {
        q: query,
        api_key: API_KEY,
      },
    });
    return response.data.elements;
  },
};
