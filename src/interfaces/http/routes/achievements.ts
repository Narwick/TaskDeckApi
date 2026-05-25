import { AchievementsController } from '../controllers/AchievementsController';
import authAdm from '../middlewares/authAdm';
const { createController } = require('awilix-express');

export default createController(AchievementsController)
  .prefix('/achievements')
  .post('/', 'create', { before: [authAdm] })
  .put('/:id', 'updateById', { before: [authAdm] })
  .patch('/:id', 'updateActiveById', { before: [authAdm] })
  .patch('/:id/image', 'uploadImage', { before: [authAdm] })
  .delete('/:id', 'deleteById', { before: [authAdm] })
  .get('/:id', 'getById', { before: [authAdm] })
  .get('/', 'getAll', { before: [authAdm] });
