/* eslint-disable func-names */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import db from '../../../infrastructure/database/models';
import { redisClient } from '../../../infrastructure/database/config/redis';
import { ADM, EDITOR } from '../../../infrastructure/database/models/UsrUser';

export function authPermissions(permissions: string[] = []) {
  return async (req: any, res: any, next: any) => {
    const token = req?.headers?.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.TOKEN_SECRET!, async function (err: any, decoded: any) {
      if (err) {
        console.log('Erro jwt.verify', err);
        return res.status(401).send({
          auth: false,
          message: 'É necessário estar logado no sistema para acessar essa funcionalidade',
        });
      }

      const isLoggedAsAdm = ADM.includes(decoded.usr_permission);
      const isLoggedAsEditor = EDITOR.includes(decoded.usr_permission);

      const isRouteAdm = permissions.some(permission => ADM.includes(permission));
      const isRouteEditor = permissions.some(permission => EDITOR.includes(permission));
      const isRouteAdmAndEditor = isRouteAdm && isRouteEditor;

      if (isRouteEditor && isLoggedAsAdm) {
        permissions = permissions.concat(EDITOR);
      }

      if (
        (isLoggedAsEditor && decoded.cmp_id === null) ||
        (isLoggedAsAdm && isRouteEditor && !isRouteAdmAndEditor) ||
        !permissions.some((permission) => [decoded.usr_permission].flat().includes(permission))
      ) {
        return res.status(401).send({
          auth: false,
          message:
            'Usuário sem acesso a essa funcionalidade. Por gentileza, entre em contato com o administrador do sistema.',
        });
      }

      const redis = await redisClient();

      const userStatus: any = await redis.get(`user:status:${decoded.usr_id}`);
      const tokenRedis = await redis.get(`user:token:${decoded.usr_id}`);
      if (!tokenRedis || tokenRedis !== token) {
        return res.status(401).send({
          auth: false,
          message: 'Token inválido ou expirado, por gentileza, realize o login novamente.',
        });
      }

      if (userStatus) {
        if (userStatus === 0) {
          await redis.disconnect();
          return res.status(401).send({
            auth: false,
            message:
              'Usuário inativo. Por gentileza, entre em contato com o administrador do sistema.',
          });
        }
      } else {
        const getUser = await db.usr_user.findByPk(decoded.usr_id);
        await redis.set(`user:status:${getUser.usr_id}`, getUser.usr_status, {
          EX: 86400,
        });
      }

      await redis.disconnect();

      req.usr_id = decoded.usr_id;
      req.email = decoded.email;
      req.usr_permission = decoded.usr_permission;
      req.cmp_id = decoded?.cmp_id;
      db.usr_id = decoded.usr_id;
      db.email = decoded.email;
      db.usr_permission = decoded.usr_permission;
      db.cmp_id = decoded?.cmp_id;

      next();
    });
  };
}
