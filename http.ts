// http.ts
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const ambienteDev =
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'develop_ext' ? true : false;

import { join } from 'path';
import morgan from 'morgan';
import http from 'http';
import { ContainerConfigurator } from './container';
import { loadControllers, scopePerRequest } from 'awilix-express';
import scheduleAllJobs from './src/interfaces/cron/schedules';
import { setupAssociations } from './src/infrastructure/database/models/associations';

interface CustomError extends Error {
  status?: number;
}
export class HttpServer {
  public server: http.Server;

  constructor() {
    const container = ContainerConfigurator.configureContainer();
    const { app, express } = container.cradle;

    const httpServer = http.createServer(app);

    scheduleAllJobs(container);

    const config = 'security-auth';
    app.set('superSecurity-auth', config);
    app.use(morgan('tiny'));
    app.use(scopePerRequest(container));
    
    const route01 = `src/interfaces/http/routes/*.ts`;
    const route03 = `src/interfaces/http/controllers/*.ts`;

    const route02 = `src/interfaces/http/routes/*.js`;

    if (ambienteDev) {
      app.use(loadControllers(route01, { cwd: __dirname }));
      app.use(loadControllers(route03, { cwd: __dirname }));
    }
    app.use(loadControllers(route02, { cwd: __dirname }));
        
    const img = join(__dirname, `src/uploads`);
    app.use('/storage', express.static(img));
    app.use(express.json());

    app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
      console.error(error);
      res.status(error.status || 500).json(error);
    });

    setupAssociations();

    this.server = httpServer;
  }
}