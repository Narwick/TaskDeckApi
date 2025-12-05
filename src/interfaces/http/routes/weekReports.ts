import { WeekReportsController } from '../controllers/WeekReportsController';
import authAdm from '../middlewares/authAdm';
const { createController } = require('awilix-express'); // or `awilix-router-core`

export default createController(WeekReportsController)
  .prefix('/week-reports')
  .post('/', 'create', { before: [authAdm] })
  .put('/:id', 'updateById', { before: [authAdm] })
  .patch('/:id', 'updateActiveById', { before: [authAdm] })
  .delete('/:id', 'deleteById', { before: [authAdm] })
  .get('/:id', 'getById', { before: [authAdm] })
  .get('/', 'getAll', { before: [authAdm] });