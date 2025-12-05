import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

export interface CreateNotification {
  name: string;
  email: string;
  phone: string;
  text: string;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class NotificationSchema {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: CreateNotification): IValidade {
    const schema = this.joi.object({
      name: this.joi.string().required(),
      email: this.joi.string().required(),
      phone: this.joi.string().required(),
      text: this.joi.string().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
