import { Model, ModelCtor, Transaction, Op } from 'sequelize';
import fs from 'fs';
import db from '../models';
import { IFindAndCountAll } from '../../../types';
import reduceImages from '../../../utils/reduceImages';

export interface Mapper {
  toEntity(databaseObject: any): any | null;
  toEntityMulti(databaseObject: any[]): any[] | null;
}

export interface IBaseRepositoryParams<TModel extends Model> {
  model: ModelCtor<TModel>;
  createError: (statusCode: number, message: string) => Error;
  mapper: Mapper;
  associations?: string[];
}

export type IId = {
  id: number;
};

export type IGetById = IId & {
  /**
   * Campos adicionais para serem incluídos na consulta
   */
  include?: any;
  baseAssociation?: boolean;
};

export class BaseRepository<TModel extends Model> {
  protected model: ModelCtor<TModel>;
  protected createError: (statusCode: number, message: string) => Error;
  protected mapper: Mapper;
  protected associations: string[] = [];

  constructor(
    model: ModelCtor<TModel>,
    createError: (statusCode: number, message: string) => Error,
    mapper: Mapper,
    associations?: string[],
  ) {
    this.model = model;
    this.createError = createError;
    this.mapper = mapper;
    if (associations) this.associations = associations;
  }

  async getAll(params: any, transaction?: Transaction) {
    console.log('params no getAll', params);
    const { order = null, direct = 'desc', filters, include, baseAssociation = true } = params;
    const newOrder: any = order ? { order: [[order, direct]] } : {};
    const where: any = {};
    const parametrosBusca: any = this.includes(include, baseAssociation);
    
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          if (key.includes('created_at') || key.includes('updated_at')) {
            where[key] = { [Op.and]: [db.sequelize.literal(`DATE(${key}) = '${filters[key]}'`)] };
          } else if (key.includes('wer_user_id')) {
            where[key] = filters[key];
          } else {
            where[key] = { [Op.like]: `%${filters[key]}%` };
          }
        }
      });
    }

    const result = await this.model.findAll({
      // logging: true,
      ...newOrder,
      ...parametrosBusca,
      where,
      transaction,
    });

    return {
      count: result.length,
      totalPages: 1,
      list: this.mapper.toEntityMulti(result),
    };
  }

  async findAndCountAll(params: IFindAndCountAll, transaction?: Transaction) {
    const {
      page = 1,
      amount = 30,
      order,
      direct = 'desc',
      filters,
      include,
      baseAssociation = true,
    } = params;

    const where: any = {};
    if (filters) {
      Object.keys(filters).forEach((key: any) => {
        if (filters[key]) {
          if (key.includes('created_at') || key.includes('updated_at')) {
            where[key] = { [Op.and]: [db.sequelize.literal(`DATE(${key}) = '${filters[key]}'`)] };
          } else if (key.includes('wer_id')) {
            where[key] = filters[key];
          } else {
            where[key] = { [Op.like]: `%${filters[key]}%` };
          }
        }
      });
    }

    const parametrosBusca: any = this.includes(include, baseAssociation);

    const newOrder = order ? { order: [[order, direct]] } : {};
    const limit = Number(amount);
    const pagination = (page - 1) * (Number(amount) ? Number(amount) : 15);

    const { count, rows } = await this.model.findAndCountAll({
      logging: true,
      ...newOrder,
      where,
      ...parametrosBusca,
      limit,
      offset: pagination,
      transaction,
    });

    return {
      count,
      totalPages: count === 0 ? 0 : Math.ceil(count / limit),
      list: rows,
    };
  }

  async getById(params: IGetById, transaction?: Transaction): Promise<TModel | null> {
    const { include, baseAssociation = true } = params;

    const parametrosBusca: any = this.includes(include, baseAssociation);
    if (include) parametrosBusca.include = include;
    return this.model.findByPk(params.id, { transaction, ...parametrosBusca });
  }

  async create(params: any, transaction?: Transaction) {
    if (params.sub_image) {
      // params.sub_mime_type_image = params.sub_image.type;
      const fileData = fs.readFileSync(params.sub_image.path);
      const bufferComprimido = await reduceImages(fileData);
      params.sub_image = bufferComprimido;
    }

    if (params.att_attachment) {
      params.att_mime_type = params.att_attachment.type;
      const fileData = fs.readFileSync(params.att_attachment.path);
      params.att_attachment = fileData;
    }

    return this.model.create(params, { transaction, logging: false });
  }

  async bulkCreate(params: any[], transaction?: Transaction) {
    const result = await this.model.bulkCreate(params, { transaction });
    return result;
  }

  async updateById(params: any, transaction?: Transaction) {
    const { data } = params;
    const entity = await this.getById(params, transaction);
    if (!entity) throw this.createError(404, 'Registro não encontrado.');
    if (data.sub_image) {
      // params.sub_mime_type_image = params.sub_image.type;
      const fileData = fs.readFileSync(data.sub_image.path);
      const bufferComprimido = await reduceImages(fileData);
      data.sub_image = bufferComprimido;

    }
    // if (data.sub_thumb) {
    //   // params.sub_mime_type_image = params.sub_image.type;
    //   const fileData = fs.readFileSync(data.sub_thumb.path);
    //   params.sub_thumb = fileData;
    // }
    return entity.update({ ...data, updated_at: new Date() }, { transaction });
  }

  async deleteById(params: IId, transaction?: Transaction) {
    const entity = await this.getById(params, transaction);
    if (!entity) throw this.createError(404, 'Registro não encontrado.');
    const result = await entity.destroy({ transaction });
    return result;
  }

  async getOneForParams(params: any, transaction?: Transaction) {
    const response = await this.model.findOne({
      logging: false,
      where: { ...params },
      transaction,
    });
    return response;
  }

  async deleteParams(params: any, transaction?: Transaction) {
    if (Object.keys(params).length === 0) {
      throw this.createError(404, 'É obrigatório o envio de no mínimo um parâmetro para exclusão.');
    }
    return this.model.destroy({
      where: { ...params },
      transaction,
    });
  }

  async getAllForParams(params: any, transaction?: Transaction) {
    const { query, include } = params;
    const parametrosBusca: any = {};
    if (include) parametrosBusca.include = include;
    const response = await this.model.findAll({
      logging: false,
      where: { ...query },
      ...parametrosBusca,
      transaction,
    });
    return response;
  }

  protected includes(include: any, baseAssociation: boolean) {
    const parametrosBusca: any = {};

    if (!include && this.associations.length === 0) return parametrosBusca;
    if (!baseAssociation) {
      parametrosBusca.include = include;
      return parametrosBusca;
    }
    const baseInclude = include ? [...include] : [];
    this.associations.forEach((association) => {
      baseInclude.push(this.createAssosiation(association));
    });
    parametrosBusca.include = baseInclude;
    return parametrosBusca;
  }
  private createAssosiation(association: string) {
    const parts = association.split('.');
    let result: any = {};
    let current = result;

    for (let i = 0; i < parts.length; i++) {
      current.association = parts[i];
      if (i < parts.length - 1) {
        current.include = {};
        current = current.include;
      }
    }

    return result;
  }
}
