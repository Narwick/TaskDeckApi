import { Sequelize } from 'sequelize';
import { TypeCreateError } from '../../../types';

interface Dependencies {
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
}

export class TrocaPerfilOperation {
  db: { sequelize: Sequelize };
  createError: TypeCreateError;

  constructor({ db, createError }: Dependencies) {
    this.db = db;
    this.createError = createError;
  }
  async execute(user: any) {
    return true;
  }
}

export default TrocaPerfilOperation;
