// container.ts
import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { createContainer, asValue, InjectionMode, AwilixContainer } from 'awilix';
import db from './src/infrastructure/database/models';
import { validEmail } from './src/utils/validEmail';

import dotenv from 'dotenv';
dotenv.config();
const dist =
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'develop_ext' ? '' : 'dist/';

export class ContainerConfigurator {
  public static configureContainer(): AwilixContainer {
    const app = express();
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));

    const config = 'security-auth';

    const container = createContainer();

    container
      .register({
        createError: asValue(createError),
        db: asValue(db),
        validEmail: asValue(validEmail),
        jwt: asValue(jwt),
        config: asValue(config),
        bcrypt: asValue(bcrypt),
        app: asValue(app),
        express: asValue(express),
        joi: asValue(Joi),
      })
      .loadModules(
        [
          `${dist}src/app/operations/**/*.{ts,js}`,
          `${dist}src/app/services/**/*.{ts,js}`,
          `${dist}src/infrastructure/database/repository/**/*.{ts,js}`,
          `${dist}src/infrastructure/integration/rest/**/*.{ts,js}`,
          `${dist}src/interfaces/http/schemas/**/*.{ts,js}`,
          `${dist}src/interfaces/cron/*.{ts,js}`,
          `${dist}src/interfaces/cron/jobs/*.{ts,js}`,
        ],
        {
          formatName: 'camelCase',
          resolverOptions: {
            injectionMode: InjectionMode.PROXY,
          },
        },
      );

    return container;
  }
}