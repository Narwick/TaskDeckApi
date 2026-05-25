import fs from 'fs';
import path from 'path';
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require(`${__dirname}/../config/config.js`);
const db: any = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf('.') != 0 && file != basename && file.slice(-3) == '.js'
    );
  })
  .forEach((file: any) => {
  const imported = require(path.join(__dirname, file));
  const model = (imported.default || imported)(
    sequelize,
    Sequelize.DataTypes,
  );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
