// src/interfaces/IUsuarioService.ts
import { IUser } from './Iuser';

export interface IUsuarioService {
  getUserParams(where: object): Promise<IUser | null>;
  create(user: IUser, transaction?: any): Promise<IUser>;
}

// src/interfaces/IUsuarioMunicipioService.ts
export interface IUsuarioMunicipioService {
  create(data: any, transaction?: any): Promise<any>;
}
