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

  // Near Earth Objects — returns a flat array of simplified NEO objects
  getNeo: async (startDate, endDate) => {
    const response = await client.get('/neo/rest/v1/feed', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    const byDate = response.data.near_earth_objects || {};
    const flat = [];
    Object.keys(byDate).forEach((date) => {
      byDate[date].forEach((neo) => {
        const closeApproach = neo.close_approach_data && neo.close_approach_data[0];
        flat.push({
          id: neo.id,
          name: neo.name,
          diameterKm: neo.estimated_diameter?.kilometers?.estimated_diameter_max || 0,
          isHazardous: neo.is_potentially_hazardous_asteroid || false,
          missDistanceKm: closeApproach?.miss_distance?.kilometers || null,
          velocityKmS: closeApproach?.relative_velocity?.kilometers_per_second || null,
          closeApproachDate: closeApproach?.close_approach_date || date,
        });
      });
    });
    return flat;
  },

  // Mars Rover Photos
  getMarsPhotos: async (roverId = 'perseverance') => {
    const response = await client.get(`/mars-photos/api/v1/rovers/${roverId}/photos`);
    return response.data.photos;
  },

  // NASA Image Library (Search)
  searchImages: async (query) => {
    const response = await axios.get('https://images-api.nasa.gov/search', {
      params: {
        q: query,
        media_type: 'image',
      },
    });
    const items = response.data?.collection?.items || [];
    return items
      .filter((item) => item.links && item.links.length > 0)
      .map((item) => ({
        title: item.data?.[0]?.title || 'Untitled',
        description: item.data?.[0]?.description || '',
        date: item.data?.[0]?.date_created?.slice(0, 10) || '',
        url: item.links?.[0]?.href || '',
        nasaId: item.data?.[0]?.nasa_id || '',
      }));
  },
};
