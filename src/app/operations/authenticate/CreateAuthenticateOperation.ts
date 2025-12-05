import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import { validEmail } from '../../../utils/validEmail';

import { redisClient } from '../../../infrastructure/database/config/redis';

import { Sequelize } from 'sequelize';
import { TypeCreateError } from '../../../../src/types';
import { UserService } from 'src/app/services/user';

interface Dependencies {
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
  userService: UserService;
}

export class CreateAuthenticateOperation {
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
  userService: UserService;
  constructor({ userService, db, createError }: Dependencies) {
    this.db = db;
    this.createError = createError;
    this.userService = userService;
  }

  async execute(params: any) {
    const { usr_email, usr_password, keepConnected } = params;
    validEmail(usr_email);

    const user = await this.userService.getByUsrEmail({ usr_email: usr_email });
    if (!user) {
      throw this.createError(404, 'Usuário ou senha inválidos, entre em contato com administrador');
    }

    const passwordMatch = await compare(usr_password, user.usr_password!);

    if (!passwordMatch) {
      throw this.createError(404, 'Usuário ou senha inválidos, entre em contato com administrador');
    }

    if (user.dataValues.usr_status === 0) {
      throw this.createError(404, 'Usuário ou senha inválidos, entre em contato com administrador');
    }

    delete user.dataValues.usr_password;

    const ONE_HOUR = 60 * 60;
    const THIRTY_DAYS = 60 * 60 * 24 * 30;

    const redis = await redisClient();

    const redisExpireIn = { EX: keepConnected ? THIRTY_DAYS : ONE_HOUR };
    await redis.set(`user:status:${user.usr_id}`, Number(user.usr_status), {
      ...redisExpireIn,
    });

    const token = jwt.sign(
      {
        usr_email,
        usr_id: user.usr_id,
      },
      process.env.TOKEN_SECRET ?? '',
      { expiresIn: keepConnected ? THIRTY_DAYS : ONE_HOUR },
    );
    await redis.set(`user:token:${user.usr_id}`, token, {
      ...redisExpireIn,
    });
    await redis.disconnect();

    return { token, user };
  }
}

export default CreateAuthenticateOperation;
