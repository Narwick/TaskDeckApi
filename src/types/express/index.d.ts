// src/types/express/index.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    usr_id?: string;
    gru_id?: string;
    gru_tipo?: string;
    email?: string;
    med_id?: string;
    mun_id?: string;
  }
}
