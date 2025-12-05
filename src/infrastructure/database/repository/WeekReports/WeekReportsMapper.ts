import { WerWeekReports } from '../../models/WerWeekReports';

export default {
  toEntity: (databaseObject: WerWeekReports) => {
    if (!databaseObject) return null;
    const data = databaseObject.dataValues;
    return data;
  },
  toEntityMulti: (databaseObject: WerWeekReports[]) => {
    if (!databaseObject) return null;

    const data = [];

    for (const dt of databaseObject) {
      const user = dt.dataValues;
      data.push(user);
    }
    return data;
  },
};
