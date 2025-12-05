/* eslint-disable func-names */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const db = require('../../../infrastructure/database/models');
const { redisClient } = require('../../../infrastructure/database/config/redis');

export default async (req: any, res: any, next: any) => {
  const token = req?.headers?.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.TOKEN_SECRET, async function (err: any, decoded: any) {
    if (err) {
      console.log('Erro jwt.verify', err);
      return res.status(401).send({
        auth: false,
        message: 'É necessário estar logado no sistema para acessar essa funcionalidade',
      });
    }

    const redis = await redisClient();

    const userStatus = await redis.get(`user:status:${decoded.usr_id}`);
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

      if (decoded.sub_id === null) {
        return res.status(401).send({
          auth: false,
          message:
            'Usuário sem acesso a essa funcionalidade. Por gentileza, entre em contato com o administrador do sistema.',
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
    req.gro_id = decoded.gro_id;
    req.email = decoded.email;
    req.sub_id = decoded.sub_id;
    db.usr_id = decoded.usr_id;
    db.gro_id = decoded.gro_id;
    db.email = decoded.email;
    db.sub_id = decoded.sub_id;

    next();
  });
};
