import { UsrUser } from '../../models/UsrUser';

export default {
  toEntity: (databaseObject: UsrUser) => {
    if (!databaseObject) return null;
    const data = databaseObject.dataValues;
    delete data.usr_password;
    return data;
  },
  toEntityMulti: (databaseObject: UsrUser[]) => {
    if (!databaseObject) return null;

    const data = [];

    for (const dt of databaseObject) {
      const user = dt.dataValues;
      delete user.usr_password;
      data.push(user);
    }
    return data;
  },
};
