import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  meu_name: string;
  meu_unit_symbol: string;
}

interface Update {
  data: {
    meu_name?: string;
    meu_unit_symbol?: string;
  };
  id: number;
}
export type UpdateFinancialType = {
  data: {
    exr_notes?: string;
    exr_due_date?: Date;
  };
  id: number;
};

export type UpdatePaymentType = {
  data: {
    fip_payment_method?: 'credit_card' | 'debit_card' | 'cash' | 'ticket' | 'pix';
    fip_data_payment?: Date;
    fip_total_value?: number;
    only_method?: boolean;
  };
  id: number;
};

interface UpdateStatus {
  exr_is_active: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class ExpensesRevenueSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      meu_name: this.joi.string().required(),
      meu_unit_symbol: this.joi.string().required(),
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
        meu_name: this.joi.string().required(),
        meu_unit_symbol: this.joi.string().required(),
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
      meu_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateUpdateFinancial(dataToValidate: UpdateFinancialType): IValidade {
    const schema = this.joi.object({
      data: this.joi.object({
        fin_notes: this.joi.string().allow('', null),
        fin_due_date: this.joi.string(),
      }),
      id: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateUpdatePayment(dataToValidate: UpdatePaymentType): IValidade {
    const schema = this.joi.object({
      data: this.joi.object({
        fip_payment_method: this.joi
          .string()
          .valid('credit_card', 'debit_card', 'cash', 'ticket', 'pix'),
        fip_data_payment: this.joi.string(),
        fip_total_value: this.joi.number(),
        only_method: this.joi.boolean(),
      }),
      id: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
