import { MetMetrics } from '../../models/MetMetrics';

export default {
  toEntity: (databaseObject: MetMetrics) => {
    if (!databaseObject) return null;
    const data = databaseObject.dataValues;
    return data;
  },
  toEntityMulti: (databaseObject: MetMetrics[]) => {
    if (!databaseObject) return null;

    const data = [];

    for (const dt of databaseObject) {
      const user = dt.dataValues;
      data.push(user);
    }
    return data;
  },
};
