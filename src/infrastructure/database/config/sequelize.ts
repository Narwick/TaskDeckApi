import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../config/config.js';

const sequelize: any = new Sequelize(config.database!, config.username!, config.password, config as any);

export { sequelize, Sequelize, Model, DataTypes };
