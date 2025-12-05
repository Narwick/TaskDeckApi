import { TypeCreateError } from '../../types';
import { BaseRepository } from '../../infrastructure/database/repository/BaseRepository';
import { BaseEntity } from 'src/domain/entities';

import { Model, Transaction } from 'sequelize';

interface IBaseService<R> {
  repository: R;
  createError: TypeCreateError;
  model: any;
}

export type newRequest = Request & {
  sub_id: string;
};

export class BaseService<TModel extends Model, R extends BaseRepository<any>> {
  protected repository: R;
  protected createError;
  protected model: any;

  constructor({ repository, createError, model }: IBaseService<R>) {
    this.repository = repository;
    this.createError = createError;
    this.model = model;
  }

  async getAll(params: any, transaction?: Transaction, getAll: boolean = false) {
    if (params?.page && getAll === false)
      return this.repository.findAndCountAll(params, transaction);
    return this.repository.getAll(params, transaction);
  }

  async getById(params: any, transaction?: Transaction): Promise<TModel> {
    const { id, valid = true, sub_id } = params;
    if (!id || id === ':id') throw this.createError(400, 'Id obrigatório.');
    if (valid) await this.isValidate(id, sub_id);
    const result = await this.repository.getById(params, transaction);
    return result;
  }

  async create(params: Partial<TModel>, transaction?: Transaction) {
    const record = new this.model(params).dataValues;
    return this.repository.create(record, transaction);
  }

  async bulkCreate(params: Partial<TModel>[], transaction?: Transaction) {
    if (!params || params.length === 0) {
      throw this.createError(400, 'É obrigatório ao menos um item no array.');
    }
    const records = params.map((model: any) => new this.model(model).dataValues);
    return this.repository.bulkCreate(records, transaction);
  }

  async updateById(params: any, transaction?: Transaction) {
    const { id, valid = true, sub_id } = params;
    if (!id || id === ':id') throw this.createError(400, 'Id obrigatório.');
    if (valid) await this.isValidate(id, sub_id, transaction);
    const record = new this.model(params.data).dataValues;
    params.data = record;
    const result = await this.repository.updateById(params, transaction);
    return result;
  }

  async deleteById(params: any, transaction?: Transaction) {
    const { id, valid = true, sub_id } = params;
    if (valid) await this.isValidate(id, sub_id);
    if (!params.id || params.id === ':id') throw this.createError(400, 'Id obrigatório.');
    try {
      await this.repository.deleteById(params, transaction);

      return { message: 'registro excluído com sucesso!' };
    } catch (err) {
      throw this.createError(
        404,
        'Não foi possível excluir o registro pois o mesmo contém vínculo com outras tabelas.',
      );
    }
  }

  async getOneForParams(params: any, transaction?: Transaction) {
    return this.repository.getOneForParams(params, transaction);
  }

  async createOrUpdate(params: any, transaction?: Transaction) {
    const { data, conditions } = params;
    let record = await this.repository.getOneForParams(conditions, transaction);
    if (!record) {
      record = this.model(data).dataValues;
      return this.repository.create(record, transaction);
    }
    return record.update({ ...data, updated_at: new Date() });
  }

  async deleteParams(params: any, transaction?: Transaction) {
    if (Object.keys(params).length === 0) {
      throw this.createError(404, 'É obrigatório o envio de no mínimo um parâmetro para exclusão.');
    }
    return this.repository.deleteParams(params, transaction);
  }

  async getAllForParams(parans: any, transaction?: Transaction) {
    return this.repository.getAllForParams(parans, transaction);
  }

  protected async isValidate(id: number, sub_id: number, transaction?: Transaction) {
    const result = await this.repository.getById({ id }, transaction);

    if (!result) throw this.createError(404, 'Registro não encontrado.');

    const { dataValues } = result;

    // Identifica o prefixo do campo
    const prefix = Object.keys(dataValues)
      .find((key) => key.includes('_')) // Busca qualquer campo com "_"
      ?.split('_')[0]; // Extrai o prefixo antes do "_"

    if (!prefix) {
      throw this.createError(500, 'Não foi possível identificar o prefixo dos campos.');
    }
    // Verifica o sub_id, se necessário
    const subIdField = `${prefix}_sub_id`; // Constrói o campo dinamicamente

    if (dataValues[subIdField] != undefined && dataValues[subIdField] !== sub_id) {
      throw this.createError(404, `O campo ${subIdField} não corresponde ao sub_id fornecido.`);
    }
  }
}
