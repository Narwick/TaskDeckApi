import Joi from 'joi';
import { BaseValidateClass, IValidade } from './baseValidationClass';
const { validatePassword } = require('../../../utils/validaPassword');
const { retornaErro, validaçaoPassword, retornaErroCpf } = require('./errosValidacao');

import { returnErro } from './errosValidacao';
import { TypeCreateError } from 'src/types';

export interface CreateUser {
  usr_cmp_id?: number;
  usr_permission?: string;
  usr_name: string;
  usr_email: string;
  usr_password: string;
}

export interface UpdateUser {
  data: {
    usr_gro_id?: string;
    usr_name?: string;
    usr_email?: number;
  };
  id: number;
}

export interface UpdateUserMe {
  data: {
    usr_name?: string;
    usr_email?: number;
  };
  id: number;
}

interface UpdateStatusUser {
  usr_is_active: number;
}

interface IConstructor {
  joi: typeof Joi;
  createError: TypeCreateError;
}
export class UserSchema extends BaseValidateClass<CreateUser, UpdateUser, UpdateStatusUser> {
  joi;
  createError;

  constructor({ joi, createError }: IConstructor) {
    super();
    this.joi = joi;
    this.createError = createError;
  }

  validateCreate(dataToValidate: CreateUser): IValidade {
    const schema = this.joi.object({
      usr_name: this.joi.string().required(),
      usr_email: this.joi.string().required(),
      usr_password: this.joi.string().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateUpdate(dataToValidate: UpdateUser): IValidade {
    const schema = this.joi.object({
      data: this.joi.object({
        usr_permission: this.joi
          .number()
          .valid('admin', 'Editor', 'Leitor'),
        usr_name: this.joi.string(),
        usr_email: this.joi.string(),
        usr_password: this.joi.string(),
      }),
      id: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateUpdateMe(dataToValidate: UpdateUserMe): IValidade {
    const schema = this.joi.object({
      data: this.joi.object({
        usr_name: this.joi.string(),
        usr_email: this.joi.string(),
      }),
      id: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateCodeReset(dataToValidate: any): IValidade {
    const schema = this.joi.object().keys({
      key: this.joi.string().max(150).required(),
      usr_password: this.joi.string().max(255).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) retornaErro(error, this.createError);

    const validaSenha = validatePassword(dataToValidate.usr_password);
    if (!validaSenha) validaçaoPassword(this.createError);
    return { status: 'success' };
  }

  validateUpdateStatus(dataToValidate: UpdateStatusUser): IValidade {
    const schema = this.joi.object({
      usr_is_active: this.joi.number().valid(0, 1).required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateUpdatePassword(dataToValidate: any): IValidade {
    console.log(dataToValidate);
    const schema = this.joi.object({
      data: this.joi.object({
        usr_password: this.joi.string().required(),
      }),
      id: this.joi.number().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }

  validateCreateByAdm(dataToValidate: any): IValidade {
    const schema = this.joi.object({
      usr_permission: this.joi.number().required().valid('Administrador Geral', 'Gestor Geral'),
      usr_name: this.joi.string().required(),
      usr_email: this.joi.string().required(),
      usr_password: this.joi.string().required(),
    });

    const { error } = schema.validate(dataToValidate);
    if (error) {
      returnErro(error, this.createError);
    }
    return { status: 'success' };
  }
}

export default UserSchema;
