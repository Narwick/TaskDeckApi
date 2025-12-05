import { Sequelize, Transaction } from 'sequelize';
import { UserService } from '../../services/user/UserService';
import { TypeCreateError } from '../../../../src/types';

interface Dependencies {
  userService: UserService;
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
}

type updatePassword = {
  data: {
    usr_password: string;
  };
  id: number;
  sub_id: number;
};

export class UpdatePasswordOperation {
  userService: UserService;
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
  constructor({ userService, db, createError }: Dependencies) {
    this.userService = userService;
    this.db = db;
    this.createError = createError;
  }

  async execute(params: updatePassword) {
    const transaction = await this.db.sequelize.transaction();
    try {
      const user = await this.userService.getById({ id: params.id, sub_id: params.sub_id });
      if(!user) throw this.createError(404, "Usuário não encontrado.");

      await this.userService.updateById(params, transaction);
      await transaction.commit();
      return {
        message: 'Senha atualizada com sucesso.',
      };
    } catch (err: any) {
      await transaction.rollback();
      throw this.createError(
        500,
        'Houve uma falha ao solicitar o reset de senha. Entre em contato com o administrador do sistema.',
      );
    }
  }
}

export default UpdatePasswordOperation;
