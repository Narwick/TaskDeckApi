import { createController } from 'awilix-express'; // or `awilix-router-cor`
import { AuthController } from '../controllers/AuthController';

export default createController(AuthController).prefix('/login').post('/', 'login');
