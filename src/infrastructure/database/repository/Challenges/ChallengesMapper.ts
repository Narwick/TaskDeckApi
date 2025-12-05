import { ChaChallenges } from '../../models/ChaChallenges';

export default {
  toEntity: (databaseObject: ChaChallenges) => {
    if (!databaseObject) return null;
    const data = databaseObject.dataValues;
    return data;
  },
  toEntityMulti: (databaseObject: ChaChallenges[]) => {
    if (!databaseObject) return null;

    const data = [];

    for (const dt of databaseObject) {
      const user = dt.dataValues;
      data.push(user);
    }
    return data;
  },
};
