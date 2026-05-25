const { hash } = require('bcrypt');
const { UsrUser } = require('../../../infrastructure/database/models/UsrUser');
const { redisClient } = require('../../../infrastructure/database/config/redis');
import { Sequelize, Transaction } from 'sequelize';
import { UserService } from '../../services/user/UserService';
import { TypeCreateError } from '../../../../src/types';

interface Dependencies {
  userService: UserService;
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
}
export class UpdatePasswordCodeResetOperation {
  userService: UserService;
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
  constructor({ userService, db, createError }: Dependencies) {
    this.userService = userService;
    this.db = db;
    this.createError = createError;
  }
  async execute(user: any) {
    const { key, usr_password } = user;

    const redis = await redisClient();
    const email = await redis.get(`codeReset:${key}`);

    if (!email) throw this.createError(401, 'Código Expirado, por gentileza gere um novo código.');

    const transaction: Transaction = await this.db.sequelize.transaction();
    const existeEmail = await this.userService.getUserEmail({ usr_email: email }, transaction);

    if (!existeEmail) throw this.createError(404, `Usuário não encontrado em nosso base de dados.`);

    if (existeEmail.usr_status === 0)
      throw this.createError(
        401,
        `Usuário inativo, por gentileza, entre em contato com o suporte.`,
      );

    try {
      const newPassword = await hash(usr_password, 10);
      const newUser = new UsrUser({
        usr_password: newPassword,
        usr_id: existeEmail.usr_id,
        usr_email: email
        
      }).dataValues;
      await this.userService.updateUserEmail(newUser, transaction);
      await transaction.commit();

      await redis.disconnect();
      return { message: 'Senha alterada com sucesso!' };
    } catch (err: any) {
      console.log(err);
      await transaction.rollback();
      throw this.createError(
        500,
        'Ocorreu uma falha interna ao realizadar a alteração de senha. Porfavor entre em contato com o administrador do sistema.',
      );
    }
  }
}

export default UpdatePasswordCodeResetOperation;
