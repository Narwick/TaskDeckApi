import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  cat_father_category: number;
  cat_name: string;
  cat_code: string;
  cat_type: string;
  cat_classification: string;
}

interface Update {
  data: {
    cat_father_category?: number;
    cat_name?: string;
    cat_code?: string;
    cat_type?: string;
    cat_classification?: string;
    cat_status?: number;
  };
  id: number;
  sub_id: number;
}

interface UpdateStatus {
  cat_is_active: number;
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
      cat_father_category: this.joi.number().optional(),
      cat_name: this.joi.string().trim().min(1).required(),
      cat_code: this.joi.number().required(),
      cat_type: this.joi
        .string()
        .valid('despesa', 'receita')
        .when('cat_father_category', {
          is: this.joi.exist(),
          then: this.joi.string().optional().allow(null, ''), // cat_type não é obrigatório se cat_father_category existir
          otherwise: this.joi.string().valid('despesa', 'receita').required(), // cat_type é obrigatório se não houver cat_father_category
        }),
      cat_classification: this.joi
        .string()
        .valid('custo_fixo', 'custo_variável', 'investimento_ativo', 'investimento_passivo')
        .allow(null, ''),
      cat_animal_production: this.joi.string().valid('yes', 'no').allow(null, ''),
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
        cat_name: this.joi.string().trim().min(1).allow(null, ''),
        cat_code: this.joi.number().allow(null, ''),
        cat_classification: this.joi
          .string()
          .valid('custo_fixo', 'custo_variável', 'investimento_ativo', 'investimento_passivo')
          .allow(null, ''),
        cat_animal_production: this.joi.string().valid('yes', 'no').allow(null, ''),
      }),
      id: this.joi.number().required(),
      sub_id: this.joi.number(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateUpdateStatus(dataToValidate: UpdateStatus): IValidade {
    const schema = this.joi.object({
      cat_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
