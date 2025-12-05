import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

export interface CreateAuth {
  usr_email: string;
  usr_password: string;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class AuthSchema {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: CreateAuth): IValidade {
    const schema = this.joi.object({
      usr_email: this.joi.number().required(),
      usr_password: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
