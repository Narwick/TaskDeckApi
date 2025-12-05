import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  for_name: string;
  for_date: Date;
  for_form: 'Granel' | 'Ensacada';
  for_phase:
    | 'Gestação'
    | 'Maternidade'
    | 'Creche'
    | 'Crescimento'
    | 'Terminação'
    | 'Recria de Marrã'
    | 'Crescimento de Marrã';
  for_age_init: number;
  for_age_end: number;
  for_periodicity: string;
  ing_ingredient: object;
}

interface Update {
  data: {
    for_name?: string;
    for_date?: Date;
    for_form?: 'Granel' | 'Ensacada';
    for_phase?:
      | 'Gestação'
      | 'Maternidade'
      | 'Creche'
      | 'Crescimento'
      | 'Terminação'
      | 'Recria de Marrã'
      | 'Crescimento de Marrã';
    for_age_init?: number;
    for_age_end?: number;
    for_periodicity?: string;
    ing_ingredient?: object;
  };
  id: number;
}

interface UpdateStatus {
  for_is_active: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class HistoricalFormulaSchema extends BaseValidateClass<
  Create,
  Update,
  UpdateStatus
> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      hif_date: this.joi.date().required(),
      ing_ingredient: this.joi.array().required(),
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
        hif_date: this.joi.string().required(),
        ing_ingredient: this.joi
          .array()
          .items(
            this.joi.object({
              ing_pro_id: this.joi.number().required(),
              ing_quantity: this.joi.number().required(),
            }),
          )
          .required(),
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
      for_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
