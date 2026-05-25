import { createController } from 'awilix-express'; // or `awilix-router-cor`
import { UserController } from '../controllers/UserController';
import authAdm from '../middlewares/authAdm';

export default createController(UserController)
  .prefix('/user')
  .post('/', 'create')
  .patch('/reset', 'updatePasswordCodeReset')
  .patch('/password', 'updatePassword', { before: [authAdm] })
  .get('/me', 'getMe', { before: [authAdm] })
  .put('/me', 'updateMe', { before: [authAdm] })
  .patch('/me/avatar', 'uploadAvatar', { before: [authAdm] })
  .patch('/:id', 'updateActiveById')
  .put('/:id', 'updateById')
  .delete('/:id', 'deleteById')
  .get('/:id', 'getById')
  .get('/verify-email/:usr_email', 'verifyEmail')
  .get('/', 'getAll');
