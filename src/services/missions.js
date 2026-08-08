import { MISSION_DATA } from '../mock/missionData';

export const missionsService = {
  getAllMissions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Object.values(MISSION_DATA)), 500);
    });
  },
  getMissionById: async (id) => {
    const mission = MISSION_DATA[id];
    return new Promise((resolve) => {
      setTimeout(() => resolve(mission), 300);
    });
  }
};
