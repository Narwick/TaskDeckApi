import { AchAchievements } from '../../models/AchAchievements';

export default {
  toEntity: (databaseObject: AchAchievements) => {
    if (!databaseObject) return null;
    const data = databaseObject.dataValues;
    return data;
  },
  toEntityMulti: (databaseObject: AchAchievements[]) => {
    if (!databaseObject) return null;

    const data = [];

    for (const dt of databaseObject) {
      const user = dt.dataValues;
      data.push(user);
    }
    return data;
  },
};
