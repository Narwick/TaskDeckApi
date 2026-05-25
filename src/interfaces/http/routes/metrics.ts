import { MetricsController } from '../controllers/MetricsController';
import authAdm from '../middlewares/authAdm';
const { createController } = require('awilix-express');

export default createController(MetricsController)
  .prefix('/metrics')
  .post('/', 'create', { before: [authAdm] })
  .put('/:id', 'updateById', { before: [authAdm] })
  .patch('/:id', 'updateActiveById', { before: [authAdm] })
  .delete('/:id', 'deleteById', { before: [authAdm] })
  .get('/:id', 'getById', { before: [authAdm] })
  .get('/', 'getAll', { before: [authAdm] });
