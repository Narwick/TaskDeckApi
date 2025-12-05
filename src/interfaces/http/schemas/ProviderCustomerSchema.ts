import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  prc_sub_id: number;
  prc_add_id: number;
  prc_name: string;
  prc_representative: string;
  prc_cpf_cnpj: string;
  prc_company_name: string;
  prc_rg: string;
  prc_phone_number: string;
  prc_email: string;
  prc_type: string;
  prc_note_for_end_consumer: string;
  prc_state_registration_indicator: string;
  prc_state_registration_number: string;
  prc_perfil: string;
}

interface Update {
  data: {
    prc_add_id?: number;
    prc_name?: string;
    prc_representative?: string;
    prc_cpf_cnpj?: string;
    prc_company_name?: string;
    prc_rg?: string;
    prc_phone_number?: string;
    prc_email?: string;
    prc_type?: string;
    prc_perfil?: string;
    prc_note_for_end_consumer?: string;
    prc_state_registration_indicator?: string;
    prc_state_registration_number?: string;
    prc_is_active?: number;
  };
  id: number;
}

interface UpdateStatus {
  prc_is_active: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class ProviderCustomerSchema extends BaseValidateClass<
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
      prc_sub_id: this.joi.number().required(),

      prc_name: this.joi.string().trim().min(1).required(),
      prc_representative: this.joi.string().trim().min(1).required(),
      prc_cpf_cnpj: this.joi.string().required(),
      prc_company_name: this.joi.string().trim().min(1).allow(null, ''),
      prc_perfil: this.joi.string().required(),
      prc_type: this.joi.string().required(),
      prc_rg: this.joi.string().allow(null, ''),
      prc_phone_number: this.joi.string().allow(null, ''),
      prc_email: this.joi.string().allow(null, ''),
      prc_note_for_end_consumer: this.joi.string().allow(null, ''),
      prc_state_registration_indicator: this.joi.string().allow(null, ''),
      prc_state_registration_number: this.joi.string().allow(null, ''),
      add_address: this.joi.object({
        add_cep: this.joi.string().allow(null, ''),
        add_street: this.joi.string().allow(null, ''),
        add_number: this.joi.string().allow(null, ''),
        add_district: this.joi.string().allow(null, ''),
        add_city: this.joi.string().allow(null, ''),
        add_state: this.joi.string().allow(null, ''),
        add_complement: this.joi.string().allow(null, ''),
      }),
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
        prc_add_id: this.joi.number(),
        prc_name: this.joi.string().trim().min(1),
        prc_type: this.joi.string(),
        prc_representative: this.joi.string().trim().min(1),
        prc_perfil: this.joi.string(),
        prc_cpf_cnpj: this.joi.string(),
        prc_company_name: this.joi.string().allow(null, ''),
        prc_rg: this.joi.string().allow(null, ''),
        prc_phone_number: this.joi.string().allow(null, ''),
        prc_email: this.joi.string().allow(null, ''),
        prc_note_for_end_consumer: this.joi.string().allow(null, ''),
        prc_state_registration_indicator: this.joi.string().allow(null, ''),
        prc_state_registration_number: this.joi.string().allow(null, ''),
        add_address: this.joi.object({
          add_id: this.joi.number().allow(null, ''),
          add_cep: this.joi.string().allow(null, ''),
          add_street: this.joi.string().allow(null, ''),
          add_number: this.joi.string().allow(null, ''),
          add_district: this.joi.string().allow(null, ''),
          add_city: this.joi.string().allow(null, ''),
          add_state: this.joi.string().allow(null, ''),
          add_complement: this.joi.string().allow(null, ''),
        }),
        prc_is_active: this.joi.number().valid(0, 1),
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
      prc_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}
