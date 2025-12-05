import { BaseEntity } from './BaseEntity';

type Grupo = {
  gru_id: number;
};

export class UsuarioEntity extends BaseEntity {
  usr_id?: number;
  usr_apelido?: string;
  usr_cpf?: string;
  usr_senha?: string;
  usr_email?: string;
  usr_status?: number;
  usr_created_at?: Date;
  usr_updated_at?: Date;
  gru_grupo?: Grupo;

  constructor(init?: any) {
    super();
    Object.assign(this, init);
  }
}

export default UsuarioEntity;
