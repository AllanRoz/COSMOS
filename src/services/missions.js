import { MISSION_DATA } from '../mock/missionData';

export const missionsService = {
  getAllMissions: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(MISSION_DATA), 500);
    });
  },
  getMissionById: async (id) => {
    const mission = MISSION_DATA.find(m => m.id === id);
    return new Promise((resolve) => {
      setTimeout(() => resolve(mission), 300);
    });
  }
};
