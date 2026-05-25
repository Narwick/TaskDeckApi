import { BaseService } from '../BaseService';
import { TypeCreateError } from '../../../types';
import { UsrUser } from '../../../infrastructure/database/models/UsrUser';
import { UserRepository } from 'src/infrastructure/database/repository/user';
import { Transaction } from 'sequelize';

export interface IUserService {
  userRepository: UserRepository;
  createError: TypeCreateError;
}
export class UserService extends BaseService<UsrUser, UserRepository> {
  constructor({ userRepository, createError }: IUserService) {
    super({ repository: userRepository, createError, model: UsrUser });
  }
  async getMe(params: any, transaction?: Transaction): Promise<UsrUser> {
    const { id } = params;
    if (!id || id === ':id') throw this.createError(400, 'Id obrigatório.');

    return this.repository.getMe(params, transaction);
  }
  async getUserEmail(user: any, transaction: Transaction) {
    if (!user.usr_email) throw this.createError(400, 'usr_email undefined');
    const result = await this.repository.getUserEmail(user, transaction);
    return result;
  }
  async updateUserEmail(user: any, transaction: Transaction) {
    if (!user.usr_email) throw this.createError(400, 'email undefined');
    const result = await this.repository.updateUserEmail(user, transaction);
    return result;
  }
  async getByUsrEmail(params: any, transaction?: Transaction) {
    if (!params.usr_email || params.usr_email === ':usr_email')
      throw this.createError(400, 'usr_email obrigatório.');

    return this.repository.getByUsrEmail(params, transaction);
  }
}

export default UserService;
