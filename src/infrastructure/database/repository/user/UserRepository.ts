import { Op, Transaction } from 'sequelize';
import mapper from './UserMapper';
import { BaseRepository, IGetById } from '../BaseRepository';
import { UsrUser } from '../../models/UsrUser';

interface IUserRepository {
  createError: (statusCode: number, message: string) => Error;
  db: any;
}

export class UserRepository extends BaseRepository<UsrUser> {
  db: any;
  constructor({ db, createError }: IUserRepository) {
    super(UsrUser, createError, mapper, []);
    this.db = db;
  }
  async getUserEmail(user: any, transaction: Transaction) {
    const response = await this.model.findOne({
      where: { usr_email: user.usr_email },
      transaction,
    });
    return response;
  }

  async updateById(params: any, transaction?: Transaction) {
    const { data } = params;
    const entity = await this.getById(params, transaction);
    if (!entity) throw this.createError(404, 'Registro não encontrado.');
    delete entity.dataValues.usr_password;
    return entity.update({ ...data, updated_at: new Date() }, { transaction });
  }

  async getMe(params: IGetById, transaction?: Transaction): Promise<UsrUser> {
    const { include, baseAssociation = true } = params;
    const parametrosBusca: any = this.includes(include, baseAssociation);
    if (include) parametrosBusca.include = include;
    const result = await this.model.findByPk(params.id, { transaction, ...parametrosBusca });
    return mapper.toEntity(result);
  }

  async updateUserEmail(user: any, transaction: Transaction) {
    const response = await this.model.update(user, {
      where: { usr_email: user.usr_email },
      transaction,
    });
    return response;
  }
  async getByUsrEmail(params: { usr_email: string }, transaction?: Transaction) {
    return this.model.scope('withPassword').findOne({
      where: { ...params },
      transaction,
    });
  }
}

export default UserRepository;
