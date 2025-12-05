import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from'./errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  wac_pro_id: number;
  wac_dep_id: number;
  wac_date: number;
  wac_quantity: number;
}

interface Update {
  data: {
    wac_pro_id?: number;
    wac_dep_id?: number;
    wac_date?: number;
    wac_quantity?: number;
  };
  id: number;
}

interface UpdateStatus {
  wac_is_active: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class WarehouseConsumptionSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      wac_pro_id: this.joi.number().required(),
      wac_dep_id: this.joi.number().required(),
      wac_quantity: this.joi.number().required(),
      wac_date: this.joi.date().required(),
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
        wac_pro_id: this.joi.number(),
        wac_dep_id: this.joi.number(),
        wac_quantity: this.joi.number(),
        wac_date: this.joi.date(),
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
      wac_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
