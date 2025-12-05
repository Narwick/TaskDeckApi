/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
const { validEmail } = require('../../../utils/validEmail');
import { templateEsqueciSenha } from '../../../html-templates/email';
const { sendEmail } = require('../../../infrastructure/integration/IntegrationEmail');
import { gerarNumerosAleatorios } from '../../../utils/gerarNumerosAletorios';
const { redisClient } = require('../../../infrastructure/database/config/redis');

import { Sequelize, Transaction } from 'sequelize';
import { UserService } from '../../services/user/UserService';
import { TypeCreateError } from '../../../../src/types';

interface Dependencies {
  userService: UserService;
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
}
export class CreateResetCodeOperation {
  userService: UserService;
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
  constructor({ userService, db, createError }: Dependencies) {
    this.userService = userService;
    this.db = db;
    this.createError = createError;
  }
  async execute(user: any) {
    const { usr_email } = user;
    validEmail(usr_email);

    const transaction = await this.db.sequelize.transaction();
    const existeEmail = await this.userService.getUserEmail(user, transaction);

    if (!existeEmail) {
      await transaction.commit();
      throw this.createError(409, `Usuário não encontrado em nosso base de dados.`);
    }

    const key = gerarNumerosAleatorios();
    try {
      const redis = await redisClient();
      await redis.set(`codeReset:${key}`, usr_email, {
        EX: 21600,
      });
      await redis.disconnect();
      const templateEmail = await templateEsqueciSenha(key);
      await sendEmail.main(
        usr_email,
        'Reset de Senha SuinTech',
        templateEmail.body,
        templateEmail.attach[0],
      );

      await transaction.commit();
      return {
        message: 'Instruções para gerar uma nova senha foram enviadas para o seu e-mail.',
      };
    } catch (err: any) {
      await transaction.rollback();
      throw this.createError(
        500,
        'Houve uma falha ao solicitar o reset de senha. Entre em contato com o administrador do sistema.',
      );
    }
  }
}

export default CreateResetCodeOperation;
