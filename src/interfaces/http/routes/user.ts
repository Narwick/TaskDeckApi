import { createController } from 'awilix-express'; // or `awilix-router-cor`
import { UserController } from '../controllers/UserController';

export default createController(UserController)
  .prefix('/user')
  .post('/', 'create')
  .post('/reset', 'createResetCode')
  .patch('/reset', 'updatePasswordCodeReset')
  .patch('/password', 'updatePassword')
  .get('/me', 'getMe')
  .put('/me', 'updateMe')
  .patch('/:id', 'updateActiveById')
  .put('/:id', 'updateById')
  .delete('/:id', 'deleteById')
  .get('/:id', 'getById')
  .get('/verify-email/:usr_email', 'verifyEmail')
  .get('/', 'getAll');
