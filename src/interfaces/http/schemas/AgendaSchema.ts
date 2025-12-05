import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from'./errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  age_med_id: number;
  age_cob_id: number;
  age_dia: Date;
  age_troca_agenda: number;
}

interface Update {
  data: {
    age_dia?: Date;
    age_troca_agenda?: number;
  };
  id: number;
}

interface UpdateStatus {
  age_status: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class AgendaSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      age_med_id: this.joi.number().required(),
      age_cob_id: this.joi.number().required(),
      age_dia: this.joi.date().required(),
      age_troca_agenda: this.joi.number().required(),
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
        age_dia: this.joi.date(),
        age_troca_agenda: this.joi.number(),
        age_status: this.joi.number().valid(0, 1),

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
      age_status: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
