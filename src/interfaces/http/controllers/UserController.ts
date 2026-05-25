import { Request, Response } from 'express';
import { BaseController, RequestUser } from './BaseController';
import { UserSchema } from '../schemas/UserSchema';
import {
  UpdatePasswordCodeResetOperation,
  CreateUserOperation,
  UpdateUserOperation,
} from 'src/app/operations/user';

import { UpdatePasswordOperation } from 'src/app/operations/user/UpdatePasswordOperation';
import { UserService } from 'src/app/services/user';
import { Op } from 'sequelize';
import { formidableFields } from '../../../utils/formidableFields';
import { saveImage } from '../../../utils/fileManager';

interface IUserController {
  userSchema: UserSchema;
  userService: UserService;
  createUserOperation: CreateUserOperation;
  updatePasswordCodeResetOperation: UpdatePasswordCodeResetOperation;
  updateUserOperation: UpdateUserOperation;
  updatePasswordOperation: UpdatePasswordOperation;
}

export class UserController extends BaseController<UserService, UserSchema> {
  userSchema: UserSchema;
  userService: UserService;
  createUserOperation: CreateUserOperation;
  updatePasswordCodeResetOperation: UpdatePasswordCodeResetOperation;
  updateUserOperation: UpdateUserOperation;
  updatePasswordOperation: UpdatePasswordOperation;
  constructor({
    userService,
    userSchema,
    createUserOperation,
    updatePasswordCodeResetOperation,
    updateUserOperation,
    updatePasswordOperation,
  }: IUserController) {
    super(userService, userSchema);
    this.createUserOperation = createUserOperation;
    this.updatePasswordCodeResetOperation = updatePasswordCodeResetOperation;
    this.updateUserOperation = updateUserOperation;
    this.updatePasswordOperation = updatePasswordOperation;
    this.userSchema = userSchema;
    this.userService = userService;
  }

  async create(req: any, res: Response) {
    const data = req.body;
    this.schema?.validateCreate(req.body);

    const result = await this.createUserOperation.execute(data);
    res.status(201).send(result);
  }

  async createByAdm(req: Request, res: Response) {
    if (this.schema) {
      this.schema.validateCreateByAdm(req.body);
    }
    const result = await this.createUserOperation.execute(req.body);
    res.status(201).send(result);
  }

  async getMe(req: RequestUser, res: Response) {
    const result = await this.service.getMe({ id: req.usr_id });
    res.status(201).send(result);
  }

  async uploadAvatar(req: any, res: Response) {
    const data: any = await formidableFields(req, res, ['image']);
    if (!data.image) return res.status(400).send({ message: 'Imagem obrigatória.' });
    const result = await saveImage('users', 'avatar', data.image);
    const updated = await this.userService.updateById({
      id: req.usr_id,
      data: { usr_avatar: `/storage/${result.path}` },
    });
    res.status(200).send(updated);
  }

  async updateMe(req: RequestUser, res: Response) {
    const data = { data: req.body, id: Number(req.usr_id) };
    this.userSchema.validateUpdateMe(data);
    const result = await this.updateUserOperation.execute(data);
    res.status(200).send(result);
  }

  async verifyEmail(req: Request, res: Response) {
    const usr_email = req.params.usr_email;
    const result = await this.service.getOneForParams({ usr_email });
    res.status(201).send(!!result);
  }

  async updatePasswordCodeReset(req: Request, res: Response) {
    if (this.schema) {
      await this.schema.validateCodeReset(req.body);
    }
    const users = await this.updatePasswordCodeResetOperation.execute(req.body);
    res.send(users);
  }
  async getUserBySubscriber(req: any, res: Response) {
    const data = req.query;
    if (!data.filters) {
      data.filters = { usr_sub_id: req.sub_id };
    } else {
      (data.filters as any).usr_sub_id = req.sub_id;
    }
    const result = await this.service.getAll(data);
    res.status(200).send(result);
  }
  async updatePassword(req: any, res: Response) {
    const data: any = {
      data: req.body,
      id: req.usr_id,
    };
    await this.schema?.validateUpdatePassword(data);
    data.sub_id = req.sub_id;
    const users = await this.updatePasswordOperation.execute(data);
    res.send(users);
  }

  async updateAdmById(req: any, res: Response) {
    const data: any = {
      data: req.body,
      id: req.params.id,
    };
    await this.schema?.validateUpdate(data);
    const users = await this.updateUserOperation.execute(data);
    res.send(users);
  }
  async updateAdmActiveById(req: any, res: Response) {
    const data: any = {
      data: req.body,
      id: req.params.id,
      valid: false,
    };
    if (this.schema) {
      this.schema.validateUpdateStatus(req.body);
    }
    data.sub_id = req?.sub_id;
    const result = await this.service.updateById(data);
    res.status(200).send(result);
  }
  async deleteAdmById(req: any, res: Response) {
    const data = req.params;
    data.valid = false;
    data.sub_id = req?.sub_id;
    const result = await this.service.deleteById(data);
    res.status(200).send(result);
  }
  async getAdmById(req: any, res: Response) {
    const data = req.params;
    data.valid = false;
    const result = await this.service.getById(data);
    if (!result) {
      return res.status(404).send({ message: 'Registro não encontrado.' });
    }
    res.status(200).send(result);
  }
  async updateById(req: any, res: Response) {
      const data: any = {
        data: req.body,
        id: req.params.id,
      };
      
      this.schema?.validateUpdate(data);
      
      data.sub_id = req?.sub_id;
      const result = await this.service.updateById(data);
      const newResult = result.toJSON();
      delete newResult.usr_password;
      res.status(200).send(newResult);
    }
}

export default UserController;
