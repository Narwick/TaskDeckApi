import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from'./errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  maa_pro_id: number;
  maa_dep_id: number;
  maa_date: number;
  maa_quantity: number;
}

interface Update {
  data: {
    maa_pro_id?: number;
    maa_dep_id?: number;
    maa_date?: number;
    maa_quantity?: number;
  };
  id: number;
}

interface UpdateStatus {
  maa_is_active: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class ManualAdjustmentSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      maa_pro_id: this.joi.number().required(),
      maa_dep_id: this.joi.number().required(),
      maa_quantity: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateUpdate(dataToValidate: Update): IValidade {
    const schema = this.joi.object({
      data: this.joi.object({
        maa_pro_id: this.joi.number(),
        maa_dep_id: this.joi.number(),
        maa_quantity: this.joi.number(),
      }),
      id: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateUpdateStatus(dataToValidate: UpdateStatus): IValidade {
    const schema = this.joi.object({
      maa_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
