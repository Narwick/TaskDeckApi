import { CreateUser } from 'src/interfaces/http/schemas/UserSchema';
import { UsrUser } from '../../../infrastructure/database/models/UsrUser';
import { UserService } from 'src/app/services/user';
import createError from 'http-errors';
import { Op } from 'sequelize';
import { valid } from 'joi';

type createUserype = {
  userService: UserService;
};

type updateUserDto = {
  id: number;
  data: Partial<CreateUser>;
};
export class UpdateUserOperation {
  private readonly service: UserService;

  constructor({ userService }: createUserype) {
    this.service = userService;
  }

  public async execute(user: updateUserDto): Promise<{ message: string }> {
    const { id, data } = user;

    const userExists = await this.service.getById({ id: user.id, valid: false });
    if (!userExists) {
      throw new Error('Usuário não encontrado em nosso sistema.');
    }

    if (data.usr_email) {
      const emailExists = await this.service.getOneForParams({
        usr_id: { [Op.ne]: id },
        usr_email: data.usr_email,
      });
      if (emailExists) {
        throw createError(400, 'E-mail já cadastrado em nosso sistema.');
      }
    }
    await this.service.updateById({ id: user.id, data: user.data, valid: false });
    return { message: 'Usuário atualizado com sucesso.' };
  }
}

export default UpdateUserOperation;
