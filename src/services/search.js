import { PLANET_DATA } from '../constants/planetData';
import { MISSION_DATA } from '../mock/missionData';

export const searchData = (query) => {
  if (!query) return { planets: [], missions: [], imagery: [] };

  const lowerQuery = query.toLowerCase();

  const planets = Object.values(PLANET_DATA).filter(p => 
    p.name.toLowerCase().includes(lowerQuery) || 
    p.description.toLowerCase().includes(lowerQuery)
  );

  const missions = MISSION_DATA.filter(m => 
    m.name.toLowerCase().includes(lowerQuery) || 
    m.description.toLowerCase().includes(lowerQuery)
  );

  // Mock imagery search for now
  const imagery = [];
  if (lowerQuery.includes('mars')) {
    imagery.push({ id: 'mars-1', title: 'Mars Rover High Res', type: 'NASA Image' });
  }

  return { planets, missions, imagery };
};
