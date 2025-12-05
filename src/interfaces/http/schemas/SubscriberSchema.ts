import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

interface Create {
  sub_add_id: number;
  sub_fantasy_name: string;
  sub_cpf_cnpj: string;
  sub_company_name: string;
  sub_rg: string;
  sub_phone_number: string;
  sub_email: string;
  sub_type: string;
  sub_issuing_authority: string;
  sub_state_registration: string;
  sub_municipal_registration: string;
  sub_access_deadline: Date;
  sub_image: Blob;
  sub_thumb: Blob;
}

interface Update {
  data: {
    sub_add_id?: number;
    sub_fantasy_name?: string;
    sub_cpf_cnpj?: string;
    sub_company_name?: string;
    sub_rg?: string;
    sub_phone_number?: string;
    sub_email?: string;
    sub_type?: string;
    sub_is_active?: number;
    sub_access_deadline?: Date;
    sub_issuing_authority: string;
    sub_state_registration: string;
    sub_municipal_registration: string;
    sub_image: Blob;
    sub_thumb: Blob;
  };
  id: number;
}

interface UpdateStatus {
  sub_is_active: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export default class SubscriberSchema extends BaseValidateClass<Create, Update, UpdateStatus> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      sub_add_id: this.joi.number(),
      sub_fantasy_name: this.joi.string().allow(null, ''),
      sub_cpf_cnpj: this.joi.string().required(),
      sub_company_name: this.joi.string().allow(null, ''),
      sub_rg: this.joi.string().allow(null, ''),
      sub_phone_number: this.joi.string().required(),
      sub_email: this.joi.string().allow(null, ''),
      sub_type: this.joi.string().required(),
      sub_access_deadline: this.joi.date().required(),
      sub_issuing_authority: this.joi.string().allow(null, ''),
      sub_state_registration: this.joi.string().allow(null, ''),
      sub_municipal_registration: this.joi.string().allow(null, ''),
      sub_cnae: this.joi.string().allow(null, ''),
      sub_notes: this.joi.string().allow(null, ''),
      sub_image: this.joi.string().allow(null, ''),
      addAddress: this.joi.object({
        add_cep: this.joi.string().allow(null, ''),
        add_street: this.joi.string().allow(null, ''),
        add_number: this.joi.string().allow(null, ''),
        add_district: this.joi.string().allow(null, ''),
        add_city: this.joi.string().allow(null, ''),
        add_state: this.joi.string().allow(null, ''),
        add_complement: this.joi.string().allow(null, ''),
      }),
      usr_user: this.joi
        .object({
          usr_name: this.joi.string().required(),
          usr_email: this.joi.string().required(),
          usr_password: this.joi.string().required(),
        })
        .required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateCreateBuyNow(dataToValidate: Create): IValidade {
    const schema = this.joi.object({
      sub_fantasy_name: this.joi.string().allow(null, ''),
      sub_cpf_cnpj: this.joi
        .string()
        .required()
        .when('sub_type', {
          is: 'pj',
          then: this.joi.required(),
          otherwise: this.joi.optional(),
        })
        .allow(null, ''),
      sub_phone_number: this.joi.string().required(),
      sub_company_name: this.joi.string().required(),
      sub_notes: this.joi.string().allow(null, ''),
      sub_email: this.joi.string().required(),
      sub_type: this.joi.string().required(),
      usr_user: this.joi
        .object({
          usr_name: this.joi.string().required(),
          usr_email: this.joi.string().required(),
          usr_password: this.joi.string().required(),
        })
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
        sub_representative: this.joi.string().allow(null, ''),
        sub_cpf_cnpj: this.joi.string(),
        sub_company_name: this.joi.string(),
        sub_fantasy_name: this.joi.string().allow(null, ''),
        sub_rg: this.joi.string().allow(null, ''),
        sub_phone_number: this.joi.string(),
        sub_email: this.joi.string(),
        sub_cnae: this.joi.string().allow(null, ''),
        sub_type: this.joi.string().valid('pj', 'pf'),
        sub_is_active: this.joi.number().valid(0, 1).allow(null, ''),
        sub_access_deadline: this.joi.date().allow(null, ''),
        sub_issuing_authority: this.joi.string().allow(null, ''),
        sub_state_registration: this.joi.string().allow(null, ''),
        sub_image: this.joi.object().allow(null, ''),
        sub_municipal_registration: this.joi.string().allow(null, ''),
        sub_notes: this.joi.string().allow(null, ''),
        addAddress: this.joi.object({
          add_cep: this.joi.string().allow(null, ''),
          add_street: this.joi.string().allow(null, ''),
          add_number: this.joi.string().allow(null, ''),
          add_complement: this.joi.string().allow(null, ''),
          add_district: this.joi.string().allow(null, ''),
          add_city: this.joi.string().allow(null, ''),
          add_state: this.joi.string().allow(null, ''),
        }),
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
      sub_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateGetLogo(dataToValidate: { attributes: string }): IValidade {
    const schema = this.joi.object({
      attributes: this.joi.string().valid('image', 'thumb', 'both'),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
  validateUpdateYourself(dataToValidate: any): any {
    const schema = this.joi.object({
      data: this.joi.object({
        sub_representative: this.joi.string().allow(null, ''),
        sub_cpf_cnpj: this.joi.string(),
        sub_company_name: this.joi.string(),
        sub_fantasy_name: this.joi.string().allow(null, ''),
        sub_rg: this.joi.string().allow(null, ''),
        sub_phone_number: this.joi.string(),
        sub_email: this.joi.string(),
        sub_cnae: this.joi.string().allow(null, ''),
        sub_type: this.joi.string().allow(null, '').valid('pj', 'pf'),
        sub_issuing_authority: this.joi.string().allow(null, ''),
        sub_state_registration: this.joi.string().allow(null, ''),
        sub_municipal_registration: this.joi.string().allow(null, ''),
        addAddress: this.joi.object({
          add_cep: this.joi.string().allow(null, ''),
          add_street: this.joi.string().allow(null, ''),
          add_number: this.joi.string().allow(null, ''),
          add_complement: this.joi.string().allow(null, ''),
          add_district: this.joi.string().allow(null, ''),
          add_city: this.joi.string().allow(null, ''),
          add_state: this.joi.string().allow(null, ''),
        }),
      }),
      id: this.joi.number().required(),
    });
}
}
