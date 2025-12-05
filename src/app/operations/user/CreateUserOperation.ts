import { CreateUser } from 'src/interfaces/http/schemas/UserSchema';
import { UsrUser } from '../../../infrastructure/database/models/UsrUser';
import { CreateUserService } from 'src/app/services/user/CreateUserService';

type createUseType = {
  createUserService: CreateUserService;
};
export class CreateUserOperation {
  private readonly createUser: CreateUserService;

  constructor({ createUserService }: createUseType) {
    this.createUser = createUserService;
  }

  public async execute(user: CreateUser): Promise<UsrUser> {
    const newUser: any = await this.createUser.execute(user);
    const userJson = newUser.toJSON(); 
    delete userJson.usr_password;      
    return userJson;
  }
}

export default CreateUserOperation;
