import { Request, Response } from 'express';
import { BaseService } from 'src/app/services/BaseService';
import { BaseValidateClass } from '../schemas/baseValidationClass';

function validatePermissionGetById(
  classPrototype: any,
  nomeMetodo: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor | void {
  console.log('chegou aqui...');
  console.log('chegou aqui...');
  console.log('chegou aqui...');
  console.log('classPrototype: ', classPrototype);
  console.log('nomeMetodo: ', nomeMetodo);
  console.log('descriptor: ', descriptor);
  return {
    value: function (...args: string[]) {
      return args[0].toUpperCase();
    },
  };
}

export type newRequest = Request & {
  sub_id: string;
};

export type RequestUser = Request & {
  sub_id?: number;
  usr_id?: number;
};

export interface IService {
  getAll(query: any): Promise<any>;
  getById(params: any): Promise<any>;
  create(data: any): Promise<any>;
  updateById(updateData: any): Promise<any>;
  deleteById(params: any): Promise<any>;
  updateActiveById(data: any): Promise<any>;
}

export interface ISchema {
  validateCreate(data: any): Promise<void>;
  validateUpdate(data: any): Promise<void>;
  validateUpdateStatus(data: any): Promise<void>;
}

export class BaseController<
  Service extends BaseService<any, any>,
  Schema extends BaseValidateClass<any, any, any>,
> {
  service: Service;
  schema?: Schema;

  constructor(service: Service, schema?: Schema) {
    this.service = service;
    this.schema = schema;
  }

  async getAll(req: Request, res: Response) {
    const result = await this.service.getAll(req.query as any);
    res.status(200).send(result);
  }

  async getById(req: newRequest, res: Response) {
    const data = req.params;
    data.sub_id = req?.sub_id;
    const result = await this.service.getById(data);
    if (!result) {
      return res.status(404).send({ message: 'Registro não encontrado.' });
    }
    res.status(200).send(result);
  }

  async create(req: Request, res: Response) {
    if (this.schema) {
      this.schema.validateCreate(req.body);
    }
    const result = await this.service.create(req.body);
    res.status(201).send(result);
  }

  async updateById(req: newRequest, res: Response) {
    const data: any = {
      data: req.body,
      id: req.params.id,
    };
    if (this.schema) {
      this.schema.validateUpdate(data);
    }
    data.sub_id = req?.sub_id;
    const result = await this.service.updateById(data);
    res.status(200).send(result);
  }

  async updateActiveById(req: newRequest, res: Response) {
    const data: any = {
      data: req.body,
      id: req.params.id,
    };
    if (this.schema) {
      this.schema.validateUpdateStatus(req.body);
    }
    data.sub_id = req?.sub_id;
    const result = await this.service.updateById(data);
    res.status(200).send(result);
  }

  async deleteById(req: newRequest, res: Response) {
    const data = req.params;
    data.sub_id = req?.sub_id;
    const result = await this.service.deleteById(data);
    res.status(200).send(result);
  }
}
