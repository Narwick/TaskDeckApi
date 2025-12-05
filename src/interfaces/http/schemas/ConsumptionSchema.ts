import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  con_hif_id: number;
  con_dep_id: number;
  con_date: Date;
  con_quantity: number;
  con_is_fabricated_dep_id: number;
}

interface Update {
  data: {
    con_hif_id: number;
    con_dep_id: number;
    con_date: Date;
    con_quantity: number;
    con_is_fabricated_dep_id: number;
  };
  id: number;
}

interface UpdateStatus {
  dep_is_active: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class ConsumptionSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      for_id: this.joi.number().required(),
      con_dep_id: this.joi.number().required(),
      con_is_fabricated_dep_id: this.joi.number().required(),
      con_date: this.joi.date().required(),
      con_quantity: this.joi
        .number()
        .min(1)
        .message('É obrigatório que a quantidade seja maior que 1 kg')
        .required(),
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
        con_dep_id: this.joi.number().required(),
        con_is_fabricated_dep_id: this.joi.number().required(),
        con_date: this.joi.date().required(),
        con_quantity: this.joi.number().required(),
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
      dep_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
