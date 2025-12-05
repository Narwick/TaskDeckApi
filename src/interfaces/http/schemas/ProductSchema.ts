import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  pro_cat_id: number;
  pro_name: string;
  pro_description: string;
  pro_note: string;
  pro_storable: string;
  pro_code: string;
}

interface Update {
  data: {
    pro_cat_id?: number;
    pro_name?: string;
    pro_description?: string;
    pro_note?: string;
    pro_storable?: string;
    pro_code?: string;
    pro_is_active?: number;
  };
  id: number;
}

interface UpdateStatus {
  cat_status: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class ProductSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      pro_cat_id: this.joi.number().required(),
      pro_meu_id: this.joi.number().required().when('pro_storable', {
        is: 'Fábrica de ração',
        then: this.joi.valid(3),
      }),
      pro_name: this.joi.string().trim().min(1).required(),
      pro_description: this.joi.string().trim().min(1).allow(null, ''),
      pro_note: this.joi.string().trim().min(1).allow(null, ''),
      pro_storable: this.joi.string().valid('Não', 'Almoxarifado', 'Fábrica de ração').required(),
      pro_code: this.joi.string().required(),
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
        pro_cat_id: this.joi.number(),
        pro_name: this.joi.string().trim().min(1),
        pro_description: this.joi.string().trim().min(1).allow(null, ''),
        pro_note: this.joi.string().trim().min(1).allow(null, ''),
        // pro_storable: this.joi.string().valid('Não', 'Almoxarifado', 'Fábrica de ração'),
        pro_code: this.joi.string(),
        pro_is_active: this.joi.number().valid(0, 1),
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
      pro_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
