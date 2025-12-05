import { CreateUser } from 'src/interfaces/http/schemas/UserSchema';
import { UsrUser } from '../../../infrastructure/database/models/UsrUser';
import { UserRepository } from '../../../infrastructure/database/repository/user/UserRepository';
import createError from 'http-errors';
import { Transaction } from 'sequelize';
import { validEmail } from '../../../utils/validEmail';

type createUseType = {
  userRepository: UserRepository;
};
export class CreateUserService {
  private readonly userRepository: UserRepository;

  constructor({ userRepository }: createUseType) {
    this.userRepository = userRepository;
  }

  public async execute(user: CreateUser, transaction?: Transaction): Promise<UsrUser> {
    const { usr_email } = user;
    validEmail(usr_email);

    const verifyEmail = await this.userRepository.getOneForParams({ usr_email }, transaction);
    if (verifyEmail) {
      throw createError(404, 'Email existente na base de dados');
    }
    return this.userRepository.create(user, transaction);
  }
}

export default CreateUserService;
