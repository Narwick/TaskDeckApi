import { LeaLearnings } from '../../models/LeaLearnings';

export default {
  toEntity: (databaseObject: LeaLearnings) => {
    if (!databaseObject) return null;
    const data = databaseObject.dataValues;
    return data;
  },
  toEntityMulti: (databaseObject: LeaLearnings[]) => {
    if (!databaseObject) return null;

    const data = [];

    for (const dt of databaseObject) {
      const user = dt.dataValues;
      data.push(user);
    }
    return data;
  },
};
