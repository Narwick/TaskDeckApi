import { Request, Response } from 'express';
import { CreateAuthenticateOperation } from 'src/app/operations/authenticate/CreateAuthenticateOperation';
import AuthSchema from '../schemas/AuthSchema';

interface IAuthController {
  trocaPerfilOperation: any;
  authSchema: AuthSchema;
  createAuthenticateOperation: CreateAuthenticateOperation;
}

export class AuthController {
  authSchema: any;
  trocaPerfilOperation: any;
  createAuthenticateOperation: CreateAuthenticateOperation;
  constructor({ trocaPerfilOperation, createAuthenticateOperation, authSchema }: IAuthController) {
    this.createAuthenticateOperation = createAuthenticateOperation;
    this.trocaPerfilOperation = trocaPerfilOperation;
    this.authSchema = authSchema;
  }

  async login(req: Request, res: Response) {
    const result = await this.createAuthenticateOperation.execute(req.body);
    res.send(result);
  }
  validate(req: Request, res: Response) {
    res.json({ code: 200, status: 'success' });
  }
}

export default AuthController;
